//
// 338
// down vote
// Very simply said, new X is Object.create(X.prototype) with additionally running the constructor function. (And giving the constructor the chance to return the actual object that should be the result of the expression instead of this.)
//
// That’s it. :)
//
// The rest of the answers are just confusing, because apparently nobody else reads the definition of new either. ;)

function Sclass() {
    this.cll='cll'
};

Sclass.prototype.clname='sclass';

var tt= new Sclass();
//console.log(tt.clname);

///

function Gclass() {};

//subclassing - via copyng trough Object.create// Object.create(Classobj.prototype) or  new Classobj()
Gclass.prototype=Object.create(Sclass.prototype);

Gclass.prototype.newp='newpp'


var gc = new Gclass();
console.log(gc.clname);
console.log(gc.newp);




// with object
// var newMainSh= {
//     getsh:'shhh'
// }
//
// newMainSh.gotsh = 'gotsh'
//
// function Newconstr (){};
//
// Newconstr.prototype=Object.create(newMainSh)
//
// Newconstr.prototype.gitsh='gitch'
//
// var newf = Object.create(Newconstr.prototype)
//
// console.log(newf.gitsh)
// console.log(newf.getsh)
//
// console.log(newf.gotsh)

//console.log(newMainSh.gitsh)



//console.log(gitch)
//
//
// var to = new Gclass();
//
// console.log(to.clname)

// function obo1 () {
// //constructor
//     if (this.kio){
//         this.kio = 'kio'
//     }
//     this.weba='weeba'
//     //console.log(this.kio)
// }
// this.kio='m'
// obo1.call(this)
// //by calling  obo1 there, kio was pulled to 'this' [reality]
// console.log(this.kio)
// console.log(this.weba)
//
// //calling  to drive properties from superclass
// //superclass
// function Product(name, price) {
//     this.name = name;
//     this.price = price;
//     this.intnl = 'intrnl'
// }
// //derived class
// function Food(namo, prico) {
//     Product.call(this, namo, prico);
//     console.log(this.intnl)
//     this.category = 'food';
// }
//
//
//
// console.log(new Food('cheese', 5).name);
// expected output: "cheese"

// function Glass () {
//
// }
// Glass.prototype=Sclass;
//
// //console.log(glass.clname)
// Glass.prototype.tato='y'
//
// let glas= new Glass();
//
// console.log(glas.clname)

// function Car(){};
// Car.prototype.drive= 'drive';
// Car.prototype.breakDown = 'break';
//
// function Truck(){};
// var abstractVehicleFactory = (function () {
//     // Storage for our vehicle types
//     var types = {};
//     return {
//         getVehicle: function ( type, customizations ) {
//             //console.log(types)
//             var Vehicle = types[type];
//             return (Vehicle ? new Vehicle(customizations) : null);
//         },
//         registerVehicle: function ( type, Vehicle ) {
//             var proto = Vehicle.prototype;
//             //console.log(proto.drive)
//             // only register classes that fulfill the vehicle contract
//             if ( proto.drive && proto.breakDown ) {
//                 types[type] = Vehicle;
//                 //console.log('registered',types)
//             }
//             return abstractVehicleFactory;
//         }
//     };
// })();
//
// // Usage:
//
// abstractVehicleFactory.registerVehicle( "carr", Car );
// console.log(abstractVehicleFactory)
//var abstruck = abstractVehicleFactory.registerVehicle( "truck", Truck );

//console.log(abstractVehicleFactory.getVehicle('carr'))

//console.log(abstruck)

// Instantiate a new car based on the abstract vehicle type
// var car = abstractVehicleFactory.getVehicle( "car", {
//     color: "lime green",
//     state: "like new" } );
//
// // Instantiate a new truck in a similar manner
// var truck = abstractVehicleFactory.getVehicle( "truck", {
//     wheelSize: "medium",
//     color: "neon yellow" } );

