/*
 Navicat Premium Data Transfer



 Date: 12/11/2024 12:21:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
-- Records of txt
-- ----------------------------
BEGIN;
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (100, '修仙大陆', '以气入仙道，以气踏圣境的凡人大陆，万仙林立，天上飞仙，地上走兽，可五千年前，不知何原因，仙门破损，天道崩裂，灵气日渐稀薄...可有一奇相也是从此时开始渐显，那便是城里不知不觉，多了些练气期的道友，为此，极西城主西门吹箫...');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (102, '三大神器', '虚空之灵;妖塔;浩瀚仙宫');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (103, '浩瀚仙宫', '传说五千年前，上界变动，众仙帝陨落。而浩瀚仙宫便是这遗落凡界之物，此物可踏万里，遁虚空，内有仙宝无数，若得其一，实力可一跃九千里，但仙宫行踪漂浮不定，听闻仙灵酷爱美食，若以美食诱之，再心向仙道，可祈求仙宫，落尘于世。');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (104, '修仙联盟', '五千年前，灵气凋零，星海岛玉炎子带领门下弟子跨过万里来到了修仙大陆，令人惊叹的是，其门下弟子皆是世代天骄，而照阳城为在这妖魔乱世之地求得一线生机，城主东方无极联合仅有的几座城池与那玉炎子建起了修仙联盟，更是拉拢众多高级阵法师修起了传送大阵，无数修士跨过亿万海域......');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (1000, '天机门', '世代守护虚空之灵，以人之血肉震虚空，不仅看天机踏虚空，更知晓天道破损，此界已是五千年未有仙，为求一线天机……');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (1001, '星海岛', '坐落于万海之上，受万妖群攻，众修士守卫妖塔(天骄塔)，更杀妖无数…… ');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (1002, '万宝楼', '珍宝无数，若购买不到稀有物品，即是自身身份卑微…');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (1003, '灭仙', '三大禁地之一，内有神境妖兽，非凡力所能敌...');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (1004, '天外天', '大陆天之外，域外邪魔不断击破界壁，导致天道破损，不日将降临人间，需尽快打破天道束缚，成就仙道，若天道之灵为求自保，极有可能吸万灵之血，让其大陆与其玉石俱焚，而自身遁入虚空而去... ');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (2001, '决斗令', '城主府打造的,用于在城里发起决斗的令牌');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (2002, '洗根水', '由五种五行极纯之物大所配置的一种药水,可使人脱胎换骨，极其珍贵');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (2003, '望灵珠', '用于与自身灵根共鸣的石头,消耗时会发出微弱的波动,从而探明灵根属性');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (2004, '灵木', '又称之为养魂木,经受雷劫而不毁坏的至纯之物,修炼时放于身旁,可极大的提升魂力');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (2005, '金盆', '天机门打造的,用于洗涤自身污浊之物');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (2006, '开天令', '修仙联盟打造的,用于协助开山辟海的令牌,使用此物可号召附近的联盟修士协助开辟山门');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (2007, '传送符', '符箓师所制作的基础物品之一,可迅速定位并传送至最近的主城');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (2008, '引魂灯', '浩瀚仙宫之物,传闻使用此物可在过奈何桥时不迷失方向');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (2009, '协会', '全称,全职修仙大师协会,包含炼丹师协会、炼器师协会、阵法师协会等分会。');
INSERT INTO `txt` (`id`, `name`, `doc`) VALUES (2010, '玄玉天宫', '神秘的新生势力,显世时,在天山上布下玄天大阵,所有修士的所作所为,尽在眼底');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
