export enum SegmentParserState {
  initial,
  static,
  dynamic,
  optional,
  catchall,
}

export enum SegmentTokenType {
  static,
  dynamic,
  optional,
  catchall,
}

export interface SegmentToken {
  type: SegmentTokenType;
  value: string;
}

export interface ScannedFile {
  relativePath: string;
  absolutePath: string;
}