// const jQuery= require('jquery')
//
// var pubsub = {};
//
// (function(myObject) {
//
//     // Storage for topics that can be broadcast
//     // or listened to
//     var topics = {};
//
//     // A topic identifier
//     var subUid = -1;
//
//     // Publish or broadcast events of interest
//     // with a specific topic name and arguments
//     // such as the data to pass along
//     myObject.publish = function( topic, args ) {
//
//         if ( !topics[topic] ) {
//             return false;
//         }
//
//         var subscribers = topics[topic],
//             len = subscribers ? subscribers.length : 0;
//
//         while (len--) {
//             subscribers[len].func( topic, args );
//         }
//
//         return this;
//     };
//
//     // Subscribe to events of interest
//     // with a specific topic name and a
//     // callback function, to be executed
//     // when the topic/event is observed
//     myObject.subscribe = function( topic, func ) {
//
//         if (!topics[topic]) {
//             topics[topic] = [];
//         }
//
//         var token = ( ++subUid ).toString();
//         topics[topic].push({
//             token: token,
//             func: func
//         });
//         return token;
//     };
//
//     // Unsubscribe from a specific
//     // topic, based on a tokenized reference
//     // to the subscription
//     myObject.unsubscribe = function( token ) {
//         for ( var m in topics ) {
//             if ( topics[m] ) {
//                 for ( var i = 0, j = topics[m].length; i < j; i++ ) {
//                     if ( topics[m][i].token === token ) {
//                         topics[m].splice( i, 1 );
//                         return token;
//                     }
//                 }
//             }
//         }
//         return this;
//     };
// }( pubsub ));
//
//
//
//
// let extend =function (obj, expantion) {
//     for(ex of Object.keys(expantion)){
//        //console.log(ex)
//         obj[ex]=expantion[ex]
//     }
//
// };
//
// extend(jQuery,pubsub);
//
//
// (function($){
//     $.publish( "/new/user", { name: 'rf' } );
//     $("#add").on("click", function( e ) {
//         e.preventDefault()
//     });
// }(jQuery));
//

// function ObserverList() {
//     this.observerList = [];
// }
//
// ObserverList.prototype.add = function (obj) {
//     return this.observerList.push(obj);
// };
//
// ObserverList.prototype.count = function () {
//     return this.observerList.length;
// };
//
// ObserverList.prototype.get = function (index) {
//     if (index > -1 && index < this.observerList.length) {
//         return this.observerList[index];
//     }
// };
//
// ObserverList.prototype.indexOf = function (obj, startIndex) {
//     var i = startIndex;
//
//     while (i < this.observerList.length) {
//         if (this.observerList[i] === obj) {
//             return i;
//         }
//         i++;
//     }
//
//     return -1;
// };
//
// ObserverList.prototype.removeAt = function (index) {
//     this.observerList.splice(index, 1);
// };
//
//

// class Observer {
//     constructor(params) {
//         this.name = params.name;
//         this.reg = params.reg || 0;
//         this.state = 'init';
//     }
// }
// Observer.prototype.update = function (state) {
//     this.state = state
//     console.log(this.name, 'was updated to ', this.state)
//
// }
//
// class Subject{
//     constructor(sname){
//         this.sname = sname
//         this.registry = {}
//     }
//     factory (params) {
//         let obs = new Observer(params)
//         this.registry[obs.name]=obs
//         return obs
//     }
//     update(state){
//        Object.keys(this.registry).forEach(ob =>
//        this.registry[ob].update(state))
//
//        return this.registry
//     }
//     unreg(obs){
//         delete this.registry[obs.name]
//         console.log(this.registry)
//     }
//     reg(obs){
//         this.registry[obs.name] = obs;
//         console.log(this.registry)
//     }
// }
//
// // creating instanc subject
// let sub1 = new Subject("myname");
//
// //creating observers via subject
// let ob1= sub1.factory({reg:1, name:"kaka1"})
// let ob2= sub1.factory({reg:2, name:"kaka2"})

