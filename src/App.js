import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import {About} from './pages/About';
import { Products } from "./pages/Products";
import Mui from "./pages/Mui";
import { Product } from "./pages/Product";
function App() {

 

  return (
    <div className="App">
      <Header/>
     <Routes>
    
      <Route path="/" element = {<Home/>}/>
      <Route path="/about" element = {<About/>}/>
      <Route path="/products" element = {<Products/>}/>
      <Route path="/product/:id" element = {<Product />}/>
      <Route path="/mui" element = {<Mui/>}/>
     </Routes>
    </div>
  );
}

export default App;
