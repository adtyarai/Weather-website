const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=27e4e75d8e8b4128b6b76ddaf2124ac9&query='+latitude+','+longitude;

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Error unable to connect to weather service!', undefined);
        }else if (body.error){
            callback('Unable to fetch details for entered location.', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feeels like ${body.current.feelslike} degrees.`)
            
        }
    })
}

module.exports = forecast;