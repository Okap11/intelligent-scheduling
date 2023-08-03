<template>
  <div id="page">
    <div class="nav">
      <button style="width: 110px" @click="addManage">添加员工</button>
      <div class="add-type" v-if="show_add">
        <p @click="page = 0; addInfo()">导入文件添加</p>
        <p @click="page = 1; addInfo()">手动输入添加</p>
      </div>
      <div>
        <select name="" id="" style="outline: none;height: 30px;border: 1px solid #999;border-radius: 4px;" v-model="selected">
          <option value="" disabled selected>选择查看门店</option>
          <option value="">所有门店</option>
          <option
              :value="value.id"
              v-for="(value, index) in storeArr"
              :key="index"
            >
              {{ value.name }}
            </option>
        </select>
        <span style="margin: 0px 10px 0px;font-size: 13px;color: #409EFF;">共{{ all }}条数据</span>
        <input type="text" placeholder="请输入姓名" v-model="input" style="margin-right: 18px;"/>
      </div>
    </div>

    <div class="manage-info">
      <table border="0" cellpadding="0" cellspacing="0">
        <tr>
          <th>姓名</th>
          <th>职位</th>
          <th>工号</th>
          <th>账户</th>
          <th>操作</th>
        </tr>
        <p v-if="!manages.length" style="text-align: center;margin-top: 10px;color: #999;">暂无数据</p>
        <tr v-for="(value,index) in manages" :key="value.id">
          <td>
            {{ value.name }}&nbsp;
            <i
              v-show="!loading"
              class="el-icon-view"
              @click="drawer = true; showMessage(value.email)"
            ></i>
            <i v-show="loading" class="el-icon-loading"></i>
          </td>
          <td>{{ value.posts }}</td>
          <td>{{ value.id }}</td>
          <td>{{ value.email }}</td>
          <td>
            <button @click="change(index)">修改</button>
            <button :id="value.id" @click="del">删除</button>
          </td>
        </tr>
      </table>

      <div class="pagination">
        <el-pagination
          background
          @current-change="currentChange"
          layout="prev, pager, next"
          :page-count="total"
          :current-page="val"
        ></el-pagination>
      </div>
    </div>

    <div>
      <el-dialog
        title="修改信息"
        :visible.sync="dialogFormVisible"
        class="change"
      >
        <div>
          <p>姓名：</p><span>{{ changeManage.name }}</span><br><br>
          <label for="name">职位: </label>
          <input type="text" name="" id="name" v-model="changeManage.posts"/><br /><br />
          <label for="area">账户: </label>
          <input type="text" name="" id="area" v-model="changeManage.email"/><br /><br />
          <p>所属门店: </p>
          <select name="" id="" v-model="changeManage.store">
            <option
              :value="value.id"
              v-for="(value, index) in storeArr"
              :key="index"
            >
              {{ value.name }}
            </option>
          </select>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendChange"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>

    <div class="light" v-if="show">
      <!-- 点击手动添加进入此页面 -->
      <div v-if=" page == 1 ">
        <p>添加员工信息</p>
      <div class="wrapper">
        <div style="display: flex">
          <div>
            <label for="name">姓名</label><br />
            <input type="text" id="name" v-model="manage.name" /><br />
            <label for="phone">电话</label><br />
            <input type="text" id="phone" v-model="manage.phone" maxlength="11" />
          </div>
          <div>
            <label for="name">职位</label><br />
            <input type="text" id="position" v-model="manage.posts" /><br />
            <label for="idCard">身份证</label><br />
            <input type="text" id="idCard" v-model="manage.idCard" maxlength="18" />
          </div>
        </div>
        <div style="display: flex; align-items: center">
          <div>
            <label for="email" style="width: 460px">电子邮箱 &nbsp; &nbsp;<span style="font-size: 13px; color: red;">{{ tips }} </span></label><br />
            <input type="email" id="email" v-model="manage.email" @blur="checkEmail" style="width: 460px" />
          </div>
          <select name="" id="select" v-model="manage.store">
            <option value="" disabled selected>选择门店</option>
            <option
              :value="value.id"
              v-for="(value, index) in storeArr"
              :key="index"
            >
              {{ value.name }}
            </option>
          </select>
        </div>
        <div style="margin-top: 30px">
          <el-button type="primary" style="margin-right: 30px" @click="confirm" ref="confirm"
            >确认</el-button>
          <el-button @click="cancel">取消</el-button>
          <p v-show="fit">请检查您输入的信息是否正确！</p>
        </div>
      </div>
      </div>

      <!-- 点击导入文件添加进入此页面 -->
      <div v-if="page == 0" v-loading="addLoading">
        <p style="text-align: center;width: 100%; margin: 50px 0px 30px;font-size: 18px;font-weight: 500;">请选择您要提交的文件</p>
        <el-upload
          class="upload-demo"
          drag
          action="#"
          :auto-upload="false"
          :file-list="list"
          :on-change="handleChange">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传xsl/xslx文件</div>
        </el-upload>
        <div style="margin-top: 30px">
          <el-button type="primary" style="margin-right: 30px" @click="confirmUpload"
            >确认</el-button
          >
          <el-button @click="cancel">取消</el-button>
        </div>
      </div>
    </div>
    <div class="fade" v-if="show"></div>

    <!-- 员工详情页 -->
    <el-drawer
      title="员工个人信息"
      :visible.sync="drawer"
      :with-header="false">
      <div class="outer">
        <div class="top">
          <p>{{ user.name }}</p>
        </div>
        <div class="left">
          <span>姓名: </span><span>{{ user.name }}</span><br>
          <span>职位: </span><span>{{ user.posts }}</span><br>
          <span>电话: </span><span>{{ user.phone }}</span><br>
          <span>住址: </span><span>{{ user.address ? user.address : '-' }}</span>
        </div>
        <div class="right">
          <span>性别: </span><span>{{ user.gender ? user.gender : '-' }}</span><br>
          <span>工号: </span><span>{{ user.id }}</span><br>
          <span>所属门店: </span><span>{{ user.store }}</span><br>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name:'Manage',
  data() {
    return {
      show: false,
      page:'',
      show_add: false,
      drawer:false,
      val: 1,
      total: 0,
      loading: false,
      tips: '',
      fit: false,
      note:'',
      all: 0,
      selected: '',
      addLoading: false,
      input: '',
      dialogFormVisible: false,
      list:[],
      manage:{
        name: '',
        posts: '',
        phone: '',
        idCard: '',
        email: '',
        store: ''
      },
      storeArr: [
        {
          id: "hbyt01",
          name: "泉信",
        },
        {
          id: "hbyt02",
          name: "电力",
        }
      ],
      manages: [],
      user:{},
      changeManage:{}
    };
  },
  mounted() {
    this.getManage()
    this.getStore()
  },
  watch:{
    input(){
      this.getManage()
    },
    selected(){
      this.val = 1
      this.getManage()
    }
  },
  methods: {
    getManage(){
      this.$http({
        method: "GET",
        url: "http://192.168.136.205:8080/users/pages/" + this.val + '&' + this.selected + '&' + this.input
      }).then((resp) => {
        this.manages = resp.data.data
        this.total = parseInt(resp.data.msg)
        this.all = resp.data.code
      });
    },
    getStore(){
      this.$http({
        method: 'GET',
        url: 'http://192.168.136.205:8080/Store/stores'
      }).then( result => {
        this.storeArr = result.data.data
      })
    },
    currentChange(val){
      this.val = val
      this.getManage()
    },
    // 修改按钮
    change(e) {
      this.dialogFormVisible = true
      this.changeManage = this.manages[e]
    },
    sendChange(){
      this.dialogFormVisible = false
      this.$http({
        method:'PUT',
        url: 'http://192.168.136.205:8080/users/employee',
        data:{
          'user': this.changeManage
        }
      })
      this.getManage()
    },
    // 删除按钮
    del(e) {
      this.$http({
        method: 'DELETE',
        url: "http://192.168.136.205:8080/users/" + e.target.id,
      }).then(resp => {
        this.getManage()
        if( resp.data.msg == '删除成功'){
          this.open1()
        }else{
          this.note = resp.data.msg
          this.open2()
        }
      })
    },
    // 添加员工按钮
    addManage() {
      this.show_add = !this.show_add;
    },
    // 手动添加员工信息
    addInfo() {
      this.show = true;
      this.show_add = !this.show_add;
      document.body.style.overflow = "hidden";
    },
    // 电子邮件失去焦点后判断是否被注册
    checkEmail(){
      this.$http({
        method: 'GET',
        url: 'http://192.168.136.205:8080/users/' + this.manage.email
      }).then(result => {
        if(result.data.code == 20231){
          this.tips = result.data.msg
        }else{
          this.tips = result.data.msg
        }
      })
    },
    handleChange(file , fileList){
      this.list = fileList
    },
    confirmUpload(){
      let param = new FormData()
      this.list.forEach(
						(val, index) => {
							param.append("file", val.raw);
          }
        );
        this.addLoading = true
        this.$http({
          "url": "http://192.168.136.205:8080/users/uploadExcel",
          "method": "POST",
          "timeout": 0,
          "processData": false,
          "mimeType": "multipart/form-data",
          "contentType": false,
          "data": param
        }).then( result => {
          this.addLoading = false
          this.show = false
          this.getManage()
          alert(result.data.msg)
        })

    },
    // 点击添加员工后的取消按钮
    cancel() {
      this.manage = {
        name: '',
        posts: '',
        phone: '',
        idCard: '',
        email: '',
        store: ''
      }
      this.show = false;
      document.body.style.overflow = "";
    },
    open1() {
        this.$notify({
          title: '成功',
          message: '删除成功！',
          type: 'success',
          duration: '1000'
        });
      },
    open2() {
        this.$notify({
          title: '警告',
          message: this.note,
          type: 'warning',
          duration: '1000'
        });
      },
    // 点击确定添加员工按钮
    confirm() {
      if(this.manage.name.length == 0 || this.manage.posts.length == 0 || this.manage.phone.length == 0 ||
      this.manage.idCard.length == 0 || this.manage.email.length == 0 || this.manage.store.length == 0){
        this.note = '输入字段不可为空！'
        this.open2()
      }else{
        this.$http({
          method: 'POST',
          url: 'http://192.168.136.205:8080/users/',
          data: {
            'user': this.manage
          }
        }).then(result => {
          if(result.data.data){
            alert(result.data.msg)
            this.show = false;
            this.manage = {
              name: '',
              posts: '',
              phone: '',
              idCard: '',
              email: '',
              store: ''
            }
            this.getManage()
          }else{
            this.tips = result.data.msg
          }
        })
      }
    },
    // 点击查看员工详细信息
    showMessage(e) {
      if (!this.loading) {
        this.loading = true
        this.$http({
          method: "GET",
          url: "http://192.168.136.205:8080/users/" + e,
        }).then(resp =>{
          if(resp.data){
            this.loading = false
            this.user = resp.data.data
          }
        })
      }
    },
  }
};
</script>

