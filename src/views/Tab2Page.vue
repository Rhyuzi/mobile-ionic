<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Akun</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-content>
          <ion-input
            color="primary"
            label="Nama"
            readonly
            :value="comment"
            label-placement="floating"
            fill="outline"
          ></ion-input
          ><br />
          <ion-input
            color="primary"
            label="Nama Pengguna"
            readonly
            :value="account"
            label-placement="floating"
            fill="outline"
          ></ion-input
          ><br />
          <ion-input
            color="primary"
            label="Email"
            readonly
            :value="email"
            label-placement="floating"
            fill="outline"
          ></ion-input
          ><br />
          <ion-input
            color="primary"
            label="Wilayah"
            readonly
            label-placement="floating"
            :value="country"
            fill="outline"
          ></ion-input
          ><br />
          <br />
          <ion-button
            color="danger"
            expand="full"
            shape="round"
            @click="logout"
            size="default"
            >Keluar</ion-button
          >
        </ion-card-content>
      </ion-card>
      <ion-action-sheet
        trigger="open-action-sheet"
        header="Actions"
        :buttons="actionSheetButtons"
      ></ion-action-sheet>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonActionSheet,
  loadingController,
} from "@ionic/vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { onMounted } from "vue";

const store = useStore();

const account = ref("");
const email = ref("");
const country = ref("");
const comment = ref("");

const actionSheetButtons = [
  {
    text: "Delete",
    role: "destructive",
    data: {
      action: "delete",
    },
  },
  {
    text: "Cancel",
    role: "cancel",
    data: {
      action: "cancel",
    },
  },
];
onMounted(() => {
  getAccountInfo()
});

const getAccountInfo = async () => {
  const loading = await loadingController.create({
    message: "Loading...",
    animated: true,
    backdropDismiss: false,
  });
  loading.present();

  const res = await store.dispatch("auth/accountInfo");
  console.error( 'getAccountInfo',res );
  account.value = store.getters["auth/get"]("account");
  email.value = store.getters["auth/get"]("email");
  country.value = store.getters["auth/get"]("country");
  comment.value = store.getters["auth/get"]("comment");

  // console.error("country", country.value)
  // console.error("acc", account.value);
  loading.dismiss();
};

const logout = () => {
  localStorage.clear();
  location.reload();
};
</script>
