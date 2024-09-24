const textAppair = document.querySelector('.text-guy');
const btnOne = document.querySelector('#btn-1')
const btnTwo = document.querySelector('#btn-2')
const gameBtn = document.querySelectorAll('.game-btn')
let specialInteracion = mainDialogues;
let whatBtn;
let textID = 0;
let skipCount = 0;


textAppair.classList.add('typewriter')

textAppair.textContent = mainDialogues[0].text
btnOne.textContent = mainDialogues[0].rep1
btnTwo.textContent = mainDialogues[0].rep2


// func

let DialoguesChanger = (id) => {
    textAppair.classList.remove('typewriter')
    textAppair.classList.add('typewriter')
    textAppair.textContent = specialInteracion[textID].text
    btnOne.textContent = specialInteracion[textID].rep1
    btnTwo.textContent = specialInteracion[textID].rep2
}

setTimeout(() => { textAppair.classList.remove('typewriter') }, 3000)

let InteractionsGame = () => {
    textAppair.classList.remove('typewriter')
    let isAGames = Math.floor(Math.random() * 100)
    let babyGamePassed = false
    
    if (isAGames >= 80) {
        let rdm = Math.floor(Math.random() * 2)
        if (rdm == 1) {
            if (babyGamePassed == true) {
                rdm++;
            } else if (rdm == 2) {
                babyGamePassed = true
                babyGame();
                console.log('startGame')
            }
        } else {
            SkipGame();
            console.log('startGame')
        }
    } else {
        console.log('no game :(')
    }
}

// event 

gameBtn.forEach((btn) => {
    textAppair.classList.remove('typewriter')
    btn.addEventListener('click', () => {
        console.log(btn.id)

        btnOne.classList.add('hidden')
        btnTwo.classList.add('hidden')

        textAppair.classList.add('typewriter')

        if (btn.id == "btn-1") {
            textAppair.textContent = specialInteracion[textID].awnserone
        } else {
            textAppair.textContent = specialInteracion[textID].awnsertwo
        }
        

        setTimeout(() => {
            textID++;
            textAppair.classList.remove('typewriter')

            btnOne.classList.remove('hidden')
            btnTwo.classList.remove('hidden')

            textAppair.classList.add('typewriter')
            if (skipCount == 0) {
                DialoguesChanger(btn.id);
            } else if (skipCount >= 1) {
                specialInteracion =  DialoguesFiveFirstSkip
                DialoguesChanger(btn.id);
            } else if (skipCount >= 5) {
                specialInteracion = DialoguesFiveToTenSkip
                DialoguesChanger(btn.id);
            }


            InteractionsGame();
        }, 5000);   
    })
})


