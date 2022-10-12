
type WsMessage<T> = {
    msg_type: MsgType,
    data: T
}
enum MsgType {
    SystemStatus= <any>"SystemStatus"
}

type SystemStatus = {
    cpus: [CpuInfo],
    hostname: string,
    up_time: number,
    long_os_version: string,
    global_cpu_info: CpuInfo,
    memory: Memory,
    disks: [Disk],
    load_avg: LoadAvg,
    networks: [Network]
}
type LoadAvg = {
    one: number,
    five: number,
    fifteen: number,
}

type Network = {
    interface_name: string,
    received: number,
    total_received: number,
    transmitted: number,
    total_transmitted: number
}

type Memory = {
    total_memory: number,
    used_memory: number,
    total_swap: number,
    used_swap: number
}

type CpuInfo = {
    name: string,
    cpu_usage: number,
    brand: string
}
type Disk = {
    available_space: number,
    total_space: number,
    file_system: string,
    mount_point: string,
    name: string,
    type: string
}

export {Network, WsMessage, MsgType, SystemStatus }
