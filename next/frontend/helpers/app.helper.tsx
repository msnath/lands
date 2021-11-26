export const copy = <T,>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const removeDuplicates = (array: any[]) =>
  array.filter(
    (data, i) =>
      i ===
      array.findIndex((obj) => JSON.stringify(obj) === JSON.stringify(data))
  );
