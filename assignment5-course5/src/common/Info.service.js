(function () {
    "use strict";

    angular.module('common')
        .service('InfoService', InfoService);

    function InfoService() {
        var service = this;
        service.addInfo = function (subscriber) {
            console.log(subscriber);
            service.info = subscriber;
        };
        service.getInfo = function () {
            return service.info;
        }
    }

})();
