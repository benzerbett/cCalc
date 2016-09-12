(function(){
  'use strict';

  var Calculator = {

    result: '',
    calculation: '',
    buttonText: '',
    calcValues: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '/', '*', '-', '+', '%'],

    init: function(){
      var that = this;
      that.calcBrains();
    },

    displayValue: function(v){
      return $('.display').val(v);
    },

    calcBrains: function(){
      var that = this;

      $('button').on('click', function(){

        that.buttonText = $(this).attr('value');

        for(var i = 0; i < that.calcValues.length; i++){

          // Check if selected button is a calculation value
          if(that.buttonText === that.calcValues[i]){

            // Create the calculation string and display it
            that.calculation += that.buttonText;
            that.displayValue(that.calculation);

          } else if(that.buttonText === 'AC'){ // All Clear

            // Reset everything, display '0', and stop the loop
            that.calculation = '';
            that.displayValue('0');
            return;

          } else if(that.buttonText === 'CE'){ // Cancel Entry

            if(that.calculation.length < 2){
              // Display '0' if CE is selected without any entries to cancel
              that.displayValue('0');
            } else {
              // Remove the last entry and display updated calculation
              that.calculation = that.calculation.slice(0, -1);
              that.displayValue(that.calculation);
            }

            // Stop the loop
            return;

          } else if(that.buttonText === '='){

            // Sanitize output by stripping anything other than calcValues
            that.calculation = that.calculation.replace(/[^-\d/*+.]/g, '');

            // Process the calculation string
            // Eval was built for conditions like this so suppressing JSHint warning
            // We're santizing the output too
            that.result = eval(that.calculation); // jshint ignore:line

            // Display the final result and stop the loop
            that.displayValue(that.result);
            return;

          }

        }

      });

    }

  };

  $(document).ready(function(){
    Calculator.init();
  });

}());
