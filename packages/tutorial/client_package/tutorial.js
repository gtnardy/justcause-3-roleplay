const countTutorials = {
	"BEGINNER": 7,
	"BANK": 2,
	"TOWNHALL": 1,
	"SNACKBAR": 2,
	"VEHICLE": 1,
	"GASSTATION": 1,
};

var currentTutorial;
var currentTutorialCount;

jcmp.events.Add("Tick18Seconds", function() {
	nextTutorial();
});

jcmp.events.Add("StartTutorial", function(idTutorial) {
	if (!countTutorials[idTutorial])
		return;

	currentTutorial = idTutorial;
	currentTutorialCount = 0;
});

function nextTutorial() {
	if (!currentTutorial)
		return;

	currentTutorialCount++;

	if (countTutorials[currentTutorial] <= currentTutorialCount) {
		currentTutorial = null;
		currentTutorialCount = null;
		return;
	}

	jcmp.notifications.add("[#FFFF00]" + jcmp.languages.get("TUTORIAL_LABEL"), jcmp.languages.get("TUTORIAL_" + currentTutorial + "_" + currentTutorialCount), "info");
}