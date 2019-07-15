describe('Speaker ', function () {
    
    function getSpeakerThatWouldBeApproved()
    {
        var speaker = new Speaker();
        speaker.firstName = 'First';
        speaker.lastName = 'Last';
        speaker.email = 'example@domain.com';
        speaker.employer = 'Example Employer';
        speaker.hasBlog = true;
        speaker.browser = {
            name: WebBrowser.BrowserName.Unknown,
            majorVersion: 1
        };
        speaker.exp = 1;
        speaker.certifications = [];
        speaker.blogUrl = '';
        speaker.sessions = [{ title: 'test title', description: 'test description' }];
        
        return speaker;
    }

    function getSpeakerWithRedFlags() {

        var speaker = getSpeakerThatWouldBeApproved();
        speaker.email = "tom@aol.com";
        speaker.browser = { name: WebBrowser.BrowserName.InternetExplorer, majorVersion: 6 };
        return speaker;
    }

    var speakerRepository = {
        saveSpeaker: function (context) {
            return 1;
        }
    };

    it('should throw exception when first name is empty', function () {
        //arrange
        var speaker = getSpeakerThatWouldBeApproved();
        speaker.firstName = "";

        //act & assert
        expect(speaker.register).toThrow(new Error("First Name is required"));
    });

    it('should throw exception when last name is empty', function () {

        //arrange
        var speaker = getSpeakerThatWouldBeApproved();
        speaker.lastName = "";

        //act & assert
        expect(speaker.register).toThrow(new Error("Last Name is required"));
    });

    it('should throw exception when email is empty', function () {

        //arrange
        var speaker = getSpeakerThatWouldBeApproved();
        speaker.email = "";

        //act & assert
        expect(speaker.register).toThrow(new Error("Email is required"));
    });

    it('should register speaker when he works for a prestigious employer but has red flags', function () {

        //arrange
        var speaker = getSpeakerWithRedFlags();
        speaker.employer = 'Microsoft';

        var speakerId = speaker.register(speakerRepository);

        //act & assert
        expect(speakerId).toEqual(1);
    });

    it('should register speaker when he has a blog but has red flags', function () {

        //arrange
        var speaker = getSpeakerWithRedFlags();

        var speakerId = speaker.register(speakerRepository);

        //act & assert
        expect(speakerId).toEqual(1);
    });

    it('should register speaker when he has certifications but has red flags', function () {

        //arrange
        var speaker = getSpeakerWithRedFlags();

        var speakerId = speaker.register(speakerRepository);

        //act & assert
        expect(speakerId).toEqual(1);
    });

    it('throw exception when trying to register speaker with one session on old tech', function () {
         //arrange
         var speaker = getSpeakerThatWouldBeApproved();
         speaker.sessions = [{ title: "Cobol for dummies", description: "Intro to Cobol" }];
 
         //act & assert
         expect(speaker.register).toThrow(new Error("No sessions approved."));
    });

    it('throw exception when trying to register speaker with no sessions', function () {
        //arrange
        var speaker = getSpeakerThatWouldBeApproved();
        speaker.sessions = [];

        //act & assert
        expect(speaker.register).toThrow(new Error("Can't register speaker with no sessions to present."));
   });

   it('throw exception when trying to register speaker who is not exceptional and is using old browser', function () {
        //arrange
        var speakerThatDoesntAppearExceptional = getSpeakerThatWouldBeApproved();
        speakerThatDoesntAppearExceptional.hasBlog = false;
        speakerThatDoesntAppearExceptional.browser = { name: WebBrowser.BrowserName.InternetExplorer, majorVersion: 6 };

        //act & assert
        expect(speakerThatDoesntAppearExceptional.register).toThrow(new Error("Speaker doesn't meet our abitrary and capricious standards."));
   });

   it('throw exception when trying to register speaker who is not exceptional and is using ancient email', function () {
        //arrange
        var speakerThatDoesntAppearExceptional = getSpeakerThatWouldBeApproved();
        speakerThatDoesntAppearExceptional.hasBlog = false;
        speakerThatDoesntAppearExceptional.email = 'name@aol.com';

        //act & assert
        expect(speakerThatDoesntAppearExceptional.register).toThrow(new Error("Speaker doesn't meet our abitrary and capricious standards."));
   });
});