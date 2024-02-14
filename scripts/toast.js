function showToast(message) {
    document.querySelector(".toast").innerHTML = ""
    document.querySelector(".toast").style.display = "block"
    document.querySelector(".toast").innerHTML = `<div class="title"></div><div class="toastBody"><span>${message}</span></div>`
    setTimeout(function(){
        document.querySelector(".toast").innerHTML = ""
        document.querySelector(".toast").style.display = "none"
    }, 5000)
}