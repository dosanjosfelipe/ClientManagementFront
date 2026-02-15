import "./Header.scss";
import { useState } from "react";
import {
  FaSearch,
  FaChevronDown,
  FaUserEdit,
  FaGithub,
  FaSignOutAlt,
  FaTrash,
  FaShareAlt,
  FaFileExport,
  FaFileImport,
} from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { DeleteUserModal } from "../modals/DeleteUserModal";
import { useUser } from "../../hooks/useUser";
import { useAuth } from "../../hooks/useAuth";
import { ImportClientsModal } from "../modals/importFileModal";

interface DashboardHeaderProps {
  onNewClient?: () => void;
  onSearchSubmit: (value: string) => void;
  onShareLink: () => void;
  onEditUsername: () => void;
  onExportClient: () => void;
  onImportClient: (file: File) => Promise<boolean>;
  disableShare: boolean;
  linkCopied: boolean;
}

export function DashboardHeader({
  onNewClient,
  onSearchSubmit,
  onShareLink,
  onEditUsername,
  onExportClient,
  onImportClient,
  disableShare,
  linkCopied,
}: DashboardHeaderProps) {
  const [localSearch, setLocalSearch] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);

  const { user, loading, removeUser } = useUser();
  const { handleLogoutUser } = useAuth();

  if (loading || !user) {
    return null;
  }

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
    setActionsMenuOpen(false);
  };

  const toggleActionsMenu = () => {
    setActionsMenuOpen((prev) => !prev);
    setUserMenuOpen(false);
  };

  return (
    <>
      <div className="dashboard__clients">
        {/* LEFT */}
        <div className="clients__left">
          <div className="clients__user" onClick={toggleUserMenu}>
            <h2 className="title">
              Olá, {user.username.trim().split(/\s+/)[0]}!
            </h2>

            <button
              className={`clients__user-menu-btn ${userMenuOpen ? "active" : ""}`}
              type="button"
            >
              <FaChevronDown />
            </button>
          </div>

          {userMenuOpen && (
            <div className="clients__user-menu">
              <button
                type="button"
                onClick={() => {
                  setUserMenuOpen(false);
                  onEditUsername();
                }}
              >
                <FaUserEdit /> Alterar nome
              </button>

              <a
                href="https://github.com/dosanjosfelipe/clientmanagement-backend"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub /> Projeto GitHub
              </a>

              <div className="menu-divider"></div>

              <button
                type="button"
                onClick={() => {
                  setUserMenuOpen(false);
                  handleLogoutUser();
                }}
              >
                <FaSignOutAlt /> Sair
              </button>

              <button
                type="button"
                className="danger-btn"
                onClick={() => {
                  setUserMenuOpen(false);
                  setDeleteModalOpen(true);
                }}
              >
                <FaTrash /> Excluir conta
              </button>
            </div>
          )}
        </div>

        {/* CENTER */}
        <div className="clients__center">
          <div className="clients__search-container">
            <input
              className="clients__search"
              type="text"
              placeholder="Pesquisar Clientes..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearchSubmit(localSearch);
                }
              }}
            />

            <button
              className="clients__search-btn"
              type="button"
              onClick={() => onSearchSubmit(localSearch)}
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="clients__right">
          <button
            className="clients__add-btn"
            type="button"
            onClick={onNewClient}
            disabled={disableShare}
          >
            Novo Cliente
          </button>

          <div className="clients__share-container">
            {linkCopied && (
              <span className="clients__copied-text">Link copiado</span>
            )}

            <button
              className={`clients__user-menu-btn ${actionsMenuOpen ? "active" : ""}`}
              type="button"
              onClick={toggleActionsMenu}
              disabled={disableShare}
            >
              <IoMdMenu size={28} />
            </button>

            {actionsMenuOpen && (
              <div className="clients__actions-menu">
                <button
                  type="button"
                  onClick={() => {
                    setActionsMenuOpen(false);
                    onShareLink();
                  }}
                >
                  <FaShareAlt /> Compartilhar
                </button>

                <div className="menu-divider"></div>

                <button
                  type="button"
                  onClick={() => {
                    setActionsMenuOpen(false);
                    onExportClient();
                  }}
                >
                  <FaFileExport /> Exportar tabela
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActionsMenuOpen(false);
                    setImportModalOpen(true);
                  }}
                >
                  <FaFileImport /> Importar tabela
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ImportClientsModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onSubmit={onImportClient}
      />

      <DeleteUserModal
        isOpen={deleteModalOpen}
        user={user}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={removeUser}
      />
    </>
  );
}
