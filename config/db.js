const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })
const ConectarDb = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('base de datos conectada');

    } catch (error) {
        console.log(error);
        process.exit(1) //detener la app
    }

}
module.exports = ConectarDb