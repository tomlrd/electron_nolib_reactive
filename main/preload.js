window.addEventListener("DOMContentLoaded", () => {
  const { ipcRenderer } = require("electron");
  var counterDiv = document.getElementById("counter")
  var BtnIncrDiv = document.getElementById("btn")
  var BtnStorageDiv = document.getElementById("btnstorage")
  var storage = []

  // INIT CONTENT IF LOCALSTORAGE
  for (const [key, value] of Object.entries(localStorage)) {
    storage.push(`${key}: ${value}`);
    if (key === "counter") {
      counterDiv.textContent = value
      ipcRenderer.send('counter:set', value)
    }
  }

  // EVENTS
  BtnIncrDiv.onclick = function () {
    ipcRenderer.send('counter:incr')
    ipcRenderer.on('counter:fetch', (event, arg) => {
      counterDiv.textContent = arg
    })
    return false;
  };
  BtnStorageDiv.onclick = function () {
    ipcRenderer.send('storage:setitem', { name: "counter", value: JSON.parse(counterDiv.innerHTML) })
    ipcRenderer.on('storage:fetch', (event, arg) => {
      //counterDiv.textContent = arg.value
    })
    return false;
  };
});

