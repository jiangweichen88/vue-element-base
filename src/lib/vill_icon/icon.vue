<script>
const prefixCls = "vill-icon";
export default {
  name:"vill-icon",
  data() {
    return {
      prefixCls: prefixCls
    }
  },
  props: {
    iconType: {
      type: String,
      default: "info"
    }
  },
  render: function(h) {
    return h(
      "i",
      {
        attrs: {
          class: `${this.prefixCls}`
        }
      },
      [
        h("img", {
          attrs: {
            src: require(`@/assets/favicon.png`),
            class: "icon"
          }
        })
      ]
    );
  }
};
</script>
<style scoped lang="scss">
.vill-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  color: #fff;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 15px;
  & .icon {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
</style>
