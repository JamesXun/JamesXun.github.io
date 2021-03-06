'use strict';

var app = new Vue({
  el: '.vue',
  data: {
    userName: '',
    password: '',
    userNameState: false,
    passwordState: false
  },
  watch: {
    userName: function userName(curVal, oldVal) {
      console.log(curVal);
      this.userNameState = curVal.length > 0 ? true : false;
    },
    password: function password(curVal, oldVal) {
      console.log(curVal);
      this.passwordState = curVal.length > 0 ? true : false;
    }
  },
  methods: {
    init: function init() {},

    cacheUserInfo: function cacheUserInfo(userName) {
      localStorage.userId = userName;
    },

    login: function login() {
      var that = this;
      if (this.userNameState && this.passwordState) {
        $.ajax({ //获取我的车辆
          type: 'POST',
          DataType: 'json',
          timeout: common().timeout,
          url: common().ROOT() + '/pjwxjk/mian.aspx',
          data: {
            password: '7935hjh',
            ffm: 'user_login',
            yhm: that.userName,
            mm: that.password
          },
          success: function success(data) {
            var data = JSON.parse(data)[0];
            console.log(data);

            if (data.jg === "OK") {
              that.cacheUserInfo(data.xm);
              location.href = common().ROOT() + '/APP/myCar.html';
            }
          }
        });
      }
    }
  }
});
app.init();