//Imports
const express = require('express'),
      exphbs = require('express-handlebars'),
      path = require('path'),
      morgan = require('morgan')

//Execute express
const app = express()

//Settings
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLauyout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/helpers.js')
}))
app.set('view engine', '.hbs')

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Routes
const INDEX = require('./routes/index')
const PET = require('./routes/pet')
app.use('/', INDEX)
app.use('/mascota', PET)

//Public
app.use(express.static(path.join(__dirname, 'public')))

//Server
app.listen(8080, () => {
    console.log('Servidor OK en puerto 8080')
})