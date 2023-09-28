<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Masuk</ion-title>
      </ion-toolbar>
    </ion-header>
    <div class="container-join">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Masuk</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <form action="" ref="formLoginRef">
            <ion-input
              ref="email"
              color="primary"
              label="Email atau Nama Akun"
              label-placement="floating"
              fill="outline"
              placeholder="Masukan Email atau Nama Akun"
              :class="v$.account.$error ? 'ion-invalid' : 'ion-valid'"
              :error-text="
                v$.account.$error
                  ? v$.account.$errors[0].$message.toString()
                  : ''
              "
              v-model="state.account"
              @ion-blur="markTouched"
            ></ion-input
            ><br />
            <ion-input
              ref="password"
              color="primary"
              label="Kata Sandi (jika diperlukan)"
              label-placement="floating"
              fill="outline"
              type="password"
              placeholder="Masukan Password"
              :class="v$.password.$error ? 'ion-invalid' : 'ion-valid'"
              :error-text="
                v$.password.$error
                  ? v$.password.$errors[0].$message.toString()
                  : ''
              "
              v-model="state.password"
              @ion-blur="markTouched"
            ></ion-input>
            <br />
            <ion-button
              expand="full"
              shape="round"
              size="default"
              @click="login"
              >Masuk</ion-button
            >
          </form>
        </ion-card-content>
      </ion-card>
    </div>

    <ion-toast
      :is-open="isOpen"
      :message="errMessage"
      :duration="5000"
      @didDismiss="setOpen(false)"
    ></ion-toast>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonButton,
  IonToast,
  loadingController,
} from "@ionic/vue";
import { useStore } from "vuex";
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength, helpers } from "@vuelidate/validators";
import { ref } from "vue";
import router from "@/router";
const store = useStore();

const formLoginRef = ref<HTMLFormElement | null>(null);
const state = reactive({
  account: "",
  password: "",
});

const errMessage = ref("");
const isOpen = ref(false);
const setOpen = (state: boolean) => {
  isOpen.value = state;
  if (!state) {
    errMessage.value = "";
  }
};

const rules = computed(() => {
  return {
    account: {
      required: helpers.withMessage("Name can not be empty", required),
      maxlength: helpers.withMessage(
        "Username tidak boleh lebih dari 64 karakter",
        maxLength(64)
      ),
    },
    password: {
      required: helpers.withMessage("Password Must be a number", required),
      maxlength: helpers.withMessage(
        "Password tidak boleh lebih dari 16 karakter",
        maxLength(16)
      ),
    },
  };
});

const v$ = useVuelidate(rules, state);

const markTouched = (event: Event) => {
  const target = event.target as HTMLInputElement;

  v$.value.$validate();

  target.classList.add("ion-touched");
};

const login = async () => {
  const loading = await loadingController.create({
    message: "Loading...",
    animated: true,
    backdropDismiss: false,
  });
  v$.value.$validate();

  if (v$.value.$error) {
    const inputs = formLoginRef.value?.querySelectorAll("input");
    inputs?.forEach((input) => input.focus());

    return;
  }
  loading.present();
  const res = await store.dispatch("auth/signIn", state);
  if (res.retCode === "0") {
    console.error({ res });
    loading.dismiss();
    router.push("/tabs/");
  } else {
    errMessage.value = res.errorMsg;
    setOpen(true);
    loading.dismiss();
  }
};
</script>
