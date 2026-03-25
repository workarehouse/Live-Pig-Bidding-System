import { defHttp } from '/@/utils/http/axios'

enum Api {
    list = '/xmsale/xmsQutcktInfo/list',
    save = '/xmsale/xmsQutcktInfo/add',
    edit = '/xmsale/xmsQutcktInfo/edit',
    deleteOne = '/xmsale/xmsQutcktInfo/delete'
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

/**
 * 保存或者更新
 * @param params
 * @param isUpdate
 */
export const saveOrUpdate = (params, isUpdate) => {
    let url = isUpdate ? Api.edit : Api.save
    return defHttp.post({ url: url, params }, { isTransformResponse: false })
}
