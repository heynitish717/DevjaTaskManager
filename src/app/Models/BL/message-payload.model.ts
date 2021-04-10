export class MessagePayload {
  key: string;
  sticky: boolean;
  severity: string;
  summary: string;
  detail: string;
  constructor() {
    //tl - for left, tc - for center, comment this line for right alignment
    //this.key = "";
  }
}
