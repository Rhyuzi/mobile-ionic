<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/select-room"></ion-back-button>
        </ion-buttons>
        <ion-title>Rapat</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-input v-model="formData.subject"
          label="Subjek"
          label-placement="fixed"
          placeholder="Masukan Subjek"
        ></ion-input>
      </ion-item>
      <ion-item button :detail="true" @click="setContactOpen(true)">
        <ion-label>
          <h3>Undang (0)</h3>
        </ion-label>
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

      <ion-button @click="startMeeting" color="primary" expand="full" style="margin-top: 10px"
        >Mulai Rapat</ion-button
      >
      <!-- more option -->
      <ion-modal :is-open="isOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Atur Template Rapat</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="setOpen(false)">Simpan</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-item>
            <ion-input
              label="Subjek"
              placeholder="Masukan Subjek"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              label="Penyelenggara"
              placeholder="Masukan Penyelenggara"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              label="Email"
              type="email"
              placeholder="Masukan Email"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>
              Durasi
            </ion-label>
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-select aria-label="fruit" placeholder="Jam">
                    <ion-select-option v-for="(item, index) in 25" :key="index" :value="index">{{index}} Jam</ion-select-option>
                  </ion-select>
                </ion-col>
                <ion-col>
                  <ion-select aria-label="fruit" placeholder="Menit">
                    <ion-select-option v-for="(item, index) in 5" :key="index" :value="(index+1)*10">{{(index+1)*10}} Menit</ion-select-option>
                  </ion-select>
                </ion-col>
                
              </ion-row>
            </ion-grid>
          </ion-item>
          <ion-item>
            <ion-input
              label="Kata Sandi"
              type="password"
              placeholder="Masukan Kata Sandi"
            ></ion-input>
          </ion-item>
          <ion-item-divider>
            <ion-label>Pengaturan Rapat</ion-label>
          </ion-item-divider>
          <ion-item>
            <ion-toggle :checked="true"> Bisukan peserta saat masuk </ion-toggle>
          </ion-item>
          <ion-item>
            <ion-toggle :checked="true"> Tampilkan daftar peserta</ion-toggle>
          </ion-item>
          <ion-item>
            <ion-toggle> Izinkan pesan text</ion-toggle>
          </ion-item>
          <ion-item>
            <ion-toggle :checked="true"> Rekam Otomatis</ion-toggle>
          </ion-item>
          <ion-item>
            <ion-toggle> Nonaktifkan Presentasi</ion-toggle>
          </ion-item>
          <ion-item>
            <ion-toggle> Kunci Rapat</ion-toggle>
          </ion-item>
        </ion-content>
      </ion-modal>
      <!-- select contact -->
      <ion-modal :is-open="isContactOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Undang Peserta</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="setContactOpen(false)">Simpan</ion-button>
            </ion-buttons>
          </ion-toolbar>
          <ion-toolbar>
            <ion-searchbar placeholder="Cari Kontak"></ion-searchbar>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-item v-for="(item, index) in 50" :key="index">
            <ion-checkbox> User {{index+1}}</ion-checkbox>
          </ion-item>
          <br>
          <br>
          <br>
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
  IonCheckbox
} from "@ionic/vue";
import { ref,reactive } from "vue";
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import { required, maxLength, helpers, minLength, numeric } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import router from "@/router";


const store = useStore()
const plan = ref('')
onMounted(async () => {
    plan.value = store.getters['dashboard/get']('roomIndexPlan')
    console.debug('RoomIndex meeting form',plan.value)
})

const formData = reactive({
    subject: "",
});
const validationRules = {
  subject: {
    required: helpers.withMessage("ID Rapat harus Diisi", required),
  },
      
};

const v$ = useVuelidate(validationRules, formData);

const isOpen = ref(false);
const isContactOpen = ref(false);

const setOpen = (state: boolean) => {
  isOpen.value = state;
};
const setContactOpen = (state: boolean) => {
  isContactOpen.value = state;
};

const setupServer = async () => {
    jumpaRtcSDK.setServerAddr(process.env.VUE_APP_API_URL)
  }

const startMeeting = async () => {
  console.error("ASDADS",formData.subject)
  v$.value.$touch();
  if (!v$.value.$error) {
      const option = {
        confTheme: formData.subject,
        roomIndex: plan.value
      }
      console.error("OKEYYY",option);
      const res = await store.dispatch('dashboard/quickStart',option)
      if (res.retCode == '0'){
        setupServer()
        const meetingOptions = {
            roomId: res.data.meetingNum,
            userName: res.data.hostName,
            email: res.data.hostEmail,
            hostCode: res.data.hostCode,
            roomPassword: res.data.password,
        }
        jumpaRtcSDK.joinRoom(
          meetingOptions,
          () => {
            console.debug("success join room")
            router.push("/meetings");
          },
          (err) => {
            console.error("error join room",err)
          }
        );
      }
  } else {
    console.error("error", v$.value.$errors[0].$message);
  }
}
</script>
