<!-- MyTable.vue -->
<template>
  <div>
    <el-table :data="tableData" v-loading="loading">
      <!-- Columns -->
      <el-table-column v-for="column in columns" :key="column.prop" :label="column.label" :prop="column.prop" :formatter="column.formatter">
      </el-table-column>

      <!-- Operations Column -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <el-pagination
      v-if="showPagination"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      :total="total"
      layout="sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>

    <!-- Edit Dialog -->
    <el-dialog :visible.sync="editDialogVisible" title="编辑" @close="handleClose">
      <!-- Your edit form components here -->
      <el-form>
        <!-- Form fields -->
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
  name: 'BaseTable',
  props: {
    tableData: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      editDialogVisible: false,
      editFormData: null // Store form data for editing
    };
  },
  methods: {
    handleEdit(row) {
      // Open dialog for editing
      this.editFormData = row;
      this.editDialogVisible = true;
    },
    handleDelete(row) {
      // Handle delete operation
      // Emit event or perform deletion logic
      this.$emit('delete', row);
    },
    handleSave() {
      // Handle save operation
      // Emit event or perform save logic
      this.$emit('save', this.editFormData);
      this.editDialogVisible = false;
    },
    handleClose() {
      // Handle dialog close event
      this.editFormData = null;
    },
    handleSizeChange(newSize) {
      // Handle page size change
      this.$emit('size-change', newSize);
    },
    handleCurrentChange(newPage) {
      // Handle current page change
      this.$emit('current-change', newPage);
    }
  }
};
</script>

<style scoped>
/* Optional: Scoped CSS for styling */
</style>