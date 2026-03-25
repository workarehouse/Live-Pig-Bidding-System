-- 注意：该页面对应的前台目录为views/szjj文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2022082307286140270', NULL, '猪场管理', '/szjj/baseFarmerList', 'szjj/BaseFarmerList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2022-08-23 19:28:27', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022082307286150271', '2022082307286140270', '添加猪场管理', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_base_farmer:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-08-23 19:28:27', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022082307286150272', '2022082307286140270', '编辑猪场管理', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_base_farmer:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-08-23 19:28:27', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022082307286150273', '2022082307286140270', '删除猪场管理', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_base_farmer:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-08-23 19:28:27', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022082307286150274', '2022082307286140270', '批量删除猪场管理', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_base_farmer:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-08-23 19:28:27', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022082307286150275', '2022082307286140270', '导出excel_猪场管理', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_base_farmer:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-08-23 19:28:27', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022082307286150276', '2022082307286140270', '导入excel_猪场管理', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_base_farmer:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-08-23 19:28:27', NULL, NULL, 0, 0, '1', 0);