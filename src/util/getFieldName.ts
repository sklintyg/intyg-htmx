export function getFieldName(...args: string[]) {
  // const [id, ...field] = args;
  // return [`q[${id.replace("_", ".")}]`, field.join(".")].join('');
  return args.join(".");
}
