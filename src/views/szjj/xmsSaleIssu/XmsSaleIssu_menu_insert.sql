-- 注意：该页面对应的前台目录为views/xmsale文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2024082009196530010', NULL, 'xms_sale_issu', '/xmsale/xmsSaleIssuList', 'xmsale/XmsSaleIssuList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2024-08-20 09:19:01', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024082009196550011', '2024082009196530010', '添加xms_sale_issu', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_sale_issu:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-08-20 09:19:01', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024082009196550012', '2024082009196530010', '编辑xms_sale_issu', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_sale_issu:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-08-20 09:19:01', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024082009196550013', '2024082009196530010', '删除xms_sale_issu', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_sale_issu:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-08-20 09:19:01', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024082009196550014', '2024082009196530010', '批量删除xms_sale_issu', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_sale_issu:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-08-20 09:19:01', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024082009196550015', '2024082009196530010', '导出excel_xms_sale_issu', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_sale_issu:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-08-20 09:19:01', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024082009196550016', '2024082009196530010', '导入excel_xms_sale_issu', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_sale_issu:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-08-20 09:19:01', NULL, NULL, 0, 0, '1', 0);