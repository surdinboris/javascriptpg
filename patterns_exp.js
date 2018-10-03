//parentClassOrObject => interface
Function.prototype.implementsFor = function( parentClassOrObject ){
    //in case of
    if ( parentClassOrObject.constructor === Function )
    {
      //  console.log('is this.prototype.constructor this?',this.prototype.constructor === this)

        // Normal Inheritance
        // building new this that will
        // be 'ConstructorFunction.implementsFor' constructor.
        //parent prototype object will be developed via new method
        // and assigned as prototype to this
        //
        //1.develop Parent function as prototype object (argument)
     //  console.log('start',this.prototype)
        //console.log(this.prototype)
        this.prototype = Object.assign(this.prototype,new parentClassOrObject());
       // this.prototype = new parentClassOrObject();
      //  console.log(this.prototype )
       // console.log('is this.prototype.constructor this?',this.prototype.constructor === this)
        //2.returning original construcror property for replaced prototype
        // this -- constructor of function on wich method was called
       this.prototype.constructor = this;
       // console.log('is this.prototype.constructor this?',this.prototype.constructor === this)
       //so only a prototype Object itself will be overrided

        //assigning some virtual property 'parent' as parentClassOrObject.prototype (prototype Object)
       this.prototype.parent = parentClassOrObject.prototype;
        //console.log('finish',this.prototype.constructor )
    }
    else
    {
        // Pure Virtual Inheritance
        this.prototype = parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject;
    }
    return this;
};

//in other words, defined above code changes prototype object with defined in argument
// and assigning .paret prperty to object defined in argument


var CoffeeOrder = {

    // Interfaces
    serveCoffee:function(context){console.log('pshhh',this.region)},
    getFlavor:function(){console.log('mmmmmmm',this.region || '')}

};


function CoffeeFlavor( newFlavor ){
    var flavor = newFlavor;
    // If an interface has been defined for a feature
    // implement the feature
    if( typeof this.getFlavor === "function" ){
        this.getFlavor = function() {
            return flavor;
        };
    }
    if( typeof this.serveCoffee === "function" ){
        this.serveCoffee = function( context ) {
            console.log("Serving Coffee flavor "
                + flavor
                + " to table number "
                + context.getTable());
        };
    }
}

function City (region) {
    this.region = region;
    if(this.getFlavor){
        console.log('flavor!')
    }

}

City.implementsFor(CoffeeOrder);

let taster= new City('Ohio')
//
// taster.serveCoffee()
//
// City.prototype.getFlavor()

//console.log(City.prototype)
//console.log(typeof  Bayit.constructor)
// let bibi = {};
//
//
// let ba= new Bayit(7);
// Bayit.prototype.kaka='gh'
// console.log(Bayit.prototype.constructor.toString());
// console.log(ba)
// let bo= new Bayit(8);
// console.log(bo.__proto__.constructor)
//ba.constructor = this;
// console.log(ba.constructor.toString());
// console.log(Bayit.prototype.constructor.toString());

//console.log(typeof Bayit )
// console.log(
// //'Home will be this' argument = parent
//
// Bayit.implementsFor(Home);
//
// let bait = new Bayit('litovsky');
//
// console.log(bait.addr);

///
//dumb function passing

// let hoha = Object.create(null)
// hoha.kk=90
// hoha.constructor = CoffeeFlavor.constructor === Function
//
// console.log('const',hoha.constructor)
// let thirdPartyConstr={ugauga:'005'}
// //
// function Repl(ty,ru) {
//     console.log('Repl constructor init')
//     this.bla = ty + ru
//     if (this.bla > 68) {
//         let fun =function (blo) {
//             //ty, ru - predefined via main Repl class,
//             // blo will be passed at new instance step (using outcome of object created via Repl)
//             console.log('Replik',ty, ru, blo)
//             this.tyi=ty - ru
//
//         }
//
//         return fun
//         }
//     }
//
// let Replik = new Repl(34,36)
// let rep = new Replik(666)
//
// console.log('r',rep.__proto__);

//
// console.log('Repl.prototype.constructor',Repl.prototype.constructor)
//
// let repl=new Repl(78,54)
// console.log('repl.__proto__',repl.__proto__)
// console.log(repl.__proto__.constructor)
// console.log(Repl.prototype === repl.__proto__)

