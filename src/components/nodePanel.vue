<template>
  <div class="node-panel">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="属性" name="first">
        <el-collapse v-model="activeNames" @change="handleChange" style="padding-left:10px;padding-right:10px;">
          <el-collapse-item title="位置和大小" name="1">
            <div class="flex-group">
              <div>X</div>
              <el-input-number controls-position="right" size="mini" :min="-100" :max="2000" v-model="rectx" @change="onChange"></el-input-number>
            </div>
            <div class="flex-group">
              <div>Y</div>
              <el-input-number controls-position="right" size="mini" :min="-100" :max="2000" v-model="recty" @change="onChange"></el-input-number>
            </div>
            <div class="flex-group">
              <div>宽</div>
              <el-input-number controls-position="right" size="mini" :min="1" :max="800" v-model="rectwidth" @change="onChange"></el-input-number>
            </div>
            <div class="flex-group">
              <div>高</div>
              <el-input-number controls-position="right" size="mini" :min="1" :max="800" v-model="rectheight" @change="onChange"></el-input-number>
            </div>
            <div class="flex-group">
              <div>旋转</div>
              <el-input-number controls-position="right" size="mini" :min="-360" :max="360" v-model="rotate" @change="onChange"></el-input-number>
            </div>
          </el-collapse-item>
          <el-collapse-item title="样式" name="2">
            <div class="flex-group">
              <div>线条样式</div>
              <el-select v-model="dash" placeholder="请选择" size="mini" style="width:130px" @change="onChange">
                <el-option v-for="item in dashType" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </div>
            <!-- <div class="flex-group">
              <div>末端样式</div>
              <el-select v-model="value" placeholder="请选择" size="mini" style="width:130px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </div> -->
            <div class="flex-group">
              <div>线条渐变</div>
              <el-select v-model="strokeType" placeholder="请选择" size="mini" style="width:130px" @change="onChange">
                <el-option v-for="item in strokeTypeArr" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </div>
            <div class="flex-group" v-if="strokeType">
              <div>开始颜色</div>
              <label>{{ lineGradientFromColor }}</label>
              <el-color-picker v-model="lineGradientFromColor" size="mini" @change="onChange"></el-color-picker>
            </div>
            <div class="flex-group" v-if="strokeType">
              <div>结束颜色</div>
              <label>{{ lineGradientToColor }}</label>
              <el-color-picker v-model="lineGradientToColor" size="mini" @change="onChange"></el-color-picker>
            </div>
            <div class="flex-group" v-if="!strokeType">
              <div>线条颜色</div>
              <el-color-picker v-model="strokeStyle" size="mini" @change="onChange"></el-color-picker>
            </div>
            <div class="flex-group">
              <div>线条宽度</div>
              <el-input-number v-model="lineWidth" controls-position="right" size="mini" :min="1" :max="800" @change="onChange"></el-input-number>
            </div>
            <div class="flex-group">
              <div>背景</div>
              <el-select v-model="bkType" placeholder="请选择" size="mini" style="width:130px" @change="onChange">
                <el-option v-for="item in bkTypeArr" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </div>
            <div class="flex-group" v-if="bkType === 0">
              <div>背景颜色</div>
              <el-color-picker v-model="fillStyle" size="mini" @change="onChange"></el-color-picker>
            </div>
            <div class="flex-group" v-if="bkType !== 0">
              <div>开始颜色</div>
              <label>{{ gradientFromColor }}</label>
              <el-color-picker v-model="gradientFromColor" size="mini" @change="onChange"></el-color-picker>
            </div>
            <div class="flex-group" v-if="bkType !== 0">
              <div>结束颜色</div>
              <label>{{ gradientToColor }}</label>
              <el-color-picker v-model="gradientToColor" size="mini" @change="onChange"></el-color-picker>
            </div>
            <div class="flex-group" v-if="bkType === 1">
              <div>渐变角度</div>
              <el-input-number v-model="gradientAngle" controls-position="right" size="mini" :min="-360" :max="360" @change="onChange"></el-input-number>
            </div>
            <div class="flex-group" v-if="bkType === 2">
              <div>渐变关径</div>
              <!-- step 0.01 -->
              <el-input-number v-model="gradientRadius" controls-position="right" size="mini" :precision="2" :step="0.01" :min="0" :max="1" @change="onChange"></el-input-number>
            </div>
            <div class="flex-group">
              <div>透明度</div>
              <!-- step 0.01 -->
              <el-input-number v-model="globalAlpha" controls-position="right" size="mini" :precision="2" :step="0.01" :min="0" :max="1" @change="onChange"></el-input-number>
            </div>
          </el-collapse-item>
          <!-- 字体设置组件 -->
          <textStyle></textStyle>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="配置" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="动画" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="任务" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import textStyle from './child/textStyle.vue'

