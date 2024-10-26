"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../lib/definitions";

interface ProductFormProps {
  initialProduct?: Product;
  onSubmit: (product: Product) => void; // onSubmit should be a function
}

const ProductForm = ({ initialProduct, onSubmit }: ProductFormProps) => {
  const [title, setTitle] = useState(initialProduct?.title || "");
  const [description, setDescription] = useState(
    initialProduct?.description || ""
  );
  const [price, setPrice] = useState(initialProduct?.price.toString() || "");
  const [imageURL, setImageURL] = useState(initialProduct?.image || "");
  const [category, setCategory] = useState<string[]>(
    initialProduct?.category || []
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setTitle(initialProduct.title);
      setDescription(initialProduct.description);
      setPrice(initialProduct.price.toString());
      setImageURL(initialProduct.image);
      setCategory(initialProduct.category);
    }
  }, [initialProduct]);

  useEffect(() => {
    if (imageFile) {
      const uploadImage = async () => {
        setIsUploading(true);
        try {
          const reader = new FileReader();
          reader.readAsDataURL(imageFile);
          reader.onloadend = async () => {
            try {
              const response = await axios.post("/api/upload", {
                file: reader.result,
              });
              const imageUrl = response.data.url;
              setImageURL(imageUrl);
            } catch (error) {
              console.error("Error uploading image:", error);
            }
          };
        } catch (error) {
          console.error("Error processing file:", error);
        } finally {
          setIsUploading(false);
        }
      };

      uploadImage();
    }
  }, [imageFile]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters long.";
    }

    if (description.trim().length < 10) {
      newErrors.description =
        "Description must be at least 10 characters long.";
    }

    if (parseFloat(price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    if (imageURL.trim() === "") {
      newErrors.image = "Image URL is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (typeof onSubmit === "function") {
      // Check if onSubmit is a function
      onSubmit({
        ...initialProduct!,
        title,
        description,
        price: parseFloat(price),
        image: imageURL,
        category,
      });
    } else {
      console.error("onSubmit prop is not a function");
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setCategory(selectedOptions);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
        color: "black",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Description:
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
            border: "1px solid #ccc",
            borderRadius: "4px",
            height: "100px",
          }}
        />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description}</p>
        )}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        {imageURL && (
          <img
            src={imageURL}
            alt="Preview"
            style={{ marginTop: "10px", maxWidth: "100%", height: "auto" }}
          />
        )}
        {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Category:
        </label>
        <select
          multiple
          value={category}
          onChange={handleCategoryChange}
          style={{
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
            border: "1px solid #ccc",
            borderRadius: "4px",
            height: "100px",
          }}
        >
          <option value="pottery">Pottery</option>
          <option value="macrame">Macrame</option>
          <option value="knitting">Knitting</option>
          <option value="embroidery">Embroidery</option>
          <option value="painting">Painting</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={isUploading}
        style={{
          width: "100%",
          padding: "10px",
          border: "none",
          borderRadius: "4px",
          backgroundColor: isUploading ? "#ccc" : "#007bff",
          color: "#fff",
          fontSize: "16px",
          cursor: isUploading ? "not-allowed" : "pointer",
        }}
      >
        {isUploading ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
};

export default ProductForm;