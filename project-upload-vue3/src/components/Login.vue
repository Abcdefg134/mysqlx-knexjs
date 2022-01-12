<template>
  <div class="flex flex-col bg-blue-200 min-h-screen h-full justify-center">
    <div class="grid grid-cols-3 justify-items-center">
      <div></div>
      <form
        class="
          bg-white
          h-auto
          block
          shadow-md
          w-96
          rounded
          px-8
          pt-6
          pb-8
          mb-auto
        "
      >
        <div class="mb-3">
          <b>LOGIN</b>
        </div>
        <div class="mb-2">
          <label
            class="
              block
              flex
              justify-start
              text-gray-700 text-sm
              font-bold
              mb-2
            "
            for="companycode"
          >
            Email
          </label>
          <input
            class="
              shadow
              appearance-none
              border border-red-500
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            v-model="companycode"
            id="companycode"
            type="text"
            placeholder="Email"
          />
          
        </div>
        <div class="mb-2">
          <label
            class="
              block
              flex
              justify-start
              text-gray-700 text-sm
              font-bold
              mb-2
            "
            for="username"
          >
            Email
          </label>
          <input
            class="
              shadow
              appearance-none
              border border-red-500
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            v-model="email"
            id="username"
            type="text"
            placeholder="Email"
          />
          
        </div>
        <div class="mb-2">
          <label
            class="
              block
              flex
              justify-start
              text-gray-700 text-sm
              font-bold
              mb-2
            "
            for="password"
          >
            Password
          </label>
          <input
            class="
              shadow
              appearance-none
              border border-red-500
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            v-model="password"
            id="password"
            type="password"
            placeholder="******************"
          />
         
        </div>
        <div class="flex flex-col items-center mt-4">
          <button
            class="
              bg-blue-500
              hover:bg-blue-700
              text-white
              font-bold
              py-2
              px-4
              rounded
              focus:outline-none focus:shadow-outline
            "
            @click="loginBtn"
            type="button"
          >
            Login
          </button>
        </div>
      </form>
      <div></div>
    </div>
  </div>
</template>
<script>
import {ref} from 'vue'
import axios from 'axios'
export default {
    setup() {
        const companycode = ref('')
        const email = ref('')
        const password = ref('')
        const loginBtn = ()=>{
            // console.log(companycode.value,email.value,password.value);
            const body = {
                companycode:companycode.value,
                email:email.value,
                password:password.value
            }
            axios.post('https://smkoyksapf.execute-api.ap-northeast-1.amazonaws.com/staging/v1/api/company/login',{Headers:{
                'x-api-key':"rjewp^augexvopbmIszdyh7gfibmu.Sw",
                "Access-Control-Allow-Origin":"*"
            }},body).then(res=>console.log(res.data))
        }
        return{companycode,email,password,loginBtn}
    },
}
</script>