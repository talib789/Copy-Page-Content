chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "Copy Page Content",
    contexts: ["page"],
    id: "copyPageContent"
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copyPageContent") {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: () => {
        const pageContent = document.documentElement.outerHTML;
        navigator.clipboard.writeText(pageContent).then(() => {
          console.log("Page content copied to clipboard");
        });
      }
    });
  }
});

