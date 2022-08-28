const express   = require('express')
const exphbs    = require('express-handlebars')
const session   = require('express-session')
const FileStore = require('session-file-store')(session)
const flash     = require('express-flash')

const app = express()
const conn = require('./db/connection')

//MODELS
const Twytte = require('./models/Twytte')
const User = require('./models/User')

//IMPORT ROUTES
const twytterRoutes = require('./routes/twytterRoutes')
const authRoutes = require('./routes/authRoutes')

// IMPORT CONTROLLER
const TwytteController = require('./controllers/TwytteController')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//RECEBER RESPOSTA DO BODY
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

//SESSION MIDDLEWARE
app.use(
    session({
        name:"session",
        secret: "my_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function(){},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 99999999999,
            expires: new Date(Date.now() + 99999999999),
            httpOnly: true
        }
    }),
)

//FLASH MESSAGES
app.use(flash())

//PUBLIC PATH
app.use(express.static('public'))

//SET SESSION TO RESPONSE
app.use((req, res, next) => {
    if(req.session.userid) {
        res.locals.session = req.session
    }
    next()
})

// ROUTES
app.use('/twytter', twytterRoutes)
app.use('/', authRoutes)

app.get('/', TwytteController.showTwytter)


// DB CONNECTION
conn
    // .sync({force: true})
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(err))