var Document = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

var Chart = React.createClass({
  getInitialState: function () {
    var data = [
      {
        "name": "table",
        "values": [
          {"x": 1, "y": 28}, {"x": 2, "y": 55},
          {"x": 3, "y": 43}, {"x": 4, "y": 91},
          {"x": 5, "y": 81}, {"x": 6, "y": 53},
          {"x": 7, "y": 19}, {"x": 8, "y": 87},
          {"x": 9, "y": 52}, {"x": 10, "y": 48},
          {"x": 11, "y": 24}, {"x": 12, "y": 49},
          {"x": 13, "y": 87}, {"x": 14, "y": 66},
          {"x": 15, "y": 17}, {"x": 16, "y": 27},
          {"x": 17, "y": 68}, {"x": 18, "y": 16},
          {"x": 19, "y": 49}, {"x": 20, "y": 15}
        ]
      }
    ];

    var x = d3.scale.ordinal()
      .rangeRoundBands([0, this.props.width], .1);

    var y = d3.scale.linear()
      .range([this.props.height, 0]);

    x.domain(data[0].values.map(function (d) {
      return d.x;
    }));
    y.domain([0, d3.max(data[0].values, function (d) {
      return d.y;
    })]);

    return {
      data: data,
      scales: {
        x: {
          "name": "x",
          "type": "ordinal",
          "range": "width",
          "domain": {"data": "table", "field": "x"},
          "value": x
        },
        y: {
          "name": "y",
          "type": "linear",
          "range": "height",
          "domain": {"data": "table", "field": "y"},
          "nice": true,
          "value": y
        }
      }
    }
  },
  render: function () {
    console.log(this.state);
    return (
      <svg width={this.props.width} height={this.props.height}>
        {this.state.data[0].values.map((function (item) {
          console.log(this.state.scales.x.value);

          return <Rect x={this.state.scales.x.value(item.x)}
                       y={this.state.scales.y.value(item.y)}
                       width={this.state.scales.x.value.rangeBand()}
                       height={this.props.height-this.state.scales.y.value(item.y)}/>;
        }).bind(this))}
      </svg>
    );
  },
});

var Rect = React.createClass({
  render: function () {
    return (
      <rect fill="orange" x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height}>
      </rect>
    );
  }
});

React.render(
  <Document>
    <Chart width={500} height={500}>
    </Chart>
  </Document>,
  document.getElementById('div')
);


/*
 --Document data
 --Chart scale.x.y
 --Rect
 */
var data = {
  "type": "document",
  "data": [
    {
      "name": "table",
      "values": [
        {"x": 1, "y": 28}, {"x": 2, "y": 55},
        {"x": 3, "y": 43}, {"x": 4, "y": 91},
        {"x": 5, "y": 81}, {"x": 6, "y": 53},
        {"x": 7, "y": 19}, {"x": 8, "y": 87},
        {"x": 9, "y": 52}, {"x": 10, "y": 48},
        {"x": 11, "y": 24}, {"x": 12, "y": 49},
        {"x": 13, "y": 87}, {"x": 14, "y": 66},
        {"x": 15, "y": 17}, {"x": 16, "y": 27},
        {"x": 17, "y": 68}, {"x": 18, "y": 16},
        {"x": 19, "y": 49}, {"x": 20, "y": 15}
      ]
    }
  ],
  "properties": {},
  "elements": [
    {
      type: "chart",
      properties: {
        render: "svg",
        "width": 500,
        "height": 200,
        "padding": {"top": 10, "left": 30, "bottom": 30, "right": 10},
        "scales": [
          {
            "name": "x",
            "type": "ordinal",
            "range": "width",
            "domain": {"data": "table", "field": "x"}
          },
          {
            "name": "y",
            "type": "linear",
            "range": "height",
            "domain": {"data": "table", "field": "y"},
            "nice": true
          }
        ],
        "axes": [
          {"type": "x", "scale": "x"},
          {"type": "y", "scale": "y"}
        ],
      },
      elements: [

        {
          "type": "rect",//rect, symbol, path, arc, area, line, rule, image, text, group
          "data": null,
          "from": {"data": "table"},
          "properties": {
            "enter": {
              "x": {"scale": "x", "field": "x"},
              "width": {"scale": "x", "band": true, "offset": -1},
              "y": {"scale": "y", "field": "y"},
              "y2": {"scale": "y", "value": 0}
            },
            "update": {
              "fill": {"value": "steelblue"}
            },
            "hover": {
              "fill": {"value": "red"}
            }
          }
        }
      ]
    }
  ]
};

function trash() {

  function chartRender() {

  }

  function rectRender() {

  }

  function render(element) {
    var node = this.tools[element.type](element);
    return node;
  }

  render.provider = d3;

  render.tools = {
    chart: chartRender,
    arc: d3.svg.arc,
    rect: rectRender,
  }
  render.root = "body";

  function parse(element) {
    render(element);

    for (var i = 0; i < element.elements.length; i++) {
      render(element.elements[i]);
    }

  }

  parse(data.elements[0]);

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
    .range([height, 0]);

  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.tsv("data.tsv", type, function (error, data) {
    if (error) throw error;

    x.domain(data.map(function (d) {
      return d.letter;
    }));
    y.domain([0, d3.max(data, function (d) {
      return d.frequency;
    })]);

    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return x(d.letter);
      })
      .attr("width", x.rangeBand())
      .attr("y", function (d) {
        return y(d.frequency);
      })
      .attr("height", function (d) {
        return height - y(d.frequency);
      });
  });

}