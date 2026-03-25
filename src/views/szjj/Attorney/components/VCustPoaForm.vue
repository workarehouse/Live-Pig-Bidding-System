<template>
  <a-spin :spinning="confirmLoading || aiLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="AI识别委托书">
            <div style="display: flex; gap: 8px; align-items: center;">
              <a-upload v-model:fileList="recognitionFileList" :before-upload="beforeUpload"
                :accept="'.jpg,.jpeg,.png,.pdf'" :multiple="false" :show-upload-list="false">
                <a-button type="dashed" :loading="aiLoading" :disabled="aiLoading || disabled">
                  选择委托书文件
                </a-button>
              </a-upload>
              <span v-if="recognitionFileList.length > 0 && !aiLoading" style="color: #1890ff;">
                ✓ {{ recognitionFileList[0].name }}
              </span>
              <a-spin v-if="aiLoading" size="small" />
              <span v-if="aiLoading">正在识别中...</span>
            </div>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="所属法人单位(公司)" v-bind="validateInfos.lpno">
            <a-select v-model:value="formData.lpno" show-search placeholder="请选择所属法人单位" :options="lpOptions"
              :disabled="disabled" style="width:100%" :filter-option="lpFilterOption" option-filter-prop="label" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="客户名称" v-bind="validateInfos.custcod">
            <a-select :filter-option="false" v-model:value="formData.custcod" show-search placeholder="请选择客户"
              :options="dictOptions" :disabled="disabled" style="width:100%" @change="onCustChange"
              @search="onCustSearch" />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="被委托人" v-bind="validateInfos.agentnam">
            <a-input v-model:value="formData.agentnam" placeholder="请输入被委托人" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="委托开始日期" v-bind="validateInfos.startdat">
            <a-date-picker placeholder="请选择委托开始日期" v-model:value="formData.startdat" value-format="YYYY-MM-DD"
              style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="委托结束日期" v-bind="validateInfos.enddat">
            <a-date-picker placeholder="请选择委托结束日期" v-model:value="formData.enddat" value-format="YYYY-MM-DD"
              style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="委托书附件" v-bind="validateInfos.poaurl">
            <JUpload v-model:value="formData.poaurl" text="附件上传" :disabled="disabled"></JUpload>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="备注" v-bind="validateInfos.msg">
            <a-input v-model:value="formData.msg" placeholder="请输入备注" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick, onMounted } from 'vue';
import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';
import { getValueType } from '/@/utils';
import { uploadFile } from '/@/api/common/api';
import { saveOrUpdate } from '../VCustPoa.api';
import { Form } from 'ant-design-vue';
import JUpload from '/@/components/Form/src/jeecg/components/JUpload/JUpload.vue';

const props = defineProps({
  disabled: { type: Boolean, default: false },
});
const formRef = ref();
const useForm = Form.useForm;
const emit = defineEmits(['register', 'ok']);
const formData = reactive<Record<string, any>>({
  id: '',
  custcod: '',
  lpno: '',
  agentnam: '',
  startdat: '',
  enddat: '',
  msg: '',
  state: '',
  poaurl: '',
  custnam: '',
  custTel: '',
  addr: '',
  nccod: '',
  erpcod: '',
  custprop: '',
});

const { createMessage } = useMessage();
const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
const confirmLoading = ref<boolean>(false);
const aiLoading = ref<boolean>(false);
const dictOptions = ref<any>([]);
const lpOptions = ref<any>([]);
const recognitionFileList = ref<any>([]);
const recognitionFile = ref<File | null>(null);

// AI识别API配置
const AI_API_URL = 'https://aimaster.luoniushan.com/xms/authorization_data_extract';
const AI_USERNAME = 'admin';
const AI_PASSWORD = '1qaz2wsx';

function loadCustOptions(keyword: string = '') {
  defHttp.get({ url: '/szjj/baseCustomer/list', params: { auditing: 1, pageSize: 50, keyword } }).then((res) => {
    dictOptions.value = (res.records || [])
      .map((item) => ({
        label: (item.custnam || item.custName || '').toString().trim(),
        value: (item.custcod || item.custCode || '').toString().trim(),
      }))
      .filter((item) => item.label && item.value)
  })
}

function loadLpOptions() {
  defHttp.get({
    url: '/xmsale/xmsBankInfo/list',
    params: { state: 'Y', pageSize: 9999 },
  }).then((res) => {
    lpOptions.value = (res.records || [])
      .map((item) => ({
        label: (item.lpcpy || '').toString().trim(),
        value: (item.lpno || '').toString().trim(),
      }))
      .filter((item) => item.label && item.value)
  })
}

