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
  `customer_email` varchar(255) NOT NULL,
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
  `gender` varchar(255) NOT NULL,
  PRIMARY KEY (`gender_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lo_genders`
--

LOCK TABLES `lo_genders` WRITE;
INSERT INTO `lo_genders` VALUES
(1, 'Male'),
(2, 'Female'),
(3, 'Unisex');
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
(2, 'lulu2@luluorange.com', '604-874-1234', '970 Robson St', 'Vancouverk', 'BC', 'Canada', 'V6Z 2E7');
UNLOCK TABLES;

--
-- Table structure for table `lo_orders`
--
DROP TABLE IF EXISTS `lo_orders`;
CREATE TABLE `lo_orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `store_id` int,
  `order_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  CONSTRAINT `lo_orders_fk_customer` FOREIGN KEY (`customer_id`) REFERENCES `lo_customers` (`customer_id`),
  CONSTRAINT `lo_orders_fk_store` FOREIGN KEY (`store_id`) REFERENCES `lo_stores` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lo_orders`
--

LOCK TABLES `lo_orders` WRITE;
INSERT INTO `lo_orders` VALUES
(1, 2, 1, '2021-01-01 00:00:01'),
(2, 1, 2, '2021-01-01 00:00:01');
UNLOCK TABLES;

--
-- Table structure for table `lo_orders`
--
DROP TABLE IF EXISTS `lo_orders_products`;
CREATE TABLE `lo_orders_products` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `selling_price` DECIMAL(6,2) not NULL,
  PRIMARY KEY (`order_id`, `product_id`),
  CONSTRAINT `lo_orders_products_order_id` FOREIGN KEY (`order_id`) REFERENCES `lo_orders` (`order_id`),
  CONSTRAINT `lo_orders_products_product_id` FOREIGN KEY (`product_id`) REFERENCES `lo_products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lo_orders_products`
--

LOCK TABLES `lo_orders_products` WRITE;
INSERT INTO `lo_orders_products` VALUES
(1, 2, 1, 59.99),
(2, 1, 2, 325.00);
UNLOCK TABLES;
