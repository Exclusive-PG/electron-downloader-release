import { ipcRenderer } from "electron";
import ParserLink from "../parserLink/parserLink";
const webSocket = require("ws");
const parserLink = new ParserLink();

const wsServer = new webSocket.Server({ port: 80 });
wsServer.on("connection", onConnect);
function onConnect(wsClient: any) {
	wsClient.send("Hello");
	console.log(wsClient);
	console.log("GOP");
	setTimeout(() => {
		ipcRenderer.send("get_argument");
	}, 2000);
}

ipcRenderer.on("get_argument", (event, arg) => {
	console.log(arg.argApp);
	if (arg.argApp === "." || arg.argApp === undefined) return;
	let parsedLink = parserLink.parse(arg.argApp);
	document.querySelector<HTMLInputElement>(".search__input").value = parsedLink.url;
	setTimeout(() => {
		document.querySelectorAll(".tabs__tab").forEach((item:any)=>{
			if(item.getAttribute("data-tab") === "1") {
				item.firstElementChild.click()
			}
		})
		document.querySelector<HTMLElement>(".btn-search").click();
	}, 1000);
});
