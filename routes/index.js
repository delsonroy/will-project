const express = require('express')
const router = express.Router()

const mt = require('./login')
router.get('/',(req,res)=>{
    res.send('ertghyjukytr')
console.log(mt.logg)

})

module.exports = router