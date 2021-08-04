<template>
  <div class="tools">
    <div v-for="(group, index) in tools" :key="index">
      <div>{{ group.name }}</div>
      <ul class="flex wrap">
        <li class="hover" v-for="(item, i) in group.list" :key="i" :title="item.name" draggable="true" @dragstart="onDrag($event, item)" @click="onTouchstart(item)">
          <i :class="`icon-size ${item.icon}`"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Tools } from '../services/canvas'

export default {
  name: 'Tools',
  data() {
    return {
      tools: Tools
    }
  },
  methods: {
    onDrag(event, node) {
      event.dataTransfer.setData('Topology', JSON.stringify(node.data))
    },
    onTouchstart(node) {
      window.topology.touchedNode = node.data
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

li {
  list-style: none;
  margin: 2px;
  // font-weight: 600;
  width: 40px;
  height: 36px;
  font-size: 35px;
  .icon-size {
    font-size: 25px;
  }
}
</style>
