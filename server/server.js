const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const childProcess = require('child_process')
const port = 4000
let app = express()
app.use(express.static(path.join(__dirname, '../public')))

app.listen(port, (err) => {
  console.log('Server running on port: ', port)
  startProcess()
})

const startProcess = () => {
  const command = 'google-chrome --headless --disable-gpu --screenshot --window-size=3200,1620 http://localhost:4000/'
  childProcess.exec(command, (error, stdout, stderr) => {
    if ( !error && !stderr ){
      console.log('Done!')
    } else {
      console.log(error, stderr)
    }
  })
}