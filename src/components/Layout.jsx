import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import LeftBar from "./LeftBar";
import "./layout.css";

function Layout() {
  return (
    <div className="whatsapp-layout">

      <LeftBar />

      <Sidebar />

      <div className="chat-area">
        <Outlet />
      </div>

    </div>
  );
}

export default Layout;