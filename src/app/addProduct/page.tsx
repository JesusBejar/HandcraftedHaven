"use client";

import { useRouter } from "next/navigation";
import ProductForm from "../components/ProductForm";
import { Product } from "../lib/definitions";
import { addProduct } from "../lib/data"; // Import the addProduct function

const AddProductPage = () => {
  const router = useRouter();

  const handleSubmit = async (product: Product) => {
    console.log(product);
    try {
      // Call addProduct to add the new product to the database
      const addedProduct = await addProduct(product);
      console.log("Product added:", addedProduct);

      // Redirect to the product listing page or another relevant page
      router.push("/product-listing");
    } catch (error) {
      console.error("Error adding product:", error);
      // Handle the error, e.g., show a notification to the user
    }
  };

  return (
    <div>
      <h1 style={{ color: "black", padding: "10px" }}>Add New Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProductPage;