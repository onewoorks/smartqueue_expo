# smart queue prototype
mobile application using react native (expo), tested only on IOS device.

![](http://onewoorks-solutions.com/github_images/smartq_1.png | width=300)
![](http://onewoorks-solutions.com/github_images/smartq_2.png | width=300)
![](http://onewoorks-solutions.com/github_images/smartq_3.png | width=300)
![](http://onewoorks-solutions.com/github_images/smartq_4.png | width=300)

## how to use this application
1. you need to deploy a restful application from *https://github.com/onewoorks/smartq*  as reference
2. install *expo cli* please google expo cli for further information
3. git clone this repository to your local drive
4. cd *smartqueue_expo*
5. npm install
6. some installed module need to be changed since the original developer not maintaining the code anymore.
7. vim node_modules/react-native-simple-onboarding/index.js
*line 1: import React, { Component, PropTypes } from 'react';*
*(remove PropTypes at line 1)*
add *import PropTypes from 'prop-types'*

```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'
```
8. run *expo start"

