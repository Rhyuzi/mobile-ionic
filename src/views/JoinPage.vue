<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Gabung</ion-title>
      </ion-toolbar>
    </ion-header>
    <div class="container-join">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Gabung Rapat</ion-card-title>
        </ion-card-header>
  
        <ion-card-content>
          <form>
          <ion-input v-model="formData.id" color="primary" label="ID Rapat" label-placement="floating" fill="outline" placeholder="Masukan ID Rapat"></ion-input><br>
          <ion-input v-model="formData.username" color="primary" label="Nama" label-placement="floating" fill="outline" placeholder="Masukan Nama"></ion-input><br>
          <ion-input v-model="formData.password" color="primary" label="Kata Sandi (jika diperlukan)" label-placement="floating" fill="outline" type="password" placeholder="Masukan Password"></ion-input>
          <br>
          <ion-button @click="joinMeeting" expand="full" shape="round" size="default">Gabung</ion-button>
          </form>
        </ion-card-content>
      </ion-card>
    </div>
    <ion-toast :is-open="isOpen" :message="errMsg" :duration="5000" @didDismiss="setOpen(false)"></ion-toast>
    <ion-loading :is-open="isLoading" :message="loadingMsg" spinner="circles" @didDismiss="setLoading(false)"></ion-loading>
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
  IonLoading
} from "@ionic/vue";
import { required, maxLength, helpers, minLength, numeric } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { ref,reactive, computed, onMounted } from "vue";
import router from "@/router";

    onMounted(async () => {
      setupServer()
    })

    const isOpen = ref(false);
    const isLoading = ref(false);
    const errMsg = ref("");
    const loadingMsg = ref("Loading...")

    const formData = reactive({
    id: "",
    username: "",
    password: ""
  });

  const validationRules = {
      id: {
        required: helpers.withMessage("ID Rapat harus Diisi", required),
        numeric: helpers.withMessage("ID Rapat harus berupa angka", numeric),
        minLength: helpers.withMessage("ID Rapat kurang dari batas minimal", minLength(3)),
        maxLength: helpers.withMessage("ID Rapat lebih dari batas maksimal", maxLength(9)),
      },
      username: { 
        required: helpers.withMessage("Nama harus diisi", required),
        minLength: helpers.withMessage("Nama kurang dari batas minimal", minLength(1)),
        maxLength: helpers.withMessage("Nama lebih dari batas maksimal", maxLength(64)),
      },
      password: { 
        numeric: helpers.withMessage("Password harus berupa angka", numeric),
        maxLength: helpers.withMessage("Password lebih dari batas maksimal", maxLength(8)),
      }
    };
    
    const v$ = useVuelidate(validationRules, formData);

    const joinMeeting = async () => {
      setLoading(true);
      v$.value.$touch();
      if (!v$.value.$error) {
        const email = new Date().getTime() + `${process.env.VUE_APP_MAIL}`;
        const options = {
          roomId: formData.id,
          userName: formData.username,
          email,
          roomPassword: formData.password
        };
        console.log("data: ", options);
        loadingMsg.value = "Sedang memasuki ruangan...";
        jumpaRtcSDK.joinRoom(
          options,
          () => {
            localStorage.setItem("onMeeting", JSON.stringify(options));
            setLoading(false);
            router.push("/meetings");
          },
          (err) => {
            setLoading(false);
            errMsg.value = err.description;
            setOpen(true);
          }
        );
      } else {
        console.error("error", v$.value.$errors[0].$message);
        setLoading(false);
        errMsg.value = String(v$.value.$errors[0].$message);
        setOpen(true);
      }
    };

    const setOpen = (state: boolean) => {
      isOpen.value = state;
      if (!state) {
        errMsg.value = "";
      }
    };

    const setLoading = (state: boolean) => {
      isLoading.value = state;
    };

    const setupServer = async () => {
      // console.error("url",process.env.VUE_APP_API_URL)
      jumpaRtcSDK.setServerAddr(process.env.VUE_APP_API_URL)
    }
</script>
