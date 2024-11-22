import React from 'react'
import Editor from '@monaco-editor/react';

const HtmlViewer = () => {
    const [cssCode, setCssCode] = React.useState(`
    #chartdiv {
        width: 100%;
        height: 500px;
    }
        #he{
        color: green;
        }
    `);
    const [jsCode, setJsCode] = React.useState(`
    am5.ready(function() {
        // Create root element
        var root = am5.Root.new("chartdiv");

        // Set themes
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Create chart
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true
        }));

        // Add cursor
        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);

        // Create axes
        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: "category",
            renderer: am5xy.AxisRendererX.new(root, {}),
            tooltip: am5.Tooltip.new(root, {})
        }));

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            renderer: am5xy.AxisRendererY.new(root, {})
        }));

        // Create series
        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            categoryXField: "category",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            })
        }));

        // Set data
        var data = [{
            category: "Research",
            value: 1000
        }, {
            category: "Marketing",
            value: 1200
        }, {
            category: "Sales",
            value: 850
        }];

        xAxis.data.setAll(data);
        series.data.setAll(data);

        // Make stuff animate on load
        series.appear(1000);
        chart.appear(1000, 100);
    });
    `);


    const [htmlCode, setHtmlCode] = React.useState(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>amCharts Example</title>
        <!-- Add external library links -->
        <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
        <script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
        <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
    </head>
    <body>
        <!-- Add HTML content here -->
        <div id="he">chal ra hai na</div>
        <div id="chartdiv"></div>
    </body>
    </html>
    `);

    const [a, setA] = React.useState(`
    ${htmlCode}
    <script>${jsCode}</script>
    <style>${cssCode}</style>
    `)

    React.useEffect(() => {

        setA(`
        ${htmlCode}
    <script>${jsCode}</script>
    <style>${cssCode}</style>
      `)

    }, [htmlCode, cssCode, jsCode])

    const handleHtmlChange = (code) => {
        setHtmlCode(code);
    };

    const handleCssChange = (code) => {
        setCssCode(code);
    };

    const handleJsChange = (code) => {
        setJsCode(code);
    };

  return (
      <div style={{ display: 'grid', gridTemplateColumns: '50% 50%', width: '96%', margin: 'auto', marginTop: '2px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <Editor height="33dvh" defaultLanguage="html" defaultValue={htmlCode} onChange={handleHtmlChange} theme="vs-dark" />
              <Editor height="33dvh" defaultLanguage="css" defaultValue={cssCode} onChange={handleCssChange} theme="vs-dark" />
              <Editor height="33dvh" defaultLanguage="javascript" defaultValue={jsCode} onChange={handleJsChange} theme="vs-dark" />
          </div>
          <div>
              <iframe
                  srcDoc={a}
                  style={{ width: "100%", height: "100%", border: "none" }}
                  title="HTML Preview"
              />
          </div>
      </div>
  )
}

export default HtmlViewer