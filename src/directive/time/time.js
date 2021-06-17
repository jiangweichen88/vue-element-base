export default {
	getFormatTime(value) {
		if(isNaN(value)) {
			console.error("the value is not a number");
			return;
		}
		const date = new Date(value);
		const year = date.getFullYear();
		const month = this.format(date.getMonth() + 1);
		const day = this.format(date.getDate());
		const hours = this.format(date.getHours());
		const minutes = this.format(date.getMinutes());
		const seconds = this.format(date.getSeconds());
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	},
	formatDate(timestamp = Date.now(),format = 'Y-M-D h:m') { // 日期格式化
		const date = new Date(timestamp)
		const dateInfo = {
			Y: date.getFullYear(),
			M: date.getMonth() + 1,
			D: date.getDate(),
			h: date.getHours(),
			m: date.getMinutes(),
			s: date.getSeconds()
		}
		const formatNumber = (n) => n > 10 ? n : '0' + n
		const res = format
			.replace('Y', dateInfo.Y)
			.replace('M', dateInfo.M)
			.replace('D', dateInfo.D)
			.replace('h', formatNumber(dateInfo.h))
			.replace('m', formatNumber(dateInfo.m))
			.replace('s', formatNumber(dateInfo.s))
		return res
	},
	format(value) {
		return value > 9 ? value : "0" + value;
	},
	getDownTime(value) {
		const date = new Date(value);
		const now = Date.now();
		const count = (date - now) / 1000;
		if(count <= 0) {
			return {
				clear: true,
				time: "00天00时00分00秒"
			};
		}
		return this.computeTime(count);
	},
	computeTime(value) {
		const day = this.format(Math.floor(value / 86400));
		const hours = this.format(Math.floor((value % 86400) / 3600));
		const minutes = this.format(Math.floor(((value % 86400) % 3600) / 60));
		const seconds = this.format(Math.floor(((value % 86400) % 3600) % 60));
		return `${day}天${hours}时${minutes}分${seconds}秒`;
	}
};