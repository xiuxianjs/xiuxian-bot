/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 20:59:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for skys
-- ----------------------------
DROP TABLE IF EXISTS `skys`;
CREATE TABLE `skys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `count` int(11) DEFAULT '1' COMMENT '数量',
  `ranking` int(11) DEFAULT NULL COMMENT '排名',
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleteAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_skys_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of skys
-- ----------------------------
BEGIN;
INSERT INTO `skys` (`id`, `name`, `count`, `ranking`, `createAt`, `updateAt`, `deleteAt`) VALUES (1, '极品灵石', 500, 20, NULL, '2024-05-05 18:38:22', NULL);
INSERT INTO `skys` (`id`, `name`, `count`, `ranking`, `createAt`, `updateAt`, `deleteAt`) VALUES (2, '极品灵石', 800, 10, NULL, '2024-05-05 18:38:26', NULL);
INSERT INTO `skys` (`id`, `name`, `count`, `ranking`, `createAt`, `updateAt`, `deleteAt`) VALUES (3, '饮血剑', 1, 3, NULL, '2024-05-05 02:40:26', NULL);
INSERT INTO `skys` (`id`, `name`, `count`, `ranking`, `createAt`, `updateAt`, `deleteAt`) VALUES (4, '开灵铲', 10, 10, NULL, '2024-05-05 02:40:22', NULL);
INSERT INTO `skys` (`id`, `name`, `count`, `ranking`, `createAt`, `updateAt`, `deleteAt`) VALUES (5, '极品灵石', 300, 30, NULL, '2024-05-05 18:36:10', NULL);
INSERT INTO `skys` (`id`, `name`, `count`, `ranking`, `createAt`, `updateAt`, `deleteAt`) VALUES (6, '极品灵石', 200, 40, NULL, '2024-05-05 18:36:08', NULL);
INSERT INTO `skys` (`id`, `name`, `count`, `ranking`, `createAt`, `updateAt`, `deleteAt`) VALUES (7, '极品灵石', 100, 50, NULL, NULL, NULL);
INSERT INTO `skys` (`id`, `name`, `count`, `ranking`, `createAt`, `updateAt`, `deleteAt`) VALUES (8, '极品灵石', 50, 100, NULL, '2024-10-17 22:39:30', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
