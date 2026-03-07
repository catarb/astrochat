import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Favorites from "./pages/Favorites";
import Objects from "./pages/Objects";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="chat/:id" element={<Chat />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="objects" element={<Objects />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;