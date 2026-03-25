-- 注意：该页面对应的前台目录为views/xmsale文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2025101704447600490', NULL, 'xms_bip_cust_refund', '/xmsale/xmsBipCustRefundList', 'xmsale/XmsBipCustRefundList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2025-10-17 16:44:49', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025101704447600491', '2025101704447600490', '添加xms_bip_cust_refund', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bip_cust_refund:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-10-17 16:44:49', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025101704447600492', '2025101704447600490', '编辑xms_bip_cust_refund', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bip_cust_refund:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-10-17 16:44:49', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025101704447600493', '2025101704447600490', '删除xms_bip_cust_refund', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bip_cust_refund:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-10-17 16:44:49', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025101704447600494', '2025101704447600490', '批量删除xms_bip_cust_refund', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bip_cust_refund:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-10-17 16:44:49', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025101704447600495', '2025101704447600490', '导出excel_xms_bip_cust_refund', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bip_cust_refund:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-10-17 16:44:49', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025101704447600496', '2025101704447600490', '导入excel_xms_bip_cust_refund', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bip_cust_refund:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-10-17 16:44:49', NULL, NULL, 0, 0, '1', 0);