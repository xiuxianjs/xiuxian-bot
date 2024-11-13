/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 20:58:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_equipment
-- ----------------------------
DROP TABLE IF EXISTS `user_equipment`;
CREATE TABLE `user_equipment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `doc` varchar(20) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_equipment_item_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=28178 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
