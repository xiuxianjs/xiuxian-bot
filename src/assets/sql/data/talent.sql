/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 20:59:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for talent
-- ----------------------------
DROP TABLE IF EXISTS `talent`;
CREATE TABLE `talent` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `doc` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of talent
-- ----------------------------
BEGIN;
INSERT INTO `talent` (`id`, `name`, `doc`) VALUES (1, '金', NULL);
INSERT INTO `talent` (`id`, `name`, `doc`) VALUES (2, '木', NULL);
INSERT INTO `talent` (`id`, `name`, `doc`) VALUES (3, '水', NULL);
INSERT INTO `talent` (`id`, `name`, `doc`) VALUES (4, '火', NULL);
INSERT INTO `talent` (`id`, `name`, `doc`) VALUES (5, '土', NULL);
INSERT INTO `talent` (`id`, `name`, `doc`) VALUES (6, '暗', NULL);
INSERT INTO `talent` (`id`, `name`, `doc`) VALUES (7, '雷', NULL);
INSERT INTO `talent` (`id`, `name`, `doc`) VALUES (8, '冰', NULL);
INSERT INTO `talent` (`id`, `name`, `doc`) VALUES (9, '光', NULL);
INSERT INTO `talent` (`id`, `name`, `doc`) VALUES (10, '风', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
