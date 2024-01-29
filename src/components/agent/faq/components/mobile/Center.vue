<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <v-row class="ma-0 pa-0 mx-1 mt-13">
    <v-col :cols="4" class="ma-0 pa-0 px-1 relative">
      <img src="@/assets/agent/image/img_agent_14.png" class="m-agent-faq-center-arrow" />
      <v-card class="m-agent-faq-center-card">
        <v-card class="m-agent-faq-center-sub-card">
          <div class="relative">
            <img src="@/assets/agent/svg/img_agent_100.svg" style="width: 100%" />
            <div class="m-agent-faq-center-sub-card-text">
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}A:</div>
              <div class="text-700-12 text-center">360</div>
            </div>
          </div>
          <div class="relative text-center">
            <img src="@/assets/public/image/ua_public_02.png" width="60" />
            <div class="m-agent-faq-center-ua-user">
              <div class="m-agent-ua-user-circle">
                <div class="m-agent-ua-user-circle-text">B1</div>
              </div>
            </div>
          </div>
          <div class="d-flex align-center mx-2 justify-center">
            <span class="text-400-12 text-gray">C1</span>
            <div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_46") }}
              </div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_47") }}
              </div>
            </div>
            <span class="text-700-12 text-white">300</span>
          </div>
          <div class="d-flex align-center mx-2 justify-center mt-1">
            <span class="text-400-12 text-gray">D1</span>
            <div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_46") }}
              </div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_47") }}
              </div>
            </div>
            <span class="text-700-12 text-white">150</span>
          </div>
          <div class="d-flex align-center mx-2 justify-center mt-1">
            <span class="text-400-12 text-gray">E1</span>
            <div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_46") }}
              </div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_47") }}
              </div>
            </div>
            <span class="text-700-12 text-white">50&nbsp;&nbsp;</span>
          </div>
          <div class="text-400-10 text-gray text-center mt-2">
            {{ t("agent.text_48") }}
            <span class="text-700-12 text-white">500</span>
          </div>
        </v-card>
        <div class="text-400-10 text-gray mt-2 text-center">{{ t("agent.text_49") }}</div>
        <div class="text-700-12 text-white text-center">120K</div>
      </v-card>
    </v-col>
    <v-col :cols="4" class="ma-0 pa-0 px-1 relative">
      <img
        src="@/assets/agent/image/img_agent_15.png"
        class="m-agent-faq-center-arrow-center"
      />
      <v-card class="m-agent-faq-center-card">
        <v-card class="m-agent-faq-center-sub-card">
          <div class="relative">
            <img src="@/assets/agent/svg/img_agent_100.svg" style="width: 100%" />
            <div class="m-agent-faq-center-sub-card-text">
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}A:</div>
              <div class="text-700-12 text-center">120</div>
            </div>
          </div>
          <div class="relative text-center">
            <img src="@/assets/public/image/ua_public_09.png" width="60" />
            <div class="m-agent-faq-center-ua-user">
              <div class="m-agent-ua-user-circle">
                <div class="m-agent-ua-user-circle-text">B2</div>
              </div>
            </div>
          </div>
          <div class="mx-2 text-400-12 text-gray" style="line-height: 12px">
            B2 <span class="text-400-10 text-gray">{{ t("agent.text_50") }}</span>
          </div>
        </v-card>
        <div class="text-400-10 text-gray mt-2 text-center">{{ t("agent.text_49") }}</div>
        <div class="text-700-12 text-white text-center">40K</div>
      </v-card>
    </v-col>
    <v-col :cols="4" class="ma-0 pa-0 px-1 relative">
      <img
        src="@/assets/agent/image/img_agent_14.png"
        class="m-agent-faq-center-arrow-flip"
      />
      <v-card class="m-agent-faq-center-card">
        <v-card class="m-agent-faq-center-sub-card">
          <div class="relative">
            <img src="@/assets/agent/svg/img_agent_100.svg" style="width: 100%" />
            <div class="m-agent-faq-center-sub-card-text">
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}A:</div>
              <div class="text-700-12 text-center">60</div>
            </div>
          </div>
          <div class="relative text-center">
            <img src="@/assets/public/image/ua_public_01.png" width="60" />
            <div class="m-agent-faq-center-ua-user">
              <div class="m-agent-ua-user-circle">
                <div class="m-agent-ua-user-circle-text">B3</div>
              </div>
            </div>
          </div>
          <div class="d-flex align-center mx-2 justify-center">
            <span class="text-400-12 text-gray">C3</span>
            <div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_46") }}
              </div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_47") }}
              </div>
            </div>
            <span class="text-700-12 text-white">300</span>
          </div>
          <div class="d-flex align-center mx-2 justify-center mt-1">
            <span class="text-400-12 text-gray">D3</span>
            <div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_46") }}
              </div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_47") }}
              </div>
            </div>
            <span class="text-700-12 text-white">45&nbsp;&nbsp;</span>
          </div>
          <div class="d-flex align-center mx-2 justify-center mt-1">
            <span class="text-400-12 text-gray">D4</span>
            <div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_46") }}
              </div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_47") }}
              </div>
            </div>
            <span class="text-700-12 text-white">50&nbsp;&nbsp;</span>
          </div>
          <div class="text-400-10 text-gray text-center mt-2">
            {{ t("agent.text_48") }}
            <span class="text-700-12 text-white">4845</span>
          </div>
        </v-card>
        <div class="text-400-10 text-gray mt-2 text-center">{{ t("agent.text_49") }}</div>
        <div class="text-700-12 text-white text-center">20K</div>
      </v-card>
    </v-col>
  </v-row>
  <v-row class="ma-0 pa-0 mx-1 mt-13">
    <v-col :cols="4" class="ma-0 pa-0 px-1 relative">
      <img
        src="@/assets/agent/image/img_agent_15.png"
        class="m-agent-faq-center-arrow-center"
      />
      <v-card class="m-agent-faq-center-card">
        <v-card class="m-agent-faq-center-sub-card">
          <div class="relative">
            <img src="@/assets/agent/svg/img_agent_101.svg" style="width: 100%" />
            <div class="m-agent-faq-center-sub-card-text">
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}A:</div>
              <div class="text-700-12 text-center">150</div>
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}B1:</div>
              <div class="text-700-12 text-center">300</div>
            </div>
          </div>
          <div class="relative text-center">
            <img src="@/assets/public/image/ua_public_04.png" width="60" />
            <div class="m-agent-faq-center-ua-user">
              <div class="m-agent-ua-user-circle">
                <div class="m-agent-ua-user-circle-text">C1</div>
              </div>
            </div>
          </div>
          <div class="d-flex align-center mx-2 justify-center">
            <span class="text-400-12 text-gray">D1</span>
            <div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_46") }}
              </div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_47") }}
              </div>
            </div>
            <span class="text-700-12 text-white">300</span>
          </div>
          <div class="d-flex align-center mx-2 justify-center mt-1">
            <span class="text-400-12 text-gray">E1</span>
            <div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_46") }}
              </div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_47") }}
              </div>
            </div>
            <span class="text-700-12 text-white">150</span>
          </div>
          <div class="text-400-10 text-gray text-center mt-2">
            {{ t("agent.text_48") }}
            <span class="text-700-12 text-white">450</span>
          </div>
        </v-card>
        <div class="text-400-10 text-gray mt-2 text-center">{{ t("agent.text_49") }}</div>
        <div class="text-700-12 text-white text-center">100K</div>
      </v-card>
    </v-col>
    <v-col :cols="4" class="ma-0 pa-0 px-1 relative"> </v-col>
    <v-col :cols="4" class="ma-0 pa-0 px-1 relative">
      <img
        src="@/assets/agent/image/img_agent_15.png"
        class="m-agent-faq-center-arrow-center"
      />
      <v-card class="m-agent-faq-center-card">
        <v-card class="m-agent-faq-center-sub-card">
          <div class="relative">
            <img src="@/assets/agent/svg/img_agent_101.svg" style="width: 100%" />
            <div class="m-agent-faq-center-sub-card-text">
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}A:</div>
              <div class="text-700-12 text-center">150</div>
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}B3:</div>
              <div class="text-700-12 text-center">300</div>
            </div>
          </div>
          <div class="relative text-center">
            <img src="@/assets/public/image/ua_public_06.png" width="60" />
            <div class="m-agent-faq-center-ua-user">
              <div class="m-agent-ua-user-circle">
                <div class="m-agent-ua-user-circle-text">C3</div>
              </div>
            </div>
          </div>
          <div class="d-flex align-center mx-2 justify-center">
            <span class="text-400-12 text-gray">D3</span>
            <div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_46") }}
              </div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_47") }}
              </div>
            </div>
            <span class="text-700-12 text-white">90&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
          <div class="d-flex align-center mx-2 justify-center mt-1">
            <span class="text-400-12 text-gray">D4</span>
            <div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_46") }}
              </div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_47") }}
              </div>
            </div>
            <span class="text-700-12 text-white">9000</span>
          </div>
          <div class="text-400-10 text-gray text-center mt-2">
            {{ t("agent.text_48") }}
            <span class="text-700-12 text-white">9090</span>
          </div>
        </v-card>
        <div class="text-400-10 text-gray mt-2 text-center">{{ t("agent.text_49") }}</div>
        <div class="text-700-12 text-white text-center">100K</div>
      </v-card>
    </v-col>
  </v-row>
  <v-row class="ma-0 pa-0 mx-1 mt-13">
    <v-col :cols="4" class="ma-0 pa-0 px-1 relative">
      <img
        src="@/assets/agent/image/img_agent_15.png"
        class="m-agent-faq-center-arrow-center"
      />
      <v-card class="m-agent-faq-center-card">
        <v-card class="m-agent-faq-center-sub-card">
          <div class="relative">
            <img src="@/assets/agent/svg/img_agent_102.svg" style="width: 100%" />
            <div class="m-agent-faq-center-sub-card-text">
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}A:</div>
              <div class="text-700-12 text-center">50</div>
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}B1:</div>
              <div class="text-700-12 text-center">150</div>
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}C1:</div>
              <div class="text-700-12 text-center">300</div>
            </div>
          </div>
          <div class="relative text-center">
            <img src="@/assets/public/image/ua_public_07.png" width="60" />
            <div class="m-agent-faq-center-ua-user">
              <div class="m-agent-ua-user-circle">
                <div class="m-agent-ua-user-circle-text">D1</div>
              </div>
            </div>
          </div>
          <div class="d-flex align-center mx-2 justify-center">
            <span class="text-400-12 text-gray">E1</span>
            <div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_46") }}
              </div>
              <div class="text-400-10 text-gray" style="line-height: 12px">
                {{ t("agent.text_47") }}
              </div>
            </div>
            <span class="text-700-12 text-white">300</span>
          </div>
        </v-card>
        <div class="text-400-10 text-gray mt-2 text-center">{{ t("agent.text_49") }}</div>
        <div class="text-700-12 text-white text-center">100K</div>
      </v-card>
    </v-col>
    <v-col :cols="4" class="ma-0 pa-0 px-1 relative">
      <img src="@/assets/agent/image/img_agent_14.png" class="m-agent-faq-center-arrow" />
      <v-card class="m-agent-faq-center-card">
        <v-card class="m-agent-faq-center-sub-card">
          <div class="relative">
            <img src="@/assets/agent/svg/img_agent_102.svg" style="width: 100%" />
            <div class="m-agent-faq-center-sub-card-text">
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}A:</div>
              <div class="text-700-12 text-center">15</div>
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}B3:</div>
              <div class="text-700-12 text-center">45</div>
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}C3:</div>
              <div class="text-700-12 text-center">90</div>
            </div>
          </div>
          <div class="relative text-center">
            <img src="@/assets/public/image/ua_public_08.png" width="60" />
            <div class="m-agent-faq-center-ua-user">
              <div class="m-agent-ua-user-circle">
                <div class="m-agent-ua-user-circle-text">D2</div>
              </div>
            </div>
          </div>
          <div class="mx-2 text-400-12 text-gray" style="line-height: 12px">
            D3 <span class="text-400-10 text-gray">{{ t("agent.text_50") }}</span>
          </div>
        </v-card>
        <div class="text-400-10 text-gray mt-2 text-center">{{ t("agent.text_49") }}</div>
        <div class="text-700-12 text-white text-center">30K</div>
      </v-card>
    </v-col>
    <v-col :cols="4" class="ma-0 pa-0 px-1 relative">
      <img
        src="@/assets/agent/image/img_agent_15.png"
        class="m-agent-faq-center-arrow-center"
      />
      <v-card class="m-agent-faq-center-card">
        <v-card class="m-agent-faq-center-sub-card">
          <div class="relative">
            <img src="@/assets/agent/svg/img_agent_102.svg" style="width: 100%" />
            <div class="m-agent-faq-center-sub-card-text">
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}A:</div>
              <div class="text-700-12 text-center">1500</div>
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}B3:</div>
              <div class="text-700-12 text-center">4500</div>
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}C3:</div>
              <div class="text-700-12 text-center">9000</div>
            </div>
          </div>
          <div class="relative text-center">
            <img src="@/assets/public/image/ua_public_09.png" width="60" />
            <div class="m-agent-faq-center-ua-user">
              <div class="m-agent-ua-user-circle">
                <div class="m-agent-ua-user-circle-text">D4</div>
              </div>
            </div>
          </div>
          <div class="mx-2 text-400-12 text-gray" style="line-height: 12px">
            D4 <span class="text-400-10 text-gray">{{ t("agent.text_50") }}</span>
          </div>
        </v-card>
        <div class="text-400-10 text-gray mt-2 text-center">{{ t("agent.text_49") }}</div>
        <div class="text-700-12 text-white text-center">3000K</div>
      </v-card>
    </v-col>
  </v-row>
  <v-row class="ma-0 pa-0 mx-1 mt-13">
    <v-col :cols="4" class="ma-0 pa-0 px-1 relative">
      <img
        src="@/assets/agent/image/img_agent_15.png"
        class="m-agent-faq-center-arrow-center"
      />
      <v-card class="m-agent-faq-center-card">
        <v-card class="m-agent-faq-center-sub-card">
          <div class="relative">
            <img src="@/assets/agent/svg/img_agent_102.svg" style="width: 100%" />
            <div class="m-agent-faq-center-sub-card-text">
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}B1:</div>
              <div class="text-700-12 text-center">50</div>
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}C1:</div>
              <div class="text-700-12 text-center">150</div>
              <div class="text-400-10 text-center">{{ t("agent.text_45") }}D1:</div>
              <div class="text-700-12 text-center">300</div>
            </div>
          </div>
          <div class="relative text-center">
            <img src="@/assets/public/image/ua_public_07.png" width="60" />
            <div class="m-agent-faq-center-ua-user">
              <div class="m-agent-ua-user-circle">
                <div class="m-agent-ua-user-circle-text">E1</div>
              </div>
            </div>
          </div>
          <div class="mx-2 text-400-12 text-gray" style="line-height: 12px">
            E1 <span class="text-400-10 text-gray">{{ t("agent.text_50") }}</span>
          </div>
        </v-card>
        <div class="text-400-10 text-gray mt-2 text-center">{{ t("agent.text_49") }}</div>
        <div class="text-700-12 text-white text-center">100K</div>
      </v-card>
      <div class="pa-3 m-agent-faq-center-help text-400-10 text-white">
        {{ t("agent.text_51") }}
      </div>
    </v-col>
    <v-col :cols="4" class="ma-0 pa-0 px-1 relative"> </v-col>
    <v-col :cols="4" class="ma-0 pa-0 px-1 relative"> </v-col>
  </v-row>
