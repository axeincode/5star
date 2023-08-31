<script lang="ts" setup>
import { useDisplay } from 'vuetify';
const { name, width } = useDisplay();

const emit = defineEmits<{ (e: 'clickParticipate'): void }>()


</script>

<template>
  <div class="mobile-deposit-container" >
    <v-card >
        <v-card-text>Not participating in promotional activities</v-card-text>
        <v-card-actions>
        <v-btn
            color="green-darken-1"
            variant="text"
            @click="emit('clickParticipate')"
        >
            OK
        </v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>


<style lang="scss">
// container
.mobile-deposit-container {
  background-color: #211f31;
  height: 100%;
}

.m-deposit-btn-position {
  position: absolute;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  width: 98%;
}

.m-deposit-footer-text-position {
  position: absolute;
  bottom: 128px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
}

.m-payment-width-370 {
  // width: 370px !important;
  margin: auto;
  height: 290px !important;
}

.deposit-bg-blur {
  filter: blur(4px)!important;
  -webkit-filter: blur(4px)!important;
  // filter: saturate(180%) blur(4px);
  // -webkit-filter: saturate(180%) blur(4px);
}
</style>
