-- 注意：该页面对应的前台目录为views/xmsale文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2026020411105400440', NULL, 'xms_apicall_log', '/xmsale/xmsApicallLogList', 'xmsale/XmsApicallLogList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2026-02-04 11:10:44', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020411105400441', '2026020411105400440', '添加xms_apicall_log', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_apicall_log:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-04 11:10:44', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020411105400442', '2026020411105400440', '编辑xms_apicall_log', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_apicall_log:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-04 11:10:44', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020411105400443', '2026020411105400440', '删除xms_apicall_log', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_apicall_log:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-04 11:10:44', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020411105400444', '2026020411105400440', '批量删除xms_apicall_log', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_apicall_log:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-04 11:10:44', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020411105400445', '2026020411105400440', '导出excel_xms_apicall_log', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_apicall_log:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-04 11:10:44', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020411105400446', '2026020411105400440', '导入excel_xms_apicall_log', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_apicall_log:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-04 11:10:44', NULL, NULL, 0, 0, '1', 0);