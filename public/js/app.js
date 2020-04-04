const result = async (location) => {
    const response = await fetch('http://localhost:8000/weather?address='+location);
    const data = await response.json();
    if(data.error){
        throw new Error(data.error);
    }
    return data;
}

const form = document.querySelector('form');
const input = document.querySelector('input');
let messageOne = document.querySelector('.first');
let messageSecond = document.querySelector('.second');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = input.value;
 
    messageOne.textContent = "Loading...";
    messageSecond.textContent = "";

    result(location).then((data)=>{
        messageOne.textContent = data.location;
        messageSecond.textContent = data.forcastData;
    }).catch((error)=>{
        messageOne.textContent = error.toString().replace("Error:","");
        messageSecond.textContent = "";
    })
})