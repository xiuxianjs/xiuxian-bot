/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 20:58:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_ass_apply
-- ----------------------------
DROP TABLE IF EXISTS `user_ass_apply`;
CREATE TABLE `user_ass_apply` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `aid` bigint(20) DEFAULT NULL,
  `uid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_ass_apply_item_uid` (`uid`) USING BTREE,
  KEY `fk_user_ass_apply_aid` (`aid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
