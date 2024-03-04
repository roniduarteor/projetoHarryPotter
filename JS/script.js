let baseUrl = 'https://hp-api.onrender.com/api/characters'
let indiceInicial = 0
let indiceFinal = 9

let pagina = 1
let paginaAnt = 0

fetch(baseUrl)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Erro de rede! Código:' + response.status)
        }
        return response.json()
    })

    .then((data) => {
        mostrarPersonagens(data)
    })

    .catch((err) => console.log(err))

function mostrarPersonagens(items) { // items vai receber data, q data é os dados da api
    const containerPerso = document.getElementById("characters-cards")
    containerPerso.innerHTML = "";

    dataIndice = items //dataIndice recebe o array completo

    const limitItem = items.slice(indiceInicial, indiceFinal)// vai limitar para 0,9 que é o valor inicial

    limitItem.map((item) => { //quando a pagina iniciar vai aparecer esse primeiro

        const charactersInformations = document.createElement('div')
        charactersInformations.innerHTML = `

        <section class="principaisInfos">

            <div class="character-img">
                ${addImage(item.image)}
            </div>
            
            <div class="infos-texto">
                <h2>${item.name}</h2>

                <h4 class="nickname">Nicknames</h4>

                <p class="nicknamesText">${noNicknames(item.alternate_names)}</p>

                
            </div>
        
        </section>
        `;



        charactersInformations.classList.add('charactersBox')
        containerPerso.appendChild(charactersInformations);

        charactersInformations.addEventListener('click', async()=>{
            characterDetails(item.id)
        })

        
    })


    //aqui apenas se o botão for clicado
    const btnAvancar = document.getElementById("btnAvancar")//colocou o botão como uma variavel para trabalhar com ele
    const btnVoltar = document.getElementById("btnVoltar")


    btnVoltar.addEventListener('click', () => {
        if (pagina > 1) { // verifica se a página atual é maior que 1, pra ele n ir pra página 0 ou <0
            containerPerso.innerHTML = "" //todos os filhos, elementos html q tiver escrito dentro de container person será subistituido por " "

            limitarPersonagem(indiceInicial, indiceFinal, dataIndice).map((item) => {// essa função vai ser retornada um slice()
                /*vai chamar a função limitar personagem:
    
                    function limitarPersonagem(indexInicial, indexFinal, items) { 9,18
                        let indFinal = indexFinal
                        let indInicial = indexInicial
    
                        indFinal = indInicial 
                        indInicial = indInicial - 9 
    
                        return items.slice(indInicial, indFinal) 
    
                    }
                */
    
                const charactersInformations = document.createElement('div')
                charactersInformations.innerHTML = `
        
                <section class="principaisInfos">
        
                    <div class="character-img">
                        ${addImage(item.image)}
                    </div>
                
                    <div class="infos-texto">
                        <h2>${item.name}</h2>
            
                        <h4 class="nickname">Nicknames</h4>
            
                        <p class="nicknamesText">${noNicknames(item.alternate_names)}</p>
            
                        
                    </div>
                
                </section>
                `;
    
                
    
                charactersInformations.classList.add('charactersBox')
                containerPerso.appendChild(charactersInformations)
            })
            
            //indice final = 9
            //indice inicial = 0
            indiceFinal = valorFina(indiceFinal)
            indiceInicial = valorFina(indiceInicial) 
                /*
                    function valorFina(valFinal) {         
                        valFinal = valFinal - 9             
    
                        return valFinal 
                    } 
       
                */
                    paginaAnt = pagina
                    pagina = pagina - 1    
                    const numPagina = document.querySelector('.pagina')
                    numPagina.innerHTML = `${pagina}`
        }
    });

        

        
        





    btnAvancar.addEventListener('click', () => {
        const totalPages = Math.ceil(dataIndice.length / 9); // calcula o número total de páginas
    if (pagina < totalPages) { // verifica se a página q ele ta é menor que o número total de páginas
        containerPerso.innerHTML = ""//todos os filhos, elementos html q tiver escrito dentro de container person será subistituido por " "


        limitarPersonagens(indiceInicial, indiceFinal, dataIndice).map((item) => {// essa função vai ser retornada um slice()
            /*vai chamar a função limitar personagem:

                function limitarPersonagens(indexInicial, indexFinal, items) { //inicial é 0, final é 9 e o dataindice é o array completo
                    let indInicial = indexInicial //vira 0
                    let indFinal = indexFinal //vira 9  ou seja no slice vai ficar (0,9) q é como inicia o site

                    indInicial = indFinal   //aqui passa pra proxima pagina, ou indice
                    indFinal = indFinal + 9 // o inicial q antes era 0 recebe o 9 de antes, e o final q antes era 9 adiciona mais 9 indices

                    return items.slice(indInicial, indFinal) //resultando em (9,18) o inicial recebeu o final, e o final adicionou +9

                }    //ele colocou "items" pq quando retornar a função que ele chamou vai ser trocada pelo oq ta escrito no return
                        e la se trabalha com a variavel return
            */

            const charactersInformations = document.createElement('div')
            charactersInformations.innerHTML = `
    
            <section class="principaisInfos">
    
                <div class="character-img">
                    ${addImage(item.image)}
                </div>
            
                <div class="infos-texto">
                    <h2>${item.name}</h2>
        
                    <h4 class="nickname">Nicknames</h4>
        
                    <p class="nicknamesText">${noNicknames(item.alternate_names)}</p>
        
                    
                </div>
            
            </section>
            `;

            

            charactersInformations.classList.add('charactersBox')
            containerPerso.appendChild(charactersInformations)

            charactersInformations.addEventListener('click', async()=>{
                characterDetails(item.id)
            })
        })
        
        //indice final = 18
        //indice inicial = 9
        indiceFinal = valorFinal(indiceFinal)//neste momento o indice final já é o da proxima pagina, pq ele ja passou de pagina uma vez, q foi a função de cima, ou seja está (9,18)
        indiceInicial = valorFinal(indiceInicial) // quando terminar de reescrever todos os personagens, ele ira pegar os novos valores de indice
            /*
                function valorFinal(valFinal) {         //ele usou a msm função para chamar os valores, porem na chamada do indice final ele veio com 18,
                    valFinal = valFinal + 9             // e na chamada do indice inicial ele veio com 9,

                    return valFinal //quando for clicado vai retornar o valor final mais 9
                } 

                  //mas os dois numeros irão ser somados +9 ficando na primeira vez 27 e na segunda 18     
            */
                paginaAnt = pagina
                pagina = pagina + 1    
                const numPagina = document.querySelector('.pagina')
                numPagina.innerHTML = `${pagina}`
            }
        })
    
        const btnGryffindor = document.querySelector('.casa1')
    btnGryffindor.addEventListener('click', () => {
    baseUrl = 'https://hp-api.onrender.com/api/characters/house/gryffindor'
    indiceInicial = 0
    indiceFinal = 9

     pagina = 1
     paginaAnt = 0
    fetchCharacters(baseUrl)

    
})

        const btnSlytherin = document.querySelector('.casa2')
    btnSlytherin.addEventListener('click', () => {
    baseUrl = 'https://hp-api.onrender.com/api/characters/house/slytherin'
    indiceInicial = 0
    indiceFinal = 9
    debugger

     pagina = 1
     paginaAnt = 0
    fetchCharacters(baseUrl)
})

        const btnRavenclaw = document.querySelector('.casa3') // a melhor casa né
    btnRavenclaw.addEventListener('click', () => {
    baseUrl = 'https://hp-api.onrender.com/api/characters/house/ravenclaw'
    indiceInicial = 0
    indiceFinal = 9

     pagina = 1
     paginaAnt = 0
    fetchCharacters(baseUrl)
})
        const btnHufflepuff = document.querySelector('.casa4')
        btnHufflepuff.addEventListener('click', () => {
    baseUrl = 'https://hp-api.onrender.com/api/characters/house/hufflepuff'
    indiceInicial = 0
    indiceFinal = 9

     pagina = 1
     paginaAnt = 0
    fetchCharacters(baseUrl)
})



}

