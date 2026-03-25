-- 注意：该页面对应的前台目录为views/szjj文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2022091604361190560', NULL, 'szjj_busi_allot', '/szjj/busiAllotList', 'szjj/BusiAllotList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2022-09-16 16:36:56', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091604361190561', '2022091604361190560', '添加szjj_busi_allot', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_busi_allot:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-16 16:36:56', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091604361190562', '2022091604361190560', '编辑szjj_busi_allot', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_busi_allot:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-16 16:36:56', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091604361190563', '2022091604361190560', '删除szjj_busi_allot', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_busi_allot:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-16 16:36:56', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091604361190564', '2022091604361190560', '批量删除szjj_busi_allot', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_busi_allot:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-16 16:36:56', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091604361190565', '2022091604361190560', '导出excel_szjj_busi_allot', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_busi_allot:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-16 16:36:56', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091604361190566', '2022091604361190560', '导入excel_szjj_busi_allot', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_busi_allot:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-16 16:36:56', NULL, NULL, 0, 0, '1', 0);