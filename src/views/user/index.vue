<template>
  <div class="app-container">
    <MyTable
      :table-data="tableData"
      :formItems="formItems"
      :columns="tableColumns"
      :loading="isLoading"
      :show-pagination="true"
      :total="totalItems"
      :page-size="pageSize"
      :current-page="currentPage"
      @delete="handleDelete"
      @save="handleSave"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import MyTable from "@/components/MyTable"; // 请确保路径正确

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
          prop: "age",
          label: "年龄",
          width: "100",
        },
        {
          prop: "address",
          label: "地址",
          width: "200",
        },
      ],
      isLoading: false,
      totalItems: 100,
      pageSize: 10,
      currentPage: 1,
      formItems: [],
    };
  },
  created() {
    this.tableData = [
      { name: '网格', age: 12, id: 12 },
      { name: '网格123', age: 13, id: 12 },
    ];
    this.formItems = [
      // 动态表单项配置
      { label: "名字", prop: "name", type: "el-input", attrs: {} },
      {
        label: "年龄",
        prop: "age",
        type: "el-select",
        attrs: {
          options: [
            {value: 12, label: "12岁" },
            { value: 13, label: "13岁" },
          ],
        },
      },
    ];
  },
  methods: {
    handleDelete(row) {
      // Handle delete logic here
      console.log("Delete row:", row);
    },
    handleSave(formData) {
      // Handle save logic here
      if(formData.id){
      console.log("Save data:", formData);
      }else{
      this.tableData.push(formData)
      }
    },
    handleSizeChange(newSize) {
      // Handle page size change logic here
      console.log("Page size changed to:", newSize);
    },
    handleCurrentChange(newPage) {
      // Handle current page change logic here
      console.log("Current page changed to:", newPage);
    },
  },
};
</script>

<style scoped>
/* Optional: Scoped CSS for styling */
</style>