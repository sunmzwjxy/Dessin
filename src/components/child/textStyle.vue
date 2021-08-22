<template>
  <el-collapse-item title="字体设置" name="3">
    <div class="flex-group">
      <div>字体</div>
      <el-input size="mini" placeholder="字体" v-model="name"></el-input>
    </div>
  </el-collapse-item>
</template>

<script>
export default {
  name: 'textStyle',
  data() {
    return {
      pens: null,
      name: ''
    }
  },
  mounted() {
    this.pens = window.topology.activeLayer.pens
  }
}
</script>

<style lang="scss" scoped>
  .flex-group {
    flex-wrap: wrap;
    margin: 4px 0;
    align-items: center;
    display: flex;
    justify-content: space-between;
    .el-input {
      width: 130px;
    }
  }
</style>
