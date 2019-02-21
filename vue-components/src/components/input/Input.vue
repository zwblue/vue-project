<template>
  <div class="input-box">
    <input :class="classes"
      :placeholder="placeholder" :style='{width: `${width}px`, paddingLeft: "32px"}'
    >
  </div>
</template>

<script>
// 前缀： prefix
const prefixCls = 'zw-input'
export default {
  props: {
    size: {
      type: String,
      default: 'default',
      validator: (value) => {
        return ['small', 'default', 'large'].indexOf(value) !== -1
      }
    },
    icon: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入内容...'
    },
    width: {
      type: Number,
      default: 200
    },
    type: {
      type: String,
      default: 'text',
      validator: (value) => {
        return ['text', 'textarea', 'search', 'url', 'email'].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}-${this.size}`,
        prefixCls,
        { [`${prefixCls}-with-icon`]: this.icon && this.type === 'search' }
      ]
    }
  }
}
</script>

<style scoped lang='scss'>
  @import '../variables.scss';
  $prefixCls : zw-input;
  .input-box{
    position: relative;
  }

  .#{$prefixCls}{
    border: 1px solid $border-color-base;
    color: $input-color;
    cursor: text;
    background-color: #fff;
    font-size:  $font-size-small ;
    overflow: visible;
    position: relative;
    background-image: none;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
    &:focus, &:hover{
      border-color: #57a3f3;
      outline: 0;
      outline-offset: -2px;
      box-shadow: 0 0 0 2px rgba(45,140,240,.2);
    }
    &::placeholder {
      color: $input-placeholder-color;
    }
  }
  .#{$prefixCls + '-default'}{
    height: $input-height-base;
    padding: $input-padding-vertical-base  $input-padding-horizontal;
    border-radius: $border-radius-base;
  }
  .#{$prefixCls + '-large'}{
    font-size: $font-size-base;
    height: $input-height-large;
    padding: $input-padding-vertical-large  $input-padding-horizontal;
    border-radius: $border-radius-base;
  }
  .#{$prefixCls + '-small'}{
    height: $input-height-small;
    padding: $input-padding-vertical-small  $input-padding-horizontal;
    border-radius: $border-radius-small;
  }
  .#{$prefixCls + '-with-icon'}{
    padding-left: 32px;
  }
</style>
