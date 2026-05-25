sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("com.demo.app.project1.controller.View3", {
        onInit() {
        },
       
        onpiche(){
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },

        onSave: function () {
            var empId = this.byId("empId").getValue();
            var name = this.byId("empName").getValue();
            var desig = this.byId("empDesignation").getValue();
            var skill = this.byId("empSkill").getValue();
            var email = this.byId("empEmail").getValue();
            var salary = this.byId("empSalary").getValue();
            var status = this.byId("empStatus").getValue();
            var rating = this.byId("empRating").getValue();

            var payload = {
                Empid: empId,
                Name: name,
                Desig: desig,
                Skill: skill,
                Email: email,
                Salary: salary,
                Status: status,
                Rating: parseInt(rating)
            };
            // this will trigger a post call to backend Employee_create_entity
            var oModel = this.getOwnerComponent().getModel("oModel");
            oModel.create("/EmployeeSet", payload, {
                success: function (req,res) {
                    if(res.statusCode === "201"){
                        MessageBox.success("Employee created successfully");
                    }
                },
                error: function (oError) {
                    MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                }
            });



        }
    });
});