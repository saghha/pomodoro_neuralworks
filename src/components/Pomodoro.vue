<template>
  <div class="row w-100 container">
    <Settings
      v-if="show"
      :settings="started? timeFallback:times"
      :show="show"
      @close="toggleModal"
      @save="saveSettings"
    />
    <div class="col-12">
      <button class="btn btn-info" @click="toggleModal(true)">Settings</button>
    </div>
    <div class="col-12 text-center pb-5">
      <h2>Fase de <span v-if="type === 'principal'">concentración</span><span v-else>descanso</span></h2>
      <h4><strong>{{ stepNow  + '/' + times.cycles}}</strong></h4>
    </div>
    <div class="col-lg-4 col-md-6 offset-md-3 offset-lg-4 col-sm-12 py-5 box-timer">
      <Timer
        :time="time"
        :type="type"
        @finishStep="changeStep()"
        style="right: 28%;"
        v-if="time && showTimer"
        @start="startCycles"
      />
    </div>
    <InviteSection/>
  </div>
</template>
<script lang="ts">
import Settings from './Settings.vue';
import Timer from './Timer.vue';
import InviteSection from './InviteSection.vue';
import { defineComponent, ref, onMounted } from 'vue';
const _ = require('lodash')
interface Settings {
  principal: number,
  middle: number,
  final: number,
  cycles: number,
  goals: number
}
export default defineComponent ({
  components: {
    Timer,
    InviteSection,
    Settings,
},
  setup() {
    onMounted(() => {
      time.value = times.value.principal
    });
    const show = ref(false);
    const started = ref(false);
    const stepNow = ref(1);
    const showTimer = ref(true)
    const type = ref('principal')
    const timeFallback = ref(Object({
      principal: 2,
      middle: 1,
      final: 2,
      cycles: 2,
      goals: 1
    }))
    const times = ref(Object({
      principal: 2,
      middle: 1,
      final: 2,
      cycles: 2,
      goals: 1
    }))
    const time = ref();
    const toggleModal = function (cond: boolean) {
      console.log(cond)
      show.value = cond
    } 
    const startCycles = function () {
      started.value = true;
    }
    const saveSettings = function (payload: Settings) {
      showTimer.value = false
      console.log(payload)
      if(started.value) {
        timeFallback.value = payload
      } else {
        times.value = payload
        timeFallback.value = payload
      }
      time.value = times.value.principal
      showTimer.value = true
    }
    const changeStep = function() {
      if(type.value === 'principal') {
        if(stepNow.value === (times.value.cycles)){
          type.value = 'final'
          time.value = times.value.final
        }
        else {
          time.value = times.value.middle
          type.value = 'middle'
        }
      }
      else if(type.value === 'middle') {
        type.value = 'principal'
        time.value = times.value.principal
        stepNow.value ++
      }
      else if(type.value === 'final') {
        time.value = times.value.principal
        type.value = 'principal'
        stepNow.value = 1
        started.value = false
        times.value = JSON.parse(JSON.stringify(timeFallback.value))
        time.value = times.value.principal
      }
    }

    return {
      time,
      timeFallback,
      started,
      times,
      type,
      stepNow,
      show,
      showTimer,
      toggleModal,
      changeStep,
      startCycles,
      saveSettings,
    }
  }
})

</script>
<style>
.vrp__wrapper {
  right: -12%;
}
.box-timer {
  background-color: #C3DBC5;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 5px 5px 30px 5px #0D1B1E;
}
.multiselect-tag.is-user {
    padding: 5px 8px;
    border-radius: 22px;
    background: #35495e;
    margin: 3px 3px 8px;
  }

  .multiselect-tag.is-user img {
    width: 18px;
    border-radius: 50%;
    height: 18px;
    margin-right: 8px;
    border: 2px solid #ffffffbf;
  }

  .multiselect-tag.is-user i:before {
    color: #ffffff;
    border-radius: 50%;;
  }

  .user-image {
    margin: 0 6px 0 0;
    border-radius: 50%;
    height: 22px;
  }
</style>