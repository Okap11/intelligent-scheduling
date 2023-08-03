<template>
  <div id="page">
    <div id="img-wrapper">
      <img src="../assets/chart.png" alt="" />
    </div>

    <div id="info">
      <div id="title">
        <div id="title-wrapper">
          <img src="../assets/logo.png" alt="" />
          <span style="margin-left: 4px">智能排班系统</span>
        </div>
        <p style="margin-top: 35px">
          Welcome to the Intelligent Scheduling System !
        </p>
        <p>请登录您的账号开始体验！</p>
      </div>
      <div id="user-info">
        <label for="username">用户名</label><br />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="请输入您的用户名"
          v-model="account.email"
        /><br />
        <span style="font-size: 13px; color: red">{{ tips }} </span><br />
        <label for="password">密码</label
        ><router-link to="/reset">忘记密码?</router-link><br />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="**********"
          v-model="account.password"
          autocomplete="off"
        /><br />
        <div style="display: flex; margin-top: 20px">
          <input
            type="text"
            placeholder="请输入验证码"
            id="code"
            v-model="code"
          />
          <img
            src="http://192.168.136.205:8080/accounts/getVerify"
            alt=""
            style="width: 100px; height: 48px; margin-left: 110px"
            ref="img"
            @click="change"
          />
          <span
            style="
              display: inline-block;
              line-height: 48px;
              font-size: 12px;
              cursor: pointer;
              color: #4687ff;
              user-select: none;
            "
            @click="change"
            >看不清? 换一张</span
          >
        </div>
        <div id="admin-wrapper">
          <div>
            <input type="checkbox" id="remember" v-model="remember" />
            <label for="remember" style="font-size: 14px; margin-left: 4px"
              >记住密码</label
            >
          </div>
          <div style="display: flex">
            <input type="checkbox" id="admin" v-model="account.admin" />
            <label for="admin" style="font-size: 14px; margin-left: 4px"
              >管理员登录</label
            >
          </div>
        </div>
        <button id="submit" @click="submit">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      account: {
        email: "",
        password: "",
        admin: false,
      },
      code: "",
      tips: "",
      remember: false,
    };
  },
  mounted() {
    this.change();
    this.getCookie()
  },
  methods: {
    submit() {
      this.$http({
        method: "POST",
        url: "http://192.168.136.205:8080/accounts/login",
        data: {
          account: this.account,
          code: this.code,
        },
      }).then((resp) => {
        if (resp.data.code == 20231) {
          localStorage.email = this.account.email;
          localStorage.name = resp.data.data.name;
          localStorage.id = resp.data.data.id;
          localStorage.store = resp.data.data.store;
          localStorage.admin = this.account.admin;
          this.$router.replace("/index");
        } else {
          this.tips = resp.data.msg;
          this.change();
          this.username = "";
          this.password = "";
          this.user = false;
        }
      });
      if (this.remember == true) {
        this.setCookie(this.account.email, this.account.password, 7);
      } else {
        this.clearCookie();
      }
    },
    change() {
      this.$refs.img.src =
        "http://192.168.136.205:8080/accounts/getVerify?" +
        new Date().getMilliseconds();
    },
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date();
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    getCookie: function () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); 
          if (arr2[0] == "userName") {
            this.account.email = arr2[1]; 
          } else if (arr2[0] == "userPwd") {
            this.account.password = arr2[1];
          }
        }
      }
    },
    clearCookie: function () {
      this.setCookie("", "", -1); 
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
}
#page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
}

#img-wrapper {
  width: 65vw;
  height: 100vh;
  background-color: #f4f5fb;
  position: relative;
}
#img-wrapper img {
  width: 600px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
#info {
  display: flex;
  flex-direction: column;
}
#title {
  width: 35vw;
  height: 150px;
  margin-top: 100px;
}
#title-wrapper {
  display: flex;
  align-items: center;
  margin-left: 50px;
}
#title-wrapper span {
  font-size: 20px;
}
#title p {
  color: #566a7f;
  margin-left: 50px;
  font-size: 18px;
  margin-top: 10px;
}
#user-info {
  margin-left: 50px;
  margin-top: 30px;
  position: relative;
}
#user-info label {
  font-size: 13px;
  color: #566a7f;
}
#username,
#password {
  width: 380px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #d9dee3;
  margin-top: 8px;
  background-color: #f5f5f9;
  transition: all 0.2s;
  text-indent: 10px;
}
#username::-webkit-input-placeholder,
#password::-webkit-input-placeholder {
  color: #b4bdc6;
  text-indent: 10px;
}
#username:focus,
#password:focus {
  outline: none;
  border: 1px solid #4687ff;
  text-indent: 13px;
}
#user-info a {
  font-size: 13px;
  margin-left: 300px;
  color: #4687ff;
}
#code {
  width: 88px;
  height: 40px;
  border: 1px solid #d9dee3;
  border-radius: 5px;
  text-indent: 4px;
  transition: all 0.3s;
}
#code:focus {
  outline: none;
  border: 1px solid #4687ff;
}
#admin-wrapper {
  width: 380px;
  display: flex;
  margin-top: 12px;
  justify-content: space-between;
}
#admin {
  width: 18px;
  height: 18px;
}
#submit {
  width: 380px;
  height: 40px;
  margin-top: 30px;
  border-radius: 8px;
  border-style: none;
  color: white;
  background-color: #4687ff;
  cursor: pointer;
  position: absolute;
  transition: all 0.2s;
}
#submit:hover {
  margin-top: 28px;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
  background-color: #3279ff;
}
</style>