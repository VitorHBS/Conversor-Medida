const inputOrigem = document.querySelector("#input1");
const inputDestino = document.querySelector("#input2");

let usuarioValue = document.querySelector("#usuario");
let resultadoValue = document.querySelector("#resultado");

const selectAll = document.querySelectorAll("select")

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
            dataValueInput1 = inputOrigem.getAttribute('data-value');
            verificarSelecoes();
        }
        else if (selectedField === 'destino') {
            inputDestino.value = elementText;
            inputDestino.setAttribute('data-value', elementValue);  //seta um data-value para o calculo
            dataValueInput2 = inputDestino.getAttribute('data-value');
            verificarSelecoes();
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
    //Temperatura
    if (dataValueInput1 === 'celsius' || 'fahrenheit' || 'kelvin' && dataValueInput2 === 'celsius' || 'fahrenheit' || 'kelvin'){
        if(isNaN(valorUsuario)){  //validação de entrada
        resultadoValue.placeholder = "Insira um número válido!";
        return;
        }// celsius para fahrenheit
        else if (dataValueInput1 === 'celsius' && dataValueInput2 === 'fahrenheit'){
            resultadoValue.value = (parseFloat(usuarioValue.value) * 9/5) + 32;         
        }// fahrenheit para celsius
        else if (dataValueInput1 === 'fahrenheit' && dataValueInput2 === 'celsius'){
            resultadoValue.value = (parseFloat(usuarioValue.value) - 32) * 5/9;         
        }// celsius para kelvin
        else if (dataValueInput1 === 'celsius' && dataValueInput2 === 'kelvin'){
            resultadoValue.value = parseFloat(usuarioValue.value) + 273.15;             
        }// mesma medida
        else if (dataValueInput1 === dataValueInput2){
            resultadoValue.value = usuarioValue.value;
        }// categorias diferentes
        else {
            resultadoValue.placeholder = 'Conversão inválida!';
        }
    }//Comprimento
    else if (dataValueInput1 === 'meters' || 'kilometers' || 'miles' && dataValueInput2 === 'meters' || 'kilometers' || 'miles'){
        if(isNaN(valorUsuario)){  //validação de entrada
            resultadoValue.placeholder = "Insira um número válido!";
            return;
        }//
    }
}

function verificarSelecoes(){       // verificar se todos os campos estão preenchidos
    const input1Valido = inputOrigem.value !== '' && inputOrigem.value !== null;
    const input2Valido = inputDestino.value !== '' && inputDestino.value !== null;
    const usuarioValido = usuarioValue.value !== '' && usuarioValue.value !== null;   

    if(input1Valido && input2Valido && usuarioValido){
        btnConverter.removeAttribute("disabled");
    } else {
        btnConverter.setAttribute("disabled", true);
    }
}
verificarSelecoes();