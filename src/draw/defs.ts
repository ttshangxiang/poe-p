// 画隐藏资源
import { $defs } from './base';

export default function() {
  // 天赋圈图标
  $defs
    .append('image')
    .attr('id', 'branch-icon')
    .attr('xlink:href', './assets/images/passive-skill-sprite/groups-3.png')
    .attr('width', '760')
    .attr('height', '693');

  // 天赋圈图标-裁剪大小
  $defs
    .append('clipPath')
    .attr('id', 'branch-icon-cp')
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 72)
    .attr('height', 72);

  // 技能图标-已激活
  $defs
    .append('image')
    .attr('id', 'skill-icon')
    .attr('xlink:href', './assets/images/passive-skill-sprite/skills-3.jpg')
    .attr('width', '760')
    .attr('height', '1073');

  // 技能图标-未使用
  $defs
    .append('image')
    .attr('id', 'skill-disabled-icon')
    .attr('xlink:href', './assets/images/passive-skill-sprite/skills-disabled-3.jpg')
    .attr('width', '760')
    .attr('height', '1073');

  // 技能图标-裁剪
  $defs
    .append('clipPath')
    .attr('id', 'skill-icon-cp')
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 27)
    .attr('height', 27);

  // 技能圆框-已激活
  $defs
    .append('image')
    .attr('id', 'skill-border')
    .attr('xlink:href', './assets/images/Skill_Frame_Allocated.png')
    .attr('width', 57)
    .attr('height', 57)
    .attr('x', -28)
    .attr('y', -28);
  
  // 技能圆框-未使用
  $defs
    .append('image')
    .attr('id', 'skill-border-disabled')
    .attr('xlink:href', './assets/images/Skill_Frame_CanAllocate.png')
    .attr('width', 40)
    .attr('height', 40)
    .attr('x', -20)
    .attr('y', -20);

  // 盘子1
  $defs
    .append('image')
    .attr('id', 'skill-pan1')
    .attr('xlink:href', './assets/images/pan1.gif')
    .attr('width', 138)
    .attr('height', 138)
    .attr('x', -69)
    .attr('y', -69);

  // 盘子2
  $defs
    .append('image')
    .attr('id', 'skill-pan2')
    .attr('xlink:href', './assets/images/pan2.gif')
    .attr('width', 179)
    .attr('height', 179)
    .attr('x', -89)
    .attr('y', -89);
  
  // 盘子3
  $defs
    .append('image')
    .attr('id', 'skill-pan3')
    .attr('xlink:href', './assets/images/pan3.gif')
    .attr('width', 284)
    .attr('height', 144)
    .attr('x', -144)
    .attr('y', -144);
}
