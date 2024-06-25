CREATE database api_healthy;
use api_healthy;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `verification_code` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
); /*READY*/

CREATE TABLE `tipo_configuracion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
); /*READY*/

CREATE TABLE `tipo_dispositivo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
); /*READY*/

CREATE TABLE `sensor_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
); /*READY*/

CREATE TABLE `habitos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
); /*READY*/

CREATE TABLE `dispositivo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo_dispositivo_id` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `tipo_dispositivo_id` (`tipo_dispositivo_id`),
  CONSTRAINT `dispositivo_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `dispositivo_ibfk_2` FOREIGN KEY (`tipo_dispositivo_id`) REFERENCES `tipo_dispositivo` (`id`) ON DELETE CASCADE
); /*READY*/

CREATE TABLE `sensors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sensor_type_id` int DEFAULT NULL,
  `dispositivo_id` int DEFAULT NULL,
  `activo` tinyint DEFAULT NULL,
  `value` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dispositivo_id` (`dispositivo_id`),
  KEY `sensor_type_id` (`sensor_type_id`),
  CONSTRAINT `sensors_ibfk_1` FOREIGN KEY (`dispositivo_id`) REFERENCES `dispositivo` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sensors_ibfk_2` FOREIGN KEY (`sensor_type_id`) REFERENCES `sensor_types` (`id`) ON DELETE CASCADE
); /*READY*/

CREATE TABLE `tipo_dispositivo_tipo_sensors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo_dispositivo_id` int DEFAULT NULL,
  `sensor_types_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tipo_dispositivo_id` (`tipo_dispositivo_id`),
  KEY `sensor_types_id` (`sensor_types_id`),
  CONSTRAINT `tipo_dispositivo_tipo_sensors_ibfk_1` FOREIGN KEY (`tipo_dispositivo_id`) REFERENCES `tipo_dispositivo` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tipo_dispositivo_tipo_sensors_ibfk_2` FOREIGN KEY (`sensor_types_id`) REFERENCES `sensor_types` (`id`) ON DELETE CASCADE
); /*READY*/

CREATE TABLE `configuracion_habito` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `data` varchar(10) DEFAULT NULL,
  `tipo_configuracion_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `user_idd_idx` (`user_id`),
  KEY `tipo_configuracion_idd_idx` (`tipo_configuracion_id`),
  CONSTRAINT `tipo_configuracion_idd` FOREIGN KEY (`tipo_configuracion_id`) REFERENCES `tipo_configuracion` (`id`),
  CONSTRAINT `user_idd` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
); /*Cambiar el nombre del modelo porque solo se llama "Configuracion"*/
/*READY*/

/*Fijarse también en el poner */

CREATE TABLE `api_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` char(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `type` char(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `token` varchar(64) DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `api_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);
