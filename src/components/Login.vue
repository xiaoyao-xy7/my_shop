<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../assets/1.png" alt />
      </div>
      <!-- 登录表单区 -->
      <el-form
        ref="loginFormRef"
        :rules="loginFormRules"
        :model="loginForm"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginByUser } from '@/services/login'
import store from '../store'
export default {
  data() {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456"
      },
      //  表单的验证规则对象
      loginFormRules: {
        // 验证用户名
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      // 登录前表单预验证
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid);
        if (!valid) return;
        // 返回值为Promise时，简化操作用 await async
        // const { data: res } = await this.$http.post("login", this.loginForm);
        // if (res.meta.status !== 200) return this.$message.error("登录失败");
        // this.$message.success("登录成功");
        loginByUser(this.loginForm).then(res => {
          if (res.data.meta.status !== 200) return this.$message.error("登录失败");
          this.$message.success("登录成功");
          console.log(res)
          // 将登录成功后的token，保存到客户端的sessionStorage中
          window.sessionStorage.setItem("token", res.data.data.token);
          this.$router.push({
            path: "/home",
            query: {
              username: this.loginForm.username
            }
          });
        })
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: rgba(0, 0, 0, 0.3);
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
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
