<template>
  <div class="toastr-container" :class="[position]">
    <div
      v-for="element in toastrs"
      :key="element.id"
      class="toastr"
      :class="[{show : element.isShown}, {hide: !element.isShown}, element.className]"
    >
      <div class="title" v-if="element.title !== ''">{{ element.title }}</div>
      <div>{{ element.content }}</div>
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
      toastrs: [],
      position: "bottom-left"
    };
  },
  computed: {
    shownCount: function() {
      return this.toastrs.filter(toastr => toastr.isShown === true).length;
    }
  },
  watch: {
    shownCount(val) {
      if (val === 0) this.toastrs = [];
    }
  },
  beforeMount() {
    Toastr.event.$on("show", this.showToastr);
  },
  beforeDestroy() {
    Toastr.event.$off("show", this.showToastr);
  },
  methods: {
    showToastr(className, position, newest_on_top, params) {
      this.position = position;
      let newToastr = {
        className: className,
        isShown: true
      };

      if (typeof params === "string") {
        newToastr.content = params;
        /* Reset to default */
        newToastr.title = "";
        newToastr.duration = 3000;
      } else if (typeof params === "object") {
        /* Get user options */
        newToastr.content = params.content || "";
        newToastr.title = params.title || "";
        newToastr.duration = params.duration || 3000;
      }
      newToastr.content = this.shownCount;
      let index = this.toastrs.push(newToastr) - 1;
      let self = this;
      setTimeout(() => {
        self.toastrs[index].isShown = false;
      }, this.toastrs[index].duration);
    }
  }
};
</script>

<style scoped>
.toastr-container {
  position: fixed;
}

.toastr-container.bottom-left {
  bottom: 6px;
  left: 12px;
}

.toastr-container.bottom-center {
  bottom: 6px;
  left: 50%;
  margin-left: -125px;
}

.toastr-container.bottom-right {
  bottom: 6px;
  right: 12px;
}

.toastr {
  visibility: hidden; /* Hidden by default. Visible on click */
  min-width: 250px; /* Set a default minimum width */
  background-color: #292b2c; /* Black background color */
  color: #fff; /* White text color */
  text-align: left; /* Left-align text */
  border-radius: 2px; /* Rounded borders */
  padding: 12px; /* Padding */
  position: relative; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
  margin: 6px;
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
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
