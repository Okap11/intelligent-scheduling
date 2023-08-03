<template>
  <div class="wrapper">
    <el-select v-model="value" placeholder="所有门店">
    <el-option
      v-for="item in storeArr"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  <div style="margin-top: 50px;" v-loading="loading">
      <div class="schedule">
        <table border="1">
          <tr>
            <th>时间</th>
            <th>9:00 - 11:00</th>
            <th>11:00 - 13:00</th>
            <th>13:00 - 15:00</th>
            <th>15:00 - 17:00</th>
            <th>17:00 - 19:00</th>
            <th>19:00 - 21:00</th>
          </tr>
          <tr v-for="(value,index) in arr" :key="index">
            <th>{{ month[index] }}</th>
            <td v-for="(valu, j) in value" :key="j">
                <p v-for="(val, k) in valu" :key="k" :style="{backgroundColor:colors[k]}">{{ val.name }}</p>
            </td>
          </tr>
        </table>
      </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ChangeSchedule',
    data() {
        return {
            arr:[],
            value: '',
            value2: 'month',
            loading: false,
            storeArr: [],
            colors:['#01D4F2', '#D8DF20', '#FFE550', '#F6931E', '#BFA', '#FF646C' , '#CB3398', '#33E680', '#B334FF'],
            month: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    },
    created(){
        this.getStore()
    },
    methods:{
        get(e){
            this.$http({
                method: 'GET',
                url: 'http://192.168.1.102:8080/schedule/' + (e ? e :this.storeArr[0].id)
            }).then( result => {
                this.arr = result.data.data
                this.loading = false
            })  
        },
        getStore(){
        this.$http({
            method: 'GET',
            url: 'http://192.168.1.102:8080/Store/stores'
        }).then( result => {
            this.storeArr = result.data.data
            this.get()
        })
    },
    },
    watch:{
        value(){
            this.get(this.value)
            this.loading = true
        }
    }

}
</script>

<style scoped>
.wrapper{
    margin: 24px;
}
table{
    width: 80vw;
    white-space: pre-wrap;
}
p{
    text-align: center;
    height: 10%;
    margin: 10px;
}
</style>