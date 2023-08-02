<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { useDisplay } from 'vuetify';

const ValidationBox = defineComponent({
    props: {
        // validation title
        title: {
            type: String,
            default: '',
        },
        withCautionIcon: {
            type: Boolean,
            default: false,
        },
        // validation describe string list
        descriptionList: {
            type: Array as PropType<String[]>,
            default: [],
        },
        // validation result list
        validationList: {
            type: Array as PropType<Boolean[]>,
            default: [],
        },
    },
    setup(props) {
        const { width } = useDisplay();
        const mobileWidth = computed(() => {
            return width.value
        })
        return {
            mobileWidth
        }
    }
})

export default ValidationBox
</script>

<template>
    <div class="validation-box-container pa-2 animate glow delay-1 fade-in">
        <v-row v-if="title.length" class="d-flex justify-center" :class="mobileWidth > 600 ? 'ma-2' : 'ma-1'">
            <img v-if="withCautionIcon" src="@/assets/public/svg/icon_public_03.svg" width="16"
                class="validation-caution-img" />
            <span class="label-text-sm ml-2 mt-1 slate-gray">
                {{ title }}
            </span>
        </v-row>
        <v-row class="validation-list">
            <v-row v-for="n in descriptionList.length" :key="n"
                :class="`validation-list-item full-width ${validationList[n - 1] ? 'active' : 'inactive'}`">
                <v-icon class="mr-2 validation-item-icon">
                    {{ validationList[n - 1] ? 'mdi-check-circle' : 'mdi-close-circle' }}
                </v-icon>
                <p>{{ descriptionList[n - 1] }}</p>
            </v-row>
        </v-row>
    </div>
</template>

<style lang="scss">
@media(max-width: 600px) {
    .validation-box-container {
        bottom: 50px !important;
    }
}

.validation-box-container {
    position: absolute;
    bottom: 64px;
    width: 94%;
    background: #211F31;
    box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12);
    border-radius: 12px;
    margin: 12px; // wrapped by v-row
    padding-bottom: 0px !important;
    z-index: 2;

    .validation-caution-img {
        position: relative;
        top: 2px;
    }

    .validation-title {
        margin-top: 22px !important;
        margin-left: 10px;
    }

    .validation-list {
        margin: 0px 0px -12px 0px;
        padding: 0px;

        .validation-list-item {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 15px;
            margin: 6px;
        }

        .validation-item-icon {
            padding-bottom: 2px;
        }
    }
}

.validation-box-container::after {
    display: flex;
    content: "";
    position: relative;
    align-self: center;
    float: right;
    top: 18px;
    right: 50%;
    border: 9px solid #211f31;
    border-right-color: transparent;
    border-left-color: transparent;
    border-bottom-color: transparent;
    z-index: 2;
    border-right-width: 5px;
    border-left-width: 5px;
}

// animation
.animate {
    animation-duration: 0.15s;
    animation-delay: 0.1s;
    animation-name: animate-fade;
    animation-timing-function: cubic-bezier(0.26, 0.53, 0.74, 1.48);
    animation-fill-mode: backwards;
}

.animate.glow {
    animation-name: animate-glow;
    animation-timing-function: ease;
}

@keyframes animate-glow {
    0% {
        opacity: 0;
        filter: brightness(3) saturate(3);
        transform: scale(0.8, 0.8);
    }

    100% {
        opacity: 1;
        filter: brightness(1) saturate(1);
        transform: scale(1, 1);
    }
}

.delay-1 {
    animation-delay: 0.1s;
}
</style>