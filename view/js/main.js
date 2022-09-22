import saveAs from 'file-saver'

// create a file container for the vCard syntax
// the vCard is created in accordance to RFC2426 
const file = new Blob(
  [
    `
    BEGIN:VCARD
    VERSION:4.0
    N:${'T'};${'L'};;;
    FN:${'L'} ${'T'}
    TITLE:${'IT Auditor'};
    EMAIL;type=INTERNET;type=pref:${'t@resdtr.com'}
    TEL;type=MAIN;VALUE=uri:tel:${'+352 565 555'}
    TEL;type=CELL;type=VOICE;type=pref;VALUE=uri:tel:${'+49 176 635632'}
    ADR;type=WORK;type=pref:;;;${'Avega'};;;
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
  saveAs(
    file,
    `${this.state.firstName}${this.state.lastName}.vcf`,
    true
  );
}
