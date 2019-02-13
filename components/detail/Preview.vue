<template>
  <div class="preview"
       ref="preview">
    <div class="preview__header">
      文档预览
    </div>
    <div class="preview__view">
      <div v-if="!source"
           class="loading">文件正在解码中，稍等几分钟</div>
      <div id="reader"></div>
      <div class="down"
           v-if="source">
        <Down :id="meta.id"
              text="下载文档"
              size="large" />
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "debounce";
import meta from '@/mixins/meta';
import Down from '@/components/public/Down'
export default {
  mixins: [meta],
  props: {
    doc: ''
  },
  components: {
    Down
  },
  data () {
    return {
      source: this.doc
    }
  },
  mounted () {

    if (!this.source) {
      this.timer = setInterval(() => {
        this.$axios.get(`/article/getDoc/${this.$store.state.meta.id}`)
          .then(res => {
            if (res.doc) {
              clearInterval(this.timer);
              this.source = res.doc;
              this.initPreview();
            }
          })
      }, 60000);
    } else {
      this.initPreview();
    }
    window.addEventListener('resize', this.resize)

  },
  destroyed () {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize () {
      debounce(this.initPreview, 1000)
    },
    initPreview () {
      if (!this.source || !this.$refs.preview) return;
      const width = this.$refs.preview.clientWidth;
      const obj = document.getElementById('readerjs');
      if (!obj) {
        const script = document.createElement('script')
        script.src = 'https://static.bcedocument.com/reader/v2/doc_reader_v2.js'
        script.id = 'readerjs'
        document.body.appendChild(script);
        script.onload = () => {
          this.initOptions(width)
        }
      } else {
        this.initOptions(width)
      }
    },

    initOptions (width) {
      const option = {
        "documentId": this.source.documentId,
        "docId": this.source.docId,
        "token": this.source.token,
        "host": this.source.host,
        serverHost: 'https://doc.bj.baidubce.com',
        width: width,
        toolbarConf: {
          page: true, //上下翻页箭头图标
          pagenum: true, //几分之几页
          full: false, //是否显示全屏图标,点击后全屏
          copy: true, //是否可以复制文档内容
          position: 'center',// 设置 toolbar中翻页和放大图标的位置(值有left/center)
        }, //文档顶部工具条配置对象,必选
        full: true,
        zoom: false,              //是否显示放大缩小按钮
        pn: 1,
        ready: function (handler) {
          handler.setFontSize(1);
          handler.setBackgroundColor('#000');
          handler.setFontColor('#fff');
        },
        flip: function (data) {    // 翻页时回调函数, 可供客户进行统计等
          // console.log(data.pn);
        },
        fontSize: 'big'
      };
      new Document('reader', option);
    }
  }
}
</script>

<style scoped lang="scss">
.loading {
  text-align: center;
  line-height: 40px;
}
.preview {
  background: #fff;
  z-index: 500;
  height: auto;
}
.preview__header {
  line-height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.65);
  background-color: #f6f6f6;
}
.preview__view {
  overflow: hidden;
}
.clearfix {
  min-width: auto;
  width: 100%;
}
#reader {
  z-index: 500;
  height: auto;
  box-sizing: border-box;
}
.down {
  margin: 20px 0;
  text-align: center;
  .el-button {
    margin: 0 auto;
  }
}
</style>
