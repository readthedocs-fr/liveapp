const { app, BrowserWindow, screen, ipcMain, Tray, Menu } = require('electron')
const path = require('path')
const { create } = require('domain')

let mainWindow
let configWindow

function createMainWindow() {
    if (mainWindow !== undefined) {
        return
    }

    const { width, height } = screen.getPrimaryDisplay().workAreaSize

    const windowWidth = (width / 5 >= 300) ? Math.floor(width / 5) : 300
    mainWindow = new BrowserWindow({
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
    mainWindow.setPosition(width - windowWidth, 0)
    mainWindow.loadFile('public/index.html')

    mainWindow.on('closed', () => mainWindow = undefined)

    ipcMain.on('minimizeWindow', () => mainWindow.minimize())
    ipcMain.on('closeWindow', () => mainWindow.close())

    return mainWindow
}

function createConfigWindow() {
    if (configWindow !== undefined) {
        return
    }
    
    configWindow = new BrowserWindow({
        width: 300,
        height: 120,
        webPreferences: {
            nodeIntegration: true
        },
        parent: mainWindow
    })
    configWindow.removeMenu()
    configWindow.center()
    configWindow.loadFile('public/config.html')

    configWindow.on('closed', () => configWindow = undefined)
}

app.whenReady().then(() => {
    const win = createMainWindow()
    const tray = new Tray(path.join(__dirname, 'public/assets/logo.png'))
    
    tray.setToolTip('LiveApp')
    tray.setContextMenu(Menu.buildFromTemplate([
        {label: 'Configure', click: createConfigWindow},
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
