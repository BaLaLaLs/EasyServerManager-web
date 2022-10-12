import {App} from "@vue/runtime-core";
import {MsgType, SystemStatus, WsMessage} from "~/ws_protocol";
import EventEmitter from 'events'

// Ws 插件二次封装
export class WsClient {
    private wsClient: WebSocket;
    private event: EventEmitter;
    constructor(app: App) {
        this.wsClient = app.config.globalProperties.$socket;
        this.wsClient.onmessage = this.onmessage.bind(this);
        this.event = new EventEmitter();
    }
    private onmessage(wsMessage: MessageEvent) {
        let data: WsMessage<any> = JSON.parse(wsMessage.data);
        if(data.msg_type == MsgType.SystemStatus) {
            const data1 = data.data as SystemStatus;
            this.event.emit(data.msg_type.toString(), data1)
        }
    }
    public subscribe(msgType: MsgType, cb: (...args: any[]) => void) {
        this.event.on(msgType.toString(), cb);
    }
    public unSubscribe(msgType: MsgType, cb: (...args: any[]) => void) {
        this.event.removeListener(msgType.toString(), cb);
    }
}
