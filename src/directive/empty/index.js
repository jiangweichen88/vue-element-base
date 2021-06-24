import { queryElement } from "@/components/common.js";
export default {
	install(Vue, options = {}) {
		Vue.directive("empty", { //
			update(el, binding, vnode) {
				el.style.position = el.style.position || 'relative'
				const {
					offsetHeight,
					offsetWidth
				} = el
				const {
					show,
					content,
					img
				} = binding.value
				const image = img ? `<img src="${img}" height="30%" width="30%"></img>` : ''
				const defaultStyle = "color: #909399;position:absolute;top:0;left:0;z-index:9999;background:#fff;display:flex;justify-content: center;align-items: center;"
				const empty = Vue.extend({
					template: `<div class="jc-empty" style="height:100%;width:${offsetWidth}px;${defaultStyle}">
      <div style="text-align:center">
        <div>${image}</div>
        <div>${content || '暂无数据'}</div>
      </div>
    </div>`
				})
				const component = new empty().$mount().$el
				const dom = queryElement('.jc-empty', el);
				if(show) {
					if(dom.length){
						el.removeChild(dom[0])
					}
				    el.appendChild(component)
				} else if(dom[0]){
					el.removeChild(dom[0])
				}
			},
		});
	}
}
/* 
v-empty="emptyValue"
 emptyValue = {
  content: '暂无列表',
  img: require('../../assets/images/blue_big.png'),
  show: true,
}
,*/