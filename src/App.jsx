import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AppComponents } from "./routes/index";

function App() {
  return (
    <>
      <ToastContainer />
      <AppComponents />
    </>
  );
}

export default App;
