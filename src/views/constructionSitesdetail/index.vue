<template>
  <div>
    <div class="app-container">
      <el-button type="primary" @click="goBack">返回上一页</el-button>
    </div>
    <div class="app-container">
      <el-form :model="queryCriteria" inline>
        <el-form-item label="阶段查询">
          <el-select
            @change="handleSelectChange"
            v-model="queryCriteria.stageId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="app-container">
      <el-descriptions title="工地详细信息">
        <el-descriptions-item label="设计师">{{
          detailList.designerName
        }}</el-descriptions-item>
        <el-descriptions-item label="工长">{{
          detailList.foremanName
        }}</el-descriptions-item>
        <!-- <el-descriptions-item label="阶段">{{
          detailList.stageName
        }}</el-descriptions-item> -->
        <el-descriptions-item label="地址">{{
          detailList.address
        }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{
          detailList.createTime
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
        <template  v-slot:URLColumn="{ row }">
          <span v-html="imageUrlFormatter(row, 'url')"></span>
        </template>
      </MyTable>
    </div>
  </div>
</template>

<script>
import MyTable from "@/components/MyTable"; // 请确保路径正确
import {
  queryListByContractId,
  addContractSummary,
  updateContractSummary,
  deleteContractSummary,
  contractStagequeryList,
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
          prop: "preparation", // 列对应的数据字段
          label: "准备工作", // 列的标题
          width: "150", // 列的宽度
          // 其他属性如对齐方式、自定义渲染函数等根据需要添加
        },
        {
          prop: "coordinateWork", // 列对应的数据字段
          label: "配合工作", // 列的标题
          width: "150", // 列的宽度
          // 其他属性如对齐方式、自定义渲染函数等根据需要添加
        },
        {
          prop: "summary", // 列对应的数据字段
          label: "总结内容", // 列的标题
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
      queryCriteria: {},
      options3: [],
    };
  },
  async created() {
    console.log(this.$route.query);
    this.detailList = JSON.parse(this.$route.query.row);
    this.formItems = [
      // 动态表单项配置
      { label: "准备工作", prop: "preparation", type: "el-input", attrs: {} },
      {
        label: "配合工作",
        prop: "coordinateWork",
        type: "el-input",
        attrs: {},
      },
      { label: "总结内容", prop: "summary", type: "el-input", attrs: {} },
      { label: "图片", prop: "photoList", type: "el-upload-list", attrs: {} },
    ];
    const StagequeryListdata = await contractStagequeryList({
      pageSize: 999,
      page: 1,
    });
    this.options3 = StagequeryListdata.data.map((item) => ({
      label: item.name,
      value: item.id, // 假设你需要一个唯一的值作为选项的 value
    }));
    this.queryCriteria = {
      stageId: this.detailList.stageId,
    };
    this.handleQuery();
  },
  methods: {
    goBack() {
      this.$router.go(-1); // Vue Router 提供的后退方法
    },
    handleSelectChange() {
      this.handleQuery();
    },
    handleQuery() {
      queryListByContractId({
        stageId: this.queryCriteria.stageId,
        contractId: this.detailList.id,
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
      deleteContractSummary([row.id]).then((res) => {
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
        updateContractSummary(formData).then((res) => {
          if (res.status == 0) {
            this.$message.success("修改成功");
            this.handleQuery();
          }
        });
      } else {
        addContractSummary({
          ...formData,
          contractId: this.detailList.id,
          stageId: this.detailList.stageId,
        }).then((res) => {
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
      this.queryCriteria = {};
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