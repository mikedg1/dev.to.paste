// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
    console.log('checking')

    if (tab.url.endsWith('/new') || tab.url.endsWith('/edit')) {
        console.log('ends with')

        chrome.tabs.executeScript(tabId, {'file': 'devto.js'})
    }
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl)
