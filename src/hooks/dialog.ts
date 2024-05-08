import { ref, onMounted, watch, computed } from 'vue'
import { storeToRefs } from "pinia";
import { agentStore } from "@/store/agent";
import { vipStore } from "@/store/vip";
import { authStore } from "@/store/auth";

export function useDialog() {

    // 代理
    const agentNavBarDrawer = ref<boolean>(false);
    // const agentNavBarToggle = computed(() => {
    //     const { getAgentNavBarToggle } = storeToRefs(agentStore());
    //     return getAgentNavBarToggle.value;
    // });
    // watch(agentNavBarToggle, (value) => {
    //     // console.log('agentNavBarToggle watchwatch', value);
    //     agentNavBarDrawer.value = value;
    // });

    // VIP
    const vipDrawer = ref<boolean>(false);
    const vipNavBarToggle = computed(() => {
        const { getVipNavBarToggle } = storeToRefs(vipStore());
        return getVipNavBarToggle.value;
    });
    watch(vipNavBarToggle, (value: string) => {
        if (value === "1" || value === "2") {
            vipDrawer.value = true;
        } else {
            vipDrawer.value = false;
        }
    })

    // 登录 注册页
    const authDialog = ref<boolean>(false);
    const authDialogVisible = computed(() => {
        const { getAuthDialogVisible } = storeToRefs(authStore());
        return getAuthDialogVisible.value;
    });

    watch(authDialogVisible, (value) => {
        authDialog.value = value;
    })

    return {
        agentNavBarDrawer,
        vipDrawer,
        authDialog
    }
}