var myRevealingModule = (function () {

    var privateVar = "Ben Cherry",
        publicVar = "Hey there!";

    function privateFunction() {
        return  "Name:" + privateVar ;
    }

    function publicSetName( strName ) {
        privateVar = strName;
    }

    function publicGetName() {
        privateFunction;
    }


    // Reveal public pointers to
    // private functions and properties

    return {
        setName: publicSetName,
        greeting: publicVar,
        getName: publicGetName
    };

})();

myRevealingModule.setName( "Paul Kinlan" );
console.log(myRevealingModule.getName)

// function library( module ) {
//
//     $( function() {
//         if ( module.init ) {
//             module.init();
//         }
//     });
//
//     return module;
// }
//
// var myLibrary = library(function () {
//
//     return {
//         init: function () {
//             // module implementation
//         }
//     };
// }());

// var basketModule = (function () {
//
//     // privates
//
//     var basket = [];
//
//     function doSomethingPrivate() {
//         //...
//     }
//
//     function doSomethingElsePrivate() {
//         //...
//     }
//
//     // Return an object exposed to the public
//     return {
//
//         // Add items to our basket
//         addItem: function( values ) {
//             basket.push(values);
//         },
//
//         // Get the count of items in the basket
//         getItemCount: function () {
//             return basket.length;
//         },
//
//         // Public alias to a private function
//         doSomething: doSomethingPrivate,
//
//         // Get the total value of items in the basket
//         getTotal: function () {
//
//             var q = this.getItemCount(),
//                 p = 0;
//
//             while (q--) {
//                 p += basket[q].price;
//             }
//
//             return p;
//         }
//     };
// })();

// var myNamespace = (function () {
//
//     var myPrivateVar, myPrivateMethod;
//
//     // A private counter variable
//     myPrivateVar = 0;
//
//     // A private function which logs any arguments
//     myPrivateMethod = function( foo ) {
//         console.log( foo );
//     };
//
//     return {
//
//         // A public variable
//         myPublicVar: "foo",
//
//         // A public function utilizing privates
//         myPublicFunction: function( bar ) {
//
//             // Increment our private counter
//             myPrivateVar++;
//
//             // Call our private method using bar
//             myPrivateMethod( bar );
//
//         }
//     };
//
// })();


// var testModule = (function () {
//
//     var counter = 0;
//
//     return {
//
//
//         incrementCounter: function () {
//            return counter++;
//         },
//
//         resetCounter: function () {
//             console.log( "counter value prior to reset: " + counter );
//             counter = 0;
//         }
//     };
//
// });
//
// // Usage:
//
// // Increment our counter
// console.log(testModule().incrementCounter())

//testModule.incrementCounter();

// Check the counter value and reset
// Outputs: counter value prior to reset: 1
//testModule.resetCounter();

//
// var testModule = (function () {
//
//     var counter = 0;
//
//     return {
//
//         incrementCounter: function () {
//             return counter++;
//         },
//
//         resetCounter: function () {
//             console.log( "counter value prior to reset: " + counter );
//             counter = 0;
//         }
//     };
//
// })();
//
// // Usage:
//
// // Increment our counter
// testModule.incrementCounter();
// console.log(testModule.incrementCounter());
// console.log(testModule.incrementCounter());
//
// // Check the counter value and reset
// Outputs: counter value prior to reset: 1
// testModule.resetCounter();
//
//
//
// function Car( model, year, miles ) {
//
//     this.model = model;
//     this.year = year;
//     this.miles = miles;
//     //
//     // this.toString = function () {
//     //     return this.model + " has done " + this.miles + " miles";
//     // };
// }
//
// // Usage:
// Car.prototype.toString = function () {
//          return this.model + " has done " + this.miles + " miles";
//      }


// We can create new instances of the car
// var civic = new Car( "Honda Civic", 2009, 20000 );
// var mondeo = new Car( "Ford Mondeo", 2010, 5000 );
//
// // and then open our browser console to view the
// // output of the toString() method being called on
// // these objects
// //console.log( civic.toString );
// console.log( mondeo.toString() );
// console.log(civic.toString());