async function fetchCustByName(keyword: string) {
  if (!keyword) {
    return [];
  }
  const res = await defHttp.get({
    url: '/szjj/baseCustomer/list',
    params: { auditing: 1, pageSize: 50, keyword, custnam: keyword, custName: keyword },
  });
  return (res.records || [])
    .map((item) => ({
      label: (item.custnam || item.custName || '').toString().trim(),
      value: (item.custcod || item.custCode || '').toString().trim(),
    }))
    .filter((item) => item.label && item.value);
}

function findCustOptionByName(name: string, options: Array<{ label: string; value: string }>) {
  if (!name) {
    return null;
  }
  const cleanName = name.trim();
  const normalized = cleanName.replace(/\s+/g, '');
  return (
    options.find((o) => o.label === cleanName) ||
    options.find((o) => o.label.replace(/\s+/g, '') === normalized) ||
    options.find((o) => o.label.includes(cleanName)) ||
    options.find((o) => cleanName.includes(o.label)) ||
    null
  );
}

function ensureCustOption(option: { label: string; value: string }) {
  const exists = dictOptions.value.some((o) => String(o.value) === String(option.value));
  if (!exists) {
    dictOptions.value = [{ label: option.label, value: String(option.value) }, ...dictOptions.value];
  }
}

function findLpOptionByName(name: string, options: Array<{ label: string; value: string }>) {
  if (!name) {
    return null;
  }
  const cleanName = name.trim();
  const normalized = cleanName.replace(/\s+/g, '');
  return (
    options.find((o) => o.label === cleanName) ||
    options.find((o) => o.label.replace(/\s+/g, '') === normalized) ||
    options.find((o) => o.label.includes(cleanName)) ||
    options.find((o) => cleanName.includes(o.label)) ||
    null
  );
}

function uploadAttachment(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    uploadFile(
      {
        file,
        filename: file.name,
        data: { biz: 'temp' },
      },
      (res) => {
        if (res && res.success && res.message) {
          resolve(String(res.message));
          return;
        }
        reject(new Error(res?.message || '附件上传失败'));
      }
    );
  });
}

onMounted(() => {
  loadCustOptions()
  loadLpOptions()
})

const lpFilterOption = (input: string, option: any) => {
  const label = String(option?.label || '').toLowerCase();
  const value = String(option?.value || '').toLowerCase();
  const keyword = String(input || '').toLowerCase();
  return label.includes(keyword) || value.includes(keyword);
}

let searchTimer: any = null
const onCustSearch = (value: string) => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => loadCustOptions(value), 300)
}

const onCustChange = (value: string) => {
  const found = dictOptions.value.find((o) => String(o.value) === String(value))
  if (found) {
    formData.custnam = found.label
  }
}

// 文件上传前检查
function beforeUpload(file: File) {
  const isAllowedType = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);
  if (!isAllowedType) {
    createMessage.error('请上传JPG, PNG或PDF格式的文件');
    return false;
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    createMessage.error('文件大小不能超过10MB');
    return false;
  }
  // 保存原始File对象用于识别
  recognitionFile.value = file;
  recognitionFileList.value = [{ name: file.name, uid: file.name }];

  // 自动开始识别
  nextTick(() => {
    recognizeAuthorization();
  });

  return false;
}

