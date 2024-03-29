<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';


import OrderModal from '@/components/dashboard/OrderModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
const orders = ref([]);
const pagination = ref({});
const tempOrder = ref({})
const orderModalRef = ref();
const isLoading = ref(false);

function getOrders(page = 1) {
    isLoading.value = true;
    axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/orders?page=${page}`)
        .then(res => {
            orders.value = res.data.orders;
            pagination.value = res.data.pagination;
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: '錯誤發生',
                text: err.response.data.message,
            })
        })
        .finally(() => {
            isLoading.value = false;
        })
}
function openOrderModal(order) {
    tempOrder.value = order;
    orderModalRef.value.dialog.showModal()
}
function deleteOrder(id) {
    Swal.fire({
        icon: 'warning',
        title: '刪除訂單',
        text: `你確定要刪除 ${id} 這筆訂單嗎?`,
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '確定'
    }).then((res) => {
        if (res.isConfirmed) {
            axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/order/${id}`)
                .then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: `${res.data.message}`,
                        didClose: () => {
                            getOrders();
                        }
                    })
                }).catch(() => {
                    Swal.fire('錯誤發生', '', 'error')
                })
        }
    })
}
function confirmOrder(order) {
    const data = order;
    // 重新加總總價格 data.total 
    let total = 0;
    total = Object.keys(data.products).reduce((a, b) => {
        return a + data.products[b].final_total
    }, 0)
    data.total = total
    axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/admin/order/${order.id}`, {
        data
    }).then((res) => {
        orderModalRef.value.dialog.close();
        Swal.fire({
            icon: 'success',
            title: `${res.data.message}`,
            didClose: () => {
                getOrders();
            }
        })
    }).catch(err => {
        console.log(err)
    })
}

function getMoment(data) {
    return moment(data).format('YYYY-MM-DD')
}
onMounted(() => {
    getOrders();
})
</script>
<template>
    <div class="container mx-a relative">
        <Loading :active="isLoading" :full-page="false"></Loading>
        <!-- 訂單列表 -->
        <table class="w-100% mt-6">
            <thead class="border-b-1 border-black border-solid fw-bold text-left">
                <tr>
                    <th width="120">
                        下單時間
                    </th>
                    <th>ID</th>
                    <th>
                        購買品項
                    </th>
                    <th>
                        使用者資訊
                    </th>
                    <th>
                        留言
                    </th>
                    <th class="text-center">
                        訂單總額
                    </th>
                    <th width="100" class="text-center">
                        是否付款
                    </th>
                    <th width="120">
                        編輯
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b border-#DEE2E6 border-solid" v-for="order in orders" :key="order.id">
                    <td>{{ getMoment(order.create_at * 1000) }}</td>
                    <td>{{ order.id }}</td>
                    <td>
                        <ul>
                            <li v-for="product in order.products" :key="product.id">
                                {{ product.product.title }} x {{ product.qty }}
                            </li>
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <li v-for="data, key in order.user" :key="data">
                                {{ key }} : {{ data }}
                            </li>
                        </ul>
                    </td>
                    <td>
                        {{ order.message }}
                    </td>
                    <td class="text-center">
                        {{ order.total }}
                    </td>
                    <td class="text-center">
                        <span class="text-green" v-if="order.is_paid">已付款</span>
                        <span class="text-red" v-else>尚未付款</span>
                    </td>
                    <td>
                        <div class="btn-group">
                            <button type="button"
                                class="text-#0d6efd bg-transparent border-(1 #0d6efd solid r-0) rd-tl rd-bl px-2 py-1 hover:(bg-#0d6efd text-white cursor-pointer)"
                                @click="openOrderModal(order)">
                                編輯
                            </button>
                            <button type="button"
                                class="text-#dc3545 bg-transparent border-1 border-#de3545 border-solid rd-tr rd-br px-2 py-1 hover:(bg-#de3545 text-white cursor-pointer)"
                                @click="deleteOrder(order.id)">
                                刪除
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <template v-if="orders.length">
        <PaginationComponent :pages="pagination" @change-page="getOrders"></PaginationComponent>
    </template>
    <OrderModal :temp-order="tempOrder" ref="orderModalRef" @confirm-order="confirmOrder"></OrderModal>
</template>
<style lang="postcss">
td,
th {
    padding: 8px;
}
</style>