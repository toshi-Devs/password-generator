import { passwordStrength } from 'check-password-strength'

const length = document.querySelector('#length');
const lengthText = document.querySelector('#lengthText');
const password = document.querySelector('#password');
const strength = document.querySelector('#strength');
const generateBtn = document.querySelector('#generate');

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const numbers = ['1','2','3','4','5','6','7','8','9','0'];
const symbols = ['!','@','#','$','%','^','&','*','(',')','_','+','-','=','[',']','{','}','|',';',':','<','>','?','/','.',',','~','`','"',"'"];

const utils = {
    getRandomNumBetween: (min, max) => 
        Math.floor(Math.random() * (max - min + 1) + min),
    getCharsfromArr: (arr, num) => {
        let chars = '';
        for (let i = 0; i < num; i++) {
            const randNumber = utils.getRandomNumBetween(0, arr.length - 1);
            // chars += arr[randNumber];
            // make some of the letters uppercase 
            chars += utils.getRandomNumBetween(0, 1) ? arr[randNumber].toUpperCase() : arr[randNumber]; // if 0, make it uppercase, if 1, make it lowercase
        }
        return chars;
    }
}




function generatePassword() {
    const passlength = length.value;
    const includeNumbers = document.querySelector('#includeNumbers').checked;
    const includeSymbols = document.querySelector('#includeSymbols').checked;
    let tempPass = '';

    if(includeNumbers) {
        tempPass += utils.getCharsfromArr(numbers, utils.getRandomNumBetween(3, passlength/3));
    }

    if(includeSymbols) {
        tempPass += utils.getCharsfromArr(symbols, utils.getRandomNumBetween(3, passlength/3));
    }

    tempPass += utils.getCharsfromArr(letters, passlength - tempPass.length);
    password.value = tempPass.split('').sort(() => 0.5 - Math.random()).join('');  

    const passStrength = passwordStrength(tempPass, [
        {
          id: 0,
          value: "Too weak",
          minDiversity: 0,
          minLength: 8
        },
        {
          id: 1,
          value: "Weak",
          minDiversity: 2,
          minLength: 8
        },
        {
          id: 2,
          value: "Medium",
          minDiversity: 4,
          minLength: 12
        },
        {
          id: 3,
          value: "Strong",
          minDiversity: 4,
          minLength: 16
        }
      ]);
      switch(passStrength.value) {
            case 'Too weak':
                strength.value = utils.getRandomNumBetween(0, 10);
                break;
            case 'Weak':
                strength.value = utils.getRandomNumBetween(11, 29);
                break;
            case 'Medium':
                strength.value = utils.getRandomNumBetween(30, 74);
                break;
            case 'Strong':
                strength.value = utils.getRandomNumBetween(75, 100);
                break;
            default:
      }
}

function passwordClicked(e) {
    if (e.target.value === '') return;
    const passToCopy = e.target.value;
    navigator.clipboard.writeText(passToCopy);
    password.value = 'Copied!';
    setTimeout(() => {
        password.value = passToCopy;
    }, 2500);
}


password.addEventListener('click', passwordClicked)

length.addEventListener('change', (e) => {
    lengthText.textContent = e.currentTarget.value;
});

generateBtn.addEventListener('click', generatePassword)
