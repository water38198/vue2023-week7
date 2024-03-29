<script setup>
import { ref, onMounted } from 'vue';

import axios from 'axios';
import Swal from 'sweetalert2'
import moment from 'moment'


import PaginationComponent from '@/components/PaginationComponent.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import CouponModal from '@/components/dashboard/CouponModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
const coupons = ref([]);
const isLoading = ref(false);
const pagination = ref({})
const tempCoupon = ref({})
const couponModalRef = ref();
const isNew = ref(false);

function getCoupons(page = 1) {
    isLoading.value = true;
    axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/coupons?page=${page}`)
        .then(res => {
            coupons.value = res.data.coupons
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
function addCoupon() {
    isNew.value = true;
    tempCoupon.value = {};
    couponModalRef.value.dialog.showModal();
}
function getMoment(data) {
    return moment(data).format('YYYY-MM-DD')
}
function editCoupon(coupon) {
    tempCoupon.value = coupon;
    isNew.value = false;
    couponModalRef.value.dialog.showModal()
}
function confirmCoupon(coupon) {

    if (isNew.value) {
        axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/admin/coupon`, {
            data: coupon
        }).then(res => {
            Swal.fire({
                title: `${res.data.message}`,
                icon: 'success',
                didClose: () => {
                    getCoupons();
                }
            })
            couponModalRef.value.dialog.close();
        }).catch(err => {
            Swal.fire({
                title: '錯誤發生',
                text: `${err.response.data.message}`,
                icon: 'error',
                target: 'dialog'
            })
        })
    } else {
        axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/admin/coupon/${coupon.id}`, {
            data: coupon
        }).then(res => {
            Swal.fire({
                title: `${res.data.message}`,
                icon: 'success',
                didClose: () => {
                    getCoupons();
                }
            })
            couponModalRef.value.dialog.close();
        }).catch(err => {
            Swal.fire({
                title: '錯誤發生',
                text: `${err.response.data.message}`,
                icon: 'error',
                target: 'dialog'
            })
        })
    }
}
function deleteCoupon(coupon) {
    const { id } = coupon;
    axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/coupon/${id}`)
        .then(res => {
            Swal.fire({
                title: `${res.data.message}`,
                icon: 'success',
                didClose: () => {
                    getCoupons();
                }
            })
            couponModalRef.value.dialog.close();
        }).catch(err => {
            Swal.fire({
                title: '錯誤發生',
                text: `${err.response.data.message}`,
                icon: 'error',
                target: 'dialog'
            })
        })
}
onMounted(() => {
    getCoupons();
})
</script>

<template>
    <div class="container mx-a relative">
        <Loading :active="isLoading" :full-page="false"></Loading>
        <div class="text-end mt-6">
            <!-- 新增按鈕 -->
            <button type="button"
                class="bg-#0d6efd border-0 text-white cursor-pointer inline-block px-3 py-1.5 rd font-size-4 hover:bg-#0b5ed7"
                @click="addCoupon">建立優惠券</button>
        </div>
        <!-- 產品列表 -->
        <table class="w-100% mt-6">
            <thead class="border-b-1 border-black border-solid fw-bold text-left">
                <tr>
                    <th width="120">
                        名稱
                    </th>
                    <th>優惠碼</th>
                    <th>
                        到期日
                    </th>
                    <th>
                        百分比
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
                <tr class="border-b border-#DEE2E6 border-solid" v-for="coupon in coupons" :key="coupon.id">
                    <td>{{ coupon.title }}</td>
                    <td>{{ coupon.code }}</td>
                    <td>{{ getMoment(coupon.due_date) }}</td>
                    <td>{{ coupon.percent }}</td>
                    <td class="text-center">
                        <span class="text-#198754" v-if="coupon.is_enabled">啟用</span>
                        <span class="text-red" v-else>未啟用</span>
                    </td>
                    <td>
                        <div>
                            <button type="button"
                                class="text-#0d6efd bg-transparent border-(1 #0d6efd solid) rd-tl rd-bl px-2 py-1 hover:(bg-#0d6efd text-white cursor-pointer)"
                                @click="editCoupon(coupon)">
                                編輯
                            </button>
                            <button type="button"
                                class="text-#dc3545 bg-transparent border-1 border-#de3545 border-solid rd-tr rd-br px-2 py-1 hover:(bg-#de3545 text-white cursor-pointer)"
                                @click="deleteCoupon(coupon)">
                                刪除
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- Modal -->
    <CouponModal :temp-coupon="tempCoupon" ref="couponModalRef" :is-new="isNew" @confirm-coupon="confirmCoupon">
    </CouponModal>
    <!--分頁  -->
    <template v-if="coupons.length">
        <PaginationComponent :pages="pagination" @change-page="getCoupons">
        </PaginationComponent>
    </template>
</template>
<style lang="postcss">
td,
th {
    padding: 8px;
}
</style>