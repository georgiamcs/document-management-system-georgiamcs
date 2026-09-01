// Controller: trata entrada/saída HTTP e validação básica.

const path = require('node:path');
const fs = require('node:fs');
const documentService = require('../services/documentService');

const STORAGE_DIR = path.join(__dirname, '..', '..', 'storage');

function upload(req, res) {
  try {
    const owner = req.body?.owner;
    const document = documentService.registerUpload({ file: req.file, owner });
    res.status(201).json(document);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

function list(req, res) {
  const documents = documentService.listDocuments();
  res.json(documents);
}

function download(req, res) {
  const { id } = req.params;
  const document = documentService.getDocumentById(id);

  if (!document) {
    res.status(404).json({ erro: 'Documento não encontrado' });
    return;
  }

  const filePath = path.join(STORAGE_DIR, document.storedFileName);

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ erro: 'Arquivo não encontrado no armazenamento' });
    return;
  }

  res.download(filePath, document.originalName);
}

module.exports = {
  upload,
  list,
  download,
};
