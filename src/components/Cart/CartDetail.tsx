import React from "react";
import { CartDetailProps } from "../../common/types";
import "./CartDetail.css";
import Modal from "../Modal/Modal";
import ConfirmOrder from "../ConfirmOrder/ConfirmOrder";

export default function CartDetail({
  cartItems,
  removeItemFromCart,
}: CartDetailProps) {
  const calculateTotalCartValue = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const [showConfirmation, setShowConfirmation] = React.useState(false);

  return (
    <div className="cart-details-container" >
      <h2 className="cart-header">Your Cart ({cartItems.length})</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">Your cart is empty</div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-details">
                <div className="item-name">{item.name}</div>
                <div className="item-quantity-price">
                  <span className="quantity">{item.quantity}x</span>
                  <div className="price-info">
                    <span className="original-price">
                      @${item.perItemPrice.toFixed(2)}
                    </span>
                    <span className="current-price">
                      ${item.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="remove-button"
                onClick={() => removeItemFromCart(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                x
              </button>
            </div>
          ))}

          <div className="order-total">
            <span className="total-label">Order Total</span>
            <span className="total-price">${calculateTotalCartValue()}</span>
          </div>

          <div className="carbon-neutral">
            <svg
              className="carbon-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
            </svg>
            This is a carbon-neutral delivery
          </div>

          <button
            className="confirm-button"
            onClick={() => setShowConfirmation(!showConfirmation)}
          >
            Confirm Order
          </button>
        </>
      )}

      {showConfirmation ? (
        <Modal toggleModal={setShowConfirmation}>
          <ConfirmOrder cartItems={cartItems} />
        </Modal>
      ) : null}
    </div>
  );
}
