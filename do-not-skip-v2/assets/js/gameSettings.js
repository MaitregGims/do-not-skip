const textAppair = document.querySelector('.text-guy');
const btnOne = document.querySelector('#btn-1')
const btnTwo = document.querySelector('#btn-2')
const gameBtn = document.querySelectorAll('.game-btn')
let specialInteracion = mainDialogues;
let whatBtn;
let textID = 0;
let skipCount = 0;

textAppair.textContent = mainDialogues[0].text
btnOne.textContent = mainDialogues[0].rep1
btnTwo.textContent = mainDialogues[0].rep2

// func

let DialoguesChanger = (id) => {
    textAppair.textContent = specialInteracion[textID].text
    btnOne.textContent = specialInteracion[textID].rep1
    btnTwo.textContent = specialInteracion[textID].rep2
}

// event 

gameBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        console.log(btn.id)

        btnOne.classList.add('hidden')
        btnTwo.classList.add('hidden')

        if (btn.id == "btn-1") {
            textAppair.textContent = specialInteracion[textID].awnserone
        } else {
            textAppair.textContent = specialInteracion[textID].awnsertwo
        }
        
        setTimeout(() => {
            textID++;

            btnOne.classList.remove('hidden')
            btnTwo.classList.remove('hidden')

            if (skipCount == 0) {
                DialoguesChanger(btn.id);
            } else if (skipCount >= 1) {
                specialInteracion =  DialoguesFiveFirstSkip
                DialoguesChanger(btn.id);
            } else if (skipCount >= 5) {
                specialInteracion = DialoguesFiveToTenSkip
                DialoguesChanger(btn.id);
            }
        }, 5000);   
    })
})