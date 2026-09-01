// Página principal: reúne upload e listagem de documentos.

import { useCallback, useEffect, useState } from 'react';
import UploadComponent from '../components/UploadComponent';
import DocumentList from '../components/DocumentList';
import { listDocuments } from '../services/documentService';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregarDocumentos = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await listDocuments();
      setDocuments(dados);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarDocumentos();
  }, [carregarDocumentos]);

  return (
    <section>
      <UploadComponent onUploadSuccess={carregarDocumentos} />
      <h2>Documentos</h2>
      <DocumentList documents={documents} carregando={carregando} erro={erro} />
    </section>
  );
}
