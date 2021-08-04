<template>
  <div class="page-body flex">
    <div class="tools">
      <work-tools />
    </div>
    <div class="body">
      <div id="topology"></div>
    </div>
    <div class="props">
      <a>dessin</a>
    </div>
  </div>
</template>

<script>
import { Topology } from '@topology/core'
import * as FileSaver from 'file-saver'
import { canvasRegister } from '../services/canvas'

import worktools from '@/components/tools'

export default {
  name: 'Home',
  data() {
    return {
      canvas: null,
      canvasOptions: {},
      props: {
        node: null,
        line: null,
        nodes: null,
        multi: false,
        // expand: false,
        locked: false
      },
      contextmenu: {
        left: null,
        top: null,
        bottom: null
      }
    }
  },
  components: {
    'work-tools': worktools
  },
  created() {
    canvasRegister()
  },
  mounted() {
    this.canvasOptions.on = this.onMessage
    this.canvas = new Topology('topology', this.canvasOptions)
  },
  watch: {
    // 监听$store.state.menu.data
    '$store.state.menu.data'(curData) {
      if (this['handle_' + curData.name]) {
        // call menu function
        this['handle_' + curData.name](curData.data)
      }
    }
  },
  methods: {
    onMessage(event, data) {
      setTimeout(() => {
        switch (event) {
          case 'node':
          case 'addNode':
            this.props = {
              node: data,
              line: null,
              nodes: null,
              multi: false,
              locked: data.locked
            }
            break
          case 'scale':
          case 'resize':
          case 'locked':
            this.commitState()
            break
        }
      }, 0)
    },
    // New canvas
    handle_New(data) {
      this.canvas.open()
    },
    // open native data
    handle_Open(data) {
      this.handle_Load(data)
    },
    // open native data
    handle_Load(data) {
      const input = document.createElement('input')
      input.type = 'file'
      input.onchange = event => {
        const elem = event.target
        if (elem.files && elem.files[0]) {
          const reader = new FileReader()
          reader.onload = e => {
            const text = e.target.result + ''
            try {
              const data = JSON.parse(text)
              this.canvas.open(data)
            } catch (e) {
              return false
            }
          }
          reader.readAsText(elem.files[0])
        }
      }
      input.click()
    },
    // save json to database
    handle_Save(data) {
      this.$notify.error({
        title: '错误',
        message: '此功能还未实现！'
      })
    },
    // save json to native
    handle_SaveJSON(data) {
      FileSaver.saveAs(
        new Blob([JSON.stringify(this.canvas.data)], {
          type: 'text/plain;charset=utf-8'
        }),
        'dessin.json'
      )
    },
    handle_SavePNG(data) {
      this.canvas.saveAsImage('dessin.png')
    },
    handle_SaveSVG(data) {
      this.$notify.error({
        title: '错误',
        message: '此功能还未实现！'
      })
    },
    handle_exportHTML(data) {
      this.$notify.error({
        title: '错误',
        message: '此功能还未实现！'
      })
    },
    handle_Undo(data) {
      this.canvas.undo()
    },
    handle_Redo(data) {
      this.canvas.redo()
    },
    handle_Cut(data) {
      this.canvas.cut()
    },
    handle_Copy(data) {
      this.canvas.copy()
    },
    handle_Paste(data) {
      this.canvas.parse()
    },
    handle_state(data) {
      this.canvas.data[data.key] = data.value
      this.commitState()
    },
    handle_Reset(data) {
      this.canvas.scaleTo(1)
    },
    handle_Scale(data) {
      this.canvas.scaleTo(this.canvas.data.scale + data)
      this.$store.commit('canvas/data', {
        scale: this.canvas.data.scale || 1
      })
    },
    handle_Fitview(data) {
      this.canvas.fitView()
    },
    commitState() {
      // lineWidth有问题
      if (this.canvas && this.canvas.data) {
        // lineWidth有问题,初始化lineWidth未定义
        if (this.canvas.data.lineWidth) {
          this.$store.commit('canvas/data', {
            scale: this.canvas.data.scale || 1,
            lineName: this.canvas.data.lineName,
            lineWidth: this.canvas.data.lineWidth,
            fromArrow: this.canvas.data.fromArrow,
            toArrow: this.canvas.data.toArrow,
            locked: this.canvas.data.locked
          })
        } else {
          this.$store.commit('canvas/data', {
            scale: this.canvas.data.scale || 1,
            lineName: this.canvas.data.lineName,
            lineWidth: 1,
            fromArrow: this.canvas.data.fromArrow,
            toArrow: this.canvas.data.toArrow,
            locked: this.canvas.data.locked
          })
        }
      }
    }
  },
  destroyed() {
    this.canvas.destroy()
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page-body {
  height: calc(100vh - 51px);

  & > * {
    flex-shrink: 0;
    height: 100%;
    overflow-y: auto;
  }

  & > .tools {
    width: 240px;
    border-right: 1px solid $color-border;
  }

  & > .body {
    flex-grow: 1;
  }

  & > .props {
    width: 240px;
    border-left: 1px solid $color-border;
  }
}

#topology {
  height: 100%;
}
</style>
