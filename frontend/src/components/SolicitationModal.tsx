import { useState } from "react";
import type { Solicitation } from "../store/solicitationSlice";
import { useAppDispatch } from "../store/hooks";
import { toast } from "react-toastify";
import { updateSolicitation } from "../store/adminSolicitationsSlice";

interface Props {
  solicitation: Solicitation;
  onClose: () => void;
}

const statusMap = {
  pending: { color: "bg-yellow-400", label: "Pendente" },
  in_review: { color: "bg-orange-500", label: "Em Análise" },
  completed: { color: "bg-green-600", label: "Concluída" },
  canceled: { color: "bg-red-600", label: "Cancelada" },
};

export default function SolicitationModal({ solicitation, onClose }: Props) {
  const [status, setStatus] = useState(solicitation.status);
  const [response, setResponse] = useState(solicitation.response || "");
  const dispatch = useAppDispatch();

  return (
    <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-4">
        <h2 className="text-xl font-bold text-gran-dark mb-2">
          #{solicitation.id} - {solicitation.type}
        </h2>

        <p className="text-sm text-gran-dark">
          <strong>Descrição:</strong> {solicitation.description}
        </p>

        <p className="text-sm text-gran-dark">
          <strong>Status atual:</strong> {statusMap[solicitation.status].label}
        </p>

        <p className="text-sm text-gran-dark">
          <strong>Resposta atual:</strong>{" "}
          {solicitation.response || (
            <span className="italic text-gray-500">Ainda não respondida</span>
          )}
        </p>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gran-dark">
            Novo status:
          </label>
          <select
            className="w-full p-2 border rounded"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as
                  | "pending"
                  | "in_review"
                  | "completed"
                  | "canceled"
              )
            }
          >
            <option value="pending">Pendente</option>
            <option value="in_review">Em Análise</option>
            <option value="completed">Concluída</option>
            <option value="canceled">Cancelada</option>
          </select>

          <label className="block text-sm font-medium text-gran-dark">
            Resposta:
          </label>
          <textarea
            className="w-full p-2 border rounded"
            rows={3}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={async () => {
              const result = await dispatch(
                updateSolicitation({
                  id: solicitation.id,
                  status,
                  response,
                })
              );

              if (updateSolicitation.fulfilled.match(result)) {
                toast.success("Solicitação atualizada com sucesso!");
                onClose();
              } else {
                toast.error("Erro ao atualizar solicitação");
              }
            }}
            className="px-4 py-2 bg-gran-dark text-white rounded hover:bg-gran-bright transition"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
