import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toast } from "react-toastify";

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"admin" | "student">("student");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      registerUser({ name, email, password, user_type: userType })
    );

    if (registerUser.fulfilled.match(result)) {
      toast.success("Registro realizado com sucesso!");

      const userType = result.payload?.user?.user_type;

      if (userType === "admin") {
        navigate("/admin/solicitations");
      } else {
        navigate("/my-solicitations");
      }
    }
    if (registerUser.rejected.match(result)) {
      toast.error("Erro ao registrar usuário");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-gran-dark">
        Registrar Usuário
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full p-2 border rounded"
        />
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value as "admin" | "student")}
          className="w-full p-2 border rounded"
        >
          <option value="student">Aluno</option>
          <option value="admin">Administrador</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gran-dark text-white p-2 rounded hover:bg-gran-bright transition cursor-pointer"
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
}
