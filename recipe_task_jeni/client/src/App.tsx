import Ingredient from "./ingredient";
import Reciepe from "./reciepies.tsx";
import Nav from "./navbar.tsx";
import MealsSummary from "../src/meals.tsx";
import Card from "./card.tsx";
import { useState } from 'react';
import { BrowserRouter, Routes,Route} from "react-router-dom";

function App() {
  const [cart, setCart] = useState(0);
  const [cartDetails, setCartDetails] = useState([]);

  const handleAddToCart = (recipe) => {
    setCart((prevCart) => prevCart + 0);
    setCartDetails((prevCartDetails) => [...prevCartDetails, recipe]);
  };

  return (
    <>
      {/* <Nav cart={cart} cartDetails={cartDetails} />
      <MealsSummary />
      <Card cart={cart} setCart={setCart} handleAddToCart={handleAddToCart} />
      <Ingredient />
      <Reciepe /> */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Nav cart={cart} cartDetails={cartDetails}/> <MealsSummary /> <Card cart={cart} setCart={setCart} handleAddToCart={handleAddToCart} /></>} />
        <Route path="/ingredient" element={<Ingredient/>}/>
        <Route path="/receipe" element={<Reciepe/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
