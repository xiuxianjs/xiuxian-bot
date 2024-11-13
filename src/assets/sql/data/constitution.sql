/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 21:01:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for constitution
-- ----------------------------
DROP TABLE IF EXISTS `constitution`;
CREATE TABLE `constitution` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `grade` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of constitution
-- ----------------------------
BEGIN;
INSERT INTO `constitution` (`id`, `name`, `grade`) VALUES (1, '非酱体', 1);
INSERT INTO `constitution` (`id`, `name`, `grade`) VALUES (2, '无为体', 1);
INSERT INTO `constitution` (`id`, `name`, `grade`) VALUES (3, '霸王体', 1);
INSERT INTO `constitution` (`id`, `name`, `grade`) VALUES (4, '万雷灵体', 2);
INSERT INTO `constitution` (`id`, `name`, `grade`) VALUES (5, '不朽灵体', 2);
INSERT INTO `constitution` (`id`, `name`, `grade`) VALUES (6, '焚天灵体', 2);
INSERT INTO `constitution` (`id`, `name`, `grade`) VALUES (7, '纯水灵体', 2);
INSERT INTO `constitution` (`id`, `name`, `grade`) VALUES (8, '护岩灵体', 2);
INSERT INTO `constitution` (`id`, `name`, `grade`) VALUES (9, '星辰之体', 3);
INSERT INTO `constitution` (`id`, `name`, `grade`) VALUES (10, '九天之体', 3);
INSERT INTO `constitution` (`id`, `name`, `grade`) VALUES (11, '祖龙之体', 3);
INSERT INTO `constitution` (`id`, `name`, `grade`) VALUES (12, '恶魔圣体', 4);
INSERT INTO `constitution` (`id`, `name`, `grade`) VALUES (13, '无垢圣体', 4);
INSERT INTO `constitution` (`id`, `name`, `grade`) VALUES (14, '无极圣体', 4);
INSERT INTO `constitution` (`id`, `name`, `grade`) VALUES (15, '时空仙体', 5);
INSERT INTO `constitution` (`id`, `name`, `grade`) VALUES (16, '混沌仙体', 5);
INSERT INTO `constitution` (`id`, `name`, `grade`) VALUES (17, '鸿蒙仙体', 5);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
