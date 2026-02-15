import "./Pagination.scss";

interface PaginationProps {
  page: number;
  total: number;
  pageSize: number;
  setPage: (page: number) => void;
}

export function Pagination({
  page,
  total,
  pageSize,
  setPage,
}: PaginationProps) {
  let totalPages = Math.ceil(total / pageSize);

  if (totalPages == 0) {
    totalPages = 1;
  }

  return (
    <>
      <p className="table__info">
        <i>
          Página {page + 1} de {totalPages}, total de {total} registros.
        </i>
      </p>

      <div className="dashboard__pagination">
        <button
          className="previously-btn"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          &lt; Anterior
        </button>

        <button
          className="next-btn"
          disabled={page + 1 === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Próximo &gt;
        </button>
      </div>
    </>
  );
}
