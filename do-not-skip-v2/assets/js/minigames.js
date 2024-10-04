const closeWindow = document.querySelector('#window-cross');
const miniGames = document.querySelector('.minigames')
const nameEXE = document.querySelector(".game-name-changer")
const looseScreen = document.querySelector('#loose-screen');
const babyGameWindow = document.querySelector('.baby-game-window')
const findTheButton = document.querySelector('.find-the-button');
const bugMinigame = document.querySelector('.bug')
let skipper;
let timerSkip;
let gameName;
let SkipGameLoose = true
let babyGameLoose = true
let memoGameRecal = 1
let timeSpeed = 1000
let memoGameRound = 0
let memoGameWindow = document.querySelector('.memos')
let memoGameError = 0;
let roundNb = 2;
let speed = 2400
let speed1 = 2200
let speed2 = 2100

let close = () => {
    miniGames.classList.add('hidden')
}

// baby game code

let babyGame = () => {
    let intervalSpeed = 500
    const nathan = document.querySelector('#nathan');
    const reset = document.querySelector('#reset')
    const comeBack = document.querySelector('#reset-not-hidden')
    const babyGameControl = document.querySelector('.baby-controls');
    const babyGameImg = document.querySelector('.baby-game');


    let margin = 0
    gameName = "Baby_Game.exe"
    nameEXE.textContent = gameName

    if (babyGameLoose == true) {
        miniGames.classList.remove('hidden')
        babyGameControl.classList.remove('hidden')
        babyGameImg.classList.remove('hidden')
        looseScreen.classList.add('hidden')
        babyGameWindow.classList.remove('hidden')
        margin = 0
        babyGameLoose = false
        reset.textContent = "reset"
    }

    // function

    let looseScreenBabyGame = () => {
        console.log('loose')
        clearInterval(avancer)
        babyGameControl.classList.add('hidden')
        babyGameImg.classList.add('hidden')
        looseScreen.classList.remove('hidden')
        babyGameLoose = true
        nameEXE.textContent = "Looser.exe"
        return null
    }

    let avancerNathan = () => {
        if (margin == 65) {
            looseScreenBabyGame();
            clearInterval(avancer)
        };
        margin++;
        console.log(intervalSpeed)
        nathan.style.marginRight = margin + "%"
    }

    let avancer = setInterval(avancerNathan, intervalSpeed)

    //event

    reset.addEventListener('click', () => {
        if (reset.classList.contains('cacher')) return null;
        if (reset.textContent == "skip ?") {
            clearInterval(avancer)
            looseScreenBabyGame();
        } else {
            let rdm = Math.floor(Math.random() * 100)
            if (rdm >= 95) {
                setTimeout(() => {
                    reset.textContent = "skip ?"
                }, 500)
            }
            console.log(rdm)
            margin = 0
            intervalSpeed -= 50
            clearInterval(avancer)
            avancer = setInterval(avancerNathan, intervalSpeed)
            reset.classList.add('cacher')
            comeBack.classList.remove('cacher')
        }
    })

    comeBack.addEventListener('click', () => {
        if (comeBack.classList.contains('cacher')) return null;
        reset.classList.remove('cacher')
        comeBack.classList.add('cacher')
    })

    closeWindow.addEventListener('click', () => {
        if (babyGameLoose == true) {
            close();
        }
    })

    setTimeout(() => {
        if (babyGameLoose == true) return null;
        else {
            alert('win')
        }
        close()
    }, 180000)
}

// skip game 

function SkipGame() {
    let timing = 15
    skipper = document.querySelector('.skip')
    timerSkip = document.querySelector('.timer')
    const skipGameWindow = document.querySelector('.button-skip-minigame');


    gameName = "Skip_Game.exe"
    nameEXE.textContent = gameName

    if (SkipGameLoose == true) {
        miniGames.classList.remove('hidden')
        SkipGameLoose = false
        skipGameWindow.classList.remove('hidden')
        looseScreen.classList.add('hidden')
    }

    timer()
    function timer() {
        setTimeout(() => {
            if (SkipGameLoose == true) {
                return null
            }
            timerBis()
        }, 1000)
    }
    function timerBis() {
        if (timing < 1) {
            timerSkip.classList.remove('trembling')
            return null
        }
        timing--
        if (timerSkip.classList.contains('white-to-red')) {
            timerSkip.classList.remove('white-to-red')
            timerSkip.classList.add('red-to-white')
            console.log('white-to-red')
        } else {
            timerSkip.classList.add('white-to-red')
            timerSkip.classList.remove('red-to-white')
            console.log('red-to-white')
        }
        if (timing < 6) {
            timerSkip.classList.add('trembling')
            console.log('tremble tremble')
        }
        timerSkip.innerHTML = timing
        timer()
    }
    skipper.addEventListener('click', function () {
        SkipGameLoose = true
        skipGameWindow.classList.add('hidden')
        looseScreen.classList.remove('hidden')
        console.log('DUMBASS')
    })

    closeWindow.addEventListener('click', () => {
        if (SkipGameLoose == true) close();
    })
}


