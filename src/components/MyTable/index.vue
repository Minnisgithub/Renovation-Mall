<!-- MyTable.vue -->
<template>
  <div>
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :label="column.label"
        :prop="column.prop"
        :formatter="column.formatter"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="showPagination"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      :total="total"
      layout="sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <el-dialog
      :visible.sync="editDialogVisible"
      title="编辑/新增数据"
      @close="handleClose"
    >
      <el-form :model="formData" label-width="80px">
        <!-- 表单项 -->
        <!-- 示例： -->
        <!-- <el-form-item label="字段名">
          <el-input v-model="formData.fieldName"></el-input>
        </el-form-item> -->
        <template v-for="(item, index) in formItems">
          <el-form-item :key="index" :label="item.label" :prop="item.prop">
            <component
              :is="item.type"
              v-model="formData[item.prop]"
              :id="`form-item-${index}`"
              v-bind="item.attrs"
            >
            <template v-if="item.type === 'el-select'">
                <el-option
                  v-for="option in item.attrs.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value">
                </el-option>
              </template>
            </component>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BaseTable",
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    formItems: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    total: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      editDialogVisible: false,
      formData: {}, // Store form data for editing
    };
  },
  methods: {
    handleEdit(row) {
      this.formData = JSON.parse(JSON.stringify(row));
      this.editDialogVisible = true;
    },
    handleDelete(row) {
      this.$emit("delete", row);
    },
    handleSave() {
      this.$emit("save", this.formData);
      this.editDialogVisible = false;
    },
    handleClose() {
      this.formData = {};
    },
    handleSizeChange(newSize) {
      this.$emit("size-change", newSize);
    },
    handleCurrentChange(newPage) {
      this.$emit("current-change", newPage);
    },
    // 新增按钮点击事件
    handleAdd() {
      // 打开编辑/新增对话框
      this.editDialogVisible = true;
      // 清空表单数据或者初始化表单数据
      this.formData = {};
    },
  },
};
</script>

<style scoped>
/* Optional: Scoped CSS for styling */
</style>