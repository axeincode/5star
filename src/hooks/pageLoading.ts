import { ref, defineEmits } from 'vue'
import Loading from "@/components/global/loading.vue";
import LoadingBtn from "@/components/global/loadingBtn.vue"

export default function usePageLoading() {
    const pageLoading = ref<boolean>(false);
    const setPageLoading = (val: boolean) => {
        pageLoading.value = val;
    }

    return {
        pageLoading,
        setPageLoading,
        Loading,
        LoadingBtn
    }
}