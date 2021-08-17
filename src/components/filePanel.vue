<template>
  <div class="file-panel">
    <el-tabs v-model="activeName">
      <el-tab-pane label="图纸" name="first">
        <el-collapse v-model="activeNames" style="padding-left:10px;padding-right:10px;">
          <el-collapse-item title="文件" name="1">
            <div class="flex-group">
              <div>文件名</div>
              <el-input size="mini" placeholder="文件名" v-model="name"></el-input>
            </div>
            <div class="flex-group">
              <div>文件夹</div>
              <el-input size="mini" placeholder="文件夹" v-model="folder"></el-input>
            </div>
            <div class="flex-group">
              <div>分类</div>
              <el-input size="mini" placeholder="分类" v-model="classify"></el-input>
            </div>
          </el-collapse-item>
          <el-collapse-item title="背景" name="2">
            <div class="flex-group">
              <div>背景颜色</div>
              <label>{{ bkColor }}</label>
              <el-color-picker v-model="bkColor" size="mini"></el-color-picker>
            </div>
            <div class="flex-group">
              <div>背景图片</div>
              <el-button icon="el-icon-edit" size="mini"></el-button>
            </div>
            <div class="flex-group">
              <div>背景网格</div>
              <el-switch v-model="grid"></el-switch>
            </div>
            <div class="flex-group">
              <div>网格颜色</div>
              <label>{{ gridColor }}</label>
              <el-color-picker v-model="gridColor" size="mini"></el-color-picker>
            </div>
            <div class="flex-group">
              <div>网格大小</div>
              <el-input-number v-model="gridSize" controls-position="right" :min="1" :max="50" size="small"></el-input-number>
            </div>
          </el-collapse-item>
          <el-collapse-item title="标尺" name="3">
            <div class="flex-group">
              <div>标尺</div>
              <el-switch v-model="rule"> </el-switch>
            </div>
            <div class="flex-group">
              <div>标尺颜色</div>
              <label>{{ ruleColor }}</label>
              <el-color-picker v-model="ruleColor" size="mini"></el-color-picker>
            </div>
          </el-collapse-item>
          <el-collapse-item title="小提示" name="4">
            <ul style="fontSize:small">
              <li>Ctrl/Command + Alt + Shift + 鼠标单击：自定义锚点</li>
              <li>Ctrl/Command/Space + 鼠标拖拽空白：移动整个画布</li>
              <li>Alt/Shift + 鼠标拖拽节点：独立拖拽（子）节点</li>
              <li>Ctrl/Command + 鼠标点击：多选</li>
              <li>← ↑ → ↓ ：移动5个像素</li>
              <li>Ctrl + ← ↑ → ↓ ：移动1个像素</li>
              <br /><br /><br />
            </ul>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="通信" name="second">
        <el-collapse v-model="activeNames" style="padding-left:10px;padding-right:10px;">
          <el-collapse-item title="MQTT" name="5">
            <div class="flex-group">
              <div>mqTT</div>
              <div class="full-text"><el-input size="mini" placeholder="mqTT"></el-input></div>
            </div>
            <div class="flex-group">
              <div>key</div>
              <div class="full-text"><el-input size="mini" placeholder="mqTT key"></el-input></div>
            </div>
            <div class="flex-group">
              <el-button>连接</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="结构" name="third">
        <el-collapse v-model="activeNames" style="padding-left:10px;padding-right:10px;">
          <el-collapse-item title="结构设置" name="5">
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'filePanel',
  data() {
    return {
      activeName: 'first',
      activeNames: ['1', '2', '3', '5']
    }
  },
  methods: {
    ...mapMutations('menu', ['emit'])
  },
  computed: {
    name: {
      get() {
        return this.$store.state.canvas.filePops.name
      },
      set(newValue) {
        this.emit({
          name: 'filePanel',
          data: {
            key: 'name',
            value: newValue
          }
        })
      }
    },
    folder: {
      get() {
        return this.$store.state.canvas.filePops.folder
      },
      set(newValue) {
        this.emit({
          name: 'filePanel',
          data: {
            key: 'folder',
            value: newValue
          }
        })
      }
    },
    classify: {
      get() {
        return this.$store.state.canvas.filePops.classify
      },
      set(newValue) {
        this.emit({
          name: 'filePanel',
          data: {
            key: 'classify',
            value: newValue
          }
        })
      }
    },
    bkColor: {
      get() {
        return this.$store.state.canvas.filePops.bkColor
      },
      set(newValue) {
        this.emit({
          name: 'filePanel',
          data: {
            key: 'bkColor',
            value: newValue
          }
        })
      }
    },
    grid: {
      get() {
        return this.$store.state.canvas.filePops.grid
      },
      set(newValue) {
        this.emit({
          name: 'filePanel',
          data: {
            key: 'grid',
            value: newValue
          }
        })
      }
    },
    gridColor: {
      get() {
        return this.$store.state.canvas.filePops.gridColor
      },
      set(newValue) {
        this.emit({
          name: 'filePanel',
          data: {
            key: 'gridColor',
            value: newValue
          }
        })
      }
    },
    gridSize: {
      get() {
        return this.$store.state.canvas.filePops.gridSize
      },
      set(newValue) {
        this.emit({
          name: 'filePanel',
          data: {
            key: 'gridSize',
            value: newValue
          }
        })
      }
    },
    rule: {
      get() {
        return this.$store.state.canvas.filePops.rule
      },
      set(newValue) {
        this.emit({
          name: 'filePanel',
          data: {
            key: 'rule',
            value: newValue
          }
        })
      }
    },
    ruleColor: {
      get() {
        return this.$store.state.canvas.filePops.ruleColor
      },
      set(newValue) {
        this.emit({
          name: 'filePanel',
          data: {
            key: 'ruleColor',
            value: newValue
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.file-panel {
  height: 100%;
  box-sizing: border-box;
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
}

.input:hover {
  border: 1px solid #f00;
}

// ::v-deep .el-tabs__header {
//   margin-left: auto;
//   margin-right: auto;
//   width: 100%;
// }
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
