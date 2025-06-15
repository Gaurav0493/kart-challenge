import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ConfirmOrder from "./ConfirmOrder";

const mockCartItems = [
    {
        id: 1,
        name: "Item 1",
        quantity: 2,
        price: 10, // Added price property
        perItemPrice: 10,
        totalPrice: 20,
        cartImage: "item1.jpg",
    },
    {
        id: 2,
        name: "Item 2",
        quantity: 1,
        price: 15, // Added price property
        perItemPrice: 15,
        totalPrice: 15,
        cartImage: "item2.jpg",
    },
];

describe("ConfirmOrder Component", () => {
    it("renders cart items correctly", () => {
        render(<ConfirmOrder cartItems={mockCartItems} />);

        mockCartItems.forEach((item) => {
            expect(screen.getByText(item.name)).toBeInTheDocument();
            expect(screen.getByText(`${item.quantity}x`)).toBeInTheDocument();
            expect(
                screen.getByText(`@ $${item.perItemPrice.toFixed(2)}`)
            ).toBeInTheDocument();
            expect(
                screen.getByText(`$${item.totalPrice.toFixed(2)}`)
            ).toBeInTheDocument();
        });
    });

    it("calculates and displays the total price correctly", () => {
        render(<ConfirmOrder cartItems={mockCartItems} />);

        const totalPrice = mockCartItems.reduce(
            (total, item) => total + item.totalPrice * item.quantity,
            0
        );

        expect(
            screen.getByText(`$${totalPrice.toFixed(2)}`)
        ).toBeInTheDocument();
    });

    it("reloads the page when 'Start New Order' button is clicked", () => {
        const reloadMock = jest.spyOn(window.location, "reload").mockImplementation(() => {});
        render(<ConfirmOrder cartItems={mockCartItems} />);

        const button = screen.getByText("Start New Order");
        fireEvent.click(button);

        expect(reloadMock).toHaveBeenCalled();
        reloadMock.mockRestore();
    });
});