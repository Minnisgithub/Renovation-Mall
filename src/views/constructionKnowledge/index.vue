<template>
  <div>
    <div class="app-container header">
      <div>
        类型：
        <el-select
          @change="selectChange"
          v-model="selectedProject"
          placeholder="请选择"
        >
          <el-option
            v-for="item in projectList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="app-container">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="item in menulist"
          :key="item.id"
          :index="item.id.toString()"
        >
          {{ item.name }}
        </el-menu-item>
      </el-menu>
      <MyTable
        :table-data="tableData"
        :formItems="formItems1"
        :columns="tableColumns1"
        :showPagination="false"
        @delete="handleDelete"
        @save="handleSave"
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
  getConstructionTypeList,
  addConstructionStandard,
  deleteConstructionStandardByIds,
  getConstructionStandardList,
  updateConstructionStandard,
  addCheckAcceptStandard,
  deleteCheckAcceptStandardByIds,
  getCheckAcceptStandardList,
  updateCheckAcceptStandard,
  addMarketRate,
  deleteMarketRateByIds,
  getMarketRateList,
  updateMarketRate,
} from "@/api/all";
export default {
  components: {
    MyTable,
  },
  data() {
    return {
      activeIndex: "1", //激活菜单
      menulist: [
        { id: 1, name: "施工标准" },
        { id: 2, name: "验收标准" },
        { id: 3, name: "市场工价" },
      ],
      projectList: [],
      selectedProject: "",
      tableData: [],
      tableColumns1: [
        {
          prop: "orderNum", // 列对应的数据字段
          label: "排序", // 列的标题
          width: "150", // 列的宽度
          // 其他属性如对齐方式、自定义渲染函数等根据需要添加
        },
        {
          prop: "constructionType", // 列对应的数据字段
          label: "类型", // 列的标题
          width: "150", // 列的宽度
          // 其他属性如对齐方式、自定义渲染函数等根据需要添加
        },
        {
          prop: "description", // 列对应的数据字段
          label: "基础描述", // 列的标题
          width: "150", // 列的宽度
          // 其他属性如对齐方式、自定义渲染函数等根据需要添加
        },
        {
          prop: "url",
          label: "链接",
          width: "200",
        },
      ],
      formItems1: [
        { label: "基础描述", prop: "description", type: "el-input", attrs: {} },
        { label: "排序", prop: "orderNum", type: "el-input", attrs: {} },
        { label: "图片", prop: "url", type: "el-upload", attrs: {} },
      ],
    };
  },
  created() {
    getConstructionTypeList().then((res) => {
      if (res.status === 0) {
        this.projectList = res.data;
      }
    });
  },
  methods: {
    selectChange() {
      this.handleQuery();
    },
    handleQuery() {
      const fetchData = (fetchMethod) => {
        fetchMethod({ constructionType: this.selectedProject }).then((res) => {
          this.tableData = res.data;
        });
      };
      if (this.activeIndex === "1") {
        fetchData(getConstructionStandardList);
      } else if (this.activeIndex === "2") {
        fetchData(getCheckAcceptStandardList);
      } else {
        fetchData(getMarketRateList);
      }
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      this.handleQuery();
    },
    handleDelete(row) {
      // Handle delete logic here
      const fetchData = (fetchMethod) => {
        fetchMethod([row.id]).then((res) => {
          this.$message.success("删除成功");
          this.handleQuery(); // 重新查询数据，更新表格等操作
        });
      };
      if (this.activeIndex === "1") {
        fetchData(deleteConstructionStandardByIds);
      } else if (this.activeIndex === "2") {
        fetchData(deleteCheckAcceptStandardByIds);
      } else {
        fetchData(deleteMarketRateByIds);
      }
    },
    handleSave(formData) {
      if (formData.id) {
        const fetchData = (fetchMethod) => {
          fetchMethod({
            ...formData,
            constructionType: this.selectedProject,
          }).then((res) => {
            if (res.status == 0) {
              this.$message.success("修改成功");
              this.handleQuery();
            }
          });
        };
        if (this.activeIndex === "1") {
          fetchData(updateConstructionStandard);
        } else if (this.activeIndex === "2") {
          fetchData(updateCheckAcceptStandard);
        } else {
          fetchData(updateMarketRate);
        }
      } else {
        const fetchData = (fetchMethod) => {
          fetchMethod({
            ...formData,
            constructionType: this.selectedProject,
          }).then((res) => {
            if (res.status == 0) {
              this.$message.success("新增成功");
              this.handleQuery();
            }
          });
        };
        if (this.activeIndex === "1") {
          fetchData(addConstructionStandard);
        } else if (this.activeIndex === "2") {
          fetchData(addCheckAcceptStandard);
        } else {
          fetchData(addMarketRate);
        }
      }
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

<style lang="scss" scoped>
.header {
}
</style>