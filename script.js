const inputOrigem = document.querySelector("#input1");
const inputDestino = document.querySelector("#input2");

let usuarioValue = document.querySelector("#usuario");
let resultadoValue = document.querySelector("#resultado");

const selectTemp1 = document.querySelector("#temperature-units1")
const selectTemp2 = document.querySelector("#temperature-units2")

const selectTempAll = document.querySelectorAll("#temperature-units1 option")

const Temp1 = document.querySelector("#temperature-units1");
const Temp2 = document.querySelector("#temperature-units2");

const btnConverter = document.querySelector(".button-conversor button");

let tempValue1 = ''; 
let tempValue2 = '';

// Eventos 
window.addEventListener("load", verificarSelecoes);

selectTemp1.addEventListener("change", () => {
    //text
    const selectedOption = selectTemp1.options[selectTemp1.selectedIndex].text;
    inputOrigem.value = selectedOption;
    inputOrigem.setAttribute("readonly", true);
    //value
    tempValue1 = selectTemp1.options[selectTemp1.selectedIndex].value;
    verificarSelecoes();
});
selectTemp2.addEventListener("change", () => {
    //text
    const selectedOption = selectTemp2.options[selectTemp2.selectedIndex].text;
    inputDestino.value = selectedOption;
    inputDestino.setAttribute("readonly", true);
    //Value
    tempValue2 = selectTemp2.options[selectTemp2.selectedIndex].value;
    verificarSelecoes();
});

btnConverter.addEventListener("click", () => {
    Conversao();
});

usuarioValue.addEventListener('change', ()=> {
    verificarSelecoes();
});


// Funções
function Conversao(){
    const valorUsuario = parseFloat(usuarioValue.value)
    if(isNaN(valorUsuario)){         //validação de entrada
        resultadoValue.placeholder = "Insira um número válido!";
        return;
    } else if (tempValue1 === 'celsius' && tempValue2 === 'fahrenheit'){
        resultadoValue.value = (parseFloat(usuarioValue.value) * 9/5) + 32; // celsius para fahrenheit
    } else if (tempValue1 === 'fahrenheit' && tempValue2 === 'celsius'){
        resultadoValue.value = (parseFloat(usuarioValue.value) - 32) * 5/9; // fahrenheit para celsius
    } else if (tempValue1 === 'celsius' && tempValue2 === 'kelvin'){
        resultadoValue.value = parseFloat(usuarioValue.value) + 273.15; // celsius para kelvin
    } else if (tempValue1 === tempValue2){
        resultadoValue.value = usuarioValue.value;
    } else {
        resultadoValue.placeholder = 'Conversão inválida!';
    }
}

function verificarSelecoes(){       // verificar se todos os campos estão preenchidos
    const temp1Valida = tempValue1 && tempValue1 !== '';
    const temp2Valida = tempValue2 && tempValue2 !== '';
    const usuarioValido = usuarioValue.value && usuarioValue.value !== '';   

    if(temp1Valida && temp2Valida && usuarioValido){
        btnConverter.removeAttribute("disabled");
    } else {
        btnConverter.setAttribute("disabled", true);
    }
}
verificarSelecoes();