//
// Function.prototype.zapupents = function () {
//     //modifying function - return modified chainable function
//     //console.log('---', this)
//     //this.prototype.constructor=this
//     this.prototype = Hoha
//     console.log('constructor',this.prototype.constructor)
//     return this
//
// }
//



//Zyama.constructor=Repl
// console.log(Zyama.prototype.constructor)
// Zyama.prototype.constructor = Repl.prototype.constructor
// console.log(Zyama.prototype.constructor);

//  Code copyright Dustin Diaz and Ross Harmes, Pro JavaScript Design Patterns.
//  **/
//
// // Constructor.
// var Interface = function (name, methods) {
//     if (arguments.length != 2) {
//         throw new Error("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
//     }
//     this.name = name;
//     this.methods = [];
//     for (var i = 0, len = methods.length; i < len; i++) {
//         if (typeof methods[i] !== 'string') {
//             throw new Error("Interface constructor expects method names to be " + "passed in as a string.");
//         }
//         this.methods.push(methods[i]);
//     }
// };
//
//
// // Static class method.
// Interface.ensureImplements = function (object) {
//     if (arguments.length < 2) {
//         throw new Error("Function Interface.ensureImplements called with " + arguments.length + "arguments, but expected at least 2.");
//     }
//     for (var i = 1, len = arguments.length; i < len; i++) {
//         var interface = arguments[i];
//         //console.log('interface',interface.constructor)
//         if (interface.constructor !== Interface) {
//             throw new Error("Function Interface.ensureImplements expects arguments" + "two and above to be instances of Interface.");
//         }
//         for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
//
//             var method = interface.methods[j];
//             //console.log('method',object[method]);
//             if (!object[method] || typeof object[method] !== 'function') {
//                 throw new Error("Function Interface.ensureImplements: object " + "does not implement the " + interface.name + " interface. Method " + method + " was not found.");
//             }
//         }
//     }
// };
// var Macbook = new Interface( "Macbook",
//     ["addEngraving",
//         "addParallels",
//         "add4GBRam",
//         "add8GBRam",
//         "addCase"]);
//
// // A Macbook Pro might thus be represented as follows:
// var MacbookPro = function(){
//     // implements Macbook
// };
//
// MacbookPro.prototype = {
//     addEngraving: function(){
//     },
//     addParallels: function(){
//     },
//     add4GBRam: function(){
//     },
//     add8GBRam:function(){
//     },
//     addCase: function(){
//         return "beatiful mac "
//     },
//     getPrice: function(){
//         // Base price
//         return 900.00;
//     }
// };
//
// // Macbook decorator abstract decorator class
//
// var MacbookDecorator = function( macbook ){
//
//
//     Interface.ensureImplements( macbook, Macbook );
//     this.macbook = macbook;
//
// };
//
// MacbookDecorator.prototype = {
//     addEngraving: function(){
//         return this.macbook.addEngraving();
//     },
//     addParallels: function(){
//         return this.macbook.addParallels();
//     },
//     add4GBRam: function(){
//         return this.macbook.add4GBRam();
//     },
//     add8GBRam:function(){
//         return this.macbook.add8GBRam();
//     },
//     addCase: function(){
//         return this.macbook.addCase();
//     },
//     getPrice: function(){
//         return this.macbook.getPrice();
//     }
// };
//
// function extend( a, b ){
//     for( var key in b )
//         if( b.hasOwnProperty(key) )
//             a[key] = b[key];
//     return a;
// }
//
//
//
//
// var CaseDecorator = function( macbook ){
//     this.macbook = macbook;
// };
//
// // Let's now extend (decorate) the CaseDecorator
// // with a MacbookDecorator
// extend( CaseDecorator, MacbookDecorator );
//
// CaseDecorator.prototype.addCase = function(){
//     return this.macbook.addCase() + "Adding case to macbook";
// };
//
// CaseDecorator.prototype.getPrice = function(){
//     return this.macbook.getPrice() + 45.00;
// };
//
// // Instantiation of the macbook
// var myMacbookPro = new MacbookPro();
//
// // Outputs: 900.00
// console.log( myMacbookPro.getPrice() );
//
// // Decorate the macbook
//
// var decoratedMacbookPro = new CaseDecorator( myMacbookPro );
// var decoratedMacbookPro2 = new CaseDecorator( decoratedMacbookPro );
// // This will return 945.00
//
// console.log(decoratedMacbookPro.addCase());
//
// console.log( decoratedMacbookPro2.getPrice() );

