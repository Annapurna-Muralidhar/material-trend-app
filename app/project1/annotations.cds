using MaterialService as service from '../../srv/material-service';
annotate service.MaterialTrend with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Material',
                Value : Material,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Date',
                Value : Date,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Quantity',
                Value : Quantity,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Material',
            Value : Material,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Date',
            Value : Date,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Quantity',
            Value : Quantity,
        },
    ],
    Analytics.AggregatedProperty #Quantity_max : {
        $Type : 'Analytics.AggregatedPropertyType',
        Name : 'Quantity_max',
        AggregatableProperty : Quantity,
        AggregationMethod : 'max',
        ![@Common.Label] : 'Quantity (Maximum)',
    },
    UI.Chart #alpChart : {
        $Type : 'UI.ChartDefinitionType',
        ChartType : #Line,
        Dimensions : [
            Date,
        ],
        DynamicMeasures : [
            '@Analytics.AggregatedProperty#Quantity_max',
        ]
    },
);



