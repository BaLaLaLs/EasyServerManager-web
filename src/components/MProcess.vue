<template>
  <m-card class="box-card" title="进程">
    <!--为解决table 横向无限拉伸问题-->
    <div style="display: grid">
      <el-table :data="[]" border>
        <!--      <el-table-column prop="date" label="Date" width="180" />-->
        <!--      <el-table-column prop="name" label="Name" width="180" />-->
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

</script>

<style scoped>

</style>
