var WebBrowser = {
  BrowserName: {
    Unknown: "Unknown",
    InternetExplorer: "InternetExplorer",
    Firefox: "Firefox",
    Chrome: "Chrome",
    Opera: "Opera",
    Safari: "Safari",
    Dolphin: "Dolphin",
    Konqueror: "Konqueror",
    Linx: "Linx"
  }
};
Object.freeze(WebBrowser);

function Speaker() {
  let Speaker = this;

  //Register a speaker and return speakerID
  this.register = function (repository) {
    let speakerId = null;
    let isApproved = false;


    if (!isSpeakerStringPropertyIsValid(Speaker, 'firstName')) {
      throw new Error("First Name is required");
    }
    if (!isSpeakerStringPropertyIsValid(Speaker, 'lastName')) {
      throw new Error("Last Name is required");
    }
    if (!isSpeakerStringPropertyIsValid(Speaker, 'email')) {
      throw new Error("Email is required");
    }
    if (!isSpeakerValid(Speaker)) {
      throw new Error("Speaker doesn't meet our abitrary and capricious standards.");
    }
    isApproved = approveSpeaker(Speaker);
    if (!isApproved) {
      throw new Error("No sessions approved.");
    }
    Speaker = setSpeakerRegistrationFee(Speaker)

    try {
      speakerId = repository.saveSpeaker(this);
    } catch (e) {
    }
    return speakerId;
  };
}

function isSpeakerStringPropertyIsValid(speaker, key) {
  let isValid = (speaker[key] !== null && speaker[key].trim() !== "")
  return isValid;
}

function isSpeakerFirstPropertiesIsValid(speaker) {
  const employers = ["Microsoft", "Google", "Fog Creek Software", "37Signals"];
  let isValid = false;
  isValid = speaker.exp > 10 || speaker.hasBlog || speaker.certifications.length > 3 || employers.indexOf(speaker.employer) !== -1;
  return isValid;
}

function isSpeakerValid(speaker) {
  let isValid = false;
  isValid = isSpeakerFirstPropertiesIsValid(speaker);
  if (!isValid)
    isValid = isSpeakerDomainAndBrowserIsValid(speaker);
  return isValid;
}

function isSpeakerDomainAndBrowserIsValid(speaker) {
  const domains = ["aol.com", "hotmail.com", "prodigy.com", "CompuServe.com"];
  let isValid = false;
  let emailParts = speaker.email.split("@");
  let emailDomain = emailParts[emailParts.length - 1];
  if (domains.indexOf(emailDomain) === -1 && !(speaker.browser.name === WebBrowser.BrowserName.InternetExplorer && speaker.browser.majorVersion < 9)) {
    isValid = true;
  }
  return isValid;
}

function approveSpeaker(speaker) {
  const oldTechnologies = ["Cobol", "Punch Cards", "Commodore", "VBScript"];
  let isApproved = false
  if (speaker.sessions.length !== 0) {
    for (var session of speaker.sessions) {

      for (var tech of oldTechnologies) {
        if (session.title.indexOf(tech) !== -1 || session.description.indexOf(tech) !== -1) {
          session.approved = false;
          break;
        } else {
          session.aprroved = true;
          isApproved = true;
        }
      }
    }
    return isApproved;
  } else {
    throw new Error("Can't register speaker with no sessions to present.");
  }
}

function setSpeakerRegistrationFee(speaker) {
  if (speaker.exp < 2) {
    speaker.registrationFee = 500;
  } else if (speaker.exp < 4) {
    speaker.registrationFee = 250;
  } else if (speaker.exp < 6) {
    speaker.registrationFee = 100;
  } else if (speaker.exp < 10) {
    speaker.registrationFee = 50;
  } else {
    speaker.registrationFee = 0;
  }
  return speaker;
}
