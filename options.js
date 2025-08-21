const languages = [
    { name: "Arabic", autonym: "العربية", deepl: "ar", reverso: "arabic", google: "ar" },
    { name: "Chinese", autonym: "中文", deepl: "zh", reverso: "chinese", google: "zh" },
    { name: "Dutch", autonym: "Nederlands", deepl: "nl", reverso: "dutch", google: "nl" },
    { name: "English", autonym: "English", deepl: "en", reverso: "english", google: "en" },
    { name: "French", autonym: "Français", deepl: "fr", reverso: "french", google: "fr" },
    { name: "German", autonym: "Deutsch", deepl: "de", reverso: "german", google: "de" },
    { name: "Hebrew", autonym: "עברית", deepl: "he", reverso: "hebrew", google: "he" },
    { name: "Italian", autonym: "Italiano", deepl: "it", reverso: "italian", google: "it" },
    { name: "Japanese", autonym: "日本語", deepl: "ja", reverso: "japanese", google: "ja" },
    { name: "Korean", autonym: "한국어", deepl: "ko", reverso: "korean", google: "ko" },
    { name: "Polish", autonym: "Polski", deepl: "pl", reverso: "polish", google: "pl" },
    { name: "Portuguese", autonym: "Português", deepl: "pt", reverso: "portuguese", google: "pt" },
    { name: "Romanian", autonym: "Română", deepl: "ro", reverso: "romanian", google: "ro" },
    { name: "Russian", autonym: "Русский", deepl: "ru", reverso: "russian", google: "ru" },
    { name: "Spanish", autonym: "Español", deepl: "es", reverso: "spanish", google: "es" },
    { name: "Turkish", autonym: "Türkçe", deepl: "tr", reverso: "turkish", google: "tr" },
];

const languagePairsContainer = document.getElementById('language-pairs');

function generateUnifiedPairs(container) {
    const pairs = [];
    
    // Generate unique bidirectional pairs
    for (let i = 0; i < languages.length; i++) {
        for (let j = i + 1; j < languages.length; j++) {
            const lang1 = languages[i];
            const lang2 = languages[j];
            
            // Create pair with autonyms, sorted alphabetically for consistent display
            const sortedPair = [lang1, lang2].sort((a, b) => a.autonym.localeCompare(b.autonym));
            const pairId = `pair-${sortedPair[0].name.toLowerCase()}-${sortedPair[1].name.toLowerCase()}`;
            const labelText = `${sortedPair[0].autonym} ↔ ${sortedPair[1].autonym}`;
            
            pairs.push({
                id: pairId,
                label: labelText,
                value: `${sortedPair[0].name}:${sortedPair[1].name}`,
                searchText: `${sortedPair[0].autonym} ${sortedPair[1].autonym} ${sortedPair[0].name} ${sortedPair[1].name}`
            });
        }
    }
    
    // Sort pairs alphabetically by label for better UX
    pairs.sort((a, b) => a.label.localeCompare(b.label));
    
    // Create DOM elements
    for (const pair of pairs) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = pair.id;
        checkbox.name = 'language-pair';
        checkbox.value = pair.value;
        checkbox.setAttribute('data-search', pair.searchText.toLowerCase());

        const label = document.createElement('label');
        label.htmlFor = pair.id;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(pair.label));
        
        container.appendChild(label);
    }
}

function saveOptions(e) {
    e.preventDefault();
    const selectedPairs = Array.from(document.querySelectorAll('#language-pairs input:checked')).map(cb => cb.value);
    
    // Convert unified bidirectional pairs to service-specific format
    const selectedDeepl = [];
    const selectedReverso = [];
    const selectedGoogle = [];

    for (const pair of selectedPairs) {
        const [name1, name2] = pair.split(':');
        const lang1 = languages.find(l => l.name === name1);
        const lang2 = languages.find(l => l.name === name2);
        
        if (lang1 && lang2) {
            // Add both directions for each service
            // Direction 1: lang1 -> lang2
            selectedDeepl.push(`${lang1.deepl}:${lang2.deepl}:${name1} -> ${name2}`);
            selectedReverso.push(`${lang1.reverso}:${lang2.reverso}:${name1} -> ${name2}`);
            selectedGoogle.push(`${lang1.google}:${lang2.google}:${name1} -> ${name2}`);
            
            // Direction 2: lang2 -> lang1
            selectedDeepl.push(`${lang2.deepl}:${lang1.deepl}:${name2} -> ${name1}`);
            selectedReverso.push(`${lang2.reverso}:${lang1.reverso}:${name2} -> ${name1}`);
            selectedGoogle.push(`${lang2.google}:${lang1.google}:${name2} -> ${name1}`);
        }
    }

    browser.storage.local.set({
        deeplPairs: selectedDeepl,
        reversoPairs: selectedReverso,
        googlePairs: selectedGoogle
    });
}

function restoreOptions() {
    browser.storage.local.get(['deeplPairs', 'reversoPairs', 'googlePairs']).then(result => {
        let { deeplPairs, reversoPairs, googlePairs } = result;

        // If no settings are stored, create and save defaults
        if (deeplPairs === undefined && reversoPairs === undefined && googlePairs === undefined) {
            const defaultBidirectionalPairs = ["English:Spanish", "English:Russian", "Spanish:Russian"];
            
            // Check the default bidirectional pairs in the UI
            for (const pair of defaultBidirectionalPairs) {
                const checkbox = document.querySelector(`#language-pairs input[value="${pair}"]`);
                if (checkbox) checkbox.checked = true;
            }
            
            // Save the defaults in the proper format
            saveOptions({ preventDefault: () => {} });
            return;
        }

        // Convert service-specific unidirectional pairs back to bidirectional format
        const directionPairs = new Map(); // Maps "lang1:lang2" to set of directions
        
        // Process DeepL pairs to find bidirectional pairs
        for (const pair of (deeplPairs || [])) {
            const [, , title] = pair.split(':');
            const [fromName, toName] = title.split(' -> ');
            
            // Create a normalized pair key (always in alphabetical order)
            const sortedPair = [fromName, toName].sort().join(':');
            
            if (!directionPairs.has(sortedPair)) {
                directionPairs.set(sortedPair, new Set());
            }
            directionPairs.get(sortedPair).add(`${fromName}->${toName}`);
        }
        
        // Only enable bidirectional pairs where both directions exist
        for (const [pairKey, directions] of directionPairs) {
            const [name1, name2] = pairKey.split(':');
            const hasDirection1 = directions.has(`${name1}->${name2}`);
            const hasDirection2 = directions.has(`${name2}->${name1}`);
            
            // Only check the checkbox if both directions are present
            if (hasDirection1 && hasDirection2) {
                const checkbox = document.querySelector(`#language-pairs input[value="${pairKey}"]`);
                if (checkbox) checkbox.checked = true;
            }
        }
    });
}

function filterLanguages(e) {
    const searchTerm = e.target.value.toLowerCase();
    const listContainer = document.getElementById('language-pairs');
    const labels = listContainer.getElementsByTagName('label');

    for (const label of labels) {
        const checkbox = label.querySelector('input');
        const searchText = checkbox ? checkbox.getAttribute('data-search') : label.textContent.toLowerCase();
        
        if (searchText.includes(searchTerm)) {
            label.style.display = 'block';
        } else {
            label.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateUnifiedPairs(languagePairsContainer);
    restoreOptions();
    document.getElementById('language-search').addEventListener('input', filterLanguages);
});

document.querySelector('form').addEventListener('submit', saveOptions);
