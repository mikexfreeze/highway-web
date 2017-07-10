<template>
  <div class="login-container">
    <img class="sysLogo" src="../../assets/logo.png" alt="">
    <!-- <h4 class="systemTitle" style="">联蔚DMCS微服务开发框架</h4> -->
    <p class="qyInfo">©2017 上海联蔚信息科技有限公司 版权所有</p>
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
             label-width="0px"
             class="card-box login-form">
      <!-- <div class="rightBg"></div> -->
      <div class="rightFroms">
        <h3 class="title">联蔚DMCS微服务开发框架</h3>
        <p class="enTitle">Connext Micro-service Framework</p>
      <el-form-item prop="email">

        <span class="svg-container"><i class="iconfont icon-touxiang"></i>
          <!--<wscn-icon-svg icon-class="jiedianyoujian"/>-->
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container"><wscn-icon-svg icon-class="mima"/></span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  autoComplete="on" placeholder="密码"></el-input>
      </el-form-item>
      <div class="pwdEdit">
        <router-link to="/sendpwd" class="forget-pwd">
          忘记密码?
        </router-link>
      </div>
      
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      

      <div class='tips'>admin账号：admin&nbsp;&nbsp;&nbsp;密码：admin</div>
      <div class='tips'>user账号：user&nbsp;&nbsp;&nbsp;密码：123456</div>
      
      </div>
      <el-form-item class="newUserReg">
        <router-link to="/register">
          <el-button type="primary" style="width:100%;">
            新用户注册
          </el-button>
        </router-link>

      </el-form-item>
    </el-form>
    <el-dialog title="第三方验证" :visible.sync="showDialog">
      邮箱登录成功,请选择第三方验证
      <socialSign></socialSign>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {isWscnEmail} from 'utils/validate';
  // import { getQueryObject } from 'utils';
  import socialSign from './socialsignin';
  import axios from 'axios';

  export default {
    components: {socialSign},
    name: 'login',
    data() {
      const validateEmail = (rule, value, callback) => {
        if (!isWscnEmail(value)) {
          callback(new Error('请输入正确的合法邮箱'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: 'admin',
          password: ''
        },
        loginRules: {
          username: [
            {required: true, trigger: 'blur'}
          ],
          password: [
            {required: true, trigger: 'blur', validator: validatePass}
          ]
        },
        loading: false,
        showDialog: false
      }
    },
    computed: {
      ...mapGetters([
        'auth_type'
      ])
    },
    methods: {
      handleLogin() {
//        this.$refs.loginForm.validate(valid => {
//          if (valid) {
            this.loading = true;
            this.$store.dispatch('LoginByEmail', this.loginForm).then(
                () => {
                  this.loading = false;
                  this.$router.push({path: '/'});
                  // this.showDialog = true;
                }
              ).catch(err => {
              this.$message.error(err);
              this.loading = false;
            });
//          } else {
//            console.log('error submit!!');
//            return false;
//          }
//        });
      },
      afterQRScan() {
        // const hash = window.location.hash.slice(1);
        // const hashObj = getQueryObject(hash);
        // const originUrl = window.location.origin;
        // history.replaceState({}, '', originUrl);
        // const codeMap = {
        //   wechat: 'code',
        //   tencent: 'code'
        // };
        // const codeName = hashObj[codeMap[this.auth_type]];
        // if (!codeName) {
        //   alert('第三方登录失败');
        // } else {
        //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
        //     this.$router.push({ path: '/' });
        //   });
        // }
      }
    },
    created() {
      // window.addEventListener('hashchange', this.afterQRScan);
    },
    destroyed() {
      // window.removeEventListener('hashchange', this.afterQRScan);
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/assets/styles/mixin.scss";
  body{
    overflow-x:hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
    margin-top: 15px;
  }

  .login-container {
    @include relative;
    background:url('../../assets/login_bg.png');
    background-repeat:no-repeat;
    background-position: left center;
    
    background-size:cover;
    position:absolute;
    top:50px;bottom:50px;
    height:auto;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
      -webkit-text-fill-color: #333 !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 40px;
    }
    .el-input {
      display: inline-block;
      height: 40px;
      width: 85%;
    }
    .svg-container {
      padding: 6px 5px 6px 10px;
      color: #20a1ff;
    }

    .title {
      
      font-size: 18px;
      color: #eeeeee;
      
      margin: 0px auto 5px auto;
      text-align: center;
      font-weight: bold;
    }
    .enTitle{
      font-size:14px;margin-top:0;margin-bottom:20px;color:#fff;
          font-family: Arial;
    }
    .login-form {
      position: absolute;
      top: 0;
      bottom:0;
      right: -90px;
      width: 500px;
      background-color:#587eac;
      padding: 15px 0 15px 0px;
      text-align:center;
      overflow:hidden;
      z-index:10;
      transform: skew(-10deg);
    }

    .el-form-item {
      background: #fff;
      border-radius: 8px;
      color: #454545;
    }

    .forget-pwd {
      color: #fff;
    }
    .rightBg{
      position: absolute;
      top:0;
      bottom:0;
      background-color:#587eac;
      width:180px;
      left: -80px;
      transform: skew(-10deg);
      z-index:5;
    }
    .rightFroms{
      position:absolute;
      z-index:9;
      width:55%;
      top:20%;
      bottom:20%;
      left:100px;
      transform: skew(10deg);
    }
    .el-form-item__content{
      border-radius:8px;
      overflow:hidden;
    }
    .newUserReg{
      position:absolute;
      left:-5px;
      border-radius:0;
      width:160px;
      
      bottom:10px;
      background-color:#20a1ff;
      transform: skew(10deg);
    }
    .pwdEdit{
      font-size: 14px;
      text-align: right;
      margin-bottom: 28px;
      margin-top: -10px;
    }
    .qyInfo{
      text-align: center;
      color: #666;
      position: absolute;
      width: 100%;
      bottom: -48px;
      font-size: 14px;
    }
    .systemTitle{
      position:absolute;margin:0;top:-33px;left:260px;color:#194984
    }
    .sysLogo{
          height: 50px;
          position: absolute;
          top: -50px;
          left: 80px;
    }
  }

</style>
