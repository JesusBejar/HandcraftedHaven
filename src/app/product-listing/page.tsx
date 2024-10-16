import ProductList from "../components/ProductListing";
import FreeShippingText from "../components/header/FreeShippingText";
import { fetchProducts } from "../lib/data";

export default async function Page() {
  const products = await fetchProducts();
  return (
    <main>
      <FreeShippingText />
      <ProductList fetchedproducts={products} />
    </main>
  );
}