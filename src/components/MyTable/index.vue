<!-- MyTable.vue -->
<template>
  <div>
    <div class="addBtn">
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
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
          <el-button
            v-show="deleteShow"
            type="text"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="showPagination"
      :current-page="pageNum"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      :total="total"
      layout="sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      align="right"
    >
    </el-pagination>
    <el-dialog
      :visible.sync="editDialogVisible"
      title="编辑/新增数据"
      @close="handleClose"
    >
      <el-form :model="formData" label-width="120px">
        <!-- 表单项 -->
        <!-- 示例： -->
        <!-- <el-form-item label="字段名">
          <el-input v-model="formData.fieldName"></el-input>
        </el-form-item> -->
        <template v-for="(item, index) in formItems">
          <el-form-item
            :key="index"
            :label="item.label"
            :prop="item.prop"
            v-show="shouldShowFormItem(item)"
          >
            <template v-if="item.type === 'el-input'">
              <el-input
                v-model="formData[item.prop]"
                :id="`form-item-${index}`"
                v-bind="item.attrs"
              ></el-input>
            </template>
            <template v-else-if="item.type === 'el-select'">
              <el-select
                v-model="formData[item.prop]"
                :id="`form-item-${index}`"
                v-bind="item.attrs"
              >
                <el-option
                  v-for="option in item.attrs.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </template>
            <template v-else-if="item.type === 'el-radio-group'">
              <el-radio-group
                v-model="formData[item.prop]"
                :id="`form-item-${index}`"
              >
                <el-radio
                  v-for="option in item.attrs.options"
                  :key="option.value"
                  :label="option.value"
                  >{{ option.label }}</el-radio
                >
              </el-radio-group>
            </template>
            <template v-else-if="item.type === 'el-upload'">
              <el-upload
                class="upload-demo"
                :action="env=== 'development'?'/baseapi/file/upload':'/file/upload'"
                :show-file-list="false"
                :on-success="handleUploadSuccess"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </template>
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
  name: "MyTable",
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
    pageNum: {
      type: Number,
      required: true,
    },
    deleteShow: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    env() {
      return process.env.NODE_ENV;
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
    handleUploadSuccess(response, file, fileList) {
      // 处理上传成功的逻辑，更新 formData 中的相关字段
      this.formData.imageUrl = response.url; // 假设后端返回一个url字段表示上传成功后的图片地址
    },
    shouldShowFormItem(item) {
      if (item.prop === "password" && this.formData.adminType === 0) {
        return false;
      }
      if (item.prop === "userStatus" && this.formData.adminType === 0) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
/* Optional: Scoped CSS for styling */
.addBtn {
  display: flex;
  flex-direction: row-reverse;
}
</style>