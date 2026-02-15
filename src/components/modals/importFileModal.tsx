import "./importFileModal.scss";
import { useState, type DragEvent } from "react";
import { FaTimes, FaCloudUploadAlt, FaFileCsv } from "react-icons/fa";

interface ImportClientsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => Promise<boolean>;
}

export function ImportClientsModal({
  isOpen,
  onClose,
  onSubmit,
}: ImportClientsModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (selectedFile: File | null) => {
    if (
      selectedFile &&
      (selectedFile.type === "text/csv" || selectedFile.name.endsWith(".csv"))
    ) {
      setFile(selectedFile);
    } else {
      alert("Por favor, selecione um arquivo CSV válido.");
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0] ?? null;
    handleFileChange(droppedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const success = await onSubmit(file);
    if (success) {
      setFile(null);
      onClose();
    }
  };

  return (
    <div className="modal__overlay">
      <div className="modal">
        <button className="modal__close" onClick={onClose}>
          <FaTimes />
        </button>

        <h3>Importar tabela CSV</h3>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label
            className={`file-dropzone ${isDragging ? "dragging" : ""} ${file ? "has-file" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              className="hidden-input"
            />

            <div className="dropzone-content">
              {file ? (
                <>
                  <FaFileCsv className="icon-success" />
                  <span className="file-name">{file.name}</span>
                  <span className="change-file">Clique para alterar</span>
                </>
              ) : (
                <>
                  <FaCloudUploadAlt />
                  <span>
                    Arraste o arquivo ou <strong>clique aqui</strong>
                  </span>
                  <small>Apenas arquivos .CSV</small>
                </>
              )}
            </div>
          </label>

          <button
            type="submit"
            disabled={!file}
            className={!file ? "disabled" : ""}
          >
            Importar
          </button>
        </form>
      </div>
    </div>
  );
}
