const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');
const images = require('../helpers/images')

/* GET home page. */
router.get('/', auth.isUser, itemController.getItem);
router.post('/additem', auth.isAdmin, images.multer.single('image'), images.sendUploadToGCS, itemController.addItem);
router.post('/edit', auth.isAdmin, itemController.editItem);
router.post('/delete', auth.isAdmin, itemController.deleteItem);
// router.post('/upload',
//   images.multer.single('image'), 
//   images.sendUploadToGCS,
//   (req, res) => {
//     res.send({
//       status: 200,
//       message: 'Your file is successfully uploaded',
//       link: req.file.cloudStoragePublicUrl
//     })
//   })

module.exports = router;
