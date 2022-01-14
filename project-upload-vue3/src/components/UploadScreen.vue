<script setup>
import PopupLoading from "../components/Popuploading.vue";
import { ref } from "vue";
import axios from "axios";
import store from "../store/index";

axios.defaults.baseURL = "api";

const file = ref();
const showModal = ref(false);

const onchangFile = (event) => {
  file.value = event.target.files[0];
  console.log(file.value);
};

const token = store.getters.getToken;
const uploadBtn = async () => {
  if (!file.value) {
    alert("Bạn chưa import file");
    return false;
  }
  showModal.value = true;
  const body = {
    file: file.value.name,
    sizefile: file.value.size,
  };
  let createpresignedRequest;
  try {
    createpresignedRequest = await axios.post(
      "https://smkoyksapf.execute-api.ap-northeast-1.amazonaws.com/staging/v1/api/s3/createpresigned",
      body,
      {
        headers: {
          Authorization: "Bearer " + token,
          "x-api-key": "rjewp^augexvopbmIszdyh7gfibmu.Sw",
        },
      }
    );
    console.log(createpresignedRequest);
    const code = createpresignedRequest.data.code;
    if (code !== 0) {
      alert("Lỗi không xác định");
      showModal.value = false;
      return false;
    }
    //const imgBase64 = await getBase64(file.value);
    const signedUrl = createpresignedRequest.data.payload.signedUrl;
    try {
      // const formData = new FormData()
      // formData.append('file',file.value.name)
      // formData.append('sizefile',file.value.size)
      // formData.append('src',file.value)
      const uploadFile = await axios.put(signedUrl, file.value, {
        headers: {
          "Content-Type": file.value.type,
        },
      });
      showModal.value = false;
      if (uploadFile.statusText === "OK") {
        alert("Upload thành công");
      }
      console.log(uploadFile);
    } catch (error) {
      showModal.value = false;
      console.log(error);
    }
  } catch (error) {
    showModal.value = false;
    console.log(error);
  }
};
// const getBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (err) => reject(err);
//   });
// };
</script>
<template>
  <div class="bg-blue-200 min-h-screen">
    <div class="grid grid-rows-3 min-h-screen">
      <div></div>
      <div class="grid grid-cols-3">
        <div></div>
        <div class="flex flex-col">
          <div class="">
            <label
              class="
                w-full
                flex flex-row
                justify-center
                items-center
                px-6
                py-6
                bg-white
                rounded-md
                shadow-md
                tracking-wide
                uppercase
                border border-blue
                cursor-pointer
                hover:bg-purple-600 hover:text-white
                text-purple-600
                ease-linear
                transition-all
                duration-150
              "
            >
              <i class="fas fa-cloud-upload-alt fa-3x"></i>
              <span class="text-base leading-normal">Select a file</span>
              <input type="file" @change="onchangFile" class="hidden" />
            </label>
          </div>
          <div class="flex flex-row justify-center">
            <button
              class="
                mt-5
                w-max
                hover:text-black hover:bg-gray-400
                bg-red-400
                text-white
                px-8
                py-2
                rounded-lg
                transition
                duration-150
                ease-in-out
                hover:duration-150
              "
              @click="uploadBtn"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
    <PopupLoading :showModal="showModal" />
  </div>
</template>
