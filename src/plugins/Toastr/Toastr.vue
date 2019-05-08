<template>
    <div class="toastr" :class="[{show : isShown}, className]">
        {{ content }}
    </div>
</template>

<script>
import Toastr from './index'
import { setTimeout } from 'timers';
export default {
    name: "Toastr",
    data() {
        return {
            isShown: false,
            className: '',
            content: '',
            duration: 3000
        }
    },
    beforeMount() {
        Toastr.event.$on('show', this.showToastr)
    },
    beforeDestroy() {
        Toastr.event.$off('show', this.showToastr)
    },
    methods: {
        showToastr(className, params) {
            this.className = className;
            if ( typeof params === 'string') {
                this.content = params
            } else if ( typeof params === 'object') {
                this.content = param.content || "";
                this.duration = param.duration || 3000;
            }
            
            let self = this;
            this.isShown = true;
            setTimeout(() => {self.isShown = false}, this.duration)
        }
    }
}
</script>

<style scoped>
.toastr {
  visibility: hidden; /* Hidden by default. Visible on click */
  min-width: 250px; /* Set a default minimum width */
  margin-left: -125px; /* Divide value of min-width by 2 */
  background-color: #292b2c; /* Black background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  border-radius: 2px; /* Rounded borders */
  padding: 16px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
  left: 50%; /* Center the snackbar */
  bottom: 30px; /* 30px from the bottom */
}

.toastr.show {
  visibility: visible;
  /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
  However, delay the fade out process for 2.5 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

.toastr.success {
    background-color: #5cb85c;
}

.toastr.info {
    background-color: #5bc0de;
}

.toastr.warning {
    background-color: #f0ad4e;
}

.toastr.error {
    background-color: #d9534f;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}
</style>
