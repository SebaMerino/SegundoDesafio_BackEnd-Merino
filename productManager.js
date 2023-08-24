import { promises as fs } from "fs";
import { Productos } from "./product.js";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  // Retornamos todos los productos
  async getProductos() {
    const prod = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    console.log(prod);
  }

  // Agregamos Productos
  async addProductos(product) {
    const prod = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    if (prod.find((e)=> e.id == product.id)) {
      return "El producto que ingreso ya esta registrado"
    }

    prod.push(product);

    await fs.writeFile(this.path, JSON.stringify(prod));
    return prod;
  }

  // Obtenemos los Productos con el ID
  async getProductById(id) {
    const prod = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const buscador = prod.find((prods) => prods.id === id);
    if (buscador) {
      console.log(buscador);
    } else {
      console.log("Producto no Existe");
    }
  }

  // Actualizamos un Producto
  async actualizarProduct( id, { title, description, price, thumbnail, code, stock }) {

    const prod= JSON.parse(await fs.readFile(this.path, "utf-8"));
    const indice= prod.findIndex(prods => prods.id === id)
    if (indice != -1) {
      prod[indice].title = title;
      prod[indice].description = description;
      prod[indice].price = price;
      prod[indice].thumbnail = thumbnail;
      prod[indice].code = code;
      prod[indice].stock = stock;
      await fs.writeFile(this.path, JSON.stringify(prod));
    }else{
      console.log("Producto no encontrado para actualizar");
    }

  }

  // Eliminamos un Producto
    async eliminarProduct (id){
      const prod = JSON.parse(await fs.readFile(this.path, 'utf-8'));
      const filter = prod.filter((prods)=> prods.id !== id);
      await fs.writeFile(this.path ,JSON.stringify(filter))
     }
}

const productManager = new ProductManager("./product.txt");

// agregramos los producto
const producto1 = new Productos("Iphone 11 ","Blanco", 760," ", "as12", 5);
// const producto2 = new Productos ("Iphone 12 ","Violeta", 860," ","as13", 8);

// Probamos los metodos
//  productManager.addProductos(producto1);
//  productManager.addProductos(producto2);
//  productManager.getProductos();
// productManager.getProductById(1);//Deberia decir que el producto no existe
// productManager.actualizarProduct(1, { title : "Iphone 11", description: "Blanco", price: 500, thumbnail: " ", code: "as12 ", stock: 4 } )
// productManager.getProductos();
productManager.eliminarProduct(1);


