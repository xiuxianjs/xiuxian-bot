/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 20:56:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_skys
-- ----------------------------
DROP TABLE IF EXISTS `user_skys`;
CREATE TABLE `user_skys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) DEFAULT NULL,
  `sid` int(11) DEFAULT '1' COMMENT '奖励编号',
  `time` datetime DEFAULT NULL COMMENT '本次记录',
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleteAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_skys_uid` (`uid`),
  KEY `fk_user_skys_sid` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=1101 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
