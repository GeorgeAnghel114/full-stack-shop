import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Clothes from './pages/Clothes';
import Sneakers from './pages/Sneakers';
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/Order";
import { ToastContainer, toast} from 'react-toastify';
import { useState } from "react";


function App() {
    const [name,setName] = useState();
    // console.log(name);
    return (
        <Layout>
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
        />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/admin' element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/sneakers" element={<Sneakers />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/clothes" element={<Clothes />} />
                <Route path="/order" element={<Order />} />
            </Routes>
        </Layout>
    );
}

export default App;
