<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Beranda</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-card>
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <div
                                class="dashboard-btn"
                                @click="
                                    ionRouter.navigate(
                                        '/select-room',
                                        'forward',
                                        'replace'
                                    )
                                ">
                                <img
                                    src="../assets/image/meeting_nowss.png"
                                    alt="" />Rapat
                            </div>
                        </ion-col>
                        <ion-col
                            ><div
                                class="dashboard-btn"
                                @click="
                                    ionRouter.navigate(
                                        '/schedule-meet',
                                        'forward',
                                        'replace'
                                    )
                                ">
                                <img
                                    src="../assets/image/schedule_meetingss.png"
                                    alt="" />Jadwalkan
                            </div></ion-col
                        >
                        <ion-col
                            ><div
                                class="dashboard-btn"
                                @click="
                                    ionRouter.navigate(
                                        '/join',
                                        'forward',
                                        'replace'
                                    )
                                ">
                                <img
                                    src="../assets/image/join_meetingss.png"
                                    alt="" />Gabung
                            </div></ion-col
                        >
                    </ion-row>
                </ion-grid>
            </ion-card>
            <ion-card
                v-for="meet in meetings"
                :key="meet.meetingNum"
                class="ion-activatable ripple-parent rectangle"
                @click="
                    ionRouter.navigate('/detail-meet', 'forward', 'replace')
                ">
                <ion-text
                    class="status-card-meet"
                    :color="meet.state === 1 ? 'warning' : 'primary'"
                    >{{ stateFormat(meet.state) }}</ion-text
                >
                <ion-card-header>
                    <ion-card-title
                        :color="meet.state === 1 ? 'warning' : 'primary'"
                        >{{ meet.subject }}</ion-card-title
                    >
                    <ion-card-subtitle
                        >{{ meet.startDateVal }} {{ meet.startTimeVal }} -
                        {{ meet.endTimeVal }}</ion-card-subtitle
                    >
                </ion-card-header>

                <ion-card-content>
                    <div class="pic-meet">
                        <ion-icon :icon="personCircle"></ion-icon>
                        {{ meet.hostName }}
                    </div>
                </ion-card-content>
                <ion-button
                    expand="full"
                    shape="round"
                    size="small"
                    href="/meetings"
                    class="c-btn-join"
                    >Mulai Rapat</ion-button
                >
                <ion-ripple-effect></ion-ripple-effect>
            </ion-card>
            <ion-card
                v-for="meet in histories"
                :key="meet.meetingNum"
                class="ion-activatable ripple-parent rectangle"
                @click="
                    ionRouter.navigate('/detail-meet', 'forward', 'replace')
                ">
                <div class="status-card-meet">
                    {{ stateFormat(meet.state) }}
                </div>
                <ion-card-header>
                    <ion-card-title>{{ meet.subject }}</ion-card-title>
                    <ion-card-subtitle
                        >{{ meet.startDateVal }} {{ meet.startTimeVal }} -
                        {{ meet.endTimeVal }}</ion-card-subtitle
                    >
                </ion-card-header>

                <ion-card-content>
                    <div class="pic-meet">
                        <ion-icon :icon="personCircle"></ion-icon>
                        {{ meet.hostName }}
                    </div>
                </ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
            </ion-card>
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
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonRow,
    IonCol,
    IonGrid,
    IonIcon,
    IonText,
    IonRippleEffect,
    useIonRouter,
    loadingController
} from '@ionic/vue'
import { personCircle } from 'ionicons/icons'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { IMeetingItem } from '../api/conf-api/interface/dashboard'
const store = useStore()
const ionRouter = useIonRouter()

const meetings = ref<IMeetingItem[]>([])
const histories = ref<IMeetingItem[]>([])

onMounted(async () => {
    meetingList()
    meetingPlans()
})
const meetingPlans = async () => {
  const option = {
    pageNum: 1,
    pageSize: 15
  }

  await store.dispatch('dashboard/meetingPlans',option)
};

const meetingList = async () => {
    const loading = await loadingController.create({
        message: 'Loading...',
        animated: true,
        backdropDismiss: false
    })
    loading.present()

    try {
        const res0 = await store.dispatch('dashboard/fetchList', {
            pageSize: '15',
            meetingState: '0'
        })
        const res1 = await store.dispatch('dashboard/fetchList', {
            pageSize: '15',
            meetingState: '1'
        })
        console.error('res0', res0)
        console.error('res1', res1)
        meetings.value = store.getters['dashboard/get'](
            'meetingList'
        ) as IMeetingItem[]
        histories.value = store.getters['dashboard/get'](
            'historyList'
        ) as IMeetingItem[]
        console.error('meets', meetings.value)
    } catch (error) {
        console.error(error)
    }
    
    loading.dismiss()
}
const stateFormat = (state: number) => {
    switch (state) {
        case 3:
            return 'Berakhir'
        case 2:
            return 'Berlangsung'
        case 1:
            return 'Akan Diselenggarakan'
        case 0:
            return 'Belum Dimulai'
        case -2:
            return 'Kadaluarsa'
        default:
            return 'NOTSET'
    }
}
</script>
