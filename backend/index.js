require('dotenv').config()
const axios = require('axios')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

app.get('/', (req,res) => {
    res.json({
        "app": "OndePassa", 
        "status": "online"
    })
})


const port = 3000
app.listen(port, () => console.log(`Backend do OndePassa no ar. Porta: ${port}.`))