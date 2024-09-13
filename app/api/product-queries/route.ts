import { NextResponse } from "next/server"
import { pool } from "@/postgresql/db"

export async function POST(req: Request) {
  try {
    const { name, description, price, category } = await req.json()

    if (!name || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const query = `
      INSERT INTO "Product" (name, description, price, category)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `
    const values = [name, description, parseFloat(price), category]

    const result = await pool.query(query, values)
    const product = result.rows[0]

    return NextResponse.json({
      message: "Product created successfully",
      product,
    })
  } catch (error) {
    console.error("Error in POST /api/products:", error)
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const query = 'SELECT * FROM "Product"'
    const result = await pool.query(query)
    const products = result.rows
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error in GET /api/products:", error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const { _id, name, description, price, category } = await req.json()

    if (!_id || !name || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const query = `
      UPDATE "Product"
      SET name = $2, description = $3, price = $4, category = $5
      WHERE _id = $1
      RETURNING *
    `
    const values = [_id, name, description, parseFloat(price), category]

    const result = await pool.query(query, values)

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const updatedProduct = result.rows[0]

    return NextResponse.json({
      message: "Product updated successfully",
      product: updatedProduct,
    })
  } catch (error) {
    console.error("Error in PUT /api/products:", error)
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const { _id } = await req.json()

    if (!_id) {
      return NextResponse.json({ error: "Missing product ID" }, { status: 400 })
    }

    const query = 'DELETE FROM "Product" WHERE _id = $1 RETURNING *'
    const values = [_id]
    const result = await pool.query(query, values)

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const deletedProduct = result.rows[0]

    return NextResponse.json({
      message: "Product deleted successfully",
      product: deletedProduct,
    })
  } catch (error) {
    console.error("Error in DELETE /api/products:", error)
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    )
  }
}
