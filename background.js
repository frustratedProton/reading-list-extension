chrome.browserAction.onClicked.addListener(tab => {
  const { url } = tab;

  chrome.storage.sync.get({ readingList: [] }, data => {
    const readingList = data.readingList;

    if (!readingList.some(item => item.url === url)) {
      readingList.push({ url, title: tab.title });
      chrome.storage.sync.set({ readingList });
      chrome.browserAction.setBadgeText({ text: String(readingList.length) });
    }
  });
});
