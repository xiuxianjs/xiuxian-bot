/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 21:02:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ass_bag
-- ----------------------------
DROP TABLE IF EXISTS `ass_bag`;
CREATE TABLE `ass_bag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `aid` bigint(20) NOT NULL COMMENT '编号',
  `tid` int(11) DEFAULT NULL COMMENT '物品编号',
  `type` int(11) DEFAULT NULL COMMENT '物品类型',
  `name` varchar(20) DEFAULT '10' COMMENT '物品名',
  `acount` bigint(20) DEFAULT '1' COMMENT '数量',
  `doc` varchar(20) DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`id`),
  KEY `fk_user_bag_item_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=242881 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
