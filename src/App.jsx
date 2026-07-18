import { Navigate, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Favorites from "./pages/Favorites";
import Objects from "./pages/Objects";
import AdminAstros from "./pages/AdminAstros";
import AdminAstroCreate from "./pages/AdminAstroCreate";
import AdminAstroDetail from "./pages/AdminAstroDetail";
import AdminAstroEdit from "./pages/AdminAstroEdit";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <Routes>
      <Route path="/verify-email" element={<VerifyEmail />} />

      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="chat/:id" element={<Chat />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="objects" element={<Objects />} />
          <Route path="admin/astros" element={<AdminAstros />} />
          <Route path="admin/astros/new" element={<AdminAstroCreate />} />
          <Route
            path="admin/astros/:astroId/edit"
            element={<AdminAstroEdit />}
          />
          <Route
            path="admin/astros/:astroId"
            element={<AdminAstroDetail />}
          />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
