// Repositório de documentos: persiste metadados em memória.
// Nesta fase os arquivos ficam no filesystem (pasta backend/storage) e apenas
// os metadados (id, nome original, tamanho, data, dono, caminho no disco)
// são mantidos em memória.

const documents = [];

function create(document) {
  documents.push(document);
  return document;
}

function findAll() {
  return documents;
}

function findById(id) {
  return documents.find((document) => document.id === id);
}

module.exports = {
  create,
  findAll,
  findById,
};
