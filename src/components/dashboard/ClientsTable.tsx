import "./ClientsTable.scss";
import { FaPencilAlt, FaTrashAlt, FaInbox } from "react-icons/fa";
import type { Client } from "../../types/Client";
import { formatDateBR, formatPhoneBR } from "../../utils/Formatters";

interface ClientsTableProps {
  clients: Client[];
  onEdit?: (client: Client) => void;
  onDelete?: (client: Client) => void;
  page: number;
  pageSize: number;
  disableShare: boolean;
}

export function ClientsTable({
  clients,
  onEdit,
  onDelete,
  disableShare,
  page,
  pageSize,
}: ClientsTableProps) {
  const isEmpty = clients.length === 0;

  return (
    <div className="dashboard__table-wrapper">
      <table className="dashboard__table">
        <thead>
          <tr>
            <th style={{ width: "50px" }}>#</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
            <th style={{ width: "120px" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {isEmpty ? (
            <tr>
              <td colSpan={7} className="table__empty-row">
                <div className="empty-state-content">
                  <FaInbox size={40} />
                  <p>Nenhum cliente encontrado</p>
                  <span>Cadastre um novo cliente para começar.</span>
                </div>
              </td>
            </tr>
          ) : (
            clients.map((client, index) => (
              <tr key={client.id}>
                <td className="table__id">{index + 1 + page * pageSize}</td>
                <td className="table__name">{client.name}</td>
                <td className="table__email-ellipsis">
                  <span title={client.email}>{client.email}</span>
                </td>
                <td className="table__phone">{formatPhoneBR(client.phone)}</td>
                <td className="table__created">
                  {formatDateBR(client.createdAt)}
                </td>
                <td className="table__updated">
                  {formatDateBR(client.updatedAt)}
                </td>
                <td className="table__actions">
                  <button
                    className="btn-edit"
                    onClick={() => onEdit && onEdit(client)}
                    disabled={disableShare}
                    title="Editar"
                  >
                    <FaPencilAlt size={16} />
                  </button>
                  <span className="separator">|</span>
                  <button
                    className="btn-delete"
                    onClick={() => onDelete && onDelete(client)}
                    disabled={disableShare}
                    title="Excluir"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
