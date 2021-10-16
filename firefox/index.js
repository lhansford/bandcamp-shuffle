browser.pageAction.onClicked.addListener((tab) => {
  browser.tabs.executeScript({ file: "shuffle.js" });
});
