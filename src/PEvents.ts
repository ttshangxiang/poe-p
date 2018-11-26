
export default class PEvents {
  main: HTMLDivElement;
  canvas: HTMLCanvasElement;
  scale: number;
  scale_max: number;
  scale_min: number;
  scale_factor: number;
  scale_x0: number;
  scale_y0: number; 

  // 初始
  constructor (options :any) {
    this.scale = 1; // 缩放大小
    this.scale_max = 2; // 缩放最大倍数
    this.scale_min = 0.5; // 缩放最小倍数
    this.scale_factor = 1000; // 滚动值与缩放的换算因子
    this.scale_x0 = 0; // 缩放后的canvas相对于main的x偏移
    this.scale_y0 = 0; // 缩放后的canvas相对于main的y偏移
    this.main = options.main;
    this.canvas = options.canvas;

    this.wheel = this.wheel.bind(this);
    this.main.addEventListener('wheel', this.wheel, true);
  }
  // 放大缩小
  setScale () {
    this.canvas.style.transform = `scale(${this.scale})`;
  }
  // 计算原点
  setOrigin (x: number, y: number, prev_scale: number) {
    // const xp = (x - this.scale_x0) / this.main.clientWidth * this.scale;
    // const yp = (y - this.scale_y0) / this.main.clientHeight * this.scale;
    // this.canvas.style.transformOrigin = `${xp * 100}% ${yp * 100}%`;

    // console.log(this.canvas.style.transformOrigin, prev_scale, this.scale)
    // this.scale_x0 += (prev_scale - this.scale) * this.canvas.width * xp;
    // this.scale_y0 += (prev_scale - this.scale) * this.canvas.height * yp;
    // console.log(this.scale_x0, this.scale_y0)
    console.log(x, y)
  }
  // 滚轮
  wheel (e: WheelEvent) {
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
    if (scale != this.scale) {
      // 缓存变换之前的大小
      const prev_scale = this.scale;
      this.scale = scale;
      this.setOrigin(x, y, prev_scale);
      this.setScale();
    }
    console.log(this.canvas)
  }
}

// 拖动
// function mousedown (e) {
// }
// function mousemove (e) {}
// function mouseup (e) {}