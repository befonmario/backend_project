-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: backend_befon
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `answeruser`
--

DROP TABLE IF EXISTS `answeruser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answeruser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quizId` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `attemptedQuestion` json NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `answeruser_quizzes_FK` (`quizId`),
  CONSTRAINT `answeruser_quizzes_FK` FOREIGN KEY (`quizId`) REFERENCES `quizzes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answeruser`
--

LOCK TABLES `answeruser` WRITE;
/*!40000 ALTER TABLE `answeruser` DISABLE KEYS */;
INSERT INTO `answeruser` VALUES (1,'b3c25b4e-6fa1-4b27-b0a4-eda9b01c33af','{\"1\": 2}',''),(2,'b3c25b4e-6fa1-4b27-b0a4-eda9b01c33af','{\"1\": 2}','mario'),(3,'1425d208-f264-4661-96ed-7bf75186bbad','{\"1\": 2, \"2\": 1}','mario'),(4,'1425d208-f264-4661-96ed-7bf75186bbad','{\"1\": 2, \"2\": 1}','befonn'),(6,'b3c25b4e-6fa1-4b27-b0a4-eda9b01c33af','{\"1\": 2, \"2\": 1}','befonn'),(7,'b3c25b4e-6fa1-4b27-b0a4-eda9b01c33af','{\"1\": 2, \"2\": 1}','befonn');
/*!40000 ALTER TABLE `answeruser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quizresult`
--

DROP TABLE IF EXISTS `quizresult`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quizresult` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `quizId` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `score` int NOT NULL,
  `attemptNo` int NOT NULL,
  `answerUserId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quizresult_quizzes_FK` (`quizId`),
  KEY `quizresult_users_FK` (`userId`),
  KEY `quizresult_answeruser_FK` (`answerUserId`),
  CONSTRAINT `quizresult_answeruser_FK` FOREIGN KEY (`answerUserId`) REFERENCES `answeruser` (`id`),
  CONSTRAINT `quizresult_quizzes_FK` FOREIGN KEY (`quizId`) REFERENCES `quizzes` (`id`),
  CONSTRAINT `quizresult_users_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizresult`
--

LOCK TABLES `quizresult` WRITE;
/*!40000 ALTER TABLE `quizresult` DISABLE KEYS */;
/*!40000 ALTER TABLE `quizresult` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quizzes`
--

DROP TABLE IF EXISTS `quizzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quizzes` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `data` json NOT NULL,
  `isPublished` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizzes`
--

LOCK TABLES `quizzes` WRITE;
/*!40000 ALTER TABLE `quizzes` DISABLE KEYS */;
INSERT INTO `quizzes` VALUES ('1425d208-f264-4661-96ed-7bf75186bbad','Quiz 2','{\"answer\": {\"1\": 2, \"2\": 1}, \"questions_list\": [{\"options\": {\"1\": \"Depok\", \"2\": \"DKI Jakarta\", \"3\": \"Bandung\", \"4\": \"Makassar\"}, \"question\": \"ibukota indonesia adalah?\", \"question_number\": 1}, {\"options\": {\"1\": \"1945\", \"2\": \"1954\", \"3\": \"1960\", \"4\": \"1955\"}, \"question\": \"Indonesia merdeka pada tahun?\", \"question_number\": 2}]}',1),('4c5b1aa9-8941-4dc5-89d9-837b289f55be','Quiz 3','{\"answer\": {\"1\": 2, \"2\": 1}, \"questions_list\": [{\"options\": {\"1\": \"Depok\", \"2\": \"DKI Jakarta\", \"3\": \"Bandung\", \"4\": \"Makassar\"}, \"question\": \"ibukota indonesia adalah?\", \"question_number\": 1}, {\"options\": {\"1\": \"1945\", \"2\": \"1954\", \"3\": \"1960\", \"4\": \"1955\"}, \"question\": \"Indonesia merdeka pada tahun?\", \"question_number\": 2}]}',0),('b3c25b4e-6fa1-4b27-b0a4-eda9b01c33af','Quiz 1','{\"answer\": {\"1\": 2}, \"questions_list\": [{\"options\": {\"1\": \"2\", \"2\": \"4\", \"3\": \"6\", \"4\": \"8\"}, \"question\": \"2 times 2 equals?\", \"question_number\": 1}]}',1);
/*!40000 ALTER TABLE `quizzes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` enum('superadmin','admin','user') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'user',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'noir123','befonn','$2b$10$PE3icu/T1S1HvTVwhPvcTO7bQwrlQnTmCyDE6tFynRD4jg3TJx2PS','noir@gmail.com','user','2024-04-20 18:00:41','2024-04-20 18:00:41'),(7,'mario123','mario','$2b$10$aCwh9ROWawG7iTzT4fyGCuyTGfACLUmHsuIWh/K7v7DYXkHI9FOr.','mario@gmail.com','superadmin','2024-04-29 23:17:24','2024-04-29 23:17:24');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'backend_befon'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-30 14:13:18
