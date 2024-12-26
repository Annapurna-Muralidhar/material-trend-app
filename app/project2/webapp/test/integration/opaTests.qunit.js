sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'project2/test/integration/FirstJourney',
		'project2/test/integration/pages/MaterialList',
		'project2/test/integration/pages/MaterialObjectPage'
    ],
    function(JourneyRunner, opaJourney, MaterialList, MaterialObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('project2') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheMaterialList: MaterialList,
					onTheMaterialObjectPage: MaterialObjectPage
                }
            },
            opaJourney.run
        );
    }
);