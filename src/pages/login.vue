<template>
  <div class="container">

    <div class="login-box">
      <div class="title-text">登录</div>
      <el-form :model="ruleForm" status-icon :rules="rules" class="login-form">
        
        <el-form-item  prop="userName" class="form-item">
          <el-input v-model.number="ruleForm.userName" placeholder="用户名"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="form-item">
          <el-input type="password" v-model="ruleForm.password" placeholder="密码" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="checked">
          <el-checkbox v-model="ruleForm.checked">记住密码</el-checkbox>
        </el-form-item>

        <el-button class="submite-btn" type="primary" @click="handleSubmite">登录</el-button>

      </el-form>
    </div>
    
  </div>
</template>

<script>
export default {
  data () {
    var validateUserName = (rule, value, callback) => {
      if(value.length < 1 || value.length > 40) {
        if(value.length > 40) {
          this.ruleForm.userName = value.substring(0,20) + '...';
        }
        callback(new Error('用户名长度限制1-40个字符以内'));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value.length < 6 || value.length > 40) {
        callback(new Error('密码长度限制6-40个字符以内'));
      }
    };
    return {
      ruleForm: {
        userName: '',
        password: '',
        checked: true
      },

      rules: {
        userName: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        
      }
    };
  
  },

  methods: {

    hansleValidat (ruleForm) {
      if (ruleForm.userName.length < 1 || ruleForm.userName.length > 40 || ruleForm.password.length < 6 || ruleForm.password.length > 40) {
       
        if(ruleForm.userName.length > 40) {
          this.ruleForm.userName = ruleForm.userName.substring(0,20) + '...';
        }
        this.$message({
          message: "用户名或者密码错误，请检查！",
          type: "warning",
          duration: 1000
        });

        return false;
      }

      return true;
    },

    handleSubmite () {
      if (this.hansleValidat(this.ruleForm)) {

        if (this.ruleForm.checked) {

          localStorage.setItem("username", this.ruleForm.userName);
          localStorage.setItem("passWord", this.ruleForm.password);

          this.$router.replace({
            path: "/"
          });
        }
        
      }
    },

  },

  mounted () {
    if (localStorage.getItem("username")) {
      this.ruleForm.userName = localStorage.getItem("username");
      this.ruleForm.password = localStorage.getItem("passWord");
    }
  }

}
</script>

<style lang="less" scoped>
  .container {
    height: 100%;
    background: #409eff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-box {
    width: 6.111rem;
    // 330px
    height: 8.148rem;
    // 440px
    background: #fff;
    border-radius: 0.1296rem;

    .title-text {
      text-align: center;
      font-size: 0.37rem;
      line-height: 1.111rem;
      text-indent: 0.185rem;
      letter-spacing: 0.185rem;
    }

    .login-form {
      padding: 0 0.463rem 0.37rem;
      width: 5.185rem;
      // 280

      .submite-btn {
        width: 100%;
      }
    }
  }
</style>
