/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 20:57:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_fate
-- ----------------------------
DROP TABLE IF EXISTS `user_fate`;
CREATE TABLE `user_fate` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '本命数据',
  `uid` varbinary(50) NOT NULL COMMENT '编号',
  `name` varchar(20) DEFAULT NULL COMMENT '物品名',
  `grade` int(20) DEFAULT NULL COMMENT '等级',
  `doc` varchar(20) DEFAULT NULL COMMENT '说明',
  `update` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_equipment_item_name` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1114 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
