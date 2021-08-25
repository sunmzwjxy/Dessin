<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form label-width="0px" class="login_form" :model="loginform" :rules="loginformrules" ref="ruleForm">
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-people" v-model="loginform.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-lock" v-model="loginform.password" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="validateForm">Login</el-button>
          <el-button type="info" @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import md5 from 'crypto-js/md5'

export default {
  name: 'login',
  data() {
    return {
      // 登录表单的数据对象
      loginform: {
        username: 'Jimmy',
        password: '123456'
      },
      // 表单的验证规则对象
      loginformrules: {
        username: [
          {
            required: true,
            message: 'user name is not empty',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: 'user name long must be 3-10',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'password is not empty',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: 'password long must be 6-15',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    validateForm() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          const data = {
            username: this.loginform.username,
            // md5
            password: md5(this.loginform.password).toString()
          }
          const { data: res } = await this.$store.dispatch('login', data)
          // const { data: res } = await this.$axios.post('users/login', data)
          if (res.meta.status === 200) {
            this.$message({
              showClose: true,
              message: 'login success',
              type: 'success'
            })
            // route jump
            this.$router.push('/')
          } else {
            this.$message({
              showClose: true,
              message: 'login failed',
              type: 'error'
            })
          }
        } else {
          console.log('validate failed')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
