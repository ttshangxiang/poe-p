import { $layer } from './base';
import defs from './defs';

// 画资源
defs();

// 添加技能
interface Icon {
  selection: d3.Selection<SVGElement, {}, null, undefined>;
  w: number;
  h: number;
  cp: string;
  icon: string;
  x: number;
  y: number;
}
function addSpriteIcon(option: Icon) {
  option.selection
    .append('g')
    .attr(
      'transform',
      `translate(-${Math.floor(option.w / 2)}, -${Math.floor(option.h / 2)})`
    )
    .attr('clip-path', `url(${option.cp})`)
    .append('use')
    .attr('xlink:href', `${option.icon}`)
    .attr('transform', `translate(${option.x}, ${option.y})`);
}

// 添加技能
function addSkillIcon(selection: Icon['selection'], x: number, y: number) {
  const size = 27;
  addSpriteIcon({
    selection,
    w: size,
    h: size,
    cp: '#skill-icon-cp',
    icon: '#skill-icon',
    x: -1 * x * size,
    y: -1 * y * size
  });
  selection.append('use').attr('xlink:href', '#skill-border');
}

// 添加技能-未使用
function addSkillIconD(selection: Icon['selection'], x: number, y: number) {
  const size = 27;
  addSpriteIcon({
    selection,
    w: size,
    h: size,
    cp: '#skill-icon-cp',
    icon: '#skill-disabled-icon',
    x: -1 * x * size,
    y: -1 * y * size
  });
  selection.append('use').attr('xlink:href', '#skill-border-disabled');
}

// 添加天赋圈
function addBranchIcon(selection: Icon['selection'], x: number, y: number) {
  const size = 99;
  addSpriteIcon({
    selection,
    w: 72,
    h: 72,
    cp: '#branch-icon-cp',
    icon: '#branch-icon',
    x: -1 * x * size - 14,
    y: -1 * y * size - 14
  });
}

// 添加盘子1
function addPan(selection: Icon['selection'], type: string) {
  selection.append('use').attr('xlink:href', '#skill-' + type);
}

// 添加基本点
function addPoint(x: number, y: number) {
  return $layer.append('g').attr('transform', `translate(${x}, ${y})`);
}

// 添加基本线
function addLine(path: string, colors: string[]) {
  const g = $layer.append('g');
  let i = colors.length;
  while (i) {
    g.append('path')
    .attr('d', path)
    .attr('stroke', colors[i - 1])
    .attr('stroke-width', i * 2)
    .attr('fill', 'none');
    i--;
  }
  return g;
}

// 添加普通线
function addNormalLine (path: string) {
  const colors = [
    'rgba(20,17,6,1)',
    'rgba(99,88,52,1)',
    'rgba(57,49,20,.30)'
  ];
  addLine(path, colors);
}

// 添加可能线
function addCanLine (path: string) {
  const colors = [
    'rgba(209,172,136,1)',
    'rgba(150,114,83,1)',
    'rgba(68,45,26,.37)'
  ];
  addLine(path, colors);
}

// 添加高亮线
function addActiveLine (path: string) {
  const colors = [
    'rgba(226,219,189,1)',
    'rgba(182,164,119,1)',
    'rgba(178,127,54,.87)',
    'rgba(125,94,32,.55)',
    'rgba(69,53,20,.31)',
  ];
  addLine(path, colors);
}

// addNormalLine('M0,-100l200,0');
// addCanLine('M0,-150l200,0');
// addActiveLine('M0,-200l200,0');

// 测试
// const p = addPoint(-20, -280);
// addSkillIcon(p, 13, 0);

// const pd = addPoint(20, 130);
// addSkillIconD(pd, 0, 0);

// const pb = addPoint(0, 0);
// addBranchIcon(pb, 0, 6);

// const pp = addPoint(100, 200);
// addPan(pp, 'pan1');

// p.on('click', function(e) {
//   console.log(e);
// });

// 添加底盘，用于纠正位置
const p = addPoint(0, 0);
p.append('image')
  .attr('xlink:href', '/assets/images/jietu.jpg')
  .attr('width', 6516)
  .attr('height', 6138)
  .attr('style', 'opacity: 0.3')
  .attr('x', -3124)
  .attr('y', -3087);

// 添加点
const p2 = addPoint(-150, 0);
addSkillIcon(p2, 13, 0);

console.log('dsds')

