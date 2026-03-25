import { defHttp } from '/@/utils/http/axios'
import { useMessage } from '/@/hooks/web/useMessage'

const { createConfirm } = useMessage()
enum Api {
    list = '/xmsale/szjjBusiOrderIntran/list',
    save = '/xmsale/szjjBusiOrderIntran/saveorder',
    deleteOne = '/xmsale/szjjBusiOrderIntran/delete'
}

/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params })

/**
 * 删除单个
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params, handleSuccess) => {
    return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess()
    })
}
