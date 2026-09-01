// Lista os documentos enviados, exibindo metadados e botão de download.

import { getDownloadUrl } from '../services/documentService';
import DownloadButton from './DownloadButton';

function formatarTamanho(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function formatarData(iso) {
  return new Date(iso).toLocaleString('pt-BR');
}

export default function DocumentList({ documents, carregando, erro }) {
  if (carregando) {
    return <p>Carregando documentos...</p>;
  }

  if (erro) {
    return <p style={{ color: 'crimson' }}>{erro}</p>;
  }

  if (!documents || documents.length === 0) {
    return <p>Nenhum documento enviado ainda.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Tamanho</th>
          <th>Enviado em</th>
          <th>Usuário</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {documents.map((document) => (
          <tr key={document.id}>
            <td>{document.originalName}</td>
            <td>{formatarTamanho(document.size)}</td>
            <td>{formatarData(document.uploadedAt)}</td>
            <td>{document.owner}</td>
            <td>
              <DownloadButton downloadUrl={getDownloadUrl(document.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
