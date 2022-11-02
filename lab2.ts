class H264 {
  private blockSize: string;
  private fileName: string;
  protected videoQuality: any;
  constructor(blockSize: string, fileName: string) {
    this.blockSize = blockSize;
    this.fileName = fileName;
  }
  getVideoQuality() {
    if (this.blockSize == "4*4") {
      this.videoQuality = "low";
    }
    if (this.blockSize == "8*8") {
      this.videoQuality = "medium";
    } else {
      this.videoQuality = "high";
    }
  }
  codeVideo() {
    console.log("video is coding ....");
    console.log("some operations which use the blockSize");
    this.getVideoQuality();
    console.log(`video coded in AVC. quality ${this.videoQuality}`);
  }
}

class HEVC {
  protected bitRate: number;
  protected fileName: string;
  private videoQuality: any;
  constructor(bitRate: number, fileName: string) {
    this.bitRate = bitRate;
    this.fileName = fileName;
  }
  getVideoQuality() {
    if (this.bitRate == 10) {
      this.videoQuality == "low";
    }
    if (this.bitRate == 20) {
      this.videoQuality = "medium";
    } else {
      this.videoQuality = "high";
    }
  }
  codeVideo() {
    console.log("video is coding ....");
    console.log("some operations which use the bitrate");
    this.getVideoQuality();
    console.log(`video coded in HEVC. quality ${this.videoQuality}`);
  }
}

class AdapterToHEVC {
  private video: { blockSize: string; fileName: string; videoQuality: string };
  constructor(item: object) {
    this.video = Object.assign(
      {} as { blockSize: string; fileName: string; videoQuality: string },
      item
    );
  }
  getBitRate() {
    if (this.video.blockSize == "4*4") {
      return 10;
    }
    if (this.video.blockSize == "8*8") {
      return 20;
    }
    if (this.video.blockSize == "16*16") {
      return 30;
    } else {
      return "somethings went wrong";
    }
  }
  codeVideo() {
    console.log("video is recoding ....");
    this.getBitRate();
    console.log("some operation which use the bitrate");
    console.log(
      `video was recoded from H264 to HEVC. quality ${this.video.videoQuality}`
    );
    return {
      bitRate: this.getBitRate(),
      fileName: this.video.fileName,
      videoQuality: this.video.videoQuality,
    };
  }
}

const video1: any = new H264("16*16", "video in H264");
video1.getVideoQuality();
const video2: any = new HEVC(10, "video in HEVC");
video2.getVideoQuality();
const video3: any = new AdapterToHEVC(video1).codeVideo();
