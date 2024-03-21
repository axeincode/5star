import type { Ref } from "vue";

import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router';

export function useScroll() {
    const route = useRoute();
    let toPath = ''
    let fromPath = ''
    let limitScroll = false
    watch(() => route.path, (to, form) => {
        console.log(to, 'useScroll - watch -route', form);
        toPath = to
        fromPath = form || ''
        if (fromPath === "/about-us" && (toPath === '/' || toPath === '/')) {
            limitScroll = true;
        }
    }, { flush: 'pre', immediate: true, deep: true })
    const scrollTo = (top: number) => {

        if (!limitScroll) {
            // console.log('跳转！！！！！！！！！！！！');
            window.scrollTo({
                top,
                behavior: 'smooth'
            })
        } else {
            const positionValue = localStorage.getItem('scrollPosition')
            const savedPosition = positionValue ? JSON.parse
                (positionValue) : '';
            // console.log(savedPosition, 'savedPosition');

            if (savedPosition) {
                nextTick(() => {
                    setTimeout(() => {
                        window.scrollTo({
                            top: savedPosition.top,
                        })
                        localStorage.removeItem('scrollPosition')
                    }, 500)
                })
            }
        }
        // if (savedPosition) {
        //     window.scrollTo({
        //         top: savedPosition.top,
        //         behavior: 'smooth'
        //     })
        // }
        // window.scrollTo({
        //     top,
        //     behavior: 'smooth'
        // })
    }

    return {
        scrollTo
    }
}