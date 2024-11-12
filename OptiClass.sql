-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: digitalmindworks
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `id_alumno` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `appaterno` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `apmaterno` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `grupo` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_grupo` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  PRIMARY KEY (`id_alumno`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `alumnos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (1,'Eduardo','Cabello','Hernandez','1',1,1),(2,'Gabriel','Hernandez','Cabello','3',3,7),(3,'Fernanda','Cabello','Hernandez','2',2,9),(4,'Sergio','Hernandez','Sanchez','4',4,10),(5,'123456','123456','123456',NULL,NULL,NULL),(6,'123456456','123456456','123456456',NULL,NULL,NULL),(7,'pp','pp','pp',NULL,NULL,NULL),(8,'123','123','123','15',NULL,NULL),(9,'liz','perez','aldavalde','16',NULL,NULL),(10,'Cami','Cami','Cami','IDGS011',NULL,NULL),(11,'Aranzi','Ara','Ara','IDGS012',18,NULL),(12,'ivan','ivan','ivan','IDGS010',2,20);
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignaturas`
--

DROP TABLE IF EXISTS `asignaturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignaturas` (
  `id_asignatura` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_asignatura`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaturas`
--

LOCK TABLES `asignaturas` WRITE;
/*!40000 ALTER TABLE `asignaturas` DISABLE KEYS */;
INSERT INTO `asignaturas` VALUES (1,'ADT'),(2,'ADS'),(3,'MAT'),(4,'II'),(5,'SI'),(6,'METP'),(7,'EDU');
/*!40000 ALTER TABLE `asignaturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aulas`
--

DROP TABLE IF EXISTS `aulas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aulas` (
  `id_aula` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `id_edificio` int DEFAULT NULL,
  PRIMARY KEY (`id_aula`),
  KEY `id_edificio` (`id_edificio`),
  CONSTRAINT `aulas_ibfk_1` FOREIGN KEY (`id_edificio`) REFERENCES `edificios` (`id_edificio`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aulas`
--

