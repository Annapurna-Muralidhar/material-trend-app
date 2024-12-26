using {com.material.trend as db} from '../db/schema';
using { YY1_MATERIALTEST_CDS_0001 as external } from './external/YY1_MATERIALTEST_CDS_0001';

// service MaterialService {
//   entity MaterialTrend as projection on db.MaterialTrend;
// }



service MaterialService @(OData.version: 4) {
  entity MaterialTrend as projection on db.MaterialTrend;

  // Annotate the MaterialTrendAggregated entity with aggregation capabilities
  annotate MaterialTrend with @(
    Aggregation.ApplySupported: {
      Transformations: [
        'aggregate',
        'topcount',
        'bottomcount',
        'identity',
        'concat',
        'groupby',
        'filter',
        'search'      
      ],
      GroupableProperties: [
        'Material', // Replace with actual property name that should be groupable
        'Date',
        'Quantity'
      ],
      AggregatableProperties: [
        {
          $Type: 'Aggregation.AggregatablePropertyType',
          Property: 'Quantity' // Property that can be aggregated (sum, avg, etc.)
        }
      ]
    }
  );

  entity Material as projection on external.YY1_MaterialTest{
    Material,
    PostingDate,
    QuantityInBaseUnit,
    GoodsMovementType
  }
                // action chart(data: array of Material) returns String;

                action chart(data: array of Material) returns array of { date: Date; quantity: Decimal; };

}