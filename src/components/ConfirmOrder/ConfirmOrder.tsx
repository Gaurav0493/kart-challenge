import React from "react";
import { CartItems } from "../../common/types";
export default function ConfirmOrder({
  cartItems,
}: {
  cartItems: CartItems[];
}) {
  const handleStartNewOrder = () => {
    window.location.reload();
  };
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.totalPrice * item.quantity;
  }, 0);

  return (
    <>
      <div className="order-summary">
        {cartItems.map((item) => (
          <div key={item.id} className="modal-item">
            <img src={item?.cartImage} alt={item.name} className="item-image" />
            <div className="modal-item-details">
              <div className="modal-item-name">{item.name}</div>
              <div className="modal-item-quantity-price">
                <span className="modal-quantity">{item.quantity}x</span>
                <span className="modal-unit-price">
                  @ ${item?.perItemPrice?.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="modal-item-total">
              ${item?.totalPrice?.toFixed(2)}
            </div>
          </div>
        ))}

        <div className="modal-order-total">
          <span className="modal-total-label">Order Total</span>
          <span className="modal-total-price">${totalPrice?.toFixed(2)}</span>
        </div>
      </div>

      <button className="start-new-order-button" onClick={handleStartNewOrder}>
        Start New Order
      </button>
    </>
  );
}
