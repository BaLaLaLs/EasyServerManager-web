<template>
  <div :id="chartId" style="min-height: 300px; width: 100%">

  </div>
</template>

<script setup lang="ts">

import {onMounted, reactive, ref, watch} from "vue";
import * as echarts from "echarts";
import {Network} from "~/ws_protocol";
import {EChartsType} from "echarts/types/dist/echarts";
import {SizedArray} from "~/utils";

let chart: EChartsType
let props = defineProps<{
  elKey: number,
  data: Network
}>();
let chartId = `network-chart-${props.elKey}`;

let transmitted = ref(new SizedArray(20))
let received = ref(new SizedArray(20))

watch(() => props.data, (first, second) => {
  transmitted.value.push(second.transmitted);
  received.value.push(second.received);

  chart?.setOption(getChartOption())
});
const getChartOption = () => {
  return {
    xAxis: {
      type: 'category',
      data: [...(new Array(transmitted.value.length).fill(''))]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: transmitted.value,
        type: 'line'
      },
      {
        data: received.value,
        type: 'line'
      }
    ]
  }
};

onMounted(() => {
  chart = echarts.init(document.getElementById(chartId)!!);
  chart.setOption(getChartOption())
})
</script>

<style scoped>

</style>
