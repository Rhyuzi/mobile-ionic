import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { registerPlugin } from '@capacitor/core';
import { Camera,CameraPlugin } from '@capacitor/camera';
import { Haptics, HapticsPlugin } from '@capacitor/haptics';

import { IonicVue } from '@ionic/vue';

import '@/assets/css/main.css'
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import store from './store';

async function requestPermissions() {
  try {
    const permissionStatus = await Camera.checkPermissions();
    if (permissionStatus.camera === 'granted') {
      // Camera permission already granted
      return;
    }

    const permissionRequest = await Camera.requestPermissions();
    if (permissionRequest.camera === 'granted') {
      // Camera permission granted successfully
    } else {
      // Camera permission denied
      console.log('Camera permission denied.');
    }
  } catch (error) {
    console.log('Error requesting camera permission:', error);
  }
}
registerPlugin<CameraPlugin>('Camera', Camera);
registerPlugin<HapticsPlugin>('Haptics', Haptics);

const app = createApp(App)
  .use(IonicVue)
  .use(store)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
  requestPermissions();
});