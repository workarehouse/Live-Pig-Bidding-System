-- 注意：该页面对应的前台目录为views/xmsale文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2024031410495940000', NULL, 'xms_washout', '/xmsale/xmsWashoutList', 'xmsale/XmsWashoutList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2024-03-14 10:49:00', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031410495940001', '2024031410495940000', '添加xms_washout', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_washout:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-14 10:49:00', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031410495940002', '2024031410495940000', '编辑xms_washout', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_washout:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-14 10:49:00', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031410495940003', '2024031410495940000', '删除xms_washout', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_washout:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-14 10:49:00', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031410495940004', '2024031410495940000', '批量删除xms_washout', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_washout:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-14 10:49:00', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031410495940005', '2024031410495940000', '导出excel_xms_washout', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_washout:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-14 10:49:00', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031410495940006', '2024031410495940000', '导入excel_xms_washout', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_washout:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-14 10:49:00', NULL, NULL, 0, 0, '1', 0);