// when no preloading is done, for pages with nodeIntegration enabled
if (ipcRenderer === undefined) {
    global.ipcRenderer = require('electron')
}

document.getElementById('titlebar').innerHTML = `<a>Live App — Read The Docs</a>
<div class="buttons">
    <div id="minimize">
        <img src="assets/fontawesome5/minimize.svg" alt="minimize window">
    </div>
    <div id="close">
        <img src="assets/fontawesome5/close.svg" alt="close window">
    </div>
</div>`

document.getElementById('minimize').addEventListener('click', () => ipcRenderer.send('minimizeWindow'))
document.getElementById('close').addEventListener('click', () => ipcRenderer.send('closeWindow'))
