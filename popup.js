document.getElementById('addButton').addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const { url, title } = tabs[0];

		const validTitle = title && title.trim() !== '' ? title : url;

		chrome.storage.sync.get({ readingList: [] }, (data) => {
			const readingList = data.readingList;

			if (!readingList.some((item) => item.url === url)) {
				readingList.push({ url, title: validTitle });
				chrome.storage.sync.set({ readingList }, () => {
					updateList();
					chrome.browserAction.setBadgeText({
						text: String(readingList.length),
					});
					showNotification('Added to Reading List!');
				});
			} else {
				showNotification('URL already in Reading List!');
			}
		});
	});
});

document.getElementById('removeAllButton').addEventListener('click', () => {
	chrome.storage.sync.set({ readingList: [] }, () => {
		updateList();
		chrome.browserAction.setBadgeText({ text: '0' });
		showNotification('Removed all items from Reading List!');
	});
});

const removeItem = (url) => {
	chrome.storage.sync.get({ readingList: [] }, (data) => {
		const readingList = data.readingList.filter((item) => item.url !== url);
		chrome.storage.sync.set({ readingList }, () => {
			updateList();
			chrome.browserAction.setBadgeText({ text: String(readingList.length) });
		});
	});
};

const showNotification = (message) => {
	const notification = document.getElementById('notification');
	notification.textContent = message;
	notification.style.display = 'block';
	setTimeout(() => {
		notification.style.display = 'none';
	}, 3000);
};

const updateList = () => {
	chrome.storage.sync.get({ readingList: [] }, (data) => {
		const listElement = document.getElementById('readingList');
		const removeAllButton = document.getElementById('removeAllButton');
		const { readingList } = data;

		listElement.innerHTML = '';
		removeAllButton.style.display = readingList.length > 1 ? 'block' : 'none';

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

		chrome.browserAction.setBadgeText({ text: String(readingList.length) });
	});
};

const applyTheme = (theme) => {
	document.documentElement.setAttribute('data-theme', theme);
	chrome.storage.sync.set({ theme });
};

const initializeTheme = () => {
	chrome.storage.sync.get({ theme: 'light' }, (data) => {
		const savedTheme = data.theme;
		if (savedTheme) {
			applyTheme(savedTheme);
			document.getElementById('toggleDarkMode').checked = savedTheme === 'dark';
		} else {
			const isDarkMode = window.matchMedia(
				'(prefers-color-scheme: dark)'
			).matches;
			const initialTheme = isDarkMode ? 'dark' : 'light';
			applyTheme(initialTheme);
			document.getElementById('toggleDarkMode').checked = isDarkMode;
		}
	});
};

const handleThemeToggle = (event) => {
	const theme = event.target.checked ? 'dark' : 'light';
	applyTheme(theme);
};

document
	.getElementById('toggleDarkMode')
	.addEventListener('change', handleThemeToggle);

initializeTheme();
updateList();
