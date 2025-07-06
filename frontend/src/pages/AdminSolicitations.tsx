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

  useEffect(() => {
    dispatch(fetchAllSolicitations());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold text-gran-dark mb-6 text-center">
        Solicitações dos Alunos
      </h1>

      {loading && <p className="text-center text-gran-dark">Carregando...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="space-y-4">
        {data.map((solicitation, index) => (
          <SolicitationCard
            key={solicitation.id}
            solicitation={solicitation}
            index={index}
            onClick={() => setSelectedSolicitation(solicitation)}
          />
        ))}
      </div>

      {selectedSolicitation && (
        <SolicitationModal
          solicitation={selectedSolicitation}
          onClose={() => setSelectedSolicitation(null)}
        />
      )}
    </div>
  );
}
