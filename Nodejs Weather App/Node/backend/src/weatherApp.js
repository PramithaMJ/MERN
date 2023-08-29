const { error } = require("console")
const request = require('request')


const weatherApp = (address) => {
    return new Promise ((resolve,reject) => {
        const info = {
            url: `http://api.weatherapi.com/v1/current.json?key=b4d0448631bb4cae8c5142254230808&q=${address}`,
            json: true
        }

        request(info,(error,body) => {
            if(error){
                reject(error);
            }else{
                resolve(body);
            }
        })
    })
}

module.exports = weatherApp;