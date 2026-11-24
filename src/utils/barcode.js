export function eanCheck(value) {
  let sum = 0;
  for (let index = 0; index < 12; index += 1) sum += Number(value[index]) * (index % 2 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(value[12]);
}

export function upcCheck(value) {
  let sum = 0;
  for (let index = 0; index < 11; index += 1) sum += Number(value[index]) * (index % 2 ? 1 : 3);
  return (10 - (sum % 10)) % 10 === Number(value[11]);
}
