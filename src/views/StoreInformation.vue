<template>
  <div id="page">
    <div id="main">
      <div class="info">
        <el-descriptions
          class="margin-top"
          title="门店信息"
          :column="3"
          size="size"
        >
          <template slot="extra">
            <el-button
              type="primary"
              size="small"
              @click="dialogFormVisible = true"
              >修改</el-button
            >
          </template>
          <el-descriptions-item label="门店名称"
            >{{ myStore.name }}</el-descriptions-item
          >
          <el-descriptions-item label="占地面积/m²"
            >{{ myStore.size }}</el-descriptions-item
          >
          <el-descriptions-item label="联系地址"
            >{{ myStore.address }}</el-descriptions-item
          >
          <el-descriptions-item label="门店人数"
            >{{ myStore.number }}</el-descriptions-item
          >
        </el-descriptions>
      </div>

      <el-dialog
        title="修改信息"
        :visible.sync="dialogFormVisible"
        class="change"
      >
        <div>
          <label for="name">门店名称: </label>
          <input type="text" name="" id="name" v-model="myStore.name" /><br /><br />
          <label for="area">占地面积: </label>
          <input type="text" name="" id="area" v-model="myStore.size" /><br /><br />
          <label for="address">联系地址: </label>
          <input type="text" name="" id="address" v-model="myStore.address" /><br /><br />
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="change"
            >确 定</el-button
          >
        </div>
      </el-dialog>


      <el-dialog title="添加门店" :visible.sync="dialogFormVisible2" class="change">
        <div>
          <label for="name">门店名称: </label>
          <input type="text" name="" id="name" v-model="addStore.name" /><br /><br />
          <label for="area">占地面积: </label>
          <input type="text" name="" id="area" v-model="addStore.size" /><br /><br />
          <label for="address">联系地址: </label>
          <input type="text" name="" id="address" v-model="addStore.address" /><br /><br />
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="outer">
        <el-card class="store">
          <p class="log-title">其他门店 <el-button type="primary" size="small" style="float: right;" @click="dialogFormVisible2 = true" >增加门店</el-button> </p>
          <div  class="other-store">
            <table>
              <tr>
                <th>门店名称</th>
                <th>占地面积</th>
                <th>联系地址</th>
                <th>门店人数</th>
                <th>操作</th>
              </tr>
              <tr v-for="val in store" :key="val.id">
                <td>{{ val.name }}</td>
                <td>{{ val.size }}</td>
                <td>{{ val.address }}</td>
                <td>{{ val.number }}</td>
                <td><a @click.prevent="del(val.id, val.name)">删除</a></td>
              </tr>
            </table>
            <el-empty description="暂无数据" v-if="store.length == 0"></el-empty>
          </div>
        </el-card>

      <div class="log">
        <el-card class="box-card">
          <p class="log-title">修改日志</p>
          <div  class="text item">
            <p v-for="val in log" :key="val.id" style="margin-top: 5px;border-bottom: 1px solid #999;padding-bottom: 5px;">
               <span>{{ val.time }} &nbsp;&nbsp;</span>
               <span>{{ val.adminId }} &nbsp;&nbsp;</span>
               <span>{{ val.type }}</span>
            </p> 
          </div>
        </el-card>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "StoreInformation",
  data() {
    return {
      active: 0,
      name: '',
      seat: '',
      num: '',
      store: [],
      msg: '',
      myStore: {},
      addStore: {
        name: '',
        size: '',
        address: ''
      },
      log:[],
      dialogFormVisible: false,
      dialogFormVisible2: false,
    };
  },
  mounted(){
    this.getMyStore()
    this.getLog()
  },
  methods: {
    getStore(id){
      this.$http({
        method: 'GET',
        url: 'http://192.168.1.102:8080/Store/stores/' + id
      }).then( result => {
        this.store = result.data.data
      }).catch( error => {
        if(error.response){
          console.log(error.response.status);
        }else if(error.request){
          console.log(error.request);
        }else{
          console.log(error.message);
        }
      })
    },
    getMyStore(){
      this.$http({
        method: 'GET',
        url: 'http://192.168.1.102:8080/Store/store/' + localStorage.email
      }).then( result => {
        this.myStore = result.data.data 
        this.getStore(result.data.data.id)
      })
    },
    change(){
      this.dialogFormVisible = false
      this.$http({
        method: 'PUT',
        url: 'http://192.168.1.102:8080/Store/stores',
        data: {
          'store': this.myStore
        }
      }).then( result => {
        alert(result.data.msg)
        if( result.data.code == 20221){
          setTimeout(() => {
            this.addLog('修改了门店信息')
            this.getMyStore()
            this.getLog()
          }, 300);
        }
      })
    },
    del(i , name){
      this.$http({
        method: 'DELETE',
        url: 'http://192.168.1.102:8080/Store/stores/' + i
      }).then( result => {
        if(result.data.code == 20211){
          this.msg = result.data.msg
          setTimeout(() => {
            this.open1()
            this.addLog('删除了' + name)
            this.getMyStore()
            location.reload()
          }, 300);
        }else{
          this.open2()
        }
      })
    },
    open1() {
        this.$notify({
          title: '成功',
          message: this.msg,
          type: 'success'
        });
      },
      open2() {
        this.$notify({
          title: '警告',
          message: '删除失败',
          type: 'warning'
        });
      },
      add(){
        this.dialogFormVisible2 = false
        this.$http({
          method: 'POST',
          url: 'http://192.168.1.102:8080/Store/stores',
          data: {
            'store': this.addStore
          }
        }).then((result) => {
          this.msg = result.data.msg
          if(result.data.code == 20201){
              setTimeout(() => {
              this.addLog('新增了一个门店')
              this.getMyStore()
              this.getLog()
              this.open1()
            }, 300);
          }else {
            this.open2()
          }
        })
      },
      getLog(){
        this.$http({
          method: 'GET',
          url: 'http://192.168.1.102:8080/Log/logs',
        }).then( result => {
          this.log = result.data.data
        })
      },
      addLog(info){
        this.$http({
          method: 'POST',
          url: 'http://192.168.1.102:8080/Log/logs',
          data: {
            'log':{
              'adminId': localStorage.id,
              'type': info
            }
          }
        })
      }
  },
};
</script>

