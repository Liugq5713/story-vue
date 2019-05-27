
<template>
  <div class="wrapper" ref="luckdraw">
    <div class="item">
      <div class="item__content">1</div>
    </div>
    <div class="item">
      <div class="item__content">2</div>
    </div>
    <div class="item">
      <div class="item__content">3</div>
    </div>
    <div class="item">
      <div class="item__content">4</div>
    </div>
    <div class="item item--begin" ref="item--begin">
      <div class="item__content">开始</div>
    </div>
    <div class="item">
      <div class="item__content">6</div>
    </div>
    <div class="item">
      <div class="item__content">7</div>
    </div>
    <div class="item">
      <div class="item__content">8</div>
    </div>
    <div class="item">
      <div class="item__content">9</div>
    </div>
  </div>
</template>

<script>
import LuckDraw from "./luckdraw";
export default {
  mounted() {
    var begin_el = document.querySelector(".item--begin");
    var item_el = this.$refs["luckdraw"].querySelectorAll(".item");

    begin_el.addEventListener("click", function() {
      const luckdraw = new LuckDraw({
        item_el: item_el,
        endIdx: 3,
        totalCycles: 4
      });
      luckdraw.init();
    });
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.wrapper {
  width: 500px;
  margin: 0 auto;
}

.item {
  display: inline-block;
  text-align: center;
  width: 150px;
  height: 100px;
  margin: 3px;
  padding-top: 50px;
  background-color: rgb(120, 172, 233);
}

.item--begin {
  background-color: rgb(161, 76, 76);
}

.item--sel {
  background-color: #fff;
}

.item--normal {
  background-color: rgb(120, 172, 233);
}
</style>
