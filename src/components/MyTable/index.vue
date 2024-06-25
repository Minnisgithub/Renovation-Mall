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
        <template v-if="column.prop === 'url' || column.prop === 'imgUrl' || column.prop === 'userPhoto' || column.prop === 'photoList'" v-slot="{ row }">
          <template v-if="column.prop === 'url' ||column.prop === 'imgUrl' ||column.prop === 'userPhoto'">
          <slot name="imageColumn" :row="row"></slot>
          </template>
          <template v-else-if="column.prop === 'photoList'">
          <el-button type="text" @click="handleViewPhotos(row)">查看照片集合</el-button>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="showDetail"
            type="text"
            @click="handleDetail(scope.row)"
            >查看详情</el-button
          >
          <el-divider v-if="showDetail" direction="vertical"></el-divider>
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm
            title="确定删除？"
            @confirm="handleDelete(scope.row)"
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
                    :type="item.styleType ? item.styleType : 'text'"
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
                <template v-else-if="item.type === 'el-upload-list'">
                  <div
                    v-if="formData[item.prop] && formData[item.prop].length > 0"
                  >
                    <el-row>
                      <el-col
                        v-for="(file, index) in formData[item.prop]"
                        :key="index"
                        :span="24"
                      >
                        <el-image
                          style="width: 200px; margin-bottom: 10px"
                          :src="file.photoUrl"
                          fit="cover"
                        ></el-image>
                        <el-button
                          type="text"
                          @click="handleRemoveImage(index, item.prop)"
                          >删除</el-button
                        >
                      </el-col>
                    </el-row>
                  </div>
                  <el-upload
                    class="upload-demo"
                    :action="
                      env === 'development'
                        ? '/baseapi/file/upload'
                        : '/file/upload'
                    "
                    :show-file-list="false"
                    :on-success="
                      (response) => handleUploadSuccess1(response, item.prop)
                    "
                    :headers="headers"
                    multiple
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
    <el-dialog title="照片集合" :visible.sync="PhotosdialogVisible" width="60%">
      <el-row>
        <el-col v-for="(photo, index) in currentPhotos" :key="index" :span="8">
          <el-image
            style="width: 100%; margin-bottom: 10px"
            :src="photo.photoUrl"
            fit="cover"
          ></el-image>
        </el-col>
      </el-row>
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
    showDetail: {
      type: Boolean,
      default: false,
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
      PhotosdialogVisible: false,
      currentPhotos: [],
    };
  },
  methods: {
    handleEdit(row) {
      this.formData = JSON.parse(JSON.stringify(row));
      this.editDialogVisible = true;
    },
    handleDetail(row) {
      this.$emit("detail", row);
    },
    handleDelete(row) {
      console.log(222);
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
    handleUploadSuccess1(response, prop) {
      const uploadedImage = { photoUrl: response.data };
      if (!this.formData[prop]) {
        this.$set(this.formData, prop, []); // Vue 2.x 需要使用 $set 添加响应式属性
      }
      this.formData[prop].push(uploadedImage);
    },
    handleRemoveImage(index, prop) {
      this.formData[prop].splice(index, 1); // 从数组中移除指定索引的图片信息
    },
    handleViewPhotos(row) {
      // 处理查看照片集合按钮点击事件
      console.log(row);
      this.currentPhotos = row.photoList; // 假设 row.photoList 是一个包含照片信息的数组
      this.PhotosdialogVisible = true; // 打开 el-dialog
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