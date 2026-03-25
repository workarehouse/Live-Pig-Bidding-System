-- 注意：该页面对应的前台目录为views/szjj文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2022091709324190090', NULL, '广告条', '/szjj/szjjAdinfoList', 'szjj/SzjjAdinfoList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2022-09-17 21:32:09', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091709324200091', '2022091709324190090', '添加广告条', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_adinfo:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-17 21:32:09', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091709324200092', '2022091709324190090', '编辑广告条', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_adinfo:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-17 21:32:09', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091709324200093', '2022091709324190090', '删除广告条', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_adinfo:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-17 21:32:09', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091709324200094', '2022091709324190090', '批量删除广告条', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_adinfo:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-17 21:32:09', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091709324200095', '2022091709324190090', '导出excel_广告条', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_adinfo:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-17 21:32:09', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091709324200096', '2022091709324190090', '导入excel_广告条', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_adinfo:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-17 21:32:09', NULL, NULL, 0, 0, '1', 0);