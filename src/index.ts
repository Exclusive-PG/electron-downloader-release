import { app, BrowserWindow, ipcMain } from "electron";
import { fs, path , url } from "./scripts/requiredLib";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
	app.quit();
}
let mainWindow: BrowserWindow;

const createWindow = (): void => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		minHeight:800,
		minWidth:1000,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			nodeIntegrationInWorker: true,
			webSecurity: false,
		},
		autoHideMenuBar: true,
	});

	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
	
	//mainWindow.setSimpleFullScreen(true)
	
	//mainWindow.setProgressBar(100)
	
	//mainWindow.setFullScreen(true)

	// Open the DevTools.
	mainWindow.maximize();
	//mainWindow.webContents.openDevTools();

};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		// fs.writeFile("newfile.txt", "Learn Node FS module", function (err:Error) {
		// 	if (err) throw err;
		// 	console.log("File is created successfully.");
		app.quit();
		//})
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on("app_version", (event) => {
	event.sender.send("app_version", { version: app.getVersion() });
});

require('update-electron-app')({
	repo: 'Exclusive-PG/electron-downloader-release',
	notifyUser : true,
	logger: require('electron-log')
  })