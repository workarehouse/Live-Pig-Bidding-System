-- 注意：该页面对应的前台目录为views/xmsale文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2024032804566230250', NULL, 'xms_sync_bpmproc', '/xmsale/xmsSyncBpmprocList', 'xmsale/XmsSyncBpmprocList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2024-03-28 16:56:25', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024032804566230251', '2024032804566230250', '添加xms_sync_bpmproc', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_sync_bpmproc:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-28 16:56:25', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024032804566230252', '2024032804566230250', '编辑xms_sync_bpmproc', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_sync_bpmproc:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-28 16:56:25', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024032804566230253', '2024032804566230250', '删除xms_sync_bpmproc', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_sync_bpmproc:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-28 16:56:25', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024032804566230254', '2024032804566230250', '批量删除xms_sync_bpmproc', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_sync_bpmproc:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-28 16:56:25', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024032804566230255', '2024032804566230250', '导出excel_xms_sync_bpmproc', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_sync_bpmproc:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-28 16:56:25', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024032804566240256', '2024032804566230250', '导入excel_xms_sync_bpmproc', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_sync_bpmproc:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-28 16:56:25', NULL, NULL, 0, 0, '1', 0);