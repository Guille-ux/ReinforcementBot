const size_x = 800;
const size_y = 600;

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");
const {spawn} = require("child-process");

function window_init(w, h) {
	const mainWindow = new BrowserWindow({width: w, height: h, webPreferences: {nodeIntegration: true, contextIsolation: false, preload: path.join(__dirname, "preload.js")}}); // crea la ventana
	mainWindow.loadFile(path.join(__dirname))
}

app.whenReady().then(window_init(size_x, size_y));

app.on("window-all-closed", () =>  {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWIndows().length === 0) {
		window_init(size_x, size_y);
	}
});


icpMain.handle("send-msg", async (event, args) => {
	const process = spawn("python", [path.join(__dirname, "api/rapi.py"), args.responses_file, args.stopwords_file, args.action, ...args.data]);
	let result = "";
	for await (const data of process.stdout) {
		result += data.toString();
	}
	return result.trim();
});
