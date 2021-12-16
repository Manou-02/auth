const User = require('../models/User');
const {success, error} = require('consola');
const bcrypt = require('bcrypt');

/**
 * Register user
 * @param {*} req 
 * @param {*} res 
 */
module.exports.register = async (req, res) => {
    const {username, password} = req.body;

    try{
        await User.findOne({username}).then(docs => {
            if(docs){
                return res.json({erreur : `Username already exists`});
            }
        })

        await bcrypt.hash(password, 12, (err, hashed) => {
            if(err){
                error({message : `${err}`})
            }
            const user = User.create({username, password : hashed});
            res.json(user);
        })
    }catch(err){
        error({message :`${err}`})
    }
}

/**
 * Login user
 * @param {*} req 
 * @param {*} res 
 */
module.exports.login = async (req, res) => {
    const {username, password} = req.body;

    try{
        await User.findOne({username}).then(docs => {
            bcrypt.compare(password, docs.password, (err, result) => {
                if(result){
                    req.session.user = docs;
                    return res.json(docs);
                }else{
                    return res.json({erreur : `Mot de passe incorrect`});
                }
            })

        }).catch(err => {
            error({message : `Username introuvable \n ${err}`})
            return res.json({erreur : `Username introuvable`});
        })
        
    }catch(err){
        error({message : `${err}`})
    }
}
/**
 * Check login
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.checkLogin = async (req, res) => {
    if(req.session.user){
        return res.json({loggedIn : true, user : req.session.user})
    }else{
        res.json({loggedIn : false});
    }
}