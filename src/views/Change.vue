<template>
  <div class="wrapper">
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="val1"
      label="9:00-11:00"
      width="150">
    </el-table-column>
    <el-table-column
      prop="val2"
      label="11:00-13:00"
      width="150">
    </el-table-column>
    <el-table-column
      prop="val3"
      label="13:00-15:00"
      width="150">
    </el-table-column>
    <el-table-column
      prop="val4"
      label="15:00-17:00"
      width="150">
    </el-table-column>
    <el-table-column
      prop="val5"
      label="17:00-19:00"
      width="150">
    </el-table-column>
    <el-table-column
      prop="val6"
      label="19:00-21:00"
      width="150">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
    name: 'Change',
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: [{
          date: '周一',
          val1: '3.5',
          val2: '13.9',
          val3: '19.5',
          val4: '17.5',
          val5: '8.5',
          val6: '3',
        }, {
          date: '周二',
          val1: '3.2',
          val2: '13.7',
          val3: '19.9',
          val4: '17.8',
          val5: '8.9',
          val6: '3.5',
        }, {
          date: '周三',
          val1: '3.8',
          val2: '13.4',
          val3: '19.3',
          val4: '17.8',
          val5: '8.4',
          val6: '3.2',
        }, {
          date: '周四',
          val1: '3.3',
          val2: '13.5',
          val3: '19.6',
          val4: '17.8',
          val5: '8.7',
          val6: '3',
        }, {
          date: '周五',
          val1: '3.2',
          val2: '13.7',
          val3: '19.1',
          val4: '17.8',
          val5: '8.3',
          val6: '3.5',
        }, {
          date: '周六',
          val1: '3.7',
          val2: '13.5',
          val3: '19.7',
          val4: '17.5',
          val5: '8.9',
          val6: '3',
        }, {
          date: '周日',
          val1: '3.4',
          val2: '13.9',
          val3: '19.6',
          val4: '17.5',
          val5: '8.7',
          val6: '3.2',
        }
    ]
      }
    }
}
</script>

<style scoped>
.wrapper{
    width: 1200px;
    margin: 24px;
}
</style>