import React from "react";
import { render, screen } from "@testing-library/react";
import EmptyCart from "./EmptyCart";

describe("EmptyCart", () => {

    it("renders the cart title with (0)", () => {
        render(<EmptyCart />);
        expect(screen.getByText(/Your Cart \(0\)/i)).toBeInTheDocument();
    });

    it("renders the illustration SVG", () => {
        render(<EmptyCart />);
        // Find the svg by role or by its attributes
        const svg = screen.getByTestId("empty-cart-svg") || screen.getByRole("img", { hidden: true }) || document.querySelector("svg");
        expect(svg).toBeInTheDocument();
    });

    it("renders the message about added items", () => {
        render(<EmptyCart />);
        expect(screen.getByText(/Your added items will appear here/i)).toBeInTheDocument();
    });

    it("has the correct class names for structure", () => {
        render(<EmptyCart />);
        expect(document.querySelector(".cart-container")).toBeInTheDocument();
        expect(document.querySelector(".cart-header")).toBeInTheDocument();
        expect(document.querySelector(".cart-title")).toBeInTheDocument();
        expect(document.querySelector(".cart-content")).toBeInTheDocument();
        expect(document.querySelector(".cart-illustration")).toBeInTheDocument();
        expect(document.querySelector(".cart-message")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
        const { container } = render(<EmptyCart />);
        expect(container).toMatchSnapshot();
    });
});