<template>
  <div>
    <div class="app-container">
      <!-- 查询条件及重置按钮 -->
      <MyTable
        :table-data="tableData"
        :formItems="formItems"
        :columns="tableColumns"
        :loading="isLoading"
        :show-pagination="false"
        :total="total"
        :pageSize="pageSize"
        :pageNum="pageNum"
        @delete="handleDelete"
        @save="handleSave"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </MyTable>
    </div>
  </div>
</template>

<script>
import MyTable from "@/components/MyTable"; // 请确保路径正确
import {
  foremanInformationqueryList,
  addForemanInformation,
  updateForemanInformation,
  foremandeleteForemanInformation,
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
          prop: "description", // 列对应的数据字段
          label: "描述", // 列的标题
          width: "150", // 列的宽度
          // 其他属性如对齐方式、自定义渲染函数等根据需要添加
        },
      
        {
          prop: "serviceArea",
          label: "服务范围",
          width: "200",
        },
         {
          prop: "price", // 列对应的数据字段
          label: "价格", // 列的标题
          width: "150", // 列的宽度
          // 其他属性如对齐方式、自定义渲染函数等根据需要添加
        },
      ],
      isLoading: false,
      total: 10,
      formItems: [],
      pageSize: 10,
      pageNum: 1,
    };
  },
  created() {
    this.handleQuery();
    this.formItems = [
      // 动态表单项配置
      { label: "描述", prop: "description", type: "el-input", attrs: {} },
      { label: "排序", prop: "orderNum", type: "el-input", attrs: {} },
      { label: "服务范围", prop: "serviceArea", type: "el-input", attrs: {} },
      { label: "价格", prop: "price", type: "el-input", attrs: {} },
    ];
  },
  methods: {
    handleQuery() {
      foremanInformationqueryList({
        pageSize: 999,
        page: 1,
      }).then((res) => {
        this.tableData = res.data.list;
      });
      // 初始化表格数据逻辑，这里模拟数据
    },
    handleDelete(row) {
      // Handle delete logic here
      foremandeleteForemanInformation({id:row.id})
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
        updateForemanInformation(formData).then((res) => {
          if (res.status == 0) {
            this.$message.success("修改成功");
            this.handleQuery();
          }
        });
      } else {
        addForemanInformation(formData).then((res) => {
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