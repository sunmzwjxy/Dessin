<template>
  <div class="menus">
    <div class="flex" style="flex-grow: 1;justify-content: space-between;">
      <div style="display: flex;">
        <a class="menu">
          <div class="icon">
            <img src="/favicon.ico" alt="" />
          </div>
          <div>Dessin</div>
        </a>
        <el-dropdown class="menu" @command="onMenu">
          <span class="el-dropdown-link">
            <div class="icon">
              <i class="t-icon t-edit"></i>
              <i class="abs t-icon t-triangle-down"></i>
            </div>
            文件
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus" command="New"> 新建文件 <span>Ctrl+N</span></el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus" command="Open"> 打开文件 <span>Ctrl+O</span> </el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline" command="Load"> 导入文件 <span>Ctrl+I</span> </el-dropdown-item>
            <el-dropdown-item icon="el-icon-check" divided command="Save"> 保存 <span>Ctrl+S</span> </el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check" command="SaveJSON"> 下载为JSON </el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check" command="SavePNG"> 下载为PNG </el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check" command="SaveSVG"> 下载为SVG </el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check" divided command="exportHTML"> 导出为HTML </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="menu" @command="onMenu">
          <span class="el-dropdown-link">
            <div class="icon">
              <i class="t-icon t-edit"></i>
              <i class="abs t-icon t-triangle-down"></i>
            </div>
            编辑
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus" command="Undo"> 撤消 <span>Ctrl+Z</span></el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus" command="Redo"> 恢复 <span>Ctrl+Shift+Z</span> </el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline" divided command="Cut"> 剪切 <span>Ctrl+X</span> </el-dropdown-item>
            <el-dropdown-item icon="el-icon-check" command="Copy"> 复制 <span>Ctrl+C</span> </el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check" command="Paste"> 粘贴 <span>Ctrl+V</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <a class="menu" @click="onMenu('Save')">
          <div class="icon">
            <i class="t-icon t-save"></i>
          </div>
          <div>保存</div>
        </a>
        <a class="menu" @click="onMenu('Undo')"
          ><div class="icon">
            <i class="t-icon t-reply"></i>
          </div>
          <div>撤销</div>
        </a>
      </div>
      <div style="display: flex;">
        <a class="menu" @click="onState({ key: 'locked', value: !locked })">
          <div class="icon"><i :class="locked ? 't-icon t-lock' : 't-icon t-unlock'"></i></div>
          <div v-if="locked">已锁定</div>
          <div v-else>已解锁</div>
        </a>
        <a class="top menu">
          <div class="icon">
            <span class="inline center" style="width: 35px;">{{ scale }}%</span>
            <i class="abs t-icon t-triangle-down"></i>
          </div>
          <div>视图</div>
          <div class="dropdown-content nowrap ph16">
            <span class="inline mr16" @click="onState({ key: 'scale', value: -0.1 })"><i class="t-icon t-reduce"></i></span>
            <span class="inline mr16" @click="onState({ key: 'scale', value: 0.1 })"><i class="t-icon t-add mr8"></i></span>
            <button class="button mr8" @click="onState({ key: 'fitview', value: 0 })">窗口大小</button>
            <button class="button" @click="onState({ key: 'reset', value: 1 })">重置</button>
          </div>
        </a>
        <el-dropdown class="menu" @command="onState">
          <span class="el-dropdown-link">
            <div class="icon"><i :class="`icon-size t-icon t-${lineName}`"></i></div>
            <div>连线</div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in lineNames" :key="index" :command="{ key: 'lineName', value: item.value }">
              <span><i :class="`icon-size t-icon t-${item.value}`"></i> {{ item.name }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <a class="top menu">
          <div class="icon">{{ lineWidth }}</div>
          <div>线宽</div>
          <div class="dropdown-content p8">
            <el-input-number v-model.lazy="lineWidth" :min="1" :max="30"></el-input-number>
          </div>
        </a>
        <el-dropdown class="menu" @command="onState">
          <span class="el-dropdown-link">
            <div class="icon"><i :class="`icon-size t-icon t-from-${fromArrow}`"></i></div>
            <div>起点箭头</div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in arrowTypes" :key="index" style="width:120px" :command="{key: 'fromArrow', value: item}">
              <span><i :class="`icon-size t-icon t-from-${item}`"></i></span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="menu" @command="onState">
          <span class="el-dropdown-link">
            <div class="icon"><i :class="`icon-size t-icon t-to-${toArrow}`"></i></div>
            <div>终点箭头</div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in arrowTypes" :key="index" style="width:120px" :command="{key: 'toArrow', value: item}">
              <span><i :class="`icon-size t-icon t-from-${item}`"></i></span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <a class="menu" @click="onState({ key: 'autoAnchor', value: !autoAnchor })">
          <div class="icon"><i :class="autoAnchor ? 't-icon t-miaodian' : 't-icon t-miaodianjiyong'"></i></div>
          <div>自动锚点</div>
        </a>
      </div>
      <div style="display: flex;">
        <a class="menu">
          <div class="icon"><i class="t-icon t-share"></i></div>
          <div>去分享</div>
        </a>
        <a class="menu">
          <div class="icon"><i class="t-icon t-attention"></i></div>
          <div>预览</div>
        </a>
        <el-dropdown class="menu">
          <span class="el-dropdown-link">
            <div class="icon">
            <i class="t-icon t-edit"></i>
            <i class="abs t-icon t-triangle-down"></i>
            </div>
            帮助
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item> <a href=""></a> 许可与申明 </el-dropdown-item>
            <el-dropdown-item> <a href=""></a> 服务与合作 </el-dropdown-item>
            <el-dropdown-item divided> <a href=""></a> 关于我们 </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <a class="menu ml16">
          <div>登录</div>
        </a>
        <a class="menu gray"><div>|</div></a>
        <a class="menu warning">
          <div>注册</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// import func from 'vue-editor-bridge'
export default {
  name: 'Header',
  data() {
    return {
      lineNames: [
        { name: '曲线', value: 'curve' },
        { name: '线段', value: 'polyline' },
        { name: '直线', value: 'line' },
        { name: '脑图', value: 'mind' }
      ],
      arrowTypes: ['', 'triangleSolid', 'triangle', 'diamondSolid', 'diamond', 'circleSolid', 'circle', 'line', 'lineUp', 'lineDown'],
      num: 1
    }
  },
  methods: {
    onMenu(key, data = null) {
      // 提交菜单事件，通过vuex触发，触发Home.vue里的 watch
      this.$store.commit('menu/emit', { name: key, data: data })
    },
    onState(data) {
      this.$store.commit('menu/emit', {
        name: 'state',
        data: {
          key: data.key,
          value: data.value
        }
      })
    }
  },
  computed: {
    scale() {
      return Math.floor(this.$store.state.canvas.data.scale * 100)
    },
    lineName() {
      return this.$store.state.canvas.data.lineName
    },
    fromArrow() {
      return this.$store.state.canvas.data.fromArrow
    },
    toArrow() {
      return this.$store.state.canvas.data.toArrow
    },
    locked() {
      return this.$store.state.canvas.data.locked
    },
    lineWidth: {
      get: function() {
        return this.$store.state.canvas.data.lineWidth
      },
      set: function(newValue) {
        this.$store.commit('menu/emit', {
          name: 'state',
          data: {
            key: 'lineWidth',
            value: newValue
          }
        })
      }
    },
    autoAnchor() {
      return this.$store.state.canvas.data.autoAnchor
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
a {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.menus {
  height: 50px;
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fff;
  white-space: nowrap;

  .menu {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50px;
    color: #595959;
    flex-shrink: 0;
    font-size: 14px;
    padding: 0 16px;
  }
  .icon {
    height: 24px;
    line-height: 24px;
  }

  // .dropdown {
  //   position: absolute;
  //   display: inline-block;
  //   box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  //   z-index: 100;
  //   background-color: #fff;
  //   padding: 8px 0;
  //   left: 0;
  //   top: 100%;
  //   user-select: none;
  //   .item {
  //     display: none;
  //     line-height: 30px;
  //     min-width: 160px;
  //     padding: 0 15px;
  //     font-size: 13px;
  //     color: #595959;
  //     position: relative;
  //     .divider {
  //       width: calc(100% - 30px);
  //       height: 0.5px;
  //       background-color: #e5e5e5;
  //       margin: 5px 15px;
  //     }
  //   }
  // }
  // .menu:hover .item {
  //   display: block;
  // }
  // .item a:hover {
  //   background-color: #f1f1f1;
  // }

  .dropdown-content {
    position: absolute;
    display: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 100;
    background-color: #fff;
    padding: 8px 0;
    left: 0;
    top: 100%;
    user-select: none;
  }
  .menu:hover .dropdown-content {
    display: block;
  }
}
.icon-size {
  color: #314659;
  font-size: 30px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #595959;
}
// 409eff
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
