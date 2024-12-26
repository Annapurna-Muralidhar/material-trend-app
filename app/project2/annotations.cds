using MaterialService as service from '../../srv/material-service';
annotate service.Material with @(
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
                Label : 'PostingDate',
                Value : PostingDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'QuantityInBaseUnit',
                Value : QuantityInBaseUnit,
            },
            {
                $Type : 'UI.DataField',
                Label : 'GoodsMovementType',
                Value : GoodsMovementType,
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
            Label : 'PostingDate',
            Value : PostingDate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'QuantityInBaseUnit',
            Value : QuantityInBaseUnit,
        },
        {
            $Type : 'UI.DataField',
            Label : 'GoodsMovementType',
            Value : GoodsMovementType,
        },
    ],
);

