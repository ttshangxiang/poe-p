
import * as d3 from 'd3';

const $main = document.getElementById('main');
const w = $main.clientWidth, h = $main.clientHeight; 
const $svg = d3.select($main)
  .append('svg')
  .attr('width', w)
  .attr('height', h);

const $t = $svg.append('g');
const zoom = d3.zoom().on('zoom', function () {
  const {k, x, y} = d3.event.transform;
  console.log(k, x, y);
  $t.attr('transform', `translate(${x}, ${y}) scale(${k})`);
});
$svg.call(zoom);

