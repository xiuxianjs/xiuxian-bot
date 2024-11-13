/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 21:00:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for goods_drops
-- ----------------------------
DROP TABLE IF EXISTS `goods_drops`;
CREATE TABLE `goods_drops` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `gid` bigint(20) DEFAULT NULL,
  `limit_buy` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_goods_drops_item_gid` (`gid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of goods_drops
-- ----------------------------
BEGIN;
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (1, 700401, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (2, 700402, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (3, 700403, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (4, 700404, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (5, 700405, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (6, 700406, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (7, 700407, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (8, 700408, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (9, 700409, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (10, 700410, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (11, 700411, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (12, 700412, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (13, 700413, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (14, 700414, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (15, 700415, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (16, 700416, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (17, 700417, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (18, 700418, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (19, 700419, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (20, 700420, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (21, 700421, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (22, 700422, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (23, 700423, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (24, 700424, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (25, 700425, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (26, 700426, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (27, 700427, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (28, 700428, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (29, 700429, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (30, 700430, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (31, 700431, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (32, 700432, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (33, 700433, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (34, 700434, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (35, 700435, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (36, 700436, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (37, 700437, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (38, 700438, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (39, 700439, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (40, 700440, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (41, 700441, 99999);
INSERT INTO `goods_drops` (`id`, `gid`, `limit_buy`) VALUES (42, 700442, 99999);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
