----- Rebook -----

MARA ARIZA GARCÍA
ISMAEL DELGADO MENDEZ
ROCIO HERRERA MATO
ADRIÁN LARA MONCAYO
TANIA MORENO AGUAYO


--- Requisitos Mínimos de Ejecución ---

- Node.js v22.20.0 		(node -v)
- NPM v11.12.1 			(npm -v)
- TypeScript v5.93 		(tsc -v)
- Angular CLI v20.3.19 	(ng version)
- XAMP v3.3.0


--- Configuración del proyecto ---

- 1: Mover la carpeta "Rebook-Backend" al directorio htdocs de XAMP

- 2: Abrir XAMP

- 3: Si en XAMP, Apache está configurado para escuchar los puertos 80 y 443, pasar al paso 4. Si no, ver pasos 3.1 y 3.2
-- 3.1: Si Apache está configurado en un puerto distinto al 80 y 443, abrir el archivo "Rebook-Frontend/src/environments/environment.ts"
-- 3.2: Modificar la línea 3 "http://localhost/Rebook-Backend/api.php" para incluir el puerto de configuración de Apache
		Por ejemplo, si Apache está configurado para el puerto 8080 se cambia la línea a "http://localhost:8080/Rebook-Backend/api.php"
		
- 4: Crear la base de datos
-- 4.1: Abrir phpMyAdmin pulsando el botón "admin" en la sección de MySQL del panel de control de XAMP
-- 4.2: Pulsar el botón SQL en la barra de herramientas superior de phpMyAdmin
-- 4.3: Ejecutar en la consola de SQL de phpMyAdmin el contenido del archivo "Rebook-Backend/database/sql/init_database.sql"
-- 4.4: Comprobar que se ha creado correctamente la base de datos rebook con tablas: books, bought, carts, favourites, rented y users

- 5: Instalar dependencias del FrontEnd abriendo Rebook-Frontend y ejecutando npm i

- 6: Ejecutar tests unitarios del Frontend con npm run test

- 7: Detener los tests en la consola con CTRL + C

- 8: Ejecutar el FrontEnd con ng serve -o

- 9: Se puede crear un usuario nuevo mediante el formulario de registro o utilizar el usuario admin por defecto con credenciales:
	 email: 	 rebook@rebook.com
	 contraseña: 123456