const fileSaver = require("file-saver");
              
const file = new Blob(
  [
    `
    BEGIN:VCARD
    VERSION:3.0
    N:${this.state.lastName};${this.state.firstName};;;
    FN:${this.state.firstName} ${this.state.lastName}
    TITLE:${this.state.title};
    EMAIL;type=INTERNET;type=pref:${this.state.email}
    TEL;type=MAIN:${this.state.work}
    TEL;type=CELL;type=VOICE;type=pref:${this.state.mobile}
    ADR;type=WORK;type=pref:;;;${this.state.location};;;
    END:VCARD
    `,
  ],
  { type: "text/vcard;charset=utf-8" }
);

let a = document.createElement("a");
a.download = `${this.state.firstName}${this.state.lastName}.vcf`;
a.href = URL.createObjectURL(file);

const reader = new FileReader();

if (navigator.userAgent.match("CriOS")) {
  reader.onloadend = (e) => {
    window.open(reader.result);
  };
  reader.readAsDataURL(file);
} else if (navigator.userAgent.match(/iPad|iPhone|Android/i)) {
  reader.onload = (e) => {
    window.location.href = reader.result;
  };
  reader.readAsDataURL(file);
} else {
  fileSaver.saveAs(
    file,
    `${this.state.firstName}${this.state.lastName}.vcf`,
    true
  );
}
