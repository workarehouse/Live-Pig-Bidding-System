import { defHttp } from '/@/utils/http/axios'
import { useMessage } from '/@/hooks/web/useMessage'

const { createConfirm } = useMessage()

enum Api {
    list = '/szjj/szjjBusiOrder/list',
    save = '/szjj/szjjBusiOrder/add',
    edit = '/szjj/szjjBusiOrder/edit',
    deleteOne = '/szjj/szjjBusiOrder/delete',
    deleteBatch = '/szjj/szjjBusiOrder/deleteBatch',
    importExcel = '/szjj/szjjBusiOrder/importExcel',
    exportXls = '/szjj/szjjBusiOrder/exportXls',
    getOrderDetailByOrdno = '/szjj/szjjBusiOrder/getorderdetailbyno',
    saveordertransdt = '/szjj/szjjBusiOrder/saveordertransdt',
    getsuminfo = '/szjj/szjjBusiOrder/getSumInfo',
    closeorder = '/szjj/szjjBusiOrder/closeorder',
    findyds = '/szjj/szjjBusiOrder/findyds',
    saveSalYd = '/szjj/szjjBusiOrder/saveSalYd'
}

/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls

/**
 * 导入api
 */
export const getImportUrl = Api.importExcel

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
export async function getSumInfo(params) {
    return defHttp.get({ url: Api.getsuminfo, params })
}
/**
 * 批量删除
 * @param params
 * @param handleSuccess
 */
export const batchDelete = (params, handleSuccess) => {
    createConfirm({
        iconType: 'warning',
        title: '确认作废',
        content: '是否作废选中数据',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
            return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
                handleSuccess()
            })
        }
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

export const getOrderDetailByOrdno = (params) => defHttp.get({ url: Api.getOrderDetailByOrdno, params })

export const saveOrderTransDt = (params) => {
    return defHttp.post({ url: Api.saveordertransdt, params }, { isTransformResponse: false })
}

export const closeOrder = (params) => {
    return defHttp.post({ url: Api.closeorder, params }, { isTransformResponse: false })
}

export const findYds = () => defHttp.post({ url: Api.findyds })

export const saveSalYd = (params) => {
    return defHttp.post({ url: Api.saveSalYd, params }, { isTransformResponse: false })
}
