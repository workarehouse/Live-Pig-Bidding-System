-- 注意：该页面对应的前台目录为views/xxxxxx文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2024082103104940440', NULL, 'xms_bank_info', '/xxxxxx/xmsBankInfoList', 'xxxxxx/XmsBankInfoList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2024-08-21 15:10:44', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024082103104940441', '2024082103104940440', '添加xms_bank_info', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bank_info:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-08-21 15:10:44', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024082103104950442', '2024082103104940440', '编辑xms_bank_info', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bank_info:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-08-21 15:10:44', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024082103104950443', '2024082103104940440', '删除xms_bank_info', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bank_info:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-08-21 15:10:44', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024082103104950444', '2024082103104940440', '批量删除xms_bank_info', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bank_info:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-08-21 15:10:44', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024082103104950445', '2024082103104940440', '导出excel_xms_bank_info', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bank_info:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-08-21 15:10:44', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024082103104950446', '2024082103104940440', '导入excel_xms_bank_info', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bank_info:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-08-21 15:10:44', NULL, NULL, 0, 0, '1', 0);