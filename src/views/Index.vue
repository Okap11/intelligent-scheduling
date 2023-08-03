<template>
  <div id="page">
    <div id="main-wrapper">
      <div id="left">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :router="true"
          style="height: 100vh; width: 13vw"
        >
          <div id="user-info">
            <img
              src="../assets/male.png"
              alt=""
              @click="toMyInfo()"
              title="点击修改头像"
            />
            <router-link to="/index/UserInfo" tag="p">{{ name }}</router-link>
          </div>
          <el-menu-item index="/index/Schedule">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/index/UserInfo">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>个人信息</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/index/leave">
            <i class="el-icon-message-solid"></i>
            <span slot="title">请假申请</span>
          </el-menu-item>
          <div v-if="isAdmin">
            <el-menu-item index="/index/StoreInformation">
              <template slot="title">
                <i class="el-icon-s-marketing"></i>
                <span>门店概况</span>
              </template>
            </el-menu-item>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>员工管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/index/Manage">员工概况</el-menu-item>
                <el-menu-item index="/index/LeaveApproval"
                  >请假审批</el-menu-item
                >
                <el-menu-item index="/index/ChangeSchedule"
                  >修改排班</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/index/Change">修改客流量</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </div>
      <div id="right">
        <div
          style="
            display: flex;
            justify-content: space-between;
            width: 100%;
            background-color: white;
          "
        >
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :router="true"
          >
            <el-menu-item index="/index">排班首页</el-menu-item>
            <el-menu-item index="/index/leave">请假申请</el-menu-item>
            <el-submenu index="2" v-if="isAdmin">
              <template slot="title">我的工作台</template>
              <el-menu-item index="/index/manage">员工概况</el-menu-item>
              <el-menu-item index="/index/LeaveApproval">请假审批</el-menu-item>
              <el-menu-item index="/index/ChangeSchedule"
                >修改排班</el-menu-item
              >
            </el-submenu>
          </el-menu>

          <div class="btn-right">
            <span>欢迎使用智能排班系统！</span>
            <el-link type="primary" @click.prevent="exit">退出登录</el-link>
          </div>
        </div>

        <transition mode="out-in">
          <router-view> </router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      activeIndex: "1",
      gender: "",
      name: localStorage.name,
      dialogFormVisible: false,
      isAdmin: false,
      list: [],
    };
  },
  methods: {
    toMyInfo() {
      this.$router.replace("/index/UserInfo");
    },
    exit() {
      localStorage.clear();
      window.sessionStorage.clear();
      this.$router.push("/");
    },
  },
  mounted() {
    if (localStorage.admin == "false") {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
  },
  watch: {
    gender: {
      immediate: true,
      handler() {
        if (this.gender == "男") {
          this.src = require("@/assets/male.png");
        } else if (this.gender == "女") {
          this.src = require("@/assets/female.png");
        } else {
          this.src = require("@/assets/empty.png");
        }
      },
    },
  },
};
</script>

<style scoped>
#page {
  display: flex;
  flex-direction: column;
}
#user-info {
  width: 160px;
  height: 144px;
  text-align: center;
  margin: 0 auto;
}
#user-info img {
  width: 56px;
  height: 56px;
  margin-top: 20px;
  cursor: pointer;
}

#user-info p {
  font-size: 20px;
  margin-top: 5px;
  cursor: pointer;
}
#btn-right {
  display: flex;
  position: absolute;
  right: 50px;
  top: 10px;
  justify-content: center;
  align-items: center;
}
#main-wrapper {
  display: flex;
}
#left {
  border-right: 1px solid #dcdfe6;
}
#right {
  width: 86vw;
  height: 100vh;
  background-color: #f5f7fa;
  overflow: auto;
}
.el-menu-demo {
  padding-left: 50px;
}
.btn-right {
  height: 60px;
  margin-right: 40px;
}
.btn-right span,
.el-link--inner {
  display: inline-block;
  line-height: 60px;
  vertical-align: middle;
  margin-right: 30px;
  font-size: 18px;
}

.v-leave-active,
.v-enter-active {
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.v-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>