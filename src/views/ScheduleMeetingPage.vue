<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title>Buat Rapat</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item-divider>
                <ion-label>Informasi Rapat</ion-label>
            </ion-item-divider>
            <ion-item
                button
                :detail="true"
                @click="
                    ionRouter.navigate('/select-room', 'forward', 'replace')
                ">
                <ion-label>
                    <h3>Ruang Rapat</h3>
                </ion-label>
            </ion-item>
            <ion-item>
                <ion-input
                    label="Subjek"
                    label-placement="fixed"
                    placeholder="Masukan Subjek"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label> Waktu Mulai </ion-label>
                <ion-datetime-button datetime="datetime"></ion-datetime-button>

                <ion-modal :keep-contents-mounted="true">
                    <ion-datetime id="datetime"></ion-datetime>
                </ion-modal>
            </ion-item>
            <ion-item>
                <ion-label> Durasi </ion-label>
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <ion-select aria-label="fruit" placeholder="Jam">
                                <ion-select-option
                                    v-for="(item, index) in 25"
                                    :key="index"
                                    :value="index"
                                    >{{ index }} Jam</ion-select-option
                                >
                            </ion-select>
                        </ion-col>
                        <ion-col>
                            <ion-select aria-label="fruit" placeholder="Menit">
                                <ion-select-option
                                    v-for="(item, index) in 5"
                                    :key="index"
                                    :value="(index + 1) * 10"
                                    >{{
                                        (index + 1) * 10
                                    }}
                                    Menit</ion-select-option
                                >
                            </ion-select>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-item>
            <ion-item>
                <ion-input
                    label="Kata Sandi"
                    type="password"
                    placeholder="Masukan Kata Sandi"></ion-input>
            </ion-item>

            <ion-item-divider>
                <ion-label>Undang Peserta</ion-label>
            </ion-item-divider>
            <ion-item button :detail="true" @click="setContactOpen(true)">
                <ion-label>
                    <h3>Undang (0)</h3>
                </ion-label>
            </ion-item>

            <ion-item-divider>
                <ion-label>Terjadwal</ion-label>
            </ion-item-divider>
            <ion-item>
                <ion-toggle> Izinkan pesan text</ion-toggle>
            </ion-item>

            <ion-button
                fill="clear"
                color="primary"
                expand="full"
                style="margin-top: 10px"
                size="small"
                @click="setOpen(true)"
                >Pengaturan Lebih Lanjut</ion-button
            >

            <ion-button color="primary" expand="full" style="margin-top: 10px"
                >Jadwalkan Rapat</ion-button
            >
            <!-- more option -->
            <ion-modal :is-open="isOpen">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Pengaturan Lebih Lanjut</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="setOpen(false)"
                                >Simpan</ion-button
                            >
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content>
                    <ion-item-divider>
                        <ion-label>Pengaturan Rapat</ion-label>
                    </ion-item-divider>
                    <ion-item>
                        <ion-toggle> Kunci Rapat</ion-toggle>
                    </ion-item>
                    <ion-item-divider>
                        <ion-label>Kontrol Peserta</ion-label>
                    </ion-item-divider>
                    <ion-item>
                        <ion-toggle :checked="true">
                            Bisukan peserta saat masuk
                        </ion-toggle>
                    </ion-item>
                    <ion-item>
                        <ion-toggle :checked="true">
                            Tampilkan daftar peserta</ion-toggle
                        >
                    </ion-item>
                    <ion-item>
                        <ion-toggle> Izinkan pesan text</ion-toggle>
                    </ion-item>
                    <ion-item>
                        <ion-toggle> Nonaktifkan Presentasi</ion-toggle>
                    </ion-item>
                    <ion-item-divider>
                        <ion-label>Penyelenggara</ion-label>
                    </ion-item-divider>
                    <ion-item>
                        <ion-input
                            label="Penyelenggara"
                            placeholder="Masukan Penyelenggara"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input
                            label="Email"
                            type="email"
                            placeholder="Masukan Email"></ion-input>
                    </ion-item>
                    <ion-item-divider>
                        <ion-label>Lainnya</ion-label>
                    </ion-item-divider>
                    <ion-item>
                        <ion-input
                            label="Deskripsi Rapat"
                            label-placement="stacked"
                            placeholder="Silahkan masukan deskripsi rapat"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input
                            label="Agenda Rapat"
                            label-placement="stacked"
                            placeholder="Silahkan masukan agenda rapat"></ion-input>
                    </ion-item>
                </ion-content>
            </ion-modal>
            <!-- select contact -->
            <ion-modal :is-open="isContactOpen">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Undang Peserta</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="setContactOpen(false)"
                                >Simpan</ion-button
                            >
                        </ion-buttons>
                    </ion-toolbar>
                    <ion-toolbar>
                        <ion-searchbar
                            placeholder="Cari Kontak"></ion-searchbar>
                    </ion-toolbar>
                </ion-header>
                <ion-content>
                    <ion-item v-for="(item, index) in 50" :key="index">
                        <ion-checkbox> User {{ index + 1 }}</ion-checkbox>
                    </ion-item>
                    <br />
                    <br />
                    <br />
                </ion-content>
            </ion-modal>
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
    IonLabel,
    IonContent,
    IonInput,
    IonButton,
    IonModal,
    IonGrid,
    IonRow,
    IonCol,
    IonSelect,
    IonSelectOption,
    IonItemDivider,
    IonToggle,
    IonSearchbar,
    IonCheckbox,
    useIonRouter,
    IonDatetime,
    IonDatetimeButton
} from '@ionic/vue'
import { ref } from 'vue'
const ionRouter = useIonRouter()

const isOpen = ref(false)
const isContactOpen = ref(false)

const setOpen = (state: boolean) => {
    isOpen.value = state
}
const setContactOpen = (state: boolean) => {
    isContactOpen.value = state
}
</script>
