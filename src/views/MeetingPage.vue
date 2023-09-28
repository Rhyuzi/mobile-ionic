<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button id="network"
                        ><ion-icon :color="networkStatus.color" :icon="networkStatus.icon"></ion-icon>
                    </ion-button>
                    <ion-popover
                        trigger="network"
                        side="bottom"
                        alignment="start">
                        <ion-content>
                            <ion-item>
                                <ion-label>
                                    <p>Status Jaringan</p>
                                    <h2 :class="`text-${networkStatus.color}`">{{ networkStatus.msg }}</h2>
                                </ion-label>
                            </ion-item>
                            <ion-item>
                                <ion-label>
                                    <p>Server</p>
                                    <h2>{{ roomInformation.mediaRegion }}</h2>
                                </ion-label>
                            </ion-item>

                            <ion-item-divider> Audio </ion-item-divider>
                            <ion-item>
                                <ion-icon
                                    :icon="wifi"
                                    color="secondary"
                                    slot="start"></ion-icon>
                                <ion-label> {{ audioPackLoss?.up || "None" }} </ion-label>
                            </ion-item>
                            <ion-item>
                                <ion-icon
                                    :icon="wifi"
                                    color="danger"
                                    slot="start"></ion-icon>
                                <ion-label> {{ audioPackLoss?.down || "None"}} , OPUS</ion-label>
                            </ion-item>
                            <ion-item-divider> Video </ion-item-divider>
                            <ion-item>
                                <ion-icon
                                    :icon="wifi"
                                    color="secondary"
                                    slot="start"></ion-icon>
                                <ion-label> {{ videoPackLoss?.up || "None"}} </ion-label>
                            </ion-item>
                            <ion-item>
                                <ion-icon
                                    :icon="wifi"
                                    color="danger"
                                    slot="start"></ion-icon>
                                <ion-label> {{ videoPackLoss?.down || "None"}}</ion-label>
                            </ion-item>
                            <ion-item-divider> Presentasi </ion-item-divider>
                            <ion-item>
                                <ion-icon
                                    :icon="wifi"
                                    color="secondary"
                                    slot="start"></ion-icon>
                                <ion-label> {{ sharePackLoss?.up || "None"}} </ion-label>
                            </ion-item>
                            <ion-item>
                                <ion-icon
                                    :icon="wifi"
                                    color="danger"
                                    slot="start"></ion-icon>
                                <ion-label> {{ sharePackLoss?.down || "None"}} </ion-label>
                            </ion-item>
                        </ion-content>
                    </ion-popover>
                    <ion-button id="speaker"><ion-icon :icon="volumeHigh"></ion-icon>
                    </ion-button>
                    <ion-popover
                        trigger="speaker"
                        side="bottom"
                        alignment="start">
                        <ion-content>
                            <ion-item button>
                                <ion-icon
                                    :icon="volumeMute"
                                    color="danger"
                                    slot="start"></ion-icon>
                                <ion-label> Senyap </ion-label>
                            </ion-item>
                            <ion-item button>
                                <ion-icon
                                    :icon="volumeHigh"
                                    color="primary"
                                    slot="start"></ion-icon>
                                <ion-label> Speaker </ion-label>
                            </ion-item>
                            <ion-item button>
                                <ion-icon
                                    :icon="ear"
                                    color="primary"
                                    slot="start"></ion-icon>
                                <ion-label> Earpiece </ion-label>
                            </ion-item>
                        </ion-content>
                    </ion-popover>
                </ion-buttons>
                <ion-title id="detail" style="width: 100%"
                    >{{ roomInformation.meetingNum }} <ion-icon :icon="chevronDown"></ion-icon>
                </ion-title>
                <ion-popover
                    trigger="detail"
                    side="bottom"
                    alignment="center"
                    size="cover">
                    <ion-content>
                        <ion-item>
                            <ion-text>
                                <h4>{{ roomInformation.meetingTheme }}</h4>
                            </ion-text>
                        </ion-item>
                        <ion-item>
                            <ion-input
                                label="ID Rapat"
                                label-placement="stacked"
                                :placeholder="roomInformation.meetingNum"
                                readonly></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input
                                label="Host"
                                label-placement="stacked"
                                :placeholder="roomInformation.creator"
                                readonly></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input
                                label="Waktu Rapat"
                                label-placement="stacked"
                                :placeholder="roomInformation.meetingTime"
                                readonly></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input
                                label="Serve"
                                label-placement="stacked"
                                :placeholder="roomInformation.mediaRegion"
                                readonly></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input
                                id="tautan-rapat"
                                label="Tautan Rapat"
                                label-placement="stacked"
                                :placeholder="roomInformation.roomUrl"
                                readonly></ion-input>
                        </ion-item>
                        <ion-button @click="copyToClipboard"
                            color="primary"
                            shape="round"
                            expand="full"
                            style="margin: 10px"
                            >Salin tautan</ion-button>
                    </ion-content>
                </ion-popover>
                <ion-buttons slot="end">
                    <ion-text> {{ meetingTimer }} </ion-text>
                    <ion-button id="logout" @click="logout">
                        <ion-icon color="danger" :icon="logOut"></ion-icon>
                    </ion-button>
                    <!-- <ion-alert
                        trigger="logout"
                        header="Apakah anda yakin ingin mengakhiri rapat atau meninggalkan rapat?"
                        :buttons="alertButtons">
                    </ion-alert> -->
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <!-- Meeting Layout -->
        <ion-content class="ion-padding">
            
            <!-- VIDEOOOOO -->
            <div ref="video" id="video" class="video"></div>
            <div class="d-flex" id="video-local"></div>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-buttons class="act-meet">
                    <div v-if="!isMic" class="act-btn off" @click="openMic(true)">
                        <ion-icon :icon="micOff"></ion-icon>
                        <ion-label>Mikrofon</ion-label>
                    </div>

                    <div v-else class="act-btn" @click="openMic(false)">
                        <ion-icon :icon="mic"></ion-icon>
                        <ion-label>Mikrofon</ion-label>
                    </div>

                    <div v-if="isCam" class="act-btn" @click="openCam(false)">
                        <ion-icon :icon="videocam"></ion-icon>
                        <ion-label>Video</ion-label>
                    </div>

                    <div v-if="!isCam" class="act-btn off" @click="openCam(true)">
                        <ion-icon :icon="videocamOff"></ion-icon>
                        <ion-label>Video</ion-label>
                    </div>
                    
                    <div class="act-btn" id="bagikan">
                        <ion-icon :icon="shareSocial"></ion-icon>
                        <ion-label>Bagikan</ion-label>
                    </div>
                    <ion-popover
                        trigger="bagikan"
                        side="top"
                        alignment="center">
                        <ion-content>
                            <ion-item button>
                                <ion-icon
                                    :icon="laptop"
                                    slot="start"></ion-icon>
                                <ion-label> Bagikan Layar </ion-label>
                            </ion-item>
                            <ion-item button>
                                <ion-icon
                                    :icon="albums"
                                    slot="start"></ion-icon>
                                <ion-label> Bagikan Papan Tulis </ion-label>
                            </ion-item>
                            <ion-item button>
                                <ion-icon
                                    :icon="docIcon"
                                    slot="start"></ion-icon>
                                <ion-label> Bagikan Dokumen </ion-label>
                            </ion-item>
                        </ion-content>
                    </ion-popover>
                    <div class="act-btn" id="lainnya">
                        <ion-icon :icon="options"></ion-icon>
                        <ion-label>Lainnya</ion-label>
                    </div>
                    <ion-popover trigger="lainnya" side="top" alignment="end">
                        <ion-content>
                            <ion-item button @click="setParticipantOpen(true)">
                                <ion-icon
                                    :icon="people"
                                    slot="start"></ion-icon>
                                <ion-label> Peserta ({{ searchResult.length }}) </ion-label>
                            </ion-item>
                            <ion-item button @click="setChatOpen(true)">
                                <ion-icon
                                    :icon="chatbubble"
                                    slot="start"></ion-icon>
                                <ion-label> Pesan Text </ion-label>
                            </ion-item>
                            <ion-item button>
                                <ion-icon :icon="play" slot="start"></ion-icon>
                                <ion-label> Rekam Rapat </ion-label>
                            </ion-item>
                            <!-- <ion-item button @click="setVidSettingOpen(true)">
                                <ion-icon
                                    :icon="videocam"
                                    slot="start"></ion-icon>
                                <ion-label> Pengaturan Video </ion-label>
                            </ion-item> -->
                            <ion-item button @click="setControlOpen(true)">
                                <ion-icon
                                    :icon="personCircle"
                                    slot="start"></ion-icon>
                                <ion-label> Kontrol Rapat </ion-label>
                            </ion-item>
                        </ion-content>
                    </ion-popover>
                </ion-buttons>
            </ion-toolbar>
        </ion-footer>
        <!-- modal -->
        <!-- modal Chat -->
        <ion-modal :is-open="isChatOpen">
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-icon
                            size="large"
                            style="margin-left: 10px"
                            :icon="arrowBack"
                            @click="setChatOpen(false)"></ion-icon>
                    </ion-buttons>
                    <ion-title>Percakapan Grup</ion-title>
                    <ion-buttons slot="end">
                        <ion-icon
                            size="large"
                            style="margin-right: 10px"
                            :icon="trash"
                            @click="setChatOpen(false)"></ion-icon>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
                <div v-for="message in messages" :key="message.id">
                    <template v-if="message.isSelf">
                        <div class="item-chat me">
                            <div class="h-ch">
                                <p><b> You </b></p>
                                <p>17:57</p>
                            </div>
                            <div class="bbl-chat">
                                {{ message.text }}
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="item-chat">
                            <div class="h-ch">
                                <p>
                                    <b> {{ message.senderName }} </b>
                                </p>
                                <p>17:57</p>
                            </div>
                            <div class="bbl-chat">
                                {{ message.text }}
                            </div>
                        </div>
                    </template>
                </div>
            </ion-content>
            <ion-footer>
                <ion-toolbar>
                    <ion-textarea
                        label="Outline textarea"
                        label-placement="floating"
                        fill="outline"
                        placeholder="Enter text"></ion-textarea>
                </ion-toolbar>
            </ion-footer>
        </ion-modal>
        <!-- modal Participant -->
        <ion-modal :is-open="isParticipantOpen">
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-icon
                            size="large"
                            style="margin-left: 10px"
                            :icon="arrowBack"
                            @click="setParticipantOpen(false)"></ion-icon>
                    </ion-buttons>
                    <ion-title v-if="!isSearch">Semua Peserta ({{ searchResult.length }})</ion-title>
                    <ion-buttons v-if="!isSearch" slot="end">
                        <ion-icon
                            size="large"
                            style="margin-right: 10px"
                            :icon="addOutline"
                            @click="setParticipantOpen(false)"></ion-icon>
                        <ion-icon
                            size="large"
                            style="margin-right: 10px"
                            :icon="search"
                            @click="openSearch(true)"></ion-icon>
                    </ion-buttons>
                    <ion-searchbar v-if="isSearch" show-cancel-button="always" cancel-button-text="Cancel" @ionCancel="openSearch(false)" @ionInput="searhData"></ion-searchbar>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-item-divider>
                    <ion-label v-if="searchResult.length !== 0">Host ({{ getLengthIsHost }})</ion-label>
                </ion-item-divider>
                <div v-for="host in searchResult" :key="host.id">
                <ion-item v-if="host.role == 'host'">
                    <ion-avatar slot="start">
                        <img
                            alt="Silhouette of a person's head"
                            src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                    
                    <ion-label> {{ host.name }} </ion-label>
                    <ion-buttons>
                        <ion-icon v-if="host.camSta != 'Close'"
                            :icon="videocam"
                            color="primary"
                            size="default"
                            style="margin-right: 10px"></ion-icon>
                        <ion-icon v-else
                            :icon="videocamOff"
                            color="danger"
                            size="default"
                            style="margin-right: 10px"></ion-icon>
                        <ion-icon v-if="host.micSta == 'Normal'"
                            :icon="mic"
                            color="primary"
                            size="default"
                            style="margin-right: 10px"></ion-icon>
                        <ion-icon v-else
                            :icon="micOff"
                            color="danger"
                            size="default"
                            style="margin-right: 10px"></ion-icon>
                    </ion-buttons>
                </ion-item>
            </div>
                <ion-item-divider>
                    <ion-label v-if="searchResult.length !== 0">Peserta ({{ getLengthIsNotHost }})</ion-label>
                </ion-item-divider>
            <div v-for="peserta in searchResult" :key="peserta.id">
                <ion-item v-if="peserta.role != 'host'">
                    <ion-avatar slot="start">
                        <img
                            alt="Silhouette of a person's head"
                            src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                    <ion-label>{{ peserta.name }} </ion-label>
                    <ion-buttons>
                        <ion-icon v-if="peserta.camSta != 'Close'"
                            :icon="videocam"
                            color="primary"
                            size="default"
                            style="margin-right: 10px"></ion-icon>
                        <ion-icon v-else
                            :icon="videocamOff"
                            color="danger"
                            size="default"
                            style="margin-right: 10px"></ion-icon>
                        <ion-icon v-if="peserta.micSta == 'Normal'"
                            :icon="mic"
                            color="primary"
                            size="default"
                            style="margin-right: 10px"></ion-icon>
                        <ion-icon v-if="peserta.micSta != 'Normal'"
                            :icon="micOff"
                            color="danger"
                            size="default"
                            style="margin-right: 10px"></ion-icon>
                    </ion-buttons>
                </ion-item>
                </div>
            </ion-content>
        </ion-modal>
        <!-- modal kontrol rapat -->
        <ion-modal :is-open="isControlOpen">
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-icon
                            size="large"
                            style="margin-left: 10px"
                            :icon="arrowBack"
                            @click="setControlOpen(false)"></ion-icon>
                    </ion-buttons>
                    <ion-title>Kontrol Rapat</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-item button> Bisukan Semua </ion-item>
                <ion-item button> Turunkan Semua Tangan </ion-item>
                <ion-item>
                    <ion-toggle :checked="true">
                        Izinkan lihat aftar peserta</ion-toggle>
                </ion-item>
                <ion-item>
                    <ion-toggle :checked="true">
                        Aktifkan Percakapan Peserta</ion-toggle>
                </ion-item>
                <ion-item>
                    <ion-toggle :checked="true">
                        Bisukan peserta dalam antrian</ion-toggle>
                </ion-item>
                <ion-item>
                    <ion-toggle> Rapat Terkunci</ion-toggle>
                </ion-item>
            </ion-content>
        </ion-modal>
        <!-- modal Pengaturan Video-->
        <ion-modal :is-open="isVidSettingOpen">
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-icon
                            size="large"
                            style="margin-left: 10px"
                            :icon="arrowBack"
                            @click="setVidSettingOpen(false)"></ion-icon>
                    </ion-buttons>
                    <ion-title>Pengaturan Video</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-item>
                    <ion-toggle :checked="true">
                        Tampilkan Video Lokal</ion-toggle>
                </ion-item>
                <ion-item>
                    <ion-label> Frekuensi frame video </ion-label>
                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                <ion-select
                                    aria-label="fruit"
                                    placeholder="fps">
                                    <ion-select-option
                                        >15 fps</ion-select-option>
                                    <ion-select-option
                                        >30 fps</ion-select-option>
                                </ion-select>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-item>
            </ion-content>
        </ion-modal>

        <ion-toast
            :is-open="isOpen"
            :message="message"
            :duration="5000"
            @didDismiss="setOpenToast(false)"
        ></ion-toast>
    </ion-page>
