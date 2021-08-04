<template>
  <div class="page">
    <div class="tools">
      <div class="temp" v-for="(item, index) in tools" :key="index">
        <div class="title">{{ item.name }}</div>
        <div class="buttons">
          <a v-for="(btn, i) in item.list" :key="i" :title="btn.name" :draggable="btn.data" @dragstart="onDrag($event, btn)" @click="onTouch(btn)">
            <i :class="`icon-size ${btn.icon}`"></i>
          </a>
        </div>
      </div>
    </div>
    <div id="topology-canvas" class="full"></div>
    <div class="props" :style="props.expand ? 'overflow: visible' : ''">
      <a>dessin</a>
      <!-- <CanvasProps :props.sync="props" @change="onUpdateProps"></CanvasProps> -->
    </div>
  </div>
</template>

<script>
import { Topology } from '@topology/core'
import * as FileSaver from 'file-saver'

import { Tools, canvasRegister } from '../services/canvas'

export default {
  data() {
    return {
      canvas: null,
      // canvasOptions: { rotateCursor: '../assets/img/rotate.cur' },
      canvasOptions: {},
      tools: Tools,
      props: {
        node: null,
        line: null,
        nodes: null,
        multi: false,
        expand: false,
        locked: false
      },
      contextmenu: {
        left: null,
        top: null,
        bottom: null
      }
    }
  },
  computed: {},
  watch: {
    // 监听$store.state.menu.data
    '$store.state.menu.data'(curData) {
      if (this['handle_' + curData.name]) {
        // call menu function
        this['handle_' + curData.name](curData.data)
      }
    }
  },
  components: {},
  created() {
    canvasRegister()
  },
  mounted() {
    this.canvasOptions.on = this.onMessage
    this.canvas = new Topology('topology-canvas', this.canvasOptions)
    // this.canvas.canvasPos = this.canvas.divLayer.canvas.getBoundingClientRect()
    this.handle_open(null)
  },
  methods: {
    onDrag(event, node) {
      event.dataTransfer.setData('Topology', JSON.stringify(node.data))
    },

    onTouch(node) {
      this.canvas.touchedNode = node.data
    },

    onMessage(event, data) {
      console.log('onMessage', event, data)
      // 右侧输入框编辑状态时点击编辑区域其他元素，onMessage执行后才执行onUpdateProps方法，通过setTimeout让onUpdateProps先执行
      setTimeout(() => {
        switch (event) {
          case 'node':
          case 'addNode':
            this.props = {
              node: data,
              line: null,
              multi: false,
              expand: this.props.expand,
              nodes: null,
              locked: data.locked
            }
            break
          case 'line':
          case 'addLine':
            this.props = {
              node: null,
              line: data,
              multi: false,
              nodes: null,
              locked: data.locked
            }
            break
          case 'multi':
            this.props = {
              node: null,
              line: null,
              multi: true,
              nodes: data.length > 1 ? data : null,
              locked: this.getLocked({ nodes: data })
            }
            break
          case 'space':
            this.props = {
              node: null,
              line: null,
              multi: false,
              nodes: null,
              locked: false
            }
            break
          case 'moveOut':
            break
          case 'moveNodes':
          case 'resizeNodes':
            if (data.length > 1) {
              this.props = {
                node: null,
                line: null,
                multi: true,
                nodes: data,
                locked: this.getLocked({ nodes: data })
              }
            } else {
              this.props = {
                node: data[0],
                line: null,
                multi: false,
                nodes: null,
                locked: false
              }
            }
            break
          case 'resize':
          case 'scale':
          case 'locked':
            if (this.canvas && this.canvas.data) {
              this.$store.commit('canvas/data', {
                scale: this.canvas.data.scale || 1,
                lineName: this.canvas.data.lineName,
                fromArrow: this.canvas.data.fromArrow,
                toArrow: this.canvas.data.toArrow,
                locked: this.canvas.data.locked
              })
            }
            break
        }
      }, 0)
    },

    getLocked(data) {
      let locked = true
      if (data.nodes && data.nodes.length) {
        for (const item of data.nodes) {
          if (!item.locked) {
            locked = false
            break
          }
        }
      }
      if (locked && data.lines) {
        for (const item of data.lines) {
          if (!item.locked) {
            locked = false
            break
          }
        }
      }

      return locked
    },

    onUpdateProps(node) {
      // 如果是node属性改变，需要传入node，重新计算node相关属性值
      // 如果是line属性改变，无需传参
      this.canvas.updateProps(node)
    },
    handle_new(data) {
      this.canvas.open()
    },

    handle_open(data) {
      console.log('handle_open')
      this.handle_replace(data)
    },

    handle_replace(data) {
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

    handle_save(data) {
      FileSaver.saveAs(
        new Blob([JSON.stringify(this.canvas.data)], {
          type: 'text/plain;charset=utf-8'
        }),
        'dessin.json'
      )
    },

    handle_savePng(data) {
      this.canvas.saveAsImage('dessin.png')
    },

    handle_saveSvg(data) {
      this.$notify.error({
        title: '错误',
        message: '此功能还未实现！'
      })
    },

    handle_undo(data) {
      this.canvas.undo()
    },

    handle_redo(data) {
      this.canvas.redo()
    },

    handle_copy(data) {
      this.canvas.copy()
    },

    handle_cut(data) {
      this.canvas.cut()
    },

    handle_parse(data) {
      this.canvas.parse()
    },

    handle_state(data) {
      this.canvas.data[data.key] = data.value
      this.$store.commit('canvas/data', {
        scale: this.canvas.data.scale || 1,
        lineName: this.canvas.data.lineName,
        fromArrow: this.canvas.data.fromArrow,
        toArrow: this.canvas.data.toArrow,
        locked: this.canvas.data.locked
      })
    },

    onContextMenu(event) {
      event.preventDefault()
      event.stopPropagation()

      if (event.clientY + 360 < document.body.clientHeight) {
        this.contextmenu = {
          left: event.clientX + 'px',
          top: event.clientY + 'px'
        }
      } else {
        this.contextmenu = {
          left: event.clientX + 'px',
          bottom: document.body.clientHeight - event.clientY + 'px'
        }
      }
    }
  },
  destroyed() {
    this.canvas.destroy()
  }
}
</script>

<style lang="scss">
.page {
  display: flex;
  width: 100%;
  height: 100%;

  .tools {
    flex-shrink: 0;
    width: 1.99rem;
    background-color: #f8f8f8;
    border-right: 1px solid #d9d9d9;
    overflow-y: auto;
    padding: 12px;

    .temp {
      width: 1.69rem;
      .title {
        color: #0d1a26;
        font-weight: 600;
        font-size: 0.12rem;
        line-height: 1;
        padding: 0.05rem 0.1rem;
        margin-top: 0.08rem;
        border-bottom: 1px solid #ddd;

        &:first-child {
          border-top: none;
        }
      }

      .buttons {
        padding: 0.1rem 0;
        display: flex;
        flex-wrap: wrap;
        a {
          display: inline-block;
          color: #314659;
          line-height: 1;
          width: 0.4rem;
          height: 0.4rem;
          text-align: center;
          text-decoration: none !important;
          cursor: pointer;

          .icon-size {
            font-size: 0.24rem;
          }

          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }

  .full {
    flex: 1;
    width: initial;
    position: relative;
    overflow: auto;
    background: #fff;
  }

  .props {
    flex-shrink: 0;
    width: 2.4rem;
    padding: 0.1rem 0;
    background-color: #f8f8f8;
    border-left: 1px solid #d9d9d9;
    overflow-y: auto;
    position: relative;
  }

  .context-menu {
    position: fixed;
    z-index: 10;
  }
}
</style>
