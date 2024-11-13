/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 21:00:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for levels_limit
-- ----------------------------
DROP TABLE IF EXISTS `levels_limit`;
CREATE TABLE `levels_limit` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `grade` bigint(20) DEFAULT NULL COMMENT '对应等级',
  `gids` varchar(255) DEFAULT NULL COMMENT '需要的物品',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of levels_limit
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
