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
            Company Code
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
            User Name
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
            v-model="username"
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
    <popup-loading :showModal="showModal" />
  </div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
import store from "../store/index";
import router from "../router/index";
import PopupLoading from "../components/Popuploading";
export default {
  components: { PopupLoading },
  setup() {
    const companycode = ref("");
    const username = ref("");
    const password = ref("");
    const showModal = ref(false);
    const loginBtn = async () => {
      // console.log(companycode.value,email.value,password.value);
      showModal.value = true;
      const body = {
        companycode: companycode.value,
        username: username.value,
        password: password.value,
      };
      let data;
      try {
        data = await axios.post(
          "https://smkoyksapf.execute-api.ap-northeast-1.amazonaws.com/staging/v1/api/company/login",
          body,
          {
            headers: {
              "x-api-key": "rjewp^augexvopbmIszdyh7gfibmu.Sw",
            },
          }
        );
        showModal.value = false;
        if(data.data.code) return false
        store.commit("GET_TOKEN", data.data.payload.token);
        router.push("/");
      } catch (error) {
        showModal.value = false
        console.log(error);
      }
    };
    return { companycode, username, password,showModal ,loginBtn };
  },
};
</script>
<style>

</style>