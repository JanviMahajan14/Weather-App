const request = require('request')

const geocoding = (address,callback)=>{

    const map = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiamFudmltYWhhamFuIiwiYSI6ImNrNmNoMTc4NDBrZDQzc3MwOXhoMng1c2gifQ.nowJGFWIgriuEuF3gqc48A&limit=1"
    
    request(map,(error,response,body)=>{
        if(response === undefined){
            return callback("Unable to connect to web services",undefined)
        }
        
        const data = JSON.parse(response.body)
        if(error){
            callback("Unable to connect to web services",undefined)
        }
        else if(data.features.length==0){
            callback("Invalid search. Try searching some other location",undefined)
        }
        else{
            const results = data.features[0]
            callback(undefined,{
                latitude:results.center[1],
                longitude:results.center[0],
                location:results.place_name
            })
           
        }
    })

}

module.exports=geocoding