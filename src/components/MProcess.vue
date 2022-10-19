<template>
  <m-card class="box-card" title="进程">
    <!--为解决table 横向无限拉伸问题-->
    <div style="display: grid">
      <el-table :data="props.process" border>
        <el-table-column prop="pid" label="进程id" />
        <el-table-column prop="name" label="名称" sortable />
        <el-table-column prop="cpu_usage" label="Cpu使用" />
        <el-table-column prop="memory" label="内存使用" />
        <el-table-column prop="parent" label="父进程" />

        <!--      <el-table-column prop="address" label="Address" />-->
      </el-table>
    </div>
  </m-card>
</template>

<script setup lang="ts">

  import {Process} from "~/ws_protocol";

  const props = defineProps<{
    process: [Process]
  }>();
  console.log(props.process);

</script>

<style scoped>

</style>
