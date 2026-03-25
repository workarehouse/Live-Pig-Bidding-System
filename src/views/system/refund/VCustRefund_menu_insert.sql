-- 注意：该页面对应的前台目录为views/xmsale文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2024072604337430240', NULL, 'v_cust_refund', '/xmsale/vCustRefundList', 'xmsale/VCustRefundList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2024-07-26 16:33:24', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024072604337430241', '2024072604337430240', '添加v_cust_refund', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_cust_refund:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-07-26 16:33:24', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024072604337430242', '2024072604337430240', '编辑v_cust_refund', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_cust_refund:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-07-26 16:33:24', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024072604337430243', '2024072604337430240', '删除v_cust_refund', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_cust_refund:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-07-26 16:33:24', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024072604337430244', '2024072604337430240', '批量删除v_cust_refund', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_cust_refund:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-07-26 16:33:24', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024072604337430245', '2024072604337430240', '导出excel_v_cust_refund', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_cust_refund:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-07-26 16:33:24', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024072604337430246', '2024072604337430240', '导入excel_v_cust_refund', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_cust_refund:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-07-26 16:33:24', NULL, NULL, 0, 0, '1', 0);