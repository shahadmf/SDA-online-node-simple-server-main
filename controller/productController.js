import fs from "fs/promises";

import { errorResponse, successResponse } from "./responseController.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = JSON.parse(await fs.readFile("products.json", "utf-8"));
    successResponse(200, res, "Retuernd all products", products);
  } catch (error) {
    errorResponse(500, res, "Server error");
  }
};

export const addProduct = async (req, res) => {
  try {
    const newData = req.body;
    console.log(newData);
    const newProduct = {
      id: new Date().getTime().toString(),
      name: newData.name,
      price: newData.price,
    };
    const exisitingProducts = JSON.parse(
      await fs.readFile("products.json", "utf8")
    );
    exisitingProducts.push(newProduct);
    await fs.writeFile("products.json", JSON.stringify(exisitingProducts));

    successResponse(201, res, "Product is created");
  } catch (error) {
    errorResponse(500, res, "Server error");
  }
};