function characterDetails(id){
    window.location.href = `./PAGES/person.html?id=${id}`
}

function fetchCharacters(url) { // isso aqui pra atualizar o fetch e conseguir filtrar
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro de rede! Código:' + response.status)
            }
            return response.json()
        })
        .then((data) => {
            mostrarPersonagens(data)
        })
        .catch((err) => console.log(err))
}


function addImage(image) {
    if (image == "") {
        return `<img src="./img/noImage.png"">`
    } else {
        return `<img src=${image}>`
    }
}

function noNicknames(alternate_names) {
    if (alternate_names == "") {
        return `No nicknames found`
    } else {
        return `${alternate_names.slice(0,2)}`
    }
}

/***----------------------------------------passar pagina------------------------------------------------------ */

function valorFinal(valFinal) {
    valFinal = valFinal + 9
    return valFinal //quando for clicado vai retornar o valor final mais 9
}

function limitarPersonagens(indexInicial, indexFinal, items) {
    let indInicial = indexInicial
    let indFinal = indexFinal

    indInicial = indFinal
    indFinal = indFinal + 9

    return items.slice(indInicial, indFinal)
}
function limitarPersonagem(indexInicial, indexFinal, items) {
    let indFinal = indexFinal
    let indInicial = indexInicial

    indFinal = indInicial 
    indInicial = indInicial - 9 

    return items.slice(indInicial, indFinal) 
}
function valorFina(valFinal) {         
    valFinal = valFinal - 9             

    return valFinal 
} 