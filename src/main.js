const { app, BrowserWindow } = require("electron");

// require("electron-reload")(__dirname);

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
      devTools: false,
    },
  });

  win.loadFile("src/index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
