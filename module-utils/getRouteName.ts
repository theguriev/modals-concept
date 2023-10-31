import { transform } from "esbuild";
import { parse } from "acorn";
import type {
  CallExpression,
  ExpressionStatement,
  ObjectExpression,
  Program,
  Property,
} from "estree";

const PAGE_META_RE = /(definePageMeta\([\s\S]*?\))/;

const getRouteName = async (file: string) => {
  const script = extractScriptContent(file);
  if (!script) {
    return null;
  }

  if (!PAGE_META_RE.test(script)) {
    return null;
  }

  const js = await transform(script, { loader: "ts" });
  const ast = parse(js.code, {
    sourceType: "module",
    ecmaVersion: "latest",
  }) as unknown as Program;
  const pageMetaAST = ast.body.find(
    (node) =>
      node.type === "ExpressionStatement" &&
      node.expression.type === "CallExpression" &&
      node.expression.callee.type === "Identifier" &&
      node.expression.callee.name === "definePageMeta"
  );
  if (!pageMetaAST) {
    return null;
  }

  const pageMetaArgument = (
    (pageMetaAST as ExpressionStatement).expression as CallExpression
  ).arguments[0] as ObjectExpression;
  const nameProperty = pageMetaArgument.properties.find(
    (property) =>
      property.type === "Property" &&
      property.key.type === "Identifier" &&
      property.key.name === "name"
  ) as Property;
  if (
    !nameProperty ||
    nameProperty.value.type !== "Literal" ||
    typeof nameProperty.value.value !== "string"
  ) {
    return null;
  }

  return nameProperty.value.value;
};

export default getRouteName;
