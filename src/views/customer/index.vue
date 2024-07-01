<template>
  <div>
    <div class="customer">
      <div  style="height: 200px,width:200px" class="border">
      <el-image
        v-if="URL"
        style="height: 200px,width:200px"
        :src="URL"
        fit="cover"
      ></el-image>
      </div>
    </div>
    <div class="customer">
      <el-upload
        class="upload-demo"
        :action="
          env === 'development' ? '/baseapi/file/upload' : '/file/upload'
        "
        :show-file-list="false"
        :on-success="(response) => handleUploadSuccess(response)"
        :headers="headers"
      >
        <el-button size="small" type="primary">
          {{ URL ? "更换" : "点击上传" }}
        </el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { customerquery, customerupdate} from "@/api/all";
import jsCookie from 'js-cookie';

var token = getToken();

export default {
  data() {
    return {
      URL: "",
      headers: { token: token },
    };
  },
  computed: {
    env() {
      return process.env.NODE_ENV;
    },
  },
  created() {
    customerquery().then(res=>{
      this.URL = JSON.parse(res.data.valueValue).url
    })
  },
  methods: {
    handleUploadSuccess(response) {
      this.URL = response.data;
      customerupdate({url:this.URL}).then(res=>{
        this.$message.success("上传成功")
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.customer {
    margin-top: 80px;
  display: flex;
  justify-content: center;
  height: 200px;
}
v::deep .el-image{
  background-color: #000;
}
.border{
  border: 1px dashed #aaa6a6;
  width:200px
}
</style>