# Shopify Cart API - Frontend Integration Guide

## Important: URL Encoding Cart IDs

Shopify cart IDs contain special characters (`://`, `?`, `=`) that **must be URL encoded** when used in URLs.

### ✅ Always use `encodeURIComponent()` when constructing URLs with cart IDs

## Example Cart ID from Shopify:
```
gid://shopify/Cart/hWN3eNae9Jbu85fx0BtfDEaB?key=625666c6aeb2eb014c38d1938ac743f9
```

---

## Frontend Usage Examples

### 1. Creating a Cart
```javascript
const response = await fetch('/api/cart', {
  method: 'POST'
});
const { cart } = await response.json();

// Store cart ID in localStorage
localStorage.setItem('cartId', cart.id);
```

### 2. Adding Item to Cart
```javascript
const cartId = localStorage.getItem('cartId');

const response = await fetch(`/api/cart/${encodeURIComponent(cartId)}/items`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    merchandiseId: 'gid://shopify/ProductVariant/123456789',
    quantity: 1
  })
});

const { cart } = await response.json();
```

### 3. Viewing Cart
```javascript
const cartId = localStorage.getItem('cartId');

const response = await fetch(`/api/cart/${encodeURIComponent(cartId)}`);
const { cart } = await response.json();
```

### 4. Updating Item Quantity
```javascript
const cartId = localStorage.getItem('cartId');

const response = await fetch(`/api/cart/${encodeURIComponent(cartId)}/items`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    lineId: 'gid://shopify/CartLine/123456789',
    quantity: 3
  })
});

const { cart } = await response.json();
```

### 5. Getting Checkout URL
```javascript
const cartId = localStorage.getItem('cartId');

const response = await fetch(`/api/cart/${encodeURIComponent(cartId)}/checkout`);
const { checkoutUrl } = await response.json();

// Redirect user to Shopify checkout
window.location.href = checkoutUrl;
```

### 6. Using in Next.js Links
```jsx
import Link from 'next/link';

const cartId = localStorage.getItem('cartId');

<Link href={`/cart/${encodeURIComponent(cartId)}`}>
  View Cart
</Link>
```

### 7. Using with Next.js Router
```javascript
import { useRouter } from 'next/navigation';

const router = useRouter();
const cartId = localStorage.getItem('cartId');

router.push(`/cart/${encodeURIComponent(cartId)}`);
```

---

## Key Rules

### ✅ DO encode:
- When constructing URLs with `fetch()`
- When using Next.js `<Link>` components
- When using `router.push()` or `router.replace()`
- When testing in Postman/Hoppscotch

### ❌ DON'T encode:
- When storing in localStorage/state
- When passing in request body (JSON)
- Inside API route handlers (Next.js auto-decodes)

---

## API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cart` | Create new cart |
| GET | `/api/cart/[cartId]` | Get cart details |
| POST | `/api/cart/[cartId]/items` | Add item to cart |
| PATCH | `/api/cart/[cartId]/items` | Update item quantity |
| GET | `/api/cart/[cartId]/checkout` | Get checkout URL |
| GET | `/api/products` | Get all products |
| GET | `/api/products/[handle]` | Get single product |

---

## Complete Shopping Flow Example

```javascript
// 1. Get products
const productsRes = await fetch('/api/products');
const { products } = await productsRes.json();

// 2. Create cart (if not exists)
let cartId = localStorage.getItem('cartId');
if (!cartId) {
  const cartRes = await fetch('/api/cart', { method: 'POST' });
  const { cart } = await cartRes.json();
  cartId = cart.id;
  localStorage.setItem('cartId', cartId);
}

// 3. Add product to cart
await fetch(`/api/cart/${encodeURIComponent(cartId)}/items`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    merchandiseId: products[0].node.id, // First product variant ID
    quantity: 1
  })
});

// 4. View cart
const cartRes = await fetch(`/api/cart/${encodeURIComponent(cartId)}`);
const { cart } = await cartRes.json();
console.log('Cart items:', cart.lines.edges);

// 5. Checkout
const checkoutRes = await fetch(`/api/cart/${encodeURIComponent(cartId)}/checkout`);
const { checkoutUrl } = await checkoutRes.json();
window.location.href = checkoutUrl; // Redirect to Shopify checkout
```

---

## TypeScript Type Safety

This project uses proper TypeScript types for all Shopify API interactions to ensure type safety and better developer experience.

### Type Definitions

All Shopify-related types are defined in `src/types/shopify.ts`:

- **Data Models**: `Cart`, `Product`, `ProductVariant`, `CartLine`, `Money`, `Cost`
- **GraphQL Responses**: `CartCreateResponse`, `CartQueryResponse`, `CartLinesAddResponse`, `CartLinesUpdateResponse`, `ProductsQueryResponse`, `ProductQueryResponse`
- **Wrapper Types**: `ShopifyResponse<T>` for all GraphQL responses

### Usage in API Routes

All API route handlers use typed responses:

```typescript
import { shopifyFetch } from "@/lib/shopify/storefront";
import { CartCreateResponse } from "@/types/shopify";

export async function POST() {
  try {
    const data = await shopifyFetch<CartCreateResponse>(CREATE_CART_QUERY);
    const cart = data.data?.cartCreate?.cart;

    if (!cart) {
      return NextResponse.json({ error: "Failed to create cart" }, { status: 500 });
    }

    return NextResponse.json({ cart });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```

### Key TypeScript Practices

1. **No `any` types**: All Shopify API responses use proper typed interfaces
2. **Type-safe error handling**: Errors are checked with `instanceof Error` before accessing `.message`
3. **Generic type parameters**: `shopifyFetch<T>()` uses generics for type inference
4. **ESLint compliance**: The only `eslint-disable` comments are for error handling, which is unavoidable

### Benefits

- **Autocomplete**: Full IDE support for all Shopify response fields
- **Type checking**: Catches errors at compile time instead of runtime
- **Documentation**: Types serve as inline documentation for API responses
- **Refactoring**: Safe renames and changes with TypeScript's refactoring tools

---

## Environment Variables Required

Create `.env.local` file:
```
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_API_TOKEN=your-storefront-access-token
```
