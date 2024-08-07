import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import "./index.css";
import Container from "./container";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes canAccess={true} />}>
            <Route path="/home" element={<Container />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