</template>

<script setup lang="ts">
import { Data,PackLossRate } from '@/interfaces/jumpaRtcSDK';
import {
    IonTextarea,
    IonAvatar,
    IonModal,
    IonToggle,
    IonItemDivider,
    IonGrid,
    IonRow,
    IonCol,
    IonSelect,
    IonSelectOption,
    IonPage,
    IonHeader,
    IonToolbar,
    IonButton,
    IonButtons,
    IonTitle,
    IonIcon,
    IonFooter,
    IonLabel,
    IonPopover,
    IonContent,
    IonItem,
    IonInput,
    IonText,
    IonAlert,
    IonToast,
    alertController,
    IonSearchbar
} from '@ionic/vue'
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import {
    ear,
    addOutline,
    search,
    volumeMute,
    document as docIcon,
    albums,
    laptop,
    volumeHigh,
    wifi,
    logOut,
    chevronDown,
    micOff,
    videocamOff,
    shareSocial,
    options,
    people,
    chatbubble,
    play,
    videocam,
    personCircle,
    arrowBack,
    trash,
    mic,
    text,
    wifiOutline,
    wifiSharp
} from 'ionicons/icons'
import { nextTick } from 'vue';
import { ref,onMounted,computed,reactive,watch } from 'vue'
import router from "@/router";

