## 构思：如何使用这个组件

写一个组件，首先要考虑的是 这个组件如何被使用？水印组件我想到的有两种方式。第一种是当作一个标签，和元素无关。

```js
<template>
<div>
    <div class="app">
        ...
    </div>
    <Watermark />
<div>
</template>
```

但是，这样做有一个缺点就是我这个水印默认就是覆盖了我所有的页面，当我想精细化控制我的页面的时候，就显得无能为力。第二点，`<Watermark />` 组件放在外部看起来就像一个多余的标签一样，十分的丑陋。因此，笔者想出了第二种形式。将需要添加水印的内容通过`slot`插入到`Watermark`里面。代码显得层级分明，并且方便自定义。在同一个页面我甚至可以添加不同的水印。但是这样做，也会有一个缺点，就是水印是依据内容的高生成的，当内容不多，或者高度有限的时候，水印可能显示不完全。

```js
<template>
    <Watermark>
        <div class='app'>
            ...
        </div>
    <Watermark>
</template>
```

## 通过`canvas`绘制水印

- 创建`canvas`元素
- 设置 canvas 元素的宽高
- 绘制文字
- 调用 ToDataURL()将 canvas 返回一个包含图片展示的 data URI

代码如下:

```js
    setStamp() {
      const canvasEl = document.createElement('canvas')
      const ctx = canvasEl.getContext('2d')
      canvasEl.width = 200
      canvasEl.height = 200
      ctx.fillText('Hello World', 10, 0)
      return canvasEl.toDataURL()
    }
```

### 控制水印的重复，铺满页面

笔者是通过将水印图像赋值给一个元素的背景，通过背景的重复，做到水印的重复。

```js
<div class='wrapper'>
  <div
    class='watermark'
    v-bind:style="{backgroundImage:'url(' + stampImg + ')'}"
  />
  <slot />
</div>
```

```css
.wrapper {
  position: relative;
}
.watermark {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
```

::: tip
水印是默认铺在页面上方的，会遮挡住水印下一些元素的操作，因此需要使用 [pointer-events](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events) 属性，该值为 none 时，表示鼠标事件穿透该元素，并指定该元素下面的任何东西。
:::

### 水印倾斜(通过 canvas 的倾斜)

倾斜 canvas 的时候，可能会遇到水印显示不完全的情况。笔者基于自己踩得坑，介绍一下 canvas 旋转的知识点。

canvas 元素 一开始是的坐标轴是以 X1,Y1 为 X 轴 Y 轴。通过调用 rotate 方法，以原点为中心旋转 canvas。则 canvas 变为以 X2,Y2 为 X 轴 Y 轴。然后你接着绘制文字，那么显示出来的图像将仅仅是黄，灰相间的那一部分。也就是说你仅仅可能看到一个显示不完全的字母 H。

黄色的部分你可以看作 canvas 可视区域，灰色部分称为 canvas 绘图环境。另外要注意的是，我们这里所说的旋转，并不是说旋转其可视区域，而是选转 canvas 绘图环境，即绘制方向的改变。

因此，为了让我们的文字显现出来，我们可以移动我们的中心点（原点）。然后旋转，保证绘图环境尽量的落在可视区域中。

## 增加可配置性

没有预设配置的组件不是一个好组件，但是我们也需要给用户自定义的自由。首先在自己的组件定义配置常量。

```js
const configDefault = {
  text: 'Hello world',
  font: '16px serif',
  opacity: 0.6,
  density: 1,
  rotate: (-1 / 6) * Math.PI,
  z_index: 2018,
  color: 'rgba(151,168,190)',
  // 水印不完全显示的时候可以微调这个参数
  yOffset: 3
}
```

在 props 字段定义好一个配置对象

```js
props: {
  watermarkConfig: {
    type: Object
  }
}
```

通过共享结构对象，解析出配置

```js
config: Object.assign({}, configDefault, this.watermarkConfig)
```

## [npm 包](https://github.com/Liugq5713/watermarkToDiv)

笔者将这个 vue 组件改成了通用的 js 版本，封装成了一个 npm 包，欢迎取用
