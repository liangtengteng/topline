<template>
  <div class="login-container">
      <div class="login-box">
          <!-- 绘制登录form表单 -->
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
              <img src="./logo_index.png" alt="">
        <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder='请输入验证码'></el-input>
        </el-form-item>
        <el-form-item prop="code">
            <el-input v-model="loginForm.code" placeholder='请输入验证码'></el-input>
        </el-form-item>
        <el-form-item style="text-align:left" prop="xieyi">
            <!-- 复选框 -->
            <el-checkbox v-model="loginForm.xieyi" style="margin-right:10px;"></el-checkbox>
            <span>我已阅读并同意<a href="#">用户协议</a><a href="#">隐私条款</a></span>
        </el-form-item>
        <el-form-item>
            <!-- 登录按钮 -->
           <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
        </el-form-item>

          </el-form>
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  // 给from表单域制作校验规则
  data () {
    // 自定义校验函数，验证协议
    var xieyiText = function (rule, value, callback) {
      // rule:校验规则，一般不使用
      // value：当前被校验的信息
      // callback：回调函数，校验成功或失败都需要执行
      if (value) {
        callback()
      } else {
        return callback(new Error('请无条件遵守规则'))
      }
    }
    return {
      loginForm: {
        mobile: '', // 手机号码
        code: '', // 校验码
        xieyi: true// 协议复选框
      },
      loginFormRules: {
        mobile: [
          { required: true, message: '手机号码必填' },
          { pattern: /^1[35789]\d{9}$/, message: '手机号码格式不正确' }
        ],
        code: [
          { required: true, message: '验证码必填' }
        ],
        xieyi: [
          {
            validator: xieyiText
          }
        ]
      }
    }
  },
  methods: {
    // 登录系统
    login () {
      // 表单要做校验 登录按钮做校验
      // el-from表单对象.validate()
      // console.log(this)
      // this.$refs.loginFormRef//获得el-form的组件对象
      // this.$refs.loginFormRef.validate(回调函数)
      this.$refs.loginFormRef.validate(valid => {
        // valid:true 校验通过
        // valid:false 校验失败
        // 校验失败，代码停止
        if (!valid) {
          return false
        }
        // 服务器账号真实校验
        let pro = this.$http({
          url: 'mp/v1_0/authorizations',
          method: 'post',
          data: this.loginForm
        })
        pro
          .then(result => {
            // 客户端浏览器把服务端返回的密钥等相关信息通过sessionStorage做记录，表名是登录状态
            window.sessionStorage.setItem('userinfo', JSON.stringify(result.data.data))
            // console.log(result)
            // 进入后台系统
            // 路由编程式导航
            // name属性实现编程式导航
            this.$router.push({ name: 'home' })
          })
          .catch(err => {
            // 通过弹出框把错误显示出来
            // console.log('手机号码或验证码错误：' + err)
            this.$message.error('手机号码或验证码错误：' + err)
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
    height: 100%;
    background-image: url('./login_bg.jpg');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-box{
        width: 410px;
        height: 340px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        .el-form{
            width: 75%;
         img{
            width: 50%;
            margin: 20px auto;
        }
        }
    }

}
</style>
