const source = new EventSource("http://localhost:20000/sse/test")
source.onmessage = (event) => console.log("SSE event", event.data)

const btn1 = document.getElementById("button")
const btnMinimize = document.getElementById("buttonMinimize")
const btnRestore = document.getElementById("buttonRestore")
const btnMaximize = document.getElementById("buttonMaximize")
const btnClose = document.getElementById("buttonClose")
const btnWindowState = document.getElementById("buttonWindowState")
const btnDevTools = document.getElementById("buttonDevTools")
const dropZone = document.getElementById("dropZone")
const dragZone = document.getElementById("dragZone")
const devTools = document.getElementById("buttonDevTools")

webViewRegisterDragEnd(() => dragZone.classList.remove("blurry"))

const onDragStart = evt => { 
    dragZone.classList.add("blurry")
    webViewDragStart(["d:\VoiceKids.ts"])
    evt.preventDefault()
}

devTools.onclick = () => webViewShowDevTools()

dragZone.ondragstart = onDragStart    

document.body.addEventListener("dragover", e => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = "none"
})

dropZone.addEventListener("dragover", e => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = evt.shiftKey ? "move" : "copy"
})

dropZone.addEventListener("drop", e => {
    e.preventDefault()
    e.stopPropagation()
    webViewDropFiles("dropZone", true, e.dataTransfer.files)
})

btn1.onclick = async () => {
    var res = await webViewRequest("cmd1", {
        text: "Text",
        id: 123
    })
    console.log("cmd1", res)
}

btnClose.onclick = () => window.close()
btnMinimize.onclick = () => webViewMinimize()
btnRestore.onclick = () => webViewRestore()
btnMaximize.onclick = () => webViewMaximize()
btnDevTools.onclick = () => webViewShowDevTools()

btnWindowState.onclick = async () => {
    alert(`Window State: ${await webViewGetWindowState()}`)
}