LOCK TABLES `aulas` WRITE;
/*!40000 ALTER TABLE `aulas` DISABLE KEYS */;
INSERT INTO `aulas` VALUES (1,'Aula 11',1),(2,'Aula 12',1),(3,'Aula 13',1),(4,'Aula 14',1),(5,'Aula 15',1),(6,'Aula 16',1),(7,'Aula 17',1),(8,'Aula 18',1),(9,'SUM',1),(10,'SAV',1),(11,'Aula 9',2),(12,'Aula 10',2),(13,'Aula 11',2),(14,'Aula 10',3),(15,'Aula 11',3),(16,'Aula 12',3),(17,'Aula 13',3);
/*!40000 ALTER TABLE `aulas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `edificios`
--

DROP TABLE IF EXISTS `edificios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `edificios` (
  `id_edificio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_edificio`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edificios`
--

LOCK TABLES `edificios` WRITE;
/*!40000 ALTER TABLE `edificios` DISABLE KEYS */;
INSERT INTO `edificios` VALUES (1,'K'),(2,'I'),(3,'J');
/*!40000 ALTER TABLE `edificios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formulario`
--

DROP TABLE IF EXISTS `formulario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formulario` (
  `id_formulario` int NOT NULL AUTO_INCREMENT,
  `id_alumno` int NOT NULL,
  `id_profesor` int NOT NULL,
  `pregunta_id` int NOT NULL,
  `respuesta` int NOT NULL,
  `fecha_respuesta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_formulario`),
  UNIQUE KEY `id_alumno` (`id_alumno`,`id_profesor`,`pregunta_id`),
  KEY `id_profesor` (`id_profesor`),
  CONSTRAINT `formulario_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`),
  CONSTRAINT `formulario_ibfk_2` FOREIGN KEY (`id_profesor`) REFERENCES `profesores` (`id_profesor`),
  CONSTRAINT `formulario_chk_1` CHECK ((`respuesta` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulario`
--

LOCK TABLES `formulario` WRITE;
/*!40000 ALTER TABLE `formulario` DISABLE KEYS */;
INSERT INTO `formulario` VALUES (171,1,1,1,1,'2024-11-11 10:59:42'),(172,1,1,2,4,'2024-11-11 10:59:42'),(173,1,1,3,2,'2024-11-11 10:59:42'),(174,1,1,4,4,'2024-11-11 10:59:42'),(175,1,1,5,3,'2024-11-11 10:59:42'),(176,1,1,6,4,'2024-11-11 10:59:42'),(177,1,1,7,2,'2024-11-11 10:59:42'),(178,1,1,8,4,'2024-11-11 10:59:42'),(179,1,1,9,3,'2024-11-11 10:59:42'),(180,1,1,10,1,'2024-11-11 10:59:42'),(181,1,3,1,2,'2024-11-11 11:01:15'),(182,1,3,2,4,'2024-11-11 11:01:15'),(183,1,3,3,5,'2024-11-11 11:01:15'),(184,1,3,4,4,'2024-11-11 11:01:15'),(185,1,3,5,1,'2024-11-11 11:01:15'),(186,1,3,6,3,'2024-11-11 11:01:15'),(187,1,3,7,2,'2024-11-11 11:01:15'),(188,1,3,8,2,'2024-11-11 11:01:15'),(189,1,3,9,5,'2024-11-11 11:01:15'),(190,1,3,10,1,'2024-11-11 11:01:15'),(191,1,4,1,5,'2024-11-11 11:02:05'),(192,1,4,2,5,'2024-11-11 11:02:05'),(193,1,4,3,5,'2024-11-11 11:02:05'),(194,1,4,4,4,'2024-11-11 11:02:05'),(195,1,4,5,4,'2024-11-11 11:02:05'),(196,1,4,6,1,'2024-11-11 11:02:05'),(197,1,4,7,3,'2024-11-11 11:02:05'),(198,1,4,8,4,'2024-11-11 11:02:05'),(199,1,4,9,1,'2024-11-11 11:02:05'),(200,1,4,10,3,'2024-11-11 11:02:05');
/*!40000 ALTER TABLE `formulario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupos`
--

DROP TABLE IF EXISTS `grupos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupos` (
  `id_grupo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_grupo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupos`
--

LOCK TABLES `grupos` WRITE;
/*!40000 ALTER TABLE `grupos` DISABLE KEYS */;
INSERT INTO `grupos` VALUES (1,'IDGS09'),(2,'IDGS010'),(3,'IDGS011'),(4,'IDGS012');
/*!40000 ALTER TABLE `grupos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesores`
--

DROP TABLE IF EXISTS `profesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesores` (
  `id_profesor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `appaterno` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `apmaterno` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dias_trabajo` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `horainicio_trabajo` time DEFAULT NULL,
  `horafin_trabajo` time DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `calificación` decimal(3,1) DEFAULT NULL,
  `asignatura` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_profesor`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `profesores_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores`
--

LOCK TABLES `profesores` WRITE;
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
INSERT INTO `profesores` VALUES (1,'123456','123456','123456',NULL,NULL,NULL,7,NULL,NULL),(3,'123456','123456','123456',NULL,NULL,NULL,9,NULL,NULL),(4,'123','123','123',NULL,NULL,NULL,10,NULL,NULL),(5,'Jorge','Garcia','Saldaña',NULL,NULL,NULL,NULL,4.0,'ADT'),(6,'Rogelio','Bautista','Sanchez',NULL,NULL,NULL,NULL,6.0,'ADS'),(7,'Jesus','Hernan','Perez','Vazques',NULL,NULL,NULL,3.0,'MAT'),(8,'Dulce','Yatida','Luna','Gonzales',NULL,NULL,NULL,3.0,'II'),(9,'Agustin','Buenrostro','Rico',NULL,NULL,NULL,NULL,4.0,'SI'),(10,'Angelica','Garduño','Bustamante',NULL,NULL,NULL,NULL,10.0,'METP'),(11,'Ana','Sol','Arteaga','Rivera',NULL,NULL,NULL,1.0,'EDU'),(12,'Jose','Jose','Pedro',NULL,NULL,NULL,NULL,6.0,'EDU'),(13,'Seguro','Garduño','Lopez',NULL,NULL,NULL,NULL,4.0,'SI');
/*!40000 ALTER TABLE `profesores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contrasenia` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tipo` enum('1','2','3') COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'sergioaldavalde@gmail.com','5040578b48d03f65efa2c2335477144f','1'),(7,'cetisaldavalde@gmail.com','e10adc3949ba59abbe56e057f20f883e','2'),(9,'2022371061@uteq.edu.mx','e10adc3949ba59abbe56e057f20f883e','2'),(10,'123@gmail.com','202cb962ac59075b964b07152d234b70','2'),(11,'hola@gmail.com','e10adc3949ba59abbe56e057f20f883e','3'),(12,'123456@gmail.com','e10adc3949ba59abbe56e057f20f883e','3'),(13,'pp@gmail.com','c483f6ce851c9ecd9fb835ff7551737c','3'),(14,'lalala@gmail.com','b53b3a3d6ab90ce0268229151c9bde11','3'),(15,'ppq@gmailk.com','c20ad4d76fe97759aa27a0c99bff6710','3'),(16,'analiz@gmail.com','e10adc3949ba59abbe56e057f20f883e','3'),(17,'cami@gmail.com','f7177163c833dff4b38fc8d2872f1ec6','3'),(18,'aranzi@gmail.com','e10adc3949ba59abbe56e057f20f883e','3'),(19,'Arni@gmail.com','e10adc3949ba59abbe56e057f20f883e','3'),(20,'ivan@gmail.com','e10adc3949ba59abbe56e057f20f883e','3');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-12 16:00:22
