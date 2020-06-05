const { app, BrowserWindow } = require('electron')

function createWindow() {
    // Cree la fenetre du navigateur.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        alwaysOnTop: true,
    })
    win.loadFile('index.html')

    win = null
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