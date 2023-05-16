<template>
  <b-modal 
    class="show"
    size="md"
    v-if="show"
    v-model="show"
    title="Time settings"
    button-size="lg"
    ok-variant="success"
    ok-title="Guardar"
    @ok="saveSettings()"
    @hide="close()"
  >
    <div class="row text-center">
      <div class="col-12">
        <label class="form-label col-12"><strong>Timepo trabajo</strong></label>
        <vue-number-input class="" v-model="timers.principal" :min="1" :max="180" inline controls></vue-number-input>
      </div>
      <div class="col-12">
        <label class="form-label col-12"><strong>Receso corto</strong></label>
        <vue-number-input class="" v-model="timers.middle" :min="1" inline controls></vue-number-input>
      </div>
      <div class="col-12">
        <label class="form-label col-12"><strong>Descanso final de ciclo</strong></label>
        <vue-number-input class="" v-model="timers.final" :min="1" inline controls></vue-number-input>
      </div>
      <div class="col-12">
        <label class="form-label col-12"><strong>N° ciclos de concentración</strong></label>
        <vue-number-input class="" v-model="timers.cycles" :min="1" :max="180" inline controls></vue-number-input>
      </div>
      <div class="col-12">
        <label class="form-label col-12"><strong>Ciclos de trabajo</strong></label>
        <vue-number-input class="" v-model="timers.goals" :min="1" :max="180" inline controls></vue-number-input>
      </div>
    </div>
  </b-modal>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
export default defineComponent({
  props: {
    settings: {
      type: Object,
      default: {
        principal: 1,
        middle: 0.5,
        final: 1,
        cycles: 2,
        goals: 1
      }
    },
  },
  setup(props, {emit}) {
    onMounted(() => {
      timers.value = JSON.parse(JSON.stringify(props.settings))
    })
    const show = ref(true)
    const timers = ref(Object({
      principal: 15,
      middle: 5,
      final: 10,
      cycles: 4,
      goals: 1,
    }));
    const saveSettings = function () {
      console.log(timers.value)
      emit('save', timers.value)
    }
    const close = function () {
      emit('close', false)
    }
    return {
      show,
      timers,
      saveSettings,
      close
    }
  }
})
</script>
<style>
.modal.fade .modal-dialog {
  transition: opacity 1s ease-out;
}
.fade {
  transition: opacity 1s linear !important;
}
</style>