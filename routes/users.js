(function(module){
    module.exports.routers = module.exports.routers || {};
    module.exports.routers.users = (function exportsUsersApiRouter(){
        function listUsers(request, response, next){
            res.send('respond with a resource');
        };

        return {
            listUsers: listUsers
        }
    })();
})(module);
