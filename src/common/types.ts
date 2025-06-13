export type ProductType  = {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    image: imageType
}

export type imageType  = {
    thumbnail: string,
    mobile: string;
    tablet: string;
    desktop: string;
}

export type ListProps = {
    name: string;
    price: number;
    category: string;
    image: imageType;
    id: string
}

export type CartItems = {
    id: number;
    name: string;
    quantity: number;
    price: number;
    perItemPrice: number;
    totalPrice: number;
    cartImage: string
}

export type CartDetailProps = {
    cartItems: CartItems[];
    removeItemFromCart: (id: number) => void;
}