<template>
  <el-dialog title="新增分类"
             :before-close="onCancel"
             :visible.sync="show">
    <el-form ref="addForm"
             class="add-form"
             label-position="top"
             :rules="addRules"
             :model="addForm">
      <el-form-item label="分类名称"
                    :inline-message="true"
                    prop="name">
        <el-input v-model="addForm.name"
                  autocomplete="off"></el-input>
      </el-form-item>

      <div class="tip">
        以下项目为Metadata，这部分项目本身并不出现在页面中，主要的目的在于供爬虫进行索引和收录
      </div>

      <el-form-item label="route"
                    :inline-message="true"
                    prop="route">
        <div class="clearfix">
          <div class="left">{{baseApi}}</div>
          <div class="left-input">
            <el-input v-model="addForm.route"
                      autocomplete="off"></el-input>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="Title"
                    :inline-message="true"
                    prop="title">
        <el-input v-model="addForm.title"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Description(内容描述)"
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
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const validate = (rule, value, callback) => {
      if (/^\s*$/.test(value)) {
        callback(new Error('url不能为空'));
      } else if (!/^\w+$/.test(value)) {
        callback(new Error('请输入数字、英文字母、_'));
      } else {
        callback();
      }
    };
    return {
      addForm: {
        name: '',
        title: '',
        route: '',
        description: '',
        keywords: ''
      },
      baseApi: process.env.BASE_API === 'prod' ? 'https://doc.mayihr.com/' : 'https://doc.mayitest.cn/',

      addRules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 1, max: 20, message: '请输入1~10个字符', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入meta标题', trigger: 'blur' },
          { min: 1, max: 20, message: '请输入1~20个字符', trigger: 'blur' }
        ],
        route: [
          { validator: validate, trigger: 'blur' },
          { min: 1, max: 20, message: '请输入1~20个字符', trigger: 'blur' }
        ],
        description: [
          { max: 250, message: '最多250个字符', trigger: 'blur' }
        ],
        keywords: [
          { max: 50, message: '最多50个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    submitAddForm () {
      this.$refs.addForm && this.$refs.addForm.validate((valid) => {
        if (valid && !this.canClick) {
          this.canClick = true;
          this.$axios.post('/menu/store', this.addForm)
            .then(res => {
              delete this.canClick;
              this.$store.commit(SET_MENU, res.menu);
              this.$router.push({ path: `/${res.meta.route}` })
              this.onCancel();
            }).catch(err => {
              delete this.canClick;
            })
        }
      })
    },
    onCancel () {
      this.$emit('update:show', false)
      this.$refs.addForm && this.$refs.addForm.resetFields();
    }
  }
}
</script>

<style scoped>
.tip {
  width: 320px;
  margin: 20px 0;
}
.left {
  float: left;
  width: 145px;
}
.clearfix {
  width: 320px;
  float: left;
}
</style>
