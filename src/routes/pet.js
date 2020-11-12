const express = require('express'),
      router = express.Router()
      fs = require('fs').promises

router.get('/', async (req, res) =>{
    const parse = await fs.readFile('./src/db/pet.json')
    const data = await JSON.parse(parse)
    res.render('../views/pet/pet', {data})
})

router.put('/food/:food', async (req, res) =>{
    const food = req.params.food
    const parse = await fs.readFile('./src/db/pet.json')
    const data = await JSON.parse(parse)
    data[0].hungry = data[0].hungry + Number(food)
    const newData = await JSON.stringify(data)
    const writeFile = await fs.writeFile('./src/db/pet.json', newData)
    res.json({
        success: true
    })
})

module.exports = router