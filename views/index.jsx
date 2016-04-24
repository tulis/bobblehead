(function (module){
    var React = require("react");

    var ImageUploader = React.createClass({
        render: function(){
            return <div style={{width: "400px"}}>
                <h1>{this.props.title}</h1>
                <p>{this.props.location}</p>
                <p>
                    Upload a picture of a head to get started
                </p>

                <form action="/" method="post" encType="multipart/form-data">
                    <input type="file" name="userPhoto"/>
                    <input type="submit" value="Upload Image" name="submit" />
                </form>

                <img src={this.props.image}></img>
            </div>;
        }
    });

    module.exports = ImageUploader;
})(module);
