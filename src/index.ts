import electron, { app, BrowserWindow, ipcMain } from "electron";
import { fs, path, url } from "./scripts/requiredLib";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
	app.quit();
}
let mainWindow: BrowserWindow;

const createWindow = (): void => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		minHeight: 800,
		minWidth: 1000,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			nodeIntegrationInWorker: true,
			webSecurity: false,
		},
		autoHideMenuBar: true,
		icon: "./src/assets/images/icon.ico",
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

app.on("ready", () => {
	createWindow();
	if (process.argv[2] !== undefined) argvGlobal = process.argv[2];
});

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
let argvGlobal: any;
ipcMain.on("get_argument", (event) => {
	//event.sender.send("get_argument", { argApp: app.commandLine.getSwitchValue("arg1") });
	event.sender.send("get_argument", { argApp: argvGlobal });
});

// mainWindow.webContents.on('did-finish-load',WindowsReady);

// function WindowsReady() {
//     console.log('Ready');
// }

//auto updating
require("update-electron-app")({
	repo: "Exclusive-PG/electron-downloader-release",
	notifyUser: true,
	logger: require("electron-log"),
});

//protocol
if (!process.defaultApp) {
	if (process.argv.length >= 2) {
		app.setAsDefaultProtocolClient("exclusive-ytd", process.execPath, [path.resolve(process.argv[1])]);
	} else if (process.argv.length >= 3) {
		app.setAsDefaultProtocolClient("exclusive-ytd", process.execPath, [path.resolve(process.argv[2])]);
	} else {
		app.setAsDefaultProtocolClient("exclusive-ytd");
	}
}
let deeplinkingUrl;
// Force single application instance
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
	app.quit();
} else {
	app.on("second-instance", (e, argv) => {
		if (process.platform !== "darwin") {
			// Find the arg that is our custom protocol url and store it
			argvGlobal = argv.find((arg) => arg.startsWith("exclusive-ytd://"));
		}

		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore(); mainWindow.focus();
		}
	});
}

electron.app.once('window-all-closed', electron.app.quit);
electron.app.once('before-quit', () => {
    mainWindow.removeAllListeners('close');
});

ipcMain.on('exampletab:close', () => {
    ipcMain.removeAllListeners();
    mainWindow.close();
});