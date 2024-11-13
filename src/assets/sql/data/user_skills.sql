/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 20:57:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_skills
-- ----------------------------
DROP TABLE IF EXISTS `user_skills`;
CREATE TABLE `user_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL COMMENT '玩家编号',
  `name` varchar(20) DEFAULT NULL COMMENT '功法名',
  `doc` varchar(20) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_skills_item_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=118158 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
