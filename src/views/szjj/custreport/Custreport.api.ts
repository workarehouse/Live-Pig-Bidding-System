import { defHttp } from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/szjj/report/getSumInfoLst',
  getsuminfo= '/szjj/report/getSumInfo',
  exportXls = '/szjj/report/exportSumInfoXls',
  getfarmsbyloginuser='/szjj/baseFarmer/getFarmerByLoginAcct',
}

/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
 
/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });
//export const  getSumInfo = (params) => defHttp.get({ url: Api.getsuminfo, params });

export async function getSumInfo(params){
  return defHttp.get({ url: Api.getsuminfo, params });

}

export const getFarmsByLoginUser = (params) => {
  let url =  Api.getfarmsbyloginuser;
  return defHttp.post({url: url, params});
};
export async function exportSumInfoXls(params){
  return defHttp.get({ url: Api.exportXls, params });

} 