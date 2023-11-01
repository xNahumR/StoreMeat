// Importa el módulo 'express' para crear un servidor web
const express = require('express');

// Importa el módulo 'fs' para trabajar con el sistema de archivos
const fs = require('fs');

// Importa el middleware 'cors' para permitir solicitudes desde diferentes orígenes (Cross-Origin Resource Sharing)
const cors = require('cors');

// Crea una instancia de la aplicación Express
const app = express();

// Establece el puerto en el que escuchará el servidor web
const port = 3000;

// Middleware para procesar JSON en solicitudes
app.use(express.json());


// Middleware CORS para permitir todas las solicitudes (para desarrollo local)
app.use(cors());

// Ruta para obtener los datos del archivo JSON
app.get('/api/products', (req, res) => {
  // Lee el archivo 'factura.json' en formato UTF-8
  fs.readFile('factura.json', 'utf8', (err, data) => {
    res.json(JSON.parse(data));
  });
});

// Ruta para actualizar el stock de un producto
app.put('/api/products/:id', (req, res) => {
  // Obtiene el ID del producto de los parámetros de la solicitud
  const id = parseInt(req.params.id);

  // Obtiene el nuevo stock del producto del cuerpo de la solicitud
  const newStock = req.body.stock;

  // Lee el archivo 'factura.json' en formato UTF-8
  fs.readFile('productos.json', 'utf8', (err, data) => {
    // Convierte los datos JSON del archivo en un objeto JavaScript
    const productos = JSON.parse(data);

    // Busca el producto a modificar por su ID
    const productoAModificar = productos.find(producto => producto.id === id);

    if (productoAModificar) {
      // Actualiza el stock del producto
      productoAModificar.stock = newStock;

      // Escribe los datos actualizados en el archivo JSON
      fs.writeFile('factura.json', JSON.stringify(productos, null, 2), 'utf8', (err) => {
        if (err) {
          // Maneja el error si ocurre al escribir en el archivo JSON
          console.error('Error al escribir en el archivo JSON:', err);
          res.status(500).json({ error: 'Error al escribir en el archivo JSON' });
          return;
        }
        // Devuelve un mensaje de éxito como respuesta
        res.json({ message: 'Stock modificado con éxito.' });
      });
    } 
  });
});

// Inicia el servidor y escucha en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
