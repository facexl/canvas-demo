import TWEEN from '@tweenjs/tween.js'

function getVal (obj, key) {
  return key.split('.').reduce((obj, name) => obj[name], obj)
}
export default class Circle {
  constructor (
    opt = {
      from: {},
      duration: 1000,
      easing: 'Quadratic.Out'
    }
  ) {
    this.attrs = Object.assign(opt, opt.from)
    if (this.attrs.to) this.move()
  }
  move () {
    let attrs = this.attrs
    new TWEEN.Tween(attrs.from)
      .to(attrs.to, attrs.duration)
      .easing(getVal(TWEEN.Easing, attrs.easing))
      .onUpdate(cur => {
        this.attrs = Object.assign(attrs, cur)
      })
      .start()
  }
  draw (ctx) {
    let attrs = this.attrs
    ctx.save()
    ctx.beginPath()
    if (attrs.stroke) ctx.strokeStyle = attrs.stroke
    else ctx.fillStyle = attrs.fill || '#000'
    ctx.arc(attrs.x, attrs.y, attrs.r, 0, Math.PI * 2)
    if (attrs.stroke) ctx.stroke()
    else ctx.fill()
    ctx.restore()
  }
}
