<template>
    <div class="container" :style="{ 'flex-flow': !collapse ? 'column' : 'row' }">
        <div class="avatar-container" :style="getAvatarStyle">
            <img class="shrink-0 grow-0 basis-auto" v-if="userStore.user.avatar"  :src="userStore.user.avatar" alt="">
        </div>
        <div class="name-container" v-if='collapse'>
            <span>{{ userStore.user.nickname }}</span>
            <div class="status">
                <span></span>
                <span>在线</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/modules/user";
import { computed } from "vue";
const userStore = useUserStore();

const props = defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});

const getAvatarStyle = computed(() => {
  return {
    width: props.collapse ? '50px' : '18px',
    height: props.collapse ? '50px' : '18px',
  }
})



</script>

<style scoped lang="scss">
.container {
    display: flex;
    align-items: center;
    padding: 20px 20px;

    .avatar-container {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .name-container {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        color: #fff;
        font-size: 14px;
        margin-left: 15px;
        .status {
            display: flex;
            align-items: center;
            font-size: 12px;
            margin-top: 5px;
            & span:first-child {
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #67C23A;
                margin-right: 5px;
            }
        }
    }

}
</style>