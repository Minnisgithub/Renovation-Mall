<template>
  <div>
    <div class="app-container">
      <el-button type="primary" @click="goBack">返回上一页</el-button>
    </div>
    <div class="app-container">
      <el-descriptions title="设计师信息">
        <el-descriptions-item label="姓名">{{
          detailList.name
        }}</el-descriptions-item>
         <el-descriptions-item label="手机号码">{{
          detailList.phone
        }}</el-descriptions-item>
         <el-descriptions-item label="毕业院校">{{
          detailList.graduatedFrom
        }}</el-descriptions-item>
         <el-descriptions-item label="工龄">{{
          detailList.seniority
        }}</el-descriptions-item>
          <el-descriptions-item label="工作地">{{
          detailList.workPlace
        }}</el-descriptions-item>
          <el-descriptions-item label="擅长风格">{{
          detailList.deleteStyle
        }}</el-descriptions-item>
          <el-descriptions-item label="设计理念">{{
          detailList.designConcept
        }}</el-descriptions-item>
         <el-descriptions-item label="设计师头衔">{{
          detailList.title
        }}</el-descriptions-item>
          <el-descriptions-item label="收费标准">{{
          detailList.chargingStandard
        }}</el-descriptions-item>
          <el-descriptions-item label="荣誉信息">{{
          detailList.honor
        }}</el-descriptions-item>
          <el-descriptions-item label="服务范围">{{
          detailList.serviceRange
        }}</el-descriptions-item>
         <el-descriptions-item label="服务标准">{{
          detailList.serviceStandards
        }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="app-container">
      <!-- 查询条件及重置按钮 -->
      <MyTable
        :table-data="tableData"
        :formItems="formItems"
        :columns="tableColumns"
        :loading="isLoading"
        :show-pagination="true"
        :total="total"
        :pageSize="pageSize"
        :pageNum="pageNum"
        @delete="handleDelete"
        @save="handleSave"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <template v-slot:imageColumn="{ row }">
          <span v-html="imageUrlFormatter(row, 'url')"></span>
        </template>
      </MyTable>
    </div>
  </div>
</template>

<script>
import MyTable from "@/components/MyTable"; // 请确保路径正确
import {
  querydesignerWorkList,
  adddesignerWork,
  updatedesignerWork,
  deletedesignerWork,
} from "@/api/all";
export default {
  components: {
    MyTable,
  },
  data() {
    return {
      tableData: [],
      tableColumns: [
        {
          prop: "description", // 列对应的数据字段
          label: "作品描述", // 列的标题
          width: "150", // 列的宽度
          // 其他属性如对齐方式、自定义渲染函数等根据需要添加
        },
        {
          prop: "photoList",
          label: "图片",
          width: "200",
          // formatter: this.imageUrlFormatter, // 使用格式化函数来展示图片
        },
      ],
      isLoading: false,
      total: 10,
      formItems: [],
      pageSize: 10,
      pageNum: 1,
      detailList: [],
    };
  },
  created() {
    console.log(this.$route.query);
    this.detailList = JSON.parse(this.$route.query.row  );
    this.handleQuery();
    this.formItems = [
      // 动态表单项配置
      { label: "作品描述", prop: "description", type: "el-input", attrs: {} },
      { label: "图片", prop: "photoList", type: "el-upload-list", attrs: {} },
    ];
  },
  methods: {
    goBack() {
      this.$router.go(-1); // Vue Router 提供的后退方法
    },
    handleQuery() {
      querydesignerWorkList({
        designerId:this.detailList.id,
        pageSize: this.pageSize,
        page: this.pageNum,
      }).then((res) => {
        this.tableData = res.data.list;
        this.pageSize = res.data.pageSize;
        this.pageNum = res.data.pageNum;
        this.total = res.data.total;
      });
      // 初始化表格数据逻辑，这里模拟数据
    },
    handleDelete(row) {
      console.log(row.id);
      // Handle delete logic here
      deletedesignerWork([row.id]).then((res) => {
        if (res.status === 0) {
          // 删除成功后的处理
          this.$message.success("删除成功");
          this.handleQuery(); // 重新查询数据，更新表格等操作
        } else {
          // 删除失败时的处理
          this.$message.error("删除失败，请重试");
        }
      });
    },
    handleSave(formData) {
      if (formData.id) {
        updatedesignerWork(formData).then((res) => {
          if (res.status == 0) {
            this.$message.success("修改成功");
            this.handleQuery();
          }
        });
      } else {
        adddesignerWork({...formData, designerId:this.detailList.id,}).then((res) => {
          if (res.status == 0) {
            this.$message.success("新增成功");
            this.handleQuery();
          }
        });
      }
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.handleQuery();
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage;
      this.handleQuery();
    },

    handleReset() {
      this.queryCriteria = { name: "" };
      this.handleQuery();
    },
    imageUrlFormatter(row, property) {
      if (row[property]) {
        return `<img src="${row[property]}" style="max-height:60px;" />`;
      } else {
        return "无图片";
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Scoped CSS for styling */
</style>