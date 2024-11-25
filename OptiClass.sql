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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (1,'Eduardo','Cabello','Hernandez','1',1,1),(2,'Gabriel','Hernandez','Cabello','3',3,7),(3,'Fernanda','Cabello','Hernandez','2',2,9),(4,'Sergio','Hernandez','Sanchez','4',4,10),(5,'123456','123456','123456',NULL,NULL,NULL),(6,'123456456','123456456','123456456',NULL,NULL,NULL),(7,'pp','pp','pp',NULL,NULL,NULL),(8,'123','123','123','15',NULL,NULL),(9,'liz','perez','aldavalde','16',NULL,NULL),(10,'Cami','Cami','Cami','IDGS011',NULL,NULL),(11,'Aranzi','Ara','Ara','IDGS012',18,NULL),(12,'ivan','ivan','ivan','IDGS010',2,20),(13,'Arnulfo','Arnulfo','Arnulfo','IDGS012',4,21);
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
  UNIQUE KEY `idx_unique_formulario` (`id_alumno`,`id_profesor`,`pregunta_id`),
  KEY `id_profesor` (`id_profesor`),
  CONSTRAINT `formulario_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`),
  CONSTRAINT `formulario_ibfk_2` FOREIGN KEY (`id_profesor`) REFERENCES `profesores` (`id_profesor`),
  CONSTRAINT `formulario_chk_1` CHECK ((`respuesta` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulario`
--

LOCK TABLES `formulario` WRITE;
/*!40000 ALTER TABLE `formulario` DISABLE KEYS */;
INSERT INTO `formulario` VALUES (21,12,4,1,5,'2024-11-18 23:03:32'),(22,12,4,2,5,'2024-11-18 23:03:32'),(23,12,4,3,5,'2024-11-18 23:03:32'),(24,12,4,4,5,'2024-11-18 23:03:32'),(25,12,4,5,5,'2024-11-18 23:03:32'),(26,12,4,6,5,'2024-11-18 23:03:32'),(27,12,4,7,5,'2024-11-18 23:03:32'),(28,12,4,8,5,'2024-11-18 23:03:32'),(29,12,4,9,5,'2024-11-18 23:03:32'),(30,12,4,10,5,'2024-11-18 23:03:32'),(61,12,8,1,5,'2024-11-19 01:43:52'),(62,12,8,2,5,'2024-11-19 01:43:52'),(63,12,8,3,5,'2024-11-19 01:43:52'),(64,12,8,4,5,'2024-11-19 01:43:52'),(65,12,8,5,5,'2024-11-19 01:43:52'),(66,12,8,6,5,'2024-11-19 01:43:52'),(67,12,8,7,5,'2024-11-19 01:43:52'),(68,12,8,8,4,'2024-11-19 01:43:52'),(69,12,8,9,3,'2024-11-19 01:43:52'),(70,12,8,10,5,'2024-11-19 01:43:52'),(71,12,1,1,5,'2024-11-19 18:47:26'),(72,12,1,2,5,'2024-11-19 18:47:26'),(73,12,1,3,5,'2024-11-19 18:47:26'),(74,12,1,4,4,'2024-11-19 18:47:26'),(75,12,1,5,4,'2024-11-19 18:47:26'),(76,12,1,6,4,'2024-11-19 18:47:26'),(77,12,1,7,4,'2024-11-19 18:47:26'),(78,12,1,8,4,'2024-11-19 18:47:26'),(79,12,1,9,4,'2024-11-19 18:47:26'),(80,12,1,10,4,'2024-11-19 18:47:26'),(81,13,8,1,4,'2024-11-21 20:45:14'),(82,13,8,2,4,'2024-11-21 20:45:14'),(83,13,8,3,4,'2024-11-21 20:45:14'),(84,13,8,4,4,'2024-11-21 20:45:14'),(85,13,8,5,4,'2024-11-21 20:45:14'),(86,13,8,6,1,'2024-11-21 20:45:14'),(87,13,8,7,2,'2024-11-21 20:45:14'),(88,13,8,8,4,'2024-11-21 20:45:14'),(89,13,8,9,5,'2024-11-21 20:45:14'),(90,13,8,10,4,'2024-11-21 20:45:14');
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
-- Table structure for table `horario`
--

DROP TABLE IF EXISTS `horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grupo` varchar(100) NOT NULL,
  `materia` varchar(100) NOT NULL,
  `profesor` varchar(100) NOT NULL,
  `aula` varchar(50) NOT NULL,
  `dia` varchar(20) NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horario`
--

LOCK TABLES `horario` WRITE;
/*!40000 ALTER TABLE `horario` DISABLE KEYS */;
INSERT INTO `horario` VALUES (1,'1','MAT','Jesus Hernan Perez','Aula 17','Lunes','05:00:00','06:00:00'),(2,'1','SI','Agustin Buenrostro Rico','SUM','Martes','05:00:00','06:00:00'),(3,'1','SI','Agustin Buenrostro Rico','SUM','Miércoles','05:00:00','06:00:00'),(4,'1','EDU','Jose Jose Pedro','Aula 10','Jueves','05:00:00','06:00:00'),(5,'1','EDU','Jose Jose Pedro','Aula 10','Viernes','05:00:00','06:00:00'),(6,'1','ADS','Rogelio Bautista Sanchez','Aula 16','Lunes','06:00:00','07:00:00'),(7,'1','ADT','Jorge Garcia Saldaña','Aula 15','Martes','06:00:00','07:00:00'),(8,'1','METP','Angelica Garduño Bustamante','SAV','Miércoles','06:00:00','07:00:00'),(9,'1','SI','Seguro Garduño Lopez','Aula 11','Jueves','06:00:00','07:00:00'),(10,'1','SI','Agustin Buenrostro Rico','SUM','Viernes','06:00:00','07:00:00'),(11,'1','ADS','Rogelio Bautista Sanchez','Aula 16','Lunes','07:00:00','08:00:00'),(12,'1','ADS','Rogelio Bautista Sanchez','Aula 16','Martes','07:00:00','08:00:00'),(13,'1','EDU','Jose Jose Pedro','Aula 10','Miércoles','07:00:00','08:00:00'),(14,'1','II','Dulce Yatida Luna','Aula 18','Jueves','07:00:00','08:00:00'),(15,'1','ADT','Jorge Garcia Saldaña','Aula 15','Viernes','07:00:00','08:00:00'),(16,'1','EDU','Ana Sol Arteaga','Aula 9','Lunes','08:00:00','09:00:00'),(17,'1','ADT','Jorge Garcia Saldaña','Aula 15','Martes','08:00:00','09:00:00'),(18,'1','SI','Seguro Garduño Lopez','Aula 11','Miércoles','08:00:00','09:00:00'),(19,'1','SI','Agustin Buenrostro Rico','SUM','Jueves','08:00:00','09:00:00'),(20,'1','SI','Agustin Buenrostro Rico','SUM','Viernes','08:00:00','09:00:00'),(21,'1','EDU','Ana Sol Arteaga','Aula 9','Lunes','09:00:00','10:00:00'),(22,'1','ADS','Rogelio Bautista Sanchez','Aula 16','Martes','09:00:00','10:00:00'),(23,'1','METP','Angelica Garduño Bustamante','SAV','Miércoles','09:00:00','10:00:00'),(24,'1','ADS','Rogelio Bautista Sanchez','Aula 16','Jueves','09:00:00','10:00:00'),(25,'1','ADT','Jorge Garcia Saldaña','Aula 15','Viernes','09:00:00','10:00:00'),(26,'2','ADT','Jorge Garcia Saldaña','Aula 15','Lunes','05:00:00','06:00:00'),(27,'2','SI','Agustin Buenrostro Rico','SUM','Martes','05:00:00','06:00:00'),(28,'2','SI','Agustin Buenrostro Rico','SUM','Miércoles','05:00:00','06:00:00'),(29,'2','II','Dulce Yatida Luna','Aula 18','Jueves','05:00:00','06:00:00'),(30,'2','II','Dulce Yatida Luna','Aula 18','Viernes','05:00:00','06:00:00'),(31,'2','SI','Seguro Garduño Lopez','Aula 11','Lunes','06:00:00','07:00:00'),(32,'2','ADT','Jorge Garcia Saldaña','Aula 15','Martes','06:00:00','07:00:00'),(33,'2','MAT','Jesus Hernan Perez','Aula 17','Miércoles','06:00:00','07:00:00'),(34,'2','ADS','Rogelio Bautista Sanchez','Aula 16','Jueves','06:00:00','07:00:00'),(35,'2','METP','Angelica Garduño Bustamante','SAV','Viernes','06:00:00','07:00:00'),(36,'2','METP','Angelica Garduño Bustamante','SAV','Lunes','07:00:00','08:00:00'),(37,'2','ADS','Rogelio Bautista Sanchez','Aula 16','Martes','07:00:00','08:00:00'),(38,'2','ADS','Rogelio Bautista Sanchez','Aula 16','Miércoles','07:00:00','08:00:00'),(39,'2','SI','Agustin Buenrostro Rico','SUM','Jueves','07:00:00','08:00:00'),(40,'2','METP','Angelica Garduño Bustamante','SAV','Viernes','07:00:00','08:00:00'),(41,'2','MAT','Jesus Hernan Perez','Aula 17','Lunes','08:00:00','09:00:00'),(42,'2','SI','Agustin Buenrostro Rico','SUM','Martes','08:00:00','09:00:00'),(43,'2','SI','Agustin Buenrostro Rico','SUM','Miércoles','08:00:00','09:00:00'),(44,'2','EDU','Ana Sol Arteaga','Aula 9','Jueves','08:00:00','09:00:00'),(45,'2','ADT','Jorge Garcia Saldaña','Aula 15','Viernes','08:00:00','09:00:00'),(46,'2','MAT','Jesus Hernan Perez','Aula 17','Lunes','09:00:00','10:00:00'),(47,'2','ADT','Jorge Garcia Saldaña','Aula 15','Martes','09:00:00','10:00:00'),(48,'2','ADT','Jorge Garcia Saldaña','Aula 15','Miércoles','09:00:00','10:00:00'),(49,'2','METP','Angelica Garduño Bustamante','SAV','Jueves','09:00:00','10:00:00'),(50,'2','METP','Angelica Garduño Bustamante','SAV','Viernes','09:00:00','10:00:00'),(51,'3','EDU','Jose Jose Pedro','Aula 10','Lunes','05:00:00','06:00:00'),(52,'3','MAT','Jesus Hernan Perez','Aula 17','Martes','05:00:00','06:00:00'),(53,'3','SI','Agustin Buenrostro Rico','SUM','Miércoles','05:00:00','06:00:00'),(54,'3','SI','Seguro Garduño Lopez','Aula 11','Jueves','05:00:00','06:00:00'),(55,'3','MAT','Jesus Hernan Perez','Aula 17','Viernes','05:00:00','06:00:00'),(56,'3','EDU','Jose Jose Pedro','Aula 10','Lunes','06:00:00','07:00:00'),(57,'3','SI','Agustin Buenrostro Rico','SUM','Martes','06:00:00','07:00:00'),(58,'3','ADS','Rogelio Bautista Sanchez','Aula 16','Miércoles','06:00:00','07:00:00'),(59,'3','ADT','Jorge Garcia Saldaña','Aula 15','Jueves','06:00:00','07:00:00'),(60,'3','SI','Seguro Garduño Lopez','Aula 11','Viernes','06:00:00','07:00:00'),(61,'3','SI','Agustin Buenrostro Rico','SUM','Lunes','07:00:00','08:00:00'),(62,'3','MAT','Jesus Hernan Perez','Aula 17','Martes','07:00:00','08:00:00'),(63,'3','EDU','Ana Sol Arteaga','Aula 9','Miércoles','07:00:00','08:00:00'),(64,'3','EDU','Ana Sol Arteaga','Aula 9','Jueves','07:00:00','08:00:00'),(65,'3','METP','Angelica Garduño Bustamante','SAV','Viernes','07:00:00','08:00:00'),(66,'3','METP','Angelica Garduño Bustamante','SAV','Lunes','08:00:00','09:00:00'),(67,'3','SI','Seguro Garduño Lopez','Aula 11','Martes','08:00:00','09:00:00'),(68,'3','ADS','Rogelio Bautista Sanchez','Aula 16','Miércoles','08:00:00','09:00:00'),(69,'3','SI','Agustin Buenrostro Rico','SUM','Jueves','08:00:00','09:00:00'),(70,'3','MAT','Jesus Hernan Perez','Aula 17','Viernes','08:00:00','09:00:00'),(71,'3','MAT','Jesus Hernan Perez','Aula 17','Lunes','09:00:00','10:00:00'),(72,'3','SI','Seguro Garduño Lopez','Aula 11','Martes','09:00:00','10:00:00'),(73,'3','EDU','Jose Jose Pedro','Aula 10','Miércoles','09:00:00','10:00:00'),(74,'3','ADT','Jorge Garcia Saldaña','Aula 15','Jueves','09:00:00','10:00:00'),(75,'3','MAT','Jesus Hernan Perez','Aula 17','Viernes','09:00:00','10:00:00'),(76,'4','EDU','Ana Sol Arteaga','Aula 9','Lunes','05:00:00','06:00:00'),(77,'4','EDU','Ana Sol Arteaga','Aula 9','Martes','05:00:00','06:00:00'),(78,'4','II','Dulce Yatida Luna','Aula 18','Miércoles','05:00:00','06:00:00'),(79,'4','SI','Seguro Garduño Lopez','Aula 11','Jueves','05:00:00','06:00:00'),(80,'4','METP','Angelica Garduño Bustamante','SAV','Viernes','05:00:00','06:00:00'),(81,'4','METP','Angelica Garduño Bustamante','SAV','Lunes','06:00:00','07:00:00'),(82,'4','II','Dulce Yatida Luna','Aula 18','Martes','06:00:00','07:00:00'),(83,'4','ADT','Jorge Garcia Saldaña','Aula 15','Miércoles','06:00:00','07:00:00'),(84,'4','ADT','Jorge Garcia Saldaña','Aula 15','Jueves','06:00:00','07:00:00'),(85,'4','METP','Angelica Garduño Bustamante','SAV','Viernes','06:00:00','07:00:00'),(86,'4','SI','Agustin Buenrostro Rico','SUM','Lunes','07:00:00','08:00:00'),(87,'4','ADS','Rogelio Bautista Sanchez','Aula 16','Martes','07:00:00','08:00:00'),(88,'4','EDU','Ana Sol Arteaga','Aula 9','Miércoles','07:00:00','08:00:00'),(89,'4','EDU','Jose Jose Pedro','Aula 10','Jueves','07:00:00','08:00:00'),(90,'4','SI','Seguro Garduño Lopez','Aula 11','Viernes','07:00:00','08:00:00'),(91,'4','II','Dulce Yatida Luna','Aula 18','Lunes','08:00:00','09:00:00'),(92,'4','METP','Angelica Garduño Bustamante','SAV','Martes','08:00:00','09:00:00'),(93,'4','EDU','Jose Jose Pedro','Aula 10','Miércoles','08:00:00','09:00:00'),(94,'4','SI','Agustin Buenrostro Rico','SUM','Jueves','08:00:00','09:00:00'),(95,'4','ADS','Rogelio Bautista Sanchez','Aula 16','Viernes','08:00:00','09:00:00'),(96,'4','EDU','Jose Jose Pedro','Aula 10','Lunes','09:00:00','10:00:00'),(97,'4','SI','Agustin Buenrostro Rico','SUM','Martes','09:00:00','10:00:00'),(98,'4','SI','Agustin Buenrostro Rico','SUM','Miércoles','09:00:00','10:00:00'),(99,'4','MAT','Jesus Hernan Perez','Aula 17','Jueves','09:00:00','10:00:00'),(100,'4','EDU','Ana Sol Arteaga','Aula 9','Viernes','09:00:00','10:00:00'),(101,'1','II','Dulce Yatida Luna','Aula 18','Lunes','05:00:00','06:00:00'),(102,'1','SI','Seguro Garduño Lopez','Aula 11','Martes','05:00:00','06:00:00'),(103,'1','MAT','Jesus Hernan Perez','Aula 17','Miércoles','05:00:00','06:00:00'),(104,'1','SI','Seguro Garduño Lopez','Aula 11','Jueves','05:00:00','06:00:00'),(105,'1','ADS','Rogelio Bautista Sanchez','Aula 16','Viernes','05:00:00','06:00:00'),(106,'1','ADS','Rogelio Bautista Sanchez','Aula 16','Lunes','06:00:00','07:00:00'),(107,'1','EDU','Ana Sol Arteaga','Aula 9','Martes','06:00:00','07:00:00'),(108,'1','SI','Agustin Buenrostro Rico','SUM','Miércoles','06:00:00','07:00:00'),(109,'1','SI','Seguro Garduño Lopez','Aula 11','Jueves','06:00:00','07:00:00'),(110,'1','EDU','Ana Sol Arteaga','Aula 9','Viernes','06:00:00','07:00:00'),(111,'1','ADS','Rogelio Bautista Sanchez','Aula 16','Lunes','07:00:00','08:00:00'),(112,'1','SI','Seguro Garduño Lopez','Aula 11','Martes','07:00:00','08:00:00'),(113,'1','II','Dulce Yatida Luna','Aula 18','Miércoles','07:00:00','08:00:00'),(114,'1','METP','Angelica Garduño Bustamante','SAV','Jueves','07:00:00','08:00:00'),(115,'1','EDU','Ana Sol Arteaga','Aula 9','Viernes','07:00:00','08:00:00'),(116,'1','ADS','Rogelio Bautista Sanchez','Aula 16','Lunes','08:00:00','09:00:00'),(117,'1','METP','Angelica Garduño Bustamante','SAV','Martes','08:00:00','09:00:00'),(118,'1','EDU','Ana Sol Arteaga','Aula 9','Miércoles','08:00:00','09:00:00'),(119,'1','II','Dulce Yatida Luna','Aula 18','Jueves','08:00:00','09:00:00'),(120,'1','II','Dulce Yatida Luna','Aula 18','Viernes','08:00:00','09:00:00'),(121,'1','EDU','Jose Jose Pedro','Aula 10','Lunes','09:00:00','10:00:00'),(122,'1','ADS','Rogelio Bautista Sanchez','Aula 16','Martes','09:00:00','10:00:00'),(123,'1','EDU','Jose Jose Pedro','Aula 10','Miércoles','09:00:00','10:00:00'),(124,'1','SI','Agustin Buenrostro Rico','SUM','Jueves','09:00:00','10:00:00'),(125,'1','EDU','Jose Jose Pedro','Aula 10','Viernes','09:00:00','10:00:00'),(126,'2','METP','Angelica Garduño Bustamante','SAV','Lunes','05:00:00','06:00:00'),(127,'2','EDU','Jose Jose Pedro','Aula 10','Martes','05:00:00','06:00:00'),(128,'2','METP','Angelica Garduño Bustamante','SAV','Miércoles','05:00:00','06:00:00'),(129,'2','MAT','Jesus Hernan Perez','Aula 17','Jueves','05:00:00','06:00:00'),(130,'2','METP','Angelica Garduño Bustamante','SAV','Viernes','05:00:00','06:00:00'),(131,'2','ADS','Rogelio Bautista Sanchez','Aula 16','Lunes','06:00:00','07:00:00'),(132,'2','SI','Agustin Buenrostro Rico','SUM','Martes','06:00:00','07:00:00'),(133,'2','SI','Seguro Garduño Lopez','Aula 11','Miércoles','06:00:00','07:00:00'),(134,'2','SI','Seguro Garduño Lopez','Aula 11','Jueves','06:00:00','07:00:00'),(135,'2','METP','Angelica Garduño Bustamante','SAV','Viernes','06:00:00','07:00:00'),(136,'2','MAT','Jesus Hernan Perez','Aula 17','Lunes','07:00:00','08:00:00'),(137,'2','ADT','Jorge Garcia Saldaña','Aula 15','Martes','07:00:00','08:00:00'),(138,'2','SI','Agustin Buenrostro Rico','SUM','Miércoles','07:00:00','08:00:00'),(139,'2','ADT','Jorge Garcia Saldaña','Aula 15','Jueves','07:00:00','08:00:00'),(140,'2','MAT','Jesus Hernan Perez','Aula 17','Viernes','07:00:00','08:00:00'),(141,'2','ADT','Jorge Garcia Saldaña','Aula 15','Lunes','08:00:00','09:00:00'),(142,'2','EDU','Ana Sol Arteaga','Aula 9','Martes','08:00:00','09:00:00'),(143,'2','ADS','Rogelio Bautista Sanchez','Aula 16','Miércoles','08:00:00','09:00:00'),(144,'2','EDU','Jose Jose Pedro','Aula 10','Jueves','08:00:00','09:00:00'),(145,'2','ADS','Rogelio Bautista Sanchez','Aula 16','Viernes','08:00:00','09:00:00'),(146,'2','METP','Angelica Garduño Bustamante','SAV','Lunes','09:00:00','10:00:00'),(147,'2','SI','Seguro Garduño Lopez','Aula 11','Martes','09:00:00','10:00:00'),(148,'2','MAT','Jesus Hernan Perez','Aula 17','Miércoles','09:00:00','10:00:00'),(149,'2','MAT','Jesus Hernan Perez','Aula 17','Jueves','09:00:00','10:00:00'),(150,'2','EDU','Jose Jose Pedro','Aula 10','Viernes','09:00:00','10:00:00'),(151,'3','SI','Seguro Garduño Lopez','Aula 11','Lunes','05:00:00','06:00:00'),(152,'3','EDU','Ana Sol Arteaga','Aula 9','Martes','05:00:00','06:00:00'),(153,'3','EDU','Ana Sol Arteaga','Aula 9','Miércoles','05:00:00','06:00:00'),(154,'3','II','Dulce Yatida Luna','Aula 18','Jueves','05:00:00','06:00:00'),(155,'3','SI','Seguro Garduño Lopez','Aula 11','Viernes','05:00:00','06:00:00'),(156,'3','EDU','Ana Sol Arteaga','Aula 9','Lunes','06:00:00','07:00:00'),(157,'3','ADT','Jorge Garcia Saldaña','Aula 15','Martes','06:00:00','07:00:00'),(158,'3','ADS','Rogelio Bautista Sanchez','Aula 16','Miércoles','06:00:00','07:00:00'),(159,'3','ADT','Jorge Garcia Saldaña','Aula 15','Jueves','06:00:00','07:00:00'),(160,'3','MAT','Jesus Hernan Perez','Aula 17','Viernes','06:00:00','07:00:00'),(161,'3','MAT','Jesus Hernan Perez','Aula 17','Lunes','07:00:00','08:00:00'),(162,'3','METP','Angelica Garduño Bustamante','SAV','Martes','07:00:00','08:00:00'),(163,'3','ADS','Rogelio Bautista Sanchez','Aula 16','Miércoles','07:00:00','08:00:00'),(164,'3','EDU','Jose Jose Pedro','Aula 10','Jueves','07:00:00','08:00:00'),(165,'3','MAT','Jesus Hernan Perez','Aula 17','Viernes','07:00:00','08:00:00'),(166,'3','SI','Agustin Buenrostro Rico','SUM','Lunes','08:00:00','09:00:00'),(167,'3','ADT','Jorge Garcia Saldaña','Aula 15','Martes','08:00:00','09:00:00'),(168,'3','ADS','Rogelio Bautista Sanchez','Aula 16','Miércoles','08:00:00','09:00:00'),(169,'3','EDU','Ana Sol Arteaga','Aula 9','Jueves','08:00:00','09:00:00'),(170,'3','SI','Seguro Garduño Lopez','Aula 11','Viernes','08:00:00','09:00:00'),(171,'3','ADS','Rogelio Bautista Sanchez','Aula 16','Lunes','09:00:00','10:00:00'),(172,'3','EDU','Ana Sol Arteaga','Aula 9','Martes','09:00:00','10:00:00'),(173,'3','II','Dulce Yatida Luna','Aula 18','Miércoles','09:00:00','10:00:00'),(174,'3','EDU','Jose Jose Pedro','Aula 10','Jueves','09:00:00','10:00:00'),(175,'3','ADS','Rogelio Bautista Sanchez','Aula 16','Viernes','09:00:00','10:00:00'),(176,'4','ADS','Rogelio Bautista Sanchez','Aula 16','Lunes','05:00:00','06:00:00'),(177,'4','METP','Angelica Garduño Bustamante','SAV','Martes','05:00:00','06:00:00'),(178,'4','METP','Angelica Garduño Bustamante','SAV','Miércoles','05:00:00','06:00:00'),(179,'4','SI','Seguro Garduño Lopez','Aula 11','Jueves','05:00:00','06:00:00'),(180,'4','MAT','Jesus Hernan Perez','Aula 17','Viernes','05:00:00','06:00:00'),(181,'4','SI','Seguro Garduño Lopez','Aula 11','Lunes','06:00:00','07:00:00'),(182,'4','EDU','Jose Jose Pedro','Aula 10','Martes','06:00:00','07:00:00'),(183,'4','EDU','Jose Jose Pedro','Aula 10','Miércoles','06:00:00','07:00:00'),(184,'4','EDU','Jose Jose Pedro','Aula 10','Jueves','06:00:00','07:00:00'),(185,'4','ADT','Jorge Garcia Saldaña','Aula 15','Viernes','06:00:00','07:00:00'),(186,'4','EDU','Jose Jose Pedro','Aula 10','Lunes','07:00:00','08:00:00'),(187,'4','ADS','Rogelio Bautista Sanchez','Aula 16','Martes','07:00:00','08:00:00'),(188,'4','MAT','Jesus Hernan Perez','Aula 17','Miércoles','07:00:00','08:00:00'),(189,'4','MAT','Jesus Hernan Perez','Aula 17','Jueves','07:00:00','08:00:00'),(190,'4','SI','Seguro Garduño Lopez','Aula 11','Viernes','07:00:00','08:00:00'),(191,'4','METP','Angelica Garduño Bustamante','SAV','Lunes','08:00:00','09:00:00'),(192,'4','SI','Seguro Garduño Lopez','Aula 11','Martes','08:00:00','09:00:00'),(193,'4','ADS','Rogelio Bautista Sanchez','Aula 16','Miércoles','08:00:00','09:00:00'),(194,'4','EDU','Ana Sol Arteaga','Aula 9','Jueves','08:00:00','09:00:00'),(195,'4','EDU','Jose Jose Pedro','Aula 10','Viernes','08:00:00','09:00:00'),(196,'4','METP','Angelica Garduño Bustamante','SAV','Lunes','09:00:00','10:00:00'),(197,'4','SI','Agustin Buenrostro Rico','SUM','Martes','09:00:00','10:00:00'),(198,'4','SI','Seguro Garduño Lopez','Aula 11','Miércoles','09:00:00','10:00:00'),(199,'4','EDU','Ana Sol Arteaga','Aula 9','Jueves','09:00:00','10:00:00'),(200,'4','MAT','Jesus Hernan Perez','Aula 17','Viernes','09:00:00','10:00:00');
/*!40000 ALTER TABLE `horario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias` (
  `id_materia` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_materia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materias`
--

LOCK TABLES `materias` WRITE;
/*!40000 ALTER TABLE `materias` DISABLE KEYS */;
/*!40000 ALTER TABLE `materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peticiones`
--

DROP TABLE IF EXISTS `peticiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peticiones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(255) NOT NULL,
  `dias_disponibles` json DEFAULT NULL,
  `horas_trabajo` json DEFAULT NULL,
  `tiempo_completo` tinyint(1) NOT NULL,
  `fecha_peticion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peticiones`
--

LOCK TABLES `peticiones` WRITE;
/*!40000 ALTER TABLE `peticiones` DISABLE KEYS */;
INSERT INTO `peticiones` VALUES (1,'cetisaldavalde@gmail.com','[\"Lunes\", \"Martes\", \"Miércoles\", \"Jueves\", \"Viernes\"]','{\"Lunes\": {\"fin\": \"13:00\", \"inicio\": \"08:00\"}, \"Jueves\": {\"fin\": \"13:00\", \"inicio\": \"08:00\"}, \"Martes\": {\"fin\": \"13:00\", \"inicio\": \"08:00\"}, \"Viernes\": {\"fin\": \"13:00\", \"inicio\": \"08:00\"}, \"Miércoles\": {\"fin\": \"13:00\", \"inicio\": \"08:00\"}}',0,'2024-11-23 03:55:30'),(2,'cetisaldavalde@gmail.com','[\"Lunes\"]','{\"Lunes\": {\"fin\": \"22:00\", \"inicio\": \"17:00\"}}',0,'2024-11-23 03:57:59'),(3,'cetisaldavalde@gmail.com','[]','{}',0,'2024-11-23 05:48:15'),(4,'cetisaldavalde@gmail.com','[]','{}',0,'2024-11-23 05:48:24');
/*!40000 ALTER TABLE `peticiones` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'sergioaldavalde@gmail.com','5040578b48d03f65efa2c2335477144f','1'),(7,'cetisaldavalde@gmail.com','e10adc3949ba59abbe56e057f20f883e','2'),(9,'2022371061@uteq.edu.mx','e10adc3949ba59abbe56e057f20f883e','2'),(10,'123@gmail.com','202cb962ac59075b964b07152d234b70','2'),(11,'hola@gmail.com','e10adc3949ba59abbe56e057f20f883e','3'),(12,'123456@gmail.com','e10adc3949ba59abbe56e057f20f883e','3'),(13,'pp@gmail.com','c483f6ce851c9ecd9fb835ff7551737c','3'),(14,'lalala@gmail.com','b53b3a3d6ab90ce0268229151c9bde11','3'),(15,'ppq@gmailk.com','c20ad4d76fe97759aa27a0c99bff6710','3'),(16,'analiz@gmail.com','e10adc3949ba59abbe56e057f20f883e','3'),(17,'cami@gmail.com','f7177163c833dff4b38fc8d2872f1ec6','3'),(18,'aranzi@gmail.com','e10adc3949ba59abbe56e057f20f883e','3'),(19,'Arni@gmail.com','e10adc3949ba59abbe56e057f20f883e','3'),(20,'ivan@gmail.com','e10adc3949ba59abbe56e057f20f883e','3'),(21,'arnulfo@gmail.com','e10adc3949ba59abbe56e057f20f883e','3');
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

-- Dump completed on 2024-11-24 13:58:22
