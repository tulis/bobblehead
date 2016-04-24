(function (module){
    var React = require("react");

    var ErrorMessage = React.createClass({
        render: function(){
            return <div>
                <h1>{this.props.message}</h1>
                <h2>{this.props.error.status}</h2>
                <h3>{this.props.error.stack}</h3>
            </div>;
        }
    });

    module.exports = ErrorMessage;
})(module);
