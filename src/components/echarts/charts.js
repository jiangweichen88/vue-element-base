import * as echarts from 'echarts';
import { orderSort } from '@/components/common.js'
export function optionBar0(data) {
	let xData = [],
		yData = data.data,
		yData1 = [];
	data.data.map(item => {
		xData.push(item.name);
		if(item.hasOwnProperty('value1')) {
			//			console.log(item.value1)
			yData1.push(item.value1)
		}
	});
	let color = '#597EF7 ';
	data.name == '影响力' ? color = "#13C2C2" : ''
	data.name == '引导力' ? color = "#FF7A45" : ''
	data.name == '公信力' ? color = "#FADB14" : ''
	// 绘制图表
	let option = {
		xAxis: {
			type: 'category',
			data: xData,
			axisLabel: {
				// interval: 0
				margin: 20,
			},
			splitLine: {
				show: false
			},

			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			nameGap: 30,
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		yAxis: {
			type: 'value',
			splitLine: {
				lineStyle: {
					type: 'dashed',
				}
			}
		},
		grid: {
			left: 0,
			right: 0,
			bottom: 10,
			top: 10,
			containLabel: true
		},
		series: [{
			data: yData,
			name: data.name,
			barWidth: 28,
			itemStyle: {
				normal: {
					// color: '#1E71F0'
					color: color
					//					(params) => {
					//						let colors = ['#5b8ff9', '#5ad8a6', '#5d7092', '#f6bd16', '#e86452', '#6dc8ec', '#945fb9', '#ff9845', '#1e9493', '#a28eee']
					//						let num = params.dataIndex % 10
					//						return colors[num]
					//					}
				}
			},
			type: 'bar'
		}]
	};
	if(yData1 && yData1.length) {
		//		console.log(yData1)
		option.series.push({
			data: yData1,
			name: data.name,
			barWidth: 28,
			itemStyle: {
				normal: {
					color: (params) => {
						let colors = ['#5b8ff9', '#5ad8a6', '#5d7092', '#f6bd16', '#e86452', '#6dc8ec', '#945fb9', '#ff9845', '#1e9493', '#a28eee']
						let num = params.dataIndex % 10
						return colors[num]
					}
				}
			},
			type: 'bar'
		})
	}
	return option;

}

export function optionBar1(data) {
	let colorList = ['#597EF7', '#13C2C2', '#FF7A45', '#FADB14'];
	let colorList1 = ['#FF4546 ', '#FA6400', '#F7B500', '#151515'];
	let datas = data.data;
	let arr = ['S', 'F', 'G', 'T'];
	const childValue = data.data[0].childValue;
//	console.log(childValue);
	const lengendData = childValue.map((item, index) => {
		return {
			name: item.indicatorName,
			itemStyle: {
				color: colorList[index]
			}
		}
	})
//	console.log('lengendData', lengendData);
	let data0 = arr.map((item2, i) => data.data.map(item => {
		let aa = item.childValue.find(item3 => item3.code == item2)
		return {
			...aa,
			value: Number(aa.indexValue),
			value1: Number(item.indexValue),
			index: i,
			name1: item.deptName,
			flag: item.flag,
			name: aa.name || aa.indicatorName,
		};
	}));
//	console.log('jkljkjk', data0)
	let maxArr = data.data.map(item => {
		return {
			...item,
			value: datas[0].value
		}
	})
	let option = {
		tooltip: {
			trigger: 'item',
			//			formatter: function(params) {
			//				console.log(params)
			//			},
		},
//		legend: {
//			bottom: 10,
//			show: true,
//			selectedMode: false,
//			data: lengendData,
//			show:false
//		},
		color: colorList,

		grid: {
			left: -86,
			right: -72,
			top: 0,
			bottom: -20,
			containLabel: true,
		},
		xAxis: {
			show: false,
			type: 'value',
		},
		yAxis: [{
				type: 'category',
				inverse: true,
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				axisPointer: {
					label: {
						show: true,
						margin: 0,
					},
				},
				data: data0[0].map((item) => item.name1),
				axisLabel: {
					margin: 100,
					fontSize: 18,
					align: 'left',
					color: '#333',
					fontFamily: 'PingFangSC-Medium',
					verticalAlign: 'middle',
					rich: {
						a1: {
							color: '#fff',
							backgroundColor: {
								image: `/img/bg/rank1.png`
							},
							width: 22,
							height: 22,
							align: 'center',
							borderRadius: 22,
							fontFamily: 'DINAlternate-Bold',
						},
						a2: {
							color: '#fff',
							backgroundColor: {
								image: `/img/bg/rank2.png`
							},
							width: 22,
							height: 22,
							align: 'center',
							fontFamily: 'DINAlternate-Bold',
							borderRadius: 22,
						},
						a3: {
							color: '#fff',
							backgroundColor: {
								image: `/img/bg/rank3.png`
							},
							width: 22,
							height: 22,
							align: 'center',
							fontFamily: 'DINAlternate-Bold',
							borderRadius: 22,
						},
						b: {
							color: '#666',
							backgroundColor: '#F0F2F5',
							fontSize: 14,
							width: 22,
							height: 22,
							align: 'center',
							fontFamily: 'DINAlternate-Bold',
							borderRadius: 22,
						},
						name: {
							color:'#333333',
							fontSize: 18,
//							fontFamily: 'DIN-Medium',
							fontWeight:600,
							 lineHeight:18,
							 padding: [2, 0, 0, 0],
						},
					},
					formatter: function(params) {
						var index = datas.map((item) => item.name).indexOf(params);
						index = index + 1;
						if(index - 1 < 3) {
							return ['{a' + index + '|' + ' ' + '}' + '  ' +'{name'+'|'+params+'}' ].join('\n');
						} else {
							return ['{b|' + index + '}' + '  ' +'{name'+'|'+params+'}'].join('\n');
						}
					},
				},
			},
			{
				type: 'category',
				inverse: true,
				axisTick: 'none',
				axisLine: 'none',
				show: true,
				data: data0[0].map((item) => item.value1),
				axisLabel: {
					show: true,
					margin: 72,
					fontSize: 14,
					color: '#333',
					align: 'right',
					formatter: function(ps, index) {
						let flag = data0[0][index].flag;
						//						console.log(ps, index)
						if(ps == -1) {
							return ``
						} else if(index > 2) {
							if(flag != -1) {
								return [`{3|${ps}}` + ' ' + `{a` + flag + `| }`];
							} else {
								return [`{3|${ps}}` + ' ' + `{a| }`];
							}

						} else {
							if(flag != -1) {
								return [`{${index}|${ps}}` + ' ' + `{a` + flag + `| }`];
							} else {
								return [`{${index}|${ps}}` + ' ' + `{a| }`];
							}
						}
					},
					rich: {
						0: {
							color: colorList1[0],
							fontFamily: 'DINAlternate-Bold',
							fontSize: 20,
							 lineHeight:20,
							 width:56,
							 padding: [3, 3, 0, 2],
						},
						1: {
							color: colorList1[1],
							fontSize: 20,
							fontFamily: 'DINAlternate-Bold',
							 padding: [3, 3, 0, 2],
						},
						2: {
							color: colorList1[2],
							fontSize: 20,
							fontFamily: 'DINAlternate-Bold',
							 padding: [3, 3, 0, 2],
						},
						3: {
							color: '#151515',
							fontSize: 20,
							fontFamily: 'DINAlternate-Bold',
							 padding: [3, 3, 0, 2],
						},
						a: {
							color: '#fff',
							backgroundColor: {
								image: `/img/bg/down-green.png`
							},
							width: 12,
							height: 16,
						},
						a0: {
							color: '#fff',
							backgroundColor: {
								image: `/img/bg/equal.png`
							},
							width: 12,
							height: 16,
							fontFamily: 'DIN-BlackItalicAlt',
							borderRadius: 2,
						},
						a1: {
							color: '#fff',
							backgroundColor: {
								image: `/img/bg/up-red.png`
							},
							width: 12,
							height: 16,
						}
					},
				},
			},
		],
		series: [],
	};
	const arr0 = data0[0].map((item, i) => {
		return data0.map((item2, k) => {
			return item2[i].value
		})
	});
	const bb = arr0.map(item => {
		return item.map((item2, k) => {
			if(item2 > 0) {
				return k
			}
		}).filter(item3 => typeof item3 != 'undefined');
	})
	//	console.log(arr0, bb);
	data0.map((item2, i) => {
		let obj = {
			z: 2,
			name: item2[0].name,
			type: 'bar',
			barWidth: 20,
			stack: 'total',
			zlevel: 1,
			emphasis: {
				focus: 'series'
			},
			color: colorList[i],
			data: item2.map((item, k) => {
				//				console.log(getIndex(data0, 0, k, 'head'), getIndex(data0, data0.length - 1, k, 'foot'));
				if(item.value1==-1){

				}
				let itemStyle = {
					color: colorList[i],
					barBorderRadius: bb[k].length == 1 ? [10, 10, 10, 10] : (i == bb[k][0] ? [10, 0, 0, 10] : (i === bb[k][bb[k].length - 1] ? [0, 10, 10, 0] : 0)),
					//					barBorderRadius: i == getIndex(data0, 0, k, 'head') ? [10, 0, 0, 10] : (i == getIndex(data0, data0.length - 1, k, 'foot') ? [0, 10, 10, 0] : 0),

				};
//				console.log(item)
				return {
					...item,
					value: item.value,
					itemStyle: itemStyle,
					label: {
						show:item.value1==-1? true:false,
						formatter:"数据暂未接入",
						position: 'inside',
						color: '#717171',
						fontSize: 12.5,
						offset: [52, 1],
					},
				};
			}),
		};
		option.series.push(obj);
	})
	option.series.push({
		name: '背景',
		type: 'bar',
		barWidth: 20,
		z: 1,
		zlevel: 0,
		barGap: '-100%',
		tooltip: {
			show: false
		},
		label: {
			show: false,
			formatter: '{c}%',
			textStyle: {
				align: 'center',

				fontSize: 14,
				fontWeight: '100',
				color: '#fff',
			}
		},
		itemStyle: {
			normal: { 
				color: '#F0F2F5',
				barBorderRadius: 10,
			},
		},
		data: maxArr,
	});
	return option;
}
// 传播走势
export function setLine0(data1, isLen1) {
	if(!data1) {
		return;
	}
	let data =
		data1.pieParams.length == 1 ? data1.pieParams[0] : data1.pieParams;
	let series = [],
		xAxisData = [],
		legendData = [];
	let colorArr = [];
	if(isLen1) {
		//单图例
		colorArr = ["#2878FF"];
		console.log(data1, data);
		let data0 = data.map((item, k) => {
			xAxisData.push(item.showName);
			return item.value;
		});
		const a = {
			name: "信息量",
			data: data0,
			type: "line",
			smooth: true,
			smoothMonotone: "x",
			cursor: "pointer",
			showSymbol: false,
			lineStyle: {
				//					"shadowColor": "rgba(18,61,172,0.5)",
				//					"shadowBlur": 10
			},
		};
		series.push(a);
	} else {
		data.map((item, k) => {
			legendData.push(legendObj1[item.channel][0]);
			if(legendObj1[item.channel] && legendObj1[item.channel][1]) {
				colorArr.push(legendObj1[item.channel][1]);
			}
			const data0 = item.times
				.map((o, i) => {
					if(k == 0) {
						xAxisData.push(o.name || o.showName);
					}
					return o.value;
				})
				.flat();
			//			console.log(data);
			const a = {
				name: legendObj1[item.channel][0],
				data: data0,
				type: "line",
				smooth: true,
				smoothMonotone: "x",
				cursor: "pointer",
				// "showSymbol": false,
				lineStyle: {
					//					"shadowColor": "rgba(18,61,172,0.5)",
					//					"shadowBlur": 10
				},
				markPoint: {
					symbol: "circle",
					symbolSize: 1,
					label: {
						show: true,
						position: "top",
					},
					data: [{
							type: "max",
							name: "最大值"
						},
						{
							type: "min",
							name: "最小值"
						},
					],
				},
			};
			series.push(a);
		});
	}
	//		console.log(xAxisData);
	//		const bigvalue = xAxisData.length > 5 ? (100 / Math.ceil(xAxisData.length / 6)) : 100;
	let formatter = function(params) {
		//console.log(params)
		let temp = [];
		let temp2 = "";
		let leftSide = "";
		let rightSide = "";
		for(let item of params) {
			temp.push({
				seriesName: item.seriesName,
				value: item.value,
			});
		}
		let arr = temp;
		let midValue = Math.ceil(arr.length / 2);
		for(let [key, item] of arr.entries()) {
			//          item.seriesName="测试数据";
			if(key < midValue && midValue > 4) {
				if(isNaN(item.value)) {
					leftSide += `${item.seriesName}: 无数据<br>`;
				} else {
					leftSide += `  <span><span style="    margin-right: 6px;
    border-radius: 5px;width:10px;height:10px;display:inline-block;background:${colorArr[key]}"></span>${item.seriesName}: ${item.value}</span><br>`;
				}
			} else {
				if(isNaN(item.value)) {
					rightSide += `${item.seriesName}: 无数据<br>`;
				} else {
					rightSide += `  <span><span style="    margin-right: 6px;
    border-radius: 5px;width:10px;height:10px;display:inline-block;background:${colorArr[key]}"></span>${item.seriesName}: ${item.value}</span><br>`;
				}
			}
		}
		temp2 = `<div>${params[0].name}</div><div class="dis-f" style="display: flex;z-index:9999999999999;    position: relative;">
            <div>${leftSide}</div>
            <div style="margin-left:20px;">${rightSide}</div>
            </div>`;
		return temp2;
	};
	let option = {
		textStyle: {
			fontFamily: "Din-Light",
		},
		color: colorArr,
		title: {
			text: "",
			left: "47%",
			textStyle: {
				fontSize: 24,
			},
		},
		legend: {
			show: false,
			data: legendData,
			left: "center",
			//				"selected": {
			//					"a": true,
			//				},
			itemWidth: 10,
			itemHeight: 10,
			itemGap: 10,
			textStyle: {
				color: "#898989",
				lineHeight: 15,
			},
			type: "scroll",
		},
		tooltip: {
			backgroundColor: "#fff",
			trigger: "axis",
			axisPointer: {
				type: "none",
			},
			textStyle: {
				color: "#565656",
				lineHeight: 28,
				align: "left",
			},
			confine: true,
			padding: 12,
			extraCssText: "box-shadow: 0px 2px 8px 0px #cacaca;border-radius: 4px;opacity: 0.9;",
			formatter: formatter,
		},
		dataZoom: [{
				show: false,
				realtime: true,
				start: 0,
				end: 100,
			},
			{
				type: "inside",
				realtime: true,
				start: 0,
				end: 110,
			},
		],
		grid: {
			left: 18,
			right: 42,
			top: 20,
			bottom: 0,
			containLabel: true,
		},
		xAxis: {
			type: "category",
			boundaryGap: true,
			data: xAxisData,
			//				 max:8,
			//				 min:2,
			nameGap: 80,
			axisLabel: {
				showMaxLabel: true,
				showMinLabel: true,
				color: "rgba(0,0,0,0.65)",
				//					 align:'left',
				fontSize: 14,
				//X轴标签 label 做了特殊处理，防止左右溢出
				//        formatter: (value, index) => {
				//          return `${value.slice(0, 10)}\n${value.slice(11)} `;
				//        },
			},
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
		},
		yAxis: {
			//			name: "",
			nameTextStyle: {
				color: "gray",
			},
			type: "value",
			axisLabel: {
				color: "rgba(0,0,0,0.65)",
				fontSize: 14,
				//					"inside": true,
				//					"margin": 0,
				verticalAlign: "bottom",
			},
			splitLine: {
				lineStyle: {
					type: "dashed",
				},
			},
			minInterval: 1,
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
		},
		series: series,
	};
	return option;
}

export function setLine1(data) {
	let pointStyle = {
		borderColor: '#ea6f21',
		color: '#fff',
		borderWidth: 2,
	}
	let seriesData = data;
	let option = {
		grid: {
			top: 10,
			left: 0,
			right: 0,
			bottom: 0,
			containLabel: true,
		},
		tooltip: {
			show: true,
		},
		xAxis: {
			type: 'category',
			data: data.map(item => item.name),
			axisLabel: {
				// interval: 0
				margin: 20,
			},
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			nameGap: 30,
		},

		yAxis: {
			type: 'value',
			minInterval: 1,
			splitLine: {
				lineStyle: {
					type: 'dashed',
				}
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
		},
		series: [{
			type: 'line',
			showAllSymbol: true,
			symbol: 'circle',
			symbolSize: 10,
			lineStyle: {
				color: '#ea6f21',
				width: 5,
			},
			itemStyle: pointStyle,
			tooltip: {
				show: true,
			},
			areaStyle: {
				color: new echarts.graphic.LinearGradient(
					0,
					0,
					0,
					1, [{
							offset: 0,
							color: 'rgba(236, 169, 44, 1)',
						},
						{
							offset: 1,
							color: 'rgba(236, 169, 44,0)',
						},
					],
					false
				),
			},
			data: seriesData,
			markLine: {
				symbol: ['none', 'none'], //去掉箭头
				itemStyle: {
					normal: {
						lineStyle: {
							type: 'dashed',
							color: '#ccc',
							width: 2
						}
					},
				}
			},
		}, ],
	};
	return option
}