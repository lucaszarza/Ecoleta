

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) //(res) => { return res.json() } -> Função Anônima que está retornando um valor
    .then( states => {

        for(const state of states){    
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("[name=state");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    
    citySelect.innerHTML = "<option value> Selecione a Cidade</option>";
    citySelect.disabled = true;
    
    fetch(url).then(res=>res.json()).then(cities => {
        

        for( const city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false;
    })
}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)  //sempre que mudar, ele vai rodar a função


//Itens de coleta, pega todos os Li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItems)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = [];

function handleSelectedItems(event){
    const itemLi = event.target;
    
    //adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected")


    const itemId = itemLi.dataset.id;
    

    //verificar se existem idens selecionados, se sim 
    //pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => item == itemId)

    // const alreadySelected = selectedItems.findIndex( function (item) => {
    //     const itemFound = item == itemId
    //     return itemFound
    // })


    // se ja tiver selecionado,
    if(alreadySelected >= 0){
        // tirar a selecao
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        
        selectedItems = filteredItems;
    }else{
        //se nao estiver selecionado 
        //adicionar a seleção
        selectedItems.push(itemId)
    }

    console.log(selectedItems)
    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems;


}