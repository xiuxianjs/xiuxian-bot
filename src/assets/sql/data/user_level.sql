/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 20:57:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_level
-- ----------------------------
DROP TABLE IF EXISTS `user_level`;
CREATE TABLE `user_level` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `type` int(11) DEFAULT NULL COMMENT '境界类型',
  `career` int(11) DEFAULT '0' COMMENT '职业类型,非职业为0',
  `addition` int(11) DEFAULT NULL COMMENT '突破概率加成',
  `realm` bigint(20) DEFAULT NULL COMMENT '等级',
  `experience` bigint(20) DEFAULT NULL COMMENT '经验',
  `doc` varchar(20) DEFAULT NULL COMMENT '说明',
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73790 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
