import { NextResponse } from "next/server"
import { prisma } from "@/prisma/prisma"

export async function POST(req: Request) {
  try {
    const { name, description, price, category } = await req.json()

    if (!name || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
      },
    })

    return NextResponse.json({
      message: "Product created successfully",
      product,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}
