<template>
  <div class="overview">
    <!-- 记录 -->
    <div class="top">
      <!-- 首页左侧 -->
      <div class="top-l">拓扑图</div>
      <!-- 首页右侧 -->
      <div class="top-r">
        <!-- 快速入口 -->
        <div ref="entry" class="entry">
          <i @click="closeEntry" class="el-icon-close">asdasdsa</i>
        </div>
        <div class="realtime">
          <!-- <div>啊十分艰苦拉萨大家风口浪尖的顺口溜附件</div> -->
          <div id="main" style="width: 600px;height: 400px;"></div>
        </div>
      </div>
    </div>
    <!-- 页尾 -->
    <div class="bottom">
      业务巡检
      <!-- one -->
      <div class="topt">
        <!--  -->
        <div class="cpu">
          <div class="cpuTitle">
            <!--  -->
            <div class="titlet">
              <div class="totleName">CPU使用率TOP5</div>
              <div>
                刷新时间：{{ time }}
                <i style="cursor: pointer;" class="el-icon-refresh-right"></i>
                <div style="display: inline-block; margin: 0 8px;">|</div>
                <i style="cursor: pointer;" class="el-icon-full-screen"></i>
              </div>
            </div>
            <!--  -->
            <div class="titleb">
              <div>当前CPU平均使用率</div>
              <div class="proportion">40%</div>
              <el-progress :show-text="false" type="circle" :percentage="25"></el-progress>
            </div>
          </div>
          <div class="cpuPie" id="cpu" style="width: 550px;height: 250px;"></div>
        </div>
        <div class="memory">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column label="日期" width="180">
              <template slot-scope="scope">
                {{scope.row.num}}
                <el-progress :percentage="70" :show-text="false"></el-progress>
                <!-- <el-progress :percentage="70"></el-progress> -->
              </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
        </div>
      </div>
      <!-- two  -->
      <div class="topb">123</div>
      <!-- <div class="topt">
        <div class="cpu">
          <div class="cpuTitle">
            <div class="titlet">
              <div class="totleName">CPU使用率TOP5</div>
              <div>
                刷新时间：18:23:54
                <i style="cursor: pointer;" class="el-icon-refresh-right"></i>
                <div style="display: inline-block; margin: 0 8px;">|</div>
                <i style="cursor: pointer;" class="el-icon-full-screen"></i>
              </div>
            </div>
            <div class="titleb">
              <div>当前CPU平均使用率</div>
              <div class="proportion">40%</div>
            </div>
          </div>
          <div class="cpuPie" id="cpu" style="width: 550px;height: 250px;"></div>
        </div>
        <div class="memory">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