onMounted(async () => {
    await listParti()
    // console.error("data user",statusNetwork)
    nextTick(() =>
        addListener()
    )
    setInterval(() => {
        getPackLossRate()
        getCount()
        console.debug("Timer",meetingTimer.value)
    }, 1000)
})

const getLengthIsHost = computed(() => {
  const participantArray = Object.values(getListParticipant.value || {});
  return participantArray.filter(data => data.role === 'host').length;
});

const getLengthIsNotHost = computed(() => {
  const participantArray = Object.values(getListParticipant.value || {});
  return participantArray.filter(data => data.role !== 'host').length;
});

const valueSearch = ref("")
const searhData = (event: Event) => {
    const target = event.target as HTMLInputElement
    valueSearch.value = target.value;
    console.warn("SEARCH ..",target.value)
} 
const searchResult = computed(() => {
    const participantArray = Object.values(getListParticipant.value || {});
    return participantArray.filter(data => data.name.toLowerCase().includes(valueSearch.value.toLowerCase()))
})

const message = ref("");
const isOpen = ref(false);
const setOpenToast = (state: boolean) => {
  isOpen.value = state;
  if (!state) {
    message.value = "";
  }
};


const messages = ref([
    {
        id: 1,
        senderAvatar: 'https://dummyurl.com/avatar1.jpg',
        senderName: 'John',
        text: 'Hello!',
        isSelf: false
    },
    {
        id: 2,
        senderAvatar: 'https://dummyurl.com/self-avatar.jpg',
        senderName: 'You',
        text: 'Hi there!',
        isSelf: true
    },
    {
        id: 3,
        senderAvatar: 'https://dummyurl.com/self-avatar.jpg',
        senderName: 'You',
        text: 'oyy!',
        isSelf: true
    },
    {
        id: 4,
        senderAvatar: 'https://dummyurl.com/self-avatar.jpg',
        senderName: 'You',
        text: 'HAHAHA!',
        isSelf: true
    }
])

