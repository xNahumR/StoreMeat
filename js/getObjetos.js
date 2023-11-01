try {
    fetch('productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            // Ahora 'data' contiene el objeto JSON obtenido del archivo JSON
            console.log(data);

            // Obtén todos los elementos con la clase "item"
            var elementos = document.querySelectorAll(".item");

            elementos.forEach(elemento => {
                // Obtén el nombre del producto desde el atributo data-producto
                var nombreProducto = elemento.getAttribute("data-producto");

                // Busca el producto por su nombre en la matriz de objetos
                let productoAMostrar = data.find(item => item.nombre === nombreProducto);

                // Verifica si se encontró el producto y actualiza la imagen y el precio
                if (productoAMostrar) {
                    var imgElement = elemento.querySelector(".img-item");
                    var precioElement = elemento.querySelector(".precio-item");
                    var descripcionElement = elemento.querySelector(".descripcion-item");

                    descripcionElement.textContent = productoAMostrar.caracteristicas;
                    imgElement.src = productoAMostrar.imagen;
                    precioElement.textContent = "$" +productoAMostrar.precio;
                    
                    console.log("Producto cargado para: " + nombreProducto);
                } else {
                    console.log("Producto no encontrado para: " + nombreProducto);
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

} catch (error) {
    console.log("Error en la solicitud");
}
