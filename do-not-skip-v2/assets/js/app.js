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