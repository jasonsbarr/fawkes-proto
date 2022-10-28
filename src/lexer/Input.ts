import os from "os";

export class Input {
  public buffer: string;
  public pos: number;
  public line: number;
  public col: number;
  public length: number;

  constructor(buffer: string) {
    this.buffer = buffer;
    this.pos = 0;
    this.line = 1;
    this.col = 1;
    this.length = buffer.length;
  }

  public static create(buffer: string) {
    return new Input(buffer);
  }

  public eof() {
    return this.pos >= this.length;
  }

  public lookahead(chars: number) {
    return this.buffer[this.pos + chars];
  }

  public next() {
    const char = this.buffer[this.pos++];

    if (this.peek() === os.EOL) {
      this.line++;
      this.col = 1;
    } else {
      this.col++;
    }

    return char;
  }

  public peek() {
    return this.buffer[this.pos];
  }

  public readWhile(test: (char: string) => boolean) {
    let result = "";

    while (test(this.peek())) {
      result += this.next();
    }

    return result;
  }
}
