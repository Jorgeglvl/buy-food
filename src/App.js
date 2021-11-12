import { useState } from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './context/CartProvider';

function App() {
  const [showingCart, setShowingCart] = useState(false);

  const showCartHandler = (value) => {
    setShowingCart(value);
  }

  return (<CartProvider >
    {showingCart && <Cart onCloseCart={showCartHandler}/>}
    <Header onShowCart={showCartHandler}/>
    <main>
      <Meals/>
    </main>
  </CartProvider>
  );
}

export default App;
