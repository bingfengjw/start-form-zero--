const {
  firstName,
  lastName,
  old
} = {
  firstName: '张',
  lastName: '胖胖',
  old: 20
};
function say(firstName,lastName,old) {
  return `${firstName} ${lastName}今年${old}岁了！`
}
export {
  firstName,
  lastName,
  old as year,
  say
};