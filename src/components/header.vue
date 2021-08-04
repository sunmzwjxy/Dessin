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
        <a class="menu">
          <div class="icon">
            <i class="t-icon t-folder"></i>
            <i class="abs t-icon t-triangle-down"></i>
          </div>
          <div>文件</div>
          <div class="dropdown">
            <div class="item">
              <a @click="onMenu('New')"> 新建文件 <span>Ctrl+N</span></a>
            </div>
            <div class="item">
              <a @click="onMenu('Open')"> 打开文件 <span>Ctrl+O</span></a>
            </div>
            <div class="item">
              <a @click="onMenu('Load')"> 导入文件 <span>Ctrl+L</span></a>
            </div>
            <div class="item" style="width: 50px; height: 0.5px; background-color: #e5e5e5; margin: 5px 10px;"></div>
            <div class="item">
              <a @click="onMenu('Save')"> 保存 <span>Ctrl+S</span></a>
            </div>
            <div class="item">
              <a @click="onMenu('SaveJSON')"> 下载为JSON </a>
            </div>
            <div class="item">
              <a @click="onMenu('SavePNG')"> 下载为PNG </a>
            </div>
            <div class="item">
              <a @click="onMenu('SaveSVG')"> 下载为SVG </a>
            </div>
            <div class="item" style="width: 50px; height: 0.5px; background-color: #e5e5e5; margin: 5px 10px;"></div>
            <div class="item">
              <a @click="onMenu('exportHTML')"> 导出为HTML </a>
            </div>
          </div>
        </a>
        <a class="menu">
          <div class="icon">
            <i class="t-icon t-edit"></i>
            <i class="abs t-icon t-triangle-down"></i>
          </div>
          <div>编辑</div>
          <div class="dropdown">
            <div class="item">
              <a @click="onMenu('Undo')"> 撤消 <span>Ctrl+Z</span></a>
            </div>
            <div class="item">
              <a @click="onMenu('Redo')"> 恢复 <span>Ctrl+Shift+Z</span></a>
            </div>
            <div class="item" style="width: 50px; height: 0.5px; background-color: #e5e5e5; margin: 5px 10px;"></div>
            <div class="item">
              <a @click="onMenu('Cut')"> 剪切 <span>Ctrl+X</span></a>
            </div>
            <div class="item">
              <a @click="onMenu('Copy')"> 复制 <span>Ctrl+C</span></a>
            </div>
            <div class="item">
              <a @click="onMenu('Paste')"> 粘贴 <span>Ctrl+V</span></a>
            </div>
          </div>
        </a>
        <a class="menu"  @click="onMenu('Save')"><div class="icon">
            <i class="t-icon t-save"></i>
          </div>
          <div>保存</div>
        </a>
        <a class="menu"  @click="onMenu('Undo')"><div class="icon">
            <i class="t-icon t-reply"></i>
          </div>
          <div>撤销</div>
        </a>
      </div>
      <div style="display: flex;">
        <a class="menu" @click="onState('locked', !locked)">
          <!-- t-lock -->
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
            <span class="inline mr16" @click="onMenu('Scale', -0.1)"><i class="t-icon t-reduce"></i></span>
            <span class="inline mr16" @click="onMenu('Scale', 0.1)"><i class="t-icon t-add mr8"></i></span>
            <button class="button mr8" @click="onMenu('Fitview')">窗口大小</button>
            <button class="button" @click="onMenu('Reset')">重置</button>
          </div>
        </a>
        <a class="menu lines">
          <div class="icon"><i :class="`icon-size t-icon t-${lineName}`"></i></div>
          <div>连线</div>
          <div class="dropdown">
            <div v-for="(item, index) in lineNames" :key="index" class="item">
              <a @click="onState('lineName', item.value)">{{ item.name }}<i :class="`icon-size t-icon t-${item.value}`"></i></a>
            </div>
          </div>
        </a>
        <a class="top menu">
          <div class="icon">{{ lineWidth }}</div>
          <div>线宽</div>
          <div class="dropdown-content p8">
            <el-input-number v-model="num" @change="NumChange" :min="1" :max="10"></el-input-number>
          </div>
        </a>
        <a class="menu lines">
          <div class="icon"><i :class="`icon-size t-icon t-from-${fromArrow}`"></i></div>
          <div>起点箭头</div>
          <div class="dropdown">
            <div v-for="(item, index) in arrowTypes" :key="index" class="item">
              <a @click="onState('fromArrow', item)"><i :class="`icon-size t-icon t-from-${item}`"></i></a>
            </div>
          </div>
        </a>
        <a class="menu lines">
          <div class="icon"><i :class="`icon-size t-icon t-to-${toArrow}`"></i></div>
          <div>终始箭头</div>
          <div class="dropdown">
            <div v-for="(item, index) in arrowTypes" :key="index" class="item">
              <a @click="onState('toArrow', item)"><i :class="`icon-size t-icon t-to-${item}`"></i></a>
            </div>
          </div>
        </a>
        <a class="menu">
          <!-- t-miaodian -->
          <div class="icon"><i class="t-icon t-miaodianjiyong"></i></div>
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
        <a class="menu">
          <div class="icon">
            <i class="t-icon t-edit"></i>
            <i class="abs t-icon t-triangle-down"></i>
          </div>
          <div>帮助</div>
          <div class="dropdown">
            <div class="item">
              <a href=""> 许可与申明 </a>
            </div>
            <div class="item">
              <a href=""> 服务与合作 </a>
            </div>
            <div class="item" style="width: 50px; height: 0.5px; background-color: #e5e5e5; margin: 5px 10px;"></div>
            <div class="item">
              <a href=""> 关于我们 </a>
            </div>
          </div>
        </a>
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
export default {
  name: 'Header',
  data() {
    return {
      lineNames: [
        { name: '曲线', value: 'curve' },
        { name: '线段', value: 'polyline' },
        { name: '直线', value: 'line' },
        { name: '脑图曲线', value: 'mind' }
      ],
      arrowTypes: ['', 'triangleSolid', 'triangle', 'diamondSolid', 'diamond', 'circleSolid', 'circle', 'line', 'lineUp', 'lineDown'],
      num: 1
    }
  },
  methods: {
    onMenu(key, data = null) {
      this.$store.commit('menu/emit', { name: key, data: data })
    },
    onState(key, value) {
      this.$store.commit('menu/emit', {
        name: 'state',
        data: {
          key,
          value
        }
      })
    },
    NumChange() {},
    onStateT(key, value) {
      alert(key)
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
    lineWidth() {
      return this.$store.state.canvas.data.lineWidth
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

  .dropdown {
    position: absolute;
    display: inline-block;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 100;
    background-color: #fff;
    padding: 8px 0;
    left: 0;
    top: 100%;
    user-select: none;
    .item {
      display: none;
      line-height: 30px;
      min-width: 160px;
      padding: 0 15px;
      font-size: 13px;
      color: #595959;
      position: relative;
      .divider {
        width: calc(100% - 30px);
        height: 0.5px;
        background-color: #e5e5e5;
        margin: 5px 15px;
      }
    }
  }
  .menu:hover .item {
    display: block;
  }
  .item a:hover {
    background-color: #f1f1f1;
  }

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
</style>
