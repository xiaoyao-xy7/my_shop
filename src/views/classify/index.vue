<template>
<div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="手写甘特图" name="first">
        <GanttChart />
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
import GanttChart from './components/GanttChart.vue'

 export default {
  components: {
    GanttChart
  },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>