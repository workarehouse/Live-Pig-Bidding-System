import {defHttp} from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/szjj/szjjBusiMain/list',
  save='/szjj/szjjBusiMain/add',
  edit='/szjj/szjjBusiMain/edit',
  deleteOne = '/szjj/szjjBusiMain/delete',
  deleteBatch = '/szjj/szjjBusiMain/deleteBatch',
  importExcel = '/szjj/szjjBusiMain/importExcel',
  exportXls = '/szjj/szjjBusiMain/exportXls',
  getmaininfo= '/szjj/szjjBusiMain/getmaininfo',
  getallotinfo= '/szjj/szjjBusiMain/getallotinfo',
  saveallotinfo= '/szjj/szjjBusiMain/saveallotinfo',
  getdefdelvIinfo= '/szjj/szjjBusiMain/getdefdelvIinfo',

  getfarmsbyloginuser='/szjj/baseFarmer/getFarmerByLoginAcct',
  getAreas='/szjj/baseFarmer/getAreas',
  copymain='/szjj/szjjBusiMain/copymain',
  getsuminfo='/szjj/szjjBusiMain/getSumInfo',
  
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
export const list = (params) =>
  defHttp.get({url: Api.list, params});

  
export async function getSumInfo(params){
  return defHttp.get({ url: Api.getsuminfo, params });

}
/**
 * 删除单个
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}

export const copymain = (params) => {
  let url =  Api.copymain;
  return defHttp.post({url: url, params},{joinParamsToUrl: true});
} 



/**
 * 批量删除
 * @param params
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
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}

export const getmaininfo = (params) =>
  defHttp.get({url: Api.getmaininfo, params});
  
export const getallotinfo = (params) =>
  defHttp.get({url: Api.getallotinfo, params});  

  export const getdefdelvIinfo = (params) =>
  defHttp.get({url: Api.getdefdelvIinfo, params});  
  
 export const saveAllotInfo = (params) => {
    let url =  Api.saveallotinfo;
    return defHttp.post({url: url, params});
  } 
  export const getFarmsByLoginUser = (params) => {
    let url =  Api.getfarmsbyloginuser;
    return defHttp.post({url: url, params});
  } 

  export const getAreas = (params) => {
    let url =  Api.getAreas;
    return defHttp.post({url: url, params});
  } 

  