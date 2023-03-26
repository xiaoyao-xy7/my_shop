<template>
  <div>
  <el-table
    :data = "tableData"
    border
    ref="tableBox"
    :cell-class-name="addClass"	
  >  
    <el-table-column label="序号" type="index" align="center" width="40"></el-table-column>
    <el-table-column label="重点任务" prop="days" align="center" width="110">
      <template slot-scope="scope">
        <span>{{ scope.row.days }}</span>
      </template>
    </el-table-column>
    <el-table-column label="计划开始时间" prop="beginDate" align="center" width="110">
      <template slot-scope="scope">
        <span>{{ scope.row.beginDate }}</span>
      </template>
    </el-table-column>  
    <el-table-column label="计划结束之间" prop="endDate" align="center" width="100">
      <template slot-scope="scope">
        <span>{{ scope.row.endDate }}</span>
      </template>
    </el-table-column>
    <el-table-column label="当前状态" prop="state" align="center" width="110">
      <template slot-scope="scope">
        <span>{{ scope.row.state }}</span>
      </template>
    </el-table-column>
    <el-table-column
      v-for="(item, index) in years"
      prop="years"
      align="center"
      :key="index"
      :label="item + '年'"
    >
      <el-table-column
        v-for="(it, index1) in 12"
        :label="it + '月'"
        style="padding: 0; margin: 0;"
        align="center"
        :key="index1"
        :prop="item + '年' + it + '月'"
      >
        <template slot-scope="scope">
                    <div v-if="getSection(item,it,scope.row.beginDate,scope.row.endDate)" class="planClass"></div>
                    <!-- 正常进行 -->
                    <div v-if="getCurrent(item,it,scope.row.beginDate,scope.row.state,'正常进行')" :style="{width: (81*getMonths(scope.row.beginDate, scope.row.endDate))*(Number(scope.row.jindu)/100) + 'px'}" class="normalClass">{{scope.row.jindu + '%'}}</div>
                    <!-- 延迟 -->
                    <div v-if="getCurrent(item,it,scope.row.beginDate,scope.row.state,'延期')" :style="{width: (81*getMonths(scope.row.beginDate, scope.row.endDate))*(Number(scope.row.jindu)/100) + 'px'}" class="postponeClass">{{scope.row.jindu + '%'}}</div>
                    <!-- 超前 -->
                    <div v-if="getCurrent(item,it,scope.row.beginDate,scope.row.state,'超前')" :style="{width: (81*getMonths(scope.row.beginDate, scope.row.endDate))*(Number(scope.row.jindu)/100) + 'px'}" class="exceedClass">{{scope.row.jindu + '%'}}</div>
                    <!-- 计划未开始 已完成 -->
                    <div v-if="getCurrent(item,it,scope.row.beginDate,scope.row.state,'超前啊')" :style="{width: '81px', right: '162px'}" class="surpassClass">{{scope.row.jindu + '%'}}</div>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
   <el-button @click="getMaxAndMin()">默认按钮</el-button>
  </div>
</template>

<script>

