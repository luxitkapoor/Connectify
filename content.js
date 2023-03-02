const btnClassName = "artdeco-button artdeco-button--2 artdeco-button--secondary ember-view"
const exitButtonClass = "artdeco-modal__dismiss artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--2 artdeco-button--tertiary ember-view"
let flag = false
chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage(message, sender, response){
    console.log(message)
    if (message.type == "start"){
        flag = false
        startSending()
    }else if(message.type == "stop"){
        flag = true
    }
    
}

function getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

async function startSending(){
    let buttons = document.getElementsByClassName(btnClassName)
    // let buttons = [1000,2000,3000,4000,5000,6000,7000,8000,9000,1000]
    
    let validButtons = 0
    for (let i of buttons){
        if (i.getAttribute("aria-label") && i.getAttribute("aria-label").includes("connect")){
            validButtons += 1
        }
    }
    console.log(`Valid Buttons - ${validButtons}`)
    
    chrome.runtime.sendMessage({type: "count", connections: validButtons})
    for (let button of buttons){
        if (button.getAttribute("aria-label") && button.getAttribute("aria-label").includes("connect")){
        // if (button){
            if (!flag){
                let timeout = getRandomNumberBetween(3000,8000)
                console.log("Clicking Connect Button")
                button.click()
                await new Promise(resolve => setTimeout(resolve, 2000));
                let exitButtons = document.getElementsByClassName(exitButtonClass)
                console.log(`Modal Exit Button- ${exitButtons}`)
                exitButtons[0].click()
                
                chrome.runtime.sendMessage({type: "update"})
                console.log(`sleeping for ${timeout}` )
                
                let temp = await new Promise(resolve => setTimeout(resolve, timeout));
                console.log(`Back from sleep ${timeout}`)
            }else{
                console.log("received stop message")
            }
        }
        else{
            console.log("Not a connection button")
        }

    }
}
