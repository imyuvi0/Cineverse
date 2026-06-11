import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import Owner from "./pages/Owner";
import Profile from "./pages/Profile";

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/movies"
          element={<Movies />}
        />

        <Route
          path="/booking"
          element={<Booking />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/owner"
          element={<Owner />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;