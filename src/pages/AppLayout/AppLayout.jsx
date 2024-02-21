import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.appLayout}>
      <Sidebar />
      <main className={styles.main}>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
