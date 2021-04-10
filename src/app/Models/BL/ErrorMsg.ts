export class ErrorMsg {
    MobileNoLengthError: string;
    DeptMissingError: string;
    EmpMissingError: string;
    MtngAgendaMissingError: string;
    OtpInvalidError: string;
    WrongQrCode: string;
    QRCodeDataReadFailed: string;

    //device detection failed messages
    QRCodeDetectionIssue: string;
    EmiratesIDDetectionIssue: string;
    PassportScannerDetectionIssue: string;
    WebcamDetectionIssue: string;

    //deivce reading failed messages
    QRCodeReadFailed: string;
    EmiratedIDCardReadFailed: string;
    PassportScannerReadFailed: string;

    //device read in progress messages
    DeviceInitializing: string;
    PlsScanQrCode: string;
    PlsInsertEID: string;
    PlsScanPassport: string;

    ReachedMaxAttempt: string;

    SaveError: string;

    constructor() {
        this.MobileNoLengthError = "Please enter 10 digits";
        this.DeptMissingError = "Please select department";
        this.EmpMissingError = "Please select person to meet";
        this.MtngAgendaMissingError = "Please enter meeting agenda";
        this.OtpInvalidError = "Otp invalid";
        this.WrongQrCode = "Wrong QR Code";
        this.QRCodeDataReadFailed = "QR code data read failed";

        this.QRCodeDetectionIssue = "QRCode Reader could not detect";
        this.EmiratesIDDetectionIssue = "EmiratesID Reader could not detect";
        this.PassportScannerDetectionIssue = "Passport Scanner could not detect";
        this.WebcamDetectionIssue = "Webcam could not detect";

        this.QRCodeReadFailed = "QRCode read failed";
        this.EmiratedIDCardReadFailed = "EmiratesID read failed. Please try again.";
        this.PassportScannerReadFailed = "Passport read failed. Please try again.";
        this.ReachedMaxAttempt = "You used your maximum swipe attempts";

        this.DeviceInitializing = "Device Initializing";
        this.PlsScanQrCode = "Please scan your QR code";
        this.PlsInsertEID = "Please insert emirateds id";
        this.PlsScanPassport = "Please scan passport";

        this.SaveError = "Something went wrong. Please try again.";
    }
}