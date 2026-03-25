-- 注意：该页面对应的前台目录为views/xmsale文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2024031904576020290', NULL, 'xms_pritpl', '/xmsale/xmsPritplList', 'xmsale/XmsPritplList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2024-03-19 16:57:29', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031904576020291', '2024031904576020290', '添加xms_pritpl', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_pritpl:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-19 16:57:29', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031904576020292', '2024031904576020290', '编辑xms_pritpl', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_pritpl:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-19 16:57:29', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031904576020293', '2024031904576020290', '删除xms_pritpl', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_pritpl:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-19 16:57:29', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031904576020294', '2024031904576020290', '批量删除xms_pritpl', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_pritpl:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-19 16:57:29', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031904576020295', '2024031904576020290', '导出excel_xms_pritpl', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_pritpl:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-19 16:57:29', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031904576020296', '2024031904576020290', '导入excel_xms_pritpl', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_pritpl:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-19 16:57:29', NULL, NULL, 0, 0, '1', 0);