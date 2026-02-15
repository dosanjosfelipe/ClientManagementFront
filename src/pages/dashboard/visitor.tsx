import "./dashboard.scss";

// Componentes
import { DashboardHeader } from "../../components/dashboard/Header";
import { ClientsTable } from "../../components/dashboard/ClientsTable";
import { Pagination } from "../../components/dashboard/Pagination";

// Hooks e Types
import { useClient } from "../../hooks/useClient";

function Visitor() {
  const {
    clients,
    total,
    page,
    linkCopied,
    setPage,
    setSearch,
    shareClientsTable,
  } = useClient();

  const handleSearchSubmit = (value: string) => {
    setPage(0);
    setSearch(value);
  };

  return (
    <div className="dashboard">
      <DashboardHeader
        onShareLink={shareClientsTable}
        onSearchSubmit={handleSearchSubmit}
        disableShare={true}
        linkCopied={linkCopied}
      />

      <ClientsTable
        page={page}
        pageSize={11}
        clients={clients}
        disableShare={true}
      />

      <Pagination page={page} total={total} pageSize={11} setPage={setPage} />
    </div>
  );
}

export default Visitor;
