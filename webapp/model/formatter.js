sap.ui.define([
   
], () => {
    "use strict";

    return  {
        formatStatus:function (Status) {
            if(Status === "PERMANENT"){
                return "Success";
            } else if(Status === "CONTRACT"){
                return "Error";
            }
        },
        formatRating: function (Rating) {
            var ratingDesc = "";
            if(Rating === 5){
                ratingDesc = "(Outstanding)";
              } else if(Rating === 4){
                ratingDesc = "(Best)";
              } else if(Rating === 3){
                ratingDesc = "(Can be better)";
              }

              return Rating + ratingDesc;
        }
         }
});