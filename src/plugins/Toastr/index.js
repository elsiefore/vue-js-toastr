import Toastr from './Toastr'

const Plugin = {
  install (Vue, options = {}) {
    /**
     * Makes sure that plugin can be installed only once
     */
    if (this.installed) {
      return
    }

    this.installed = true
    this.event = new Vue()
    this.rootInstance = null
    
    const componentName = options.componentName || 'Toastr'
    Vue.component(componentName, Toastr)

    Vue.prototype.$toastr = {
      success(params) {
        Plugin.event.$emit('show', 'success', params)
      },
      info(params) {
        Plugin.event.$emit('show', 'info', params)
      },
      warning(params) {
        Plugin.event.$emit('show', 'warning', params)
      },
      error(params) {
        Plugin.event.$emit('show', 'error', params)
      },
      show(params) {
        Plugin.event.$emit('show', '', params)
      }
    }
  }
}

export default Plugin