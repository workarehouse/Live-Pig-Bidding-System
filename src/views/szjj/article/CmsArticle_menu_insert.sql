-- 注意：该页面对应的前台目录为views/szjj文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('202208250422780300', NULL, '新闻发布', '/szjj/cmsArticleList', 'szjj/CmsArticleList', NULL, NULL, 0, NULL, '1', 1.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2022-08-25 16:22:30', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202208250422780301', '202208250422780300', '添加新闻发布', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_cms_article:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-08-25 16:22:30', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202208250422780302', '202208250422780300', '编辑新闻发布', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_cms_article:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-08-25 16:22:30', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202208250422780303', '202208250422780300', '删除新闻发布', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_cms_article:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-08-25 16:22:30', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202208250422780304', '202208250422780300', '批量删除新闻发布', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_cms_article:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-08-25 16:22:30', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202208250422780305', '202208250422780300', '导出excel_新闻发布', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_cms_article:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-08-25 16:22:30', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202208250422780306', '202208250422780300', '导入excel_新闻发布', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules:szjj_cms_article:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-08-25 16:22:30', NULL, NULL, 0, 0, '1', 0);