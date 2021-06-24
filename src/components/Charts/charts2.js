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
					color: (params) => {
						let colors = ['#5b8ff9', '#5ad8a6', '#5d7092', '#f6bd16', '#e86452', '#6dc8ec', '#945fb9', '#ff9845', '#1e9493', '#a28eee']
						let num = params.dataIndex % 10
						return colors[num]
					}
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
export function optionBar0Percent(data) {
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
            },
            formatter: '{c}%',//显示百分号
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
					color: (params) => {
						let colors = ['#5b8ff9', '#5ad8a6', '#5d7092', '#f6bd16', '#e86452', '#6dc8ec', '#945fb9', '#ff9845', '#1e9493', '#a28eee']
						let num = params.dataIndex % 10
						return colors[num]
					}
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
export function optionBar2(optiondata,selectLeng) {
        let lengendData=[]
        optiondata[0].childrean.forEach(item=>{
            lengendData.push(item.name)
        })
        let yAxis=[]
        optiondata.forEach(item=>{
            yAxis.push(item.deptName)
        })
        
        let sdata=lengendData.map((item2, i) => optiondata.map(item => {
            let aa=item.childrean.find(item3=> item3.name==item2)
             return{ 
                 ...aa,
                 value: Number(aa.value),
                 index:i,
                name1: item.deptName,
                name: aa.name ,
             };
        }));
        // 绘制图表
        let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter:function(op){
                        let html='';
                        op.map(item=>{
                            html+=`<div class='EchartsToolBox'>
                                <div class='inlineTool'><span class='point' style='border: 4px solid ${item.color}'></span>${item.name}<span>${item.value}</span></div>
                            </div>`
                        })
                    return html
                    }
                },
                legend: {
                    bottom:'bottom',
                    right:'4%',
                    icon:'circle',
                    // itemWidth: 18,
                    itemHeight: 8,
                    itemGap: 20,
                    data: lengendData,
                    selected:selectLeng
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    top: 10,
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    show:true
                },
                // color:['#10239e','#1d39c4','#2f54eb','#597ef7','#85a5ff','#adc6ff','#d6e4ff',],
                color:['#722ED1','#2F54EB','#1890FF','#13C2C2','#52C41A','#FA8C16','#FA541C',],
                yAxis: {
                    type: 'category',
                    axisLine:{
                    show:false
                    },
                    axisTick:{
                    show:false
                    },
                    data: yAxis
                },
                series: []
            }
        
    sdata.map((item2, i) => {  
        let obj={
            name: item2[0].name,
            type: 'bar',
            large: true,
            stack: '总量',
            barWidth: 20,
            // label: {
            //     show: true,
            //     position: 'inside'
            // },
            data: item2.map((item, i) => {
				return {
					...item,
					value: item.value,
                    label: {
                        show: item.value>0?true:'',
                        position: 'inside',
                        color:'#fff'
                    },
				};
			}),
        }
        option.series.push(obj);
    })
	return option
}
export function lineOption(optiondata) {
    let Xdata=[]
    optiondata[0].indexDateEntities.forEach(item=>{
        Xdata.push(item.indexDate)
    })
    // 绘制图表
	let option = {
		title: {
			text: '',
            show:false
		},
		tooltip: {
			trigger: 'axis'
		},
        color:['#1E71F0','#5AD8A6','#5D7092','#F6BD16','#E86452','#6DC8EC','#945FB9','#FF9845','#1E9493','#FF99C3'],
		legend: {
            icon: "rect",
            bottom:'bottom',
            right:'4%',
            itemWidth: 18,
            itemHeight: 6,
            itemGap: 20,
		},
		grid: {
			left: '3%',
            right: '4%',
            bottom: '15%',
            top: 10,
            containLabel: true
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: Xdata
		},
		yAxis: {
			type: 'value'
		},
		series: []
	}
    optiondata.forEach(item=>{
        let obj={
            name: item.depName,
            type: 'line',
            smooth: true,
            symbol: "circle",
            symbolSize: 6,
            showSymbol:false,
            data: item.indexDateEntities.map(item2=>{
                return {
					...item,
					value: item2.indexValue,
				};
            })
        }
        option.series.push(obj)
    })
	return option
}
export function pieoption(optionData){
    console.log('optionData',optionData);
    let otherData=optionData.find(item=>item.code==='P').indexValue
    let cf=optionData.find(item=>item.code==='CF').value
    let option={
        title: [{
          text: '覆盖率',
          top: 'center',
          left: 'center',
          textStyle: {
              fontSize: 14,
              fontWeight: 'normal',
              fontFamily:'PingFang SC',
              color: 'rgba(0, 0, 0, 0.45)',
              padding: [10, 0]
          }
      },
      {
          text: cf,
          top: '52%',
          left: 'center',
          textStyle: {
              fontSize: 28,
              fontWeight: 'bold',
              fontFamily:'DIN Alternate',
              color: 'rgba(0, 0, 0, 0.85)',
          }
      }],
      color:['#1e71f0','#f0f2f5'],
    //   color:['#f0f2f5','#1e71f0'],
      tooltip: {
          backgroundColor: "#fff", //设置背景图片 rgba格式
          borderColor:'#fff',
          trigger: 'item',
          textStyle:{
              color:'#333'
          },
          formatter:function(op){
              let html='';
              if(op.name && op.name==optionData.find(item=>item.code==='UC').name){
                  html+=`<div class='EchartsToolBox'>
                      <div class='inlineTool'><span class='point' style='border: 4px solid ${op.color}'></span>${op.name}<span>${op.value}</span></div>
                  </div>`
              }
              return html
          }
      },
      series: [
        {
            name: '',
            type: 'pie',
            radius: ['65%', '85%'],
            // center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
                show: false,
            },
            labelLine: {
                show: false
            },
            hoverAnimation: false,
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            data: [
                {
                  value: optionData.find(item=>item.code==='UC').indexValue,
                  name: optionData.find(item=>item.code==='UC').name,
                  itemStyle: {
                    normal: {
                        color: '#1e71f0',
                        label: {
                          show: false
                      },
                      labelLine: {
                          show: false
                      },
                    },
                    emphasis: {
                        color: '#1e71f0',
                        label: {
                          show: false
                      },
                      labelLine: {
                          show: false
                      },
                    }
                }
                  
                },
                {
                  value: otherData-optionData.find(item=>item.code==='UC').indexValue,
                  name: '',
                  itemStyle: {
                    normal: {
                        color: '#f0f2f5',
                        label: {
                          show: false
                      },
                      labelLine: {
                          show: false
                      },
                    },
                    emphasis: {
                        color: '#f0f2f5',
                        label: {
                          show: false
                      },
                      labelLine: {
                          show: false
                      },
                    }
                    }
                },
            ]
        }
    ]
    }
  return option
}
export function pieoption2(optiondata,seriesName) {
    let dataSum=0;
    optiondata.forEach(e=>{
          Number(dataSum+=Number(e.indexValue))
        })
   // 绘制图表
   let option = {
    title: [{
      text: '{name|发稿量}\n{val|'+dataSum+'}',
      top: 'center',
      left: '25%',
      textAlign:'center',
      textStyle: {
          rich: {
              name: {
                  fontSize: 14,
                  fontWeight: 'normal',
                  fontFamily:'PingFang SC',
                  color: 'rgba(0, 0, 0, 0.45)',
                  padding: [10, 0]
              },
              val: {
                  fontSize: 28,
                  fontWeight: 'bold',
                  fontFamily:'DIN Alternate',
                  color: 'rgba(0, 0, 0, 0.85)',
              }
          }
      }
  }],
  legend: {
      right:"20%",
      top:'center',
      show: true,
      icon:'circle',
      orient: "vertical",
      formatter: function (name) {
        let target=optiondata.filter(item=>item.name==name);
          return name + '（'+target[0].value+'）';
      }
  },
  
  color:['#1e71f0','#5ad8a6','#667898','#f6bd16','#6dc8ec','#945fb9','#ff9845',],
  tooltip: {
      backgroundColor: "#fff", //设置背景图片 rgba格式
      borderColor:'#fff',
      trigger: 'item',
      textStyle:{
          color:'#333'
      },
      formatter:function(value){
          let html='';
          html+=`<div class='EchartsToolBox'>
                  <div class='inlineTool'><span class='point' style='border: 4px solid ${value.color}'></span>${value.name}<span>${value.value}</span></div>
              </div>`
          return html
      }
  },
  series: [
    {
        name: seriesName||'',
        type: 'pie',
        center: ["25%", "50%"],
        radius: ['60%', '75%'],
        avoidLabelOverlap: false,
        label: {
            show: false,
        },
        labelLine: {
            show: false
        },
        hoverAnimation: false,
        clockWise: true, //顺时加载
        hoverAnimation: true, //鼠标移入变大
        data: optiondata
    }
]
}
return option
}