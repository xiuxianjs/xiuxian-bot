/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 20:57:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_ring
-- ----------------------------
DROP TABLE IF EXISTS `user_ring`;
CREATE TABLE `user_ring` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL COMMENT '编号',
  `tid` int(11) DEFAULT NULL COMMENT '物品编号',
  `type` int(11) DEFAULT NULL COMMENT '物品类型',
  `name` varchar(20) DEFAULT '10' COMMENT '物品名',
  `acount` bigint(11) DEFAULT '1' COMMENT '数量',
  `doc` varchar(20) DEFAULT NULL COMMENT '说明',
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_bag_item_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=214864 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