const copyToClipboard = () => {
    navigator.clipboard.writeText(roomInformation.roomUrl)
    setOpenToast(true)
    message.value = "Tautan berhasil disalin"
}

const logout = async () => {
    const isHost = false
    const leaveIsHost = jumpaRtcSDK.getUserInfo().role != "meeting_regular"
    ? [
        {
            text: "Cancel",
            cssClass: "cancel-button",
            id: "cancel-button"
            // handler: () => {

            // }
        },
        {
            text: "Keluar Rapat",
            cssClass: "exit=button",
            id: "exit=button",
            handler: () => {
                jumpaRtcSDK.exitRoom()
                location.href = '/join'
            }
        },
        {
            text: "Akhiri Rapat",
            cssClass: "end-button",
            id: "end-button",
            handler: () => {
                jumpaRtcSDK.closeRoom()
                location.href = '/join'
            }
        }
        ]
    : [
        {
            text: "Cancel",
            cssClass: "cancel-button",
            id: "cancel-button",
            // handler: () => {

            // }
        },
        {
            text: "Keluar Rapat",
            cssClass: "exit-button",
            id: "cancel-button",
            handler: () => {
                jumpaRtcSDK.exitRoom()
                location.href = '/join'
            }
        }
    ];

    const alert = await alertController.create({
        header: "Keluar Rapat",
        message: "Apakah anda yakin ingin mengakhiri rapat atau meninggalkan rapat?",
        cssClass: 'my-custom-alert',
        buttons: leaveIsHost
    })
    alert.present()
}

const networkStatus = reactive({
    color: "primary",
    icon: wifi,
    msg: "Sangat Baik"
})

const roomInformation = jumpaRtcSDK.getRoomInformation()
const getListParticipant = ref<Data>()

const listParti = async () => {
    getListParticipant.value = await jumpaRtcSDK.getUserList()
}

const meetingTimer = ref("00:00:00")

const getCount = async () => {
    const ampm = jumpaRtcSDK.getRoomInformation().startTime.split(' ')[5]
    let hNow: any

    if (hNow < 12 && ampm == "PM") {
        const y = new Date().toTimeString().split(' ')[0].split(':')[0]
        hNow = Number(y) - 12
    }else{
        hNow = new Date().toTimeString().split(' ')[0].split(':')[0]
    }
    const mNow = new Date().toTimeString().split(' ')[0].split(':')[1]
    const sNow = new Date().toTimeString().split(' ')[0].split(':')[2]

    const typeTime = jumpaRtcSDK.getRoomInformation().meetingTime.split(' ')[5]
    const localT = `${typeTime.split(':')[0].split('(')[1]}${typeTime.split(':')[1].split(')')[0]}`
    const tamp = `${jumpaRtcSDK.getRoomInformation().startTime} ${localT}`

    const locateTime = new Date(tamp).toLocaleString()
    const hCreatedMeeting = locateTime.split(' ')[1].split(':')[0]
    const mCreatedMeeting = locateTime.split(' ')[1].split(':')[1]
    const sCreatedMeeting = locateTime.split(' ')[1].split(':')[0]

    const hMinus = Math.floor((hNow-Number(hCreatedMeeting))*60)
    const mMinus = Math.floor((Number(mNow) - Number(mCreatedMeeting)))
    const cek1 = Math.abs(hMinus+mMinus)
    const hours = Math.floor(cek1 / 60)
    const minutes = cek1 % 60
    const second = sNow

    meetingTimer.value = `${Math.abs(hours) < 10 ? '0' : ''}${Math.abs(hours)}:${Math.abs(minutes) < 10 ? '0' : ''}${Math.abs(minutes)}:${Math.abs(Number(second)) < 10 ? '0' : ''}${Math.abs(Number(second))}`
}

const isCam = ref(false)
const isMic = ref(false)

const openCam = (state: boolean) => {

    try {
        if (state) {
            jumpaRtcSDK.sendMainVideoStream('',(err) => {
                console.error("error start camera",err);
            })
        }else{
            jumpaRtcSDK.stopSendMainVideoStream((err) => {
                console.error("error stop camera",err);
            })
        }
        isCam.value = state
    } catch (error) {
        console.error("Error Open cam", error)
    }

}
const audioPackLoss = ref<PackLossRate>()
const videoPackLoss = ref<PackLossRate>()
const sharePackLoss = ref<PackLossRate>()

