"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import { Product } from "../lib/definitions";
import { fetchProductById, updateProductById } from "../lib/data";

const EditProductPage = () => {
  const router = useRouter();
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      fetchProductById(productId)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setError("Failed to fetch product data.");
          setLoading(false);
        });
    }
  }, [productId]);

  const handleSubmit = async (updatedProduct: Product) => {
    try {
      // Handle form submission logic here
      console.log("Updated product:", updatedProduct);

      // Call updateProductById with the updatedProduct
      await updateProductById(updatedProduct);

      // Optionally handle successful update (e.g., show a success message, redirect, etc.)
      console.log("Product updated successfully.");

      router.push("/product-listing");
    } catch (error) {
      // Optionally handle error (e.g., show an error message to the user)
      console.error("Error updating product:", error);
    }
  };
  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Product</h1>
      <ProductForm initialProduct={product} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditProductPage;