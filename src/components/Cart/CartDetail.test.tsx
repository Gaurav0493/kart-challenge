import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartDetail from "./CartDetail";
import { CartItems } from "../../common/types";


jest.mock("../Modal/Modal", () => ({ children }: { toggleModal: (show: boolean) => void, children?: React.ReactNode }) => (
    <div data-testid="modal">{children}</div>
));
jest.mock("../ConfirmOrder/ConfirmOrder", () => ({ cartItems }: { cartItems: CartItems[];}) => (
    <div data-testid="confirm-order">ConfirmOrder: {cartItems.length} items</div>
));

const mockRemoveItemFromCart = jest.fn();

const cartItems = [
    {
        id: 1,
        name: "Apple",
        quantity: 2,
        price: 3,
        perItemPrice: 3,
        totalPrice: 6,
        cartImage: "apple.jpg",
    },
    {
        id: 2,
        name: "Banana",
        quantity: 1,
        price: 2,
        perItemPrice: 2,
        totalPrice: 2,
        cartImage: "banana.jpg",
    },
];

describe("CartDetail", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders empty cart message when cart is empty", () => {
        render(
            <CartDetail cartItems={[]} removeItemFromCart={mockRemoveItemFromCart} />
        );
        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
        expect(screen.getByText(/your cart \(0\)/i)).toBeInTheDocument();
    });

    it("renders cart items and order total", () => {
        render(
            <CartDetail cartItems={cartItems} removeItemFromCart={mockRemoveItemFromCart} />
        );
        expect(screen.getByText(/your cart \(2\)/i)).toBeInTheDocument();
        expect(screen.getByText("Apple")).toBeInTheDocument();
        expect(screen.getByText("Banana")).toBeInTheDocument();
        expect(screen.getByText("2x")).toBeInTheDocument();
        expect(screen.getByText("1x")).toBeInTheDocument();
        expect(screen.getAllByText(/\$6.00/)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/\$2.00/)[0]).toBeInTheDocument();
        expect(screen.getByText(/order total/i)).toBeInTheDocument();
        expect(screen.getByText("$8")).toBeInTheDocument();
        expect(screen.getByText(/carbon-neutral delivery/i)).toBeInTheDocument();
    });

    it("calls removeItemFromCart when remove button is clicked", () => {
        render(
            <CartDetail cartItems={cartItems} removeItemFromCart={mockRemoveItemFromCart} />
        );
        const removeButtons = screen.getAllByRole("button", { name: /remove/i });
        fireEvent.click(removeButtons[0]);
        expect(mockRemoveItemFromCart).toHaveBeenCalledWith(1);
    });


    it("shows confirmation modal when confirm order is clicked", () => {
        render(
            <CartDetail cartItems={cartItems} removeItemFromCart={mockRemoveItemFromCart} />
        );
        const confirmButton = screen.getByRole("button", { name: /confirm order/i });
        fireEvent.click(confirmButton);
        expect(screen.getByTestId("modal")).toBeInTheDocument();
        expect(screen.getByTestId("confirm-order")).toHaveTextContent("2 items");
    });

    it("toggles confirmation modal off when confirm order is clicked twice", () => {
        render(
            <CartDetail cartItems={cartItems} removeItemFromCart={mockRemoveItemFromCart} />
        );
        const confirmButton = screen.getByRole("button", { name: /confirm order/i });
        fireEvent.click(confirmButton);
        expect(screen.getByTestId("modal")).toBeInTheDocument();
        fireEvent.click(confirmButton);
        expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    });
});