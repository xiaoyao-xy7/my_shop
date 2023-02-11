<template>
  <div>
    <div id="app">
      <div id="apps" ref="ChartBox" style="height: 400px;"></div>
      <div
        v-show="timeChart.length > 9 && timeChart[0].length > 5"
        style="display: flex;
        justify-content: space-evenly;
        margin-top: -5px;"
      >
        <span v-for="(item, index) in strArr" :key="index">{{item.slice(0,10)}}</span>
        <!-- <span>{{timeChart[timeChart.length - 1]}}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
// const echarts = require("echarts");
import * as echarts from "echarts";

export default {
  data() {
    return {
      strArr: [],
      res: {
        "2022-11-22": 0,
        "2022-11-01": 10,
        "2022-11-23": 0,
        "2022-11-20": 0,
        "2022-11-21": 0,
        "2022-11-15": 0,
        "2022-11-16": 0,
        "2022-11-13": 0,
        "2022-11-14": 0,
        "2022-11-19": 0,
        "2022-11-17": 0,
        "2022-11-18": 0,
        "2022-11-30": 0,
        "2022-11-11": 0,
        "2022-11-12": 0,
        "2022-11-10": 4,
        "2022-11-04": 0,
        "2022-11-26": 0,
        "2022-11-05": 0,
        "2022-11-27": 0,
        "2022-11-02": 4,
        "2022-11-24": 0,
        "2022-11-03": 0,
        "2022-11-25": 0,
        "2022-11-08": 2,
        "2022-11-09": 0,
        "2022-11-06": 0,
        "2022-11-28": 0,
        "2022-11-07": 4,
        "2022-11-29": 0,
        "2022-11-30": 0,
        "2022-12-01": 0,
        "2022-12-02": 0,
        "2022-12-03": 0,  
        "2022-12-04": 0,
        "2022-12-05": 0,
        "2022-12-06": 0,
        "2022-12-07": 0
      },
      timeChart: [],
      opinionData: [],
      offsetColor0: "rgba(1,74,226,0.1)",
      offsetColor0_5: "rgba(0,74,226,0.1)",
      offsetColor1: "rgba(247,249,254,0.1)"
    };
  },
  //   created() {
  //     this.drawLine("apps");
  //   },
  mounted() {
    this.getChart();
  },
  methods: {
    drawLine(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          // trigger: "axis",
          show: true,
          trigger: "axis",
          //show: true,   //default true
          showDelay: 0, //显示延时，添加显示延时可以避免频繁切换
          hideDelay: 50, //隐藏延时
          transitionDuration: 0, //动画变换时长
          backgroundColor: "#FFFFFF", //背景颜色（此时为默认色）
          borderRadius: 8, //边框圆角
          padding: 10, // [5, 10, 15, 20] 内边距
          position: function(p) {
            // 位置回调
            // console.log && console.log(p);
            return [p[0] + 10, p[1] - 10];
          },
          textStyle: {
            color: "#000000", //字体颜色
            fontSize: 13 //字体大小
          },
          extraCssText:
            "width:110px;height:72px;background-color:#FFFFFF;box-shadow: 0px 12px 36px 10px rgba(0,0,0,0.05);",
          formatter: function(val) {
            let str =
              `<span style='font-size: 12px;color: #000000; opacity: 0.45; display:inline-block; margin-bottom: 5px;'>调用次数</span>` +
              "<br/>";
            str +=
              `<span style='width:10px;height:10px;border-radius:10px;font-size: 24px;margin-right: 5px;margin-top: 5px;'>${val[0].data}</span>` +
              "\t" +
              "<span style='font-size: 12px;color: #000000; opacity: 0.65;'>次</span>";
            return str;
          }
        },
        // legend: {
        //   data: ["次数"],
        // },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: false
          }
        },
        xAxis: {
          name: "时间",
          type: "category",
          boundaryGap: false,
          data: this.timeChart,
          axisTick: {
            // show: this.timeChart.length > 9 && this.timeChart[0].length > 5 ? false : true
            show: false
          },
          axisLabel: {
            show:
              this.timeChart.length > 9 && this.timeChart[0].length > 5
                ? false
                : true
          }
        },
        yAxis: {
          name: "次数",
          type: "value",
          max: null,
          // minInterval: 1,
          splitLine: {
            lineStyle: {
              type: "dashed" //虚线
            },
            show: true //隐藏
          },
          // axisLine: {show:false,lineStyle:{color:"white"}}
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },

        series: [
          {
            name: "次数",
            type: "line",
            stack: "总量",
            data: this.opinionData,
            smooth: true,
            lineStyle: {
              shadowOffsetX: 0,
              shadowOffsetY: 9,
              shadowBlur: 8,
              shadowColor: "rgba(145,132,132,1)"
            },
            itemStyle: {
              normal: {
                color: "#5B8FF9",
                lineStyle: {
                  color: "#5B8FF9",
                  width: 2,
                  shadowOffsetX: 0,
                  shadowOffsetY: 12,
                  shadowBlur: 5,
                  shadowColor: "rgba(199,208,231,1)"
                }
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: this.offsetColor0
                    },
                    {
                      offset: 0.5,
                      color: this.offsetColor0_5
                    },
                    {
                      offset: 1,
                      color: this.offsetColor1
                    }
                  ],
                  false
                )
              }
            }
          }
        ]
      });
    },
    getChart() {
      Object.keys(this.res)
        .sort()
        .forEach(item => {
          this.timeChart.push(item);
          this.timeChart.forEach((i, index) => {
            if (item === i || item.slice(0, 7) === i) {
              this.opinionData.splice(index, 1, this.res[i]);
            }
          });
        });
      if (this.timeChart.length > 9 && this.timeChart[0].length > 5) {
        const str = this.timeChart.toString();
        const n = Math.floor(this.timeChart.length / 10) * 11; // 步长
        for (var i = 0, l = str.length; i < l / n; i++) {
          let a = str.slice(n * i, n * (i + 1));
          this.strArr.push(a);
        }
      }
      this.$nextTick(function() {
        this.drawLine("apps");
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>