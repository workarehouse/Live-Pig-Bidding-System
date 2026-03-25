/**
 *  @description 验证是否是有效的输入
 * @param {string | number | null | undefined} value
 * @returns  {boolean}
 */
export function isValidInput(value: string | number | null | undefined) {
    return value !== null && value !== undefined && value !== ''
}
