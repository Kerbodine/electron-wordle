const path = require("path");

const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
  const win = new BrowserWindow({
    width: 320,
    height: 640,
    minWidth: 320,
    minHeight: 640,
    maxWidth: 320,
    maxHeight: 640,
    frame: false,
    titleBarStyle: "hidden",
    fullscreenable: false,
    trafficLightPosition: { x: 19, y: 18 },
    fullscreenable: false,
    fullscreen: false,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
