document.addEventListener('DOMContentLoaded', function () {
  // Load journeys
  chrome.runtime.sendMessage({ type: "fetchJourneyData" }, function(response) {
    if (response?.success) {
      chrome.storage.local.get(['journeyData'], function (result) {
        const data = result.journeyData || [];
        const tbody = document.querySelector('#journeyTable tbody');
        tbody.innerHTML = '';
        data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.status}</td>
            <td>${new Date(item.createdDate).toLocaleString()}</td>
            <td>${new Date(item.modifiedDate).toLocaleString()}</td>
            <td>${item.stats?.currentPopulation ?? 0}</td>
            <td>${item.stats?.cumulativePopulation ?? 0}</td>
          `;
          tbody.appendChild(row);
        });
      });
    }
  });

});
