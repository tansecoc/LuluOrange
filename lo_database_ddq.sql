-- MySQL dump 10.16  Distrib 10.1.37-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: TBD
-- ------------------------------------------------------
-- Server version	10.1.37-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lo_customers`
--

DROP TABLE IF EXISTS `lo_customers`;
CREATE TABLE `lo_customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `customer_email` varchar(255),
  `customer_firstname` varchar(255),
  `customer_lastname` varchar(255),
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lo_customers`
--

LOCK TABLES `lo_customers` WRITE;
INSERT INTO `lo_customers` VALUES
(1, 'jkim@gmail.com', 'Jenny', 'Kim'),
(2, 'Paul@gmail.com', 'Paul', 'Smith');
UNLOCK TABLES;

--
-- Table structure for table `lo_genders`
--

DROP TABLE IF EXISTS `lo_genders`;
CREATE TABLE `lo_genders` (
  `gender_id` int NOT NULL AUTO_INCREMENT,
  `gender` char(1),
  `gender_description` varchar(255),
  PRIMARY KEY (`gender_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lo_genders`
--

LOCK TABLES `lo_genders` WRITE;
INSERT INTO `lo_genders` VALUES
(1, 'M', 'Male'),
(2, 'F', 'Female'),
(3, 'U', 'Unisex');
UNLOCK TABLES;

--
-- Table structure for table `lo_activities`
--

DROP TABLE IF EXISTS `lo_activities`;
CREATE TABLE `lo_activities` (
  `activity_id` int NOT NULL AUTO_INCREMENT,
  `activity_description` varchar(255) NOT NULL,
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lo_activities`
--

LOCK TABLES `lo_activities` WRITE;
INSERT INTO `lo_activities` VALUES
(1, 'Running'),
(2, 'Swimming'),
(3, 'Biking');
UNLOCK TABLES;

--
-- Table structure for table `lo_products`
--

