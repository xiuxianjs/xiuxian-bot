/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 20:58:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_bag_message
-- ----------------------------
DROP TABLE IF EXISTS `user_bag_message`;
CREATE TABLE `user_bag_message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) NOT NULL COMMENT '用户编号',
  `grade` int(11) DEFAULT '1' COMMENT '背包等级',
  PRIMARY KEY (`id`,`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8486 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
