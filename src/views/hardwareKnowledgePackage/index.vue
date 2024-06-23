<template>
  <div>
    <div class="app-container">
      <el-form :model="queryCriteria" inline>
        <el-form-item label="名称">
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
  hardwareKnowledgePackagequeryList,
  addHardwareKnowledgePackage,
  updateHardwareKnowledgePackage,
  deleteHardwareKnowledgePackage,
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
          prop: "orderNum", // 列对应的数据字段
          label: "排序", // 列的标题
          width: "150", // 列的宽度
          // 其他属性如对齐方式、自定义渲染函数等根据需要添加
        },
        {
          prop: "serviceContent", // 列对应的数据字段
          label: "服务内容", // 列的标题
          width: "150", // 列的宽度
          // 其他属性如对齐方式、自定义渲染函数等根据需要添加
        },
            {
          prop: "serviceArea", // 列对应的数据字段
          label: "服务范围", // 列的标题
          width: "150", // 列的宽度
          // 其他属性如对齐方式、自定义渲染函数等根据需要添加
        },
            {
          prop: "serviceTime", // 列对应的数据字段
          label: "服务时间", // 列的标题
          width: "150", // 列的宽度
          // 其他属性如对齐方式、自定义渲染函数等根据需要添加
        },
        {
          prop: "url",
          label: "二维码",
          width: "200",
          // formatter: this.imageUrlFormatter, // 使用格式化函数来展示图片
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
      { label: "服务内容", prop: "serviceContent", type: "el-input", attrs: {} },
      { label: "服务范围", prop: "serviceArea", type: "el-input", attrs: {} },
      { label: "服务时间", prop: "serviceTime", type: "el-input", attrs: {} },
      { label: "排序", prop: "orderNum", type: "el-input", attrs: {} },
      { label: "二维码", prop: "url", type: "el-upload", attrs: {} },
    ];
  },
  methods: {
    handleQuery() {
      hardwareKnowledgePackagequeryList({
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
      deleteHardwareKnowledgePackage([row.id])
        .then((res) => {
          if (res.status === 0) {
            // 删除成功后的处理
            this.$message.success("删除成功");
            this.handleQuery(); // 重新查询数据，更新表格等操作
          } else {
            // 删除失败时的处理
            this.$message.error("删除失败，请重试");
          }
        })
    },
    handleSave(formData) {
      if (formData.id) {
        updateHardwareKnowledgePackage(formData).then((res) => {
          if (res.status == 0) {
            this.$message.success("修改成功");
            this.handleQuery();
          }
        });
      } else {
        addHardwareKnowledgePackage(formData).then((res) => {
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