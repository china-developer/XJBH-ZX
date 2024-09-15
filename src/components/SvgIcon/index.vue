<template>
    <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    :class="className"
  />
  <svg v-else class="svg-icon" aria-hidden="true" :style="'width:' + size + ';height:' + size" inert>
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { isExternal as external } from '@/utils/validate'
const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  color: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "1em",
  },
  // icon 图标
  iconClass: {
    type: String,
    required: false,
    default: "",
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  },
});


/**
 * 判断是否为外部图标
 */
 const isExternal = computed(() => external(props.iconClass))
/**
 * 外部图标样式
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.iconClass}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
}))
/**
 * 项目内图标
 */
 const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`);

</script>

<style scoped>
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
  outline: none;
  fill: currentcolor;
  /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
