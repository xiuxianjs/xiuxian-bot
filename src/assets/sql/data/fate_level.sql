/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 21:01:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for fate_level
-- ----------------------------
DROP TABLE IF EXISTS `fate_level`;
CREATE TABLE `fate_level` (
  `id` int(11) NOT NULL,
  `grade` int(11) DEFAULT NULL COMMENT '等级',
  `exp_gaspractice` int(11) DEFAULT '0',
  `exp_bodypractice` int(11) DEFAULT '0',
  `exp_soul` int(11) DEFAULT '0',
  `doc` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of fate_level
-- ----------------------------
BEGIN;
INSERT INTO `fate_level` (`id`, `grade`, `exp_gaspractice`, `exp_bodypractice`, `exp_soul`, `doc`) VALUES (0, 0, 72000, 63000, 54000, '');
INSERT INTO `fate_level` (`id`, `grade`, `exp_gaspractice`, `exp_bodypractice`, `exp_soul`, `doc`) VALUES (1, 1, 81000, 72000, 63000, NULL);
INSERT INTO `fate_level` (`id`, `grade`, `exp_gaspractice`, `exp_bodypractice`, `exp_soul`, `doc`) VALUES (2, 2, 90000, 81000, 72000, NULL);
INSERT INTO `fate_level` (`id`, `grade`, `exp_gaspractice`, `exp_bodypractice`, `exp_soul`, `doc`) VALUES (3, 3, 180000, 90000, 81000, NULL);
INSERT INTO `fate_level` (`id`, `grade`, `exp_gaspractice`, `exp_bodypractice`, `exp_soul`, `doc`) VALUES (4, 4, 270000, 180000, 90000, NULL);
INSERT INTO `fate_level` (`id`, `grade`, `exp_gaspractice`, `exp_bodypractice`, `exp_soul`, `doc`) VALUES (5, 5, 360000, 270000, 180000, NULL);
INSERT INTO `fate_level` (`id`, `grade`, `exp_gaspractice`, `exp_bodypractice`, `exp_soul`, `doc`) VALUES (6, 6, 450000, 360000, 270000, NULL);
INSERT INTO `fate_level` (`id`, `grade`, `exp_gaspractice`, `exp_bodypractice`, `exp_soul`, `doc`) VALUES (7, 7, 540000, 450000, 360000, NULL);
INSERT INTO `fate_level` (`id`, `grade`, `exp_gaspractice`, `exp_bodypractice`, `exp_soul`, `doc`) VALUES (8, 8, 630000, 540000, 450000, NULL);
INSERT INTO `fate_level` (`id`, `grade`, `exp_gaspractice`, `exp_bodypractice`, `exp_soul`, `doc`) VALUES (9, 9, 720000, 630000, 540000, NULL);
INSERT INTO `fate_level` (`id`, `grade`, `exp_gaspractice`, `exp_bodypractice`, `exp_soul`, `doc`) VALUES (10, 10, 810000, 720000, 630000, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
