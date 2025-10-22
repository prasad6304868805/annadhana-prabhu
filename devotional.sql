-- MySQL dump 10.13  Distrib 9.4.0, for macos15.4 (arm64)
--
-- Host: localhost    Database: devotional
-- ------------------------------------------------------
-- Server version	9.5.0

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'e429aa1c-af02-11f0-9b29-d98a28285325:1-29';

--
-- Table structure for table `biksha`
--

DROP TABLE IF EXISTS `biksha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `biksha` (
  `id` int NOT NULL AUTO_INCREMENT,
  `swamy_name` varchar(255) NOT NULL,
  `biksha_date` date NOT NULL,
  `biksha_time` time NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `location` varchar(255) NOT NULL,
  `near_landmark` varchar(255) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biksha`
--

LOCK TABLES `biksha` WRITE;
/*!40000 ALTER TABLE `biksha` DISABLE KEYS */;
INSERT INTO `biksha` VALUES (1,'prasad','2025-12-12','12:12:00','6304868805','vizag','rusikonda','530045'),(2,'nisanth','2025-12-12','12:12:00','6304868805','vizag','rusikonda','530045'),(3,'rahul','2025-12-12','00:12:00','6304868805','ranasthalam','rusikonda','530045'),(4,'veera','2025-12-12','00:12:00','6304868805','ranasthalam','rusikonda','530045'),(5,'prasad','2025-12-12','12:12:00','6304868805','ranasthalam','rusikonda','530045'),(6,'prasad','2025-12-12','23:21:00','6304868805','ranasthalam','rusikonda','530045'),(7,'nisanth','2025-12-12','00:12:00','6304868805','ranasthalam','rusikonda','530045'),(8,'jp','2025-12-12','11:11:00','6304868805','ranasthalam','rusikonda','530045');
/*!40000 ALTER TABLE `biksha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poojas`
--

DROP TABLE IF EXISTS `poojas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poojas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `head_name` varchar(255) NOT NULL,
  `pooja_date` date NOT NULL,
  `pooja_time` time NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `location` varchar(255) NOT NULL,
  `near_landmark` varchar(255) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poojas`
--

LOCK TABLES `poojas` WRITE;
/*!40000 ALTER TABLE `poojas` DISABLE KEYS */;
INSERT INTO `poojas` VALUES (1,'prasad','2025-12-12','12:12:00','6304868805','ranasthalam','rusikonda','530045'),(2,'veera','2025-12-12','12:12:00','6304868805','ranasthalam','rusikonda','530045');
/*!40000 ALTER TABLE `poojas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'devotional'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-23  0:12:32
