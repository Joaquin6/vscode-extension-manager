// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import ExtensionService from './extensionService';
import {listExtensions} from './galleryService';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const extensionService = new ExtensionService();

    const installMissingExtensions = vscode.commands
        .registerCommand('joaquinbriceno.vscode-extension-manager.installMissing', () => {
            extensionService.listMissingExtensions().then((extensions) => {
                if (extensions.length === 0) {
                    vscode.window.showInformationMessage('All extensions installed');
                } else {
                    listExtensions(extensions).then((exts) => {
                        const total = exts.length;
                        const promises: Array<Promise<any>> = [];

                        exts.forEach((e) => {
                            promises.push(extensionService.installExtension(e));
                        });

                        Promise.all(promises).then(() => {
                            vscode.window.showInformationMessage(`Finished installing ${total} extensions`);
                        });
                    });
                }
            });
        });

    context.subscriptions.push(installMissingExtensions);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
