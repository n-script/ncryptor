import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as CryptoJS from 'crypto-js';


const ALGORITHMS = ['AES', 'DES', 'TripleDES', 'RC4'];


export function activate(context: vscode.ExtensionContext) {
  // Encrypt Command
  let encryptDisposable = vscode.commands.registerCommand('extension.encryptFile', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No file selected.');
      return;
    }

    const filePath = editor.document.fileName;
    const content = editor.document.getText();

    const key = await vscode.window.showInputBox({ prompt: 'Enter encryption key', password: true });
    if (!key) {
      vscode.window.showErrorMessage('Encryption key is required.');
      return;
    }

    const algorithm = await vscode.window.showQuickPick(ALGORITHMS, { placeHolder: 'Select encryption algorithm' });
    if (!algorithm) {
      vscode.window.showErrorMessage('Encryption algorithm is required.');
      return;
    }

    let encrypted: string;
    switch (algorithm) {
      case 'AES':
        encrypted = CryptoJS.AES.encrypt(content, key).toString();
        break;
      case 'DES':
        encrypted = CryptoJS.DES.encrypt(content, key).toString();
        break;
      case 'TripleDES':
        encrypted = CryptoJS.TripleDES.encrypt(content, key).toString();
        break;
      case 'RC4':
        encrypted = CryptoJS.RC4.encrypt(content, key).toString();
        break;
      default:
        vscode.window.showErrorMessage('Unsupported algorithm.');
        return;
    }

    const encryptedFilePath = filePath + '.enc';
    fs.writeFileSync(encryptedFilePath, encrypted);

    vscode.window.showInformationMessage(`File encrypted and saved as ${path.basename(encryptedFilePath)}`);
  });

  // Decrypt Command
  let decryptDisposable = vscode.commands.registerCommand('extension.decryptFile', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No file selected.');
      return;
    }

    const filePath = editor.document.fileName;
    const encryptedContent = editor.document.getText();

    const key = await vscode.window.showInputBox({ prompt: 'Enter decryption key', password: true });
    if (!key) {
      vscode.window.showErrorMessage('Decryption key is required.');
      return;
    }

    const algorithm = await vscode.window.showQuickPick(ALGORITHMS, { placeHolder: 'Select decryption algorithm' });
    if (!algorithm) {
      vscode.window.showErrorMessage('Decryption algorithm is required.');
      return;
    }

    let decrypted: string;
    try {
      switch (algorithm) {
        case 'AES':
          decrypted = CryptoJS.AES.decrypt(encryptedContent, key).toString(CryptoJS.enc.Utf8);
          break;
        case 'DES':
          decrypted = CryptoJS.DES.decrypt(encryptedContent, key).toString(CryptoJS.enc.Utf8);
          break;
        case 'TripleDES':
          decrypted = CryptoJS.TripleDES.decrypt(encryptedContent, key).toString(CryptoJS.enc.Utf8);
          break;
        case 'RC4':
          decrypted = CryptoJS.RC4.decrypt(encryptedContent, key).toString(CryptoJS.enc.Utf8);
          break;
        default:
          vscode.window.showErrorMessage('Unsupported algorithm.');
          return;
      }
    } catch (error) {
      if (error instanceof Error) {
        vscode.window.showErrorMessage('Decryption failed: ' + error.message);
      } else {
        vscode.window.showErrorMessage('Decryption failed: ' + String(error));
      }
      return;
    }

    if (!decrypted) {
      vscode.window.showErrorMessage('Decryption failed. Please check your key and algorithm.');
      return;
    }

    const decryptedFilePath = filePath.replace(/\.enc$/, '') + '.decrypted';
    fs.writeFileSync(decryptedFilePath, decrypted);

    vscode.window.showInformationMessage(`File decrypted and saved as ${path.basename(decryptedFilePath)}`);
  });

  context.subscriptions.push(encryptDisposable);
  context.subscriptions.push(decryptDisposable);
}


async function processSelection(
  processFn: (text: string, key: string, algorithm: string) => string,
  prompt: string
) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('No active editor');
    return;
  }

  const key = await vscode.window.showInputBox({ prompt, password: true });
  if (!key) {
    vscode.window.showErrorMessage('Key is required.');
    return;
  }

  const algorithm = await vscode.window.showQuickPick(ALGORITHMS, { placeHolder: 'Select algorithm' });
  if (!algorithm) {
    vscode.window.showErrorMessage('Algorithm is required.');
    return;
  }

  await editor.edit(editBuilder => {
    for (const selection of editor.selections) {
      const text = editor.document.getText(selection);
      const processed = processFn(text, key, algorithm);
      editBuilder.replace(selection, processed);
    }
  });
}

// Encryption command
vscode.commands.registerCommand('extension.encryptSelection', async () => {
  await processSelection(
    (text, key, algorithm) => {
      switch (algorithm) {
        case 'AES': return CryptoJS.AES.encrypt(text, key).toString();
        case 'DES': return CryptoJS.DES.encrypt(text, key).toString();
        case 'TripleDES': return CryptoJS.TripleDES.encrypt(text, key).toString();
        case 'RC4': return CryptoJS.RC4.encrypt(text, key).toString();
        default: return text;
      }
    },
    'Enter encryption key'
  );
});

// Decryption command
vscode.commands.registerCommand('extension.decryptSelection', async () => {
  await processSelection(
    (text, key, algorithm) => {
      switch (algorithm) {
        case 'AES': return CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
        case 'DES': return CryptoJS.DES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
        case 'TripleDES': return CryptoJS.TripleDES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
        case 'RC4': return CryptoJS.RC4.decrypt(text, key).toString(CryptoJS.enc.Utf8);
        default: return text;
      }
    },
    'Enter decryption key'
  );
});