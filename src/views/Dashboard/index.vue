<template>
  <el-main>
    <el-space fill wrap >
    <m-card title="系统信息">
      <el-descriptions>
        <el-descriptions-item label="操作系统">{{ systemStatus.long_os_version }}</el-descriptions-item>
        <el-descriptions-item label="内存">{{ $filters.formatBytes(systemStatus.memory.total_memory) }}</el-descriptions-item>
        <el-descriptions-item label="处理器">{{ systemStatus.global_cpu_info.brand }}</el-descriptions-item>
        <el-descriptions-item label="主机名">
          <el-tag size="small" type="info">{{ systemStatus.hostname }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="运行时长">
          <span>{{ $filters.formatDuration(systemStatus.up_time) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="系统负载">一分钟 {{ systemStatus.load_avg.one }}% 五分钟 {{ systemStatus.load_avg.five }}% 十五分钟 {{ systemStatus.load_avg.fifteen }}%</el-descriptions-item>
      </el-descriptions>
    </m-card>
    <m-card class="box-card" title="处理器" :sub-title="`核心数: ${systemStatus.cpus.length}`">
      <el-row :gutter="1" style="width: 100%" justify="space-between">
        <div v-for="cpu in systemStatus.cpus" :key="cpu.name" class="cpu-wrapper">
          <m-cpu-progress :percentage="cpu.cpu_usage" ></m-cpu-progress>
          <span>{{ cpu.name }}</span>
        </div>
      </el-row>
    </m-card>
    <m-card class="box-card" title="内存" :sub-title="`${$filters.formatBytes(systemStatus.memory.used_memory)}/${$filters.formatBytes(systemStatus.memory.total_memory)}`">
      <el-progress :percentage="Math.floor((systemStatus.memory.used_memory / systemStatus.memory.total_memory) * 100) " :color="formatColor" />
    </m-card>
    <m-card class="box-card" title="磁盘">
      <el-row :gutter="25">
        <el-col :span="8" v-for="disk in systemStatus.disks">
          <el-descriptions :column="3">
            <el-descriptions-item label="名称">{{ disk.name || "未知" }}</el-descriptions-item>
            <el-descriptions-item label="挂载点">{{ disk.mount_point }}</el-descriptions-item>
            <el-descriptions-item label="文件系统">{{ disk.file_system }}</el-descriptions-item>
            <el-descriptions-item label="硬盘类型">{{ disk.type }}</el-descriptions-item>
            <el-descriptions-item label="总容量">{{ $filters.formatBytes(disk.total_space) }}</el-descriptions-item>
            <el-descriptions-item label="剩余可用">{{ $filters.formatBytes(disk.available_space) }}</el-descriptions-item>
          </el-descriptions>
          <el-progress :percentage="+(((disk.total_space - disk.available_space) / disk.total_space) * 100).toFixed()" :color="formatColor"  :stroke-width="18" />
        </el-col>
      </el-row>
    </m-card>
    <network :networks="systemStatus.networks"></network>
    </el-space>
  </el-main>
</template>

<script setup lang="ts">
import {MsgType, SystemStatus} from "~/ws_protocol";
import {ComponentInternalInstance, getCurrentInstance, reactive} from "vue";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {percentageToHsl} from "~/utils";
const formatColor = function (percentage: number) {
  return percentageToHsl(percentage/100, 120, 0)
}
let systemStatus: UnwrapNestedRefs<SystemStatus> = reactive({
  networks: [{ interface_name: '', total_received: 0, received: 0, total_transmitted: 0, transmitted: 0 }],
  global_cpu_info: {brand: '', cpu_usage: 0, name: ''},
  load_avg: {one: 0, five: 0, fifteen: 0},
  long_os_version: '',
  cpus: [{name: '', cpu_usage: 0, brand:'' }],
  disks: [{ name: '', file_system: '', mount_point: '', available_space: 0, total_space: 0, type: '' }],
  memory: { total_memory: 0,
    used_memory: 0,
    total_swap: 0,
    used_swap: 0 },
  hostname: '', up_time: 0 })

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
let handleSystemStatus = function (args: SystemStatus) {
  systemStatus.cpus = args.cpus;
  systemStatus.hostname = args.hostname
  systemStatus.long_os_version = args.long_os_version
  systemStatus.up_time = args.up_time
  systemStatus.global_cpu_info = args.global_cpu_info
  systemStatus.memory = args.memory
  systemStatus.disks = args.disks
  systemStatus.load_avg = args.load_avg
  systemStatus.networks = args.networks
}

proxy!.$wsClient.subscribe(MsgType.SystemStatus, handleSystemStatus)

</script>

<style scoped>
  .cpu-wrapper {
    display: flex;
    flex-direction: column;

  }
</style>
