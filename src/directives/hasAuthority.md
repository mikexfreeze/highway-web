# 元素级权限指令
#### 使用方法
``` html
<input v-authority="'ROLE_USER'" type="text">
```
或
``` html
<input v-authority="['ROLE_USER']" type="text">
```

接受参数字符串或数组，如果该用户具有该权限则可以访问此元素。