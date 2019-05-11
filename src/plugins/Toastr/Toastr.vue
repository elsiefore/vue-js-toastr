<template>
  <div>
    <div class="toastr-container bottom-left">
      <div
        v-for="element in bottom_left_toastrs"
        :key="element.id"
        class="toastr"
        :class="[{show : element.isShown}, {hide: !element.isShown}, element.className]"
      >
        <div class="title" v-if="element.title !== ''">{{ element.title }}</div>
        <div>{{ element.content }}</div>
      </div>
    </div>
    <div class="toastr-container bottom-center">
      <div
        v-for="element in bottom_center_toastrs"
        :key="element.id"
        class="toastr"
        :class="[{show : element.isShown}, {hide: !element.isShown}, element.className]"
      >
        <div class="title" v-if="element.title !== ''">{{ element.title }}</div>
        <div>{{ element.content }}</div>
      </div>
    </div>
    <div class="toastr-container bottom-right">
      <div
        v-for="element in bottom_right_toastrs"
        :key="element.id"
        class="toastr"
        :class="[{show : element.isShown}, {hide: !element.isShown}, element.className]"
      >
        <div class="title" v-if="element.title !== ''">{{ element.title }}</div>
        <div>{{ element.content }}</div>
      </div>
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
      bottom_left_toastrs: [],
      bottom_right_toastrs: [],
      bottom_center_toastrs: []
    };
  },
  computed: {
    shownCount: function() {
      return this.bottom_left_toastrs
        .concat(this.bottom_right_toastrs)
        .concat(this.bottom_center_toastrs)
        .filter(toastr => toastr.isShown === true).length;
    }
  },
  watch: {
    shownCount(val) {
      if (val === 0) {
        this.bottom_center_toastrs = [];
        this.bottom_left_toastrs = [];
        this.bottom_right_toastrs = [];
      }
    }
  },
  beforeMount() {
    Toastr.event.$on("show", this.showToastr);
  },
  beforeDestroy() {
    Toastr.event.$off("show", this.showToastr);
  },
  methods: {
    showToastr(className, newest_on_top, params) {
      /* Default position */
      let position = "bottom-left";
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
        position = params.position || "bottom-left";
      }
      let self = this;
      let index = 0;
      /* Position to respective container */
      switch (position) {
        case "bottom-right":
          index = this.bottom_right_toastrs.push(newToastr) - 1;
          setTimeout(() => {
            self.bottom_right_toastrs[index].isShown = false;
          }, this.bottom_right_toastrs[index].duration);
          break;
        case "bottom-center":
          index = this.bottom_center_toastrs.push(newToastr) - 1;
          setTimeout(() => {
            self.bottom_center_toastrs[index].isShown = false;
          }, this.bottom_center_toastrs[index].duration);
          break;
        case "bottom-left":
        default:
          index = this.bottom_left_toastrs.push(newToastr) - 1;
          setTimeout(() => {
            self.bottom_left_toastrs[index].isShown = false;
          }, this.bottom_left_toastrs[index].duration);
          break;
      }
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
