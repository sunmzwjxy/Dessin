<template>
  <el-collapse v-model="activeNames" style="padding-left:10px;padding-right:10px;">
    <el-collapse-item title="结构设置" name="1">
      <!-- hide table header -->
      <el-table :data="pens" :row-style="{ height: 0 + 'px' }" :cell-style="{ padding: 0 + 'px' }" style="width: 100%" :show-header="false">
        <el-table-column prop="name" label="ID" width="120"> </el-table-column>
        <el-table-column label="Lock" width="50">
          <template v-slot="scope">
            <!-- switch icon -->
            <a @click="handleLock(scope.$index, scope.row)">
              <div v-if="scope.row.locked === 1" class="icon" title="Lock">
                <i class="basic-icon basic-lock"></i>
              </div>
              <div v-else-if="scope.row.locked === 2" class="icon" title="Disable">
                <i class="basic-icon basic-jinyong1"></i>
              </div>
              <div v-else class="icon" title="Editable">
                <i class="basic-icon basic-unlock"></i>
              </div>
            </a>
          </template>
        </el-table-column>
        <el-table-column label="Hide" width="50">
          <template v-slot="scope">
            <a @click="handleHide(scope.row)" :title="scope.row.visible ? 'visible' : 'invisible'">
              <div class="icon">
                <i :class="scope.row.visible ? 'basic-icon basic-display-copy' : 'basic-icon basic-hide'"></i>
              </div>
            </a>
          </template>
        </el-table-column>
      </el-table>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  name: 'struct',
  data() {
    return {
      pens: null,
      activeNames: ['1']
    }
  },
  mounted() {
    this.pens = window.topology.data.pens
  },
  methods: {
    handleHide(node) {
      node.visible = !node.visible
      window.topology.render()
    },
    handleLock(index, node) {
      if (node.locked === 0 || node.locked === undefined) {
        node.locked = 1
      } else if (node.locked === 1) {
        node.locked = 2
      } else {
        node.locked = 0
      }
      window.topology.render()
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
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
}
</style>
