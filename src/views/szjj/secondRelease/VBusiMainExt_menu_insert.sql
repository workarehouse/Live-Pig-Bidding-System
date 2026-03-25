-- 注意：该页面对应的前台目录为views/xmsale文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2024092304491530220', NULL, 'v_busi_main_ext', '/xmsale/vBusiMainExtList', 'xmsale/VBusiMainExtList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2024-09-23 16:49:22', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024092304491530221', '2024092304491530220', '添加v_busi_main_ext', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_busi_main_ext:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-09-23 16:49:22', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024092304491530222', '2024092304491530220', '编辑v_busi_main_ext', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_busi_main_ext:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-09-23 16:49:22', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024092304491530223', '2024092304491530220', '删除v_busi_main_ext', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_busi_main_ext:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-09-23 16:49:22', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024092304491530224', '2024092304491530220', '批量删除v_busi_main_ext', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_busi_main_ext:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-09-23 16:49:22', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024092304491530225', '2024092304491530220', '导出excel_v_busi_main_ext', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_busi_main_ext:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-09-23 16:49:22', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024092304491530226', '2024092304491530220', '导入excel_v_busi_main_ext', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:v_busi_main_ext:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-09-23 16:49:22', NULL, NULL, 0, 0, '1', 0);