/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 21:02:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ass
-- ----------------------------
DROP TABLE IF EXISTS `ass`;
CREATE TABLE `ass` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `create_time` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `name` varchar(50) NOT NULL,
  `typing` int(11) NOT NULL COMMENT '类型,不同的类型文本不同',
  `grade` bigint(20) DEFAULT '0' COMMENT '等级,限制人数',
  `bag_grade` int(11) DEFAULT '0' COMMENT '藏宝阁等级',
  `property` bigint(20) NOT NULL COMMENT '灵石',
  `fame` bigint(20) DEFAULT '0' COMMENT '名气',
  `activation` bigint(20) DEFAULT '0' COMMENT '活跃度',
  `doc` varchar(50) DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`id`),
  KEY `pk_ass_item_typing` (`typing`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
