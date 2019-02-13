<template>
  <div class="left-side">
    <div class="menu__manage"
         v-if="identity === 1">
      <div class="menu__manage-title"><i class="icon iconfont myhr-setting"></i>分类目管理</div>
      <div class="menu__manege-group">
        <el-button class="button__custom"
                   type="primary"
                   @click="show = true">新增分类</el-button>
        <el-button class="button__custom"
                   @click="startSort">调整顺序</el-button>
      </div>
    </div>
    <ul class="menu__list">
      <nuxt-link to="/"
                 tag='li'
                 exact>
        <i class="icon iconfont myhr-housing"></i>所有文档
      </nuxt-link>
      <nuxt-link v-for="item in menu"
                 :key="item.id"
                 tag="li"
                 :to="'/' + (item.route || item.id)">
        <i class="icon iconfont myhr-folder"></i>{{item.name}}
      </nuxt-link>
    </ul>
    <add-category :show.sync="show"
                  v-if="show" />
    <el-dialog title="调整顺序"
               v-if="dialogSort"
               :visible.sync="dialogSort">
      <draggable v-model="sorts"
                 :options="{draggable:'.item'}">
        <transition-group name="flip-list"
                          tag="div">
          <div v-for="ele in sorts"
               :key="ele.id"
               class="item">
            {{ele.name}}
          </div>
        </transition-group>

      </draggable>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogSort = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitSort">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import identity from '@/mixins/identity';
import { SET_MENU } from '@/utils/constants'
import draggable from 'vuedraggable'
import AddCategory from '@/components/public/AddCategory'

export default {
  mixins: [identity],
  computed: {
    ...mapState(['menu'])
  },
  data () {
    return {
      show: false,
      dialogSort: false,
      sorts: []
    }
  },
  components: {
    draggable,
    AddCategory
  },
  methods: {
    startSort () {
      this.sorts = [
        ...this.menu
      ];
      this.dialogSort = true;
    },
    submitSort () {
      if (!!this.canClick) return;
      const ids = this.sorts.map(item => item.id);
      this.canClick = true;
      this.$axios.post(`/menu/sort`, {
        ids: ids
      }).then(res => {
        delete this.canClick;
        this.dialogSort = false;
        this.$store.commit(SET_MENU, res.menu);
        this.sorts = []
      }).catch(err => {
        delete this.canClick;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/public/left_side.scss';
</style>
