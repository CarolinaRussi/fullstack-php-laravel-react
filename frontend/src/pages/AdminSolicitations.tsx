import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAllSolicitations } from "../store/adminSolicitationsSlice";
import SolicitationCard from "../components/SolicitationCard";
import type { Solicitation } from "../store/solicitationSlice";
import SolicitationModal from "../components/SolicitationModal";

export default function AdminSolicitations() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state) => state.adminSolicitations
  );
  const [selectedSolicitation, setSelectedSolicitation] =
    useState<Solicitation | null>(null);
  const [filter, setFilter] = useState<
    "all" | "pending" | "in_review" | "completed" | "canceled"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchAllSolicitations());
  }, [dispatch]);

  const filtered =
    filter === "all" ? data : data.filter((s) => s.status === filter);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold text-gran-dark mb-6 text-center">
        Solicitações dos Alunos
      </h1>

      {loading && <p className="text-center text-gran-dark">Carregando...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="flex justify-center gap-2 my-4 flex-wrap">
        {["all", "pending", "in_review", "completed", "canceled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => {
                setFilter(status as typeof filter);
                setCurrentPage(1); // volta para página 1 ao mudar filtro
              }}
              className={`px-4 py-2 rounded border text-sm ${
                filter === status
                  ? "bg-gran-dark text-white"
                  : "bg-white text-gran-dark border-gran-dark"
              }`}
            >
              {status === "all"
                ? "Todas"
                : {
                    pending: "Pendente",
                    in_review: "Em análise",
                    completed: "Concluída",
                    canceled: "Cancelada",
                  }[status]}
            </button>
          )
        )}
      </div>

      <div className="space-y-4 pb-10">
        {paginated.map((solicitation, index) => (
          <SolicitationCard
            key={solicitation.id}
            solicitation={solicitation}
            index={index}
            onClick={() => setSelectedSolicitation(solicitation)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 pb-5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded text-sm ${
                currentPage === page
                  ? "bg-gran-dark text-white cursor-pointer"
                  : "bg-white text-gran-dark border-gran-dark cursor-pointer"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {selectedSolicitation && (
        <SolicitationModal
          solicitation={selectedSolicitation}
          onClose={() => setSelectedSolicitation(null)}
        />
      )}
    </div>
  );
}