//its possible to create free observers and register them afterwards

//console.log(ob1)
//console.log(sub1.update('ready'))
//console.log(sub1.update('opened'))


//sub1.unreg(ob1)

// var SingletonTester = (function () {
//     // options: an object containing configuration options for the singleton
//     // e.g var options = { name: "test", pointX: 5};
//     function Singleton( options ) {
//         // set options to the options supplied
//         // or an empty object if none are provided
//         options = options || {};
//         // set some properties for our singleton
//         this.name = options.name || "SingletonTester";
//         this.pointX = options.pointX || 6;
//         this.pointY = options.pointY || 10;
//     }
//     // our instance holder
//     var instance;
//     // an emulation of static variables and methods
//     return {
//         name: "SingletonTester",
//         // Method for getting an instance. It returns
//         // a singleton instance of a singleton object
//         getInstance: function( options ) {
//             if( instance === undefined ) {
//                 instance = new Singleton( options );
//             }
//             return instance;
//         }
//     };
//
// })();
//
// var singletonTest = SingletonTester.getInstance({
//     pointX: 5,
//     name: "kaka"
// });
//
// // Log the output of pointX just to verify it is correct
// // Outputs: 5
// console.log( singletonTest.pointX );
// console.log( singletonTest.name );
//
// var singletonTest2 = SingletonTester.getInstance({
//     pointX: 7,
//     name: "kako"
// });
//
// console.log( singletonTest2.pointX );
// console.log( singletonTest2.name );

// var mySingleton = (function () {
//    // Instance stores a reference to the Singleton
//     var instance;
//     function init1() {
//         // Singleton
//         // Private methods and variables
//         function privateMethod(){
//             console.log( "I am private" );
//         }
//         var privateVariable = "Im also private";
//         var privateRandomNumber = Math.random();
//
//         return {
//             // Public methods and variables
//             publicMethod: function () {
//                 console.log( "The public can see me! class1" );
//             },
//             publicProperty: "I am also public",
//             getRandomNumber: function() {
//                 return privateRandomNumber;
//             }
//         };
//
//     };
//     return {
//         // Get the Singleton instance if one exists
//         // or create one if it doesn't
//         getInstance: function () {
//
//             if ( !instance ) {
//                 instance = init();
//             }
//
//             return instance;
//         }
//
//     };
//
// })();
//
//
//
//
//
// var singleA = mySingleton.getInstance();
// var singleB = mySingleton.getInstance();
// console.log( singleA.getRandomNumber() === singleB.getRandomNumber() ); // true
//
// var badSingleA = myBadSingleton.getInstance();
// var badSingleB = myBadSingleton.getInstance();
// console.log( badSingleA.getRandomNumber() !== badSingleB.getRandomNumber() ); // true

// Note: as we are working with random numbers, there is a
// mathematical possibility both numbers will be the same,
// however unlikely. The above example should otherwise still
// be valid.


// var myRevealingModule = (function () {
//
//     var privateVar = "Ben Cherry",
//         publicVar = "Hey there!";
//
//     function privateFunction() {
//         return  "Name:" + privateVar ;
//     }
//
//     function publicSetName( strName ) {
//         privateVar = strName;
//     }
//
//     function publicGetName() {
//         privateFunction;
//     }


    // Reveal public pointers to
    // private functions and properties
//
//     return {
//         setName: publicSetName,
//         greeting: publicVar,
//         getName: publicGetName
//     };
//
// })();
//
// myRevealingModule.setName( "Paul Kinlan" );
// console.log(myRevealingModule.getName)

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
//
//
// //We can create new instances of the car
// var civic = new Car( "Honda Civic", 2009, 20000 );
// var mondeo = new Car( "Ford Mondeo", 2010, 5000 );

// and then open our browser console to view the
// output of the toString() method being called on
// these objects
//console.log( civic.toString );
// console.log( mondeo.toString() );
// console.log(civic.toString());
// console.log(civic.model);
