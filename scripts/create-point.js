

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


//Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItems)
}

function handleSelectedItems(event){
    const itemLi = event.target;
    
    //adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected")


    const itemId = itemLi.target.dataset.id;
    
    

}