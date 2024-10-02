const gameMenu = document.querySelector('#game-menu')
const playBtn = document.querySelector('#Play')
const loadingScreen = document.querySelector('#loadingScreen')
const optionsBtn = document.querySelector('#Options')
const tips = document.querySelector('.tips')
const cross = document.querySelector('.cross')
const optionsMenu = document.querySelector('#options-menu')
const windowOptions = document.querySelector('.window-container')
const gameWindows = document.querySelector('#game-screen')
const skipLoadingBtn = document.querySelector('#skippLoading')
const jam = document.querySelector('#jam')
const twScreen = document.querySelector('#tw')
const allPage = document.querySelector('*')
const warningText = document.querySelector('#warning')
const headphones = document.querySelector('.fa-headphones-simple')
const expand = document.querySelector('#expand')
const expandImage = document.querySelector('.fa-expand')
let tipsLen = 0;
let skipped = false;
let fullscreen = false


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

expand.addEventListener('click', function () {
    console.log('clicked')
    optionsMenu.classList.toggle('full-mode')
    if (optionsMenu.classList.contains('full-mode')) {
        fullscreen = true
        optionsMenu.style.top = "0"
        optionsMenu.style.left = "0"
        optionsMenu.style.width = "100%"
        optionsMenu.style.height = "100vh"
        optionsMenu.style.position = "absolute"
    } else {
        fullscreen = false
        optionsMenu.style.width = "60%"
        optionsMenu.style.height = "800px"
        optionsMenu.style.position = "fixed"
    }
    expandImage.classList.toggle('fa-expand')
    expandImage.classList.toggle('fa-compress')
})

skipLoadingBtn.addEventListener('click', () => {
    endLoadingScreen();
    skipped = true
    textAppair.classList.add('typewriter')
    skipCount++;
})

let newX = 0, newY = 0, startX = 0, startY = 0;

let card = document.querySelector('#options-menu')


card.addEventListener('mousedown', mouseDown)

function mouseDown(e) {
    startX = e.clientX
    startY = e.clientY

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
}

function mouseMove(e) {
    if(fullscreen == true) {
        return null
    }
    newX = startX - e.clientX
    newY = startY - e.clientY

    startX = e.clientX
    startY = e.clientY

    optionsMenu.style.top = (card.offsetTop - newY) + 'px'
    optionsMenu.style.left = (card.offsetLeft - newX) + 'px'
}

function mouseUp(e) {
    document.removeEventListener('mousemove', mouseMove)
}


setTimeout(() => {
    allPage.classList.add('transition')
    setTimeout(() => {
        headphones.classList.remove('hidden')
        warningText.textContent = "Use headphones for a better experience."
    }, 2000)
}, 5000)


setTimeout(() => {
    allPage.classList.remove('transition')
    setTimeout(() => {
        allPage.classList.add('transition')
    }, 2000)
    setTimeout(() => {
        headphones.classList.add('hidden')
        let redName1 = '<span class="red">ZEUS</span>'
        let redName2 = '<span class="red">Aomigo</span>'
        warningText.innerHTML = "A game made by " + redName1 + " and " + redName2
    }, 4000)
}, 13000)

setTimeout(() => {
    allPage.classList.remove('transition')
    setTimeout(() => {
        allPage.classList.add('transition')
    }, 2000)
    setTimeout(() => {
        twScreen.classList.add('hidden')
        gameMenu.classList.remove('hidden')
    }, 4000)
}, 21000)

setTimeout(() => {
    allPage.classList.remove('transition')
}, 28000)
