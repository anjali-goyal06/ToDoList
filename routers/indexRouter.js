const express = require('express')
const{ ensureAuthenticated} = require('../config/auth')
const router = express.Router()

// Index page
router.get('/',ensureAuthenticated , (req,res)=>{
    res.render('home',{
      user : req.user
    })
})

router.get('/dashboard',ensureAuthenticated , (req,res) => {
    res.render('dashboard' ,{
  //      user = req.user
    })
})

module.exports = router