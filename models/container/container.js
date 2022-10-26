const fs = require('fs')
const fSync = fs.promises
const path = require('path')


class Container {
    pathFile = ""
    constructor(name) {
        this.pathFile = path.join(process.cwd(), `/db/${name}.json`)
        if (!fs.existsSync(`./db/${name}.json`)) {
            fs.writeFileSync(`./db/${name}.json`, "", "utf-8")
        }
    }

    async save(object) {

        try {
            let data = await fs.promises.readFile(this.pathFile)

            if (data != "") {
                let array = JSON.parse(data)
                let id = array[array.length - 1].id + 1
                object.id = id
                array[array.length] = object
                let enviar = JSON.stringify(array, null, 2)
                await fs.promises.writeFile(this.pathFile, enviar)
            }
            else {
                let emptyArray = []
                object.id = 1
                emptyArray[0] = object
                let enviar = JSON.stringify(emptyArray, null, 2)
                await fs.promises.writeFile(this.pathFile, enviar)
            }
        }
        catch (error) {
            console.log('Error al guardar archivo: ', error);
        }

    }


    async getAll() {
        try {
            const data = await fSync.readFile(this.pathFile, 'utf-8')


            if (data != '') {
                const arrayData = JSON.parse(data)
                return arrayData
            }
            else{
                return false
            }


        }
        catch (error) {
            console.log('Error al enviar archivo: ', error);
        }
    }
}

module.exports = Container 