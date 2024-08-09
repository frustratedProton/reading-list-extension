chrome.browserAction.onClicked.addListener((tab) => {
  const url = tab.url;

  chrome.storage.sync.get({ readingList: [] }, (data) => {
    const readingList = data.readingList;

    if (!readingList.includes(url)) {
      readingList.push(url);
      chrome.storage.sync.set({ readingList });
      chrome.browserAction.setBadgeText({ text: String(readingList.length) });
    }
  });
});