DROP TABLE IF EXISTS `lo_products`;
CREATE TABLE `lo_products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_description` varchar(255),
  `gender_id` int,
  `activity_id` int,
  `product_price` decimal(6,2) NOT NULL,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `lo_products_fk_1` FOREIGN KEY (`gender_id`) REFERENCES `lo_genders` (`gender_id`),
  CONSTRAINT `lo_products_fk_2` FOREIGN KEY (`activity_id`) REFERENCES `lo_activities` (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lo_products`
--

LOCK TABLES `lo_products` WRITE;
INSERT INTO `lo_products` VALUES
(1, 'Leggings', 'Running tights made of Nylux.', 2, 1, 98),
(2, 'Vent Tech 2.0 Shirt', 'Tech running shirt made of Nylux.', 1, 1, 68),
(3, 'Cycle Shirt', 'Tech cycling shirt made of Nylux.', 2, 3, 88);
UNLOCK TABLES;

--
-- Table structure for table `lo_stores`
--

DROP TABLE IF EXISTS `lo_stores`;
CREATE TABLE `lo_stores` (
  `store_id` int NOT NULL AUTO_INCREMENT,
  `store_email` varchar(258) NOT NULL,
  `store_phone` varchar(258) NOT NULL,
  `store_country` varchar(258) NOT NULL,
  `store_street` varchar(258) NOT NULL,
  `store_city` varchar(258) NOT NULL,
  `store_state` varchar(258),
  `store_zip` varchar(258),
  PRIMARY KEY (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lo_stores`
--

LOCK TABLES `lo_stores` WRITE;
INSERT INTO `lo_stores` VALUES
(1, 'lulu1@luluorange.com', '732-517-4632', '217 Main Ave', 'New York', 'NY', 'USA', '10001'),
(2, 'lulu2@luluorange.com', '604-874-1234',	'970 Robson St', 'Vancouverk', 'BC', 'Canada', 'V6Z 2E7');
UNLOCK TABLES;

------------------------------------------------------------------------------------------
--
--   Placeholder for lo_orders and lo_orders_products tables
--
------------------------------------------------------------------------------------------


------------------------------------------------------------------------------------------
--
--   The below section includes the bsg tables as an example
--
------------------------------------------------------------------------------------------

--
-- Table structure for table `bsg_cert_people`
--

DROP TABLE IF EXISTS `bsg_cert_people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bsg_cert_people` (
  `cid` int(11) NOT NULL DEFAULT '0',
  `pid` int(11) NOT NULL DEFAULT '0',
  `certification_date` date NOT NULL,
  PRIMARY KEY (`cid`,`pid`),
  KEY `pid` (`pid`),
  CONSTRAINT `bsg_cert_people_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `bsg_cert` (`certification_id`),
  CONSTRAINT `bsg_cert_people_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `bsg_people` (`character_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bsg_cert_people`
--

LOCK TABLES `bsg_cert_people` WRITE;
/*!40000 ALTER TABLE `bsg_cert_people` DISABLE KEYS */;
/*!40000 ALTER TABLE `bsg_cert_people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bsg_people`
--

DROP TABLE IF EXISTS `bsg_people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bsg_people` (
  `character_id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `homeworld` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `race` varchar(5) NOT NULL DEFAULT 'Human',
  PRIMARY KEY (`character_id`),
  KEY `homeworld` (`homeworld`),
  CONSTRAINT `bsg_people_ibfk_1` FOREIGN KEY (`homeworld`) REFERENCES `bsg_planets` (`planet_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bsg_people`
--

LOCK TABLES `bsg_people` WRITE;
/*!40000 ALTER TABLE `bsg_people` DISABLE KEYS */;
INSERT INTO `bsg_people` VALUES (6,'Saul','Tigh',NULL,71,'Human'),(9,'Callandra','Henderson',NULL,NULL,'Human'),(121,'harry','goober',18,23,'Human'),(156,'','',1,0,'Human'),(157,'','',3,0,'Human'),(158,'The','Man',16,22,'Human');
/*!40000 ALTER TABLE `bsg_people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bsg_planets`
--

DROP TABLE IF EXISTS `bsg_planets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bsg_planets` (
  `planet_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `population` bigint(20) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `capital` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`planet_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bsg_planets`
--

LOCK TABLES `bsg_planets` WRITE;
/*!40000 ALTER TABLE `bsg_planets` DISABLE KEYS */;
INSERT INTO `bsg_planets` VALUES (1,'Gemenon',2800000000,'Old Gemenese','Oranu'),(2,'Leonis',2600000000,'Leonese','Luminere'),(3,'Caprica',4900000000,'Caprican','Caprica City'),(7,'Sagittaron',1700000000,NULL,'Tawa'),(16,'Aquaria',25000,NULL,NULL),(17,'Canceron',6700000000,NULL,'Hades'),(18,'Libran',2100000,NULL,NULL),(19,'Picon',1400000000,NULL,'Queestown'),(20,'Scorpia',450000000,NULL,'Celeste'),(21,'Tauron',2500000000,'Tauron','Hypatia'),(22,'Virgon',4300000000,NULL,'Boskirk');
/*!40000 ALTER TABLE `bsg_planets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bsg_spaceship`
--

DROP TABLE IF EXISTS `bsg_spaceship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bsg_spaceship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `seperate_saucer_section` bit(1) DEFAULT b'0',
  `length` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bsg_spaceship`
--

LOCK TABLES `bsg_spaceship` WRITE;
/*!40000 ALTER TABLE `bsg_spaceship` DISABLE KEYS */;
INSERT INTO `bsg_spaceship` VALUES (1,'t1','',0),(2,'t2','',0),(3,'t2','',0),(4,'t3','',0),(5,'t4','\0',0),(6,'t5','',0);
/*!40000 ALTER TABLE `bsg_spaceship` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-03  0:38:33
