<template>
  <div>
    <div class="app-container">
      <div class="header">
        <el-select
          v-model="selectedProject"
          @change="selectChange"
          placeholder="请选择"
        >
          <el-option
            v-for="item in projectList"
            :key="item"
            :label="item"
            :value="item"
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
          :index="item.index"
          v-for="item in menulist"
          :key="item.index"
        >
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import {
  getConstructionTypeList,
} from "@/api/all";
export default {
  data() {
    return {
      activeIndex: "0", //激活菜单
      menulist:[
        {name:'施工标准'},
        {name:'验收标准'},
        {name:'市场工价'},
      ],
      projectList:[
        '水',
        '点',
      ]
    };
  },
  created () {
     getConstructionTypeList().then((res) => {
         if (res.status === 0) {
            console.log(res);
          } 
       
      });;
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key;
    //   this.getUserQueryList();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>