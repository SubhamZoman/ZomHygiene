const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer')
const fs = require('fs')

const port = 4000
let app = express()
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.json())
app.listen(port, (err) => {
  console.log('Server running on port: ', port)
})

app.post('/stickers', (req, res) => {
  let restaurantURL = req.body.restaurantName.split('').map(l=>{
    if(l === ' '){
      return '_'
    }
    return l
  }).join('')
  validateRequest(req.body)
    .then(_ => {
      fs.writeFile(__dirname + `/../public/assets/reports/${restaurantURL}.json`, JSON.stringify(req.body), 'utf8', (err) => {
        if (err) {
          console.log(err)
          res.send({ status: 'error' })
        } else {
          startProcess(restaurantURL).then(resultPath => {
            res.send(resultPath)
          })
        }
      })
    }).catch(err => {
      res.send(err)
    })
})

const validateRequest = (request) => {
  return new Promise((resolve, reject) => {
    const properties = ['rating', 'validUntil', 'auditedBy', 'dishImageSrc', 'restaurantName', 'restaurantAddr', 'restaurantRating', 'color']
    let emptyProps = []
    properties.forEach(property => {
      if (!request.hasOwnProperty(property) || request[property].length < 1) {
        emptyProps.push(property)
      }
    })
    emptyProps.length > 0
      ? reject({ status: 'error', emptyFields: emptyProps })
      : resolve({status: 'success'})
  })
}

const startProcess = (resURL) => {
  return (async () => {
    let pathObj = {}
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const vpFB = { width: 1200, height: 630 }
    const vpTW = { width: 1024, height: 512 }
    const vpIN = { width: 1080, height: 1080 }

    page.setViewport(vpFB)
    await page.goto(`http://localhost:4000/?file=${resURL}`, { waitUntil: 'load' });
    await page.screenshot({ path: __dirname + '/stickers/' + resURL + '_fb_sticker.jpeg', type: 'jpeg', quality: 100, clip: { x: 0, y: 0, width: 1200, height: 630 } });
    pathObj.fbStickerPath = __dirname + '/stickers/' + resURL + '_fb_sticker.jpeg'
    console.log('FB Sticker Captured!')

    page.setViewport(vpTW)
    await page.goto(`http://localhost:4000/twitter.html?file=${resURL}`, { waitUntil: 'load' });
    await page.screenshot({ path: __dirname + '/stickers/' + resURL + '_tw_sticker.jpeg', type: 'jpeg', quality: 100, clip: { x: 0, y: 0, width: 1024, height: 512 } });
    pathObj.twitterStickerPath = __dirname + '/stickers/' + resURL + '_tw_sticker.jpeg'
    console.log('Twitter Sticker Captured!')

    page.setViewport(vpIN)
    await page.goto(`http://localhost:4000/instagram.html?file=${resURL}`, { waitUntil: 'load' });
    await page.screenshot({ path: __dirname + '/stickers/' + resURL + '_in_sticker.jpeg', type: 'jpeg', quality: 100, clip: { x: 0, y: 0, width: 1080, height: 1080 } });
    pathObj.instaStickerPath = __dirname + '/stickers/' + resURL + '_in_sticker.jpeg'
    console.log('Instagram Sticker Captured!')

    await browser.close()
    return pathObj
  })();
}