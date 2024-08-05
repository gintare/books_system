import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
// import UserContext from "./Context/UserContext/UserContext";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { CategoriesProvider } from "./Context/CategoriesContext/CategoriesContext";
import AddbookPage from "./pages/AddbookPage/AddbookPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import BooksPage from "./pages/BooksPage/BooksPage";
import BookDetalesPage from "./pages/BookDetalesPage/BookDetalesPage";
import { BooksProvider } from "./Context/BooksContext/BooksContext";
import { UserProvider } from "./Context/UserContext/UserContext";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(0);

  return (
    <>
      <ToastContainer autoClose={5000} position="top-center" />
      <BooksProvider>
        <CategoriesProvider>
          <Header />

          <UserProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/register" />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route
                path="/categories"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <CategoriesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/addbook"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AddbookPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/book/:id" element={<BookDetalesPage />} />
            </Routes>
          </UserProvider>
        </CategoriesProvider>
      </BooksProvider>
      <Footer />
    </>
  );
}

export default App;
