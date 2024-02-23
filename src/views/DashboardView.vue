<script setup>
import { onMounted } from 'vue';
import Swal from 'sweetalert2'
const { VITE_URL } = import.meta.env;
import { useRouter, RouterLink, RouterView } from 'vue-router'
const router = useRouter();

import axios from 'axios';

function checkAdmin() {
    // 取出 token
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("myToken="))
        ?.split("=")[1];
    // 如果有取得 token ，放入 header
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    }
    // 發出 check 請求，如果通過則取得產品，失敗則導回燈入頁
    axios.post(`${VITE_URL}/v2/api/user/check`)
        .then(() => {
            console.log("驗證成功")
        }).catch(() => {
            Swal.fire({
                title: "請先登入",
                icon: "error",
                didClose: () => {
                    router.push("/login")
                }
            })
        })
}
onMounted(() => {
    checkAdmin();
})

</script>
<template>
    <div class="container mx-a">
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

            </ul>
        </nav>
    </div>
    <RouterView></RouterView>
</template>                 

<style scoped>
a.router-link-active {
    color: cadetblue;
}
</style>