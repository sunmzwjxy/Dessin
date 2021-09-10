<template>
  <div class="line-panel">
    <el-tabs v-model="activeName">
      <el-tab-pane label="属性" name="first">
        <div>Line</div>
      </el-tab-pane>
      <el-tab-pane label="配置" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="动画" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="任务" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'linePanel',
  data () {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style lang="scss" scoped>
.line-panel {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
}
::v-deep .el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0 0 0px;
}
::v-deep .el-tabs__nav-scroll {
  padding-left: 12px;
}
::v-deep .el-tabs__item {
  padding: 0 10px;
  height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 15px;
  font-weight: 500;
  color: #303133;
  position: relative;
  margin: 0 auto；;
}</style>
