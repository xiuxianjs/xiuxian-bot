/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 20:58:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_buy_log
-- ----------------------------
DROP TABLE IF EXISTS `user_buy_log`;
CREATE TABLE `user_buy_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `count` int(11) DEFAULT '0',
  `buy_time` datetime DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleteAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_buy_log_name` (`name`),
  KEY `fk_user_buy_log_uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
