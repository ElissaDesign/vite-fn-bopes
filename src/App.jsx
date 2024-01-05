import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AppComponents } from "./routes/index";

function App() {
  return (
    <main className="h-[100%] dark:bg-dark-frame-bg antialiased">
      <AppComponents />
      <ToastContainer />
    </main>
  );
}

export default App;
