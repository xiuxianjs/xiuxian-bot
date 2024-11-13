/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 20:56:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_transactions_logs
-- ----------------------------
DROP TABLE IF EXISTS `user_transactions_logs`;
CREATE TABLE `user_transactions_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) DEFAULT NULL COMMENT '用户编号',
  `name` varchar(255) DEFAULT NULL COMMENT '物品名',
  `count` int(11) DEFAULT '0' COMMENT '物品数量',
  `price` int(11) DEFAULT '0',
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleteAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pk_uid` (`uid`),
  KEY `pk_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=529 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
