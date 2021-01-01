const express  = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const passport = require('passport')

const User = require('../models/User')
const { route } = require('./taskRouter')

// Register Page
router.get('/register',(req,res)=>{
    res.render('register')
})

// Login Page
router.get('/login',(req,res)=>{
    res.render('login')
})

// Register Handle (Form)
router.post('/register', ( req,res)=>{
    const { name , username , email , password  } = req.body
    let errors = []

    if(!name || !username ||  !email || !password){
        errors.push({msg : 'Please fill all the fields' })
    }

    if(password.length < 8){
        errors.push({msg : 'Password must be of atleast 8 letters' })
    }

    if(errors.length > 0){
        res.render('register' , {
            errors , name, email , username , password
        })
    }else{

        // Email validation 
        User.findOne({email : email}).then((user) => {

            if(user){
                // user exists 
                errors.push({ mgs : 'Email id already registered!' })
                res.render('register' , {
                    errors , name, email , username , password
                })
            }else{
                const newUser = new User({
                    name, email , username , password
                })

                // hashing the password

                bcrypt.genSalt(8,(err,salt) => {
                    bcrypt.hash(newUser.password , salt , (err,hash) => {
                        if(err)  throw err

                        newUser.password = hash

                        newUser.save().then((user) => {
                            req.flash('successMsg', 'You are now Registered')
                            res.redirect('/users/login')
                        }).catch((err)=> console.log(err))
                    })
                })
            }
        })
    }

    res.redirect('/')
})


// Login Handle(form)
router.post('/login',(req,res,next) => {
    passport.authenticate('local', {
        successRedirect : '/' , 
        failureRedirect : '/user/login',
        failureFlash : true
    })(req, res, next)
})

// logout handle
router.get('/logout', (req,res) => { 
    req.logout()
    req.flash('successMsg' , 'You are logged out')
    res.redirect('/user/login')
})

// user profile
router.get('/profile', (req,res) => { 
  res.render('profile',{user : req.user})
})

module.exports = router