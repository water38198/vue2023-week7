<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import PaginationComponent from '@/components/PaginationComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

const orders = ref([]);
const pagination = ref({});

function getOrders(page = 1) {
    axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/orders?page=${page}`)
        .then(res => {
            console.log(res)
            orders.value = res.data.orders;
            pagination.value = res.data.pagination;
        })
}
function editOrder(order) {
    console.log(order)
}
function deleteOrder(order) {
    console.log(order)
}

onMounted(() => {
    getOrders();
})
</script>
<template>
    <div class="container mx-a">
        <!-- 訂單列表 -->
        <table class="w-100% mt-6">
            <thead class="border-b-1 border-black border-solid fw-bold text-left">
                <tr>
                    <th width="120">
                        分類
                    </th>
                    <th>產品名稱</th>
                    <th width="120" class="text-end">
                        原價
                    </th>
                    <th width="120" class="text-end">
                        售價
                    </th>
                    <th width="100" class="text-center">
                        是否啟用
                    </th>
                    <th width="120">
                        編輯
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b border-#DEE2E6 border-solid">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                    </td>
                    <td>
                        <div class="btn-group">
                            <button type="button"
                                class="text-#0d6efd bg-transparent border-(1 #0d6efd solid r-0) rd-tl rd-bl px-2 py-1 hover:(bg-#0d6efd text-white cursor-pointer)"
                                @click="editOrder(order)">
                                編輯
                            </button>
                            <button type="button"
                                class="text-#dc3545 bg-transparent border-1 border-#de3545 border-solid rd-tr rd-br px-2 py-1 hover:(bg-#de3545 text-white cursor-pointer)"
                                @click="deleteOrder(order)">
                                刪除
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- Modal -->
    <!-- <ProductModal @confirm-product="confirmProduct" :temp-product="tempProduct" :is-new="isNew" ref="dialog">
    </ProductModal> -->
    <template v-if="orders.length">
        <PaginationComponent :pages="pagination" @change-page="getOrders"></PaginationComponent>
    </template>
</template>
<style lang="postcss">
td,
th {
    padding: 8px;
}
</style>