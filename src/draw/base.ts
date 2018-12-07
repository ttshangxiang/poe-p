import * as d3 from 'd3';

const $main = document.getElementById('main');
const w = $main.clientWidth;
const h = $main.clientHeight;

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
zoom.on('zoom', () => {
  $layer.attr('transform', d3.event.transform);
});
// 移动点到中心
zoom.translateBy($svg, w/2, h/2);
// 初始化缩放
zoom.scaleBy($svg, 1);
// 绑定事件
$svg.call(zoom);
// 禁用双击
$svg.on('dblclick.zoom', null);
