const inputOrigem = document.querySelector("#input1");
const inputDestino = document.querySelector("#input2");

let usuarioValue = document.querySelector("#usuario");
let resultadoValue = document.querySelector("#resultado");

const selectTemp1 = document.querySelector("#temperature-units1")
const selectTemp2 = document.querySelector("#temperature-units2")

const selectLength1 = document.querySelector("#length-units1")
const selectLength2 = document.querySelector("#length-units2")

const selectTime1 = document.querySelector("#time-units1")
const selectTime2 = document.querySelector("#time-units2")

const selectAll = document.querySelectorAll("select")

const selectTempAll = document.querySelectorAll("#temperature-units1 option")

const btnConverter = document.querySelector(".button-conversor button");

let selectedField = null;

let tempValue1 = ''; 
let tempValue2 = '';

// Eventos 
window.addEventListener("load", verificarSelecoes);


//Escolhendo o foco do input
inputOrigem.addEventListener('focus', ()=> {
    selectedField = 'origem';
    inputOrigem.classList.add('ativo')
    inputDestino.classList.remove('ativo')
})
inputDestino.addEventListener('focus', ()=> {
    selectedField = 'destino';
    inputDestino.classList.add('ativo')
    inputOrigem.classList.remove('ativo')
})

//loop para pegar todos os selects e seus valores
for (let i = 0; i < selectAll.length; i++){
    selectAll[i].addEventListener('change', (evento) => {
        //Pegando o select
        const elementSelected = evento.target;
        //value da option select
        const elementValue = elementSelected.value;
        //text do option
        const elementText = elementSelected.options[elementSelected.selectedIndex].text;

        if (selectedField === 'origem'){
            inputOrigem.value = elementText;
            inputOrigem.setAttribute('data-value', elementValue);   //seta um data-value para o calculo
        }
        else if (selectedField === 'destino') {
            inputDestino.value = elementText;
            inputDestino.setAttribute('data-value', elementValue);  //seta um data-value para o calculo
        }else {
            alert("Selecione o campo que deseja colocar essa medida!");
        }
    })
}

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
    const input1Valido = inputOrigem.value !== '';
    const input2Valido = inputDestino.value !== '';
    const usuarioValido = usuarioValue.value !== '';   

    if(input1Valido && input2Valido && usuarioValido){
        btnConverter.removeAttribute("disabled");
    } else {
        btnConverter.setAttribute("disabled", true);
    }
}
verificarSelecoes();