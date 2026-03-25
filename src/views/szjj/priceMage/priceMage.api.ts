import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/szjj/szjjPriceSetting/list',
  update = '/szjj/szjjPriceSetting/updatePrice',
}

/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });
export const updataPrice = (params) => defHttp.post({ url: Api.update, params });
