-- 注意：该页面对应的前台目录为views/xmsale文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2026020511284460400', NULL, 'v_chgbanlanlp', '/xmsale/vChgbanlanlpList', 'xmsale/VChgbanlanlpList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2026-02-05 11:28:40', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020511284460401', '2026020511284460400', '添加v_chgbanlanlp', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_chgbanlanlp:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-05 11:28:40', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020511284460402', '2026020511284460400', '编辑v_chgbanlanlp', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_chgbanlanlp:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-05 11:28:40', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020511284460403', '2026020511284460400', '删除v_chgbanlanlp', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_chgbanlanlp:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-05 11:28:40', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020511284460404', '2026020511284460400', '批量删除v_chgbanlanlp', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_chgbanlanlp:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-05 11:28:40', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020511284460405', '2026020511284460400', '导出excel_v_chgbanlanlp', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_chgbanlanlp:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-05 11:28:40', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020511284460406', '2026020511284460400', '导入excel_v_chgbanlanlp', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_chgbanlanlp:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-05 11:28:40', NULL, NULL, 0, 0, '1', 0);