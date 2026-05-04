import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Use createRoot with concurrent mode already active
// Defer to after browser paint for smoother initial load
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
