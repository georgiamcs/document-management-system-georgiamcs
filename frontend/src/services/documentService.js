// Serviço de comunicação com a API do backend (via proxy /api do Vite).

const API_BASE = '/api';

async function parseErrorResponse(response) {
  try {
    const data = await response.json();
    return data.erro || 'Erro inesperado ao comunicar com o servidor';
  } catch {
    return 'Erro inesperado ao comunicar com o servidor';
  }
}

export async function uploadDocument(file, owner) {
  const formData = new FormData();
  formData.append('file', file);
  if (owner) {
    formData.append('owner', owner);
  }

  const response = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseErrorResponse(response));
  }

  return response.json();
}

export async function listDocuments() {
  const response = await fetch(`${API_BASE}/documents`);

  if (!response.ok) {
    throw new Error(await parseErrorResponse(response));
  }

  return response.json();
}

export function getDownloadUrl(documentId) {
  return `${API_BASE}/documents/${documentId}/download`;
}
