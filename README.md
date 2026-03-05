<h1 align="center">Bookmarklet Forge & Directory</h1>

<p align="center">
  <b>English</b> | <a href="README.ar.md">العربية</a>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-Vanilla-yellow.svg" alt="Vanilla JS"></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
  <br><br>
  <a href="https://github.com/AhmedE404/Bookmarklet-Share-Tool/stargazers"><img src="https://img.shields.io/github/stars/AhmedE404/Bookmarklet-Share-Tool?style=social" alt="GitHub stars"></a>
  <a href="https://github.com/AhmedE404/Bookmarklet-Share-Tool/network/members"><img src="https://img.shields.io/github/forks/AhmedE404/Bookmarklet-Share-Tool?style=social" alt="GitHub forks"></a>
</p>

<p align="center">
  🚀 <strong><a href="https://ahmede404.github.io/Bookmarklet-Share-Tool/" target="_blank">View Live Demo & Directory</a></strong> 🚀
</p>

An enterprise-grade, open-source platform designed to discover, create, test, and share JavaScript Bookmarklets. Built entirely with Vanilla JavaScript, it acts as both a **public directory** and a **developer builder environment**.

## ✨ Key Features

* **File-Explorer Directory:** A clean, sortable, and searchable data-table interface to browse community-submitted bookmarklets.
* **Smart Builder & Compressor:** Write code and instantly generate compressed, shareable URLs using the native `Compression Streams API`. No server required.
* **Remix Capabilities:** Found a tool you like? Click "Remix / Edit" to load its source code into the builder, modify it, and claim it.
* **Registry Architecture:** Scalable data management via a `registry.json` file, making open-source contributions completely frictionless and merge-conflict-free.
* **Built-in i18n:** Fully supports multiple languages (English & Arabic included) with dynamic RTL/LTR switching.

## 🛠️ How to Use

### Installing a Bookmarklet
1. Browse the [Main Directory](https://AhmedE404.github.io/Bookmarklet-Share-Tool/).
2. Find a tool and click **"Drag Me &equiv;"** and drop it into your browser's bookmarks bar.
3. *Tip: Press `Ctrl + Shift + B` (Windows) or `⌘ + Shift + B` (Mac) to show the bookmarks bar.*

### Creating & Sharing
1. Go to the **Create / Submit** page (`/builder/`).
2. Write your JavaScript payload.
3. Click **Generate Shareable Link** to get a compressed URL you can send to anyone.

## 🤝 How to Contribute (Submit your Tool)
We welcome contributions! You don't need to touch the core HTML/CSS/JS to add your tool to the directory.

1. **Fork** this repository.
2. **Add your code:** Create a new file in the `bookmarklets/` folder (e.g., `my-awesome-tool.js`).
3. **Register it:** Add your tool's metadata to `data/registry.json`:
```json
   {
     "id": "my-awesome-tool",
     "title": "My Awesome Tool",
     "description": "What your tool does.",
     "category": "Productivity",
     "author": { "name": "Your Name", "github": "your_username" },
     "file": "bookmarklets/my-awesome-tool.js",
     "added_date": "YYYY-MM-DD"
   }

```

4. **Open a Pull Request!**

*(Note: You can use the `/builder/` page on the live site to auto-generate the JSON snippet and copy it directly!)*

## 📂 Project Architecture

This project follows a strict modular structure adhering to DRY principles:

* `/js/shared.js`: Core library (i18n, compression, toasts).
* `/js/directory.js`: Handles the main page data-table rendering and filtering.
* `/js/builder.js`: Handles code compression, URL generation, and the PR helper logic.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.
