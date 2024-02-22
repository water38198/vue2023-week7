<script setup>
import { RouterView, RouterLink } from 'vue-router';
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
                    <RouterLink to="/products">產品</RouterLink>
                </li>
                <li>
                    <RouterLink to="/cart">購物車</RouterLink>
                </li>
                <li>
                    <RouterLink to="/about">關於</RouterLink>
                </li>
                <li>
                    <RouterLink to="/admin">後台</RouterLink>
                </li>
                <li>
                    <RouterLink to="/login">登入</RouterLink>
                </li>
            </ul>
        </nav>
    </div>
    <RouterView></RouterView>
</template>