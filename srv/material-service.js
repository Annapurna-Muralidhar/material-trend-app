const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const materialapi = await cds.connect.to('YY1_MATERIALTEST_CDS_0001');

    this.on('READ', 'Material', async (req) => {
        return await materialapi.run(req.query);
    });

    this.on('chart', async (req) => {
        const { Material } = this.entities;
        console.log("Action 'chart' invoked!");
        const requestData = req.data;

        if (!requestData || !requestData.data || requestData.data.length === 0) {
            console.error("No data received!");
            return [];
        }

        const mat = requestData.data[0].Material;
        const query = SELECT.from(Material, ['PostingDate', 'QuantityInBaseUnit', 'GoodsMovementType']).where({ Material: mat });
        const materialData = await materialapi.run(query);

        console.log("Fetched Material Data:", materialData);
        const cumulativeData = [];
        let cumulativeQuantity = 0;

        materialData
            .sort((a, b) => new Date(a.PostingDate) - new Date(b.PostingDate)) 
            .forEach((item) => {
                const date = item.PostingDate;
                const quantity = parseFloat(item.QuantityInBaseUnit);
                const movementType = item.GoodsMovementType;
                if (['201', '221', '251', '261', '281', '291'].includes(movementType)) {
                    cumulativeQuantity -= quantity;
                } else {
                    cumulativeQuantity += quantity;
                }

                cumulativeData.push({ date, quantity: cumulativeQuantity });
            });

        console.log("Processed Data for Chart:", cumulativeData);

        return cumulativeData; 
    });
});
