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
    if (
        (dataValueInput1 === 'celsius' || dataValueInput1 === 'fahrenheit' || dataValueInput1 === 'kelvin') &&
        (dataValueInput2 === 'celsius' || dataValueInput2 === 'fahrenheit' || dataValueInput2 === 'kelvin')
    ){
        if(isNaN(valorUsuario)){  //validação de entrada
            resultadoValue.placeholder = "Insira um número válido!";
            return;
        }
        // celsius para fahrenheit
        else if (dataValueInput1 === 'celsius' && dataValueInput2 === 'fahrenheit'){
            resultadoValue.value = (parseFloat(usuarioValue.value) * 9/5) + 32;         
        }
        // fahrenheit para celsius
        else if (dataValueInput1 === 'fahrenheit' && dataValueInput2 === 'celsius'){
            resultadoValue.value = (parseFloat(usuarioValue.value) - 32) * 5/9;         
        }
        // celsius para kelvin
        else if (dataValueInput1 === 'celsius' && dataValueInput2 === 'kelvin'){
            resultadoValue.value = parseFloat(usuarioValue.value) + 273.15;             
        }
        // mesma medida
        else if (dataValueInput1 === dataValueInput2){
            resultadoValue.value = usuarioValue.value;
        }
        // categorias diferentes
        else {
            resultadoValue.placeholder = 'Conversão inválida!';
        }
    }
    //Comprimento
    else if (
        (dataValueInput1 === 'meters' || dataValueInput1 === 'kilometers' || dataValueInput1 === 'miles') &&
        (dataValueInput1 === 'meters' || dataValueInput1 === 'kilometers' || dataValueInput1 === 'miles')
    ){
        if(isNaN(valorUsuario)){  //validação de entrada
            resultadoValue.placeholder = "Insira um número válido!";
            return;
        }
        //Metro para km
        else if (dataValueInput1 === 'meters' && dataValueInput2 === 'kilometers'){
            resultadoValue.value = parseFloat(usuarioValue.value) / 1000;
        }
        //metro para millhas
        else if (dataValueInput1 === 'meters' && dataValueInput2 === 'miles'){
            resultadoValue.value = parseFloat(usuarioValue.value) / 1609.34;
        }
        //Quilometro para metro
        else if (dataValueInput1 === 'kilometers' && dataValueInput2 === 'meters'){
            resultadoValue.value = parseFloat(usuarioValue.value) * 1000;
        }
        //Quilômetros para milhas
        else if (dataValueInput1 === 'kilometers' && dataValueInput2 === 'miles'){
            resultadoValue.value = parseFloat(usuarioValue.value) / 1.60934;
        }
        //Milhas para metros
        else if (dataValueInput1 === 'miles' && dataValueInput2 === 'meters'){
            resultadoValue.value = parseFloat(usuarioValue.value) * 1609.34;
        }
        //Milhas para quilômetros
        else if (dataValueInput1 === 'miles' && dataValueInput2 === 'kilometers'){
            resultadoValue.value = parseFloat(usuarioValue.value) * 1609.34;
        }
        //mesma medida
        else if (dataValueInput1 === dataValueInput2){
            resultadoValue.value = usuarioValue.value;
        }
        // categoria diferentes
        else {
            resultadoValue.placeholder = 'Conversão inválida!';
        }
    }
    //Tempo
    else if (
        (dataValueInput1 === 'seconds' || dataValueInput1 === 'minutes' || dataValueInput1 === 'hours' || dataValueInput1 === 'days') &&
        (dataValueInput2 === 'seconds' || dataValueInput2 === 'minutes' || dataValueInput2 === 'hours' || dataValueInput2 === 'days')
    ){
        if(isNaN(valorUsuario)){  //validação de entrada
            resultadoValue.placeholder = "Insira um número válido!";
            return;
        }//segundo para minuto
        else if (dataValueInput1 === 'seconds' && dataValueInput2 === 'minutes'){
            resultadoValue.value = parseFloat(usuarioValue.value) / 60;
        }
        //segundo para hora
        else if (dataValueInput1 === 'seconds' && dataValueInput2 === 'hours'){
            resultadoValue.value = parseFloat(usuarioValue.value) / 3600;
        }
        //segundo para dias
        else if (dataValueInput1 === 'seconds' && dataValueInput2 === 'days'){
            resultadoValue.value = parseFloat(usuarioValue.value) / 86400;
        }
        //minuto para segundo
        else if (dataValueInput1 === 'minutes' && dataValueInput2 === 'seconds'){
            resultadoValue.value = parseFloat(usuarioValue.value) * 60;
        }
        //minuto para hora
        else if (dataValueInput1 === 'minutes' && dataValueInput2 === 'hours'){
            resultadoValue.value = parseFloat(usuarioValue.value) / 60;
        }
        //minuto para dias
        else if (dataValueInput1 === 'minutes' && dataValueInput2 === 'days'){
            resultadoValue.value = parseFloat(usuarioValue.value) / 1440;
        }
        //horas para segundos
        else if (dataValueInput1 === 'hours' && dataValueInput2 === 'seconds'){
            resultadoValue.value = parseFloat(usuarioValue.value) * 3600;
        }
        //horas para minuto
        else if (dataValueInput1 === 'hours' && dataValueInput2 === 'minutes'){
            resultadoValue.value = parseFloat(usuarioValue.value) * 60;
        }
        //horas para dia
        else if (dataValueInput1 === 'hours' && dataValueInput2 === 'days'){
            resultadoValue.value = parseFloat(usuarioValue.value) / 24;
        }
        //dias para segundos
        else if (dataValueInput1 === 'days' && dataValueInput2 === 'seconds'){
            resultadoValue.value = parseFloat(usuarioValue.value) * 86400;
        }
        //dias para minuto
        else if (dataValueInput1 === 'days' && dataValueInput2 === 'minutes'){
            resultadoValue.value = parseFloat(usuarioValue.value) * 1440;
        }
        //dias para horas
        else if (dataValueInput1 === 'days' && dataValueInput2 === 'hours'){
            resultadoValue.value = parseFloat(usuarioValue.value) * 24;
        }
        //mesma medida
        else if (dataValueInput1 === dataValueInput2){
            resultadoValue.value = usuarioValue.value;
        }
        else {
            resultadoValue.placeholder = 'Conversão inválida!';
        }
    }
    else {
        resultadoValue.placeholder = 'Medidas diferentes';
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