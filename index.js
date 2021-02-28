const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const request = require('request')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 4200

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "build")))
app.use(cors())

app.post('/searchUser', async (req, res, next) => {
    let api = process.env.API_URL
    const cookieString = 'ig_did=5C4FF5EE-19F0-4124-ABF4-9331A0ACB90E; ig_nrcb=1; mid=X6RopgAEAAE2OY8jhZxaTW-sZJJ7; fbm_124024574287414=base_domain=.instagram.com; shbid=15390; csrftoken=BSbP5bAoZknzvDuR55OHgMJopnKOMsR8; ds_user_id=3497910573; sessionid=3497910573%3A4BE6NBwyEomIKa%3A8; shbts=1614271099.743085; rur=ATN; fbsr_124024574287414=FN9--EcrNsocdpSBFtYZ_kWFlYPG_H3xnaCoklXQIiY.eyJ1c2VyX2lkIjoiMTAwMDAzMjUyMTYxODA3IiwiY29kZSI6IkFRQmxMc25qUE51cGRWakxmOHowemFub2d3b3oyNkM1LUhTQVV3aDBTYXlPTENaSG5maWFpbC05cXJXM3BzSWZjSTZybXhQWU1NemN5aVpIaXVCSFdhcXAydHpiTS1KVC03dEN3a0JRMGpTdFMtdEVTTWV4SlZ0STM2bGJZR09GODctaHM0aXJ3UnZXQlBOY3lOaDROcmpYTlF2eUJRbkpNWGVSVGw3RDVEbGhEY1g5Z1ZPeGRuRzBOSDJhQ0RVcDZfU1FoZEY5cmZVdFhnZ1Fmb01SOWgyaS0xdXBueFhrc1ZyUFF5ZkVsTGpzVDZGbWtMNFdKbFNDXzVBb09QOVhTMUZIRVZ0RXdRMHQxalRhTlk4d0RtZUlLcWwwVjExRzB4SWhkZGY4Wi1qbHUtV3ZRZWZqdzV2cmdYOW1tNlNSZlRSSVFCMHREYV96NVhTQmcwSzhEdzlaIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUZzZ0tsNGlyVzhzUXExZWI0V1RDWkJDWVZrTkxEVVY0dHlnUWd5dlFES084dGNaQUNQVnB2ajE0dFlJV3pXeFZnWkFhd2lnMFpDdXh3TlRBdzd4dlQxVHBKdWNjWUQxVXFLSldIeXRHUFRCQ0FaQmNlOThNQ1ZkZ1pCQ2xJSTAwUVZ5akF0V0tOUGhrcHFRb2FCNEFOdFFWeTUwaVpDS1RaQ2xBUXlKeFhXSCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjE0NTIzMDIyfQ'
    api = api.replace('{key}', req.body.user)
    const data = await new Promise(((resolve, reject) => {
        request({
            uri: api,
            method: "GET",
            headers: {'content-type': 'application/json', cookie: cookieString}
        }, (err, response) => {
            if (err) {
                reject(err)
            } else {
                resolve(response.body)
            }
        })
    }))
    res.send(data)
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})