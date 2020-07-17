sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("br.com.infoprodutos.Produtos.controller.Detalhes", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf br.com.infoprodutos.Produtos.view.Detalhes
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Detalhes").attachMatched(this._onRoute, this);
		},
		_onRoute: function (evt) {
			var oArgs = evt.getParameter("arguments");
			var oView = this.getView();

			var sURL = "/Products(" + oArgs.idProd + ")";
			oView.bindElement({
				path: sURL,
				parameters: {
					expand: "Category"
				},
				events: {
					dataRequested: function () {
						oView.setBusy(true);
					},
					dataReceived: function () {
						oView.setBusy(false);
					}
				}
			});

		},
		onNavBack: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Produtos", {}, false);
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf br.com.infoprodutos.Produtos.view.Detalhes
		 */
		onBeforeRendering: function () {
			this.getView().byId("form0").bindElement("Supplier");
		},
		openOrdemInfo: function(oEvent){
			var oView = this.getView();
			if(!this._oDialog){
				this._oDialog = sap.ui.xmlfragment("br.com.infoprodutos.Produtos.view.OrdemInfo", this);
				this.getView().addDependent(this._oDialog);
			}
			var oOrder = oEvent.getSource().getBindingContext().getObject().OrderID;
			var oProduto = oEvent.getSource().getBindingContext().getObject().ProductID;
			
			var sURL = "/Order_Details(OrderID=" + oOrder +",ProductID="+ oProduto + ")";
			
			var oForm = sap.ui.getCore().byId("sfInfo");
			oForm.bindElement({
				path: sURL,
				parameters: {
					expand: "Order"
				},
				events: {
					dataRequested: function () {
						oView.setBusy(true);
					},
					dataReceived: function () {
						oView.setBusy(false);
					}
				}
			});
			
			this._oDialog.open();
		},
		onClose: function(){
			this._oDialog.close();
		}

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf br.com.infoprodutos.Produtos.view.Detalhes
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf br.com.infoprodutos.Produtos.view.Detalhes
		 */
		//	onExit: function() {
		//
		//	}

	});

});