const sum = require('./sum');
const multiplication = require('./multiplication')

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('multiply 2 and 4 to equal 8', () => {
  expect(multiplication(2,4)).toBe(8)
})j