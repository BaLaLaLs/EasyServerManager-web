<template>
  <m-card class="box-card" title="网络">
    <el-row :gutter="25">
      <el-col :span="8" v-for="(network, index) in props.networks">
        <el-descriptions :column="3">
          <el-descriptions-item label="名称">{{ network.interface_name || "未知" }}</el-descriptions-item>
          <!--            <el-descriptions-item label="挂载点">{{ disk.mount_point }}</el-descriptions-item>-->
          <!--            <el-descriptions-item label="文件系统">{{ disk.file_system }}</el-descriptions-item>-->
          <!--            <el-descriptions-item label="硬盘类型">{{ disk.type }}</el-descriptions-item>-->
          <!--            <el-descriptions-item label="总容量">{{ $filters.formatBytes(disk.total_space) }}</el-descriptions-item>-->
          <!--            <el-descriptions-item label="剩余可用">{{ $filters.formatBytes(disk.available_space) }}</el-descriptions-item>-->
        </el-descriptions>
        <network-chart :el-key="index" :data="network"/>
        <!--          <el-progress :percentage="+(((disk.total_space - disk.available_space) / disk.total_space) * 100).toFixed()" :color="formatColor"  :stroke-width="18" />-->
      </el-col>
    </el-row>
  </m-card>
</template>

<script setup lang="ts">
import { Network} from "~/ws_protocol";
import {onMounted} from "vue";
import NetworkChart from "~/components/Network/network-chart.vue";

let props = defineProps<{
  networks: [Network]
}>();
onMounted(() => {
})

</script>

<style scoped>

</style>
