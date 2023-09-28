<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Pilih Ruang Rapat</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div v-for="plan in meetingPlans?.packages" :key="plan.roomType">
        <ion-item button :detail="true" @click="setPlans(plan.roomIndex)">
          <ion-thumbnail slot="start">
            <img
              alt="Silhouette of mountains"
              src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
            />
          </ion-thumbnail>
          <ion-label>
            <h3>{{ plan.name }}</h3>
            <p> Max Join {{ plan.maxJoin }}</p>
          </ion-label>
        </ion-item>
        </div>
        <!-- <ion-item button :detail="true">
          <ion-thumbnail slot="start">
            <img
              alt="Silhouette of mountains"
              src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
            />
          </ion-thumbnail>
          <ion-label>
            <h3>Ruang Rapat Umum</h3>
            <p>0055 - 0055</p>
          </ion-label>
        </ion-item> -->
    </ion-content>
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
  IonItem,
  IonThumbnail,
  IonLabel,
  IonContent
} from "@ionic/vue";
import { personCircle } from 'ionicons/icons'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { DataPlans } from '@/interfaces/jumpaRtcSDK'
import router from "@/router";
const store = useStore()


const meetingPlans = ref<DataPlans>()
onMounted(async () => {
    await gettedMeetingPlans()
    await getMeetingPlans()

    console.debug('data plan',meetingPlans.value)
})

const getMeetingPlans = async () =>{
  meetingPlans.value = store.getters['dashboard/get']('meetingPlans')
}

const gettedMeetingPlans = async () => {
  const option = {
    pageNum: 1,
    pageSize: 15
  }

  await store.dispatch('dashboard/meetingPlans',option)
};

const setPlans = (roomIndex: string) => {
  store.dispatch('dashboard/setPlans',roomIndex)
  router.push('meeting-form')
  // console.debug('roomIndex',roomIndex)
}
</script>
