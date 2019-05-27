export default class LuckDraw {
  constructor({
    onlyRunOnce = true,
    cnt = -1,
    beginIdx = 0,
    endIdx = undefined,
    isFinished = false,
    hasRunCycles = 0,
    totalCycles = 4,
    sequence = [0, 1, 2, 5, 8, 7, 6, 3],
    item_el = undefined,
    callback = undefined
  } = {}) {
    this.onlyRunOnce = onlyRunOnce
    this.cnt = cnt
    this.beginIdx = beginIdx
    this.endIdx = endIdx
    this.isFinished = isFinished
    this.hasRunCycles = hasRunCycles
    this.totalCycles = totalCycles
    this.sequence = sequence
    this.item_el = item_el
    this.callback = callback
  }

  init() {
    this.item_el[this.sequence[this.endIdx]].classList.remove('item--sel')
    this.isFinished = false
    var roll = this._genRoll()
    roll()
  }
  _genRoll() {
    var that = this
    var timer
    return function roll() {
      // when then func fisrt run we need do something special
      if (timer) {
        that.item_el[that.sequence[that.beginIdx]].classList.remove('item--sel')
      }
      that.cnt++
      var speed = that._genSpeed(that.cnt)
      that.beginIdx = that.cnt % 8
      that.item_el[that.sequence[that.beginIdx]].classList.add('item--sel')
      if (that.cnt >= 8 * that.totalCycles && that.endIdx === that.beginIdx) {
        clearTimeout(timer)
        that.isFinished = true
        that.callback && typeof that.callback == 'function' && that.callback()
        return
      }
      clearTimeout(timer)
      timer = setTimeout(roll, speed * 1000)
    }
  }
  _genSpeed(cnt) {
    var end = 8 * this.totalCycles + this.endIdx
    return Math.pow(cnt - (end * 7) / 18, 2) / (end * end) + 0.05
  }
}