// color memo game

let memoGame = () => {
    console.log('========')
    let yourTurn = document.querySelector('.you')
    let colors = document.querySelectorAll('.colors')
    memoGameRecal++;
    let multiplicateur = memoGameRecal * 2
    let i = 0  
    let canTouch = false
    let res = []
    let colorWrapper = document.querySelector('.colors-wrapper')
    let awnsertb = []
    let round = document.querySelector('#Round')
    console.log(round)

    miniGames.classList.remove('hidden')
    memoGameWindow.classList.remove('hidden')


    let displayColors = () => {
        for (y = 0; y < multiplicateur; y++) (function(i) {
            let randomColor = Math.floor(Math.random() * (4 - 0) + 0)

            setTimeout(function() {
                colors.forEach((colorsBox) => colorsBox.classList.add('unselected-color'))
                console.log(randomColor)
                colors[randomColor].classList.remove('unselected-color')
                setTimeout(() => {
                    colors[randomColor].classList.add('unselected-color')
                    res.push(randomColor)
                    console.log(res)
                    if (res.length == multiplicateur) {
                        canTouch = true
                        yourTurn.classList.remove('hidden')
                    }
                }, 500)
            }, timeSpeed * (i+1));
        }(y));
    }

    let verifCard = () => {
        if (awnsertb.length == res.length) {
            canTouch = false
            for (let i = 0; i < awnsertb.length; i++) {
                if (awnsertb[i] != res[i]) {
                    memoGameError++
                    i = 99999
                }
            }

            if (memoGameRound == 4) {
                if (memoGameError == 0) {
                    colorWrapper.classList.add('hidden')
                    yourTurn.classList.add('hidden')
                    round.textContent = 'u really want the win huh ? good luck :)'
                    round.classList.remove('hidden')
                    setTimeout(() => {
                        round.classList.add('hidden')
                        colorWrapper.classList.remove('hidden')
                        round.classList.add('hidden')
                        memoGameRecal = 50;
                        memoGame();
                    }, 3000)
                }
                colorWrapper.classList.add('hidden')
                yourTurn.classList.add('hidden')
                round.textContent = 'vous avez eu ' + memoGameError + " faute sur 5"
                round.classList.remove('hidden')
                setTimeout(() => {
                    round.classList.add('hidden')
                    memoGameWindow.classList.add('hidden')
                    close();
                }, 3000)
                return null
            } else {
                yourTurn.classList.add('hidden')
                colorWrapper.classList.add('hidden')
                round.textContent = "Round : " + roundNb
                round.classList.remove('hidden')
                memoGameRound++;
                setTimeout(() => {
                    memoGame();
                    colorWrapper.classList.remove('hidden')
                    round.classList.add('hidden')
                    roundNb++;
                }, 3000)
            }
        }
    }

    displayColors();

    
    
    colors.forEach((colorBtn, i) => {
        colorBtn.addEventListener('click', () => {
            if (canTouch) {
                if (colorWrapper.classList.contains('hidden')) {
                    return null
                } else {
                    awnsertb.push(i)
                    console.log(awnsertb)
                    colorBtn.classList.add('color-clicked')
                    setTimeout(() => {
                        colorBtn.classList.remove('color-clicked')
                    }, 500)
                    verifCard()
                }
            } else {
                return null
            }
        })
    })
}

// find the button game

