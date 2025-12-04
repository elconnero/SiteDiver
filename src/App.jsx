//import { Features } from "tailwindcss";
import Navbar       from "./components/Navbar";
import Hero         from "./components/Hero";
import Features     from "./components/Features";
import Page_2       from "./components/Page_2";
import Page_3       from "./components/Page_3";
import Footer       from "./components/Footer";

function App() {
  return (
  <div className="min-h-screen bg-slate-950 text-slate overflow-hidden">

    <Navbar />
    <Hero />
    <Features />
    <Page_2 />
    <Page_3 />
    <Footer />
  </div>
  );
}

export default App
