# Reading List Browser Extension

## Overview

The Reading List Browser Extension is a simple tool for managing URLs of web pages you want to revisit. With this extension, you can easily add the current tab's URL to a reading list by clicking a button. The extension displays a list of saved URLs in the popup, allowing you to view or open them later.

> This extension might break after manifest v3, i dont 't plan on making it compatible with it. Might do that some time in the future.

## Features

- **Add Current Tab URL:** Click the "Add" button to save the URL and title of the current tab.
- **View Reading List:** See a list of saved URLs with their titles in the extension popup.
- **Open Links:** Click on any link in the popup to open it in a new tab.

## Installation

### For Chrome

1. Clone the repository:
   ```bash
   git clone https://github.com/frustratedProton/reading-list-extension
   ```

2. Go to [chrome://extensions/](chrome://extensions/) in Chrome.

3. Enable **Developer mode** by toggling the switch in the top right corner.

4. Click on **Load unpacked** and select the directory where you cloned the repository.

### For Firefox

1. Clone the repository:
   ```bash
   git clone https://github.com/frustratedProton/reading-list-extension
   ```

2. Go to [about:debugging](about:debugging) in Firefox.

3. Click on **This Firefox** (or **This Nightly**).

4. Click on **Load Temporary Add-on** and select the `manifest.json` file from the directory where you cloned the repository.

**Alternatively download the signed .xpi file from [releases](https://github.com/frustratedProton/reading-list-extension/releases)**

### For Edge

1. Clone the repository:
   ```bash
   git clone https://github.com/frustratedProton/reading-list-extension
   ```

2. Go to [edge://extensions/](edge://extensions/) in Edge.

3. Enable **Developer mode** by toggling the switch in the bottom-left corner.

4. Click on **Load unpacked** and select the directory where you cloned the repository.

## Usage

1. **Add URL to Reading List:**
   - Navigate to the tab you want to add.
   - Click the extension icon in the toolbar.
   - Click the **"Add Current Tab"** button in the popup.

2. **View and Open URLs:**
   - Click the extension icon to open the popup.
   - View the list of saved URLs with titles.
   - Click on any link to open it in a new tab.

## Compatibility

The Reading List Browser Extension has been tested with the following browser versions:

- **Google Chrome:**
  - Version 127.0.6533.100 (Official Build) (64-bit)
  
- **Microsoft Edge:**
  - Version 127.0.2651.98 (Official Build) (64-bit)
  
- **Mozilla Firefox:**
  - Version 129.0

## File Structure

    manifest.json: The manifest file that defines the extension's settings and permissions.
    background.js: Contains the background script to handle tab interactions and storage.
    popup.html: The HTML for the popup UI.
    popup.js: The JavaScript for handling interactions within the popup.
    icon.png: The icon for the extension.

## Image Credits

The icon used in the extension was sourced from [Dreamstime](https://www.dreamstime.com/vector-pixel-art-book-icon-game-development-editable-vector-book-icon-pixel-art-illustration-game-development-game-asset-image247837097)
