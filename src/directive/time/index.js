import Time from "./time.js";
export default {
	install(Vue, options = {}) {
		Vue.directive("time", { //v-time获取一个传入的时间戳值binding.value，然后返回一个符合格式的time值
			bind(el, binding) {
				console.log(el, binding)
				console.log(el.attributes, el.attributes.format.value, el.getAttribute('format'))
				const format = el.attributes.format.value;
				el.innerHTML = el.innerHTML ? el.innerHTML : el.textContent;
				el.innerHTML = Time.formatDate(binding.value, format);
			}
		});
		Vue.directive("clock", { //时钟指令 v-clock每隔一秒获取一次当前时间实现时钟的效果。
			bind(el, binding) {
				el.timeout = setInterval(function() {
					const value = Date.now();
					el.innerText = Time.getFormatTime(value);
				}, 1000);
			},
			unbind() {
				if(el) {
					clearInterval(el.timeout);
					delete el.timeout;
				}

			}
		});
		Vue.directive("down", { //传入未来的一个时间戳，计算倒计时间。
			bind(el, binding) {
				const value = binding.value;
				el.__handle__ = setInterval(() => {
					if(Time.getDownTime(value).clear) {
						clearInterval(el.__handle__);
						el.innerText = Time.getDownTime(value).time;
						return;
					}
					el.innerText = Time.getDownTime(value);
				}, 1000);
			},
			unbind() {
				clearInterval(el.__timeout__);
				delete el.__timeout__;
			}
		});
	}
};