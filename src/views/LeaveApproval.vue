<template>
  <div class="page">
    <div class="title">
        <p>提交记录</p>
    </div>
    <div class="take" v-if="arr.length == 0">
        <div class="empty">
            <el-empty :image-size="200"></el-empty>
        </div>
    </div>
    <div>
        <div class="list" v-for="(item,index) in arr" :key="index">
            <div style="width: 70px;">
                <p class="tips">姓名</p>
                <p>{{ item.name }}</p>
            </div>
            <div>
                <p class="tips">请假类型</p>
                <div v-if="item.type == '病假' ">
                    <span class="circle" style="background-color: #F65160;"></span><span>病假</span>
                </div>
                <div v-else-if="item.type == '事假' ">
                    <span class="circle" style="background-color: #6D5DD3;"></span><span>事假</span>
                </div>
                <div v-else>
                    <span class="circle" style="background-color: #15C0E6;"></span><span>调休</span>
                </div>
            </div>
            <div>
                <p class="tips">开始日期</p>
                <p>{{ item.startTime }}</p>
            </div>
            <div>
                <p class="tips">结束日期</p>
                <p>{{ item.endTime }}</p>
            </div>
            <div>
                <p class="tips">备注</p>
                <el-tooltip placement="top">
                    <div slot="content">{{ item.notes }}</div>
                    <p class="note">{{ item.notes }}</p>
                </el-tooltip>
            </div>
            <div style="width: 200px;">
                <p class="tips">状态</p>
                <p v-if="item.state == 0">
                    <el-button type="primary" @click.prevent="agree(item.id, index, 1)">同意</el-button>
                    <el-button @click.prevent="agree(item.id, index , 2)">取消</el-button>
                </p>
                <div style="width: 10px;height: 10px;" v-if="item.state != 0">
                    <i class="el-icon-check"></i>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:'LeaveComment',
    mounted(){
        this.getData()
    },
    data() {
        return {
            arr:[],
        }
    },
    methods:{
        getData(){
            this.$http({
                method: 'GET',
                url: 'http://192.168.1.102:8080/Holiday/trans'
            }).then((result) => {
                this.arr = result.data
            })
        },
        agree(e,i,j){
            this.arr[i].state = 1
            this.$http({
                method: 'POST',
                url: 'http://192.168.1.102:8080/Holiday/Update',
                data:{
                    'holiday':{
                        'id': e,
                        'state': j
                    }
                }
            })

        },
    watch:{
        arr:{
            deep:true,
        }
    },
}
}
</script>

<style scoped>
.page{
    padding-top: 45px;
    padding-left: 41px;
    
}
.title{
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 0px;
    color: rgba(10, 22, 41, 1);
    margin-bottom: 30px;
}
.take,empty{
    width: 1200px;
    height: 500px;
    background-color: white;
    margin-top: 21px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
}
.circle{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    border-style: none;
    margin-right: 10px;
}
.list{
    width: 1255px;
    height: 91px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 24px;
    background-color: white;
    margin-top: 20px;
}
.tips{
    font-size: 14px;
    font-weight: 400;
    color: rgba(145, 146, 158, 1);
    margin-bottom: 5px;
}
.note{
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>