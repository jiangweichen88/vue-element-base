<template>
  <div class="icons-container">
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div class="grid">
          <div v-for="item of svgIcons" :key="item" @click="handleClipboard(generateIconCode(item),$event)">
            <el-tooltip :disabled="disabled" placement="top">
              <div slot="content">
                {{ generateIconCode(item) }}
              </div>
              <div class="icon-item">
                <svg-icon :icon-class="item" class-name="disabled" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div class="grid">
          <div v-for="item of elementIcons" :key="item" @click="handleClipboard(generateElementIconCode(item),$event)">
            <el-tooltip :disabled="disabled" placement="top">
              <div slot="content">
                {{ generateElementIconCode(item) }}
              </div>
              <div class="icon-item">
                <i :class="'el-icon-' + item" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clipboard from '@/utils/clipboard'
import svgIcons from './svg-icons'
import elementIcons from './element-icons'
import { parseDom } from '@/utils/common.js'
export default {
  name: 'Icons',
  props: {
    iconsOpt: {}
  },
  data() {
    return {
      svgIcons,
      elementIcons,
      disabled: false
    }
  },
  watch: {
    iconsOpt: {
      handler(newName, oldName) {
        console.log(newName)
        this.disabled = !newName.tooltip
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    generateElementIconCode(symbol) {
      return `<i class="el-icon-${symbol}" />`
    },
    handleClipboard(text, event) {
      if (Object.keys(this.iconsOpt).length) {
        const dom = parseDom(text)
        console.log(text, event, dom)
        this.$emit('iconClick', dom[0].getAttribute('icon-class') || dom[0].className)
      } else {
        clipboard(text, event)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
	.icons-container {
		margin: 10px 20px 0;
		overflow: hidden;
		.grid {
			position: relative;
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		}
		.icon-item {
			margin: 20px;
			height: 85px;
			text-align: center;
			width: 100px;
			float: left;
			font-size: 30px;
			color: #24292e;
			cursor: pointer;
		}
		span {
			display: block;
			font-size: 16px;
			margin-top: 10px;
		}
		.disabled {
			pointer-events: none;
		}
	}
</style>