</template>

<style lang="scss">
.m-agent-faq-center-card {
  height: 286px;
  border-radius: 8px;
  background: $agent_color_3;

  .m-agent-faq-center-sub-card {
    height: 240px;
    border-radius: 8px;
    background: $agent_card_bg;
  }
}

.m-agent-faq-center-arrow {
  position: absolute;
  top: -43px;
  left: 50%;
}

.m-agent-faq-center-arrow-flip {
  position: absolute;
  top: -43px;
  right: 50%;
  transform: scaleX(-1);
}

.m-agent-faq-center-arrow-center {
  position: absolute;
  top: -43px;
  left: 50%;
  transform: translateX(-50%);
}

.m-agent-faq-center-sub-card-text {
  width: 100%;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.m-agent-faq-center-ua-user {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background: #ffffff;
  bottom: 18px;
  right: 32px;

  .m-agent-ua-user-circle {
    margin: 1px;
    width: 14px;
    height: 14px;
    border-radius: 8px;
    background: $agent_color_4;
  }

  .m-agent-ua-user-circle-text {
    color: #ffffff;
    font-family: Inter;
    font-size: 8px;
    font-style: normal;
    font-weight: 900;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.m-agent-faq-center-help {
  position: absolute;
  top: 184px;
  right: -180px;
  width: 173px;
  background: $agent_card_bg;
  border-radius: 8px;
}

.m-agent-faq-center-help:after {
  content: "";
  position: absolute;
  align-self: center;
  top: 50%;
  transform: translateY(-50%);
  left: -16px;
  border: 8px solid $agent_card_bg;
  border-left-color: transparent;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-top-width: 4px;
  border-bottom-width: 4px;
}
</style>
