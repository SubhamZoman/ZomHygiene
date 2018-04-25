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
  fs.writeFile(__dirname + '/../public/assets/report.json', JSON.stringify(req.body), 'utf8', (err) => {
    if (err) {
      console.log(err)
      res.send({ status: 'error' })
    } else {
      let restaurantURL = req.body.restaurantName.replace(' ', '_');
      startProcess(restaurantURL).then(obj => {
        res.send(obj)
      })
    }
  });
})

const startProcess = (resURL) => {
  return (async () => {
    let pathObj = {}
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const vpFB = { width: 1200, height: 630 }
    const vpTW = { width: 1024, height: 512 }
    const vpIN = { width: 1080, height: 1080 }

    page.setViewport(vpFB)
    await page.goto('http://localhost:4000/', { waitUntil: 'load' });
    await page.screenshot({ path: resURL + '_fb_sticker.jpeg', type: 'jpeg', quality: 100, clip: { x: 0, y: 0, width: 1200, height: 630 } });
    pathObj.fbStickerPath = __dirname + '/' + resURL + '_fb_sticker.jpeg'
    console.log('FB Sticker Captured!')

    page.setViewport(vpTW)
    await page.goto('http://localhost:4000/twitter.html', { waitUntil: 'load' });
    await page.screenshot({ path: resURL + '_tw_sticker.jpeg', type: 'jpeg', quality: 100, clip: { x: 0, y: 0, width: 1024, height: 512 } });
    pathObj.twitterStickerPath = __dirname + '/' + resURL + '_tw_sticker.jpeg'
    console.log('Twitter Sticker Captured!')

    page.setViewport(vpIN)
    await page.goto('http://localhost:4000/instagram.html', { waitUntil: 'load' });
    await page.screenshot({ path: resURL + '_in_sticker.jpeg', type: 'jpeg', quality: 100, clip: { x: 0, y: 0, width: 1080, height: 1080 } });
    pathObj.instaStickerPath = __dirname + '/' + resURL + '_in_sticker.jpeg'
    console.log('Instagram Sticker Captured!')

    await browser.close()
    return pathObj
  })();
}