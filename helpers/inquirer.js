const inquirer = require('inquirer');
require('colors')

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        messagge: 'Que desea hacer?',
        choices: [{
            value: 1,
            name: `${"1.".green} Buscar ciudad`
        },
        {
            value: 2,
            name: `${"2.".green} Historial`
        },{
            value: 0,
            name: `${"0.".green} Salir`
        }]
    }
]


const inquirerMenu = async () =>{

    console.log("======================".green);
    console.log("Seleccione una opcion".white);
    console.log("======================\n".green);

    const {opcion} = await inquirer.prompt(preguntas)
    return opcion
}

const pausa = async () => {
    const enter = [{
        type: 'input',
        message: `Aprete ${'enter'.green} para continuar`,
        name: 'enter'
    }]
    
    const prompt = await inquirer.prompt(enter)
    return prompt
}

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'descripcion',
            message,
            validate(value){
                if (value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }
    ]

    const {descripcion} = await inquirer.prompt(question)
    return descripcion;
}

const listarLugares = async (lugares) => {

    const choices = lugares.map((lugar, i) => {

        const idx = `${i + 1}`.green
        return{
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas)
    return id


}


const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question)
    return ok
}

const mostrarListadoChecklist = async (tareas) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}`.green;

        return{
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })


    const pregunta = [
        {
            type: 'checkbox',
            message: 'Selecciones',
            name: 'ids',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(pregunta)
    return ids


}


module.exports = {inquirerMenu, pausa, leerInput, listarLugares, confirmar, mostrarListadoChecklist}