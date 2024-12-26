sap.ui.define([
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/MessageToast",
    "sap/ui/core/HTML"
], function (Dialog, Button, MessageToast, HTML) {
    "use strict";

    return {
        chart: function (oBindingContext, aSelectedContexts) {
            if (!aSelectedContexts || aSelectedContexts.length === 0) {
                MessageToast.show("No items selected.");
                return;
            }

            var aCleanedData = aSelectedContexts.map(function (oContext) {
                var oData = oContext.getObject();
                return { Material: oData.Material };
            });

            console.log("Cleaned Payload to Backend:", { data: aCleanedData });
            $.ajax({
                url: "/odata/v4/material/chart",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({ data: aCleanedData }),
                success: function (response) {
                    console.log("Backend Response:", response.value);

                    const dates = response.value.map((item) => item.date);
                    const quantities = response.value.map((item) => item.quantity);
                    const oDialog = new Dialog({
                        title: "Material Quantity Trend",
                        content: new HTML({
                            content: '<canvas id="chartCanvas" width="1000" height="1000"></canvas>'
                        }),
                        endButton: new Button({
                            text: "Close",
                            press: function () {
                                oDialog.close();
                            }
                        })
                    });

                    oDialog.open();
                    oDialog.attachAfterOpen(function () {
                        const ctx = document.getElementById("chartCanvas").getContext("2d");

                        const backgroundColorPlugin = {
                            id: 'backgroundColorPlugin',
                            beforeDraw: function(chart) {
                                const ctx = chart.ctx;
                                const chartArea = chart.chartArea;

                            
                                const sectionHeight = chartArea.bottom / 3;

                                ctx.fillStyle = 'lightgreen'; // Top section
                                ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, sectionHeight);

                                ctx.fillStyle = '#FFD54F';  // Middle section (amber)
                                ctx.fillRect(chartArea.left, chartArea.top + sectionHeight, chartArea.right - chartArea.left, sectionHeight);

                                ctx.fillStyle = 'lightcoral'; // Bottom section (light red)
                                ctx.fillRect(chartArea.left, chartArea.top + 2 * sectionHeight, chartArea.right - chartArea.left, sectionHeight);
                            }
                        };

                        new Chart(ctx, {
                            type: "line",
                            data: {
                                labels: dates,
                                datasets: [{
                                    label: "Cumulative Quantity",
                                    data: quantities,
                                    fill: true,
                                    backgroundColor: "rgba(75, 192, 192, 0.2)", 
                                    borderColor: "rgb(72, 68, 68)",
                                    tension: 0.1
                                }]
                            },
                            options: {
                                responsive: true,
                                scales: {
                                    x: { 
                                        title: { display: true, text: "Date" }
                                    },
                                    y: { 
                                        title: { display: true, text: "Quantity" }
                                    }
                                }
                            },
                            plugins: [backgroundColorPlugin] 
                        });
                    });
                },
                error: function (xhr, status, error) {
                    MessageToast.show("Error fetching chart data: " + error);
                    console.error("AJAX Error:", xhr, status, error);
                }
            });
        }
    };
});
