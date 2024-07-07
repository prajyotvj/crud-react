import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import List from "./components/List";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostPage from "./components/PostPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="page-wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/add" element={<PostPage />} />
            <Route path="/update/:id" element={<PostPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default App;