// AI识别委托书
async function recognizeAuthorization() {
  if (!recognitionFile.value) {
    createMessage.warning('请先选择文件');
    return;
  }

  const currentFile = recognitionFile.value;
  aiLoading.value = true;

  try {
    const formDataObj = new FormData();
    formDataObj.append('authorization_file', currentFile);

    // 使用fetch发送请求，因为需要设置基本认证
    const response = await fetch(AI_API_URL, {
      method: 'POST',
      body: formDataObj,
      headers: {
        'Authorization': 'Basic ' + btoa(AI_USERNAME + ':' + AI_PASSWORD),
      },
    });

    if (!response.ok) {
      createMessage.error(`识别失败: ${response.statusText}`);
      return;
    }

    const data = await response.json();

    if (data.code !== 200) {
      createMessage.warning(data.msg || '识别失败');
      return;
    }

    // 填充表单数据
    const result = data.result;
    if (result) {
      // 设置开始日期
      if (result.start_date) {
        formData.startdat = result.start_date;
      }
      // 设置结束日期
      if (result.end_date) {
        formData.enddat = result.end_date;
      }

      const trustor = (result.trustor || '').trim();
      const trustee = (result.trustee || '').trim();
      const companyName = (result.company_name || '').trim();

      // 公司名优先用于匹配所属法人单位
      if (companyName) {
        const lpMatch = findLpOptionByName(companyName, lpOptions.value);
        if (lpMatch) {
          formData.lpno = String(lpMatch.value);
        }
      }

      // 同时尝试用 company_name/trustor/trustee 匹配客户，兼容OCR字段方向不稳定的场景
      let allCustOptions = [...dictOptions.value];
      let custSearch =
        findCustOptionByName(companyName, allCustOptions) ||
        findCustOptionByName(trustee, allCustOptions) ||
        findCustOptionByName(trustor, allCustOptions);

      if (!custSearch && companyName) {
        const remoteCompanyOptions = await fetchCustByName(companyName);
        allCustOptions = [...allCustOptions, ...remoteCompanyOptions];
        custSearch = findCustOptionByName(companyName, allCustOptions);
      }

      if (!custSearch && trustee) {
        const remoteTrusteeOptions = await fetchCustByName(trustee);
        allCustOptions = [...allCustOptions, ...remoteTrusteeOptions];
        custSearch = findCustOptionByName(trustee, allCustOptions);
      }
      if (!custSearch && trustor) {
        const remoteTrustorOptions = await fetchCustByName(trustor);
        allCustOptions = [...allCustOptions, ...remoteTrustorOptions];
        custSearch = findCustOptionByName(trustor, allCustOptions);
      }

      if (custSearch) {
        ensureCustOption(custSearch);
        formData.custcod = String(custSearch.value);
        formData.custnam = custSearch.label;
      } else {
        // 没有匹配到客户时，优先填入识别出的公司名，便于人工快速确认
        formData.custnam = companyName || trustee || trustor || formData.custnam;
      }

      // 被委托人优先填写“未被识别为客户”的那个人名
      if (custSearch) {
        if (trustor && trustor !== custSearch.label) {
          formData.agentnam = trustor;
        } else if (trustee && trustee !== custSearch.label) {
          formData.agentnam = trustee;
        }
      } else {
        formData.agentnam = trustor || trustee || formData.agentnam;
      }

      // 识别成功后，自动将同一文件上传到委托书附件字段
      const uploadedPath = await uploadAttachment(currentFile);
      formData.poaurl = uploadedPath;

      createMessage.success('识别成功，已自动填入表单');

      // 清空识别文件
      recognitionFileList.value = [];
      recognitionFile.value = null;
    }
  } catch (error) {
    console.error('识别错误:', error);
    createMessage.error('识别出错：' + (error instanceof Error ? error.message : '未知错误'));
  } finally {
    aiLoading.value = false;
  }
}

//表单验证
const validatorRules = {
  lpno: [{ required: true, message: '请选择所属法人单位(公司)!' }],
  custcod: [{ required: true, message: '请选择客户!' },],
  agentnam: [{ required: true, message: '请输入被委托人!' }],
  startdat: [{ required: true, message: '请选择委托开始日期!' }],
  enddat: [{ required: true, message: '请选择委托结束日期!' }],
  poaurl: [{ required: true, message: '请上传委托书附件!' }],
};
const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });

/**
 * 新增
 */
function add() {
  edit({});
  recognitionFileList.value = [];
  recognitionFile.value = null;
}

/**
 * 编辑
 */
function edit(record) {
  nextTick(() => {
    resetFields();
    //赋值
    Object.assign(formData, record);
    recognitionFileList.value = [];
    recognitionFile.value = null;
  });
}

/**
 * 提交数据
 */
async function submitForm() {
  // 触发表单验证
  await validate();
  confirmLoading.value = true;
  const isUpdate = ref<boolean>(false);
  //时间格式化
  let model = formData;
  if (model.id) {
    isUpdate.value = true;
  }
  //循环数据
  for (let data in model) {
    //如果该数据是数组并且是字符串类型
    if (model[data] instanceof Array) {
      let valueType = getValueType(formRef.value.getProps, data);
      //如果是字符串类型的需要变成以逗号分割的字符串
      if (valueType === 'string') {
        model[data] = model[data].join(',');
      }
    }
  }
  await saveOrUpdate(model, isUpdate.value)
    .then((res) => {
      if (res.success) {
        createMessage.success(res.message);
        emit('ok');
      } else {
        createMessage.warning(res.message);
      }
    })
    .finally(() => {
      confirmLoading.value = false;
    });
}


defineExpose({
  add,
  edit,
  submitForm,
});
</script>

<style lang="less" scoped>
.antd-modal-form {
  height: auto !important;
  max-height: 600px !important;
  overflow-y: auto;
  padding: 24px 24px 24px 24px;
}
</style>