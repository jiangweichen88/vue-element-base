export default {
	install(Vue, options = {}) {
		Vue.directive("expandClick", { //
			update(el, binding, vnode) { 
				console.log(binding)
				const s = document.styleSheets[document.styleSheets.length - 1]
				const DEFAULT = -10 // 默认向外扩展10px
				let expression= binding.expression && binding.expression.split(',') || [];
				if(expression.length==1){
					expression.length=4;
					expression.fill(expression[0]);
				}
				const [top, right, bottom, left] =expression;
//				console.log(expression)
				const ruleStr = `content:"";position:absolute;top:-${top || DEFAULT}px;bottom:-${bottom || DEFAULT}px;right:-${right || DEFAULT}px;left:-${left || DEFAULT}px;`
				const classNameList = el.className.split(' ')
				el.className = classNameList.includes('expand_click_range') ? classNameList.join(' ') : [...classNameList, 'expand_click_range'].join(' ')
				el.style.position = el.style.position || "relative"
				if(s.insertRule) {
					s.insertRule('.expand_click_range::before' + '{' + ruleStr + '}', s.cssRules.length)
				} else { /* IE */
					s.addRule('.expand_click_range::before', ruleStr, -1)
				}
			},
		});
	}
}
/* 
<div v-expandClick="20,30,40,50" @click="glabClickoutside"> 点击范围扩大</div>
,*/