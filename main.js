let result = document.querySelector('.result');
let num1 = '';
let numRes = [];
let numClick = document.querySelector('.number-pad');
let state = [];
document.querySelector('.clear-btn').addEventListener('click',reset)
document.querySelector('.back-btn').addEventListener('click', backSpace)
document.querySelector('.function-pad').addEventListener('click',operation)
document.querySelector('.equal-btn').addEventListener('click',getResult);
numClick.addEventListener('click', insertNum)
function reset(){
    result.innerHTML = 0;
    num1 ='';
    numRes=[];
    state=[];
}
function backSpace(){
    let numLength = num1.length-1;
    if(num1.length===1){
        num1 = 0;
    }else if(num1.length>1){
        num1 = num1.substring(0,numLength);
    }
    result.innerHTML = num1;
}
function performCalculation(){
    let number1 = Number.parseFloat(numRes[0]);
    let number2 = Number.parseFloat(numRes[1]);

    switch(state[0]){
        case '+':
            numRes[0] = number1 + number2;
            break;
        case '-':
            numRes[0] =  number1 - number2;
            break;
        case 'x':
            numRes[0] =  number1 * number2;
            break;
        case '÷':
            numRes[0] =  number1 / number2;
            break;
    }
    result.innerHTML = numRes[0];

}

function resetCalculation(){ //reset the state & number input in the array into one
    numRes.splice(1, 1);
    num1 = '';
    state.splice(0,1);
}
function operation(){
    if(num1)
        numRes.push(num1);
        if(numRes.length === 2){
        performCalculation();
        resetCalculation();
        }else{
            num1 = '';
        }
}
function insertNum(event){
    if(event.target.tagName != 'BUTTON'||event.target.classList.contains('clear-btn')||event.target.classList.contains('back-btn')){
        return 0;
    }
    num1 += Number.parseInt(event.target.innerHTML);
    result.innerHTML = num1;
}
function getResult(){
    if(num1)
        numRes.push(num1);
        performCalculation();
        resetCalculation();
        state = [];
}
function getState(){
    document.querySelector('.function-pad').addEventListener('click',(event)=>{
        if (event.target.classList.contains('equal-btn')) {
            // Do nothing if the equal button is clicked
            return;
        }
        if(state.length < 2 && state.length >= 0){
            let temp = event.target.innerHTML;
            switch(temp){
                case '+':
                case '-':
                case 'x':
                case '÷':
                    state.push(temp);
                    break;
            }
        }
        else if(state.length === 2 && state.length >= 0){
            let temp = event.target.innerHTML;
            switch(temp){
                case '+':
                case '-':
                case 'x':
                case '÷':
                    state.push(1,1,temp);
                    break;
            }
        }
    
    })
}
getState();