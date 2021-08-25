<template>
  <el-collapse-item title="样式设置" name="2">
    <div class="flex-group">
      <div>线条样式</div>
      <el-select v-model="dash" placeholder="请选择" size="mini" style="width:130px" @change="onChange">
        <el-option v-for="item in dashType" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </div>
  </el-collapse-item>
</template>

<script>
export default {
  name: 'style',
  data() {
    return {
      dash: 0,
      dashType: [
        { value: 0, label: '实线' },
        { value: 1, label: '虚线1' },
        { value: 2, label: '虚线2' },
        { value: 3, label: '虚线3' }
      ]
    }
  },
  methods: {
    onChange() {}
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
