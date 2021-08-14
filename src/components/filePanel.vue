<template>
  <div class="file-panel">
    <el-tabs v-model="activeName">
      <el-tab-pane label="图纸" name="first">
        <div class="file-setting">
          <div>
            <div class="file-group">
              <!-- 文件属性 -->
              <div class="flex-group">
                <div>文件名</div>
                <div class="full-text"><el-input size="mini" placeholder="文件名" v-model="name"></el-input></div>
              </div>
              <div class="flex-group">
                <div>文件夹</div>
                <div class="full-text"><el-input size="mini" placeholder="文件夹" v-model="folder"></el-input></div>
              </div>
              <div class="flex-group">
                <div>分类</div>
                <div class="full-text"><el-input size="mini" placeholder="分类" v-model="classify"></el-input></div>
              </div>
            </div>
            <div class="file-group">
              <!-- 画布属性 -->
              <div class="flex-group">
                <div>背景颜色</div>
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
                <el-color-picker v-model="gridColor" size="mini"></el-color-picker>
              </div>
              <div class="flex-group">
                <div>网格大小</div>
                <el-input-number v-model="gridSize" controls-position="right" :min="1" :max="50" size="small"></el-input-number>
              </div>
            </div>
            <div class="file-group">
              <!-- 标尺 -->
              <div class="flex-group">
                <div>标尺</div>
                <el-switch v-model="rule"> </el-switch>
              </div>
              <div class="flex-group">
                <div>标尺颜色</div>
                <el-color-picker v-model="ruleColor" size="mini"></el-color-picker>
              </div>
              <br /><br />
              <div>小提示</div>
            </div>
            <div class="file-group">
              <!-- Tips -->
              <ul style="fontSize:small">
                <li>Ctrl/Command + Alt + Shift + 鼠标单击：自定义锚点</li>
                <li>Ctrl/Command/Space + 鼠标拖拽空白：移动整个画布</li>
                <li>Alt/Shift + 鼠标拖拽节点：独立拖拽（子）节点</li>
                <li>Ctrl/Command + 鼠标点击：多选</li>
                <li>← ↑ → ↓ ：移动5个像素</li>
                <li>Ctrl + ← ↑ → ↓ ：移动1个像素</li>
                <br /><br /><br />
              </ul>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="通信" name="second">
        <div class="file-setting">
          <div>
            <div class="file-group">
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
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="角色" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'filePanel',
  data() {
    return {
      activeName: 'first'
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
}
.file-setting {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  .file-group {
    width: 91%;
    padding: 8px 12px;
    border-bottom: 1px solid #e5e5e5;
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
