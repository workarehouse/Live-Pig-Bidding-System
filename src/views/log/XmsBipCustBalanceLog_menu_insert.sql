-- 注意：该页面对应的前台目录为views/xmsale文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2026020411104590210', NULL, 'xms_bip_cust_balance_log', '/xmsale/xmsBipCustBalanceLogList', 'xmsale/XmsBipCustBalanceLogList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2026-02-04 11:10:21', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020411104590211', '2026020411104590210', '添加xms_bip_cust_balance_log', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bip_cust_balance_log:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-04 11:10:21', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020411104590212', '2026020411104590210', '编辑xms_bip_cust_balance_log', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bip_cust_balance_log:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-04 11:10:21', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020411104590213', '2026020411104590210', '删除xms_bip_cust_balance_log', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bip_cust_balance_log:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-04 11:10:21', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020411104590214', '2026020411104590210', '批量删除xms_bip_cust_balance_log', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bip_cust_balance_log:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-04 11:10:21', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020411104590215', '2026020411104590210', '导出excel_xms_bip_cust_balance_log', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bip_cust_balance_log:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-04 11:10:21', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2026020411104590216', '2026020411104590210', '导入excel_xms_bip_cust_balance_log', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:xms_bip_cust_balance_log:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2026-02-04 11:10:21', NULL, NULL, 0, 0, '1', 0);