import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createSolicitation } from "../store/solicitationSlice";
import { toast } from "react-toastify";

export default function CreateSolicitation() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [type, setType] = useState("Outros");
  const [description, setDescription] = useState("");

  const loading = useAppSelector((state) => state.solicitations.loading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(
      createSolicitation({ type, description, status: "pending" })
    );

    if (createSolicitation.fulfilled.match(result)) {
      toast.success("Solicitação enviada com sucesso!");
      navigate("/my-solicitations");
    }

    if (createSolicitation.rejected.match(result)) {
      toast.error(result.payload || "Erro ao enviar solicitação.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-center text-gran-dark mb-6">
        Nova Solicitação
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm text-gran-dark font-medium">
          Tipo de Solicitação
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Documentos">Documentos</option>
          <option value="Financeiro">Financeiro</option>
          <option value="Matrícula">Matrícula</option>
          <option value="Outros">Outros</option>
        </select>

        <label className="block text-sm text-gran-dark font-medium">
          Descrição
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gran-dark text-white p-2 rounded hover:bg-gran-bright transition"
        >
          {loading ? "Enviando..." : "Enviar Solicitação"}
        </button>
      </form>
    </div>
  );
}
