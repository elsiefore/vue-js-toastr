<template>
  <div
    class="toastr"
    :class="[{show : isShown}, {hide: !isShown}, className, position]"
  >{{ content }}</div>
</template>

<script>
import Toastr from "./index";
import { setTimeout } from "timers";
export default {
  name: "Toastr",
  data() {
    return {
      isShown: false,
      className: "",
      content: "",
      duration: 3000,
      position: "bottom-center"
    };
  },
  beforeMount() {
    Toastr.event.$on("show", this.showToastr);
  },
  beforeDestroy() {
    Toastr.event.$off("show", this.showToastr);
  },
  methods: {
    showToastr(className, params) {
      this.className = className;
      if (typeof params === "string") {
        this.content = params;
        this.position = "bottom-center"; // reset to default
      } else if (typeof params === "object") {
        this.content = params.content || "";
        this.duration = params.duration || 3000;
        this.position = params.position || "bottom-center";
      }

      let self = this;
      this.isShown = true;
      setTimeout(() => {
        self.isShown = false;
      }, this.duration);
    }
  }
};
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
}

.toastr.bottom-center {
  left: 50%; /* Center the snackbar */
  bottom: 30px; /* 30px from the bottom */
}

.toastr.bottom-right {
  left: 90%; /* Center the snackbar */
  bottom: 30px; /* 30px from the bottom */
}

.toastr.bottom-left {
  left: 10%;
  bottom: 30px;
}

.toastr.show {
  visibility: visible;
  opacity: 1;
  -webkit-animation: fadein 0.5s;
  animation: fadein 0.5s;
}

.toastr.hide {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.5s linear, opacity 0.5s linear;
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
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
