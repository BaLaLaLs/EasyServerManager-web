<template>
  <el-card class="box-card">
    <template #header v-if="props.title">
      <div class="card-header">
        <el-space alignment="end">
          <span>{{ props.title }}</span>
          <span class="sub-title" v-if="props.subTitle">{{ props.subTitle }}</span>
        </el-space>
      </div>
    </template>
    <template #header v-else>
      <slot name="header"></slot>
    </template>
    <div class="card-body">
      <slot></slot>
    </div>
  </el-card>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
    required: false
  }
})
</script>

<style scoped>
  .card-header {
    text-align: start;
  }
  .sub-title {
    font-size: 13px;
  }
</style>
