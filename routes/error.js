(function(module){
    module.exports.routers = module.exports.routers || {};
    module.exports.routers.errors = (function exportsErrorRouters(){
        function catch404(request, response, next){
            var error = new Error("Not Found");
            error.status = 404;
            next(error);
        }

        function displayErrorMessage(error, request, response, next){
            response.status(error.status || 500);
            response.render("error", {
              message: error.message,
              error: {}
            });
        }

        function displayErrorMessageWithStackTrace(error, request, response, next){
            response.status(error.status || 500);
            response.render("error", {
              message: error.message,
              error: error
            });
        }

        return {
            catch404: catch404,
            displayErrorMessage: displayErrorMessage,
            displayErrorMessageWithStackTrace: displayErrorMessageWithStackTrace
        };
    })();
})(module);
