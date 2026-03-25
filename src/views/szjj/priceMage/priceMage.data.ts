import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '重量分布',
    align: 'center',
    dataIndex: 'wgtnam',
  },
  {
    title: '质量等级',
    align: 'center',
    dataIndex: 'lvl',
  },
  {
    title: '区域',
    align: 'center',
    dataIndex: 'areanam',
  },
  {
    title: '二元',
    align: 'center',
    dataIndex: 'wpri2',
    edit: true,
  },
  {
    title: '三元',
    dataIndex: 'wpri1',
    align: 'center',
    edit: true,
  },
  {
    title: '黑毛',
    align: 'center',
    edit: true,
    dataIndex: 'bpri1',
  },
  {
    title: '红毛',
    align: 'center',
    edit: true,
    dataIndex: 'bpri2',
  },
];
