const connectBtn = document.getElementById("connect-btn")
// let bodyDiv = document.getElementById("div-body")
// let pageUrl = ""
const stopBtn = document.getElementById("stop-btn")
const progressBar = document.getElementById("progress-bar")
let count = 0
let total = 0

connectBtn.addEventListener("click", ()=>{
    sendConnectionRequests("start")
})

stopBtn.addEventListener("click",()=>{
    sendConnectionRequests("stop")
    count = 0
    total = 0
    progressBar.setAttribute("style", `width: 0%`)
    console.log("Resetting count, total and progress bar")
})

function sendConnectionRequests(requestType){
    chrome.tabs.query({active: true, currentWindow:true}, callbackTabs)
    function callbackTabs(tabs){
        const msg = {
            type : requestType
        }
        chrome.tabs.sendMessage(tabs[0].id, msg)

    }
    
}
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type == "count"){
        total = message.connections
        console.log(`Found ${total} connect buttons on page`)
    }else if(message.type == "update"){
        console.log("Received Update Message")
        count += 1
        progressBar.setAttribute("style", `width: ${Math.floor((count/total)* 100)}%`)

    }
    sendResponse({
        data: "Message Received"
    }); 
})

// function validateUrl(url){
//     if (pageUrl.includes("linkedin") && pageUrl.includes("people")){
//         bodyDiv.innerHTML = `<p>
//             This is the peoples page on linkedin
//         </p>`
//         flag = true
//         sendConnectionRequests()
//     }else{
//         bodyDiv.innerHTML = `<p>
//             This is not the peoples page on linkedin
//         </p>`
//     }
// }

