<script setup>
import { RouterView } from 'vue-router';
</script>
<template>
    <div class="container mx-a">
        <h2 class="font-size-10">前台</h2>
        <nav>
            <ul class="flex gap-4">
                <li>
                    <RouterLink to="/">首頁</RouterLink>
                </li>
                <li>
                    <RouterLink to="/admin/products">後台產品</RouterLink>
                </li>
                <li>
                    <RouterLink to="/admin/orders">訂單</RouterLink>
                </li>
                <li>
                    <RouterLink to="/admin/coupons">優惠券</RouterLink>
                </li>

            </ul>
        </nav>
    </div>
    <RouterView></RouterView>
</template>