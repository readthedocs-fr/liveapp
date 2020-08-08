const { app, BrowserWindow, screen, ipcMain, Tray, Menu } = require('electron')
const path = require('path')

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize

    const windowWidth = (width / 5 >= 300) ? Math.floor(width / 5) : 300
    const win = new BrowserWindow({
        width: windowWidth,
        height: height,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(app.getAppPath(), 'public/preload.js')
        },
        alwaysOnTop: true,
        frame: false,
        icon: path.join(__dirname, 'public/assets/logo.png')
    })
    win.setPosition(width - windowWidth, 0)
    win.loadFile('public/index.html')

    ipcMain.on('minimizeWindow', () => win.minimize())
    ipcMain.on('closeWindow', () => win.close())

    return win
}

app.whenReady().then(() => {
    const win = createWindow()
    const tray = new Tray(path.join(__dirname, 'public/assets/logo.png'))
    
    tray.setToolTip('LiveApp')
    tray.setContextMenu(Menu.buildFromTemplate([
        {label: 'Minimize', click: () => win.minimize()},
        {label: 'Quit', click: () => app.quit()}
    ]))
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

/*
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
*/
