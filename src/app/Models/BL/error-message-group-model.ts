export class ErrorMessageGroup {
  //Common //String //Number //Date
  IsRequired: FieldErrorData;
  RegularExpression: FieldErrorData;
  Length: FieldErrorData;
  Range: FieldErrorData;
  Limit: FieldErrorData;
  Compare: FieldErrorData;
  DateFormat: FieldErrorData;

  constructor() {
    let fieldErrorData1 = new FieldErrorData();
    this.IsRequired = fieldErrorData1;

    let fieldErrorData2 = new FieldErrorData();
    this.RegularExpression = fieldErrorData2;

    let fieldErrorData3 = new FieldErrorData();
    this.Length = fieldErrorData3;

    let fieldErrorData4 = new FieldErrorData();
    this.Range = fieldErrorData4;

    let fieldErrorData5 = new FieldErrorData();
    this.Limit = fieldErrorData5;

    let fieldErrorData6 = new FieldErrorData();
    this.Compare = fieldErrorData6;

    let fieldErrorData7 = new FieldErrorData();
    this.DateFormat = fieldErrorData7;
  }
}

export class FieldErrorData {
  IsValid: boolean;
  ErrorMsg: string;

  constructor() {
    this.IsValid = true;
    this.ErrorMsg = "";
  }
}
