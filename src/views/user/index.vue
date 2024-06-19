<template>
  <div>
    <div class="app-container">
      <el-form :model="queryCriteria" inline>
        <el-form-item label="姓名">
          <el-input v-model="queryCriteria.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="queryCriteria.mobile"></el-input>
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
      />
    </div>
  </div>
</template>

<script>
import MyTable from "@/components/MyTable"; // 请确保路径正确
import { addUser, queryUserList, updateUser,deleteUserById } from "@/api/all";
export default {
  components: {
    MyTable,
  },
  data() {
    return {
      tableData: [],
      tableColumns: [
        {
          prop: "userName", // 列对应的数据字段
          label: "用户名", // 列的标题
          width: "150", // 列的宽度
          // 其他属性如对齐方式、自定义渲染函数等根据需要添加
        },
        {
          prop: "mobile", // 列对应的数据字段
          label: "手机号", // 列的标题
          width: "150", // 列的宽度
          // 其他属性如对齐方式、自定义渲染函数等根据需要添加
        },
        {
          prop: "gender",
          label: "性别",
          width: "100",
          formatter: this.genderFormatter, // 使用格式化函数
        },
        {
          prop: "adminType",
          label: "是否管理人员",
          width: "200",
          formatter: this.adminTypeFormatter, // 使用格式化函数
        },
        {
          prop: "userStatus",
          label: "是否禁用",
          width: "200",
          formatter: this.userStatusFormatter, // 使用格式化函数
        },
      ],
      isLoading: false,
      total: 100,
      formItems: [],
      pageSize: 10,
      pageNum: 1,
      queryCriteria: { userName: "", mobile: "" }, // 查询条件
    };
  },
  created() {
    this.handleQuery();
    this.formItems = [
      // 动态表单项配置
      { label: "用户名", prop: "userName", type: "el-input", attrs: {} },
      { label: "手机号", prop: "mobile", type: "el-input", attrs: {} },
      {
        label: "性别",
        prop: "gender",
        type: "el-radio-group",
        attrs: {
          options: [
            { value: 1, label: "男" },
            { value: 2, label: "女" },
          ],
        },
      },
      {
        label: "是否管理人员",
        prop: "adminType",
        type: "el-radio-group",
        attrs: {
          options: [
            { value: 1, label: "是" },
            { value: 0, label: "否" },
          ],
        },
      },
      { label: "密码", prop: "password", type: "el-input", attrs: {} },
      {
        label: "是否禁用",
        prop: "userStatus",
        type: "el-radio-group",
        attrs: {
          options: [
            { value: 1, label: "可用" },
            { value: 0, label: "禁用" },
          ],
        },
      },
      // {
      //   label: "年龄",
      //   prop: "age",
      //   type: "el-select",
      //   attrs: {
      //     options: [
      //       { value: 12, label: "12岁" },
      //       { value: 13, label: "13岁" },
      //     ],
      //   },
      // },
    ];
  },
  methods: {
    handleQuery() {
      queryUserList({
        ...this.queryCriteria,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      }).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
        // .map(item =>{
        //   item.password = ''
        //   return item
        // });
        this.pageSize = res.data.pageSize;
        this.pageNum = res.data.pageNum;
        this.total = res.data.total;
      });
      // 初始化表格数据逻辑，这里模拟数据
    },
    handleDelete(row) {
      // Handle delete logic here
      deleteUserById({id:row.userId})
        .then((res) => {
          if (res.status === 0) {
            // 删除成功后的处理
            this.$message.success("删除成功");
            this.handleQuery(); // 重新查询数据，更新表格等操作
          }
        })
    },
    handleSave(formData) {
      if (formData.userId) {
        updateUser(formData).then((res) => {
          if (res.status == 0) {
            this.$message.success("修改成功");
            this.handleQuery();
          }
        });
      } else {
        addUser(formData).then((res) => {
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
      this.queryCriteria = { userName: "", mobile: "" };
      this.handleQuery();
    },
    genderFormatter(row, column, value) {
      return value === 1 ? "男" : "女";
    },
    adminTypeFormatter(row, column, value) {
      return value === 1 ? "是" : "否";
    },
    userStatusFormatter(row, column, value) {
      return value === 1 ? "可用" : "禁用";
    },
  },
};
</script>

<style scoped>
/* Optional: Scoped CSS for styling */
</style>