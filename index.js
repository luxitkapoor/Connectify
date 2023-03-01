let connectBtn = document.getElementById("connect-btn")
let bodyDiv = document.getElementById("div-body")
let pageUrl = ""
connectBtn.addEventListener("click", function(){
    
        chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
        pageUrl = String(tabs[0]["url"])
        validateUrl(pageUrl)

    })
})

function validateUrl(url){
    if (pageUrl.includes("linkedin") && pageUrl.includes("people")){
        bodyDiv.innerHTML = `<p>
            This is the peoples page on linkedin
        </p>`
    }else{
        bodyDiv.innerHTML = `<p>
            This is not the peoples page on linkedin
        </p>`
    }
}