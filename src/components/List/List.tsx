import React from 'react'
import { CartItems, ProductType } from '../../common/types';
import ListItem from '../ListItem/index';
import './List.css';

type ListProps = {
  cartItems: CartItems[];
  removeItemFromCart: (id: number) => void;
  products: ProductType[]; 
  addItemToCart: (arg: ProductType)=> void
}

export default function List({products, addItemToCart, removeItemFromCart, cartItems} : ListProps) {

  if (!products || products.length === 0) {
    return <div > No Desserts for you</div>;
  }
  return (


    <div className='list-container'>
    {products.map((product : ProductType, index) => (
        <ListItem
          key={product.id+index}
          product={product}
          addItemToCart={addItemToCart}
          cartItems={cartItems}
          removeItemFromCart={removeItemFromCart}
        />
    ))}
    </div>
  )
}
