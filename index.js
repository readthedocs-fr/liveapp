const { app, BrowserWindow, screen } = require('electron')

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize

    // Cree la fenetre du navigateur.
    const windowWidth = Math.floor(width / 5)
    const win = new BrowserWindow({
        width: windowWidth,
        height: height,
        webPreferences: {
            nodeIntegration: true
        },
        alwaysOnTop: true,
    })
    win.removeMenu()
    win.setPosition(width - windowWidth, 0)
    win.loadFile('index.html')
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