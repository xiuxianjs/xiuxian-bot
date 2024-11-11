/*
 Navicat Premium Data Transfer
 Date: 11/11/2024 15:23:52
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

-- ----------------------------
-- Table structure for ass_bag_message
-- ----------------------------
DROP TABLE IF EXISTS `ass_bag_message`;
CREATE TABLE `ass_bag_message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `aid` varchar(255) NOT NULL COMMENT '宗门编号',
  `grade` int(11) DEFAULT '1' COMMENT '背包等级',
  PRIMARY KEY (`id`,`aid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8416 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for ass_typing
-- ----------------------------
DROP TABLE IF EXISTS `ass_typing`;
CREATE TABLE `ass_typing` (
  `id` int(11) NOT NULL,
  `master` varchar(255) DEFAULT NULL COMMENT '主人',
  `vice_master` varchar(255) DEFAULT NULL COMMENT '副主人',
  `super_admin` varchar(255) DEFAULT NULL COMMENT '超级管理员',
  `admin` varchar(255) DEFAULT NULL COMMENT '管理员',
  `core_member` varchar(255) DEFAULT NULL COMMENT '核心成员',
  `senior_menber` varchar(255) DEFAULT NULL COMMENT '高级成员',
  `intermediate_member` varchar(255) DEFAULT NULL COMMENT '中级成员',
  `lowerlevel_member` varchar(255) DEFAULT NULL COMMENT '低级成员',
  `tagged_member` varchar(255) DEFAULT NULL COMMENT '标记成员',
  `reviewed_member` varchar(255) DEFAULT NULL COMMENT '待审核成员',
  `doc` varchar(255) DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for email
-- ----------------------------
DROP TABLE IF EXISTS `email`;
CREATE TABLE `email` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `uid` varchar(255) DEFAULT NULL COMMENT '游戏id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

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
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL COMMENT '名字唯一',
  `type` int(11) DEFAULT '1' COMMENT '类型',
  `monster_type` int(11) DEFAULT '0' COMMENT '怪物类型',
  `grade` int(11) DEFAULT '1' COMMENT '物品种类等级',
  `addition` varchar(20) DEFAULT 'blood' COMMENT '属性',
  `talent` json DEFAULT NULL COMMENT '属性',
  `wheeldisc` int(11) DEFAULT '0' COMMENT '命运转盘----特殊物品',
  `commodities` int(11) DEFAULT '0' COMMENT '万宝楼------基础物品',
  `alliancemall` int(11) DEFAULT '0' COMMENT '联盟商城------稀有物品',
  `palace` int(11) DEFAULT '0' COMMENT '日常物品',
  `limit` int(11) DEFAULT '0' COMMENT '限定物品---1为普通 2为版本|绝版 3为极品',
  `drops` int(11) DEFAULT '0' COMMENT '怪物掉落：材料',
  `boolere_covery` int(11) DEFAULT NULL,
  `attack` int(11) DEFAULT '0' COMMENT '攻击',
  `defense` int(11) DEFAULT '0' COMMENT '防御',
  `blood` int(11) DEFAULT '0' COMMENT '血量',
  `critical_hit` int(11) DEFAULT '0' COMMENT '暴击',
  `critical_damage` int(11) DEFAULT '0' COMMENT '暴伤',
  `exp_gaspractice` int(11) DEFAULT '0' COMMENT '气境',
  `exp_bodypractice` int(11) DEFAULT '0' COMMENT '体境',
  `exp_soul` int(11) DEFAULT '0' COMMENT '魂境',
  `size` int(11) DEFAULT '0',
  `speed` int(11) DEFAULT '0' COMMENT '敏捷',
  `price` int(11) NOT NULL DEFAULT '100' COMMENT '价格',
  `limit_buy` int(11) DEFAULT '99999' COMMENT '购买限制',
  `doc` varchar(20) DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`id`,`name`) USING BTREE,
  UNIQUE KEY `idx_name_unique` (`name`),
  UNIQUE KEY `uq_goods_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for goods_alliancemall
-- ----------------------------
DROP TABLE IF EXISTS `goods_alliancemall`;
CREATE TABLE `goods_alliancemall` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `gid` bigint(20) DEFAULT NULL,
  `limit_buy` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_goods_alliancemall_item_gid` (`gid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=210 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for goods_commodities
-- ----------------------------
DROP TABLE IF EXISTS `goods_commodities`;
CREATE TABLE `goods_commodities` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `gid` bigint(20) DEFAULT NULL,
  `limit_buy` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_goods_commodities_item_gid` (`gid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4;

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
-- Table structure for goods_limit
-- ----------------------------
DROP TABLE IF EXISTS `goods_limit`;
CREATE TABLE `goods_limit` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `gid` bigint(20) DEFAULT NULL,
  `limit_buy` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_goods_limit_item_gid` (`gid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for goods_palace
-- ----------------------------
DROP TABLE IF EXISTS `goods_palace`;
CREATE TABLE `goods_palace` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `gid` bigint(20) DEFAULT NULL,
  `limit_buy` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_goods_palace_item_gid` (`gid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for goods_wheeldisc
-- ----------------------------
DROP TABLE IF EXISTS `goods_wheeldisc`;
CREATE TABLE `goods_wheeldisc` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `gid` bigint(20) DEFAULT NULL,
  `limit_buy` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_goods_wheeldisc_item_gid` (`gid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for levels
-- ----------------------------
DROP TABLE IF EXISTS `levels`;
CREATE TABLE `levels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL,
  `grade` int(20) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `attack` int(11) DEFAULT NULL,
  `defense` int(11) DEFAULT NULL,
  `blood` int(11) DEFAULT NULL,
  `critical_hit` int(11) DEFAULT NULL COMMENT '暴击率',
  `critical_damage` int(11) DEFAULT NULL COMMENT '暴击伤害',
  `speed` int(11) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `soul` int(11) DEFAULT NULL,
  `exp_needed` int(11) DEFAULT NULL,
  `success_rate` int(11) DEFAULT '10' COMMENT '成功率',
  `doc` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for map_point
-- ----------------------------
DROP TABLE IF EXISTS `map_point`;
CREATE TABLE `map_point` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL COMMENT '名称',
  `type` int(11) DEFAULT NULL COMMENT '地点编号',
  `grade` int(11) DEFAULT NULL COMMENT '等级',
  `attribute` int(11) DEFAULT NULL COMMENT '属性',
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `z` int(11) DEFAULT NULL,
  `doc` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1302 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for map_position
-- ----------------------------
DROP TABLE IF EXISTS `map_position`;
CREATE TABLE `map_position` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `grade` int(11) DEFAULT NULL,
  `attribute` int(11) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `x1` int(11) DEFAULT NULL,
  `x2` int(11) DEFAULT NULL,
  `y1` int(11) DEFAULT NULL,
  `y2` int(11) DEFAULT NULL,
  `z1` int(11) DEFAULT NULL,
  `z2` int(11) DEFAULT NULL,
  `doc` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `idx_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for map_treasure
-- ----------------------------
DROP TABLE IF EXISTS `map_treasure`;
CREATE TABLE `map_treasure` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `attribute` int(11) DEFAULT NULL,
  `acount` int(11) DEFAULT NULL,
  `x` bigint(20) DEFAULT NULL,
  `y` bigint(20) DEFAULT NULL,
  `z` bigint(20) DEFAULT NULL,
  `doc` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3163 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for monster
-- ----------------------------
DROP TABLE IF EXISTS `monster`;
CREATE TABLE `monster` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(20) DEFAULT NULL,
  `grade` int(11) DEFAULT NULL COMMENT '最低等级',
  `name` varchar(20) DEFAULT NULL,
  `doc` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for sky
-- ----------------------------
DROP TABLE IF EXISTS `sky`;
CREATE TABLE `sky` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '通天塔',
  `uid` varchar(50) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `doc` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=384 DEFAULT CHARSET=utf8mb4;

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
-- Table structure for transactions
-- ----------------------------
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) DEFAULT NULL COMMENT '用户编号',
  `name` varchar(255) DEFAULT NULL COMMENT '物品名',
  `count` int(11) DEFAULT '0' COMMENT '物品数量',
  `price` int(11) DEFAULT '0',
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleteAt` datetime DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_transactions_name` (`name`),
  KEY `fk_transactions_uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=529 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for transactions_logs
-- ----------------------------
DROP TABLE IF EXISTS `transactions_logs`;
CREATE TABLE `transactions_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) DEFAULT NULL COMMENT '用户编号',
  `name` varchar(255) DEFAULT NULL COMMENT '物品名',
  `count` int(11) DEFAULT '0' COMMENT '物品数量',
  `price` int(11) DEFAULT '0',
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleteAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pk_uid` (`uid`),
  KEY `pk_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=529 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for txt
-- ----------------------------
DROP TABLE IF EXISTS `txt`;
CREATE TABLE `txt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `doc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2011 DEFAULT CHARSET=utf8mb4;

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
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `idx_uid_unique` (`uid`),
  KEY `idx_uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=12842 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_ass
-- ----------------------------
DROP TABLE IF EXISTS `user_ass`;
CREATE TABLE `user_ass` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_tiime` bigint(20) DEFAULT NULL COMMENT '加入时间',
  `uid` varchar(255) NOT NULL,
  `aid` bigint(20) NOT NULL,
  `contribute` bigint(20) DEFAULT '0' COMMENT '贡献',
  `authentication` int(11) DEFAULT NULL COMMENT '鉴权',
  `identity` varchar(50) DEFAULT NULL COMMENT '身份名',
  `signin` bigint(255) DEFAULT NULL COMMENT '签到',
  `doc` varchar(50) DEFAULT NULL COMMENT '关系表',
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_ass_item_uid` (`uid`),
  KEY `fk_user_ass_aid` (`aid`)
) ENGINE=InnoDB AUTO_INCREMENT=433 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_ass_apply
-- ----------------------------
DROP TABLE IF EXISTS `user_ass_apply`;
CREATE TABLE `user_ass_apply` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `aid` bigint(20) DEFAULT NULL,
  `uid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_ass_apply_item_uid` (`uid`) USING BTREE,
  KEY `fk_user_ass_apply_aid` (`aid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_bag
-- ----------------------------
DROP TABLE IF EXISTS `user_bag`;
CREATE TABLE `user_bag` (
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
) ENGINE=InnoDB AUTO_INCREMENT=395506 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_bag_message
-- ----------------------------
DROP TABLE IF EXISTS `user_bag_message`;
CREATE TABLE `user_bag_message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) NOT NULL COMMENT '用户编号',
  `grade` int(11) DEFAULT '1' COMMENT '背包等级',
  PRIMARY KEY (`id`,`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8478 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_buy_log
-- ----------------------------
DROP TABLE IF EXISTS `user_buy_log`;
CREATE TABLE `user_buy_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `count` int(11) DEFAULT '0',
  `buy_time` datetime DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleteAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_buy_log_name` (`name`),
  KEY `fk_user_buy_log_uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_email
-- ----------------------------
DROP TABLE IF EXISTS `user_email`;
CREATE TABLE `user_email` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) DEFAULT NULL COMMENT '平台uid',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_equipment
-- ----------------------------
DROP TABLE IF EXISTS `user_equipment`;
CREATE TABLE `user_equipment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `doc` varchar(20) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_equipment_item_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=28176 DEFAULT CHARSET=utf8mb4;

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

-- ----------------------------
-- Table structure for user_level
-- ----------------------------
DROP TABLE IF EXISTS `user_level`;
CREATE TABLE `user_level` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `type` int(11) DEFAULT NULL COMMENT '境界类型',
  `career` int(11) DEFAULT '0' COMMENT '职业类型,非职业为0',
  `addition` int(11) DEFAULT NULL COMMENT '突破概率加成',
  `realm` bigint(20) DEFAULT NULL COMMENT '等级',
  `experience` bigint(20) DEFAULT NULL COMMENT '经验',
  `doc` varchar(20) DEFAULT NULL COMMENT '说明',
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73766 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_log
-- ----------------------------
DROP TABLE IF EXISTS `user_log`;
CREATE TABLE `user_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `create_time` bigint(20) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `doc` varchar(20) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24911 DEFAULT CHARSET=utf8mb4;

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

-- ----------------------------
-- Table structure for user_sky_ranking
-- ----------------------------
DROP TABLE IF EXISTS `user_sky_ranking`;
CREATE TABLE `user_sky_ranking` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '通天塔',
  `uid` varchar(50) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `doc` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=384 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_sky_reward
-- ----------------------------
DROP TABLE IF EXISTS `user_sky_reward`;
CREATE TABLE `user_sky_reward` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) DEFAULT NULL,
  `sid` int(11) DEFAULT '1' COMMENT '奖励编号',
  `time` datetime DEFAULT NULL COMMENT '本次记录',
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleteAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_skys_uid` (`uid`),
  KEY `fk_user_skys_sid` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=1109 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_skys
-- ----------------------------
DROP TABLE IF EXISTS `user_skys`;
CREATE TABLE `user_skys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) DEFAULT NULL,
  `sid` int(11) DEFAULT '1' COMMENT '奖励编号',
  `time` datetime DEFAULT NULL COMMENT '本次记录',
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleteAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_skys_uid` (`uid`),
  KEY `fk_user_skys_sid` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=1101 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_transactions_logs
-- ----------------------------
DROP TABLE IF EXISTS `user_transactions_logs`;
CREATE TABLE `user_transactions_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) DEFAULT NULL COMMENT '用户编号',
  `name` varchar(255) DEFAULT NULL COMMENT '物品名',
  `count` int(11) DEFAULT '0' COMMENT '物品数量',
  `price` int(11) DEFAULT '0',
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleteAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pk_uid` (`uid`),
  KEY `pk_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=529 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;