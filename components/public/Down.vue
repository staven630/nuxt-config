<template>
  <el-button :class="'button__' + size"
             type="primary"
             @click="onDown">{{text}}</el-button>
</template>
<script>
import { debounce } from 'debounce'
import { SET_META } from '@/utils/constants'
import * as saver from 'file-saver'
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      default: 'custom'
    },
    text: {
      type: String,
      default: '下载'
    }
  },
  methods: {
    onDown: debounce(function () {
      if (this.id || +this.id === 0) {
        this.$axios.get(`/article/download/${this.id}`)
          .then(res => {
            this.download(res.downloadUrl, res.title);
          })
      }
    }, 500),
    downByIframe (url) {
      if (this.iframe) {
        document.body.removeChild(this.iframe);
      }
      this.iframe = document.createElement('iframe');
      this.iframe.style.display = 'none';
      this.iframe.src = url;
      document.body.appendChild(this.iframe);
      this.$emit('increment');
      const meta = this.$store.state.meta;
      if (meta && meta.hasOwnProperty('download')) {
        this.$store.commit(SET_META, {
          ...meta,
          download: meta.download + 1
        })
      }
      setTimeout(() => {
        document.body.removeChild(this.iframe);
        this.iframe = null;
      }, 2000);
    },

    download (url, name) {
      const xhr = new XMLHttpRequest();
      const that = this;
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onload = function () {
        if (this.status === 200) {
          that.$emit('increment');
          const meta = that.$store.state.meta;
          if (meta && meta.hasOwnProperty('download')) {
            that.$store.commit(SET_META, {
              ...meta,
              download: meta.download + 1
            })
          }
          saver(this.response, name);
        }
      };
      xhr.send();
    }
  }
}
</script>

