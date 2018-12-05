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
const zoom = d3.zoom().on('zoom', function() {
  const { k, x, y } = d3.event.transform;
  $layer.attr('transform', `translate(${x}, ${y}) scale(${k})`);
});
$svg.call(zoom);

// 添加图标
$defs.append('image')
  .attr('id', 'icon-sprite')
  .attr('xlink:href', './assets/images/passive-skill-sprite/groups-3.png')
  .attr('width', '760')
  .attr('height', '693');

// 添加图标裁剪大小
$defs.append('clipPath')
  .attr('id', 'icon-cp')
  .append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', 72)
  .attr('height', 72)

// 测试图标与裁剪
$layer.append('g')
  .attr('clip-path', 'url(#icon-cp)')
  .append('use')
  .attr('xlink:href', '#icon-sprite')
  .attr('transform', 'translate(-112, -112)')

console.log('ccc')