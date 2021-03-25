<template>
  <div class="bg h-screen py-6">
    <p class=" p-3 font-bold text-white  text-3xl text-center">
      Automobile Audit Form
    </p>
    <!-- error messages -->
    <ul v-if="errorMessage.length > 0" class="flex flex-col m-4 items-center">
      <li
        v-for="(error, index) in errorMessage"
        :key="index"
        class=" py-3 px-3 m-1 font-semibold rounded bg-red-600 text-white"
      >
        {{ error }}
      </li>
    </ul>

    <!-- form -->
    <form
      @submit.prevent="submit"
      class="my-11 sm:w-2/5 mx-auto bg-blue-200 rounded-md  p-7 shadow-md"
    >
      <!-- name -->
      <div class="p-3">
        <label for="name" class="py-2 block font-semibold">Name</label>
        <input
          class="w-full px-5 py-5 rounded-lg outline-none border"
          type="text"
          name="name"
          id="name"
          placeholder="Name..."
          required
          v-model="data.name"
        />
      </div>

      <!-- reference code -->
      <div class="p-3">
        <label for="ref_code" class="py-2 block font-semibold"
          >Reference code</label
        >
        <input
          class="w-full px-5 py-5 rounded-lg outline-none  border"
          type="text"
          name="ref_code"
          id="ref_code"
          placeholder="Reference..."
          required
          v-model="data.refCode"
        />
      </div>

      <!-- email -->
      <div class="p-3">
        <label for="email" class="py-2 block font-semibold">Email</label>
        <input
          class="w-full px-5 py-5 rounded-lg outline-none border"
          type="email"
          name="email"
          id="email"
          required
          placeholder="Email..."
          v-model="data.email"
        />
      </div>

      <!-- automobile maker -->
      <div class="p-3">
        <label for="make" class="py-2 block font-semibold">Auto maker</label>
        <select
          class="w-full px-5 py-5 rounded-lg outline-none border"
          name="maker"
          id="maker"
          v-model="data.maker"
          @change="getModel($event)"
          placeholder="select auto maker"
          required
        >
          <option value="">Select auto maker</option>
          <option
            v-for="(maker, index) in makers"
            :value="maker.name"
            :id="maker.id"
            :key="index"
            >{{ maker.name }}</option
          >
        </select>
      </div>

      <!-- automobile model -->
      <div v-if="models.length > 0" class="p-3">
        <label for="model" class="py-2 block font-semibold">Model</label>
        <select
          class="w-full px-5 py-5 rounded-lg outline-none border"
          name="model"
          id="model"
          v-model="data.model"
          required
        >
          <option value="">Select model</option>
          <option
            :value="model"
            v-for="(model, index) in models"
            :key="index"
            >{{ model }}</option
          >
        </select>
      </div>

      <!-- Issues check boxes -->
      <div class="p-3 ">
        <label for="model" class="py-2 block font-semibold"
          >Condition experience</label
        >
        <div class="flex flex-wrap bg-white p-5 rounded-md">
          <div class="px-2 py-2" v-for="(issue, i) in issues" :key="i">
            <input
              type="checkbox"
              :name="`check${i}`"
              :id="`check${i}`"
              :value="issue"
              v-model="data.conditions"
            />
            <label :for="`check${i}`" class="px-1 cursor-pointer"
              >{{issue}}</label
            >
          </div>
        </div>
      </div>

      <!-- submit -->
      <button
        type="submit"
        class="p-4 text-white font-semibold blocks bg-blue-600 my-3 mx-3  rounded-lg outline-none focus:outline-none"
      >
        Next
      </button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import auto from "../assets/autoMaker";
import router from "@/router";
export default {
  setup() {
    //   intitlaize form fields data
    const data = ref({
      name: "",
      refCode: "",
      email: "",
      maker: "",
      model: "",
      conditions: [],
    });
    const issues = ref([
		"Engine Issue",
		"Gear Box Issue",
      "Need body repair",
      "Need repainting",
      "Wiring problems",
      "Oil leakage",
      "Brake issue",
    ]);
    const errorMessage = ref([]);
    const emailTest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const models = ref([]);
    const makers = ref([]);

    onMounted(() => {
      makers.value = auto; // auto is imported from automaker jsavascript array @'../assets/autoMaker'
    });

    // function changes model option based on car maker chosen
    const getModel = (e) => {
      let id = +e.target.options[e.target.options.selectedIndex].id - 1;
      models.value = [...auto[id].model];
    };

    // this function validates email as a precautionary measure for browsers hat did not support required on form field
    const validateEmail = () => {
      if (!emailTest.test(data.value.email))
        errorMessage.value.push("invalid email format");
    };

    // function checks for at leat one capital letter, small letter, number and special character
    const validateReference = () => {
      if (data.value.refCode.length < 6)
        errorMessage.value.push("refCode should be more than 6 character");
      // test for numbers
      if (!/[0-9]+/.test(data.value.refCode))
        errorMessage.value.push("refCode must contain at least one numeber");
      // test for lowercase
      if (!/[a-z]/.test(data.value.refCode))
        errorMessage.value.push("refCode must contain at least one lowercase");
      // test for uppercase
      if (!/[A-Z]/.test(data.value.refCode))
        errorMessage.value.push("refCode must contain at least one uppercase");
      // test for special char
      if (!/[!@#\\$%\\^\\&*\\)\\({}+=._-]/.test(data.value.refCode))
        errorMessage.value.push(
          "refCode must contain at least one special character"
        );
    };

    // this function validate the check boxes
    const validateCondition = () => {
      if (data.value.conditions.length < 1)
        errorMessage.value.push("you did not pick a chekbox for complaint");
    };

    // functions to validate auto maker not to be empty
    const validateMaker = () => {
      if (!data.value.maker) errorMessage.value.push("Choose a car make");
    };
    // functions to validate auto model not to be empty
    const validateModel = () => {
      if (!data.value.maker) errorMessage.value.push("Choose a car model");
    };

    // logic for form submission
    const submit = () => {
      errorMessage.value = [];
      validateEmail();
      validateReference();
      validateCondition();
      validateMaker();
      validateModel();
      if (errorMessage.value.length < 1) {
        localStorage.setItem("accepted", JSON.stringify(data));
        router.push("/review");
      }
    };

    return {
      data,
      submit,
      models,
      makers,
      getModel,
      issues,
      errorMessage,
    };
  },
};
</script>

<style>
.bg {
  background: url("https://static.vecteezy.com/system/resources/previews/001/986/145/original/glowing-silver-sport-car-on-black-background-vector.jpg");
  background-size: cover;
  background-position: fixed;
  overflow: auto;
}
</style>
