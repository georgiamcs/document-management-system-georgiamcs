// Componente de upload de documentos. Permite selecionar um arquivo, informar
// o dono e enviá-lo ao backend.

import { useState } from 'react';
import { uploadDocument } from '../services/documentService';

export default function UploadComponent({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [owner, setOwner] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      setMensagem({ tipo: 'erro', texto: 'Selecione um arquivo para enviar' });
      return;
    }

    setEnviando(true);
    setMensagem(null);

    try {
      await uploadDocument(file, owner);
      setMensagem({ tipo: 'sucesso', texto: 'Documento enviado com sucesso' });
      setFile(null);
      setOwner('');
      event.target.reset();
      onUploadSuccess?.();
    } catch (error) {
      setMensagem({ tipo: 'erro', texto: error.message });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enviar documento</h2>
      <div>
        <label htmlFor="file">Arquivo</label>
        <br />
        <input
          id="file"
          type="file"
          onChange={(event) => setFile(event.target.files[0])}
        />
      </div>
      <div>
        <label htmlFor="owner">Usuário</label>
        <br />
        <input
          id="owner"
          type="text"
          value={owner}
          placeholder="Seu identificador de usuário"
          onChange={(event) => setOwner(event.target.value)}
        />
      </div>
      <button type="submit" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Enviar'}
      </button>
      {mensagem && (
        <p style={{ color: mensagem.tipo === 'erro' ? 'crimson' : 'green' }}>
          {mensagem.texto}
        </p>
      )}
    </form>
  );
}
