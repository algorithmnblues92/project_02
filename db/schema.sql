CREATE DATABASE IF NOT EXISTS `nodelogin`;
USE `nodelogin`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (DEFAULT, 'test', 'test', 'test@test.com');