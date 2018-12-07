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
  selection
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', Math.floor(size / 2));
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

// 测试
const p = addPoint(-20, -280);
addSkillIcon(p, 13, 0);

const pd = addPoint(20, 130);
addSkillIconD(pd, 0, 0);

const pb = addPoint(0, 0);
addBranchIcon(pb, 0, 6);

const pp = addPoint(100, 200);
addPan(pp, 'pan1');

p.on('click', function(e) {
  console.log(e);
});
