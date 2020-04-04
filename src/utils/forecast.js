const request = require('request')

const forecast = (latitude,longitude,callback)=>{

    const url = "https://api.darksky.net/forecast/96ecf1b30da47500d03eccf50de1a1d6/"+latitude+","+longitude+"?units=si"

    request(url,(error,response,body)=>{
        const data = JSON.parse(response.body)
        if(error){
            callback("Unable to connect with web server",undefined)
        }
        else if(data.error){
            callback("Unable to find the location",undefined)
        }
        else{
            callback(undefined,data.daily.data[0].summary +" It is currently "+data.currently.temperature+" degrees out and there is "+ data.currently.precipProbability +" probability of rain")
        }
    })

}

module.exports=forecast