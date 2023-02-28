const router = require('express').Router()
const cloudinary = require('cloudinary').v2
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')
require('dotenv').config()
cloudinary.config({
    cloud_name: process.env.IMG_NAME,
    api_key: process.env.IMG_KEY,
    api_secret: process.env.IMG_SECRET
})

router.post('/upload', (req, res) => {
    try {
        let file = req.files.file
        if (!file) return res.status(400).json({ message: 'no file were uploaded' })
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' &&file.mimetype!=='image/webp') {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ message: 'format file is incorrect' })
        }
        if (file.size > 1024 * 1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ message: 'file too langer' })
        }
        cloudinary.uploader.upload(file.tempFilePath, { folder: "text" }, async (error, result) => {
            if (error) throw error;
            removeTmp(file.tempFilePath)
            const { asset_id, public_id, url } = result
            return res.json({ asset_id, public_id, url })
        });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.post('/destroy', (req, res) => {
    try {
        let filePath = req.body.public_id
        if (!filePath) return res.status(400).json({ message: 'no image selected' })
        cloudinary.uploader.destroy(filePath, (error, result) => {
            if (error) throw error;
        })
        return res.json({ message: "deleted image" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})
const removeTmp = (path) => {
    fs.unlink(path, err => { if (err) throw err })
}

module.exports = router