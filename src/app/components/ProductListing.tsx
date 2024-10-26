"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../styles/ProductListing.module.css";
import { Product } from "../lib/definitions";
import { deleteProduct } from "../lib/data";

export default function ProductList({
  fetchedproducts,
}: {
  fetchedproducts: Product[]; 
}) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(fetchedproducts);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("");
  const [loadMoreCount, setLoadMoreCount] = useState<number>(10);

  // State for dynamic filter options
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<{
    min: number;
    max: number;
  } | null>(null);

  // Effect to initialize categories and price ranges based on fetched products
  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category))
    );
    setCategories(uniqueCategories);

    const prices = products.map((p) => p.price);
    if (prices.length > 0) {
      setPriceRanges({
        min: Math.min(...prices),
        max: Math.max(...prices),
      });
    }
  }, [products]);

  // Filter and sort products whenever relevant state changes
  useEffect(() => {
    let filteredProducts = [...products];

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }

    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    // Sort products
    if (sortBy) {
      if (sortBy === "price-asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else if (sortBy === "newest") {
        filteredProducts.sort(
          // eslint-disable-next-line
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      }
    }

    // Set displayed products based on current loadMoreCount
    setDisplayedProducts(filteredProducts.slice(0, loadMoreCount));
  }, [category, priceRange, sortBy, products, loadMoreCount]);

  const handleClearAll = () => {
    setSortBy("");
    setCategory("");
    setPriceRange("");
    setDisplayedProducts(products.slice(0, loadMoreCount));
  };

  const handleAddProduct = () => {
    router.push("/addProduct");
  };

  const handleLoadMore = () => {
    setLoadMoreCount((prevCount) => prevCount + 10);
  };

  const handleEdit = (productId: number) => {
    router.push(`/editProduct/${productId}`);
    console.log(`Edit product with id: ${productId}`);
  };

  const handleDelete = async (productId: number) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product.id !== productId));
      console.log(`Deleted product with id: ${productId}`);
    } catch (error) {
      console.error("An error occurred while deleting the product:", error);
    }
  };

  if (!fetchedproducts || fetchedproducts.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className={styles.productPage}>
      <aside className={styles.controlPanel}>
        <h3>Filter & Sort</h3>
        <div className={styles.filterSection}>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filterSection}>
          <h4>Price</h4>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">All</option>
            {priceRanges && (
              <>
                <option value={`${priceRanges.min}-${priceRanges.max}`}>
                  ${priceRanges.min} - ${priceRanges.max}
                </option>
                <option value={`0-${priceRanges.max}`}>
                  $0 - ${priceRanges.max}
                </option>
                <option value={`${priceRanges.min}-${priceRanges.max}`}>
                  ${priceRanges.min} - ${priceRanges.max}
                </option>
                <option value={`${priceRanges.max}-`}>
                  ${priceRanges.max} and above
                </option>
              </>
            )}
          </select>
        </div>
        <div className={styles.sortSection}>
          <h4>Sort by</h4>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Select</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        <button onClick={handleClearAll}>Clear All</button>
        <button onClick={handleAddProduct}>Add Product</button>
      </aside>
      <div className={styles.productListing}>
        <div className={styles.products}>
          {displayedProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={200}
                className={styles.productImage}
              />
              <h3 className={styles.productTitle}>{product.title}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.productPrice}>${product.price}</p>
              <div className={styles.productActions}>
                <button
                  className={styles.buttonEditDelete}
                  onClick={() => handleEdit(product.id)}
                >
                  Edit
                </button>
                <button
                  className={styles.buttonEditDelete}
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {displayedProducts.length < products.length && (
          <button className={styles.loadMore} onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}