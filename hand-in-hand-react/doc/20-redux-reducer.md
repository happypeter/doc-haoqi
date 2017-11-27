# 创建与用户认证相关的 Redux Reducer

### 定义 root reducer

新建文件 `src/redux/rootReducer.js`，添加代码：

```
import { combineReducers } from 'redux';
import auth from './reducers/auth';

export default combineReducers({
  auth
});
```

[combineReducers](http://cn.redux.js.org/docs/api/combineReducers.html)

### 定义 auth reducer

新建文件 `src/redux/reducers/auth.js`，添加代码：

```
import isEmpty from 'lodash/fp/isEmpty';

const initialState = {
  isAuthenticated: false,
  currentUser: {}
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'AUTH_USER':
      return {
        isAuthenticated: !isEmpty(action.user),
        currentUser: action.user
      }
    default:
      return state
  }
}
```
