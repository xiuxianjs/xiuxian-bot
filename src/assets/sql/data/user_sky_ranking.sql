/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 20:57:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_sky_ranking
-- ----------------------------
DROP TABLE IF EXISTS `user_sky_ranking`;
CREATE TABLE `user_sky_ranking` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '通天塔',
  `uid` varchar(50) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `doc` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=386 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
