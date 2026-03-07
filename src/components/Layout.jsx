import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import LeftBar from "./LeftBar";
import "./layout.css";

function Layout() {
  const location = useLocation();
  const isChatRoute = location.pathname.startsWith("/chat/");

  return (
    <div className={`whatsapp-layout ${isChatRoute ? "chat-open" : ""}`}>
      <LeftBar />
      <Sidebar />
      <div className="chat-area">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;