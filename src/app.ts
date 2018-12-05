import * as d3 from 'd3';

const $main = document.getElementById('main');
const w = $main.clientWidth;
const h = $main.clientHeight;
const $svg = d3
  .select($main)
  .append('svg')
  .attr('width', w)
  .attr('height', h);

// 图层
const $layer = $svg.append('g');

// zoom
const zoom = d3.zoom().on('zoom', function() {
  const { k, x, y } = d3.event.transform;
  $layer.attr('transform', `translate(${x}, ${y}) scale(${k})`);
});
$svg.call(zoom);

function random (n: number) {
  return Math.random() * n;
}

const arrx = [random(w),random(w),random(w)]
const arry = [random(h),random(h),random(h)]

$layer.selectAll('text')
  .data(['hehe', 'xixi', 'haha'])
  .enter()
  .append('text')
  .attr('x', (d, i) => arrx[i])
  .attr('y', (d, i) => arry[i])
  .text(d => d);
