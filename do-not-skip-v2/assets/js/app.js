const gameMenu = document.querySelector('#game-menu')
const playBtn = document.querySelector('#Play')
const loadingScreen = document.querySelector('#loadingScreen')
const optionsBtn = document.querySelector('#Options')
const tips = document.querySelector('.tips')
const cross = document.querySelector('.cross')
const optionsMenu = document.querySelector('#options-menu')
const gameWindows = document.querySelector('#game-screen')
const skipLoadingBtn = document.querySelector('#skippLoading')
const jam = document.querySelector('#jam')
const mainWindow = document.querySelector('.main-window')
let tipsLen = 0;
let skipped = false;


// loading screen functions

let sayTips = () => {
    let tipsArr = ["do you know where u are, cuz i dont", "its dark in here", "dont criticize musical taste", "Seriously dont skip...", "Good luck"]
    tips.textContent = "Tips : " + tipsArr[tipsLen];
    tipsLen++;
}

let endLoadingScreen = (tipsSpinner) => {
    loadingScreen.classList.add('hidden')
    gameWindows.classList.remove('hidden')
    clearInterval(tipsSpinner)
    jam.pause()
}

// jouer au jeux

playBtn.addEventListener('click', () => {
    gameMenu.classList.add('hidden')
    loadingScreen.classList.remove('hidden')
    let tipsSpinner = setInterval(sayTips, 5000);
    jam.play()

    setTimeout(() => {
        if (skipped) console.log('alr skipped')
        else endLoadingScreen(tipsSpinner);
      }, 30000);      
})

optionsBtn.addEventListener('click', () => {
    optionsMenu.classList.remove('hidden')
})

cross.addEventListener('click', () => {
    optionsMenu.classList.add('hidden')
})

skipLoadingBtn.addEventListener('click', () => {
    endLoadingScreen();
    skipped = true
    skipCount++;
})

let newX = 0, newY = 0, startX = 0, startY = 0;
let card = document.querySelector('#options-menu')
card.addEventListener('mousedown', mouseDown)

function mouseDown(e){
    startX = e.clientX
    startY = e.clientY

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
}

function mouseMove(e){
    newX = startX - e.clientX 
    newY = startY - e.clientY 
  
    startX = e.clientX
    startY = e.clientY

    optionsMenu.style.top = (card.offsetTop - newY) + 'px'
    optionsMenu.style.left = (card.offsetLeft - newX) + 'px'
}

function mouseUp(e){
    document.removeEventListener('mousemove', mouseMove)
}

let newXX = 0, newYY = 0, startXX = 0, startYY = 0;
let cards = document.querySelector('.border')
cards.addEventListener('mousedown', NewmouseDown)

function NewmouseDown(e){
    startX = e.clientX
    startY = e.clientY

    document.addEventListener('mousemove', NewmouseMove)
    document.addEventListener('mouseup', NewmouseUp)
}

function NewmouseMove(e){
    newXX = startX - e.clientX
    newYY = startY - e.clientY
  
    startX = e.clientX
    startY = e.clientY

    mainWindow.style.top = (cards.offsetTop - newYY) + 'px'
    mainWindow.style.left = (cards.offsetLeft - newXX) + 'px'
}

function NewmouseUp(e){
    document.removeEventListener('mousemove', NewmouseMove)
}