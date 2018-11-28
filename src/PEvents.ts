
export default class PEvents {
  main: HTMLDivElement;
  canvas: HTMLCanvasElement;
  scale: number;
  scale_max: number;
  scale_min: number;
  scale_factor: number;
  xo: number;
  yo: number;
  centerX: number;
  centerY: number;

  // 初始
  constructor (options :any) {
    this.scale = 1; // 缩放大小
    this.scale_max = 2; // 缩放最大倍数
    this.scale_min = 0.5; // 缩放最小倍数
    this.scale_factor = 1000; // 滚动值与缩放的换算因子
    this.xo = 0; // 原点
    this.yo = 0; // 原点
    this.centerX = 0;
    this.centerY = 0;
    this.main = options.main;
    this.canvas = options.canvas;

    this.wheel = this.wheel.bind(this);
    this.main.addEventListener('wheel', this.wheel);
    this.pan();
  }
  // 放大缩小
  setScale () {
    this.canvas.style.transform = `scale(${this.scale})`;
  }
  // 计算原点
  setOrigin (new_scale: number) {
    const { scale, canvas, centerX, centerY } = this;
    const offsetX = (new_scale - scale) * canvas.width * centerX;
    const offsetY = (new_scale - scale) * canvas.height * centerY;
    this.xo -= offsetX;
    this.yo -= offsetY;
    console.log('原点', this.xo, this.yo)
  }
  // 计算原点2
  getOrigin (x:number, y:number) {
    const centerX = (x - this.xo) / this.canvas.width * this.scale;
    const centerY = (y - this.yo) / this.canvas.height * this.scale;
    console.log('👈', centerX, centerY);
    this.centerX = centerX;
    this.centerY = centerY;
    this.canvas.style.transformOrigin = `${centerX * 100}% ${centerY * 100}%`
  }
  // 滚轮
  wheel (e: WheelEvent) {
    console.log(e)
    console.log(e.offsetX, e.offsetY)
    console.log(e.x, e.y)
    console.log(e.pageX, e.pageY)
    console.log(e.clientX, e.clientY)
    return;
    // 坐标x,y
    const { offsetX: x, offsetY: y, wheelDeltaY: delta} = e;
    // 缩放比例
    let scale = this.scale;
    const step = Math.abs(delta) / this.scale_factor;
    if (delta > 0) {
      // 缩小
      scale = Math.min(scale + step, this.scale_max);
    } else if (delta < 0) {
      // 放大
      scale = Math.max(scale - step, this.scale_min);
    }
    // 事件在canvas时s
    if (e.target === this.canvas) {
      
    }
    // 事件在main时
    if (e.target === this.main) {
      console.log('m', x, y)
    }
    if (scale != this.scale) {
      this.getOrigin(x, y);
      this.setOrigin(scale);
      this.scale = scale;
      this.setScale();
    }
  }

  // 拖动
  pan () {
    let mx: number, my: number, lx: number, ly: number;
    const mousedown = (e: MouseEvent) => {
      this.main.addEventListener('mousemove', mousemove);
      mx = e.pageX;
      my = e.pageY;
      lx = this.xo;
      ly = this.yo;
    }
    const mousemove = (e: MouseEvent) => {
      lx = this.xo + e.pageX - mx;
      ly = this.yo + e.pageY - my;
      this.canvas.style.transform = `translate(${lx}px, ${ly}px)`;
    }
    const mouseup = (e: MouseEvent) => {
      this.xo = lx;
      this.yo = ly;
      this.main.removeEventListener('mousemove', mousemove);
    }
    this.main.addEventListener('mousedown', mousedown)
    this.main.addEventListener('mouseup', mouseup)
    this.main.addEventListener('mouseleave', mouseup)
  }
}

// 拖动
// function mousedown (e) {
// }
// function mousemove (e) {}
// function mouseup (e) {}