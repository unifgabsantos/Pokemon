const form = document.getElementById("form");

const baseURL = "http://localhost/pokemons/";

async function getPokemons(){
    const response = await fetch(baseURL);
    const pokemons = await response.json();
    const tbody = document.getElementById("pokemon-list");
    tbody.innerHTML = pokemons.map(p=>`
        <tr>
            <td>${p.nome}</td>
            <td>${p.peso}</td>
            <td>${p.ataque}</td>
            <td>${p.defesa}</td>
            <td>${p.velocidade}</td>
            <td>${p.habilidade1}</td>
            <td>${p.habilidade2}</td>
            <td>
                <button onclick="editPokemon(${p.id})">Editar</button>
                <button onclick="deletePokemon(${p.id})">Excluir</button>
            </td>
        </tr>   
        
    `).join("");
}

async function editPokemon(id){
    const response = await fetch(baseURL+id);
    const pokemon = await response.json();
    const form = document.getElementById("form");
    form.nome.value = pokemon.nome;
    form.peso.value = pokemon.peso;
    form.ataque.value = pokemon.ataque;
    form.defesa.value = pokemon.defesa;
    form.velocidade.value = pokemon.velocidade;
    form.habilidade1.value = pokemon.habilidade1;
    form.habilidade2.value = pokemon.habilidade2;
    document.getElementById("id").value = pokemon.id;
}

async function deletePokemon(id){
    const response = await fetch(baseURL+id, {method: "DELETE"});
    getPokemons();
}

form.onsubmit = async (e) =>{
    e.preventDefault();

    const id = document.getElementById("id").value;

    const payload = {
        nome: nome.value,
        peso: peso.value,
        ataque: ataque.value,
        defesa: defesa.value,
        velocidade: velocidade.value,
        habilidade1: habilidade1.value,
        habilidade2: habilidade2.value
    };

    if(id){
        await fetch(baseURL+id,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    }else{
        await fetch(baseURL,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    }
    form.reset();
    document.getElementById("id").value = "";
    getPokemons();
};

getPokemons();