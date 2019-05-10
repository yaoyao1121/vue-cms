<template>
  <div :id="id" class="canvas-echarts"></div>
</template>
<style type="text/less" lang="less">
#fist {
  height: 100%;
}
</style>
<script>
import echarts from "echarts";

export default {
  props: ["id","echartsData"],

  data() {
    return {
      charts: ""
    };
  },
  watch: {

    echartsData: function(a) {
      this.drawPie()
    }
  },
  created() {},
  methods: {
    drawPie() {
      this.charts = echarts.init(document.getElementById(this.id));
      this.charts.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: params => {
            let str =
              '<div style = "width:120px;text-align: left;">' +
              params[0].name +
              "</div>";

            for (let i = 0; i < params.length; i++) {
              str +=
                '<div style = "text-align: left;padding-left:10px;"><span style="width:10px;height:10px;display:inline-block;border-radius:50%;background:' +
                params[i].color +
                '"></span>  ' +
                params[i].seriesName +
                " : " +
                this.numbera(params[i].data) +
                "</div>";
            }

            return str;
          }
        },
        grid: {
          left: 70,
          right: 70
        },
        legend: {
          bottom: 0,
          data: this.echartsData.msgname
        },
        toolbox: {
          top: 0,
          right: 10,
          show: true,
          feature: {
            dataZoom: {
              show: false
            },
            dataView: {
              show: false
            },
            magicType: {
              title: {
                line: "折线图",
                bar: "柱状图"
              },
              type: ["line", "bar"],
              show: document.body.clientWidth < 600 ? false : true
            },
            restore: { show: false },
            saveAsImage: {
              title: "保存图片"
            },
            myTool1: {
              show: true, //是否显示
              // title: this._translatePipe.transform("excel导出", []), //鼠标移动上去显示的文字
              icon: this.excelIcon, //图标
              onclick: opt => {
                opt = opt.option;

                this.exportTable(opt);
              }
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.echartsData.msgDate,
          axisLabel: {
            formatter: function(value, idx) {
              return idx === 0 ? value : value.slice(5, 10);
            }
          }
        },
        yAxis: [
          {
            type: "value",
            name: "趋势图",
            axisLabel: {
              formatter: (value, index) => {
                return this.numbera(value);
              }
            }
          }
        ],
        series: this.echartsData.series
      });
    },
    numbera(a) {
      if (a > 10000) {
        if (a > 100000000) {
          let num = (parseFloat(a) / 100000000).toFixed(2) + "亿";
          return num;
        }
        let num = (parseFloat(a) / 10000).toFixed(2) + "万";
        return num;
      } else {
        return a;
      }
    },

  },

 
  mounted() {
    this.$nextTick(function() {
      this.drawPie();
    });
  }
};
</script>

<style lang="less">
.canvas-echarts {
    width: 100%;
    height: 400px;
}
</style>

