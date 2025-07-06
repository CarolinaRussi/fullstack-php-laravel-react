import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchSolicitations,
  type SolicitationStatus,
} from "../store/solicitationSlice";
import SolicitationCard from "../components/SolicitationCard";
import { toast } from "react-toastify";

export default function MySolicitations() {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector(
    (state) => state.solicitations
  );
  const [filter, setFilter] = useState<SolicitationStatus | "all">("all");

  useEffect(() => {
    dispatch(fetchSolicitations());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const filtered =
    filter === "all" ? list : list.filter((s) => s.status === filter);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 space-y-4">
      <h2 className="text-2xl font-bold text-center text-gran-dark">
        Minhas Solicitações
      </h2>

      <div className="flex justify-center gap-2 my-4 flex-wrap">
        {["all", "pending", "in_review", "completed", "canceled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status as typeof filter)}
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

      {loading ? (
        <p className="text-center text-gran-dark">Carregando...</p>
      ) : filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((s, i) => (
            <SolicitationCard key={s.id} solicitation={s} index={i} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          Nenhuma solicitação encontrada.
        </p>
      )}
    </div>
  );
}
