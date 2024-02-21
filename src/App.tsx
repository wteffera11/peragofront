import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import "./index.css";
import Roles from "./pages/Roles";
import NewRole from "./pages/NewRole";
import Layout from "./component/Layout";
import Role from "./pages/Role";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import store from "./state/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MantineProvider>
          <Layout>
            <Routes>
              <Route element={<Roles />} path="/" />
              <Route element={<Role />} path="/role/:id" />
              <Route element={<NewRole />} path="/new-role" />
            </Routes>
            <ToastContainer />
          </Layout>
        </MantineProvider>
      </Router>
    </Provider>
  );
}

export default App;
