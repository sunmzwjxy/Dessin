<template>
  <div class="tools">
    <el-tabs v-model="activeName">
      <el-tab-pane label="图纸" name="first">
        <folderTree :mtype="false"></folderTree>
      </el-tab-pane>
      <el-tab-pane label="系统组件" name="second">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item v-for="(group, index) in tools" :key="index" :title="group.name" :name="index" style="margin:0px 10px;">
            <div class="thumbs">
              <div class="thumb flex" v-for="(item, i) in group.list" :key="i">
                <div class="center hover" :title="item.name" draggable="true" @dragstart="onDrag($event, item)" @click="onTouchstart(item)">
                  <i :class="`icon-size ${item.icon}`"></i>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="组件" name="third">
        <folderTree :mtype="true"></folderTree>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { Tools } from '../services/canvas'
import folderTree from './child/folderTree.vue'

export default {
  name: 'Tools',
  data() {
    return {
      tools: Tools,
      activeName: 'second',
      activeNames: [0]
    }
  },
  components: {
    folderTree: folderTree
  },
  methods: {
    onDrag(event, node) {
      event.dataTransfer.setData('Topology', JSON.stringify(node.data))
    },
    onTouchstart(node) {
      window.topology.touchedNode = node.data
    },
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.thumbs {
  display: flex;
  flex-wrap: wrap;
  margin-left: 8px;
  .thumb {
    width: 25%;
  }
}
.flex {
  display: flex;
}
.center {
  text-align: center;
  margin: auto;
}
.icon-size {
  font-size: 25px;
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
}
</style>
