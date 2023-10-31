import { SegmentParserState, SegmentTokenType } from "../types";
import type { SegmentToken } from "../types";

const PARAM_CHAR_RE = /[\w\d_.]/;

const parseSegment = (segment: string) => {
  let state: SegmentParserState = SegmentParserState.initial;
  let i = 0;

  let buffer = "";
  const tokens: SegmentToken[] = [];

  function consumeBuffer() {
    if (!buffer) {
      return;
    }
    if (state === SegmentParserState.initial) {
      throw new Error("wrong state");
    }

    tokens.push({
      type:
        state === SegmentParserState.static
          ? SegmentTokenType.static
          : state === SegmentParserState.dynamic
          ? SegmentTokenType.dynamic
          : state === SegmentParserState.optional
          ? SegmentTokenType.optional
          : SegmentTokenType.catchall,
      value: buffer,
    });

    buffer = "";
  }

  while (i < segment.length) {
    const c = segment[i];

    switch (state) {
      case SegmentParserState.initial:
        buffer = "";
        if (c === "[") {
          state = SegmentParserState.dynamic;
        } else {
          i--;
          state = SegmentParserState.static;
        }
        break;

      case SegmentParserState.static:
        if (c === "[") {
          consumeBuffer();
          state = SegmentParserState.dynamic;
        } else {
          buffer += c;
        }
        break;

      case SegmentParserState.catchall:
      case SegmentParserState.dynamic:
      case SegmentParserState.optional:
        if (buffer === "...") {
          buffer = "";
          state = SegmentParserState.catchall;
        }
        if (c === "[" && state === SegmentParserState.dynamic) {
          state = SegmentParserState.optional;
        }
        if (
          c === "]" &&
          (state !== SegmentParserState.optional || segment[i - 1] === "]")
        ) {
          if (!buffer) {
            throw new Error("Empty param");
          } else {
            consumeBuffer();
          }
          state = SegmentParserState.initial;
        } else if (PARAM_CHAR_RE.test(c)) {
          buffer += c;
        } else {
          // console.debug(`[pages]Ignored character "${c}" while building param "${buffer}" from "segment"`)
        }
        break;
    }
    i++;
  }

  if (state === SegmentParserState.dynamic) {
    throw new Error(`Unfinished param "${buffer}"`);
  }

  consumeBuffer();

  return tokens;
};

export default parseSegment;