// var Drawable = new Interface("Drawable", ["onDraw","onDraw2"]);
//
//
// //dumb class  that should implement onDraw/2
// var Surface = function() {
//     //this.implements = ["Drawable"];
//
//     this.onDraw = function() {
//         console.log("Surface Drawing");
//     };
//     this.onDraw2 = function() {
//         console.log("Surface Drawing");
//     };
// };
//
//
//
// var myDrawableSurface = new Surface();
// console.log(Drawable)
// // Returns true
// Interface.ensureImplements(myDrawableSurface, Drawable);

// Returns false (Error thrown)
//Interface.ensureImplements(myDrawableSurface, Array);


// // The constructor to decorate
// function MacBook() {
//
//     this.cost = function () { return 997; };
//     this.screenSize = function () { return 11.6; };
//
// }
//
// // Decorator 1
// function memory( macbook ) {
//
//     var v = macbook.cost();
//     macbook.cost = function() {
//         return v + 75;
//     };
//
// }
//
// // Decorator 2
// function engraving( macbook ){
//
//     var v = macbook.cost();
//     macbook.cost = function(){
//         return v + 200;
//     };
//
// }
//
// // Decorator 3
// function insurance( macbook ){
//
//     var v = macbook.cost();
//     macbook.cost = function(){
//         return v + 250;
//     };
//
// }
//
// var mb = new MacBook();
// memory( mb );
//
// console.log( mb.cost.toString())
// engraving( mb );
//
// console.log( mb.cost.toString())
// insurance( mb );
//
// // Outputs: 1522
// console.log( mb.cost() );
//
// // Outputs: 11.6
// console.log( mb.screenSize() );

//
// var myMixins = {
//
//     moveUp: function(){
//         console.log( this.per,"move up" );
//     },
//
//     moveDown: function(){
//         console.log( this.per,"move down" );
//     },
//
//     stop: function(){
//         console.log( this.per,"stop! in the name of love!" );
//     }
//
// };
//
// // A skeleton carAnimator constructor
// function CarAnimator(superclass,per){
//     this.per=per;
//     for(let prop of Object.keys(superclass)){
//         this[prop]=superclass[prop]
//     }
//     this.moveLeft = function(){
//         console.log( "move left" );
//     };
// }
//
// let anim= new CarAnimator(myMixins,'katz')
// anim.moveLeft()
// anim.stop()
//
// // A skeleton personAnimator constructor
// function PersonAnimator(per){
//     this.per=per;
//     this.moveRandomly = function(){ /*..*/ };
// }
//
// PersonAnimator.prototype.go=function(){
//     console.log( "move go" );
// };
//
// function extend(what,extention){
//    for(let prop of Object.keys(extention)){
//       // console.log(prop, 'added')
//        what.prototype[prop]=extention[prop]
//    }
// }
//
// extend(PersonAnimator,myMixins);
// //console.log(PersonAnimator)
//
// let pa = new PersonAnimator('jaques');
//
// pa.go();
// pa.moveUp();
// Very simply said, new X is Object.create(X.prototype)
// with additionally running the constructor function.
// (And giving the constructor the chance to return the actual
// object that should be the result of the expression instead of this.)
//
// That’s it. :)
//
// The rest of the answers are just confusing, because apparently nobody else reads the definition of new either. ;)
//
// function Gclass(y){
//     this.cll=y.concat('7')
// }
//
// function Sclass(y) {
//     return new Gclass(y)
//
// };
//
// Sclass.prototype.clname='sclass';
//-
// var tt= new Sclass('uuu');
// console.log(tt.cll);

///
//
// function Gclass() {};
//
// //subclassing - via copyng trough Object.create// Object.create(Classobj.prototype) or  new Classobj()
// Gclass.prototype=Object.create(Sclass.prototype);
//
// Gclass.prototype.newp='newpp'
//
//
// var gc = new Gclass();
// console.log(gc.clname);
// console.log(gc.newp);
//



// // with object
// var newMainSh= {
//     getsh:'shhh'
// }
//
// newMainSh.gotsh = 'gotsh';
//
// //function Newconstr (){};
//
// //Newconstr.prototype=Object.create(newMainSh);
//
// //newMainSh.prototype.gitsh='gitch';
//
// var newf = Object.create(newMainSh);
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
