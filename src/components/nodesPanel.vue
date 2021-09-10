<template>
  <div class="node-panel">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="属性" name="first">
        <el-collapse v-model="activeNames" @change="handleChange" style="padding-left:10px;padding-right:10px;">
          <el-collapse-item title="对齐" name="1">
            <div class="align mt4">
              <label class="hover"><i title="左对齐" class="t-icon t-align-left" @click="onAlign('left')"></i></label>
              <label class="hover"><i title="右对齐" class="t-icon t-align-right" @click="onAlign('right')"></i></label>
              <label class="hover"><i title="顶部对齐" class="t-icon t-align-top" @click="onAlign('top')"></i></label>
              <label class="hover"><i title="底部对齐" class="t-icon t-align-bottom" @click="onAlign('bottom')"></i></label>
              <label class="hover"><i title="垂直居中" class="t-icon t-align-center" @click="onAlign('center')"></i></label>
              <label class="hover"><i title="水平居中" class="t-icon t-align-middle" @click="onAlign('middle')"></i></label>
              <!-- <label class="hover"><i title="等距分布、两端对齐" class="t-icon t-horizontal-between"></i></label> -->
            </div>
          </el-collapse-item>
          <!-- 节点样式 -->
          <lineStyle></lineStyle>
          <!-- 字体设置组件 -->
          <textStyle></textStyle>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="结构" name="second">
        <!-- 结构组件 -->
        <struct />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { alignNodes } from '@topology/layout'
import struct from './child/struct'
import textStyle from './child/textStyle.vue'
import lineStyle from './child/style.vue'

export default {
  name: 'nodesPanel',
  data() {
    return {
      pen: null,
      node: {
        strokeType: 0,
        lineGradientFromColor: '#888888',
        lineGradientToColor: '#00FF26'
      },
      activeName: 'first',
      activeNames: ['1'],
      dash: [
        {
          value: 0,
          label: '实线'
        },
        {
          value: 1,
          label: '虚线1'
        },
        {
          value: 2,
          label: '虚线2'
        },
        {
          value: 3,
          label: '虚线3'
        }
      ],
      strokeType: [
        { value: 0, label: '无' },
        { value: 1, label: '线性渐变' }
      ]
    }
  },
  components: {
    struct: struct,
    textStyle: textStyle,
    lineStyle: lineStyle
  },
  watch: {},
  methods: {
    handleClick(tab, event) {},
    handleChange(val) {},
    onChange() {
      for (const key in this.node) {
        if (this.node[key] !== null) {
          this.pen[key] = this.node[key]
        }
      }
      // force update UI because el-select does not show correct value after change
      this.$forceUpdate()
      // this.$set(this.node, 'dash', 1)
      window.topology.updateProps()
    },
    onAlign(align) {
      alignNodes(window.topology.activeLayer.pens, window.topology.activeLayer.rect, align)
      window.topology.render()
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.node-panel {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  .flex-group {
    flex-wrap: wrap;
    margin: 4px 0;
    align-items: center;
    display: flex;
    justify-content: space-between;
    .full-text {
      width: 60%;
      .ant-input {
        text-align: left;
        font-size: 12px;
        line-height: 24px;
        height: 26px;
        width: 100%;
        // padding: 0 8px;
        border-radius: 2px;
        border: 1px solid transparent;
        box-shadow: none;
        transition: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
.align {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
}
.mt4 {
  margin-top: 4px !important;
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
