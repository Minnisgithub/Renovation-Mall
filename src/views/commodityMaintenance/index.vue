<template>
  <div>
    <div class="app-container">
      <el-form :model="queryCriteria" inline>
        <el-form-item label="商品名称">
          <el-input v-model="queryCriteria.name"></el-input>
        </el-form-item>
        <el-form-item label="商家">
          <el-select v-model="queryCriteria.businessId" placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="queryCriteria.typeId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
          <span v-html="imageUrlFormatter(row, 'imgUrl')"></span>
        </template>
      </MyTable>
    </div>
  </div>
</template>

<script>
import MyTable from "@/components/MyTable"; // 请确保路径正确
import {
  goodsadd,
  goodsdelete,
  goodsqueryList,
  goodsupdate,
  businessqueryList,
  goodsTypequeryList,
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
          label: "商品名称", // 列的标题
          width: "150", // 列的宽度
          // 其他属性如对齐方式、自定义渲染函数等根据需要添加
        },
        {
          prop: "business", // 列对应的数据字段
          label: "商家名称", // 列的标题
          width: "150", // 列的宽度
          // 其他属性如对齐方式、自定义渲染函数等根据需要添加
        },
        {
          prop: "type", // 列对应的数据字段
          label: "类型", // 列的标题
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
          prop: "price",
          label: "价格",
          width: "100",
        },
       
        {
          prop: "imgUrl",
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
      queryCriteria: { name: "" }, // 查询条件
      options: [],
      options1: [],
    };
  },
  created() {
    this.initializeData();
    this.handleQuery();
  },
  methods: {
    async initializeData() {
      try {
        this.loading = true;

        // 并行执行两个异步请求
        const [businessList, goodsList] = await Promise.all([
          businessqueryList({ pageSize: 999, page: 1 }),
          goodsTypequeryList({ pageSize: 999, page: 1 }),
        ]);

        // 处理第一个请求的结果
        this.options1 = businessList.data.list.map((item) => ({
          label: item.name,
          value: item.id, // 假设你需要一个唯一的值作为选项的 value
        }));

        // 处理第二个请求的结果
        this.options = goodsList.data.list.map((item) => ({
          label: item.name,
          value: item.id, // 假设你需要一个唯一的值作为选项的 value
        }));

        // 配置动态表单项
        this.formItems = [
          { label: "商品名称", prop: "name", type: "el-input", attrs: {} },
          {
            label: "商家名称",
            prop: "businessId",
            type: "el-select",
            attrs: {
              options: this.options1,
            },
          },
          {
            label: "类型",
            prop: "typeId",
            type: "el-select",
            attrs: {
              options: this.options,
            },
          },
          { label: "价格", prop: "price", type: "el-input", attrs: {} },
          { label: "描述", prop: "description", type: "el-input", attrs: {} },
          { label: "图片1", prop: "imgUrl", type: "el-upload", attrs: {} },
          { label: "图片2", prop: "imgUrl2", type: "el-upload", attrs: {} },
          { label: "图片3", prop: "imgUrl3", type: "el-upload", attrs: {} },
          { label: "图片4", prop: "imgUrl4", type: "el-upload", attrs: {} },
          { label: "图片5", prop: "imgUrl5", type: "el-upload", attrs: {} },
        ];
      } catch (error) {
        console.error("Error fetching data:", error);
        // 这里可以添加错误提示逻辑，例如展示通知或消息框
      } finally {
        this.loading = false;
      }
    },
    handleQuery() {
      goodsqueryList({
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
      goodsdelete([row.id]).then((res) => {
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
        goodsupdate(formData).then((res) => {
          if (res.status == 0) {
            this.$message.success("修改成功");
            this.handleQuery();
          }
        });
      } else {
        goodsadd(formData).then((res) => {
          // goodsadd( ).then((res) => {
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
    userIdFormatter(row, column, value) {
      let data = this.options1?.filter((item) => {
        return item.value == value;
      });
      return data[0] ? data[0].label : "";
    },
  },
};
</script>

<style scoped>
/* Optional: Scoped CSS for styling */
</style>