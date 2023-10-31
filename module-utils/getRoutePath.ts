import { encodePath } from "ufo";
import { SegmentTokenType } from "../types";

const getRoutePath = (tokens: SegmentToken[]): string => {
  return tokens.reduce((path, token) => {
    return (
      path +
      (token.type === SegmentTokenType.optional
        ? `:${token.value}?`
        : token.type === SegmentTokenType.dynamic
        ? `:${token.value}()`
        : token.type === SegmentTokenType.catchall
        ? `:${token.value}(.*)*`
        : encodePath(token.value).replace(/:/g, "\\:"))
    );
  }, "/");
};

export default getRoutePath;
