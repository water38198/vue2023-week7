<script setup>
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
    <div class="container mx-a">
        <h2 class="font-size-10">前台</h2>
        <nav>
            <ul class="flex gap-6">
                <li>
                    <RouterLink to="/" class="font-size-6">首頁</RouterLink>
                </li>
                <li>
                    <RouterLink to="/products" class="font-size-6">產品</RouterLink>
                </li>
                <li>
                    <RouterLink to="/cart" class="font-size-6">購物車</RouterLink>
                </li>
                <li>
                    <RouterLink to="/about" class="font-size-6">關於</RouterLink>
                </li>
                <li>
                    <RouterLink to="/admin" class="font-size-6">後台</RouterLink>
                </li>
                <li>
                    <RouterLink to="/login" class="font-size-6">登入</RouterLink>
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