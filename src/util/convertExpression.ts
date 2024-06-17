import { minifyExpression } from "./minifyExpression.ts";

function getVariableExpression(id: string, field: string) {
  return `q('${id}', '${field.replace(/[\$\']/g, "")}')`;
}

export function convertExpression(id: string, expression?: string): string {
  if (!expression || expression === "") {
    return "";
  }

  let result = "";
  let index = 1;
  for (const char of expression) {
    // Function start
    if (char === "(") {
      return `${result}(${convertExpression(id, expression.slice(index))}`;
    }

    // Function end
    if (char === ")") {
      return `${convertExpression(id, result)})${convertExpression(
        id,
        expression.slice(index)
      )}`;
    }

    // End of variable or expression
    if ((char === " " || index === expression.length) && result.length > 0) {
      const variableExpression =
        char === " "
          ? getVariableExpression(id, result) + char
          : getVariableExpression(id, result + char);
      return `${variableExpression}${convertExpression(
        id,
        expression.slice(Math.min(index, expression.length))
      )}`;
    }

    // Operators and numbers
    if (char.match(/[^a-zA-Z0-9\_\[\]\.\$\']/)) {
      return `${char}${convertExpression(id, expression.slice(index))}`;
    }

    // Variable
    result = result + char;

    index++;
  }
  return minifyExpression(result);
}
