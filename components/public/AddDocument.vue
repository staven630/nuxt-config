<template>
  <el-dialog title="新增文档"
             :before-close="onCancel"
             :visible.sync="show">
    <el-form ref="addForm"
             class="add-form"
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
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary"
                 @click="submitAddForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { SET_MENU } from '@/utils/constants'
import meta from '@/mixins/meta';
import FileSelect from '@/components/public/FileSelect'
import { mapState } from 'vuex'
export default {
  mixins: [meta],
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['menu'])
  },
  data () {
    return {
      baseURL: process.env.baseUrl,
      addForm: {
        title: '',
        description: '',
        keywords: '',
        file_upload: '',
        article_type_id: this.meta ? this.meta.id : ''
      },
      addRules: {
        article_type_id: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入meta标题', trigger: 'blur' },
          { min: 1, max: 20, message: '请输入1~20个字符', trigger: 'blur' }
        ],
        description: [
          { max: 250, message: '最多250个字符', trigger: 'blur' }
        ],
        keywords: [
          { max: 50, message: '最多50个字符', trigger: 'blur' }
        ],
        file_upload: [
          { required: true, message: '请上传文件', trigger: 'change' }
        ]
      }
    }
  },

  mounted () {
    if (this.meta && this.meta.id) {
      this.addForm = {
        ...this.addForm,
        article_type_id: this.meta.id
      };
    }
  },

  components: {
    FileSelect
  },

  methods: {
    submitAddForm () {
      this.$refs.addForm && this.$refs.addForm.validate((valid) => {
        if (valid && !this.canClick) {
          const icon = this.getExtName(this.addForm.file_upload.name);
          if (!icon) {
            return this.$message({
              message: '只能上传doc/docx/xls/xlsx/pdf文件',
              type: 'warning'
            });
          }
          let formData = new FormData();
          formData.append('title', this.addForm.title)
          formData.append('keywords', this.addForm.keywords)
          formData.append('description', this.addForm.description)
          formData.append('icon', icon)
          formData.append('file_upload', this.addForm.file_upload)
          formData.append('article_type_id', this.addForm.article_type_id)
          this.canClick = true;
          this.$axios.post('/article/store',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          )
            .then(res => {
              delete this.canClick;
              this.onCancel();
              this.$router.push({ path: `/${res.article.parent_route}/${res.article.id}` })
            }).catch(err => {
              delete this.canClick;
            })
        }

      })
    },
    onCancel () {
      this.$emit('update:show', false)
      this.$refs.addForm.resetFields();
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
    }

  },
  watch: {
    addForm: {
      handler (newVal, oldVal) {
        if (!!newVal.file_upload) {
          this.$refs.addForm.validateField('file_upload')
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.upload {
  width: 320px;
  float: left;
}
</style>
