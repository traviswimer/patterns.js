Patterns.JS
===========

A library to simplify the use of design patterns in JavaScript

# API Documentation #



## factory( defaultClass ) ##

### Parameters ###
*	**defaultClass** - A function that serves as the base for all classes instantiated by the factory

### Methods ###
*	**build( extendingClass )** - builds a new factory
	*	**Parameters**
		*	extendingClass - a function that will inherit from defaultClass when created by the factory
	*	**Methods**
		*	create() - returns an extendingClass object that inherits from defaultClass

### Example ###

```js
var animalBuilder = patterns.factory(function(){
	this.sayHello = function(){
		console.log("Hello, I am a " + this.type);
	}
	this.type = "mammal";
});

var cat = function(){
	this.type = "cat";
}
var catFactory = animalBuilder.build(cat);
catFactory.create().sayHello(); // "Hello, I am a cat"

var dog = function(){
	this.type = "dog";
}
var dogFactory = animalBuilder.build(dog);
dogFactory.create().sayHello(); // "Hello, I am a dog"

animalBuilder.build().create().sayHello(); // "Hello, I am a mammal"
```




## composite( leafClass ) ##

### Parameters ###
*	**leafClass** - A function all leaf objects inherit from

### Methods ###
*	**addComposite()** - create a new composite as a child of the current composite
*	**addLeaf()** - creates an object inheriting from leafClass as a child of the current composite
	*	*arguments passed to this method will be passed to the leafClass constructor*

### Example ###

```js
var animalLeafClass = function(type){
	this.sayHello = function(){
		console.log("Hello, I am a " + type);
	}
}

var animalComposite = patterns.composite(animalLeafClass);
animalComposite.addLeaf("mammal");

var catComposite = animalComposite.addComposite();
var dogComposite = animalComposite.addComposite();

catComposite.addLeaf("Cat");
dogComposite.addLeaf("Dog");
catComposite.addLeaf("Kitten");
dogComposite.addLeaf("Puppy");

animalComposite.sayHello();
/*	Calling sayHello() a composite will call 
	sayHello() on each leaf beneath it as well

	This Prints:
	Hello, I am a mammal
	Hello, I am a Cat
	Hello, I am a Kitten
	Hello, I am a Dog
	Hello, I am a Puppy
*/
```
