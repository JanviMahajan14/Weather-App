const result = async () => {
    const response = await fetch('http://localhost:8000/weather?address=Jammu');
    const data = await response.json();
    return data;
}

result().then((data)=>{
    console.log(data)
}).catch((error)=>{
    console.log(error)
})