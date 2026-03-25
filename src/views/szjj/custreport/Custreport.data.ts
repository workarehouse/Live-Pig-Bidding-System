import {BasicColumn} from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '客户',
    align: "center",
    dataIndex: 'username',
  },
  {
    title: '访问次数',
    align: "center",
    dataIndex: 'cnt',
  },
  {
    title: '竞价次数',
    align: "center",
    dataIndex: 'bidcnt'
  },
  {
    title: '中标头数',
    align: "center",
    dataIndex: 'allotpigcnt'
  },
  {
    title: '成交头数',
    align: "center",
    dataIndex: 'pigcnt'
  },
  {
    title: '成交重量',
    align: "center",
    dataIndex: 'wgt'
  },
  {
    title: '成交金额',
    align: "center",
    dataIndex: 'amt'
  },
];
  