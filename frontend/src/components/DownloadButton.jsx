// Botão de download de um documento pelo identificador.

export default function DownloadButton({ downloadUrl }) {
  return (
    <a href={downloadUrl} download>
      <button type="button">Baixar</button>
    </a>
  );
}
