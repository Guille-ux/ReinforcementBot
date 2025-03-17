const {ipcRenderer} = require("electron");

async function sendToAPI(responsesFile, stopwordsFile, action, data) {
	const args = {
		responses_file: responsesFile,
		stopwords_file: stopwordsFile,
		action: action,
		data: data
	};
	return await ipcRenderer.invoke("send-msg", args);
}

const settingsButton = document.getElementById("ajustes");
const modal = document.getElementById("settings");
const rfile = document.getElementById("responses_file");
const sfile = document.getElementById("stopwords_file");

const save_button = document.getElementById("save");
const load_button = document.getElementById("load");

settingsButton.addEventListener("click", ()=> {
	modal.classList.toggle("hided");
});

