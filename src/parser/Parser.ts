import { DiagnosticBag } from "../diagnostics/DiagnosticBag";
import { LexResult } from "../lexer/LexResult";
import { TokenBag } from "../lexer/TokenBag";

export class Reader {
  private _tokens: TokenBag;
  public length: number;
  public pos: number;

  constructor(tokens: TokenBag) {
    this._tokens = tokens;
    this.length = tokens.length;
    this.pos = 0;
  }

  public static new(tokens: TokenBag) {
    return new Reader(tokens);
  }

  public eof() {
    return this.pos >= this.length;
  }

  public lookahead(i: number) {
    return this._tokens.get(this.pos + i);
  }

  public next() {
    return this._tokens.get(this.pos++);
  }

  public peek() {
    return this._tokens.get(this.pos);
  }
}

export class BaseParser {
  protected lexResult: LexResult;
  protected reader: Reader;
  protected diagnostics: DiagnosticBag;

  constructor(lexResult: LexResult) {
    this.lexResult = lexResult;
    this.reader = Reader.new(lexResult.tokens);
    this.diagnostics = DiagnosticBag.new();
  }
}