const getPackLossRate = () => {
    audioPackLoss.value = jumpaRtcSDK.viewAudioPackLossRate()
    videoPackLoss.value = jumpaRtcSDK.viewVideoPackLossRate()
    sharePackLoss.value = jumpaRtcSDK.viewDemoVideoPackLossRate()
}

const openMic = (state: boolean) => {
    try {
        if (state) {
            jumpaRtcSDK.setAudioDevice(jumpaRtcSDK.getAudioDevices, (err) => {
                console.log('set audio', err);
            });
        }else{
            jumpaRtcSDK.stopLocalAudio((err) => {
                console.log('stop local audio ', err);
            });
        }
        isMic.value = state
    } catch (error) {
        console.error("Error Open cam", error)
    }
}

const isControlOpen = ref(false)

const setControlOpen = (state: boolean) => {
    isControlOpen.value = state
}
const isVidSettingOpen = ref(false)
const isSearch = ref(false)

const setVidSettingOpen = (state: boolean) => {
    isVidSettingOpen.value = state
}
const isParticipantOpen = ref(false)

const setParticipantOpen = (state: boolean) => {
    listParti()
    console.debug("list parti",searchResult)
    isParticipantOpen.value = state
}
const openSearch = (state: boolean) => {
    isSearch.value = state
}

const isChatOpen = ref(false)

const setChatOpen = (state: boolean) => {
    isChatOpen.value = state
}

