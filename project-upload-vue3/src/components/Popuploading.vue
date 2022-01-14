
<script setup>
import {defineProps} from 'vue'
  const props = defineProps({
    showModal:Boolean
  })
  console.log(props);
</script>
<template>
  <div>
    <div
      v-if="showModal"
      class="
        overflow-x-hidden overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        justify-center
        items-center
        flex
      "
    >
      <div class="relative w-auto my-6 mx-auto max-w-sm">
        <!--content-->
        <div
          class="
            border-0
            rounded-lg
            shadow-lg
            relative
            flex flex-col
            h-96
            w-96
            bg-white
            outline-none
            focus:outline-none
          "
        >
          <!--header-->
          <div
            class="
              flex
              items-start
              justify-between
              p-5
              border-b border-solid border-blueGray-200
              rounded-t
            "
          >
            <h3 class="text-3xl font-semibold">Loading</h3>
          </div>
          <!--body-->
          <div class="relative p-6 flex flex-row justify-center">
            <img
              src="../assets/Loading.gif"
              class="rounded-full w-64 h-64"
            />
          </div>
          <!--footer-->
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>