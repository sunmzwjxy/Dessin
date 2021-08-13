<template>
  <div class="file-panel">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="图纸" name="first">
        <div class="file-setting">
          <div>
            <div class="file-group">
              <!-- 文件属性 -->
              <div class="flex-group">
                <div>文件名</div>
                <div class="full-text"><el-input size="mini" placeholder="文件名"></el-input></div>
              </div>
              <div class="flex-group">
                <div>文件夹</div>
                <div class="full-text"><el-input size="mini" placeholder="文件夹"></el-input></div>
              </div>
              <div class="flex-group">
                <div>分类</div>
                <div class="full-text"><el-input size="mini" placeholder="分类"></el-input></div>
              </div>
            </div>
            <div class="file-group">
              <!-- 画布属性 -->
              <div class="flex-group">
                <div>背景颜色</div>
                <el-color-picker v-model="bgcolor" size="mini"></el-color-picker>
              </div>
              <div class="flex-group">
                <div>背景图片</div>
                <el-button icon="el-icon-edit" size="mini"></el-button>
              </div>
              <div class="flex-group">
                <div>背景网格</div>
                <el-switch v-model="bgcheck"></el-switch>
              </div>
              <div class="flex-group">
                <div>网格颜色</div>
                <el-color-picker v-model="gridcolor" size="mini"></el-color-picker>
              </div>
              <div class="flex-group">
                <div>网格大小</div>
                <el-input-number v-model="num" controls-position="right" :min="1" :max="10" size="small"></el-input-number>
              </div>
            </div>
            <div class="file-group">
              <!-- 标尺 -->
              <div class="flex-group">
                <div>标尺</div>
                <el-switch v-model="rulecheck"> </el-switch>
              </div>
              <div class="flex-group">
                <div>标尺颜色</div>
                <el-color-picker v-model="rulecolor" size="mini"></el-color-picker>
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
      <el-tab-pane label="配置" name="second">配置</el-tab-pane>
      <el-tab-pane label="角色" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'filePanel',
  data() {
    return {
      activeName: 'first',
      bgcolor: '#000',
      bgcheck: false,
      gridcolor: '#000',
      rulecolor: '#000',
      rulecheck: false,
      num: 1
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },
  components: {}
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
