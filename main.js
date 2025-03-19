const size_x = 800;
const size_y = 600;

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");
const {spawn} = require("child_process");
const fs = require("fs");

function window_init(w, h) {
	const mainWindow = new BrowserWindow({width: w, height: h, webPreferences: {nodeIntegration: true, contextIsolation: false, preload: path.join(__dirname, "preload.js")}}); // crea la ventana
	mainWindow.loadFile(path.join(__dirname, "index.html"))
}

app.whenReady().then(() => window_init(size_x, size_y));

app.on("window-all-closed", () =>  {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		window_init(size_x, size_y);
	}
});


ipcMain.handle("send-msg", async (event, args) => {
	const process = spawn(path.join(__dirname, "../../api/api"), [path.join(app.getPath("userData"), args.responses_file), path.join(app.getPath("userData"), args.stopwords_file), args.action, ...args.data]);
	let result = "";
	for await (const data of process.stdout) {
		result += data.toString();
	}
	return result.trim();
});

ipcMain.on("save-config", (event, config) => {
	const configFilePath = path.join(app.getPath("userData"), "config.json");
	fs.writeFileSync(configFilePath, JSON.stringify(config));	
});
ipcMain.on("load-config", (event) => {
	const configFilePath = path.join(app.getPath("userData"), "config.json");
	const configData = fs.readFileSync(configFilePath, "utf-8");
	return JSON.parse(configData);
});
ipcMain.on("save-file", (event, name, data)=> {
	const filePath = path.join(app.getPath("userData"), name);
	fs.writeFile(filePath, data, (err) => {
		if (err) {
			console.log("Error writing the file!");
		} else {
			console.log("Saved without errors");
		}
	});
});
ipcMain.on("save-f", (event, name, data)=> {
	const filePath = path.join(__dirname, name);
	fs.writeFile(filePath, data, (err) => {
		if (err) {
			console.log("Error writing the file!");
		} else {
			console.log("Saved without errors");
		}
	});
});
