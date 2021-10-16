
function saveOptions(e) {
  console.error(document.querySelector("#experimental"))
  browser.storage.local.set({
    useExperimentalMode: document.querySelector("#experimental").checked
  });
  e.preventDefault();
}

function restoreOptions() {
  var gettingItem = browser.storage.local.get('useExperimentalMode');
  gettingItem.then((res) => {
    document.querySelector("#experimental").checked = res.useExperimentalMode || false;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("#experimental").addEventListener("change", saveOptions);
