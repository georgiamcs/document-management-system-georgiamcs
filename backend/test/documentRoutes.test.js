const { test } = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const app = require('../src/app');

// Testes de integração das rotas de documentos: upload, listagem e download.

function startServer() {
  return new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });
}

test('fluxo completo de upload, listagem e download de documento', async () => {
  const server = await startServer();
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const fileContent = 'conteúdo de teste do documento';
    const form = new FormData();
    form.append('file', new Blob([fileContent], { type: 'text/plain' }), 'teste.txt');
    form.append('owner', 'usuario-teste');

    const uploadResponse = await fetch(`${baseUrl}/upload`, {
      method: 'POST',
      body: form,
    });

    assert.strictEqual(uploadResponse.status, 201);
    const document = await uploadResponse.json();
    assert.ok(document.id, 'o documento deve possuir um id');
    assert.strictEqual(document.originalName, 'teste.txt');
    assert.strictEqual(document.owner, 'usuario-teste');

    const listResponse = await fetch(`${baseUrl}/documents`);
    assert.strictEqual(listResponse.status, 200);
    const documents = await listResponse.json();
    assert.ok(Array.isArray(documents));
    assert.ok(documents.some((doc) => doc.id === document.id));

    const downloadResponse = await fetch(`${baseUrl}/documents/${document.id}/download`);
    assert.strictEqual(downloadResponse.status, 200);
    const downloadedText = await downloadResponse.text();
    assert.strictEqual(downloadedText, fileContent);
  } finally {
    server.close();
  }
});

test('retorna 404 ao baixar documento inexistente', async () => {
  const server = await startServer();
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const response = await fetch(`${baseUrl}/documents/id-inexistente/download`);
    assert.strictEqual(response.status, 404);
  } finally {
    server.close();
  }
});

test('retorna 400 quando nenhum arquivo é enviado no upload', async () => {
  const server = await startServer();
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const form = new FormData();
    form.append('owner', 'usuario-teste');

    const response = await fetch(`${baseUrl}/upload`, {
      method: 'POST',
      body: form,
    });

    assert.strictEqual(response.status, 400);
  } finally {
    server.close();
  }
});
