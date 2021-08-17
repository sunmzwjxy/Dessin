<template>
  <div class="page-body flex">
    <div class="tools">
      <worktools />
    </div>
    <div class="body">
      <div id="topology"></div>
    </div>
    <div class="props">
      <component :is="componentName"></component>
    </div>
  </div>
</template>

<script>
import { Topology, Node, Line } from '@topology/core'

import * as FileSaver from 'file-saver'
import { canvasRegister } from '../services/canvas'

import worktools from '@/components/tools'
import filePanel from '@/components/filePanel'
import nodePanel from '@/components/nodePanel'
import linePanel from '@/components/linePanel'
import uploadPic from '@/components/uploadPic'

import C2S from '../services/canvas2svg'

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
        locked: false
      },
      contextmenu: {
        left: null,
        top: null,
        bottom: null
      },
      componentName: 'filePanel'
    }
  },
  components: {
    worktools: worktools,
    filePanel: filePanel,
    nodePanel: nodePanel,
    uploadPic: uploadPic,
    linePanel: linePanel
  },
  created() {
    canvasRegister()
  },
  mounted() {
    this.canvasOptions.on = this.onMessage
    this.canvas = new Topology('topology', this.canvasOptions)
  },
  watch: {
    // monitor $store.state.menu.data
    '$store.state.menu.data'(curData) {
      if (this['handle_' + curData.name]) {
        // call menu function
        this['handle_' + curData.name](curData.data)
      }
    }
    // deep monitor $store.state.canvas.filePops.canvasfile
    // '$store.state.canvas.filePops': {
    //   deep: true,
    //   handler(curData) {
    //     console.log(curData)
    //   }
    // }
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
            this.$store.commit('node/setNode', data)
            this.componentName = 'nodePanel'
            break
          case 'line':
          case 'addLine':
            this.componentName = 'linePanel'
            break
          case 'scale':
          case 'locked':
            this.$store.commit(`canvas/${event}`, this.canvas.data[event])
            break
          case 'space':
            this.componentName = 'filePanel'
            break
          case 'opened':
            // update file panel after opened
            this.$store.commit('canvas/init', this.canvas.data)
            break
          default:
            break
        }
      }, 0)
    },
    // New canvas
    handle_New(data) {
      this.canvas.open()
      this.$store.commit('canvas/init', this.canvas.data)
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
        title: 'Error',
        message: 'This functional is not implemented!'
      })
    },
    // save json to native
    handle_SaveJSON(data) {
      FileSaver.saveAs(
        new Blob([JSON.stringify(this.canvas.data)], {
          type: 'text/plain;charset=utf-8'
        }),
        // need to update file name
        'dessin.json'
      )
    },
    handle_SavePNG(data) {
      // need to update file name
      this.canvas.saveAsImage('dessin.png')
    },
    handle_SaveSVG(data) {
      const ctx = new C2S(this.canvas.canvas.width + 200, this.canvas.canvas.height + 200)
      for (const item of this.canvas.data.pens) {
        let pen = null
        if (item.type) {
          pen = new Line(item)
        } else {
          pen = new Node(item)
          pen.animateFrames = []
        }
        pen.render(ctx)
      }
      const mySerializedSVG = ctx.getSerializedSvg()
      const urlObject = window.URL || window
      const exportblob = new Blob([mySerializedSVG])
      const url = urlObject.createObjectURL(exportblob)
      const a = document.createElement('a')
      // need to update file name
      a.setAttribute('download', 'Dessin.svg')
      a.setAttribute('href', url)
      const evt = document.createEvent('MouseEvents')
      evt.initEvent('click', true, true)
      a.dispatchEvent(evt)
    },
    handle_exportHTML(data) {
      this.$notify.error({
        title: 'Error',
        message: 'This functional is not implemented!'
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
      this.canvas.paste()
    },
    // update header state
    handle_state(data) {
      switch (data.key) {
        case 'autoAnchor':
          this.canvas.options.autoAnchor = data.value
          this.$store.commit(`canvas/${data.key}`, data.value)
          break
        case 'scale':
          this.canvas.scaleTo(this.canvas.data.scale + data.value)
          break
        case 'reset':
          this.canvas.scaleTo(data.value)
          break
        case 'fitview':
          this.canvas.fitView()
          break
        default:
          // locked lineName fromArrow toArrow lineWidth
          this.canvas.data[data.key] = data.value
          this.$store.commit(`canvas/${data.key}`, data.value)
      }
    },
    // update file Panel Props
    handle_filePanel(data) {
      this.canvas.data[data.key] = data.value
      this.$store.commit('canvas/canvasfile', data)
      this.canvas.willRender()
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
    height: 100%;
    border-left: 1px solid $color-border;
    position: relative;
    overflow: hidden;
  }
}

#topology {
  height: 100%;
}
</style>
