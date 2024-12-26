sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'project1/test/integration/FirstJourney',
		'project1/test/integration/pages/MaterialTrendList',
		'project1/test/integration/pages/MaterialTrendObjectPage'
    ],
    function(JourneyRunner, opaJourney, MaterialTrendList, MaterialTrendObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('project1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheMaterialTrendList: MaterialTrendList,
					onTheMaterialTrendObjectPage: MaterialTrendObjectPage
                }
            },
            opaJourney.run
        );
    }
);