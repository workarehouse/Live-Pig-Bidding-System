import { defHttp } from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/szjj/szjjBusiEval/list',
  save='/szjj/szjjBusiEval/add',
  edit='/szjj/szjjBusiEval/edit',
  deleteOne = '/szjj/szjjBusiEval/delete',
  deleteBatch = '/szjj/szjjBusiEval/deleteBatch',
  importExcel = '/szjj/szjjBusiEval/importExcel',
  exportXls = '/szjj/szjjBusiEval/exportXls',
  getordevalreply = '/szjj/szjjBusiEval/getordevalreply',
  saveevalreply= '/szjj/szjjBusiEval/saveevalreply',
}

/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;

/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * 删除单个
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}

/**
 * 批量删除
 * @param params
 * @param handleSuccess
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}

/**
 * 保存或者更新
 * @param params
 * @param isUpdate
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
}
 
export const getOrdEvalReply = (params) => defHttp.get({ url: Api.getordevalreply, params });
export const saveEvalReply = (params) => {
  let url =  Api.saveevalreply;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
}
 



