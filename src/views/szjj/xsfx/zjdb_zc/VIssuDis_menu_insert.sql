-- 注意：该页面对应的前台目录为views/xmsale文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2024072002313400030', NULL, 'v_issu_dis', '/xmsale/vIssuDisList', 'xmsale/VIssuDisList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2024-07-20 14:31:03', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024072002313400031', '2024072002313400030', '添加v_issu_dis', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_issu_dis:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-07-20 14:31:03', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024072002313400032', '2024072002313400030', '编辑v_issu_dis', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_issu_dis:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-07-20 14:31:03', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024072002313400033', '2024072002313400030', '删除v_issu_dis', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_issu_dis:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-07-20 14:31:03', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024072002313400034', '2024072002313400030', '批量删除v_issu_dis', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_issu_dis:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-07-20 14:31:03', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024072002313400035', '2024072002313400030', '导出excel_v_issu_dis', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_issu_dis:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-07-20 14:31:03', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024072002313400036', '2024072002313400030', '导入excel_v_issu_dis', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_issu_dis:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-07-20 14:31:03', NULL, NULL, 0, 0, '1', 0);