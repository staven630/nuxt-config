<template>
  <label class="file-select">
    <div class="select-button">
      <i class="iconfont myhr-back-to-top"></i>
      <span v-if="value">{{value.name}}</span>
      <span v-else>上传word/excel/pdf文档</span>
    </div>
    <input type="file"
           accept=".doc,.docx,.xls,.xlsx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
           @change="handleFileChange" />
  </label>
</template>

<script>
export default {
  props: {
    value: ''
  },

  methods: {
    handleFileChange (e) {
      this.$emit('input', e.target.files[0])
    }
  }
}
</script>

<style scoped lang="scss">
.file-select {
  .select-button {
    color: #fff;
    background-color: $primaryColor;
    -webkit-appearance: none;
    background-image: none;
    border-radius: 4px;
    box-sizing: border-box;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    text-align: center;
    @include ellipsis(100%);
  }

  input[type='file'] {
    display: none;
  }

  .iconfont {
    margin-right: 8px;
    font-size: 12px;
  }
}
</style>
