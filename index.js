const { app, BrowserWindow, screen, ipcMain } = require('electron')

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize

    const windowWidth = (width / 5 >= 300) ? Math.floor(width / 5) : 300
    const win = new BrowserWindow({
        width: windowWidth,
        height: height,
        webPreferences: {
            nodeIntegration: true
        },
        alwaysOnTop: true,
        frame: false,
// FIXME Fix build when adding the icon
//        icon: 'assets/logo.png'
    })
    win.setPosition(width - windowWidth, 0)
    win.loadFile('public/index.html')

    ipcMain.on('minimizeWindow', () => win.minimize())
    ipcMain.on('closeWindow', () => win.close())
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
