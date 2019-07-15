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
  var Speaker = this;

  //Register a speaker and return speakerID
  this.register = function (repository) {
    //let's init some variables
    var speakerId = null;
    var good = false;
    var appr = false;

    //var nt = ["Angular 8", ".Net Core 3", "NodeJs", "TypeScript, "Kotlin"];
    var ot = ["Cobol", "Punch Cards", "Commodore", "VBScript"];

    //DEFECT #5274 weren't filtering out prodigy domain so I added it.
    var domains = ["aol.com", "hotmail.com", "prodigy.com", "CompuServe.com"];

    if (Speaker.firstName !== null && Speaker.firstName.trim() !== "") {

      if (Speaker.lastName !== null && Speaker.lastName.trim() !== "") {

        if (Speaker.email !== null && Speaker.email.trim() !== "") {
          //list of employers
          var emps = ["Microsoft", "Google", "Fog Creek Software", "37Signals"];

          //DFCT #838 Jimmy
          //We're now requiring 3 certificatons so I changes the hard coded number
          good = Speaker.exp > 10 || Speaker.hasBlog || Speaker.certifications.length > 3 || emps.indexOf(Speaker.employer) !== -1;

          if (!good) {

            //need to get just the domain from the email
            var emailParts = Speaker.email.split("@");
            var emailDomain = emailParts[emailParts.length - 1];
            if (domains.indexOf(emailDomain) === -1 && !(Speaker.browser.name == WebBrowser.BrowserName.InternetExplorer && Speaker.browser.majorVersion < 9)) {
              good = true;
            }
          }

          if (good) {
            //DEFECT #5013 CO 1/12/2012
            //We weren't requiring at least one session
            if (Speaker.sessions.length !== 0) {
              for (var session of Speaker.sessions) {
                //for (var tech of nt)
                //{
                //    if (session.title.indexOf(tech) !== -1)
                //    {
                //        session.approved = true;
                //        break;
                //    }
                //}
                for (var tech of ot) {
                  if (session.title.indexOf(tech) !== -1 || session.description.indexOf(tech) !== -1) {
                    session.approved = false;
                    break;
                  } else {
                    session.aprroved = true;
                    appr = true;
                  }
                }
              }
            } else {
              throw new Error("Can't register speaker with no sessions to present.");
            }

            if (appr) {




              //if we got this far, the speaker is approved
              //let's go ahead and register him/her now.
              //First, let's calculate the registration fee.
              //More experienced speakers pay a lower fee.
              if (Speaker.exp <= 1) {
                Speaker.registrationFee = 500;
              } else if (Speaker.exp >= 2 && Speaker.exp <= 3) {
                Speaker.registrationFee = 250;
              } else if (Speaker.exp >= 4 && Speaker.exp <= 5) {
                Speaker.registrationFee = 100;
              } else if (Speaker.exp >= 6 && Speaker.exp <= 9) {
                Speaker.registrationFee = 50;
              } else {
                Speaker.registrationFee = 0;
              }



              //Now, save the speaker and sessions to the db.
              try {
                speakerId = repository.saveSpeaker(this);
              } catch (e) {
                //in case the db call fails
              }
            } else {
              throw new Error("No sessions approved.");
            }
          } else {
            throw new Error("Speaker doesn't meet our abitrary and capricious standards.");
          }
        } else {
          throw new Error("Email is required");
        }
      } else {
        throw new Error("Last Name is required");
      }
    } else {
      throw new Error("First Name is required");
    }

    return speakerId;
  };
}
