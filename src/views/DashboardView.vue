<script setup>
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2'
import { useRouter, RouterLink, RouterView } from 'vue-router'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css';

const { VITE_URL } = import.meta.env;
const router = useRouter();

import axios from 'axios';

const isChecked = ref(false)
function checkAdmin() {

    // 取出 token
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("myToken="))
        ?.split("=")[1];

    axios.defaults.headers.common.Authorization = token
    // 發出 check 請求，如果通過則取得產品，失敗則導回燈入頁
    axios.post(`${VITE_URL}/v2/api/user/check`)
        .then(() => {
            isChecked.value = true;
        }).catch(() => {
            isChecked.value = true;
            Swal.fire({
                title: "請先登入",
                icon: "error",
                didClose: () => {
                    router.push("/login")
                }
            })
        })
}
function logOut() {
    axios.post(`${VITE_URL}/v2/logOut`)
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: '登出成功'
            });
            document.cookie = `myToken=; expires=; path=/`
            router.push('/')
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                text: `${err.response.data.message}`
            })
        })
}

onMounted(() => {
    checkAdmin();
})
</script>
<template>
    <div class="container">
        <Loading :active="!isChecked" :full-page="true"></Loading>
        <h2 class="font-size-10 text-center mb-4">後台</h2>
        <nav>
            <ul class="flex gap-4 justify-center">
                <li>
                    <RouterLink to="/" class="text-green hover:(border-b border-green border-solid)">前台首頁</RouterLink>
                </li>
                <li>
                    <RouterLink to="/admin/products" class="text-green hover:(border-b border-green border-solid)">後台產品
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/admin/orders" class="text-green hover:(border-b border-green border-solid)">訂單
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/admin/coupons" class="text-green hover:(border-b border-green border-solid)">優惠券
                    </RouterLink>
                </li>
                <li>
                    <a href="#" @click.prevent="logOut" class="text-green hover:(border-b border-green border-solid)">登出</a>
                </li>

            </ul>
        </nav>
    </div>
    <template v-if="isChecked">
        <RouterView></RouterView>
    </template>
</template>                 

<style scoped>
a.router-link-active {
    color: cadetblue;
}
</style>