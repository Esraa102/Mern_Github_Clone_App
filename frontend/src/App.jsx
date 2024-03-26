import { Routes, Route } from "react-router-dom";
import { Home, Register, Login, Explore, LikesPage } from "./pages";
import { Sidebar } from "./components";
import { Toaster } from "react-hot-toast";
import { UseAuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const { user, isLoading } = UseAuthContext();
  if (isLoading) return null;
  return (
    <div className="text-white h-screen">
      <div className="flex gap-0 md:gap-8">
        <Sidebar />
        <div className="flex-1 overflow-hidden  h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to={"/"} />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to={"/"} />}
            />
            <Route
              path="/explore"
              element={user ? <Explore /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/likes"
              element={user ? <LikesPage /> : <Navigate to={"/login"} />}
            />
          </Routes>
          <Toaster />
        </div>
      </div>
    </div>
  );
}

export default App;