export default {
  name: 'durationChart',
  components: {
  },
  props: {
  },
  data() {
    return {
        years: [],
        tableData: [],
        normalData: []
    }
  },
  created: function () {
    this.init()
  },
  watch: {
  },
  methods: {
    init() {
            this.tableData = [{
            "id": 1,
            "name": "王小虎2",
            "state": "正常进行",
            "beginDate": "2023-01",
            "endDate": "2023-05",
            "days": "1000",
            "jindu": '80',
          }, {
            "id": 1,
            "name": "王小虎3",
            "state": "延期",
            "beginDate": "2023-05",
            "endDate": "2025-09",
            "days": "1000",
            "jindu": '20',
          }, {
            "id": 2,
            "name": "王小虎3",
            "state": "超前",
            "beginDate": "2023-05",
            "endDate": "2024-09",
            "days": "1000",
            "jindu": '60',
          },{
            "id": 1,
            "name": "王小虎2",
            "state": "正常进行",
            "beginDate": "2023-01",
            "endDate": "2023-05",
            "days": "1000",
            "jindu": '100',
          }, {
            "id": 1,
            "name": "王小虎3",
            "state": "未开始",
            "beginDate": "2023-05",
            "endDate": "2025-09",
            "days": "1000",
            "jindu": '20',
          }, {
            "id": 2,
            "name": "王小虎3",
            "state": "超前啊",
            "beginDate": "2023-05",
            "endDate": "2025-09",
            "days": "1000",
            "jindu": '100',
          }]
          this.getMaxAndMin()
    },
    getSection(y, m, beginDate, endDate) {
      if(m < 10) {
        m = '0' + m
      }
      const data = y + '-' + m
      if(beginDate <= data && endDate >= data) {
        return true
      }
    },
    // 获取当前状态
    getCurrent(item, it, beginDate, state,current) {
      const data = (item + '-' + (it < 10 ? '0' + it : it))
      if(data == beginDate && state == current) {
        return true
      }
    },
    getMonths(startDate, endDate) {
      startDate = startDate.split('-');
      // 开始月数
      startDate = parseInt(startDate[0]) * 12 + parseInt(startDate[1]);
      endDate = endDate.split('-');
      // 结束月数
      endDate = parseInt(endDate[0]) * 12 + parseInt(endDate[1]);
      const times = Math.abs(startDate - endDate);
      return times + 1
    },
    // 获取所有的月份
    getMonthBetween(start,end){  
        var result = [];  
        var s = start.split("-");  
        var e = end.split("-");  
        var min = new Date();  
        var max = new Date();  
        min.setFullYear(s[0],s[1]);  
        max.setFullYear(e[0],e[1]);   
        var curr = min;  
        while(curr <= max){  
            var month = curr.getMonth();  
            var str= (month == 0 ? curr.getFullYear() -1 : curr.getFullYear()) +"-"+( month == 0 ? 12 : (month < 10 ) ? '0'+ month : month);
            var s=curr.getFullYear()+"-12";
            if(str==s){
                str=curr.getFullYear()+"-12";
            }
            result.push(str);  
            curr.setMonth(month+1);
        }
        return result;  
      },
    getYearBetween(start, end){
        let result = [];
        let min = new Date(start).getFullYear();
        let max = new Date(end).getFullYear();
        while (min <= max) {
            result.push(min + '');
            min = (Number(min) + 1) + ''
        }
        this.years = result
    },
    // 获取最大日期和最小日期
    getMaxAndMin() {
      const min = new Date(Math.min(...this.tableData.map(item => new Date(item.beginDate))));
      const max = new Date(Math.max(...this.tableData.map(item => new Date(item.endDate))));
      const minDate = min.getFullYear() + '-' + ((min.getMonth() + 1) < 10 ? '0' + (min.getMonth() + 1) : min.getMonth() + 1)
      const maxDate = max.getFullYear() + '-' + ((max.getMonth() + 1) < 10 ? '0' + (max.getMonth() + 1) : max.getMonth() + 1)
      this.getYearBetween(minDate, maxDate)
    },
    addClass({row,column,rowIndex,columnIndex}){ 
      if(column.property == '2023年7月') {
        return 'bookmark'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.planClass {
  width: 81px;
  height: 23px;
  background-color: gainsboro;
}
/deep/.el-table--enable-row-transition .el-table__body td.el-table__cell {
  border: none;
}
/deep/.el-table .cell {
  padding-right: 0;
  padding-left: 0;
}
/deep/.el-table--enable-row-transition .el-table__body td {
    border: none;
}
/deep/.el-table td, .el-table th {
  padding: 6px 0;
}
.normalClass {
  position: absolute;
  z-index: 9;
  margin-top: -23px;
  height: 23px;
  background-color: #43CD80;
}
.postponeClass {
  position: absolute;
  z-index: 9;
  margin-top: -23px;
  height: 23px;
  background-color: #FFA07A;
}
.exceedClass {
  position: absolute;
  z-index: 9;
  margin-top: -23px;
  height: 23px;
  background-color: #6495ED;
}
.surpassClass {
  position: absolute;
  z-index: 9;
  margin-top: -23px;
  height: 23px;
  background-color: #6495ED;
}
</style>
<style lang="less">
.bookmark::before{
    position: absolute;
    top: -188px;
    transform: translatey(-40%);
    left: -8px;
    content: '';
    width: 16px;
    height: 7px;
    background-color: orange;
    height: 100%;
    z-index: 99;
}

.bookmark::after {
    position: absolute; /*绝对定位*/
    top: 50%; /*Y轴方向偏移自身高度的50%*/
    transform: translatey(-40%); /*Y轴方向偏移微调*/
    left: -2px; /*紧靠容器左边缘*/
    content: ''; /*伪元素需要有内容才能显示*/
    width: 4px; /*伪元素宽度*/
    height: 18px; /*伪元素高度*/
    background-color: orange; /*伪元素颜色*/
    height: 100%;
    z-index: 99;
}
</style>