const onEvent = async (eventName: any, data: any) => {
    switch (eventName) {
        case jumpaRtcSDK.EVENT_JOIN_MEETING_SUCCESS:
            console.info('EVENT_JOIN_MEETING_SUCCESS', data);
            break;
        case jumpaRtcSDK.EVENT_JOIN_MEETING_ERROR:
            console.info('EVENT_JOIN_MEETING_ERROR', data);
            break;
        case jumpaRtcSDK.EVENT_MEETING_PREPARATION_START:
            console.info('EVENT_MEETING_PREPARATION_START', data);
            break;
        case jumpaRtcSDK.EVENT_MEETING_START:
            console.info('EVENT_MEETING_START', data);
            break;
        case jumpaRtcSDK.EVENT_USER_NUMBER_CHANGE:
            console.error('EVENT_USER_NUMBER_CHANGE', data);
            listParti()
            console.error('getListParticipant', getListParticipant);
            console.error('searchResult', searchResult);
            break;
        case jumpaRtcSDK.EVENT_SILENT_OUTPUT_DEVICE_DETECTED:
            console.info('EVENT_SILENT_OUTPUT_DEVICE_DETECTED', data);
            break;
        case jumpaRtcSDK.EVENT_REMOTE_AUDIO_PLAYER_BIND_STREAM:
            if (data) {
                console.info(
                    'EVENT_REMOTE_AUDIO_PLAYER_BIND_STREAM',
                    data
                );
            }
            break;
        case jumpaRtcSDK.EVENT_MAIN_VIDEO_PLAYER_BIND_STREAM:
            if (data) {
                console.error('EVENT_MAIN_VIDEO_PLAYER_BIND_STREAM',data);
                data.setAttribute('style','width: 100%; max-width: 89vw; height: 100%;');
                data.setAttribute('autoplay', '');
                data.setAttribute('playsinline', 'true');
                data.setAttribute('webkit-playsinline', 'true');

                const videoMain = document.getElementById('video')
                const mainVideo = document.getElementById('mainVideo')

                // if (document.getElementById(data.id) == null || document.getElementById('mainVideo') == null) {
                    if (mainVideo == null) {
                        // console.error('cekkkkkk suuu');
                        // if(whiteboard != null || shareVideo != null){
                        //     miniLocal.style.display = 'none'
                        //     data.setAttribute('class', 'main-video miniver');
                        //     miniVideo.appendChild(data)
                        // }else{
                            videoMain?.appendChild(data);
                        // }
                    }
                // document.getElementById(data.id)?.play();
            }

            break;
        case jumpaRtcSDK.EVENT_PRESENT_VIDEO_PLAYER_BIND_STREAM:
            // Receive other share screen
            data.setAttribute(
                'style',
                'width: 100%; max-width: 89vw; height: 100%;'
            );
            // data.setAttribute('autoplay', '');
            // data.setAttribute('playsinline', 'true');
            // data.setAttribute('webkit-playsinline', 'true');
            // document.getElementById('video2').setAttribute('style','width: 80%;margin-left: 10%;margin-top: 30%;')
            // document.getElementById('video2').appendChild(data);
            // document.getElementById('shareVideo').play();
            break;
        case jumpaRtcSDK.EVENT_MEDIA_PLAYER_AUTOPLAY_PREVENTED:
            if (data) {
                console.log(
                    'EVENT_MEDIA_PLAYER_AUTOPLAY_PREVENTED: ',
                    data
                );
            }
            break;
        case jumpaRtcSDK.EVENT_MAIN_VIDEO_OPEN:
            console.log('main Video Open');
            if (data) {
                console.log('EVENT_MAIN_VIDEO_OPEN: ', data);
                data.setAttribute(
                    'style',
                    'width: 100%; max-width: 89vw; height: 100%;'
                );
                data.setAttribute('autoplay', '');
                data.setAttribute('playsinline', 'true');
                data.setAttribute('webkit-playsinline', 'true');

                if (
                    document.getElementById(data.id) == null ||
                    document.getElementById('mainVideo') == null
                ) {
                    document.getElementById('video')?.appendChild(data);
                }

                // document.getElementById(data.id).play();
            }
            break;
        case jumpaRtcSDK.EVENT_SHARED_CAMERA_PREVIEW_BIND_STREAM:
            if (data) {
                console.log(
                    'EVENT_SHARED_CAMERA_PREVIEW_BIND_STREAM: ',
                    data
                );
                data.setAttribute(
                    'style',
                    'width: 100%; max-width: 30vw; max-height: 150px; border-radius: 10px'
                );
                data.setAttribute('autoplay', '');
                data.setAttribute('playsinline', 'true');
                data.setAttribute('webkit-playsinline', 'true');

                if (document.getElementById(data.id)) {
                    document.getElementById(data.id)?.remove();
                }

                document.getElementById('video-local')?.appendChild(data)

                // document.getElementById(data.id)?.play();
            }
            break;
        case jumpaRtcSDK.EVENT_LOCAL_VIDEO_PREVIEW_PLAYER_BIND_STREAM:
            if (data) {
                console.info(
                    'EVENT_LOCAL_VIDEO_PREVIEW_PLAYER_BIND_STREAM',
                    data
                );
                data.setAttribute(
                    'style',
                    'position: absolute; top: -20vh; left: 10vw; z-index: 99999; width: 70vw; transform: translate(-50%, -50%)'
                );
                data.setAttribute('autoplay', '');
                data.setAttribute('playsinline', 'true');
                data.setAttribute('webkit-playsinline', 'true');
                document.getElementById('video')?.appendChild(data);
                document.getElementById('cameraPrev');
            }
            break;
        case jumpaRtcSDK.EVENT_OPEN_CAMERA_PREVIEW_VIDEO_OPEN:
            if (data) {
                console.info(
                    'EVENT_OPEN_CAMERA_PREVIEW_VIDEO_OPEN',
                    data
                );
                data.setAttribute(
                    'style',
                    'position: absolute; z-index: 9999; width: 100vw; transform: translate(-50%, -50%)'
                );
                data.setAttribute('autoplay', '');
                data.setAttribute('playsinline', 'true');
                data.setAttribute('webkit-playsinline', 'true');
                document.getElementById('video')?.appendChild(data);
            }
            break;
        case jumpaRtcSDK.EVENT_OPEN_CAMERA_PREVIEW_VIDEO_CLOSE:
            if (data) {
                console.log(
                    'EVENT_OPEN_CAMERA_PREVIEW_VIDEO_CLOSE',
                    data
                );
                if (document.getElementById(data.id)) {
                    document.getElementById(data.id)?.remove();
                }
            }
            break;
        case jumpaRtcSDK.EVENT_PRESENT_VIDEO_OPEN:
            if (data) {
                console.log('EVENT_PRESENT_VIDEO_OPEN', data);
            }
            break;
        case jumpaRtcSDK.EVENT_PRESENT_VIDEO_CLOSE:
            if (data) {
                // Receive other stop share screen
                console.log('EVENT_PRESENT_VIDEO_CLOSE', data);
                const shareVideo = document.getElementById(data.id);
                shareVideo?.remove();
            }
            break;
        case jumpaRtcSDK.EVENT_CLOSE_SHARE_PRESENT_VIDEO:
            if (data) {
                console.log('EVENT_CLOSE_SHARE_PRESENT_VIDEO', data);
            }
            break;
        case jumpaRtcSDK.EVENT_OPEN_DOCUMENT:
            if (data) {
                console.log('EVENT_OPEN_DOCUMENT', data);
                // const frame = document.getElementById(
                //     'whiteboard-iframe-upload'
                // );

                // const pattern =
                //     /(?:^|[ \t])((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/g;
                // const url =
                //     APP_DOMAIN + data.whiteboardAddr.split(pattern)[4];

                // frame.setAttribute('src', url);
            }
            break;
        case jumpaRtcSDK.EVENT_SPEECH_RECOGNITION_INFO_HANDLER:
            if (data) {
                console.log(
                    'EVENT_SPEECH_RECOGNITION_INFO_HANDLER',
                    data
                );
            }
            break;
        case jumpaRtcSDK.EVENT_CHAT_SYSTEM_MESSAGE_RECEIVED:
            if (data) {
                console.log('EVENT_CHAT_SYSTEM_MESSAGE_RECEIVED', data);
                listParti()
            }
            break;
        case jumpaRtcSDK.EVENT_CHAT_PANELIST_MESSAGE_RECEIVED:
            if (data) {
                console.log(
                    'EVENT_CHAT_PANELIST_MESSAGE_RECEIVED',
                    data
                );
            }
            break;
        case jumpaRtcSDK.EVENT_CHAT_GROUP_MESSAGE_RECEIVED:
            if (data) {
                console.log('EVENT_CHAT_GROUP_MESSAGE_RECEIVED', data);
                //     const chat = `<p class="sender">${data.from.name}</p>`+`<span class="delivered-time">${data.msg}</span>`
                //     const el = document.querySelector('.chat-section .chat')

                //    console.error('chat el', chat);
                //         console.error(' el', el);
                //     el.appendChild(chat)
                // let senderName = document.createElement('p');
                // let textMessages = document.createElement('p');
                // let timeChatMessages = document.createElement('span');
                // let chatBodyMessages = document.createElement('div');

                // senderName.setAttribute('class', 'sender');
                // // senderName.setAttribute('style','color:#c5f5b2; margin:0 0 2px;')
                // senderName.innerText = data.from.name;
                // textMessages.textContent = data.msg;
                // textMessages.setAttribute(
                //     'style',
                //     'word-break: break-word;'
                // );
                // timeChatMessages.setAttribute(
                //     'class',
                //     'delivered-time'
                // );
                // // timeChatMessages.setAttribute('style','color: #646060; float: right;')
                // const splitted = data.time.split(':');
                // const time = splitted[0] + ':' + splitted[1];

                // timeChatMessages.textContent = time;
                // chatBodyMessages.setAttribute('class', 'chat');
                // chatBodyMessages.setAttribute('id', 'chat');
                // // chatBodyMessages.setAttribute('style','width: max-content; max-width: 250px; padding: 6px 7px 8px 9px; margin: 0 0 15px; border-radius: 5px; background-color: #FFFF; bos-shadow: 0 1px 2px 0 rgba($color: #000000, $alpha: .25); position: relative;')
                // textMessages.appendChild(timeChatMessages);
                // chatBodyMessages.appendChild(senderName);
                // chatBodyMessages.appendChild(textMessages);

                // this.$store.dispatch('chats/setChat', chatBodyMessages);

                // if (
                //     document.getElementsByClassName('chat-container')
                //         .length > 0
                // ) {
                //     document
                //         .getElementById('chat-section')
                //         .appendChild(chatBodyMessages);
                // }
            }
            break;
        case jumpaRtcSDK.EVENT_CHAT_PRIVATE_MESSAGE_RECEIVED:
            if(data){
                console.error('EVENT_CHAT_PRIVATE_MESSAGE_RECEIVED', data);
                
                // let senderName = document.createElement('p');
                // let textMessages = document.createElement('p');
                // let timeChatMessages = document.createElement('span');
                // let chatBodyMessages = document.createElement('div');

                // senderName.setAttribute('class', 'sender');

                // senderName.innerText = 'From  ' + data.from.userName;
                // textMessages.textContent = data.msg;
                // textMessages.setAttribute('style', 'word-break: break-word;');
                // timeChatMessages.setAttribute('class', 'delivered-time');

                // const splitted = data.time.split(':');
                // const timeSplit = splitted[0] + ':' + splitted[1];
                // timeChatMessages.textContent = timeSplit;
                // chatBodyMessages.setAttribute('class', 'chat');
                // chatBodyMessages.setAttribute('id', 'chat');

                // textMessages.appendChild(timeChatMessages);
                // chatBodyMessages.appendChild(senderName);
                // chatBodyMessages.appendChild(textMessages);

                // this.$store.dispatch('chats/setChat', chatBodyMessages);

                // if (document.getElementsByClassName('chat-container').length > 0) {
                //     document.getElementById('chat-section').appendChild(chatBodyMessages);
                // }
            }
            break
        case jumpaRtcSDK.EVENT_CHAT_FILE_MESSAGE_RECEIVED:
            if (data) {
                console.error('EVENT_CHAT_FILE_MESSAGE_RECEIVED', data);
                
                // let dataSending = webrtcSDK.getUserList()[data.file.from]
                
                // if(data.file.type == "Image"){
                //     let chatImage = document.createElement('div')
                //     let sender = document.createElement('p')
                //     let image = document.createElement('img')
                //     let time = document.createElement('span')

                //     chatImage.setAttribute('class','chat image')
                //     sender.setAttribute('class','sender')
                //     image.setAttribute('src',data.file.location)
                //     time.setAttribute('class','delivered-time')
                //     time.setAttribute('style','line-height: 1;')

                //     sender.innerText = dataSending.name
                //     time.innerText = data.time

                //     chatImage.appendChild(sender)
                //     chatImage.appendChild(image)
                //     chatImage.appendChild(time)

                //     this.$store.dispatch('chats/setChat', chatImage);

                //     if (document.getElementsByClassName('chat-container').length > 0){
                //         document.getElementById('chat-section').appendChild(chatImage);
                //     }
                // }else{
                    
                //     let chatFile = document.createElement('div')
                //     let sender = document.createElement('p')
                //     let fileInfo = document.createElement('div')
                //     let icFile = document.createElement('i')
                //     let aText = document.createElement('a')
                //     let nameFile = document.createElement('p')
                //     let sizeFile = document.createElement('p')
                //     let time = document.createElement('span')

                //     chatFile.setAttribute('class','chat file')
                //     sender.setAttribute('class','sender')
                //     fileInfo.setAttribute('class','file-info')
                //     icFile.setAttribute('class','fas fa-file-alt')
                //     aText.setAttribute('class','text-black-gray')
                //     aText.setAttribute('href',data.file.location)
                //     nameFile.setAttribute('class','p2-bold')
                //     nameFile.setAttribute('style','overflow: hidden;max-width: 200px;text-overflow: ellipsis;white-space: nowrap')
                //     sizeFile.setAttribute('class','p3')
                //     time.setAttribute('class','delivered-time')
                //     time.setAttribute('style','line-height: 1;')

                //     sender.innerText = dataSending.name
                //     nameFile.innerText = data.file.name
                //     sizeFile.innerText = data.file.size
                //     time.innerText = data.time
                    
                //     aText.appendChild(nameFile)
                //     aText.appendChild(sizeFile)
                //     fileInfo.appendChild(icFile)
                //     fileInfo.appendChild(aText)

                //     chatFile.appendChild(sender)
                //     chatFile.appendChild(fileInfo)
                //     chatFile.appendChild(time)

                //     this.$store.dispatch('chats/setChat', chatFile);

                //     if (document.getElementsByClassName('chat-container').length > 0){
                //         document.getElementById('chat-section').appendChild(chatFile);
                //     }
                // }
                
            }
            break;
        case jumpaRtcSDK.EVENT_CHAT_FILE_UPLOADED:
            if (data) {
                console.log('EVENT_CHAT_FILE_UPLOADED', data);
            }
            break;
        case jumpaRtcSDK.EVENT_USER_HANDUP_STATUS_CHANGE:
            if (data) {
                // console.log(
                //     'EVENT_USER_HANDUP_STATUS_CHANGE',
                //     this.isRaiseHand
                // );
                // if (data.handup === 'Off') {
                //     if (this.isRaiseHand) {
                //         this.toast(
                //             'Host menurunkan tangan anda',
                //             'success',
                //             3000
                //         );
                //     }
                //     this.isRaiseHand = false;
                // }
            }
            break;
        case jumpaRtcSDK.EVENT_WHITEBOARD_STATUS_CHANGE:
            if (data) {
                console.log('EVENT_WHITEBOARD_STATUS_CHANGE', data);
                // if (data.status == 1) {
                //     // Receive Whiteboard from another and show it
                //     setTimeout(() => {
                //         // if (document.getElementById('mainVideo')) {
                //         //     // document.getElementById('mainVideo').style.display = 'none';
                //         //     document.getElementById('cameraVideo').style.height = '25vw';
                //         // }
                //         const dataIframe = document.createElement('iframe');
                //         dataIframe.setAttribute('data-host', '0');
                //         dataIframe.setAttribute('src',data.whiteboardAddr);
                //         dataIframe.setAttribute('id','whiteboard-iframe');
                //         dataIframe.setAttribute('name','whiteboard-iframe-webrtc');
                //         dataIframe.setAttribute('allowfullscreen','true');
                //         dataIframe.setAttribute('webkitallowfullscreen','true');
                //         dataIframe.setAttribute('mozallowfullscreen','true');
                //         document.getElementById('video2').appendChild(dataIframe);
                //     }, 1000);
                // } else if (data.status == 2) {
                //     // Receive Document from another and show it
                //     setTimeout(() => {
                //         // if (document.getElementById('mainVideo')) {
                //         //     // document.getElementById('mainVideo').style.display = 'none';
                //         //     document.getElementById('cameraVideo').style.height = '25vw';
                //         // }
                //         const dataIframe = document.createElement('iframe');
                //         dataIframe.setAttribute('data-host', '0');
                //         dataIframe.setAttribute('src',data.whiteboardAddr + '&type=doc');
                //         dataIframe.setAttribute('id','whiteboard-iframe');
                //         dataIframe.setAttribute('name','whiteboard-iframe-webrtc');
                //         dataIframe.setAttribute('allowfullscreen','true');
                //         dataIframe.setAttribute('webkitallowfullscreen','true');
                //         dataIframe.setAttribute('mozallowfullscreen','true');
                //         document.getElementById('video2').appendChild(dataIframe);
                //     }, 1000);
                // } else {
                //     if (document.getElementById('whiteboard-iframe')) {
                //         document.getElementById('whiteboard-iframe').remove();
                //     }

                //     if (document.getElementById('whiteboard-iframe-upload')) {
                //         document.getElementById('whiteboard-iframe-upload').remove();
                //     }

                //     if (document.getElementById('mainVideo')) {
                //         // document.getElementById('mainVideo').style.display = 'block';
                //         document.getElementById('cameraVideo').style.height = null;
                //     }
                // }
            }
            break;
        case jumpaRtcSDK.EVENT_MEETING_EXIT:
            if (data) {
                console.log('EVENT_MEETING_EXIT', data);
                const alert = await alertController.create({
                    header: "Rapat Berakhir",
                    message: `Terima kasih telah mengikuti rapat\b${roomInformation.meetingTheme}`,
                    cssClass: 'my-custom-alert',
                    buttons: [{
                        text: "OK",
                        cssClass: "exit-button",
                        id: "cancel-button",
                        handler: () => {
                            router.push("/join")
                        }
                    }]
                })
                jumpaRtcSDK.closeLocalVideoPreview((err) => {
                    console.log('object');
                });
                alert.present()
            }
            break;
        case jumpaRtcSDK.EVENT_MEDIA_NETWORK_STATE_CHANGE:
            if (data) {
                console.log('EVENT_MEDIA_NETWORK_STATE_CHANGE', data);
                switch (data.state) { 
                    case '2':
                        networkStatus.color = "primary"
                        networkStatus.icon = wifi
                        networkStatus.msg = "Sangat Baik"
                        break;
                    case '1':
                        networkStatus.color = "warning"
                        networkStatus.icon = wifiSharp
                        networkStatus.msg = "Baik"
                        break;
                    case '0':
                        networkStatus.color = "danger"
                        networkStatus.icon = wifiOutline
                        networkStatus.msg = "Buruk"
                        break;
                    default:
                        break;
                }
            }
            break;
        case jumpaRtcSDK.EVENT_MEETING_END:
            if (data) {
                console.log('EVENT_MEETING_END', data);
                const alert = await alertController.create({
                    header: "Rapat Berakhir",
                    message: `Terima kasih telah mengikuti rapat\b${roomInformation.meetingTheme}`,
                    cssClass: 'my-custom-alert',
                    buttons: [{
                        text: "OK",
                        cssClass: "exit-button",
                        id: "cancel-button",
                        handler: () => {
                            router.push("/join")
                        }
                    }]
                })
                jumpaRtcSDK.closeLocalVideoPreview((err) => {
                    console.log('object');
                });
                alert.present()
            }
            break;
        case jumpaRtcSDK.EVENT_USER_REMOVED_FROM_MEETING:
            if (data) {
                console.log('EVENT_USER_REMOVED_FROM_MEETING', data);
                const alert = await alertController.create({
                    header: "Anda telah dikeluarkan",
                    message: `${data.description}`,
                    cssClass: 'my-custom-alert',
                    buttons: [{
                        text: "OK",
                        cssClass: "exit-button",
                        id: "cancel-button",
                        handler: () => {
                            router.push("/join")
                        }
                    }]
                })
                jumpaRtcSDK.closeLocalVideoPreview((err) => {
                    console.log('object');
                });
                alert.present()
            }
            break;
        default:
            break;
    }
}

const addListener = () =>{
    jumpaRtcSDK.addEventHandler(jumpaRtcSDK.EVENT_MEETING, onEvent)
}
</script>

<style scoped>
.video{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
#video-local {
    position: absolute;
    top: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>
