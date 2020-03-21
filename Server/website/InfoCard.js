var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfoCard = function (_React$Component) {
  _inherits(InfoCard, _React$Component);

  function InfoCard(props) {
    _classCallCheck(this, InfoCard);

    var _this = _possibleConstructorReturn(this, (InfoCard.__proto__ || Object.getPrototypeOf(InfoCard)).call(this, props));

    _this.state = {
      name: '',
      description: ''
    };
    return _this;
  }

  _createClass(InfoCard, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      fetch("/info").then(function (res) {
        return res.json();
      }).then(function (result) {
        _this2.setState({
          name: result.name,
          description: result.description
        });
      }, function (error) {
        _this2.setState({
          name: 'error',
          description: 'error'
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'col-md-4' },
        React.createElement(
          'div',
          { className: 'card mb-4 shadow-sm' },
          React.createElement(
            'svg',
            { className: 'bd-placeholder-img card-img-top text-center', width: '100%', height: '225', xmlns: 'http://www.w3.org/2000/svg', preserveAspectRatio: 'xMidYMid slice', focusable: 'false', role: 'img' },
            React.createElement(
              'title',
              null,
              this.name
            ),
            React.createElement('rect', { width: '100%', height: '100%', fill: '#55595c' }),
            React.createElement(
              'text',
              { x: '50%', y: '50%', fill: '#eceeef', dy: '.3em' },
              this.state.name
            )
          ),
          React.createElement(
            'div',
            { className: 'card-body', style: { height: "200px" } },
            React.createElement(
              'p',
              { className: 'card-text text-truncate' },
              this.state.description
            ),
            React.createElement(
              'div',
              { className: 'd-flex justify-content-between align-items-center' },
              React.createElement(
                'div',
                { className: 'btn-group' },
                React.createElement(
                  'button',
                  { type: 'button', className: 'btn btn-sm btn-outline-secondary' },
                  'View'
                ),
                React.createElement(
                  'button',
                  { type: 'button', className: 'btn btn-sm btn-outline-secondary' },
                  'Edit'
                )
              ),
              React.createElement(
                'small',
                { className: 'text-muted' },
                '9 mins'
              )
            )
          )
        )
      );
    }
  }]);

  return InfoCard;
}(React.Component);

ReactDOM.render(React.createElement(InfoCard, null), document.getElementById('InfoCardSection'));