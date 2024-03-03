const urlBase = `https://hp-api.onrender.com/api/character`

async function loadCharacter(baseUrl, id){
    try { // vai receber os dados da Url base mas somente do personagem com o id selecionado
        const response = await fetch(`${baseUrl}/${id}`)
        if(!response.ok){
            throw new Error('Erro ao carregar o personagem')
        }
        return await response.json();
    } catch (error) { // se vier com algum erro
        console.error(error)
        throw error;
    }
}

async function load(){
    const UrlParams = new URLSearchParams(window.location.search)
    const idParam = UrlParams.get('id')
    console.log(idParam)

    if(!idParam){
        return console.error('ID não encontrado na URL')
    }
    
    try {
        const character = await loadCharacter(urlBase, idParam)
        mostrarPersonagens(character) // colocar aqui a função pra exibir o person no HMTL

        // "nomeFuncao"(character)
    } catch (error) {
        console.error('Erro ao carregar o personagem')
    }
}

load()

function mostrarPersonagens(character){
    const persoContainer = document.getElementById('character-information')

    character.map((person)=>{
        const divCharacter = document.createElement('div')

        divCharacter.innerHTML = `
        <div class="personImg">
        ${addImage(person.image)}
    </div>

    <section class="geralInformations">

        <section class="primeirasInfos">

            <div class="infos-texto">
                <h2>${person.name}</h2>

                <h4 class="nickname">Nicknames</h4>

                <p class="nicknamesText">${noNicknames(person.alternate_names)}</p>

                <p class="blood">${noBlood(person.ancestry)}</p>
                
            </div>
            <div class="hogwartsHouse">
                ${hogwartsHouse(person)}
            </div>
        </section>
            

            <section class="segundasInfos">
                <div class="infoBox">
                    <p class="birthday">${noBirthday(person.dateOfBirth)}</p>
                </div>


                <div class="infoBox">
                    <p class="gender">${person.gender}</p>
                </div>


                <div class="infoBox">
                    <p class="species">${person.species}</p>
                </div>
            </section>

            <section class="terceiraInfos">
                <h4>Wand</h4>

                <div class="wandInfos">
                    <div class="wood">
                        <p class="category">wood</p>

                        <p class="material">${noWood(person.wand.wood)}</p>
                    </div>

                    <div class="core">
                        <p class="category">core</p>

                        <p class="material">${noCore(person.wand.core)}</p>
                    </div>

                    <div class="length">
                        <p class="category">length</p>

                        <p class="material">${noLength(person.wand.length)}</p>
                    </div>
                </div>
                <a href="../index.html" class="backBtn">
                <p>Back</p>
                </a>
            </section>

        </section>
    </section>
        `;

        divCharacter.classList.add('character-box')
        persoContainer.appendChild(divCharacter)
    })
}


function addImage(image) {
    if (image == "") {
        return `<img src="../img/noImage.png"">`
    } else {
        return `<img src=${image}>`
    }
}

function noNicknames(alternate_names) {
    if (alternate_names == "") {
        return `No nicknames found for this wizard. `
    } else {
        return `${alternate_names.slice(0,4)}`
    }
}

function noBlood(ancestry){
    if(ancestry == ""){
        return `Unknow`
    }
    else{
        return `${ancestry}`
    }
}

function noBirthday(dateOfBirth){
    if(dateOfBirth == null){
        return `?`
    }
    else{
        return `${dateOfBirth}`
    }
}

function noWood(wood){
    if(wood == ""){
        return `Unknow`
    }
    else{
        return `${wood}`
    }
}

function noCore(core){
    if(core == ""){
        return `Unknow`
    }
    else{
        return `${core}`
    }
}

function noLength(length){
    if(length == null){
        return `unknow`
    }
    else{
        return `${length}`
    }
}






function hogwartsHouse(person){
    if(person.house == "Gryffindor"){
        return `<img src=../img/gryffindorHouse.png`
    }

    else if(person.house == "Slytherin"){
        return `<img src=../img/slytherinHouse.png`
    }
    else if(person.house == "Ravenclaw"){
        return `<img src=../img/ravenclawHouse.png`
    }
    else{
        return `<img src=../img/hufflepuffHouse.png`
    }
}