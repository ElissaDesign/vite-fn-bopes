import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AppComponents } from "./routes/index";

function App() {
  return (
    <Provider store={store}>
      <AppComponents />
      <ToastContainer />
    </Provider>
  );
}

export default App;
