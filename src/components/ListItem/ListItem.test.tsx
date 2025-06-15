import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import ListItem from "./ListItem";
import { CartItems, ProductType } from "../../common/types";

const mockProduct: ProductType = {
    id: 1,
    name: "Test Product",
    price: 19.99,
    description: "A test product description.",
    image: {
        thumbnail: "test-thumbnail.jpg",
        mobile: "test-mobile.jpg",
        tablet: "test-tablet.jpg",
        desktop: "test-desktop.jpg"
    },
    category: "Snacks",
};

const mockCartItems: CartItems[] = [
    {
        id: 1,
        name: "Test Product",
        price: 19.99,
        perItemPrice: 19.99,
        totalPrice: 39.98,
        quantity: 2,
        cartImage: "test-thumbnail.jpg"
    },
];

describe("ListItem", () => {
    it("renders product info correctly", () => {
        render(
            <ListItem
                product={mockProduct}
                addItemToCart={jest.fn()}
                removeItemFromCart={jest.fn()}
                cartItems={[]}
            />
        );
        expect(screen.getByText("Test Product")).toBeInTheDocument();
        expect(screen.getByText("Snacks")).toBeInTheDocument();
        expect(screen.getByText("$19.99")).toBeInTheDocument();
        expect(screen.getByAltText("Waffle with Berries")).toHaveAttribute("src", "test-thumbnail.jpg");
    });

    it("shows Add to cart button when product is not in cart", () => {
        render(
            <ListItem
                product={mockProduct}
                addItemToCart={jest.fn()}
                removeItemFromCart={jest.fn()}
                cartItems={[]}
            />
        );
        expect(screen.getByText("Add to cart")).toBeInTheDocument();
        expect(screen.queryByText("-")).not.toBeInTheDocument();
        expect(screen.queryByText("+")).not.toBeInTheDocument();
    });

    it("calls addItemToCart when Add to cart button is clicked", () => {
        const addItemToCart = jest.fn();
        render(
            <ListItem
                product={mockProduct}
                addItemToCart={addItemToCart}
                removeItemFromCart={jest.fn()}
                cartItems={[]}
            />
        );
        fireEvent.click(screen.getByText("Add to cart"));
        expect(addItemToCart).toHaveBeenCalledWith(mockProduct);
    });

    it("shows quantity controls when product is in cart", () => {
        render(
            <ListItem
                product={mockProduct}
                addItemToCart={jest.fn()}
                removeItemFromCart={jest.fn()}
                cartItems={mockCartItems}
            />
        );
        expect(screen.getByText("-")).toBeInTheDocument();
        expect(screen.getByText("+")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.queryByText("Add to cart")).not.toBeInTheDocument();
    });

    it("calls removeItemFromCart when - button is clicked", () => {
        const removeItemFromCart = jest.fn();
        render(
            <ListItem
                product={mockProduct}
                addItemToCart={jest.fn()}
                removeItemFromCart={removeItemFromCart}
                cartItems={mockCartItems}
            />
        );
        fireEvent.click(screen.getByText("-"));
        expect(removeItemFromCart).toHaveBeenCalledWith(mockProduct.id);
    });

    it("calls addItemToCart when + button is clicked", () => {
        const addItemToCart = jest.fn();
        render(
            <ListItem
                product={mockProduct}
                addItemToCart={addItemToCart}
                removeItemFromCart={jest.fn()}
                cartItems={mockCartItems}
            />
        );
        fireEvent.click(screen.getByText("+"));
        expect(addItemToCart).toHaveBeenCalledWith(mockProduct);
    });
});