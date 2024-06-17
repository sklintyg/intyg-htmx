export function minifyExpression(expression: string) {
  return expression.replace(/\n/g, "").replace(/\s+/g, " ").trim();
}
