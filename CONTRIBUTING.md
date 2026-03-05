# Contributing to Bookmarklet Forge & Directory

First off, thank you for considering contributing to this project! It's people like you that make the open-source community such a great place to learn, inspire, and create.

Whether you want to add a new bookmarklet to the public directory or improve the core platform, this guide will help you get started.

---

## 🚀 Option 1: Adding a New Bookmarklet (The Easy Way)
You do not need to modify any core HTML, CSS, or JS files to submit a new tool. The platform uses a dynamic **Registry Pattern**.

We have built an automated tool to generate your contribution files.
1. Open the [Builder Page](https://AhmedE404.github.io/Bookmarklet-Share-Tool/builder/).
2. Fill in your tool's details (Name, Category, Description, Author, GitHub Handle, and the JS Code).
3. Click the **"Submit to Directory"** button.
4. Follow the auto-generated **Contribution Guide** on the screen, which will instruct you to:
   * Create a new `.js` file in the `bookmarklets/` folder and paste your code.
   * Append the generated JSON block to the `data/registry.json` array.
5. Commit your changes and open a **Pull Request**.

---

## 💻 Option 2: Contributing to the Core Platform
If you want to fix bugs, add new features to the UI, or add new languages, please follow these guidelines:

### Development Setup
This project uses 100% Vanilla JavaScript, HTML, and CSS. No package managers (npm/yarn) or build tools are required.

1. **Fork** the repository and **clone** it locally:
```bash
   git clone https://github.com/YOUR-USERNAME/Bookmarklet-Share-Tool.git

```

2. Open the project folder in your preferred code editor.
3. Use a local server (like the VS Code "Live Server" extension) to run the project. *Note: Opening the files directly via `file://` might block the `fetch()` API used for reading JSON files due to CORS policies.*

### Project Architecture & Rules

* **DRY Principle:** Core logic shared across pages (i18n, compression, toasts) lives in `js/shared.js`. Do not duplicate logic in `directory.js` or `builder.js`.
* **Adding Languages:** To add a new language, create a new `{lang}.json` file in the `locales/` directory, and add the language key to the `supportedLangs` object inside `js/shared.js`.
* **Styling:** Keep styles modular. `shared.css` is for global UI elements (navbar, buttons), `directory.css` is for the main data table, and `builder.css` is for the builder forms.
* **No External Libraries:** Please do not introduce third-party libraries or frameworks. The platform must remain lightweight and dependency-free.

### Submitting Your Pull Request

1. Create a branch for your feature (`git checkout -b feature/amazing-feature`).
2. Commit your changes with clear, descriptive messages (`git commit -m "feat: added dark mode toggle to UI"`).
3. Push to your branch (`git push origin feature/amazing-feature`).
4. Open a Pull Request against the `main` branch.

Thank you for contributing!