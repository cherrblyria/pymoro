const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 210,
    height: 230,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      devTools: true,
    },
  });

  win.loadFile("src/index.html");
  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
