-- 注意：该页面对应的前台目录为views/szjj文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2022091303335680250', NULL, 'szjj_busi_main', '/szjj/szjjBusiMainList', 'szjj/SzjjBusiMainList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2022-09-13 15:33:25', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091303335680251', '2022091303335680250', '添加szjj_busi_main', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_busi_main:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-13 15:33:25', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091303335680252', '2022091303335680250', '编辑szjj_busi_main', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_busi_main:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-13 15:33:25', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091303335680253', '2022091303335680250', '删除szjj_busi_main', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_busi_main:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-13 15:33:25', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091303335680254', '2022091303335680250', '批量删除szjj_busi_main', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_busi_main:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-13 15:33:25', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091303335680255', '2022091303335680250', '导出excel_szjj_busi_main', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_busi_main:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-13 15:33:25', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091303335680256', '2022091303335680250', '导入excel_szjj_busi_main', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_busi_main:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-13 15:33:25', NULL, NULL, 0, 0, '1', 0);