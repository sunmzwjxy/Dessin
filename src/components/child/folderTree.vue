<template>
  <div>
    <el-tree
      :highlight-current="true"
      class="filter-tree"
      :props="defaultProps"
      ref="tree"
      lazy
      :load="loadNode"
      node-key="id"
      @node-click="handleNodeClick"
      :expand-on-click-node="true"
      :render-content="renderContent"
    ></el-tree>
  </div>
</template>

<script>
// :default-expanded-keys="[0]"
export default {
  name: 'folderTree',
  data() {
    return {
      defaultProps: {
        id: 'id',
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      },
      isact: '', // 当前hover的节点
      curNode: undefined // 当前选中节点
    }
  },
  props: {
    // 当前树的类型：
    // mtype = false 图纸
    // mtype = true 组件
    mtype: {
      type: Boolean,
      require: true
    }
  },
  methods: {
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node" on-mouseenter={() => this.mouseenteract(data)} on-mouseleave={() => this.mouseleaveact(data)}>
          <span>{node.label}</span>
          {this.isact === data ? (
            <span>
              { this.renderButton(node, data) }
            </span>
          ) : (
            <span></span>
          )}
        </span>
      )
    },
    renderButton(node, data) {
      // root node
      if (node.level === 1) {
        return (
          <span>
            <el-tooltip content="Create new folder" placement="bottom" effect="light">
              <el-button type="text" icon="el-icon-document-add" on-click={e => this.handleNewFolder(node, data, e)}></el-button>
            </el-tooltip>
          </span>
        )
      } else if (node.level === 2) {
        // folder
        return (
          <span>
            <el-tooltip content="Create new component" placement="bottom" effect="light">
              <el-button
                type="text"
                icon="el-icon-document-add"
                on-click={e => {
                  this.mtype === true ? this.handleNewComponent(node, data, e) : this.handleNewDrawing(node, data, e)
                }}
              ></el-button>
            </el-tooltip>
            <el-tooltip content="Remove folder" placement="bottom" effect="light">
              <el-button type="text" icon="el-icon-delete" on-click={e => this.handleDeleteFolder(node, data, e)}></el-button>
            </el-tooltip>
          </span>
        )
      } else {
        // leaf
        return (
          <span>
            <el-tooltip content="Remove folder" placement="bottom" effect="light">
              <el-button type="text" icon="el-icon-delete" on-click={e => this.handleDeleteFile(node, data, e)}></el-button>
            </el-tooltip>
          </span>
        )
      }
    },
    async loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ id: 0, name: '新建文件夹', children: [] }])
      }

      if (node.level === 1) {
        // get folder list
        const res = await this.$store.dispatch('folder/folders', null)
        if (res.meta.status === 200) {
          return resolve(res.data)
        } else {
          this.$message({
            type: 'error',
            message: 'Get folder list failed!'
          })
        }
      }

      if (node.level === 2) {
        // get data list
        const res = await this.$store.dispatch('folder/dessin', { component: 1, folderId: node.key })
        if (res.meta.status === 200) {
          return resolve(res.data)
        } else {
          this.$message({
            type: 'error',
            message: 'Get folder list failed!'
          })
        }
      }

      return resolve([])
    },
    handleNodeClick(pdata) {
      console.log(pdata)
      this.curNode = pdata
    },
    handleNewComponent(node, data, e) {
      console.log('handleNewComponent')
      // 只是新建一个空的，没有文件名，也不保存
    },
    handleNewDrawing(node, data, e) {
      console.log('handleNewDrawing')
      // 只是新建一个空的，没有文件名，也不保存
    },
    handleNewFolder(node, data, e) {
      // const newChild = { id: id++, label: 'text', children: [] }
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
      // node.loaded = false
      // node.expand()
    },
    handleDeleteFolder(node, data, e) {
      console.log('handleDeleteFolder')
    },
    handleDeleteFile(node, data, e) {},
    mouseenteract(data) {
      this.isact = data
    },
    mouseleaveact(data) {
      this.isact = null
    }
  }
}
</script>

<style lang="scss">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
}
</style>
