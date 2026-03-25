-- 注意：该页面对应的前台目录为views/xmsale文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2024031809252020450', NULL, '客户管理', '/xmsale/szjjBaseCustomerList', 'xmsale/SzjjBaseCustomerList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2024-03-18 09:25:45', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031809252020451', '2024031809252020450', '添加客户管理', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_base_customer:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-18 09:25:45', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031809252020452', '2024031809252020450', '编辑客户管理', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_base_customer:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-18 09:25:45', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031809252020453', '2024031809252020450', '删除客户管理', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_base_customer:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-18 09:25:45', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031809252020454', '2024031809252020450', '批量删除客户管理', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_base_customer:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-18 09:25:45', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031809252020455', '2024031809252020450', '导出excel_客户管理', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_base_customer:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-18 09:25:45', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031809252020456', '2024031809252020450', '导入excel_客户管理', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_base_customer:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-18 09:25:45', NULL, NULL, 0, 0, '1', 0);