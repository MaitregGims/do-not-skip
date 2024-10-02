const closeWindow = document.querySelector('#window-cross');
const miniGames = document.querySelector('.minigames')
const nameEXE = document.querySelector(".game-name-changer")
const looseScreen = document.querySelector('#loose-screen');
const babyGameWindow = document.querySelector('.baby-game-window')
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