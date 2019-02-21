
<template>
  <div :class="classes" :style='marginStyle'>
    <span v-if='hasSlot && type === "row"' :class="slotClasses" :style='marginStyle'>
      <slot>
      </slot>
    </span>
  </div>
</template>

<script>
const prefixCls = 'zw-divider' // 与css中保持一致
export default {
  props: {
    // 类型是row,col两种中的一个
    type: {
      type: String,
      default: 'row',
      validator (value) {
        return ['row', 'col'].indexOf(value) !== -1
      }
    },
    marginNumber: {
      type: Number,
      default: 12
    },
    orientation: {
      type: String,
      default: 'center',
      validator (value) {
        return ['left', 'center', 'right'].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    marginStyle () {
      return {
        margin: `0 ${this.marginNumber}px`
      }
    },
    hasSlot () {
      return !!this.$slots.default
    },
    classes () {
      // <div v-bind:class="[{ active: isActive }, errorClass]"></div>
      return [
        `${prefixCls}-${this.type}`,
        {
          [`${prefixCls}-with-left-text`]: this.hasSlot && this.orientation === 'left',
          [`${prefixCls}-with-right-text`]: this.hasSlot && this.orientation === 'right'
        }
      ]
    },
    slotClasses () {
      return [`${prefixCls}-inner-text`]
    },
    isRow () {
      return this.type === 'row'
    }
  }
}
</script>

<style scoped lang='scss'>

@import '../variables.scss';
$prefixCls : zw-divider-;

.#{$prefixCls + 'row'} {
  display: table;
  white-space: nowrap; // 防止内容超过字体换行
  text-align: center;
  color: hsl(221, 45%, 16%);
  width: 100%;
  // 默认居中text
  &:before{
    content: "";
    display: table-cell;
    position: relative;
    width: 50%;
    border-top: 1px solid $border-color-base ;
    transform: translateY(50%)
  }
  &:after{
    content: "";
    display: table-cell;
    position: relative;
    width: 50%;
    border-top: 1px solid $border-color-base ;
    transform: translateY(50%)
  }
  // 左边text
  &.#{$prefixCls + 'with-left-text'} {
    &:before{
      width: 8%;
    }
    &:after{
      width: 92%;
    }
  }
  // 右边text
  &.#{$prefixCls + 'with-right-text'}{
    &:before{
      width: 92%;
    }
    &:after{
      width: 8%;
    }
  }
}
&.#{$prefixCls + 'col'}{
  display: inline-block;
  height: 0.9em;
  border-right: 1px solid $border-color-base ;
}
</style>
