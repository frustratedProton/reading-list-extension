document.getElementById('addButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    const title = tabs[0].title;

    chrome.storage.sync.get({ readingList: [] }, (data) => {
      const readingList = data.readingList;

      if (!readingList.some(item => item.url === url)) {
        readingList.push({ url, title });
        chrome.storage.sync.set({ readingList });
        updateList(); 
      } else {
        alert('URL already in Reading List!');
      }
    });
  });
});

function updateList() {
  chrome.storage.sync.get({ readingList: [] }, (data) => {
    const listElement = document.getElementById('readingList');
    listElement.innerHTML = ''; 
    data.readingList.forEach((item) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = item.url;
      link.textContent = item.title || item.url; 
      link.target = '_blank'; 
      link.addEventListener('click', (event) => {
        event.preventDefault();
        chrome.tabs.create({ url: link.href });
      });
      li.appendChild(link);
      listElement.appendChild(li);
    });
  });
}

updateList();
