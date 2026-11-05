import { Outlet } from "react-router";
import Cabecalho from "./components/Cabecalho";
import Footer from "./components/Footer";

function App() {
  
  return (
    <>
    <Cabecalho/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
