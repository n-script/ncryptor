# Ncrypt VS Code Extension

Ncrypt is a Visual Studio Code extension that allows you to securely encrypt selected text or files using [crypto-js](https://github.com/brix/crypto-js). With a simple command or a right-click via the editor menu, you can encrypt your data directly within VS Code.

---

## Features

- **Encrypt Selected Text:** Highlight any text in the editor and encrypt it instantly.
- **Encrypt Selected Files:** Right-click on files in the Explorer to encrypt their contents.
- **Easy Access:** Use the Command Palette or the editor context menu option labeled **"Ncrypt"**.
- **Secure Encryption:** Utilizes [crypto-js](https://github.com/brix/crypto-js) for robust encryption.

---

## Usage

### Encrypting Selected Text

1. Select the text you want to encrypt in the editor.
2. Right-click and choose **Ncrypt** from the context menu, or open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and run `Ncrypt: Encrypt Selection with NCryptor`.

### Encrypting Files

1. In the Explorer, right-click on a file or multiple files.
2. Choose **Ncrypt** from the context menu to encrypt the selected files.

---

## Extension Settings

This extension does not add any custom settings at this time.

---

## Known Issues

- The extension is currently in **beta mode** and may contain bugs or incomplete features.
- If you encounter any issues or have suggestions, please report them via [GitHub Issues](https://github.com/n-script/ncryptor/issues).
- Currently, file encryption is limited to one file at a time.
- Large files may take longer to process.

---

## Release Notes

### 1.0.0

- Initial release: Encrypt selected text or files using crypto-js via the "Ncrypt" command and context menu.

---

## Development & Contributing

We welcome contributions! If you’d like to work on this extension, here’s how to get started:

### Bootstrapping

- This project was bootstrapped using the Yeoman VS Code Extension Generator:
  ```sh
  npx --package yo --package generator-code -- yo code
  ```

### Package Manager

- This project uses [`pnpm`](https://pnpm.io/) as its package manager.
- To install dependencies, run:
  ```sh
  pnpm install
  ```

### Development Workflow

1. Open the project folder in VS Code:
   ```sh
   code .
   ```
2. Press `F5` to open a new Extension Development Host window for testing.
3. Make your changes in the `src/extension.ts` (or `src/extension.js` if using JavaScript).
4. To package the extension for distribution, use:
   ```sh
   pnpm run package
   ```
   (Make sure you have [`vsce`](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) installed globally.)

### Contributing

- Pull requests and suggestions are welcome!
- Please ensure any code changes are well-tested and follow VS Code extension guidelines.

---

## Following Extension Guidelines

This extension follows [VS Code extension guidelines](https://code.visualstudio.com/api/references/extension-guidelines) and best practices for security and usability.

---

**Enjoy using Ncrypt to keep your data secure!**