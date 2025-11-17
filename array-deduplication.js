let arr = [1, 2, 3, 4, 4, 3, 2, 1];
let uniqueArr = [];

arr.forEach((item) => {
  if (!uniqueArr.includes(item)) {
    uniqueArr.push(item);
  }
});

console.log(uniqueArr)
