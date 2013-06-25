describe("Patterns.js", function() {

	it("patterns object exists", function() {
		expect(typeof window.patterns).toEqual('object');
	});

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



});


