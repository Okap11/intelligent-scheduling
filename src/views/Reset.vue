<template>
    <div id="page">
        <div id="img-wrapper">
            <img src="../assets/chart.png" alt="">
        </div>

        <div id="info">
            <div id="title">
                <div id="title-wrapper">
                    <img src="../assets/logo.png" alt="">
                    <span style="margin-left: 4px;">智能排班系统</span>
                </div>
                <div style="display: flex;align-items: center;margin-top: 35px;">
                    <p>忘记密码?</p>&nbsp;&nbsp;
                    <img src="../assets/lock.png" alt="" style="width: 30px;height: 30px;">
                </div>
                <p>输入您的用户名和身份证号，修改密码.</p>
            </div>

            <div id="user-info">
                <label for="username">用户名</label><br>
                <input type="text" name="username" id="username" placeholder="输入您的用户名" v-model="account.username"><br>
                <span style="font-size: 13px; color: red;">{{ tips }} </span><br>
                <label for="idCard">身份证号</label><br>
                <input type="text" name="idCard" id="idCard" placeholder="输入您的身份证" v-model="idCard" @blur="check"><br>
                <span v-if="fit" style="font-size: 13px; color: red;">请输入正确的身份证号！</span><br>
                <label for="password">新密码</label><br>
                <input type="password" name="password" id="password" placeholder="**********" v-model="account.password"><br>
                <div style="display: flex;margin-top: 20px;">
                    <input type="text" placeholder="请输入验证码" id="code" v-model="code">
                    <img src="" alt="" style="width: 100px; height: 48px;margin-left: 110px;" ref="img" @click="change">
                    <span style="display: inline-block; line-height: 48px;font-size: 12px;cursor: pointer;color: #4687FF;user-select: none;" @click="change">看不清? 换一张</span>
                </div>
                <button id="submit" @click="submit">确认修改</button><br>
                <p><router-link to="/">返回登录</router-link></p>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Reset',
    data(){
        return{
            account:{
                username: '',
                password: '',
                
            },
            code: '',
            idCard: '',
            fit: false,
            tips: '',
            timer: ''
        }
    },
    mounted(){
        this.change()
    },
    methods:{
        submit(){
            if(!this.fit){
                let result = confirm("是否确认修改密码?")
                if(result){
                this.$http({
                    method: 'POST',
                    url: 'http://192.168.1.102:8080/accounts/reset',
                    data:{
                        "account" : this.account,
                        "idCard": this.idCard,
                        'code': this.code
                    }
                }).then(resp => {
                    this.tips = resp.data.msg
                    this.change()
                    if(resp.data.data){
                        this.timer = setTimeout(() => {
                            alert("修改密码成功！！")
                            this.$router.replace('/')
                        }, 500);
                        this.$once('hook:beforeDestroy', () => clearInterval(this.timer))
                    }
                })
            }
        }
    },
        check(){
            if(this.idCard.length != 18){
                this.fit = true
            }else{
                this.fit = false
            }
        },
        change(){
            this.$refs.img.src = 'http://192.168.1.102:8080/accounts/getVerify?' + new Date().getMilliseconds()
        }
    }

}
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
    list-style: none;
    text-decoration: none;
}
#page{
    width: 100%;
    height: 100%;
    display: flex;
}

#img-wrapper{
    width: 65vw;
    height: 100vh;
    background-color: #F4F5FB;
    position: relative;
}
#img-wrapper img{
    width: 600px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
#info{
    display: flex;
    flex-direction: column;
}
#title{
    width: 35vw;
    height: 150px;
    margin-top: 100px;
}
#title-wrapper{
    display: flex;
    align-items: center;
    margin-left: 50px;
}
#title-wrapper span{
    font-size: 20px;
}
#title p{
    color:#566a7f;
    margin-left: 50px;
    font-size: 18px;
    margin-top: 10px;
}
#user-info{
    margin-left: 50px;
    margin-top: 30px;
    position: relative;
}
#user-info label{
    font-size: 13px;
    color:#566a7f;
}
#username, #password, #idCard{
    width: 380px;
    height: 36px;
    border-radius: 8px;
    border: 1px solid #d9dee3;
    margin-top: 8px;
    background-color: #F5F5F9;
    transition: all .2s;
    text-indent: 10px;
}
#username::-webkit-input-placeholder, #password::-webkit-input-placeholder, #idCard::-webkit-input-placeholder{
    color: #B4BDC6;
    text-indent: 10px;
}
#username:focus, #password:focus, #idCard:focus{
    outline: none;
    border: 1px solid #4687FF;
    text-indent: 13px;
}
#user-info  a{
    font-size: 13px;
    margin-left: 300px;
    color: #4687ff;
}
#code{
    width: 88px;
    height: 40px;
    border: 1px solid #d9dee3;
    border-radius: 5px;
    text-indent: 4px;
    transition: all .3s;
}
#code:focus{
    outline: none;
    border: 1px solid #4687FF;
    
}

#submit{
    width: 380px;
    height: 40px;
    margin-top: 30px;
    border-radius: 8px;
    border-style: none;
    color: white;
    background-color: #4687FF;
    cursor: pointer;
    position: absolute;
    transition: all .2s;
}
#submit:hover{
    margin-top: 28px;
    box-shadow: 0 0 0 rgba(0, 0, 0, .3);
    background-color: #3279FF;
}
#user-info p{
    width: 100px;
    margin-top: 60px;
    margin-left: -133px;
    white-space: nowrap;
}
</style>