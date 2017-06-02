const simple = {
  start: '8,18',
  goal: '20,6',
  obstacles: []
};

for(let i = 11; i < 20; i++) {
  simple.obstacles.push(`${i},6`);
  simple.obstacles.push(`${i},7`);
  simple.obstacles.push(`${i},8`);
}
simple.obstacles.push('10,7');
for(let j = 7; j < 16; j++) {
  simple.obstacles.push(`20,${j}`);
  if(j < 9) continue;
  simple.obstacles.push(`19,${j}`);
  simple.obstacles.push(`18,${j}`);
}
simple.obstacles.push('19,16');

const maze = {
  start: null,
  goal: null,
  obstacles: []
};

export { simple, maze };
