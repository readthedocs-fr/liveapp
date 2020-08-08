// when no preloading is done, for pages with nodeIntegration enabled
if (ipcRenderer === undefined) {
    global.ipcRenderer = require('electron')
}

document.getElementById('minimize').addEventListener('click', () => ipcRenderer.send('minimizeWindow'))
document.getElementById('close').addEventListener('click', () => ipcRenderer.send('closeWindow'))
