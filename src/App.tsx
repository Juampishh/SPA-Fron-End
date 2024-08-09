import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import "./index.css";
import Container from "./container";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { useLogin } from "./Hooks/Login";

function App() {
  const {user} = useLogin();
  


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes canAccess={true} redirectPath ="login" />}>
            <Route path="/home" element={<Container />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
