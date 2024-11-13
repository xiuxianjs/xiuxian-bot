/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 20:57:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_log
-- ----------------------------
DROP TABLE IF EXISTS `user_log`;
CREATE TABLE `user_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `create_time` bigint(20) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `doc` varchar(20) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24914 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
