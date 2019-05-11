<template>
  <div>
    <div class="toastr" :class="[{show : isShown}, {hide: !isShown}, className, position]">
      <div class="title" v-if="title !== ''">{{ title }}</div>
      <div>{{ content }}</div>
    </div>
  </div>
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
      position: "bottom-center",
      title: "This is title"
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
        /* Reset to default */
        this.position = "bottom-center";
        this.title = "";
      } else if (typeof params === "object") {
        this.content = params.content || "";
        this.title = params.title || "";
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
  text-align: left; /* Left-align text */
  border-radius: 2px; /* Rounded borders */
  padding: 12px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
}

.title {
  font-weight: bold;
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
  background-color: #ffc20e;
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
</style>
