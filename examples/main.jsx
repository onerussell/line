var ElementMixin = {
  renderElement: function (element) {
    switch (element.type) {//rect, symbol, path, arc, area, line, rule, image, text, group
      case 'chart':
      {
        return <Chart data={element}></Chart>;
      }
      case 'rect':
      {
        return element.data[0].values.map((function (item) {
          return <Rect data={element}
                       x={this.state.scales.x.value(item.x)}
                       y={this.state.scales.y.value(item.y)}
                       width={this.state.scales.x.value.rangeBand()}
                       height={this.state.properties.height-this.state.scales.y.value(item.y)}/>;
        }).bind(this));
      }
      case 'symbol':{
        return <div></div>
      }
      case 'path':{
        return <div></div>
      }
      case 'arc':{
        return <div></div>
      }
      case 'area':{
        return <div></div>
      }
      case 'line':{
        return <div></div>
      }
      case 'rule':{
        return <div></div>
      }
      case 'image':{
        return <div></div>
      }
      case 'text':{
        return <div></div>
      }
      case 'group':{
        return <div></div>
      }
      default:
      {
        return <div></div>;
      }
    }
  }
  //all
};

var Qb = React.createClass({
  mixins: [ElementMixin],
  getInitialState: function () {
    return {
      data: this.props.data.data,
      elements: this.props.data.elements,
      properties: this.props.data.properties
    }
  },
  render: function () {
    return (
      <div>
        {this.state.elements.map(function (element) {
          element.data = this.state.data;
          return this.renderElement(element)
        }.bind(this))}
      </div>
    );
  }
});

var Chart = React.createClass({
  mixins: [ElementMixin],
  getInitialState: function () {

    var x = d3.scale.ordinal()
      .rangeRoundBands([0, this.props.data.properties.width], .1);

    var y = d3.scale.linear()
      .range([this.props.data.properties.height, 0]);

    x.domain(this.props.data.data[0].values.map(function (d) {
      return d.x;
    }));
    y.domain([0, d3.max(this.props.data.data[0].values, function (d) {
      return d.y;
    })]);

    return {
      data: this.props.data.data,
      elements: this.props.data.elements,
      properties: this.props.data.properties,
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
    return (
      <svg width={this.props.data.properties.width} height={this.props.data.properties.height}>
        {this.state.elements.map(function (element) {
          element.data = this.state.data;
          return this.renderElement(element)
        }.bind(this))}
      </svg>
    );
  },
});

var Rect = React.createClass({
  mixins: [ElementMixin],
  getInitialState: function () {
    return {
      data: this.props.data.data,
      elements: this.props.data.elements,
      properties: this.props.data.properties
    }
  },
  render: function () {
    return (
      <rect fill="orange" x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height}>
      </rect>
    );
  }
});

var model = {
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

React.render(
  <Qb data={model}/>,
  document.getElementById('div')
);