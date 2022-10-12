/// <reference types="vite/client" />

import {ComponentInternalInstance} from "vue";
import {WsClient} from "~/WsClient";

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
interface ImportMetaEnv {
  readonly VITE_TITLE: string
  readonly VITE_BASE_URL: string
  readonly VITE_WS_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    count: number
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $socket: WebSocket,
    $wsClient: WsClient,
    $store: Store<State>
  }
}
