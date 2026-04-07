-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-04-2026 a las 03:54:06
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `git_food_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre_categoria`) VALUES
(1, 'Hamburguesa'),
(2, 'Perros Calientes'),
(3, 'Bebidas'),
(4, 'Acompañamientos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `id_tipo_documento` varchar(5) DEFAULT NULL,
  `numero_identificacion` varchar(20) NOT NULL,
  `nombre_completo` varchar(50) NOT NULL,
  `correo` varchar(30) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_orden`
--

CREATE TABLE `detalle_orden` (
  `id_detalle` int(11) NOT NULL,
  `id_orden` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_orden`
--

CREATE TABLE `estado_orden` (
  `id_estado` int(11) NOT NULL,
  `nombre_estado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_orden`
--

INSERT INTO `estado_orden` (`id_estado`, `nombre_estado`) VALUES
(1, 'Recibido'),
(2, 'En Preparacion'),
(3, 'Listo Para Servir'),
(4, 'En Camino'),
(5, 'Entregado'),
(6, 'Canecelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura_domicilio`
--

CREATE TABLE `factura_domicilio` (
  `id_factura` int(11) NOT NULL,
  `id_orden` int(11) DEFAULT NULL,
  `direccion_entrega` varchar(150) NOT NULL,
  `id_metodo` int(11) DEFAULT NULL,
  `total_pagar` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo_pago`
--

CREATE TABLE `metodo_pago` (
  `id_metodo` int(11) NOT NULL,
  `nombre_metodo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `metodo_pago`
--

INSERT INTO `metodo_pago` (`id_metodo`, `nombre_metodo`) VALUES
(1, 'Efectivo'),
(2, 'Tarjeta Credito/Debito'),
(3, 'Nequi'),
(4, 'Daviplata'),
(5, 'Bonos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden`
--

CREATE TABLE `orden` (
  `id_orden` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `fecha_orden` datetime DEFAULT current_timestamp(),
  `numero_mesa` int(11) DEFAULT NULL,
  `id_estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre_producto` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `url_image` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre_producto`, `descripcion`, `precio`, `id_categoria`, `url_image`) VALUES
(1, 'Combo Debugger', 'Hamburguesa doble carne, queso cheddar, tocino,mostaza y salsa de la casa.', 35000.00, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8LxmGoSF69s7Jrj_RDZLha30dpSvATzqpHQ&s'),
(2, 'Flash burguer clasica', 'Carne de res 150g, lechuga, tomate y cebolla caramelizada.', 22000.00, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgzIS8kHnGtTuWxPaoU_h3An8DkEJEQ0QwfQ&s'),
(3, 'Papas en Cascos', 'Papas rústicas con paprika y salsa de ajo.', 8000.00, 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ34gMP8pbLYJiBHdPsy9shX8QNPQIrrEhYUA&s'),
(4, 'Gaseosa 400ml', 'Coca-Cola, Sprite o Quatro.', 5000.00, 3, 'https://img.freepik.com/foto-gratis/vaso-cola-cubitos-hielo_23-2152002414.jpg?semt=ais_hybrid&w=740&q=80'),
(5, 'Hamburguesa SQL', 'Doble carne, queso cheddar y tocino relacional', 28000.00, 1, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop'),
(6, 'Hamburguesa Clásica', 'Carne de res, queso, lechuga, tomate y salsa especial', 15000.00, 1, 'https://img.freepik.com/foto-gratis/grilled-cheeseburger-with-tomato-onion-and-fries-generated-by-ai_188544-43039.jpg'),
(7, 'Hamburguesa Doble Queso', 'Doble carne, doble queso cheddar y cebolla grillé', 18500.00, 1, 'https://png.pngtree.com/thumb_back/fh260/background/20240730/pngtree-a-double-cheeseburger-with-two-layers-of-beef-patties-gooey-american-image_16115409.jpg'),
(8, 'Hamburguesa BBQ', 'Carne de res, tocino, aros de cebolla y salsa BBQ', 17000.00, 1, 'https://tienda.customculinary.mx/cdn/shop/articles/burger-cheddar-baconn_copy.jpg?v=1673410421&width=3543'),
(9, 'Perro Caliente Sencillo', 'Salchicha americana, ripio de papa y salsas', 10000.00, 2, 'https://previews.123rf.com/images/liudmylachuhunova/liudmylachuhunova1909/liudmylachuhunova190900438/130566353-homemade-colombian-hot-dogs-with-pineapple-sauce-yellow-mustard-and-mayo-ketchup-on-a-rustic-wooden.jpg'),
(10, 'Perro Caliente Especial', 'Salchicha, queso, tocino y ensalada de la casa', 13500.00, 2, 'https://media.istockphoto.com/id/1417753537/es/foto/chupito-cenital-de-comida-r%C3%A1pida-perrito-caliente-con-salsas-queso-y-dos-huevos-de-codorniz.jpg?s=612x612&w=0&k=20&c=MY7szxKI5TnVVboq3XffoLJzQqhyi0wdR3uK5VPtJC4='),
(11, 'Coca-Cola 500ml', 'Bebida gaseosa refrescante', 5000.00, 3, 'https://thumbs.dreamstime.com/b/coca-cola-18701706.jpg'),
(12, 'Jugo Natural', 'Jugo de fruta de temporada', 6000.00, 3, 'https://media.istockphoto.com/id/487402680/es/foto/jugo-de-frutas-frescas.jpg?s=612x612&w=0&k=20&c=4mtQYQA4OEXv1M5x8tDgZMIMrF461mOTtSfsKjfUTD4='),
(13, 'Papas Fritas', 'Porción de papas a la francesa crocantes', 7000.00, 4, 'https://thumbs.dreamstime.com/b/patatas-fritas-en-canasta-con-ketchup-y-salsa-aisladas-fondo-negro-vista-frontal-frescas-sobre-de-madera-177659825.jpg'),
(14, 'Aros de Cebolla', '8 unidades de aros de cebolla apanados', 8500.00, 4, 'https://www.shutterstock.com/image-photo/onion-rings-tomato-sauce-on-600nw-2706782933.jpg'),
(15, 'hamburguesa exitosaa', 'hamburguesa doble carne. tomate lechuga, tocineta, huevo frito. papitas en fosforito, salsa de la casa.', 22000.00, 1, 'https://cdn.pixabay.com/photo/2022/08/29/17/44/burger-7419419_640.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documento`
--

CREATE TABLE `tipo_documento` (
  `id_tipo` varchar(5) NOT NULL,
  `nombre_documento` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_documento`
--

INSERT INTO `tipo_documento` (`id_tipo`, `nombre_documento`) VALUES
('CC', 'Cedula de Ciudadania'),
('CE', 'Cedula de Extranjeria'),
('NIT', 'Numero de Identificacion Tributaria'),
('TI', 'Tarjeta de Identidad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `usuario` varchar(75) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario`, `password`) VALUES
(1, 'admin', 'admin26*');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `numero_identificacion` (`numero_identificacion`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `id_tipo_documento` (`id_tipo_documento`);

--
-- Indices de la tabla `detalle_orden`
--
ALTER TABLE `detalle_orden`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_orden` (`id_orden`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `estado_orden`
--
ALTER TABLE `estado_orden`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `factura_domicilio`
--
ALTER TABLE `factura_domicilio`
  ADD PRIMARY KEY (`id_factura`),
  ADD UNIQUE KEY `id_orden` (`id_orden`),
  ADD KEY `id_metodo` (`id_metodo`);

--
-- Indices de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  ADD PRIMARY KEY (`id_metodo`);

--
-- Indices de la tabla `orden`
--
ALTER TABLE `orden`
  ADD PRIMARY KEY (`id_orden`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  ADD PRIMARY KEY (`id_tipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_orden`
--
ALTER TABLE `detalle_orden`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estado_orden`
--
ALTER TABLE `estado_orden`
  MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `factura_domicilio`
--
ALTER TABLE `factura_domicilio`
  MODIFY `id_factura` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  MODIFY `id_metodo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `orden`
--
ALTER TABLE `orden`
  MODIFY `id_orden` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipo_documento` (`id_tipo`);

--
-- Filtros para la tabla `detalle_orden`
--
ALTER TABLE `detalle_orden`
  ADD CONSTRAINT `detalle_orden_ibfk_1` FOREIGN KEY (`id_orden`) REFERENCES `orden` (`id_orden`),
  ADD CONSTRAINT `detalle_orden_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `factura_domicilio`
--
ALTER TABLE `factura_domicilio`
  ADD CONSTRAINT `factura_domicilio_ibfk_1` FOREIGN KEY (`id_orden`) REFERENCES `orden` (`id_orden`),
  ADD CONSTRAINT `factura_domicilio_ibfk_2` FOREIGN KEY (`id_metodo`) REFERENCES `metodo_pago` (`id_metodo`);

--
-- Filtros para la tabla `orden`
--
ALTER TABLE `orden`
  ADD CONSTRAINT `orden_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `orden_ibfk_2` FOREIGN KEY (`id_estado`) REFERENCES `estado_orden` (`id_estado`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
