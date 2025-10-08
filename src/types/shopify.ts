// Shopify Storefront API Type Definitions

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Cost {
  totalAmount: Money;
  subtotalAmount?: Money;
}

export interface Image {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description?: string;
  images?: {
    edges: Array<{
      node: Image;
    }>;
  };
  variants?: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
}

export interface ProductVariant {
  id: string;
  title: string;
  price?: {
    amount: string;
    currencyCode: string;
  };
  availableForSale?: boolean;
  product?: {
    id: string;
    title: string;
    handle: string;
    images?: {
      edges: Array<{
        node: Image;
      }>;
    };
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: ProductVariant;
  cost?: {
    totalAmount: Money;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: CartLine;
    }>;
  };
  cost: Cost;
}

// GraphQL Response Wrappers
export interface ShopifyResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
  }>;
}

export interface CartCreateResponse {
  cartCreate: {
    cart: Cart;
  };
}

export interface CartQueryResponse {
  cart: Cart;
}

export interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: Cart;
  };
}

export interface CartLinesUpdateResponse {
  cartLinesUpdate: {
    cart: Cart;
  };
}

export interface ProductsQueryResponse {
  products: {
    edges: Array<{
      node: Product;
    }>;
  };
}

export interface ProductQueryResponse {
  product: Product;
}
