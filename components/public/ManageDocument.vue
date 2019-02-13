<template>
  <transition name="el-zoom-in-top">
    <div class="manage__card">
      <h1 class="manage__card-title"><i class="icon iconfont myhr-setting"></i>文档管理</h1>
      <div class="toggle-icon"
           @click="onToggle">
        <i class="icon iconfont myhr-upward"
           :class="showCard ? 'hide' : ''"></i>
      </div>
      <div v-show="showCard">
        <div v-if="!editing">
          <ul class="manage__card-meta">
            <li>
              <h2>Title</h2>
              <div>{{addForm.title}}</div>
            </li>
            <li>
              <h2>Description</h2>
              <div>{{addForm.description}}</div>

            </li>
            <li>
              <h2>Keywords</h2>
              <div>{{addForm.keywords}}</div>
            </li>
          </ul>
          <el-button class="button__custom"
                     @click="onEdit">编辑文档</el-button>

          <el-button class="button__custom button__danger"
                     type="danger"
                     @click="onDelete">删除文档</el-button>

        </div>
        <div v-else>
          <el-form ref="addForm"
                   class="add-form edit-form"
                   label-position="top"
                   :rules="addRules"
                   :model="addForm">
            <el-form-item label="所属分类"
                          :inline-message="true"
                          prop="article_type_id"
                          v-if="menu">
              <el-select v-model="addForm.article_type_id"
                         placeholder="请选择活动区域">
                <el-option :label="item.name"
                           :value="item.id"
                           v-for="item in menu"
                           :key="item.id"></el-option>
              </el-select>

            </el-form-item>
            <el-form-item label="Title"
                          :inline-message="true"
                          prop="title">
              <el-input v-model="addForm.title"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Description"
                          :inline-message="true"
                          prop="description">
              <el-input type="textarea"
                        v-model="addForm.description"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Keywords"
                          :inline-message="true"
                          prop="keywords">
              <el-input v-model="addForm.keywords"
                        autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="文档"
                          :inline-message="true"
                          prop="file_upload">
              <div class="upload">
                <file-select v-model="addForm.file_upload" />
              </div>
            </el-form-item>

          </el-form>

          <el-button class="button__custom"
                     type="primary"
                     v-if="editing"
                     @click="onSave">保存文档</el-button>

          <el-button class="button__custom"
                     v-if="editing"
                     @click="onCancel">取消</el-button>
        </div>
      </div>
      <add-document :show.sync="show" />
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import { SET_META, SET_MENU } from '@/utils/constants'
import AddDocument from '@/components/public/AddDocument'
import FileSelect from '@/components/public/FileSelect'
import meta from '@/mixins/meta';
export default {
  mixins: [meta],
  data () {
    return {
      addForm: {
        article_type_id: this.$store.state.meta.article_type_id,
        title: this.$store.state.meta.title,
        description: this.$store.state.meta.description,
        keywords: this.$store.state.meta.keywords,
        file_upload: ''
      },
      addRules: {
        article_type_id: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入meta标题', trigger: 'blur' }
        ]
      },
      show: false,
      showCard: true,
      editing: false
    }
  },
  computed: {
    ...mapState(['menu'])
  },
  mounted () {
    if (this.meta && this.meta.article_type_id) {
      this.addForm = {
        ...this.addForm,
        article_type_id: this.meta.article_type_id
      };
    }
  },
  components: {
    AddDocument,
    FileSelect
  },
  methods: {
    onToggle () {
      this.showCard = !this.showCard
    },
    onEdit () {
      this.editing = true;
    },
    onSave () {
      this.$refs.addForm && this.$refs.addForm.validate((valid) => {
        if (valid && !this.canClick) {
          let formData = new FormData();

          if (!!this.addForm.file_upload) {
            const icon = this.getExtName(this.addForm.file_upload.name);
            if (!icon) {
              return this.$message({
                message: '只能上传doc/docx/xls/xlsx/pdf文件',
                type: 'warning'
              });
            }
            formData.append('icon', icon)
            formData.append('file_upload', this.addForm.file_upload)
          }
          formData.append('article_type_id', this.addForm.article_type_id);
          formData.append('title', this.addForm.title)
          formData.append('keywords', this.addForm.file_upload)
          formData.append('description', this.addForm.keywords)
          this.canClick = true;
          this.$axios.post(`/article/update/${this.$store.state.meta.id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          )
            .then(res => {
              this.$store.commit(SET_META, {
                id: res.article.id,
                title: res.article.title,
                description: res.article.description,
                keywords: res.article.keywords
              })
              this.editing = false;
              delete this.canClick
            }).catch(err => {
              delete this.canClick
            })
        }
      });
    },
    onCancel () {
      this.init();
    },
    init () {
      const { title, description, keywords, article_type_id } = this.$store.state.meta;
      this.addForm.article_type_id = article_type_id;
      this.addForm.title = title;
      this.addForm.description = description;
      this.addForm.keywords = keywords;
      this.addForm.file_upload = '';
      this.editing = false;
    },
    getExtName (fileName) {
      const EXTNAME = fileName.replace(/.+\./, '').toLowerCase();
      const types = {
        'doc': 1,
        'docx': 1,
        'pdf': 2,
        'xls': 3,
        'xlsx': 3
      }
      return types[EXTNAME] ? types[EXTNAME] : null;
    },
    onDelete () {
      this.$confirm('此操作将永久删除该文档, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!!this.canDel) return;
        this.$axios.post(`/article/destroy/${this.$store.state.meta.id}`)
          .then(res => {
            delete this.canDel;
            this.$router.replace('/');
          }).catch(err => {
            delete this.canDel;
          });;
      }).catch(() => {
        delete this.canDel;
      });
    }
  }
}
</script>

<style scoped lang='scss'>
.button__danger {
  float: right;
}
.upload {
  width: 320px;
}
</style>
