<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button @click="onClick">Test</el-button>
    <pre>{{result}}</pre>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      result: null
    }
  },
  methods: {
    async onClick() {
      const { data: res } = await this.$axios.get('users/1')
      if (res.meta.status === 200) {
        this.result = res.data
        this.$message({
          showClose: true,
          message: 'login success',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
