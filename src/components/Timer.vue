<template>
  <div class="row text-center">
    <div class="col-12 position">
      <radial-progress-bar 
        :diameter="200"
        :completed-steps="completedSteps"
        :startColor="color"
        :total-steps="totalSteps">
        <!-- Your inner content here -->
        <h2>{{ mainCycleLeft }}</h2>
      </radial-progress-bar>
    </div>
    <div class="col-12 pt-2">
      <button class="btn btn-lg btn-primary" v-if="!started" @click="startTimer()">¡Comenzar!</button>
      <button class="btn btn-lg btn-primary" v-if="started" @click="handleCycle()">
        <span v-if="!paused">Pauser</span>
        <span v-else>Reanudar</span>
      </button>
    </div>
  </div>
</template>
  
<script lang="ts">
import { ref, defineComponent, onMounted, computed, watch } from "vue";

export default defineComponent({
  props: {
    time: {
      type: Number,
      default: 15
    },
    type: {
      type: String,
      default: 'principal'
    },
  },
  setup(props, {emit}){
    onMounted(() => {
      calcTimeText(props.time*60)
    });
    watch(() => props.time,
    async newTime => {
      console.log(newTime)
      calcTimeText(newTime*60)
    }
    )
    const color = computed(() => {
      if((completedSteps.value/totalSteps.value) > 0.5 &&  (completedSteps.value/totalSteps.value) <= 0.75) {
        return '#bab40f'
      }
      else if((completedSteps.value/totalSteps.value) > 0.75) {
        return '#ba2e0f'
      }
      else {
        return "#00C58E"
      }
    })
    const timer = ref(props.time);
    const completedSteps = computed(() => {
      if(props.time) {
        //console.log(props.time, timer.value)
        return (props.time*60 - timer.value)
      }
      else {
        return 0
      }
    })
    const totalSteps = computed(() => {
      return timer.value = props.time*60
    });
    const mainCycleLeft = ref("15:00");
    const started = ref(false);
    const paused = ref(false);
    const count = ref()
    const startWork = ref(false) 

    const handleCycle = function () {
      paused.value = !paused.value
    }
    const calcTimeText =  function (time: number) {
      var minutes, seconds;
      const CalcMinutes = time / 60;
      const CalcSeconds = time % 60;
      minutes = parseInt(String(CalcMinutes), 10);
      seconds = parseInt(String(CalcSeconds), 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      //display = minutes + ":" + seconds;
      mainCycleLeft.value = minutes + ":" + seconds;
    }
    const startTimer = function() {
      //var timer: number;
      started.value = true;
      if(!startWork.value) {
        emit('start')
      }
      timer.value = props.time*60
      count.value = setInterval(function () {
        calcTimeText(timer.value)
        if(!paused.value) {
          --timer.value
        }
        if (timer.value < 0) {
          timer.value = props.time*60;
          calcTimeText(timer.value)
          started.value = false
          clearInterval(count.value)
          emit('finishStep')
        }
      }, 1000);
    }

    return {
      completedSteps,
      totalSteps,
      mainCycleLeft,
      started,
      paused,
      timer,
      color,
      handleCycle,
      startTimer
      
    }
  }
})
</script>
<style>
  .position {
    width: 67% !important;
    margin: auto;
  }
  @media (max-width: 768px) {
    .position {
    width: 78% !important; 
    margin: auto;
  }
  }
</style>