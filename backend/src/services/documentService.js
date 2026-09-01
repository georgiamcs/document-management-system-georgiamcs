// Regras de negócio para gestão de documentos.

const crypto = require('node:crypto');
const documentRepository = require('../repositories/documentRepository');

// Cria os metadados do documento a partir do arquivo salvo pelo multer.
function registerUpload({ file, owner }) {
  if (!file) {
    throw new Error('Nenhum arquivo enviado');
  }

  const document = {
    id: crypto.randomUUID(),
    originalName: file.originalname,
    size: file.size,
    uploadedAt: new Date().toISOString(),
    owner: owner || 'anonimo',
    storedFileName: file.filename,
  };

  return documentRepository.create(document);
}

function listDocuments() {
  return documentRepository.findAll();
}

function getDocumentById(id) {
  return documentRepository.findById(id);
}

module.exports = {
  registerUpload,
  listDocuments,
  getDocumentById,
};
