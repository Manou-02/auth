const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const { success, error } = require('consola');
const userRoutes = require('./routes/user.routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT;
const DB_URI_LOCAL = process.env.DB_URI_LOCAL;
const SECRET = process.env.SECRET;


/**Middleware */
app.use(express.json());
app.use(cors({
    origin : ["http://localhost:3000"],
    credentials : true,
    methods : ["GET", "POST"]
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(session({
    key : "userId",
    secret : SECRET,
    resave : false,
    saveUninitialized : false,
    cookie : {
        expires : 60*60*24*7
    }
}));


/**Routes */
app.use('/api/users', userRoutes);


/**Connect DB */
mongoose.connect(DB_URI_LOCAL)
    .then(() => {
        app.listen(PORT, () => {
            success({message : `Server started in port ${PORT}`});
        })
    })
    .catch(err => {
        console.log(err);
        error({message : `Can't connect to the DB. \n${err}`})
    })
