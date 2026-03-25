-- 注意：该页面对应的前台目录为views/xmsale文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2024092904403980430', NULL, 'v_order_wgtlst', '/xmsale/vOrderWgtlstList', 'xmsale/VOrderWgtlstList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2024-09-29 16:40:43', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024092904403980431', '2024092904403980430', '添加v_order_wgtlst', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_order_wgtlst:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-09-29 16:40:43', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024092904403980432', '2024092904403980430', '编辑v_order_wgtlst', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_order_wgtlst:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-09-29 16:40:43', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024092904403980433', '2024092904403980430', '删除v_order_wgtlst', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_order_wgtlst:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-09-29 16:40:43', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024092904403980434', '2024092904403980430', '批量删除v_order_wgtlst', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_order_wgtlst:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-09-29 16:40:43', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024092904403980435', '2024092904403980430', '导出excel_v_order_wgtlst', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_order_wgtlst:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-09-29 16:40:43', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024092904403980436', '2024092904403980430', '导入excel_v_order_wgtlst', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_order_wgtlst:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-09-29 16:40:43', NULL, NULL, 0, 0, '1', 0);