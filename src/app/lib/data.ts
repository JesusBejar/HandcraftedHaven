'use server'

import { sql } from '@vercel/postgres';
import {Product} from './definitions'
import { unstable_noStore as noStore } from 'next/cache';


console.log(process.env.POSTGRES_URL)
export async function fetchProducts() {
  noStore()
    try {
        console.log("Fetching products from the database...");
        const result = await sql<Product>`
        SELECT * 
        FROM products;
        `;
        console.log("Data fetched:", result.rows);
        return result.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch products.');
    }
}

export async function fetchProductById(id: string): Promise<Product> {
  try {
    const result = await sql<Product>`
      SELECT * FROM products WHERE id = ${id};
    `;
    if (result.rows.length === 0) {
      throw new Error("Product not found");
    }
    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}


export async function updateProductById(product: Product): Promise<void> {
  try {
    await sql`
UPDATE products
SET
  title = ${product.title},
  description = ${product.description},
  price = ${product.price},
  image = ${product.image},
  category = ${product.category}
WHERE id = ${product.id};

    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update product.');
  }
}



export async function deleteProduct(productId: string) {
    try {
        const result = await sql`
        DELETE FROM products
        WHERE id = ${productId}
        RETURNING *;  -- This will return the deleted row(s)
        `;
        console.log('Deleted product:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to delete product.');
    }
}

export async function addProduct(newProduct: Product): Promise<Product> {
    console.log(newProduct)
    try {
      const { title, description, price, image, category } = newProduct;
  
      // Input validation
      if (!title || !description || !price || !category) {
        throw new Error('All fields are required.');
      }
      // Inserting the new product into the database\
      const result = await sql<Product>`
      INSERT INTO products (title, description, price, image, category)
        VALUES (${title}, ${description}, ${price}, ${image}, ${category})
        RETURNING id, title, description, price, image, category;
      `;
  
      // Returning the first inserted product, assuming only one row is inserted
      return result.rows[0];
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error(`Failed to add product. ${error}`);
    }
  }
  s