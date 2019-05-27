<template>
  <div class="wrapper">
    <div :style="{backgroundImage:'url(' + stampImg + ')', zIndex: z_index}" class="watermark"/>
    <slot/>
  </div>
</template>

<script>
const configDefault = {
  text: "sarva",
  font: "14px serif",
  opacity: 0.6,
  // 控制水印出现的密度
  density: 1,
  rotate: (-1 / 6) * Math.PI,
  z_index: 2018,
  color: "rgba(151,168,190)",
  yOffset: 3
};

export default {
  name: "watermarkToDiv",
  props: {
    /* eslint-disable */
    watermarkConfig: {
      type: Object
    }
  },
  data() {
    return {
      config: Object.assign({}, configDefault, this.watermarkConfig)
    };
  },
  computed: {
    stampImg() {
      return this.compositeStamp();
    },
    z_index() {
      return this.config.z_index;
    }
  },
  methods: {
    setStamp() {
      const canvasEl = document.createElement("canvas");
      const ctx = canvasEl.getContext("2d");

      ctx.fillStyle = this.config.color;
      ctx.font = this.config.font;
      const fontSize = this.config.font.replace(/(\d+)(?=px).*/, "$1");
      const text = ctx.measureText(this.config.text);
      const txtLen = text.width + fontSize * this.config.yOffset;

      canvasEl.width = txtLen * 2;
      canvasEl.height = txtLen * 2;

      ctx.translate(txtLen, txtLen);
      ctx.rotate(this.config.rotate);
      ctx.fillStyle = this.config.color;
      ctx.font = this.config.font;
      ctx.fillText(this.config.text, fontSize * this.config.yOffset, 0);

      return canvasEl;
    },
    compositeStamp() {
      const stamp = this.setStamp();
      const stampLen = stamp.getAttribute("width") / 2;

      const canvasEl = document.createElement("canvas");
      //保证水印可以完全展示
      const len =
        200 * this.config.density > stampLen
          ? 200 * this.config.density
          : stampLen;
      canvasEl.width = len * 2;
      canvasEl.height = len * 2;
      const ctx = canvasEl.getContext("2d");
      ctx.translate(len, len);

      const sinValueByRotate = Math.sin(this.config.rotate);
      const cosValueByRotate = Math.cos(this.config.rotate);

      //  上左
      if (
        sinValueByRotate <= 0 &&
        sinValueByRotate > -1 &&
        cosValueByRotate > 0 &&
        cosValueByRotate <= 1
      ) {
        ctx.drawImage(
          stamp,
          stampLen,
          0,
          stampLen,
          stampLen,
          0,
          0,
          stampLen,
          stampLen
        );
        ctx.drawImage(
          stamp,
          stampLen,
          0,
          stampLen,
          stampLen,
          -len,
          -len,
          stampLen,
          stampLen
        );
      }
      // 上右
      if (
        sinValueByRotate < 0 &&
        sinValueByRotate >= -1 &&
        cosValueByRotate <= 0 &&
        cosValueByRotate < 1
      ) {
        ctx.drawImage(
          stamp,
          0,
          0,
          stampLen,
          stampLen,
          0,
          0,
          stampLen,
          stampLen
        );
        ctx.drawImage(
          stamp,
          0,
          0,
          stampLen,
          stampLen,
          -len,
          -len,
          stampLen,
          stampLen
        );
      }
      // 下右
      if (
        sinValueByRotate >= 0 &&
        sinValueByRotate < 1 &&
        cosValueByRotate < 0 &&
        cosValueByRotate >= -1
      ) {
        ctx.drawImage(
          stamp,
          0,
          stampLen,
          stampLen,
          stampLen,
          0,
          0,
          stampLen,
          stampLen
        );
        ctx.drawImage(
          stamp,
          0,
          stampLen,
          stampLen,
          stampLen,
          -len,
          -len,
          stampLen,
          stampLen
        );
      }
      // 下左
      if (
        sinValueByRotate > 0 &&
        sinValueByRotate <= 1 &&
        cosValueByRotate >= 0 &&
        cosValueByRotate < 1
      ) {
        ctx.drawImage(
          stamp,
          stampLen,
          stampLen,
          stampLen,
          stampLen,
          0,
          0,
          stampLen,
          stampLen
        );
        ctx.drawImage(
          stamp,
          stampLen,
          stampLen,
          stampLen,
          stampLen,
          -len,
          -len,
          stampLen,
          stampLen
        );
      }
      return canvasEl.toDataURL();
    }
  }
};
</script>

<style scoped>
.wrapper {
  position: relative;
}
.watermark {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>

