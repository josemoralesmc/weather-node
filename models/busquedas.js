const fs = require('fs')
const axios = require("axios");
require('dotenv').config()

class Busquedas {
  historial = [];
  dbPath = './db/database.json'

  constructor() {
    // Todo: leer DB si existe
    this.leerBD();
  }

  get historialCapitalizado(){
    // Capitalizar
    return this.historial.map( letra => {
      let palabras = letra.split(' ')
      palabras = palabras.map( l => l[0].toUpperCase() + l.substring(1))

      return palabras.join(' ')
    })
  
    
    return this.historal;
  }

  get paramsMapbox() {
    return {
      "access_token": process.env.MAPBOX,
      'limit': 5,
      'language': "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      // peticion HTTP
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
      });

      const resp = await instance.get('', { params: this.paramsMapbox});
      return resp.data.features.map(lugar => ({
            id: lugar.id,
            nombre: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1],
      }))
    
    } catch (error) {
      return [];
    }

   
  }

 
  

  async climaLugar(lat, lon){
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`

      })
      const resp = await instance.get("", {params: {
        lat,
        lon,
        'appid': process.env.OPENWEATHER,
        'units': 'metric',
        'lang': "es"
      }})
      return resp.data;
    } catch (err) {
      return[err]
    }
  }

  agregarHistorial(lugar = ''){
    // Prevenir duplicados

    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return
    }


    this.historial.unshift(lugar.toLocaleLowerCase());

    this.guardarDb()

  }

  guardarDb(){

    const payload = {
      historial: this.historial
    }


    fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }


  leerBD(){
    if (!fs.existsSync(this.dbPath)) return;
  
    const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'})
    const data = JSON.parse(info)


    this.historial = data.historial
  }
}

module.exports = Busquedas;

