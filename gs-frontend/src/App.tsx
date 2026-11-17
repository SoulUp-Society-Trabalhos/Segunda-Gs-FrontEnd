import { Outlet } from "react-router";
import Cabecalho from "./components/Cabecalho";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <Cabecalho />
      <ScrollToTop /> 
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
