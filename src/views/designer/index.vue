<template>
  <div>
    <div class="app-container">
      <el-form :model="queryCriteria" inline>
        <el-form-item label="设计师姓名">
          <el-input v-model="queryCriteria.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
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
        editDialogwidth ="70%"
        labelwidth ="80px"
        @delete="handleDelete"
        @save="handleSave"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <template v-slot:imageColumn="{ row }">
          <span v-html="imageUrlFormatter(row, 'userPhoto')"></span>
        </template>
      </MyTable>
    </div>
  </div>
</template>

<script>
import MyTable from "@/components/MyTable"; // 请确保路径正确
import {
  querydesignerList,
  adddesigner,
  updatedesigner,
  deletedesigner,
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
          prop: "name", // 列对应的数据字段
          label: "姓名", // 列的标题
          width: "150", // 列的宽度
          // 其他属性如对齐方式、自定义渲染函数等根据需要添加
        },
        {
          prop: "userPhoto",
          label: "头像",
          width: "200",
        },
       
        {
          prop: "phone", // 列对应的数据字段
          label: "手机号码", // 列的标题
          width: "150", // 列的宽度
        },
        {
          prop: "seniority", // 列对应的数据字段
          label: "工龄", // 列的标题
          width: "150", // 列的宽度
        },
        {
          prop: "title",
          label: "设计师头衔",
          width: "200",
        },
        {
          prop: "createTime",
          label: "创建时间",
          width: "100",
        },
      ],
      isLoading: false,
      total: 10,
      formItems: [],
      pageSize: 10,
      pageNum: 1,
      queryCriteria: { name: "" }, // 查询条件
    };
  },
  created() {
    this.handleQuery();
    this.formItems = [
      // 动态表单项配置
      { label: "头像", prop: "userPhoto", type: "el-upload", attrs: {},span:6 },
      { label: "姓名", prop: "name", type: "el-input", attrs: {},span:6 },
      { label: "手机号码", prop: "phone", type: "el-input", attrs: {},span:6 },
      { label: "毕业院校", prop: "graduatedFrom", type: "el-input", attrs: {},span:6 },
      { label: "工龄", prop: "seniority", type: "el-input", attrs: {},span:6 },
      { label: "工作地", prop: "workPlace", type: "el-input", attrs: {},span:6 },
      { label: "擅长风格", prop: "deleteStyle", type: "el-input", attrs: {},span:6 },
      { label: "设计理念", prop: "designConcept", type: "el-input", attrs: {},span:6 },
      { label: "头衔", prop: "title", type: "el-input", attrs: {},span:6  },
      { label: "收费标准", prop: "chargingStandard", type: "el-input", attrs: {},span:6  },
      { label: "荣誉信息", prop: "honor", type: "el-input", attrs: {},styleType:'textarea' },
      { label: "服务范围", prop: "serviceRange", type: "el-input", attrs: {} ,styleType:'textarea'},
      { label: "服务标准", prop: "serviceStandards", type: "el-input", attrs: {},styleType:'textarea'},
    ];
  },
  methods: {
    handleQuery() {
      querydesignerList({
        ...this.queryCriteria,
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
      // Handle delete logic here
      deletedesigner([row.id]).then((res) => {
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
        updatedesigner(formData).then((res) => {
          if (res.status == 0) {
            this.$message.success("修改成功");
            this.handleQuery();
          }
        });
      } else {
        adddesigner(formData).then((res) => {
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