const echarts = require("echarts");
export default {
  data() {
    return {
      charts: "",
      opinion: ["0-20%", "20-40%", "40-60%", "60-80%", "80-100%"],
      opinionData: [
        {
          value: 10,
          name: "0-20%",
          ipPorts: ["100.200.0.1", "100.200.0.2", "100.200.0.3"]
        },
        {
          value: 30,
          name: "20-40%",
          ipPorts: ["100.200.0.4", "100.200.0.5", "100.200.0.6"]
        },
        {
          value: 30,
          name: "40-60%",
          ipPorts: ["100.200.0.1", "100.200.0.2", "100.200.0.3"]
        },
        {
          value: 30,
          name: "60-80%",
          ipPorts: ["100.200.0.4", "100.200.0.5", "100.200.0.6"]
        },
        {
          value: 0,
          name: "80-100%",
          ipPorts: ["100.200.0.4", "100.200.0.5", "100.200.0.6"]
        }
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          num: "0.6"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          num: "23"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          num: "22"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          num: "45"
        }
      ],
      time: "",
      date: ""
    };
  },
  methods: {
    closeEntry() {
      this.$refs.entry.style.display = "none";
    },
    // 配置饼图
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            let list = [];
            let listItem = "";
            for (let i = 0; i < params.data.ipPorts.length; i++) {
              list.push("ip地址：" + params.data.ipPorts[i]);
            }
            listItem = list.join("<br>");
            return listItem;
          }
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: this.opinion
        },
        series: [
          {
            name: "主机",
            type: "pie",
            radius: "50%", //["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "blod"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.opinionData
          }
        ]
      });
    },
    // 配置柱状图
    drawZhu(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        title: {
          subtext: "CPU使用率 (%) /云服务器"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "Modskjfklsdjfkljsdkljln",
              "Tueasmnfksdnfkjnsdkj",
              "Weashfdjksahfjkhsdjkd",
              "Thasjkdhfjksdhfjkhsdjkfu",
              "Frfsdjhsdjkahffdslkji"
            ],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              formatter: function(value) {
                let ret = ""; //拼接加\n返回的类目项
                let maxLength = 10; //每项显示文字个数
                let valLength = value.length; //X轴类目项的文字个数
                let rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                if (rowN > 1) {
                  //如果类目项的文字大于3,
                  for (let i = 0; i < rowN; i++) {
                    let temp = ""; //每次截取的字符串
                    let start = i * maxLength; //开始截取的位置
                    let end = start + maxLength; //结束截取的位置
                    //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                    temp = value.substring(start, end) + "\n";
                    ret += temp; //凭借最终的字符串
                  }
                  return ret;
                } else {
                  return value;
                }
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            max: 100,
            axisLabel: {
              formatter: "{value} %"
            }
          }
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "20%",
            data: [10, 52, 45, 33, 12]
          }
        ]
      });
    },
    // time
    updateTime() {
      // var cd = new Date();
      // this.time =
      //   this.zeroPadding(cd.getHours(), 2) +
      //   ":" +
      //   this.zeroPadding(cd.getMinutes(), 2) +
      //   ":" +
      //   this.zeroPadding(cd.getSeconds(), 2);
      // this.date =
      //   this.zeroPadding(cd.getFullYear(), 4) +
      //   "-" +
      //   this.zeroPadding(cd.getMonth() + 1, 2) +
      //   "-" +
      //   this.zeroPadding(cd.getDate(), 2) +
      //   " " +
      //   this.week[cd.getDay()];
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.drawPie("main");
    });
    this.$nextTick(function() {
      this.drawZhu("cpu");
    });
    setInterval(() => {
      this.updateTime();
    }, 1000);
    this.updateTime();
  }
};
</script>

<style lang="less" scoped>
.overview {
  display: flex;
  flex-flow: column;
  // 页头
  .top {
    display: flex;
    .top-l {
      background-color: #f2f4fb;
      flex: 70%;
      height: 700px;
      margin-right: 16px;
    }
    .top-r {
      flex: 30%;
      display: flex;
      flex-flow: column;
      .entry {
        background-color: #f2f4fb;
        flex: 30%;
        margin-bottom: 16px;
        display: block;
        .el-icon-close {
          cursor: pointer;
        }
      }
      .realtime {
        background-color: #f2f4fb;
        flex: 70%;
      }
    }
  }
  // 页尾
  .bottom {
    background-color: #f2f4fb;
    display: flex;
    flex-flow: column;
    margin-top: 16px;
    .topt {
      flex: 50%;
      display: flex;
      .cpu {
        flex: 30%;
        display: flex;
        flex-flow: column;
        border: 1px solid #e1e6f1;
        border-top: 4px solid #939ea9;
        padding: 16px;
        .cpuTitle {
          flex: 20%;
          display: flex;
          flex-flow: column;
          font-size: 12px;
          color: #778592;
          font-weight: 400;
          .titlet {
            flex: 50%;
            display: flex;
            justify-content: space-between;
            .totleName {
              font-family: PingFangSC-Medium;
              font-size: 12px;
              color: #09121a;
              font-weight: 600;
            }
          }
          .titleb {
            flex: 50%;
            display: flex;
            .proportion {
              font-family: PingFangSC-Medium;
              font-size: 18px;
              color: #3f7dff;
              line-height: 15px;
              font-weight: 500;
              margin-left: 5px;
            }
          }
        }
        .cpuPie {
          flex: 80%;
        }
      }
      .memory {
        flex: 70%;
        border: 1px solid #e1e6f1;
        border-top: 4px solid #939ea9;
        padding: 16px;
      }
    }
    .topb {
      flex: 50%;
    }
  }
}
</style>
