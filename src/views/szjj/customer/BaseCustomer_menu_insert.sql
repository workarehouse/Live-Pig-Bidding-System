<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<t:base type="jquery,easyui,tools,DatePicker"></t:base>
<div class="easyui-layout" fit="true">
  <div region="center" style="padding:0px;border:0px">
  <t:datagrid name="buypigMainList" checkbox="true" pagination="true" pageSize="30" fitColumns="false" title="生猪采购表" sortName="createDate" actionUrl="buypigMainController.do?datagrid" idField="id" fit="true" queryMode="group">
  <t:dgCol title="操作" field="opt" width="140"></t:dgCol>
   
      
   <t:dgCol title="主键"  field="id"  hidden="true"  queryMode="single"  width="120"></t:dgCol>
   <t:dgCol title="状态"  field="auditing"  queryMode="single" replace="未确认[0]_0,已确认[1]_1" style="background:green;color:white;_0,background:red;color:white;_1" width="80"></t:dgCol>
   <t:dgCol title="采购单号"  field="buyNo" query="true"  queryMode="single"  width="120"></t:dgCol>
   <t:dgCol title="采购日期"  field="buyDate" query="true" formatter="yyyy-MM-dd"  queryMode="single"  width="80"></t:dgCol>
   <t:dgCol title="供应商"  field="baseSupplier.suppName" query="true"  queryMode="single"  width="160"></t:dgCol>
   <t:dgCol title="猪只品种"  field="baseProduct.prodName"  queryMode="single"  width="120"></t:dgCol>
   <t:dgCol title="采购头数"  field="buyNum"  queryMode="single"  width="80"></t:dgCol>
   <t:dgCol title="采购重量"  field="buyWeigh"  queryMode="single"  width="120"></t:dgCol>
   <t:dgCol title="均重"  field="avgWeigh"  queryMode="single"  width="80"></t:dgCol>
   <t:dgCol title="单价"  field="buyPrice"  queryMode="single"  width="80"></t:dgCol>
   <t:dgCol title="生猪采购金额"  field="buyMoney"  queryMode="single"  width="80"></t:dgCol>
   <t:dgCol title="生猪运费"  field="transMoney"  queryMode="single"  width="80"></t:dgCol>
   <t:dgCol title="消毒费用"  field="xdMoney"  queryMode="single"  width="80"></t:dgCol>
   <t:dgCol title="总金额"  field="totalMoney"  queryMode="single"  width="120"></t:dgCol>
   <t:dgCol title="备注"  field="memo"  queryMode="single"  width="120"></t:dgCol>
   
   <t:dgDelOpt title="删除" url="buypigMainController.do?doDel&id={id}" urlclass="ace_button"  urlfont="fa-trash-o"/>
   <t:dgToolBar title="录入" icon="icon-add" url="buypigMainController.do?goAdd" funname="add"></t:dgToolBar>
	<t:dgToolBar title="编辑" icon="icon-edit" url="buypigMainController.do?goUpdate" funname="update"></t:dgToolBar>
   <t:dgToolBar title="查看" icon="icon-search" url="buypigMainController.do?goUpdate" funname="detail"></t:dgToolBar>
   
   
   <t:dgConfOpt title="确认" exp="auditing#eq#0" message="是否执行确认" urlStyle="background-color:red" url="buypigMainController.do?doUpdateToSure&id={id}" urlclass="ace_button" urlfont="fa-gavel"/>
   <t:dgConfOpt title="撤销" exp="auditing#eq#1" message="是否执行撤销" urlStyle="background-color:green" url="buypigMainController.do?doUpdateToCancel&id={id}" urlclass="ace_button" urlfont="fa-gavel"/>
   
   
  </t:datagrid>
  </div>
 </div>
 <script type="text/javascript">
 $(document).ready(function(){
 });
 
   
 
//导入
function ImportXls() {
	openuploadwin('Excel导入', 'buypigMainController.do?upload', "buypigMainList");
}

//导出
function ExportXls() {
	JeecgExcelExport("buypigMainController.do?exportXls","buypigMainList");
}

//模板下载
function ExportXlsByT() {
	JeecgExcelExport("buypigMainController.do?exportXlsByT","buypigMainList");
}

 </script>
