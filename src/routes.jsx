import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";

function ProtectedRoute({ redirectTo }) {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />

      <Route element={<ProtectedRoute redirectTo="/" />}>
        <Route path="/main" element={<Main />} />
      </Route>
    </Routes>
  )
}

export default MainRoutes;