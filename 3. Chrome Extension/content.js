// chrome.webRequest.onCompleted.addListener(
//     function(details) {
//       const targetUrlPart = '/internal/v1/users';
//       if (details.url.includes(targetUrlPart) &&
//           (details.url.includes('exacttarget.com') || details.url.includes('marketingcloudapis.com'))) {
//         // Check if the response is JSON
//         const contentType = details.responseHeaders.find(header => header.name.toLowerCase() === 'content-type');
//         if (contentType && contentType.value.toLowerCase().includes('application/json')) {
//           // Use chrome.webRequest.onCompleted to get the response body indirectly
//           // We can't directly access the response body here for security reasons.
//           // Instead, we'll send a message to the background script with the request ID
//           // and the background script will try to fetch the cached response.
//           chrome.runtime.sendMessage({
//             type: 'apiResponseReceived',
//             requestId: details.requestId
//           });
//         }
//       }
//     },
//     { urls: ["<all_urls>"], types: ["xmlhttprequest"] },
//     ["responseHeaders"]
//   );