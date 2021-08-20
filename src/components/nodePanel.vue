<template>
  <div class="node-panel">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="属性" name="first">
        <el-collapse v-model="activeNames" @change="handleChange" style="padding-left:10px;padding-right:10px;">
          <el-collapse-item title="位置和大小" name="1">
            <div class="flex-group">
              <div>X</div>
              <el-input-number controls-position="right" size="mini" :min="-100" :max="800" v-model="node.rect.x" @change="onChange"></el-input-number>
            </div>
            <div class="flex-group">
              <div>Y</div>
              <el-input-number controls-position="right" size="mini" :min="-100" :max="800" v-model="node.rect.y" @change="onChange"></el-input-number>
            </div>
            <div class="flex-group">
              <div>宽</div>
              <el-input-number controls-position="right" size="mini" :min="1" :max="800" v-model="node.rect.width" @change="onChange"></el-input-number>
            </div>
            <div class="flex-group">
              <div>高</div>
              <el-input-number controls-position="right" size="mini" :min="1" :max="800" v-model="node.rect.height" @change="onChange"></el-input-number>
            </div>
            <div class="flex-group">
              <div>旋转</div>
              <el-input-number controls-position="right" size="mini" :min="-360" :max="360" v-model="node.rotate" @change="onChange"></el-input-number>
            </div>
          </el-collapse-item>
          <el-collapse-item title="样式" name="2">
            <div class="flex-group">
              <div>线条样式</div>
              <el-select v-model="node.dash" placeholder="请选择" size="mini" style="width:130px" @change="onChange">
                <el-option v-for="item in dash" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
              <el-select v-model="node.strokeType" placeholder="请选择" size="mini" style="width:130px" @change="onChange">
                <el-option v-for="item in strokeType" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </div>
            <div class="flex-group" v-if="node.strokeType">
              <div>开始颜色</div>
              <label>{{ node.lineGradientFromColor }}</label>
              <el-color-picker v-model="node.lineGradientFromColor" size="mini" @change="onChange"></el-color-picker>
            </div>
            <div class="flex-group" v-if="node.strokeType">
              <div>结束颜色</div>
              <label>{{ node.lineGradientToColor }}</label>
              <el-color-picker v-model="node.lineGradientToColor" size="mini" @change="onChange"></el-color-picker>
            </div>
            <div class="flex-group" v-if="!node.strokeType">
              <div>线条颜色</div>
              <el-color-picker v-model="node.strokeStyle" size="mini" @change="onChange"></el-color-picker>
            </div>
            <div class="flex-group">
              <div>线条宽度</div>
              <el-input-number v-model="node.lineWidth" controls-position="right" size="mini" :min="1" :max="800" @change="onChange"></el-input-number>
            </div>
            <div class="flex-group">
              <div>背景</div>
              <el-select v-model="node.bkType" placeholder="请选择" size="mini" style="width:130px" @change="onChange">
                <el-option v-for="item in bkType" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </div>
            <div class="flex-group" v-if="node.bkType === 0">
              <div>背景颜色</div>
              <el-color-picker v-model="node.fillStyle" size="mini" @change="onChange"></el-color-picker>
            </div>
            <div class="flex-group" v-if="node.bkType !== 0">
              <div>开始颜色</div>
              <label>{{ node.gradientFromColor }}</label>
              <el-color-picker v-model="node.gradientFromColor" size="mini" @change="onChange"></el-color-picker>
            </div>
            <div class="flex-group" v-if="node.bkType !== 0">
              <div>结束颜色</div>
              <label>{{ node.gradientToColor }}</label>
              <el-color-picker v-model="node.gradientToColor" size="mini" @change="onChange"></el-color-picker>
            </div>
            <div class="flex-group" v-if="node.bkType === 1">
              <div>渐变角度</div>
              <el-input-number v-model="node.gradientAngle" controls-position="right" size="mini" :min="-360" :max="360" @change="onChange"></el-input-number>
            </div>
            <div class="flex-group" v-if="node.bkType === 2">
              <div>渐变关径</div>
              <!-- step 0.01 -->
              <el-input-number v-model="node.gradientRadius" controls-position="right" size="mini" :precision="2" :step="0.01" :min="0" :max="1" @change="onChange"></el-input-number>
            </div>
            <div class="flex-group">
              <div>透明度</div>
              <!-- step 0.01 -->
              <el-input-number v-model="node.globalAlpha" controls-position="right" size="mini" :precision="2" :step="0.01" :min="0" :max="1" @change="onChange"></el-input-number>
            </div>
          </el-collapse-item>
          <el-collapse-item title="字体设置" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="图片" name="4">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
          <el-collapse-item title="字体图标" name="５">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="配置" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="动画" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="任务" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'nodePanel',
  data() {
    return {
      pen: null,
      node: {
        strokeType: 0,
        lineGradientFromColor: '#888888',
        lineGradientToColor: '#00FF26',
        bkType: 0,
        gradientFromColor: '#888888',
        gradientToColor: '#00FF26'
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
      ],
      bkType: [
        { value: 0, label: '纯色背景' },
        { value: 1, label: '线性渐变' },
        { value: 2, label: '径向渐变' }
      ]
    }
  },
  watch: {
    '$store.state.node.data'(curData) {
      if (curData.strokeType === undefined || curData.strokeType === null) {
        curData.strokeType = 0
      }
      if (curData.bkType === undefined || curData.bkType === null) {
        curData.strokeType = 0
      }
      this.pen = curData
      for (const key in curData) {
        if (curData[key] !== null) {
          this.node[key] = curData[key]
        }
      }
      this.$forceUpdate()
    }
  },
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
    }
  },
  created() {
    this.pen = window.topology.activeLayer.pens[0]
    for (const key in this.pen) {
      if (this.pen[key] !== null) {
        this.node[key] = this.pen[key]
      }
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
