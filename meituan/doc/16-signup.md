# 使用手机注册

主要参考：https://docs.wilddog.com/auth/Web/guide/phone.html

### 开启服务

先到 https://meituandemo.wilddogio.com/.config/auth 的“身份认证”这一项，开启“电话登录”这种方式。

### 配置野狗

基于 create-react-app 来专门创建一个小项目做这部分的 demo

```
create-reat-app phone-auth
```

里面需要添加的代码


database.js


```js
const config = {
  authDomain: "meituandemo.wilddog.com"
}
```

App.js 如下：


```js
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.phone.value, this.password.value)
    wilddog.auth()
    .createUserWithPhoneAndPassword(this.phone.value, this.password.value)
    .then(function(user){
    	 // 获取用户
    	 console.log(user);
    }).catch(function (error) {
         // 错误处理
         console.log(error);
     });
    this.myForm.reset()
  }
  render() {
    return (
      <div className="app">
        <form ref={value => this.myForm = value}
          onSubmit={this.handleSubmit}>
          <input type="text" ref={value => this.phone = value} />
          <input type="text" ref={value => this.password = value} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
```


这样，如果注册成功，就可以到 https://meituandemo.wilddogio.com/.config/auth (需要先登录野狗才能看到)看到所有已经注册的电话号码。