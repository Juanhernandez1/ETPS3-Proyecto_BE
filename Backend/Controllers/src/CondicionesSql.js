// * retorna un arregló con las consultas like
export default function CondicionesOR(cond, buscar, Op) {
  const or = [];
  let condicionLike;
  cond.forEach(element => {
    condicionLike = {
      [element]: {
        [Op.like]: `%${buscar}%`
      }
    };
    or.push(condicionLike);
  });
  return or;
}
