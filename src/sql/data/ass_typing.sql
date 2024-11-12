/*
 Navicat Premium Data Transfer
 Date: 12/11/2024 12:19:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Records of ass_typing
-- ----------------------------
BEGIN;
INSERT INTO `ass_typing` (`id`, `master`, `vice_master`, `super_admin`, `admin`, `core_member`, `senior_menber`, `intermediate_member`, `lowerlevel_member`, `tagged_member`, `reviewed_member`, `doc`) VALUES (0, '宗主', '副宗主', '大长老', '长老', '护法', '真传弟子', '内门弟子', '外门弟子', '记名弟子', '待入', NULL);
INSERT INTO `ass_typing` (`id`, `master`, `vice_master`, `super_admin`, `admin`, `core_member`, `senior_menber`, `intermediate_member`, `lowerlevel_member`, `tagged_member`, `reviewed_member`, `doc`) VALUES (1, '掌门', '副掌门', '大长老', '长老', '护法', '真传弟子', '内门弟子', '外门弟子', '记名弟子', '待入', NULL);
INSERT INTO `ass_typing` (`id`, `master`, `vice_master`, `super_admin`, `admin`, `core_member`, `senior_menber`, `intermediate_member`, `lowerlevel_member`, `tagged_member`, `reviewed_member`, `doc`) VALUES (2, '门主', '副门主', '大长老', '长老', '护法', '真传弟子', '内门弟子', '外门弟子', '记名弟子', '待入', NULL);
INSERT INTO `ass_typing` (`id`, `master`, `vice_master`, `super_admin`, `admin`, `core_member`, `senior_menber`, `intermediate_member`, `lowerlevel_member`, `tagged_member`, `reviewed_member`, `doc`) VALUES (3, '阁主', '副阁主', '大长老', '长老', '护法', '核心弟子', '阁内弟子', '闲散弟子', '记名弟子', '待入', NULL);
INSERT INTO `ass_typing` (`id`, `master`, `vice_master`, `super_admin`, `admin`, `core_member`, `senior_menber`, `intermediate_member`, `lowerlevel_member`, `tagged_member`, `reviewed_member`, `doc`) VALUES (4, '宫主', '副宫主', '大长老', '长老', '护法', '核心弟子', '宫内弟子', '闲散弟子', '记名弟子', '待入', NULL);
INSERT INTO `ass_typing` (`id`, `master`, `vice_master`, `super_admin`, `admin`, `core_member`, `senior_menber`, `intermediate_member`, `lowerlevel_member`, `tagged_member`, `reviewed_member`, `doc`) VALUES (5, '教主', '副教主', '大掌舵', '掌舵', '护法', '核心弟子', '教内弟子', '闲散弟子', '记名弟子', '待入', NULL);
INSERT INTO `ass_typing` (`id`, `master`, `vice_master`, `super_admin`, `admin`, `core_member`, `senior_menber`, `intermediate_member`, `lowerlevel_member`, `tagged_member`, `reviewed_member`, `doc`) VALUES (6, '皇帝', '丞相', '太尉', '太傅', '太守', '大将军', '将军', '士兵', '子民', '流民', NULL);
INSERT INTO `ass_typing` (`id`, `master`, `vice_master`, `super_admin`, `admin`, `core_member`, `senior_menber`, `intermediate_member`, `lowerlevel_member`, `tagged_member`, `reviewed_member`, `doc`) VALUES (7, '谷主', '副谷主', '大长老', '长老', '护法', '真传弟子', '内门弟子', '外门弟子', '记名弟子', '待入', NULL);
INSERT INTO `ass_typing` (`id`, `master`, `vice_master`, `super_admin`, `admin`, `core_member`, `senior_menber`, `intermediate_member`, `lowerlevel_member`, `tagged_member`, `reviewed_member`, `doc`) VALUES (8, '洞主', '副洞主', '大长老', '长老', '护法', '真传弟子', '内门弟子', '外门弟子', '记名弟子', '待入', NULL);
INSERT INTO `ass_typing` (`id`, `master`, `vice_master`, `super_admin`, `admin`, `core_member`, `senior_menber`, `intermediate_member`, `lowerlevel_member`, `tagged_member`, `reviewed_member`, `doc`) VALUES (9, '组长', '副组长', '秘书', '部长', '干事', '高级成员', '中级成员', '低级成员', '记名成员', '待入', NULL);
INSERT INTO `ass_typing` (`id`, `master`, `vice_master`, `super_admin`, `admin`, `core_member`, `senior_menber`, `intermediate_member`, `lowerlevel_member`, `tagged_member`, `reviewed_member`, `doc`) VALUES (10, '堡主', '副堡主', '大堡长', '堡长', '堡务', '大堡官', '堡官', '堡卫', '堡民', '待入', NULL);
INSERT INTO `ass_typing` (`id`, `master`, `vice_master`, `super_admin`, `admin`, `core_member`, `senior_menber`, `intermediate_member`, `lowerlevel_member`, `tagged_member`, `reviewed_member`, `doc`) VALUES (11, '城主', '副城主', '军师', '谋士', '城监', '城管', '巡官', '城卫', '城民', '流民', NULL);
INSERT INTO `ass_typing` (`id`, `master`, `vice_master`, `super_admin`, `admin`, `core_member`, `senior_menber`, `intermediate_member`, `lowerlevel_member`, `tagged_member`, `reviewed_member`, `doc`) VALUES (12, '会长', '副会长', '大长老', '长老', '干事', '高级成员', '中级成员', '低级成员', '记名成员', '待入', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
