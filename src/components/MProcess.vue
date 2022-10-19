<template>
  <m-card class="box-card" title="进程">
    <!--为解决table 横向无限拉伸问题-->
    <div style="display: grid">
      <el-table :data="props.process">
        <el-table-column prop="pid" label="进程id" />
        <el-table-column prop="name" label="名称" sortable />
        <el-table-column prop="cpu_usage" label="Cpu使用">
          <template #default="scope">
            <span>{{ scope.row.cpu_usage.toFixed(1) + ' %' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="memory" label="内存使用" >
          <template #default="scope">
            <span>{{ $filters.formatBytes(scope.row.memory) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="parent" label="父进程" />
        <el-table-column label="操作" width="120">
          <template #default>
            <el-button link type="primary" size="small" @click="showDetail"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </m-card>
</template>

<script setup lang="ts">

  import {Process} from "~/ws_protocol";

  const props = defineProps<{
    process: [Process]
  }>();
  props.process.map(item => item.status).forEach(console.log)
  const showDetail = () => {

  }
</script>

<style scoped>

</style>
