-- 注意：该页面对应的前台目录为views/szjj文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2022091809004550480', NULL, 'szjj_article', '/szjj/szjjArticleList', 'szjj/SzjjArticleList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2022-09-18 21:00:48', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091809004550481', '2022091809004550480', '添加szjj_article', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_article:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-18 21:00:48', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091809004550482', '2022091809004550480', '编辑szjj_article', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_article:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-18 21:00:48', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091809004550483', '2022091809004550480', '删除szjj_article', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_article:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-18 21:00:48', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091809004550484', '2022091809004550480', '批量删除szjj_article', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_article:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-18 21:00:48', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091809004550485', '2022091809004550480', '导出excel_szjj_article', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_article:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-18 21:00:48', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022091809004550486', '2022091809004550480', '导入excel_szjj_article', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_article:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-09-18 21:00:48', NULL, NULL, 0, 0, '1', 0);