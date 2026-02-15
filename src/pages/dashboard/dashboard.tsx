import { useState } from "react";
import "./dashboard.scss";

import { useClient } from "../../hooks/useClient";
import { useUser } from "../../hooks/useUser";
import type { Client } from "../../types/Client";

import { DashboardHeader } from "../../components/dashboard/Header";
import { ClientsTable } from "../../components/dashboard/ClientsTable";
import { Pagination } from "../../components/dashboard/Pagination";

import { CreateClientModal } from "../../components/modals/CreateClientModal";
import { EditClientModal } from "../../components/modals/EditClientModal";
import { DeleteClientModal } from "../../components/modals/DeleteClientModal";
import { EditUsernameModal } from "../../components/modals/EditUsernameModal";

function Dashboard() {
  const {
    clients,
    total,
    page,
    linkCopied,
    exportClientsTable,
    importClientsTable,
    setPage,
    setSearch,
    addClient,
    editClientData,
    removeClient,
    shareClientsTable,
  } = useClient();

  const { user, editUsername } = useUser();

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditUsernameOpen, setIsEditUsernameOpen] = useState(false);

  const handleOpenEdit = (client: Client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteModalOpen(true);
  };

  const closeClientModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedClient(null);
  };

  const handleSearchSubmit = (value: string) => {
    setPage(0);
    setSearch(value);
  };

  return (
    <div className="dashboard">
      <DashboardHeader
        onNewClient={() => setIsCreateModalOpen(true)}
        onSearchSubmit={handleSearchSubmit}
        onShareLink={shareClientsTable}
        disableShare={false}
        linkCopied={linkCopied}
        onEditUsername={() => setIsEditUsernameOpen(true)}
        onExportClient={exportClientsTable}
        onImportClient={importClientsTable}
      />

      <ClientsTable
        disableShare={false}
        page={page}
        pageSize={11}
        clients={clients}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      <Pagination page={page} total={total} pageSize={11} setPage={setPage} />

      <EditUsernameModal
        key={user?.id}
        isOpen={isEditUsernameOpen}
        user={user}
        onClose={() => setIsEditUsernameOpen(false)}
        onSubmit={editUsername}
      />

      <CreateClientModal
        isOpen={isCreateModalOpen}
        onClose={closeClientModals}
        onSubmit={addClient}
      />

      <EditClientModal
        isOpen={isEditModalOpen}
        client={selectedClient}
        onClose={closeClientModals}
        onSubmit={editClientData}
      />

      <DeleteClientModal
        isOpen={isDeleteModalOpen}
        client={selectedClient}
        onClose={closeClientModals}
        onConfirm={removeClient}
      />
    </div>
  );
}

export default Dashboard;
