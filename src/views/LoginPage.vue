<template>
  <ion-page>
    <ion-fab
      class="setting-login"
      slot="fixed"
      vertical="top"
      horizontal="end"
      :edge="true"
    >
      <ion-fab-button>
        <ion-icon :icon="chevronDownCircle"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="bottom">
        <ion-fab-button @click="setOpen(true)">
          <ion-icon :icon="settingsOutline"></ion-icon>
        </ion-fab-button>
        <!-- <ion-fab-button @click="setServerOpen(true)">
          <ion-icon :icon="serverOutline"></ion-icon>
        </ion-fab-button> -->
      </ion-fab-list>
    </ion-fab>
    <div class="container-login">
      <img src="../assets/image/main-logo.png" class="login-logo" alt="">
      <ion-button expand="full" shape="round" href="/join" size="default">Gabung</ion-button>
      <ion-text class="text-atau" color="medium">Atau</ion-text>
      <ion-button
        fill="outline"
        expand="full"
        shape="round"
        size="default"
        href="/login"
        >Masuk</ion-button
      >
      <ion-text class="version-login" color="medium">V 1.0.0</ion-text>

    </div>
    <!-- more option -->
    <ion-modal :is-open="isOpen">
      <ion-header>
        <ion-toolbar>
          <ion-title>Konfigurasi Rapat</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="setOpen(false)">Simpan</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>     
        <ion-item>
          <ion-toggle>Aktifkan mikrofon saat memasuki rapat</ion-toggle>
        </ion-item>
        <ion-item>
          <ion-toggle>Aktifkan kamera saat memasuki rapat</ion-toggle>
        </ion-item>
        <ion-item>
          
          <ion-label>
            Frekuensi frame video
          </ion-label>
          <ion-grid>
            <ion-row>
              <ion-col>
              </ion-col>
              <ion-col>
                <ion-select aria-label="fruit" placeholder="fps">
                  <ion-select-option>15 fps</ion-select-option>
                  <ion-select-option>30 fps</ion-select-option>
                </ion-select>
              </ion-col>
            </ion-row>
          </ion-grid>
         
        </ion-item>
      </ion-content>
    </ion-modal>
    <ion-modal :is-open="isServerOpen">
      <ion-header>
        <ion-toolbar>
          <ion-title>Alamat Server</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="setServerOpen(false)">Simpan</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>     
        <ion-item>
          <ion-text color="dark">
            <p>Silahkan pilih alamat server pada opsi dibawah ini:</p>
          </ion-text>     
        </ion-item>
        <ion-item>
          <ion-text color="primary">
            <p>Alamat server saat ini <b>https://mt55.jumpa.id/</b></p>
          </ion-text>
        </ion-item>
        <ion-item>
          <ion-select aria-label="fruit" placeholder="Pilih Server ...">
            <ion-select-option>https://mt55.jumpa.id/</ion-select-option>
            <ion-select-option>https://vicon.jumpa.id/</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonButton,
  IonText,
  IonModal,
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonGrid,
  IonCol,
  IonRow
} from "@ionic/vue";
import {
  chevronDownCircle,
  serverOutline,
  settingsOutline
} from "ionicons/icons";
import { ref } from "vue";

const isServerOpen = ref(false);

const setServerOpen = (state: boolean) => {
  isServerOpen.value = state;
};
const isOpen = ref(false);

const setOpen = (state: boolean) => {
  isOpen.value = state;
};
</script>
