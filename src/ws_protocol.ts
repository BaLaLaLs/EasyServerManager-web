
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
    networks: [Network],
    processes: [Process]
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
type Process = {
    name: string,
    cpu_usage: number,
    cmd: string,
    exe: string,
    environ: string,
    cwd: string,
    root: string,
    memory: number,
    virtual_memory: number,
    start_time: number,
    run_time: number,
    disk_usage: DiskUsage,
    parent: number,
    pid: number,
    status: string
}
type DiskUsage = {
    total_written_bytes: number,
    written_bytes: number,
    total_read_bytes: number,
    read_bytes: number
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

export {Network, WsMessage, MsgType, SystemStatus, Process }
