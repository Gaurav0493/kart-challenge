import React from "react";
import { CartItems, ProductType } from "../../common/types";
import "./ListItem.css";

type ListProps = {
  product: ProductType;
  addItemToCart: (arg: ProductType) => void;
  cartItems: CartItems[];
  removeItemFromCart: (id: number) => void;
};

const ListItem: React.FC<ListProps> = ({
  product,
  addItemToCart,
  removeItemFromCart,
  cartItems,
}) => {
  const countByProductIdInCartItems = (productId: number) => {
    const item = cartItems?.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isProductInCart = (productId: number) => {
    return cartItems?.some((item) => item.id === productId);
  };

  const { name, price, image, category } = product;

  const CartIcon = () => (
    <svg className="cart-icon" viewBox="0 0 24 24" fill="#C73B0E">
      <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );

  return (
    <div className="list-item">
      <div className="image-container">
        <img
          src={image.thumbnail}
          alt="Waffle with Berries"
          className="image"
        />
      </div>

      {isProductInCart(product.id) ? (
        <>
          {/* Quantity Controls (shown when in cart) */}
          <div className={`cart-controls visible `}>
            <button
              className="cart-control-btn visible"
              onClick={() => removeItemFromCart(product.id)}
            >
              -
            </button>
            <span className="quantity-display">
              {countByProductIdInCartItems(product.id)}
            </span>
            <button
              className="cart-control-btn"
              onClick={() => addItemToCart(product)}
            >
              +
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="add-to-cart-button-conatiner"  onClick={() => addItemToCart(product)}>
            {/* Add to Cart Button */}
            <button className="add-to-cart-button">
              <CartIcon /> <span>Add to cart</span>
            </button>

            {/* Product Info */}
            
          </div>
        </>
      )}
      <div className="product-info">
        <p className="category">{category}</p>
        <p className="title">{name}</p>
        <p className="price">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ListItem;
