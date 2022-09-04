import { app, BrowserWindow, ipcMain } from "electron";
const { autoUpdater } = require("electron-updater");
import { fs, path } from "./scripts/requiredLib";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
	app.quit();
}
let mainWindow: BrowserWindow;

const createWindow = (): void => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		height: 600,
		width: 800,
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

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	mainWindow.once("ready-to-show", () => {
		autoUpdater.checkForUpdatesAndNotify();
	});
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

ipcMain.on("restart_app", () => {
	autoUpdater.quitAndInstall();
});

autoUpdater.on("update-available", () => {
	mainWindow.webContents.send("update_available");
});
autoUpdater.on("update-downloaded", () => {
	mainWindow.webContents.send("update_downloaded");
});