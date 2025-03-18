const {ipcRenderer} = require("electron");

async function sendToAPI(responsesFile, stopwordsFile, action, data) {
	const args = {
		responses_file: responsesFile,
		stopwords_file: stopwordsFile,
		action: action,
		data: [data]
	};
	return await ipcRenderer.invoke("send-msg", args);
}

const settingsButton = document.getElementById("ajustes");
const modal = document.getElementById("settings");
const rfile = document.getElementById("responses_file");
const sfile = document.getElementById("stopwords_file");
const save_button = document.getElementById("save");
const filenames = ["responses.txt", "stopwords.txt"];
const goodButton = document.getElementById("y"); //y 
const badButton = document.getElementById("n"); // n
const askButton = document.getElementById("send"); //send
const response = document.getElementById("out_data");
const question = document.getElementById("question");

settingsButton.addEventListener("click", ()=> {
	modal.classList.toggle("hided");
});

save_button.addEventListener("click", async () => {
	const refile = rfile.files[0];
	const safile = sfile.files[0];
	data = [await refile.text(), await safile.text()];
	ipcRenderer.send("save-file", filenames[0], data[0]);
	ipcRenderer.send("save-file", filenames[1], data[1]);
	sendToAPI(filenames[0], filenames[1], "new");
});

function readFileContent(file) {
	return new Promise((resolve, reject) => {
		let reader = new FileReader();
		reader.onload = (e) => {
			resolve(e.target.result);
		};
		reader.onerror = (e) => {
			reject(e.target.error);
		};
		reader.readAsText(file);
	});
}

askButton.addEventListener("click", () => {
	sendToAPI(filenames[0], filenames[1], "ask", question.innerText).then(answer => {
		response.innerHTML += "<div> <img src='favicon.svg' alt='Logo' width='50' height='50'>" + answer + "</div>" ;
	});
});

goodButton.addEventListener("click", () => {
	sendToAPI(filenames[0], filenames[1], "update-log", "y").then(answer => {
		response.innerHTML += answer + "\n";
	});
});
badButton.addEventListener("click", () => {
	sendToAPI(filenames[0], filenames[1], "update-log", "n").then(answer => {
		response.innerHTML += answer + "\n";
	});
});
