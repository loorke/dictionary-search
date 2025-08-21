function buildContextMenu() {
    browser.contextMenus.removeAll().then(() => {
        // --- Static Menu Items ---
        const staticItems = [
            { id: "search-spanishdict", title: "Search in SpanishDict" },
            { id: "search-oxford", title: "Search in Oxford Learner's Dictionaries" },
            { id: "search-thesaurus", title: "Search in Thesaurus.com" }
        ];

        for (const item of staticItems) {
            browser.contextMenus.create({
                id: item.id,
                title: item.title,
                contexts: ["selection"]
            });
        }

        // --- Dynamic Menu Items from Storage ---
        browser.storage.local.get(['deeplPairs', 'reversoPairs', 'googlePairs']).then(result => {
            const { deeplPairs = [], reversoPairs = [], googlePairs = [] } = result;

            if (deeplPairs.length > 0) {
                browser.contextMenus.create({
                    id: "deepl-parent",
                    title: "Translate with DeepL",
                    contexts: ["selection"]
                });
                for (const pair of deeplPairs) {
                    const [from, to, title] = pair.split(':');
                    browser.contextMenus.create({
                        id: `deepl-${from}-${to}`,
                        parentId: "deepl-parent",
                        title: title,
                        contexts: ["selection"]
                    });
                }
            }

            if (reversoPairs.length > 0) {
                browser.contextMenus.create({
                    id: "reverso-parent",
                    title: "Translate with Reverso Context",
                    contexts: ["selection"]
                });
                for (const pair of reversoPairs) {
                    const [from, to, title] = pair.split(':');
                    browser.contextMenus.create({
                        id: `reverso-${from}-${to}`,
                        parentId: "reverso-parent",
                        title: title,
                        contexts: ["selection"]
                    });
                }
            }

            if (googlePairs.length > 0) {
                browser.contextMenus.create({
                    id: "google-parent",
                    title: "Translate with Google Translate",
                    contexts: ["selection"]
                });
                for (const pair of googlePairs) {
                    const [from, to, title] = pair.split(':');
                    browser.contextMenus.create({
                        id: `google-${from}-${to}`,
                        parentId: "google-parent",
                        title: title,
                        contexts: ["selection"]
                    });
                }
            }
        });
    });
}

browser.contextMenus.onClicked.addListener((info, tab) => {
    const selectedText = info.selectionText;
    let url;

    if (info.menuItemId === "search-spanishdict") {
        url = `https://www.spanishdict.com/translate/${encodeURIComponent(selectedText)}`;
    } else if (info.menuItemId === "search-oxford") {
        url = `https://www.oxfordlearnersdictionaries.com/definition/english/${encodeURIComponent(selectedText)}`;
    } else if (info.menuItemId === "search-thesaurus") {
        url = `https://www.thesaurus.com/browse/${encodeURIComponent(selectedText)}`;
    } else if (info.menuItemId.startsWith("deepl-")) {
        const parts = info.menuItemId.split('-');
        const from = parts[1];
        const to = parts[2];
        url = `https://www.deepl.com/translator#${from}/${to}/${encodeURIComponent(selectedText)}`;
    } else if (info.menuItemId.startsWith("reverso-")) {
        const parts = info.menuItemId.split('-');
        const from = parts[1];
        const to = parts[2];
        url = `https://context.reverso.net/translation/${from}-${to}/${encodeURIComponent(selectedText)}`;
    } else if (info.menuItemId.startsWith("google-")) {
        const parts = info.menuItemId.split('-');
        const from = parts[1];
        const to = parts[2];
        url = `https://translate.google.com/?sl=${from}&tl=${to}&text=${encodeURIComponent(selectedText)}`;
    }

    if (url) {
        browser.tabs.create({ url: url });
    }
});

// Build the menu on startup
buildContextMenu();

// Rebuild the menu whenever settings are changed
browser.storage.onChanged.addListener(buildContextMenu);
