<!-- MyTable.vue -->
<template>
  <div>
    <div class="addBtn">
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      v-loading="loading"
      style="max-height: 600px; overflow-y: auto"
      :header-fixed="true"
      height="500"
    >
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :label="column.label"
        :prop="column.prop"
        :formatter="column.formatter"
      >
        <template
          v-if="
            column.prop === 'url' ||
            column.prop === 'imgUrl' ||
            column.prop === 'userPhoto'
          "
          v-slot="{ row }"
        >
          <slot name="imageColumn" :row="row"></slot>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm
            title="确定删除？"
            @onConfirm="handleDelete(scope.row)"
          >
            <el-button slot="reference" type="text" size="small"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="showPagination"
      :current-page="pageNum"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      align="right"
    >
    </el-pagination>
    <el-dialog
      :visible.sync="editDialogVisible"
      title="编辑/新增数据"
      @close="handleClose"
      :width="editDialogwidth"
    >
      <el-form :model="formData" :label-width="labelwidth">
        <el-row>
          <template v-for="(item, index) in formItems">
            <el-col :span="item.span || 24" :key="index">
              <el-form-item
                :key="index"
                :label="item.label"
                :prop="item.prop"
                v-show="shouldShowFormItem(item)"
              >
                <template v-if="item.type === 'el-input'">
                  <el-input
                    v-model="formData[item.prop]"
                    :type="item.styleType?item.styleType:'text'"
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
                  <el-image
                    v-if="formData[item.prop]"
                    style="height: 200px"
                    :src="formData[item.prop]"
                    fit="cover"
                  ></el-image>
                  <el-upload
                    class="upload-demo"
                    :action="
                      env === 'development'
                        ? '/baseapi/file/upload'
                        : '/file/upload'
                    "
                    :show-file-list="false"
                    :on-success="
                      (response) => handleUploadSuccess(response, item.prop)
                    "
                    :headers="headers"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
var token = getToken();

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
    },
    pageSize: {
      type: Number,
    },
    pageNum: {
      type: Number,
    },
    editDialogwidth: {
      type: String,
      default: "50%", // 默认值，可以是百分比、像素等
    },
    labelwidth: {
      type: String,
      default: "120px", // 默认值，可以是百分比、像素等
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
      headers: { token: token },
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
    handleUploadSuccess(response, itemProp) {
      this.$set(this.formData, itemProp, response.data);
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