import Vue from 'vue'

class EventBus {
    constructor() {
        this.bus = new Vue()
    }

  
    on(event, handler) {
        this.bus.$on(event, handler)
    }

   
    once(event, handler) {
        this.bus.$once(event, handler)
    }

   
    off(event, handler) {
        this.bus.$off(event, handler)
    }

   
    emit(event, ...args) {
        this.bus.$emit(event, ...args)
    }
}

const bus = new EventBus();
Vue.prototype.$bus = bus