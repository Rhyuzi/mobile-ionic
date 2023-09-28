<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title>Detail Rapat</ion-title>
                <ion-buttons slot="end">
                    <ion-button><ion-icon :icon="trash"></ion-icon></ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-segment :value="segmentVal">
                <ion-segment-button value="0" @click="setVal('0')">
                    <ion-label>Info Rapat</ion-label>
                </ion-segment-button>
                <ion-segment-button value="1" @click="setVal('1')">
                    <ion-label>Peserta</ion-label>
                </ion-segment-button>
                <ion-segment-button value="2" @click="setVal('2')">
                    <ion-label>Undangan</ion-label>
                </ion-segment-button>
            </ion-segment>
            <div v-if="segmentVal === '0'">
                <ion-card>
                    <ion-item-divider>
                        <ion-label>Informasi Rapat</ion-label>
                    </ion-item-divider>
                    <ion-item>
                        <ion-input
                            label="Subjek"
                            label-placement="fixed"
                            placeholder="Tessss"
                            readonly></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input
                            label="ID Rapat"
                            label-placement="fixed"
                            placeholder="831303"
                            readonly></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input
                            label="Waktu Mulai"
                            label-placement="fixed"
                            placeholder="05/25/2023 02:35PM"
                            readonly></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input
                            label="Zona Waktu"
                            label-placement="fixed"
                            placeholder="Jakarta"
                            readonly></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input
                            label="Durasi"
                            label-placement="fixed"
                            placeholder="1 Jam"
                            readonly></ion-input>
                    </ion-item>
                </ion-card>
                <ion-card>
                    <ion-item-divider>
                        <ion-label>Informasi Host</ion-label>
                    </ion-item-divider>
                    <ion-item>
                        <ion-input
                            label="Kode Host"
                            label-placement="fixed"
                            placeholder="0236"
                            readonly></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input
                            label="Ruang Rapat"
                            label-placement="fixed"
                            placeholder="WebRTC Browser"
                            readonly></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input
                            label="Penyelenggara"
                            label-placement="fixed"
                            placeholder="Admin (utha.suryo@jumpa.id)"
                            readonly></ion-input>
                    </ion-item>
                </ion-card>
                <ion-card>
                    <ion-item-divider>
                        <ion-label>Informasi Lainnya</ion-label>
                    </ion-item-divider>
                    <ion-item :detail="true">
                        <ion-label>Kontrol Peserta</ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-input
                            label="Pengingat Email"
                            label-placement="fixed"
                            placeholder="15 Menit"
                            readonly></ion-input>
                    </ion-item>
                </ion-card>
            </div>
            <div v-if="segmentVal === '1'">
                <ion-item-divider>
                    <ion-label>Host Rapat (1)</ion-label>
                </ion-item-divider>
                <ion-item>
                    <ion-avatar slot="start">
                        <img
                            alt="Silhouette of a person's head"
                            src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                    <div class="ilpes">
                        <ion-label> Admin Host </ion-label>
                        <ion-text class="ilp txr">utha.suryo@jumpa.id</ion-text>
                        <ion-text class="ilp">--</ion-text>
                        <ion-text class="ilp txr">05:12PM - 05:13PM</ion-text>
                    </div>
                </ion-item>
                <ion-item-divider>
                    <ion-label>Peserta (12)</ion-label>
                </ion-item-divider>
                <ion-item v-for="i in 12" :key="i">
                    <ion-avatar slot="start">
                        <img
                            alt="Silhouette of a person's head"
                            src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                    <div class="ilpes">
                        <ion-label> Peserta ({{ i }}) </ion-label>
                        <ion-text class="ilp txr"
                            >peserta{{ i }}@jumpa.id</ion-text
                        >
                        <ion-text class="ilp">--</ion-text>
                        <ion-text class="ilp txr">05:12PM - 05:13PM</ion-text>
                    </div>
                </ion-item>
            </div>
        </ion-content>

        <ion-footer v-if="segmentVal === '1'">
            <ion-toolbar>
                <div class="btn-grid-peserta">
                    <ion-button size="small" shape="round" color="primary">Jadwalkan Ulang</ion-button>
                    <ion-button size="small" shape="round" color="dark">Mulai Ulang Rapat</ion-button>
                </div>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonFooter,
    IonPage,
    IonHeader,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonToolbar,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonButton,
    IonIcon,
    IonCard,
    IonItemDivider,
    IonItem,
    IonInput,
    IonAvatar,
    IonText
} from '@ionic/vue'
import { trash } from 'ionicons/icons'
import { ref } from 'vue'

const segmentVal = ref('0')

const setVal = (val: string) => {
    segmentVal.value = val
    console.error(segmentVal.value)
}
</script>
