<template>
  <el-progress type="dashboard" :percentage="props.percentage" :color="formatColor" />
</template>

<script setup lang="ts">

import { percentageToHsl} from "~/utils";

const formatColor = function (percentage: number) {
return percentageToHsl(percentage/100, 120, 0)
}

const props = defineProps({
  percentage:{
    type: Number,
    required: true
  }
})


</script>

<style scoped>

</style>
