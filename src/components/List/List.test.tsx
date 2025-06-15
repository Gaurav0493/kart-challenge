import React from "react";
import { render, screen } from "@testing-library/react";
import List from "./List";
import { ProductType, CartItems } from "../../common/types";


type ListCompProps = {
  product: ProductType;
  addItemToCart: (arg: ProductType) => void;
  cartItems: CartItems[];
  removeItemFromCart: (id: number) => void;
};

// Mock ListItem component
jest.mock("../ListItem/index", () => (props: ListCompProps) => (
  <div data-testid="list-item">{props.product.name}</div>
));

const mockProducts: ProductType[] = [
  {
    id: 1,
    name: "Chocolate Cake",
    price: 10,
    description: "Delicious chocolate cake",
    category: "Dessert",
    image: {
      thumbnail: "chocolate-cake.jpg",
      tablet: "chocolate-cake.jpg",
      desktop: "chocolate-cake.jpg",
      mobile: "chocolate-cake.jpg",
    },
  },
  {
    id: 2,
    name: "Ice Cream",
    price: 5,
    description: "Vanilla ice cream",
    category: "Dessert",
    image: {
      thumbnail: "ice-cream.jpg",
      tablet: "ice-cream.jpg",
      desktop: "ice-cream.jpg",
      mobile: "ice-cream.jpg",
    },
  },
];

const mockCartItems: CartItems[] = [
  {
    id: 1,
    name: "Chocolate Cake",
    price: 10,
    perItemPrice: 10,
    totalPrice: 20,
    quantity: 2,
    cartImage: "chocolate-cake.jpg",
  },
  {
    id: 2,
    name: "Ice Cream",
    price: 5,
    perItemPrice: 5,
    totalPrice: 10,
    quantity: 2,
    cartImage: "ice-cream.jpg",
  },
];

const mockAddItemToCart = jest.fn();
const mockRemoveItemFromCart = jest.fn();

describe("List component", () => {
  it('renders "No Desserts for you" when products is empty', () => {
    render(
      <List
        products={[]}
        addItemToCart={mockAddItemToCart}
        removeItemFromCart={mockRemoveItemFromCart}
        cartItems={mockCartItems}
      />
    );
    expect(screen.getByText("No Desserts for you")).toBeInTheDocument();
  });

  it('renders "No Desserts for you" when products is undefined', () => {
    render(
      <List
        products={undefined}
        addItemToCart={mockAddItemToCart}
        removeItemFromCart={mockRemoveItemFromCart}
        cartItems={mockCartItems}
      />
    );
    expect(screen.getByText("No Desserts for you")).toBeInTheDocument();
  });

  it("renders a ListItem for each product", () => {
    render(
      <List
        products={mockProducts}
        addItemToCart={mockAddItemToCart}
        removeItemFromCart={mockRemoveItemFromCart}
        cartItems={mockCartItems}
      />
    );
    const items = screen.getAllByTestId("list-item");
    expect(items).toHaveLength(mockProducts.length);
    expect(items[0]).toHaveTextContent("Chocolate Cake");
    expect(items[1]).toHaveTextContent("Ice Cream");
  });

  it("renders the list container", () => {
    render(
      <List
        products={mockProducts}
        addItemToCart={mockAddItemToCart}
        removeItemFromCart={mockRemoveItemFromCart}
        cartItems={mockCartItems}
      />
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
