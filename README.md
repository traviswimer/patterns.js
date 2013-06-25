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
