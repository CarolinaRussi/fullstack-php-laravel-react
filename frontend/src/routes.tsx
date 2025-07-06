import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import MySolicitations from "./pages/MySolicitations";
import CreateSolicitation from "./pages/CreateSolicitation";
import AdminSolicitations from "./pages/AdminSolicitations";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/my-solicitations"
        element={
          <ProtectedRoute allowedUserTypes={["student"]}>
            <MySolicitations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedRoute allowedUserTypes={["student"]}>
            <CreateSolicitation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/solicitations"
        element={
          <ProtectedRoute allowedUserTypes={["admin"]}>
            <AdminSolicitations />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
