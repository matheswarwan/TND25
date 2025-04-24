chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "fetchJourneyData") {
    fetch('https://mc.s12.exacttarget.com/cloud/fuelapi//interaction/v1/interactions', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      chrome.storage.local.set({ journeyData: data.items || [] });
      sendResponse({ success: true });
    })
    .catch(error => {
      console.error('Fetch failed:', error);
      sendResponse({ success: false, error: error.message });
    });

    return true;
  }
});