let findButton = () => {
    for (let i = 0; i < 27; i++) {
        let button = document.createElement('button')
        findTheButton.appendChild(button)
        button.classList.add('main-menu-btn')
        button.textContent = "???"
    }

    let response = Math.floor(Math.random() * 28); 
    let allBtn = findTheButton.querySelectorAll('button')

    console.log(response)

    allBtn.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (allBtn[index] === allBtn[response]) {
                console.log('win')
            } else {
                console.log('loose')
                allBtn[index].classList.add('red-border')
            }
        })
    })
}

function analDestroyer() {
    let count = 0
    let count1 = 0
    let count2 = 0
    appender()
    appender2()
    appender3()
    bugMinigame.classList.remove('hidden')
    function appender() {
        if (count == 90) return null
        setTimeout(() => {
            if (speed <= 0) speed = 300
            count++
            let mainDiv = document.createElement('div')
            let border = document.createElement('div')
            let window = document.createElement('div')
            let name = document.createElement('div')
            let windowName = document.createElement('p')
            let expand = document.createElement('div')
            let minus = document.createElement('div')
            let close = document.createElement('div')
            let insideExpand = document.createElement('i')
            let insideMinus = document.createElement('i')
            let insideClose = document.createElement('i')
            let insideWindow = document.createElement('div')
            let imageWindow = document.createElement('div')
            let insideImageWindow = document.createElement('img')
            let textWindow = document.createElement('div')
            let insideTextWindow = document.createElement('p')

            mainDiv.classList.add('first-window', 'window')
            mainDiv.style.position = "relative"
            mainDiv.style.zIndex = Math.floor(Math.random() * (20 - 1) + 1)
            mainDiv.style.top = Math.floor(Math.random() * (200 - (-490)) + (-490)) + "px"
            mainDiv.style.left = Math.floor(Math.random() * (1000 - (-570)) + (-570)) + "px"
            border.classList.add('border', 'border-two')
            window.classList.add('window-container')
            name.classList.add('name-container')
            windowName.classList.add('game-name')
            expand.classList.add('window-icons')
            minus.classList.add('window-icons')
            close.classList.add('window-icons', 'cross')
            insideExpand.classList.add('fa-solid', 'fa-expand')
            insideMinus.classList.add('fa-solid', 'fa-minus')
            insideClose.classList.add('fa-solid', 'fa-xmark')
            insideWindow.classList.add('window-window')
            imageWindow.classList.add('eye')
            insideImageWindow.src = "../assets/image/eye.gif"
            insideImageWindow.alt = "eye"
            textWindow.classList.add('text')

            windowName.textContent = "Problems.exe"
            insideTextWindow.textContent = "He is watching you."

            bugMinigame.appendChild(mainDiv)
            mainDiv.appendChild(border)

            border.appendChild(window)
            border.appendChild(insideWindow)

            window.appendChild(name)
            window.appendChild(expand)
            window.appendChild(minus)
            window.appendChild(close)
            name.appendChild(windowName)
            expand.appendChild(insideExpand)
            minus.appendChild(insideMinus)
            close.appendChild(insideClose)

            insideWindow.appendChild(imageWindow)
            insideWindow.appendChild(textWindow)

            imageWindow.appendChild(insideImageWindow)
            textWindow.appendChild(insideTextWindow)
            speed -= 200
            appender()
        }, speed);
    }

    function appender2() {
        if (count1 == 50) return null
        setTimeout(() => {
            if (speed1 <= 0) speed1 = 300
            count1++
            let mainDiv = document.createElement('div')
            let border = document.createElement('div')
            let window = document.createElement('div')
            let name = document.createElement('div')
            let windowName = document.createElement('p')
            let expand = document.createElement('div')
            let minus = document.createElement('div')
            let close = document.createElement('div')
            let insideExpand = document.createElement('i')
            let insideMinus = document.createElement('i')
            let insideClose = document.createElement('i')
            let insideWindow = document.createElement('div')
            let imageWindow = document.createElement('div')
            let insideImageWindow = document.createElement('img')
            let textWindow = document.createElement('div')
            let insideTextWindow = document.createElement('p')

            mainDiv.classList.add('second-window', 'window')
            mainDiv.style.position = "relative"
            mainDiv.style.zIndex = Math.floor(Math.random() * (20 - 1) + 1)
            mainDiv.style.top = Math.floor(Math.random() * (200 - (-490)) + (-490)) + "px"
            mainDiv.style.left = Math.floor(Math.random() * (1000 - (-570)) + (-570)) + "px"
            border.classList.add('border', 'border-three')
            window.classList.add('window-container')
            name.classList.add('name-container')
            windowName.classList.add('game-name')
            expand.classList.add('window-icons')
            minus.classList.add('window-icons')
            close.classList.add('window-icons', 'cross')
            insideExpand.classList.add('fa-solid', 'fa-expand')
            insideMinus.classList.add('fa-solid', 'fa-minus')
            insideClose.classList.add('fa-solid', 'fa-xmark')
            insideWindow.classList.add('window-window')
            imageWindow.classList.add('warning')
            insideImageWindow.src = "../assets/image/warning.gif"
            insideImageWindow.alt = "warning"
            textWindow.classList.add('text')

            windowName.textContent = "More_Problems.exe"
            insideTextWindow.textContent = "He knows where you are."

            bugMinigame.appendChild(mainDiv)
            mainDiv.appendChild(border)

            border.appendChild(window)
            border.appendChild(insideWindow)

            window.appendChild(name)
            window.appendChild(expand)
            window.appendChild(minus)
            window.appendChild(close)
            name.appendChild(windowName)
            expand.appendChild(insideExpand)
            minus.appendChild(insideMinus)
            close.appendChild(insideClose)

            insideWindow.appendChild(imageWindow)
            insideWindow.appendChild(textWindow)

            imageWindow.appendChild(insideImageWindow)
            textWindow.appendChild(insideTextWindow)
            speed1 -= 200
            appender2()
        }, speed1);
    }

    function appender3() {
        if (count2 == 70) return null
        setTimeout(() => {
            if (speed2 <= 0) speed2 = 300
            count2++
            let mainDiv = document.createElement('div')
            let border = document.createElement('div')
            let window = document.createElement('div')
            let name = document.createElement('div')
            let windowName = document.createElement('p')
            let expand = document.createElement('div')
            let minus = document.createElement('div')
            let close = document.createElement('div')
            let insideExpand = document.createElement('i')
            let insideMinus = document.createElement('i')
            let insideClose = document.createElement('i')
            let insideWindow = document.createElement('div')
            let imageWindow = document.createElement('div')
            let insideImageWindow = document.createElement('img')
            let textWindow = document.createElement('div')
            let insideTextWindow = document.createElement('p')

            mainDiv.classList.add('third-window', 'window')
            mainDiv.style.position = "relative"
            mainDiv.style.zIndex = Math.floor(Math.random() * (20 - 1) + 1)
            mainDiv.style.top = Math.floor(Math.random() * (200 - (-490)) + (-490)) + "px"
            mainDiv.style.left = Math.floor(Math.random() * (1000 - (-570)) + (-570)) + "px"
            border.classList.add('border', 'border-four')
            window.classList.add('window-container')
            name.classList.add('name-container')
            windowName.classList.add('game-name')
            expand.classList.add('window-icons')
            minus.classList.add('window-icons')
            close.classList.add('window-icons', 'cross')
            insideExpand.classList.add('fa-solid', 'fa-expand')
            insideMinus.classList.add('fa-solid', 'fa-minus')
            insideClose.classList.add('fa-solid', 'fa-xmark')
            insideWindow.classList.add('window-window')
            imageWindow.classList.add('walking-man')
            insideImageWindow.src = "../assets/image/walk.gif"
            insideImageWindow.alt = "walk"
            textWindow.classList.add('text')

            windowName.textContent = "Computer_bug.exe"
            insideTextWindow.textContent = "He will come after you"

            bugMinigame.appendChild(mainDiv)
            mainDiv.appendChild(border)

            border.appendChild(window)
            border.appendChild(insideWindow)

            window.appendChild(name)
            window.appendChild(expand)
            window.appendChild(minus)
            window.appendChild(close)
            name.appendChild(windowName)
            expand.appendChild(insideExpand)
            minus.appendChild(insideMinus)
            close.appendChild(insideClose)

            insideWindow.appendChild(imageWindow)
            insideWindow.appendChild(textWindow)

            imageWindow.appendChild(insideImageWindow)
            textWindow.appendChild(insideTextWindow)
            speed2 -= 200
            appender3()
        }, speed2);
    }

}