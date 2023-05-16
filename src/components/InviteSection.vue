<template>
  <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-12 mt-5 box-timer text-begin">
    <div class="my-3">
      <label class="form-label">Simple select</label>
      <Multiselect
        v-model="partners_selected"
        :options="partners"
        mode="multiple"
        label="name"
        track-by="name"
        :search="true"
        :close-on-select="false"
        class="form-control form-control-solid"
        placeholder="Seleccione partners para Pair Programming"
      >
        <template v-slot:option="{ option }">
          {{ option.name + ' ' + option.lastname }}
        </template>
      </Multiselect>
      <div class="col-12 text-left mt-4">
        <button class="btn btn-success btn-lg" @click="invitePartners()">Invitar</button>
      </div>
    </div>
  </div>
  <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-12 mt-5 box-timer p-3" v-if="invited.length > 0">
    <div class="">
      <ul>
        <li v-for="(person, index) in invited" :key="index" style="text-align: start;"><strong>{{ getPerson(person) }}: </strong>Esperando respuesta</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Multiselect from '@vueform/multiselect'
import "@vueform/multiselect/themes/default.css"
const _ = require('lodash')

export default defineComponent({
  components: {
    Multiselect
  },
  setup () {
    const invited = ref(Array<Number>())
    const partners_selected = ref(Array())
    const partners = [
      {value: 1, name: 'Juan', lastname: 'Perez', team: 'Team 1'},
      {value: 2, name: 'Luis', lastname: 'Gonzalez', team: 'Team 1'},
      {value: 20, name: 'Carlos', lastname: 'Gajardo', team: 'Team 1'},
      {value: 54, name: 'Pedro', lastname: 'Gallardo', team: 'Team 1'},
      {value: 60, name: 'Juan Carlos', lastname: 'Bodoque', team: 'Team 1'},
      {value: 12, name: 'Pedro', lastname: 'Pascal', team: 'Team 1'},
      {value: 17, name: 'Ernesto', lastname: 'Velasquez', team: 'Team 1'},
      {value: 18, name: 'Alfredo', lastname: 'Troncoso', team: 'Team 1'},
      {value: 19, name: 'Sergio', lastname: 'Kovarov', team: 'Team 1'},
      {value: 31, name: 'Xin', lastname: 'Omeosawa', team: 'Team 1'},
    ];
    const getPerson = function (id: any) {
      const person = _.find(partners, (e: any) => {
        if(e.value === id) {
          return e
        }
      })
      return person.name + ' ' + person.lastname
    }
    const invitePartners = function () {
      _.forEach(partners_selected.value, (e: number) => {
        if(!_.includes(invited.value, e)) {
          invited.value.push(e)
        }
      })
      invited.value = JSON.parse(JSON.stringify(partners_selected.value))
    }

    return {
      invited,
      partners,
      partners_selected,
      getPerson,
      invitePartners
    }
  }
})
</script>