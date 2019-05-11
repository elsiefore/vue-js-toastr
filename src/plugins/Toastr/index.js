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
    const position = options.position || 'bottom-left'
    const newest_on_top = options.newest_on_top || false;
    Vue.component(componentName, Toastr)

    Vue.prototype.$toastr = {
      success(params) {
        Plugin.event.$emit('show', 'success', position, newest_on_top, params)
      },
      info(params) {
        Plugin.event.$emit('show', 'info', position, newest_on_top, params)
      },
      warning(params) {
        Plugin.event.$emit('show', 'warning', position, newest_on_top, params)
      },
      error(params) {
        Plugin.event.$emit('show', 'error', position, newest_on_top, params)
      },
      show(params) {
        Plugin.event.$emit('show', '', position, newest_on_top, params)
      }
    }
  }
}

export default Plugin