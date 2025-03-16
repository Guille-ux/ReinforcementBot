const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");

function window_init(w, h) {
	const mainWindow = new BrowserWindow({width: w, height: h, webPreferences: {nodeIntegration: true, contextIsolation: false, preload: path.join(__dirname, "preload.js")}}); // crea la ventana
	mainWindow.loadFile(path.join(__dirname))
}
