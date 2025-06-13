import React, { useState } from 'react'
import useFetchProducts from './hooks/useFetchProducts/useFetchProducts';
import List from './components/List/List';
import EmptyCart from './components/Cart/EmptyCart';
import CartDetail from './components/Cart/CartDetail';
import { ProductType, CartItems } from './common/types';
import './App.css';

function App() {

  const { products, loading, error } = useFetchProducts();

  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  const removeItemFromCart = (productId: number) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === productId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1, totalPrice: item.totalPrice - item.perItemPrice };
        } else {
          return null;
        }
      }
      return item;
    }).filter(item => item !== null); // Filter out null items

    setCartItems(updatedCartItems as CartItems[]);
  }

  const addItemToCart = (product: ProductType) => {
    const existingItem = cartItems.find(item => item?.id === product.id);

    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + item.price } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1, perItemPrice: product.price, totalPrice: product.price, cartImage: product.image.thumbnail }]);
    }
  }


  if(loading) {
    return <div className='loading-container' >Loading...</div>;
  }

  if(error) {
    return <div>Error fetching products.</div>;
  }

  console.log(products);

  return (
    <div className='app-container'>
      <div className='app-list-container'>
        <h1 className='app-header'>Desserts</h1>
        <List products={products} addItemToCart={addItemToCart} cartItems={cartItems} removeItemFromCart={removeItemFromCart}  />
      </div>
      { cartItems.length === 0 ? <EmptyCart/> : <CartDetail cartItems={cartItems} removeItemFromCart={removeItemFromCart} />}
    </div>
  )
}

export default App
