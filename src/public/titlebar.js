document.getElementById('minimize').addEventListener('click', () => ipcRenderer.send('minimizeWindow'))
document.getElementById('close').addEventListener('click', () => ipcRenderer.send('closeWindow'))
