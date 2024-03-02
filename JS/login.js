const data = [
    
    {
    "id": 1,
    "usuario": "harrypotter",
    "senha": "123456"
    },
    {
    "id": 2,
    "usuario": "hermionegranger",
    "senha": "654321"
    },
    {
    "id": 3,
    "usuario": "ronweasley",
    "senha": "123654"
    }
]

console.log(data)

const btn = document.querySelector("#btnLogin")

btn.addEventListener('click', (event)=>{
event.preventDefault()
const user  = document.getElementById('user').value
const password = document.getElementById('password').value

const login = data.find((objeto) => objeto.usuario === user && objeto.senha === password)

if(login){
    window.location = './index2.html'
}else{
    alert('User not found, try again!')
}

})