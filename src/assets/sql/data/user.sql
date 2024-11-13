/*
 Navicat Premium Data Transfer

 Date: 13/11/2024 20:58:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) DEFAULT NULL COMMENT '编号',
  `create_time` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime(3) DEFAULT NULL COMMENT '更新时间',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `password` varchar(25) DEFAULT '123456' COMMENT '密码',
  `name` varchar(25) DEFAULT '空' COMMENT '姓名',
  `autograph` varchar(100) DEFAULT '无' COMMENT '个性签名',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像地址',
  `phone` bigint(20) DEFAULT NULL COMMENT '手机号',
  `state` bigint(20) DEFAULT '0' COMMENT '状态标记',
  `state_start_time` bigint(20) DEFAULT '9999999999999' COMMENT '状态开始时间',
  `state_end_time` bigint(20) DEFAULT '9999999999999' COMMENT '状态结束时间',
  `age` bigint(20) DEFAULT '1' COMMENT '当前寿命',
  `theme` varchar(255) DEFAULT 'dark' COMMENT '主题',
  `age_limit` bigint(20) DEFAULT '100' COMMENT '寿命上限',
  `age_state` bigint(20) DEFAULT '1' COMMENT '寿命状态',
  `point_type` bigint(20) DEFAULT '0' COMMENT '地点编号',
  `pont_attribute` bigint(20) DEFAULT '0' COMMENT '地点属性_默认0',
  `pont_x` bigint(20) DEFAULT '0' COMMENT '地点x轴_默认0',
  `pont_y` bigint(20) DEFAULT '0' COMMENT '地点y轴_默认0',
  `battle_show` bigint(20) DEFAULT '0' COMMENT '是否现实战斗过程',
  `pont_z` bigint(20) DEFAULT '0' COMMENT '地点z轴_默认0',
  `battle_blood_now` bigint(20) DEFAULT '0' COMMENT '当前血量',
  `battle_blood_limit` bigint(20) DEFAULT '0' COMMENT '血量上限',
  `battle_attack` bigint(20) DEFAULT '0' COMMENT '攻击',
  `battle_defense` bigint(20) DEFAULT '0' COMMENT '防御',
  `battle_speed` bigint(20) DEFAULT '0' COMMENT '敏捷',
  `battle_power` bigint(20) DEFAULT '0' COMMENT '战力',
  `battle_critical_hit` bigint(20) DEFAULT '0' COMMENT '暴击率',
  `battle_critical_damage` bigint(20) DEFAULT '50' COMMENT '暴击伤害',
  `special_reputation` bigint(20) DEFAULT '0' COMMENT '声望',
  `special_prestige` bigint(20) DEFAULT '30' COMMENT '煞气',
  `special_spiritual` bigint(20) DEFAULT '100' COMMENT '灵力',
  `special_spiritual_limit` bigint(20) DEFAULT '100' COMMENT '灵力上限',
  `special_virtues` bigint(20) DEFAULT '0' COMMENT '功德',
  `talent` json DEFAULT NULL COMMENT '灵根',
  `talent_size` bigint(20) DEFAULT '0' COMMENT '天赋',
  `talent_show` bigint(20) DEFAULT '0' COMMENT '是否显示灵根',
  `sign_day` bigint(20) DEFAULT '0' COMMENT '签到天数',
  `sign_math` bigint(20) DEFAULT '1' COMMENT '签到月',
  `sign_size` bigint(20) DEFAULT '1' COMMENT '签到大小',
  `sign_time` bigint(20) DEFAULT '0' COMMENT '签到时间',
  `bag_grade` bigint(20) DEFAULT '1' COMMENT '背包等级',
  `newcomer_gift` bigint(20) DEFAULT '0' COMMENT '是否是新人',
  `point_attribute` bigint(20) DEFAULT '0' COMMENT '地点属性',
  `point_x` bigint(20) DEFAULT '0' COMMENT '坐标',
  `point_y` bigint(20) DEFAULT '0' COMMENT '坐标',
  `point_z` bigint(20) DEFAULT '0' COMMENT '坐标',
  `doc` varchar(20) DEFAULT NULL COMMENT '说明',
  `man_size` int(11) DEFAULT '0' COMMENT '南天宫',
  `dong_size` int(11) DEFAULT '0' COMMENT '东湖宫',
  `dong_minit` int(11) DEFAULT '0' COMMENT '东湖宫',
  `delete` int(11) DEFAULT '1',
  `sign_in_count` int(11) DEFAULT '0' COMMENT '签到次数',
  `sign_in_month_count` int(11) DEFAULT '0',
  `sign_in_time` datetime DEFAULT NULL,
  `typing` int(11) DEFAULT '1' COMMENT '类型',
  `deleteAt` datetime DEFAULT NULL,
  `constitution` bigint(20) DEFAULT '1' COMMENT '体质',
  `immortal_grade` bigint(20) DEFAULT '0' COMMENT '仙人等级',
  `immortal_constitution` bigint(20) DEFAULT '1' COMMENT '仙骨',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `idx_uid_unique` (`uid`),
  KEY `idx_uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=12850 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
