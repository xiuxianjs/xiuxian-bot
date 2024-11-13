/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 20:58:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_ass
-- ----------------------------
DROP TABLE IF EXISTS `user_ass`;
CREATE TABLE `user_ass` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_tiime` bigint(20) DEFAULT NULL COMMENT '加入时间',
  `uid` varchar(255) NOT NULL,
  `aid` bigint(20) NOT NULL,
  `contribute` bigint(20) DEFAULT '0' COMMENT '贡献',
  `authentication` int(11) DEFAULT NULL COMMENT '鉴权',
  `identity` varchar(50) DEFAULT NULL COMMENT '身份名',
  `signin` bigint(255) DEFAULT NULL COMMENT '签到',
  `doc` varchar(50) DEFAULT NULL COMMENT '关系表',
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_ass_item_uid` (`uid`),
  KEY `fk_user_ass_aid` (`aid`)
) ENGINE=InnoDB AUTO_INCREMENT=433 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
