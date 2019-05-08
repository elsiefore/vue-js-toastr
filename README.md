# vue-js-toastr
A simple vuejs plugin for displaying toastr

## Credits
- [vue-js-modal](https://github.com/euvl/vue-js-modal)
- [toastr.js](https://github.com/CodeSeven/toastr)
- [W3CSchools](https://www.w3schools.com/howto/howto_js_snackbar.asp)

## How to Use
  * Copy the __plugins/__ directory

  * Import in main.js
```javascript
import Toastr from './plugins/Toastr'

Vue.use(Toastr)
```
  * Add component and call to show
```javascript
<Toastr/>
this.$toastr.show("this is some content")
this.$toastr.success("this is some content")
this.$toastr.warning("this is some content")
this.$toastr.info("this is some content")
this.$toastr.error("this is some content")
```

## Current Progress
It is __just__ working. I guess there can't be any simpler a toastr than this one. I wrote it for self-taught purposes only, to know about plugins in vuejs and vuejs itself. </br>
I will slowly add functionalities to it, along my journey of vuejs.