<style scoped>
#header {
  width: 1025px;
  height: 107px;
  background-color: white;
  margin: 20px 60px 20px;
}
#header h2 {
  font-size: 20px;
  font-family: PingFangSC;
  font-weight: 400;
  line-height: 107px;
  letter-spacing: 0px;
  color: rgba(116, 121, 140, 1);
  text-align: left;
  margin-left: 30px;
}
#main {
  width: 1025px;
  height: 140px;
  background-color: white;
  margin: 24px 60px 0px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .1);
}
.info {
  width: 880px;
  height: 200px;
  margin: 10px auto;
}
.change {
  width: 1200px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.change label {
  font-size: 16px;
}
.change input {
  width: 300px;
  height: 40px;
  border-radius: 4px;
  outline: none;
  border: 1px solid #999;
  text-indent: 10px;
}
.store{
  width: 580px;
  background-color: white;
  margin: 20px 0px 0px 60px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .1);
}
.outer{
  display: flex;
}
.log{
  margin: 20px 43px 0px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
a{
  cursor: pointer;
}

.box-card {
  width: 400px;
}

.log-title{
  color: #409EFF;
  font-size: 18px;
  height: 40px;
  border-bottom: 1px solid #999;
}
.other-store{
  margin-top: 10px;
}
.other-store table{
  border-spacing: 0 ;
  border-collapse:"collapse";
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
table th{
  width: 100px;
  font-weight: 600;
}
a{
  color: #409EFF;
  text-decoration: none;
}
</style>