export default {
  name: 'nodePanel',
  data() {
    return {
      activeName: 'first',
      activeNames: ['1', '2'],
      dashType: [
        { value: 0, label: '实线' },
        { value: 1, label: '虚线1' },
        { value: 2, label: '虚线2' },
        { value: 3, label: '虚线3' }
      ],
      strokeTypeArr: [
        { value: 0, label: '无' },
        { value: 1, label: '线性渐变' }
      ],
      bkTypeArr: [
        { value: 0, label: '纯色背景' },
        { value: 1, label: '线性渐变' },
        { value: 2, label: '径向渐变' }
      ]
    }
  },
  components: {
    textStyle: textStyle
  },
  computed: {
    rectx: {
      get() {
        return this.$store.state.node.data.rect.x
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'x', value: curValue })
      }
    },
    recty: {
      get() {
        return this.$store.state.node.data.rect.y
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'y', value: curValue })
      }
    },
    rectwidth: {
      get() {
        return this.$store.state.node.data.rect.width
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'width', value: curValue })
      }
    },
    rectheight: {
      get() {
        return this.$store.state.node.data.rect.height
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'height', value: curValue })
      }
    },
    rotate: {
      get() {
        return this.$store.state.node.data.rotate
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'rotate', value: curValue })
      }
    },
    dash: {
      get() {
        return this.$store.state.node.data.dash
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'dash', value: curValue })
      }
    },
    strokeType: {
      get() {
        return this.$store.state.node.data.strokeType
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'strokeType', value: curValue })
      }
    },
    lineGradientFromColor: {
      get() {
        return this.$store.state.node.data.lineGradientFromColor
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'lineGradientFromColor', value: curValue })
      }
    },
    lineGradientToColor: {
      get() {
        return this.$store.state.node.data.lineGradientToColor
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'lineGradientToColor', value: curValue })
      }
    },
    strokeStyle: {
      get() {
        return this.$store.state.node.data.strokeStyle
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'strokeStyle', value: curValue })
      }
    },
    lineWidth: {
      get() {
        return this.$store.state.node.data.lineWidth
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'lineWidth', value: curValue })
      }
    },
    bkType: {
      get() {
        return this.$store.state.node.data.bkType
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'bkType', value: curValue })
      }
    },
    fillStyle: {
      get() {
        return this.$store.state.node.data.fillStyle
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'fillStyle', value: curValue })
      }
    },
    gradientFromColor: {
      get() {
        return this.$store.state.node.data.gradientFromColor
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'gradientFromColor', value: curValue })
      }
    },
    gradientToColor: {
      get() {
        return this.$store.state.node.data.gradientToColor
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'gradientToColor', value: curValue })
      }
    },
    gradientAngle: {
      get() {
        return this.$store.state.node.data.gradientAngle
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'gradientAngle', value: curValue })
      }
    },
    gradientRadius: {
      get() {
        return this.$store.state.node.data.gradientRadius
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'gradientRadius', value: curValue })
      }
    },
    globalAlpha: {
      get() {
        return this.$store.state.node.data.globalAlpha
      },
      set(curValue) {
        this.$store.commit('node/updateNode', { key: 'globalAlpha', value: curValue })
      }
    }
  },
  methods: {
    handleClick(tab, event) {},
    handleChange(val) {},
    onChange(key, value) {
      // force update UI because el-select does not show correct value after change
      // this.$forceUpdate()
      // this.$set(this.node, 'dash', 1)
      window.topology.updateProps()
    }
  }
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
