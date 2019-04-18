import * as d3 from 'd3';
import { forceManyBody, xml } from 'd3';

const $main = document.getElementById('main');
const w = $main.clientWidth;
const h = $main.clientHeight;
// 中心点
const c = {x: w / 2, y: h / 2};

// 根节点
export const $svg = d3
  .select($main)
  .append('svg')
  .attr('width', w)
  .attr('height', h);

// 图层
export const $layer = $svg.append('g');

// 引用图层
export const $defs = $svg.append('defs');

// zoom
const zoom = d3.zoom();
// 保存后续使用
let _transform = {x: c.x, y: c.y, k: 1};
zoom.on('zoom', () => {
  _transform = d3.event.transform;
  $layer.attr('transform', d3.event.transform);
});

// 移动点到中心
zoom.translateBy($svg, c.x, c.y);
// 初始化缩放
zoom.scaleBy($svg, 1);
// 绑定事件
$svg.call(zoom);
// 禁用双击
$svg.on('dblclick.zoom', null);

window.onmousemove = function (e) {
  const {x, y, k} = _transform;
  const result = {x: (x - e.pageX) / k, y: (y - e.pageY) / k};
  console.log(result.x.toFixed(4), result.y.toFixed(4));
}
