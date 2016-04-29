(function(module){
    module.exports.oxford = module.exports.oxford || {};
    module.exports.oxford.Client = (function exportsOxfordClient(){
        return function Client(apiKey){
            var Face = require("./oxford-face.js").oxford.Face;
            this.face = new Face(this);
            this.getApiKey = function getApiKey(){
                return apiKey;
            };
        };
    })();
})(module);
