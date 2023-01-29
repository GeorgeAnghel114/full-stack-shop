import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({name,children}) {
    return (
        <>
            <Navbar name={name}/>
            {children}
            <Footer />
        </>
    );
}

export default Layout;
