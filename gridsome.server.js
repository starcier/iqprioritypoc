// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require("axios");

module.exports = function(api) {
  api.loadSource(async (actions) => {
    const { data } = await axios.get(
      "https://api.airtable.com/v0/app8FOiiczWZEjEzA/Claims?api_key=keyvupdN1FpjNSbZm"
    );
    console.log();

    const collection = actions.addCollection({
      typeName: "airData",
      path: "/airdatas/:id",
    });

    for (const air of data.records) {
      collection.addNode({
        id: air.id,
        path: "/airdatas/" + air.id,
        claimId: air.fields.claim_id,
        title: air.fields.claimant_name,
        stage: air.fields.stage,
        alert: air.fields.alert,
        severity: air.fields.severity,
        adjuster: air.fields.adjuster,
        claimDate: air.fields.claim_age,
        litigationRisk: air.fields.litigation_risk,
        dateOfLoss: air.fields.date_of_loss,
        lossDescription: air.fields.loss_description,
        injuryDescription: air.fields.injury_description,
        source: air.fields.source,
        subject: air.fields.subject,
        projectedCost: air.fields.projected_cost,
        litigationStage: air.fields.litigation_stage,
        litigationDescription: air.fields.litigation_description,
        projectedCost_driver_1: air.fields.projected_costs_cost_drivers_1,
        projectedCost_driver_2: air.fields.projected_costs_cost_drivers_2,
        projectedCost_driver_3: air.fields.projected_costs_cost_drivers_3,
        projectedCost_driver_4: air.fields.projected_costs_cost_drivers_4,
        litigationCost_driver_1: air.fields.litigation_cost_driver_1,
        litigationCost_driver_2: air.fields.litigation_cost_driver_2,
        litigationCost_driver_3: air.fields.litigation_cost_driver_3,
        litigationCost_driver_4: air.fields.litigation_cost_driver_4,
      });
    }
  });
};
