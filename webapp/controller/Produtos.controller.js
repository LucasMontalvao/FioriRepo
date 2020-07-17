sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter"
], function (Controller, Filter, FilterOperator, Sorter) {
	"use strict";
	return Controller.extend("br.com.infoprodutos.Produtos.controller.Produtos", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf br.com.infoprodutos.Produtos.view.Produtos
		 */
		onInit: function () {},
		funcListItemPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var id = oEvent.getSource().getBindingContext("Produtos").getProperty("ProductID");
			oRouter.navTo("Detalhes", {
				idProd: id
			});
		},
		handleGroup: function(oevt){
			var sorters = [];
			var item = oevt.getParameter("selectedItem");
			var key = (item) ? item.getKey() : null;
			
			if(key === "UnitPrice"){
				var grouper = this.getView().getController.Price;
				sorters = [new sap.ui.model.Sorter(key, true, grouper)];
			}else{
				sorters.push(new sap.ui.model.Sorter("Category/CategoryName",false,false));
				sorters.push(new sap.ui.model.Sorter("ProductName",false,false));
			}
			var oTable = this.getView().byId("table0");
			var oBinding = oTable.getBinding("items");
			oBinding.sort(sorters);
		},
		Price: function(oContext){
			var price = oContext.getProperty("UnitPrice");
			var key = "";
			var text = "";
			
			if(price <= 100){
				key = "<";
				text = "Menor ou igual a 100,00 BRL";
			}else if(price <= 1000){
				key = "";
				text = "Entre 100,00 BRL e 1000,00 BRL";
			}else{
				key = ">";
				text = "Maior que 1000,00 BRL";
			}
			return{
				key: key,
				text: text
			};
		},
		openOrdemInfor: function(oEvent){
			
		},

		onFilter: function (oEvent) {
			var aFilter = [];
			var sQuery = oEvent.getParameter("query"),
				oList = this.getView().byId("table0");

			if (sQuery) {
				aFilter = [new sap.ui.model.Filter("ProductName", sap.ui.model.FilterOperator.Contains, sQuery)];
			}

			oList.getBinding("items").filter(aFilter);

			/*var query = oEvent.getParameter("query");
			var oTable = this.getView().byId("table0");
			var oFilter = [ new Filter("Products/ProductName", FilterOperator.Contains, query)];
			
			//var binding = oTable.getBinding("items");
			oTable.getBinding("items").filter(oFilter, "Application");
			//binding.filter(oFilter);*/

		}
	});
});