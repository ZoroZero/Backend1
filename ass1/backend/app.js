const express = require('express')
var request = require('request')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/users', (req, res) => {
    request('https://reqres.in/api/users', function(error, response, body){
      if(!error && response.statusCode == 200){
        var parseBody = JSON.parse(body)
        var data = parseBody["data"]
        res.json({data})
      }
    }
)})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})