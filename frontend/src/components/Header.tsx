import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../store/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const userType = useSelector((state: RootState) => state.auth.userType);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userType");

    navigate("/login");
  };

  return (
    <header className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Solicitá
        </Link>

        <nav className="space-x-4">
          {!token && (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Registrar
              </Link>
            </>
          )}

          {token && userType === "student" && (
            <>
              <Link to="/my-solicitations" className="hover:underline">
                Minhas Solicitações
              </Link>
              <Link to="/create" className="hover:underline">
                Criar Solicitação
              </Link>
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          )}

          {token && userType === "admin" && (
            <>
              <Link to="/admin/solicitations" className="hover:underline">
                Solicitações de Alunos
              </Link>
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
