document.getElementById('addButton').addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const url = tabs[0].url;
		const title = tabs[0].title;

		chrome.storage.sync.get({ readingList: [] }, (data) => {
			const readingList = data.readingList;

			if (!readingList.some((item) => item.url === url)) {
				readingList.push({ url, title });
				chrome.storage.sync.set({ readingList });
				updateList();
			} else {
				alert('URL already in Reading List!');
			}
		});
	});
});

document.getElementById('removeAllButton').addEventListener('click', () => {
	chrome.storage.sync.set({ readingList: [] }, () => {
		updateList();
	});
});

function removeItem(url) {
	chrome.storage.sync.get({ readingList: [] }, (data) => {
		const readingList = data.readingList.filter((item) => item.url !== url);
		chrome.storage.sync.set({ readingList }, () => {
			updateList();
		});
	});
}

function updateList() {
	chrome.storage.sync.get({ readingList: [] }, (data) => {
		const listElement = document.getElementById('readingList');
		const removeAllButton = document.getElementById('removeAllButton');
		const readingList = data.readingList;

		listElement.innerHTML = '';

		if (readingList.length === 0) {
			removeAllButton.style.display = 'none';
		} else {
			removeAllButton.style.display = 'block';
			readingList.forEach((item) => {
				const li = document.createElement('li');
				const link = document.createElement('a');
				link.href = item.url;
				link.textContent = item.title || item.url;
				link.target = '_blank';
				link.addEventListener('click', (event) => {
					event.preventDefault();
					chrome.tabs.create({ url: link.href });
				});

				const removeButton = document.createElement('button');
				removeButton.textContent = 'X';
				removeButton.className = 'remove-btn';
				removeButton.addEventListener('click', () => removeItem(item.url));

				li.appendChild(link);
				li.appendChild(removeButton);
				listElement.appendChild(li);
			});
		}
	});
}

updateList();
