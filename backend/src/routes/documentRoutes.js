// Definição das rotas de documentos. Delegam a lógica para os controllers.

const express = require('express');
const multer = require('multer');
const path = require('node:path');
const crypto = require('node:crypto');

const documentController = require('../controllers/documentController');

const STORAGE_DIR = path.join(__dirname, '..', '..', 'storage');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, STORAGE_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = crypto.randomUUID();
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/upload', upload.single('file'), documentController.upload);
router.get('/documents', documentController.list);
router.get('/documents/:id/download', documentController.download);

module.exports = router;
