sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/demo/app/project1/model/formatter",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/Sorter"
], (Controller, formatter, MessageBox, Filter, Sorter) => {
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
            this.getOwnerComponent().getRouter().navTo("RouteView2",{
                empId:empId
            });
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
    onGoPress: function () {

        var aFilters = [];
        var aSorters = [];
        var empId = this.byId("inpEmpId").getValue();
        var empName = this.byId("inpEmpName").getValue();
        if (empId !== "") {
            aFilters.push(new Filter("Empid", "EQ", empId));
        }
        if (empName !== "") {
            aFilters.push(new Filter("Name", "Contains", empName));
        }
        this.byId("tblEmployeeMasterView01").getBinding("items").filter(aFilters);

        //gruping logic it should take priority over sorting
        var groupField = this.byId("_IDGenComboBoxgrp1").getSelectedKey();
        var groupOrder = this.byId("_IDGenRadioButtonGroupgrp1").getSelectedIndex();

        if (groupField !== "" && groupOrder !== -1) {
            aSorters.push(new Sorter(groupField, (groupOrder === 0)?false:true ,function(oBindingContext){

                if(groupField === "Skill"){
                    var skill = oBindingContext.getObject().Skill;
                    return{
                        key: skill,
                        text: skill
                    }


        }      else if(groupField === "Desig"){
                    var desig = oBindingContext.getObject().Desig;
                    return{
                        key: desig,
                        text: desig
                    }
        }
    
    
    }
        ));
        }
        //sorting logic
        var sortField = this.byId("_IDGenComboBox").getSelectedKey();
        var sortOrder = this.byId("_IDGenRadioButtonGroup").getSelectedIndex();

        if (sortField !== "" && sortOrder !== -1) {
            aSorters.push(new Sorter(sortField, (sortOrder === 0)?false:true));
        }
        this.byId("tblEmployeeMasterView01").getBinding("items").sort(aSorters);
    },

    onResetPress: function () {
        this.byId("inpEmpId").setValue("");
        this.byId("inpEmpName").setValue("");
        this.byId("_IDGenComboBox").setSelectedKey("");
        this.byId("_IDGenRadioButtonGroup").setSelectedIndex(-1);
            this.byId("_IDGenComboBoxgrp1").setSelectedKey("");
        this.byId("_IDGenRadioButtonGroupgrp1").setSelectedIndex(-1);
        this.byId("tblEmployeeMasterView01").getBinding("items").filter([]);
         this.byId("tblEmployeeMasterView01").getBinding("items").sort([]);
    },

    onCreateEmployee: function () {
        this.getOwnerComponent().getRouter().navTo("RouteView3");
    },
    
    onEditEmployee: function () {
        var selRow = this.byId("tblEmployeeMasterView01").getSelectedItem();
        if (selRow == null){
            MessageBox.error("Please select a row to edit");
            return;
        }
        var empId = selRow.getBindingContext("oModel").getObject().Empid;
        this.getOwnerComponent().getRouter().navTo("RouteView4",{
            empId:empId
        });
    },

    onDeleteEmployee: function () {
        var selRow = this.byId("tblEmployeeMasterView01").getSelectedItem();
        if (selRow == null){
            MessageBox.error("Please select a row to delete");
            return;
        }
        var empId = selRow.getBindingContext("oModel").getObject().Empid;

         var oModel = this.getOwnerComponent().getModel("oModel");
            oModel.remove("/EmployeeSet('" + empId + "')", {
                success: function (req,res) {
                  
                        MessageBox.success("Employee deleted successfully");
                    
                },
                error: function (oError) {
                    MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                }
            });


    }





       


    });
});