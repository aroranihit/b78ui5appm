sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/demo/app/project1/model/formatter",
    "sap/m/MessageBox"
], (Controller, formatter, MessageBox) => {
    "use strict";

    return Controller.extend("com.demo.app.project1.controller.View1", {
        f:formatter,
        onInit() {

            var oModel = this.getOwnerComponent().getModel("oModel");
            var empModel = this.getOwnerComponent().getModel("empModel");
            oModel.read("/EmployeeSet",{
                success:function(data) {
                     var ratingDesc = "";
                     for (var i=0;i<data.results.length;i++){
                          if(data.results[i].Rating === 5){
                            ratingDesc = "(Outstanding)";
                          } else if(data.results[i].Rating === 4){
                            ratingDesc = "(Best)";
                          } else if(data.results[i].Rating === 3){
                            ratingDesc = "(Can be better)";
                          }

                          data.results[i].Rating = data.results[i].Rating + ratingDesc;

                    }

                    empModel.setData(data);
                   
                },
                error:function(oError){

                }}
            );

        },
        
        onPresss() {
            var name = this.byId("_IDGenInput").getValue();
            this.byId("_IDGenText1").setText(`${name} Welcome to SAP UI5 `)

            var textAlign = this.byId("_IDGenInput1").getValue();
            this.byId("_IDGenText1").setTextAlign(textAlign);




            // Disable both input fields
            this.byId("_IDGenInput").setEnabled(false);
            this.byId("_IDGenInput1").setEnabled(false);
            this.byId("_IDGenButton4").setEnabled(false);


        },
        onPress: function (oEvent) {
            var s = this.byId('_IDGenInput').getValue()
            sap.m.MessageToast.show(` ${s} How are u?`);
        }, onTick: function (oEvent) {

            sap.m.MessageToast.show(` There is no back page`);
        },
        onClick() {
            this.getOwnerComponent().getRouter().navTo("RouteView2");
        },

        onSumbitpress: function () {
            this.byId("_IDGenInput11").setValueState("None");
            this.byId("_IDGenInput12").setValueState("None");
            var allfilled = true;
            var empid = this.byId("_IDGenInput11").getValue();
            var name = this.byId("_IDGenInput12").getValue();
            if (empid === "") {
                this.byId("_IDGenInput11").setValueState("Error");
                this.byId("_IDGenInput11").setValueStateText("pls enter emp id");
                allfilled = false;
            } else {

                var empidregexp = /^\d{6}$/;
                if (!empid.match(empidregexp)) {
                    allfilled = false;
                    this.byId("_IDGenInput11").setValueState("Error");
                    this.byId("_IDGenInput11").setValueStateText("pls enter proper emp id");

                }

            }

            if (name === "") {
                this.byId("_IDGenInput12").setValueState("Error");
                this.byId("_IDGenInput12").setValueStateText("pls enetr emp name");
                allfilled = false;
            }

            if (allfilled === false) {
                MessageBox.error("pls fill details");

            } else {
                MessageBox.success("You are good to go")
            }
                    // to read the vale of multivalue elements on click of sumbit
                    var valueFromSel = this.byId("select1").getSelectedKey();
                     var valueFromCB = this.byId("comboBox1").getSelectedKey();
                      var valueFromMCB = this.byId("multiComboBox1").getSelectedKey();
                       var SelIndex = this.byId("Rdgrp1").getSelectedKey();


        },
        // to read the value immediately
        onSelectChange: function () {
              var valueFromSel = this.byId("select1").getSelectedKey();
            //   TO HIDE BELOW BOX BASED ON CONDITION
              if(valueFromSel === "HARSH"){
                this.byId("comboBox1").setEnabled(false);
              }
        },
        onSelFromCB: function () {
             var valueFromCB = this.byId("comboBox1").getSelectedKey();
        },
        onSelFromMCB: function () {
             var valueFromMCB = this.byId("multiComboBox1").getSelectedKey();
        },
        onSelFromRdgrp: function () {
             var SelIndex = this.byId("Rdgrp1").getSelectedKey();
        },

        onRowPress: function (oEvent) {

            var empId = oEvent.getSource().getBindingContext("oModel").getObject().Empid;
        },

        getEmpId: function () {

            var aRows = this.byId("empTable").getSelectedItems();
            for(var i=0;i<aRows.length;i++){
                MessageBox.success(aRows[i].getBindingContext("oModel").getObject().Empid);
                
            }
        },

   
    
    
    onPressF4Help: function () {

    if (this._oDialog === undefined) {

        this._oDialog = sap.ui.xmlfragment(
            this.getView().getId(),
            "com.demo.app.project1.fragments.EmpIdF4Help",
            this
        );

        this.getView().addDependent(this._oDialog);
    }

    this._oDialog.open();
},

onCloseDialog: function () {

    this._oDialog.close();
},

onEmpIdItemPress: function (oEvent) {   

    var empId = oEvent.getSource().getBindingContext("oModel").getObject().Empid;
    this.byId("inpEmpId").setValue(empId);
    this._oDialog.close();
},
    


        





       


    });
});