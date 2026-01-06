import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div style={styles.wrapper}>
      <Sidebar />
      <div style={styles.main}>
        <Topbar />
        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    width: "100vw",        // ✅ FORCE FULL WIDTH
    minHeight: "100vh",
    overflowX: "hidden",   // ✅ PREVENT BLACK AREA
    background: "#f4f6f8"
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%"          // ✅ EXPAND CONTENT
  },
  content: {
    padding: 30,
    flex: 1
  }
};
