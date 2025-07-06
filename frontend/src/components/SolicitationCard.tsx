import type { Solicitation } from "../store/solicitationSlice";

interface Props {
  solicitation: Solicitation;
  index: number;
  onClick?: () => void;
}

const statusMap = {
  pending: { color: "bg-yellow-400", label: "Pendente" },
  in_review: { color: "bg-orange-500", label: "Em Análise" },
  completed: { color: "bg-green-600", label: "Concluída" },
  canceled: { color: "bg-red-600", label: "Cancelada" },
};

export default function SolicitationCard({
  solicitation,
  index,
  onClick,
}: Props) {
  const { color, label } = statusMap[solicitation.status];

  return (
    <div
      onClick={onClick}
      className={`border rounded shadow p-4 bg-white space-y-2 transition ${
        onClick ? "hover:bg-slate-100 cursor-pointer" : ""
      }`}
    >
      <h3 className="text-lg font-semibold text-gran-dark">
        #{index + 1} Solicitação - {solicitation.type}
      </h3>
      <p className="text-sm text-gray-700">{solicitation.description}</p>

      <div className="text-sm text-gran-dark">
        <strong>Resposta:</strong>{" "}
        {solicitation.response ?? (
          <span className="text-gray-500 italic">
            Ainda não foi respondida.
          </span>
        )}
      </div>

      <div className="text-sm text-gran-dark">
        <strong>Solicitado em:</strong>{" "}
        {new Date(solicitation.created_at).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${color}`} />
          <span className="text-sm">{label}</span>
        </div>
      </div>
    </div>
  );
}
