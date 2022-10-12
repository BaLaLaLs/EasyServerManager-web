import { createApp } from "vue";
import App from "./App.vue";

// import "~/styles/element/index.scss";
import router from './router';
// import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss";
import 'uno.css'
import VueNativeSock from "vue-native-websocket-vue3";
// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss"
import axios from "axios";
import {WsClient} from "~/WsClient";
import moment from "moment";
import {niceBytes} from "~/utils";

const app = createApp(App);

app.config.globalProperties.$http = axios;
app.use(router)
app.use(VueNativeSock,process.env.VITE_WS_BASE_URL, {
    reconnection: true, // (Boolean) whether to reconnect automatically (false)
    reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
    reconnectionDelay: 3000, // (Number)
});
app.config.globalProperties.$wsClient = new WsClient(app)
app.mount("#app");
app.config.globalProperties.$filters = {
    formatDuration(seconds: number) {
        let d = moment.duration(seconds, 'seconds');
        return Math.floor(d.asDays()) + '天' + d.hours() + '时' + d.minutes() + '分' + d.seconds() + '秒'
    },
    formatBytes(bytes: number) {
        return niceBytes(bytes)
    }
}
