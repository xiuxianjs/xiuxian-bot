/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 20:56:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users_email
-- ----------------------------
DROP TABLE IF EXISTS `users_email`;
CREATE TABLE `users_email` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `uid` varchar(255) DEFAULT NULL COMMENT '游戏id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
