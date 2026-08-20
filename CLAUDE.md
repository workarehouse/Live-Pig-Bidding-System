# CLAUDE.md

## 项目概述

生猪竞价后台管理系统前端，基于 **JeecgBoot-Vue3 3.3.0**（在 Vben-Admin 基础上二次开发的低代码平台）。技术栈：Vue 3 + Vite 2 + TypeScript + Ant Design Vue 2.2.8 + Pinia + Less + WindiCSS。包管理用 yarn。

后端为 JeecgBoot Java 服务，开发环境通过 Vite 代理 `/jeecgboot` 转发到 `https://devenv.luoniushan.com/jeecgboot`（见 `.env.development` 的 `VITE_PROXY`）。生产部署路径为 `/xms/`（`.env.production`）。

## 业务代码位置与模块模式

**业务代码集中在 `src/views/szjj/`**（生猪竞价相关模块，40+ 个）；`src/views/demo/`、`src/views/dashboard/` 等是 Jeecg 框架自带的演示/框架页面，一般不要改动。

每个业务模块遵循 Jeecg 代码生成器的固定结构（以 `VSalorderNodetime` 为例）：

- `XxxList.vue` — 列表页：查询表单 + `BasicTable`（通过 `useListPage` hook 注册，配置 api、columns、导入导出等）
- `Xxx.api.ts` — 接口层：`enum Api` 定义后端 URL（如 `/xmsale/vSalorderNodetime/list`），用 `defHttp`（`/@/utils/http/axios`）封装 list/save/edit/delete/exportXls/importExcel
- `Xxx.data.ts` — 表格列定义（`BasicColumn[]`）与表单 schema（`FormSchema[]`）
- `components/XxxModal.vue` + `XxxForm.vue` — 新增/编辑弹窗表单
- `Xxx_menu_insert.sql` — 向 Jeecg 后台数据库注册菜单/按钮权限的 SQL（菜单和路由由后端动态下发，`src/router/routes/` 里只有框架静态路由）

新增业务模块时按此模式创建；修改现有模块时，列、查询条件、表单字段通常改 `.data.ts`，接口地址改 `.api.ts`。

## 关键框架设施

- 路径别名 `/@/` 指向 `src/`（如 `/@/components/Table`、`/@/hooks/system/useListPage`）
- 通用列表页逻辑封装在 `src/hooks/system/useListPage.ts`（分页、排序、导出 `onExportXls`、导入、行选择）
- HTTP 请求统一走 `src/utils/http/axios` 的 `defHttp`，自动拼接 `VITE_GLOB_API_URL` 前缀并处理 token/响应转换
- 环境配置在根目录 `.env.development` / `.env.test` / `.env.production`；切换后端地址改 `VITE_PROXY` 与 `VITE_GLOB_DOMAIN_URL`
