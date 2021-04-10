export class ConfigModel {
    apiKey: string;
    optiqApiUrl: string;
    idletthreshold: number;
    idlethresholddevicepages: number;
    deviceDetectionFailurePopupTimer: number;
    deviceReadNextAttemptTimer: number;
    timeoutCountDown: number;
    maxdevicereadattempts: number;

    constructor() {
        this.apiKey = "";
        this.optiqApiUrl = "";
        this.idletthreshold = 0;
        this.idlethresholddevicepages = 0;
        this.deviceDetectionFailurePopupTimer = 0;
        this.deviceReadNextAttemptTimer = 0;
        this.timeoutCountDown = 0;
        this.maxdevicereadattempts = 0;
    }
}