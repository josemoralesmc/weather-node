const { inquirer } = require("inquirer");
const { leerInput, inquirerMenu, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
    const busquedas = new Busquedas()
    let opt = null


    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                    // Mostrar mensajes

                    const termino = await leerInput('Ciudad: ')
                    
                    
                    // buscar los lugares
                    const lugares = await busquedas.ciudad(termino)
                    
                    // Seleccionar el lugar
                    const id = await listarLugares(lugares)
                    if(id === '0') continue
                    
                    const lugarSel = lugares.find(l => l.id === id)
                    
                    // Guardar en DB
                    busquedas.agregarHistorial(lugarSel.nombre)
                    
                    // Clima
                    const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)
                    // Mostrar resultados
                    console.clear()
                    console.log('\nInformacion de la ciudad\n'.green);
                    console.log('Ciudad:', lugarSel.nombre);
                    console.log('Lat:', lugarSel.lat);
                    console.log('Long:', lugarSel.lng);
                    console.log('Temperatura:', clima.main.temp);
                    console.log('Maxima:', clima.main.temp_max);
                    console.log('Minima:', clima.main.temp_min);
                    console.log('Descripcion:', clima.weather[0].description);
                break;
        
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}`.green;
                    console.log(`${idx } ${lugar}`);
                })
                break;
        }
    } while (opt !== 0);
}

main()