(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    function ShoppingListCheckOffService() {
        var sellingItems = [
            {name: "cookies type 0", quantity: 10},
            {name: "cookies type 1", quantity: 10},
            {name: "cookies type 2", quantity: 10},
            {name: "cookies type 3", quantity: 10},
            {name: "cookies type 4", quantity: 10},
            {name: "cookies type 5", quantity: 10},
            {name: "cookies type 6", quantity: 10}
        ];
        var boughtItems = [];
        this.buy = function (index) {
            boughtItems.push(sellingItems[index]);
            sellingItems.splice(index, 1);
        };
        this.cancel = function (index) {
            sellingItems.push(boughtItems[index]);
            boughtItems.splice(index, 1);
        };
        this.getSellingItems = function () {
            return sellingItems;
        };
        this.getBoughtItems = function () {
            return boughtItems;
        };
    }

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        this.items = ShoppingListCheckOffService.getSellingItems();
        this.buy = function (indexItem) {
            ShoppingListCheckOffService.buy(indexItem);
            this.items = ShoppingListCheckOffService.getSellingItems();
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        this.items = ShoppingListCheckOffService.getBoughtItems();
        this.cancel = function (indexItem) {
            ShoppingListCheckOffService.cancel(indexItem);
            this.items = ShoppingListCheckOffService.getBoughtItems();
        }
    }
})();
