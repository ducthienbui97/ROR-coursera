(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);
    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        this.getMatchedMenuItems = function (value) {
            return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json').then(function (result) {
                // process result and only keep items that match
                var foundItems = [];
                var items = result.data.menu_items;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].description.includes(value))
                        foundItems.push(items[i]);
                    // return processed items
                }
                return foundItems;
            });
        }
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.searchValue = "";
        ctrl.found = [];
        ctrl.display = function () {
            MenuSearchService.getMatchedMenuItems(ctrl.searchValue).then(function (data) {
                ctrl.found = data;
            });
        };
        ctrl.remove = function (index) {
            ctrl.found.splice(index, 1);
        };
    }

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            }
        };
        return ddo;
    }
})();
