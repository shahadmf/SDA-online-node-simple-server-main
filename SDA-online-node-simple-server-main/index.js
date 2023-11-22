import http from "http";
import fs from "fs/promises";
import { parse } from "querystring";
const PORT = "8080";

let products = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
  },
];

const errorResponse = (res, statusCode, message) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ message }));
  res.end();
};

const successResponse = (res, data) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(data));
  res.end();
};

const writeResponse = (res, data) => {
  res.writeHead(201, { "Content-Type": "application/json" }); // Changed status code to 201
  res.write(JSON.stringify(data));
  res.end();
};

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    successResponse(res, { message: "Hello World!" });
  }
  else if (req.method === "GET" && req.url === "/products") {
    successResponse(res, products);
  }
  else if (req.method === "GET" && req.url.startsWith("/products/")) {
    const id = req.url.split("/")[2];
    const product = products.find((p) => p.id === parseInt(id));
    if (product) {
      successResponse(res, product);
    }
    else {
      errorResponse(res, 404, "Product not found");
    }
  }
  else if (req.method === "POST" && req.url === "/") {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
        console.log(body);
      });
      successResponse(res, 'new product is created')
    }
    catch(err){
    console.error(err)
    }
  }
  else if (req.method === "POST" && req.url == "/products") {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        const data = parse(body);
        console.log(data);

        const newProduct = {
          id: new Date().getTime().toString(),
          name: data.name,
          price: data.price,
        };

        const fileData = await fs.readFile("products.json", "utf-8");
        let existingProducts = [];

        if (fileData.trim()) {
          existingProducts = JSON.parse(fileData);
        }
        
         existingProducts.push(newProduct);
         await fs.writeFile("products.json", JSON.stringify(existingProducts));
        
        writeResponse(res, "New product is created");
      });
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  } else {
    errorResponse(res, 404, "Not found");
  }
});

server.listen(PORT);
