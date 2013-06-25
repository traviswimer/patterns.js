describe("Patterns.js", function() {

	it("patterns object exists", function() {
		expect(typeof window.patterns).toEqual('object');
	});


	////////////////////////////////////////////////////////////////////////////////////////////
	describe("Factory", function(){
		it("method exists", function() {
			expect(typeof window.patterns.factory).toEqual('function');
		});

		var factoryBuilder = window.patterns.factory(function(){
			this.aDefaultMethod = function(){};
			this.toBeOverwritten = "a";
		});
		it("returns an object", function() {
			expect(typeof factoryBuilder).toEqual('object');
		});

		describe("class instance", function(){

			it("contains build method", function() {
				expect(typeof factoryBuilder.build).toEqual('function');
			});

			var testFactory = factoryBuilder.build(function(){
				this.anExtendingMethod = function(){};
				this.toBeOverwritten = "b";
			});
			describe("built factory", function(){

				it("contains create method", function() {
					expect(typeof testFactory.create).toEqual('function');
				});

				var testObject = testFactory.create();
				describe("object created", function(){

					it("contains default methods", function() {
						expect(typeof testObject.aDefaultMethod).toEqual('function');
					});

					it("contains extending methods", function() {
						expect(typeof testObject.anExtendingMethod).toEqual('function');
					});

					it("extending object overwrites default properties", function() {
						expect(testObject.toBeOverwritten).toEqual('b');
					});

				});
			});

		});

	});
	////////////////////////////////////////////////////////////////////////////////////////////



	////////////////////////////////////////////////////////////////////////////////////////////
	describe("Composite", function(){
		it("method exists", function() {
			expect(typeof window.patterns.composite).toEqual('function');
		});


		var leafResponseHolder = [];

		var compositeTop = window.patterns.composite(function(leafVariable){
			this.leafMethod = function(){leafResponseHolder.push(leafVariable);};
		});
		it("returns an object", function() {
			expect(typeof compositeTop).toEqual('object');
		});

		describe("class instance", function(){

			it("contains addComposite method", function() {
				expect(typeof compositeTop.addComposite).toEqual('function');
			});

			it("contains addLeaf method", function() {
				expect(typeof compositeTop.addLeaf).toEqual('function');
			});

			var leaf = compositeTop.addLeaf('a');
			leaf.leafMethod();
			describe("Leaf", function(){
				it("addLeaf method returns an object", function() {
					expect(typeof leaf).toEqual('object');
				});

				it("leaf object's methods exist", function() {
					expect(typeof leaf.leafMethod).toEqual('function');
				});

				it("constructor accepts arguments", function() {
					expect(leafResponseHolder[0]).toEqual("a");
				});
			});

			var composite = compositeTop.addComposite();
			var lowerLeaf = composite.addLeaf('b');
			describe("Composite", function(){
				it("addComposite method returns an object", function() {
					expect(typeof composite).toEqual('object');
				});

				it("leaf methods traverse the hierarchy", function() {
					leafResponseHolder = [];
					compositeTop.leafMethod();
					expect(leafResponseHolder[0]).toEqual('a');
					expect(leafResponseHolder[1]).toEqual('b');
				});
			});


		});

	});
	////////////////////////////////////////////////////////////////////////////////////////////


});


