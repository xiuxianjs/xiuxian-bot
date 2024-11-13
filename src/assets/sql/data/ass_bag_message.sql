/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 21:01:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ass_bag_message
-- ----------------------------
DROP TABLE IF EXISTS `ass_bag_message`;
CREATE TABLE `ass_bag_message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `aid` varchar(255) NOT NULL COMMENT '宗门编号',
  `grade` int(11) DEFAULT '1' COMMENT '背包等级',
  PRIMARY KEY (`id`,`aid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8416 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