<style scoped>
.nav {
  margin: 24px;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.nav input {
  width: 214px;
  height: 32px;
  text-indent: 10px;
  border: 1px solid rgba(220, 223, 230, 1);
  margin-left: 24px;
  border-radius: 4px;
}
.nav button {
  width: 60px;
  height: 32px;
  background-color: rgba(64, 158, 255, 1);
  color: white;
  border-style: none;
  border-radius: 4px;
  cursor: pointer;
}
.manage-info {
  width: 1256px;
  height: 500px;
  background-color: white;
  margin-left: 24px;
  position: relative;
  box-shadow: 0 0 5px rgba(0, 0, 0, .1);
}
tr {
  width: 1256px;
}
td,
th {
  width: 314px;
  height: 55px;
  text-align: center;
  border: none;
  border-bottom: 1px solid rgba(220, 223, 230, 1);
  font-size: 14px;
  font-weight: 400;
}
th {
  font-weight: 500;
}
td {
  color: rgba(96, 98, 102, 1);
}
.manage-info button {
  width: 60px;
  height: 32px;
  background-color: rgba(64, 158, 255, 1);
  color: white;
  border-style: none;
  border-radius: 4px;
  cursor: pointer;
}
.manage-info button:nth-child(1) {
  margin-right: 24px;
}
.manage-info button:nth-child(2) {
  background-color: white;
  color: rgba(64, 158, 255, 1);
  border: 1px solid rgba(64, 158, 255, 1);
}
.pagination {
  margin-top: 20px;
  float: right;
  position: absolute;
  bottom: 0;
  right: 0;
  
}
.light {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 640px;
  height: 500px;
  padding: 20px;
  background-color: white;
  text-align: center;
  z-index: 1002;
  overflow: auto;
}
.light p {
  font-size: 16px;
  font-weight: 700;
  width: 100px;
  margin-bottom: 10px;
}
.fade {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1001;
  -moz-opacity: 0.6;
  opacity: 0.6;
  filter: alpha(opacity=66);
}
.add-type {
  width: 120px;
  height: 70px;
  position: absolute;
  top: -20px;
  border-radius: 4px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  left: 112px;
  background-color: white;
}
.add-type p {
  cursor: pointer;
  margin: 10px;
  color: #9e9399;
}
.add-type p:hover {
  color: black;
}
.wrapper {
  margin-top: 40px;
}
.wrapper input {
  margin: 5px 20px 24px;
  width: 268px;
  height: 40px;
  border: 1px solid #dae0f2;
  border-radius: 8px;
  outline: none;
  text-indent: 10px;
}
.wrapper label {
  margin: 0px 20px 0px;
  width: 268px;
  display: inline-block;
  height: 10px;
  text-align: left;
  color: rgba(58, 63, 99, 1);
}
#select {
  width: 100px;
  height: 40px;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  color: rgba(58, 63, 99, 1);
}
.doc{
  font-size: 18px;
  color: rgba(0,0,0,.87);
  font-weight: 500;
}
.top{
  width: 440px;
  margin: 0 auto;
  padding-bottom: 20px;
  font-size: 30px;
  border-bottom: 1px solid black;
}
.outer{
  width: 100%;
  height: 600px;
  margin: 20px auto;
  color: rgba(58, 63, 99, 1);
}
.outer span{
  height: 30px;
  margin: 20px;
  display: inline-block;
  font-size: 15px;
}
.left, .right{
  width: 220px ;
  margin-top: 40px;
  display: inline-block;
  vertical-align: top;
}

.change label{
  display: inline-block;
  width: 70px;
}
.change p{
  display: inline-block;
  width: 70px;
}
.change select{
  width: 70px;
  height: 30px;
  outline: none;
}
.change input{
  width: 300px;
  height: 30px;
  border-radius: 7px;
  border: 1px solid #999;
  text-indent: 10px;
}
</style>