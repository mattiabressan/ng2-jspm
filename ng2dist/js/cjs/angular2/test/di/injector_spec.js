var parse5Adapter = require('angular2/src/dom/parse5_adapter');
parse5Adapter.Parse5DomAdapter.makeCurrent();
"use strict";
Object.defineProperties(module.exports, {
  main: {get: function() {
      return main;
    }},
  __esModule: {value: true}
});
var __moduleName = "angular2/test/di/injector_spec";
var $__rtts_95_assert_47_rtts_95_assert__,
    $__angular2_47_test_95_lib__,
    $__angular2_47_di__;
var assert = ($__rtts_95_assert_47_rtts_95_assert__ = require("rtts_assert/rtts_assert"), $__rtts_95_assert_47_rtts_95_assert__ && $__rtts_95_assert_47_rtts_95_assert__.__esModule && $__rtts_95_assert_47_rtts_95_assert__ || {default: $__rtts_95_assert_47_rtts_95_assert__}).assert;
var $__1 = ($__angular2_47_test_95_lib__ = require("angular2/test_lib"), $__angular2_47_test_95_lib__ && $__angular2_47_test_95_lib__.__esModule && $__angular2_47_test_95_lib__ || {default: $__angular2_47_test_95_lib__}),
    describe = $__1.describe,
    ddescribe = $__1.ddescribe,
    it = $__1.it,
    iit = $__1.iit,
    expect = $__1.expect,
    beforeEach = $__1.beforeEach;
var $__2 = ($__angular2_47_di__ = require("angular2/di"), $__angular2_47_di__ && $__angular2_47_di__.__esModule && $__angular2_47_di__ || {default: $__angular2_47_di__}),
    Injector = $__2.Injector,
    Inject = $__2.Inject,
    InjectLazy = $__2.InjectLazy,
    Optional = $__2.Optional,
    bind = $__2.bind;
var Engine = function Engine() {};
($traceurRuntime.createClass)(Engine, {}, {});
var BrokenEngine = function BrokenEngine() {
  throw "Broken Engine";
};
($traceurRuntime.createClass)(BrokenEngine, {}, {});
var DashboardSoftware = function DashboardSoftware() {};
($traceurRuntime.createClass)(DashboardSoftware, {}, {});
var Dashboard = function Dashboard(software) {
  assert.argumentTypes(software, DashboardSoftware);
};
($traceurRuntime.createClass)(Dashboard, {}, {});
Object.defineProperty(Dashboard, "parameters", {get: function() {
    return [[DashboardSoftware]];
  }});
var TurboEngine = function TurboEngine() {
  $traceurRuntime.superConstructor($TurboEngine).apply(this, arguments);
};
var $TurboEngine = TurboEngine;
($traceurRuntime.createClass)(TurboEngine, {}, {}, Engine);
var Car = function Car(engine) {
  assert.argumentTypes(engine, Engine);
  this.engine = engine;
};
($traceurRuntime.createClass)(Car, {}, {});
Object.defineProperty(Car, "parameters", {get: function() {
    return [[Engine]];
  }});
var CarWithLazyEngine = function CarWithLazyEngine(engineFactory) {
  this.engineFactory = engineFactory;
};
($traceurRuntime.createClass)(CarWithLazyEngine, {}, {});
Object.defineProperty(CarWithLazyEngine, "parameters", {get: function() {
    return [[new InjectLazy(Engine)]];
  }});
var CarWithOptionalEngine = function CarWithOptionalEngine(engine) {
  assert.argumentTypes(engine, Engine);
  this.engine = engine;
};
($traceurRuntime.createClass)(CarWithOptionalEngine, {}, {});
Object.defineProperty(CarWithOptionalEngine, "parameters", {get: function() {
    return [[Engine, new Optional()]];
  }});
var CarWithDashboard = function CarWithDashboard(engine, dashboard) {
  assert.argumentTypes(engine, Engine, dashboard, Dashboard);
  this.engine = engine;
  this.dashboard = dashboard;
};
($traceurRuntime.createClass)(CarWithDashboard, {}, {});
Object.defineProperty(CarWithDashboard, "parameters", {get: function() {
    return [[Engine], [Dashboard]];
  }});
var SportsCar = function SportsCar(engine) {
  assert.argumentTypes(engine, Engine);
  $traceurRuntime.superConstructor($SportsCar).call(this, engine);
};
var $SportsCar = SportsCar;
($traceurRuntime.createClass)(SportsCar, {}, {}, Car);
Object.defineProperty(SportsCar, "parameters", {get: function() {
    return [[Engine]];
  }});
var CarWithInject = function CarWithInject(engine) {
  assert.argumentTypes(engine, Engine);
  this.engine = engine;
};
($traceurRuntime.createClass)(CarWithInject, {}, {});
Object.defineProperty(CarWithInject, "parameters", {get: function() {
    return [[Engine, new Inject(TurboEngine)]];
  }});
var CyclicEngine = function CyclicEngine(car) {
  assert.argumentTypes(car, Car);
};
($traceurRuntime.createClass)(CyclicEngine, {}, {});
Object.defineProperty(CyclicEngine, "parameters", {get: function() {
    return [[Car]];
  }});
var NoAnnotations = function NoAnnotations(secretDependency) {};
($traceurRuntime.createClass)(NoAnnotations, {}, {});
function main() {
  describe('injector', function() {
    it('should instantiate a class without dependencies', function() {
      var injector = new Injector([Engine]);
      var engine = injector.get(Engine);
      expect(engine).toBeAnInstanceOf(Engine);
    });
    it('should resolve dependencies based on type information', function() {
      var injector = new Injector([Engine, Car]);
      var car = injector.get(Car);
      expect(car).toBeAnInstanceOf(Car);
      expect(car.engine).toBeAnInstanceOf(Engine);
    });
    it('should resolve dependencies based on @Inject annotation', function() {
      var injector = new Injector([TurboEngine, Engine, CarWithInject]);
      var car = injector.get(CarWithInject);
      expect(car).toBeAnInstanceOf(CarWithInject);
      expect(car.engine).toBeAnInstanceOf(TurboEngine);
    });
    it('should throw when no type and not @Inject', function() {
      expect((function() {
        return new Injector([NoAnnotations]);
      })).toThrowError('Cannot resolve all parameters for NoAnnotations');
    });
    it('should cache instances', function() {
      var injector = new Injector([Engine]);
      var e1 = injector.get(Engine);
      var e2 = injector.get(Engine);
      expect(e1).toBe(e2);
    });
    it('should bind to a value', function() {
      var injector = new Injector([bind(Engine).toValue("fake engine")]);
      var engine = injector.get(Engine);
      expect(engine).toEqual("fake engine");
    });
    it('should bind to a factory', function() {
      function sportsCarFactory(e) {
        assert.argumentTypes(e, Engine);
        return new SportsCar(e);
      }
      Object.defineProperty(sportsCarFactory, "parameters", {get: function() {
          return [[Engine]];
        }});
      var injector = new Injector([Engine, bind(Car).toFactory(sportsCarFactory)]);
      var car = injector.get(Car);
      expect(car).toBeAnInstanceOf(SportsCar);
      expect(car.engine).toBeAnInstanceOf(Engine);
    });
    it('should bind to an alias', function() {
      var injector = new Injector([Engine, bind(SportsCar).toClass(SportsCar), bind(Car).toAlias(SportsCar)]);
      var car = injector.get(Car);
      var sportsCar = injector.get(SportsCar);
      expect(car).toBeAnInstanceOf(SportsCar);
      expect(car).toBe(sportsCar);
    });
    it('should throw when the aliased binding does not exist', function() {
      var injector = new Injector([bind('car').toAlias(SportsCar)]);
      expect((function() {
        return injector.get('car');
      })).toThrowError('No provider for SportsCar! (car -> SportsCar)');
    });
    it('should support overriding factory dependencies', function() {
      var injector = new Injector([Engine, bind(Car).toFactory((function(e) {
        return new SportsCar(e);
      }), [Engine])]);
      var car = injector.get(Car);
      expect(car).toBeAnInstanceOf(SportsCar);
      expect(car.engine).toBeAnInstanceOf(Engine);
    });
    it('should support optional dependencies', function() {
      var injector = new Injector([CarWithOptionalEngine]);
      var car = injector.get(CarWithOptionalEngine);
      expect(car.engine).toEqual(null);
    });
    it("should flatten passed-in bindings", function() {
      var injector = new Injector([[[Engine, Car]]]);
      var car = injector.get(Car);
      expect(car).toBeAnInstanceOf(Car);
    });
    it("should use the last binding " + "when there are mutliple bindings for same token", function() {
      var injector = new Injector([bind(Engine).toClass(Engine), bind(Engine).toClass(TurboEngine)]);
      expect(injector.get(Engine)).toBeAnInstanceOf(TurboEngine);
    });
    it('should use non-type tokens', function() {
      var injector = new Injector([bind('token').toValue('value')]);
      expect(injector.get('token')).toEqual('value');
    });
    it('should throw when given invalid bindings', function() {
      expect((function() {
        return new Injector(["blah"]);
      })).toThrowError('Invalid binding blah');
      expect((function() {
        return new Injector([bind("blah")]);
      })).toThrowError('Invalid binding blah');
    });
    it('should provide itself', function() {
      var parent = new Injector([]);
      var child = parent.createChild([]);
      expect(child.get(Injector)).toBe(child);
    });
    it('should throw when no provider defined', function() {
      var injector = new Injector([]);
      expect((function() {
        return injector.get('NonExisting');
      })).toThrowError('No provider for NonExisting!');
    });
    it('should show the full path when no provider', function() {
      var injector = new Injector([CarWithDashboard, Engine, Dashboard]);
      expect((function() {
        return injector.get(CarWithDashboard);
      })).toThrowError('No provider for DashboardSoftware! (CarWithDashboard -> Dashboard -> DashboardSoftware)');
    });
    it('should throw when trying to instantiate a cyclic dependency', function() {
      var injector = new Injector([Car, bind(Engine).toClass(CyclicEngine)]);
      expect((function() {
        return injector.get(Car);
      })).toThrowError('Cannot instantiate cyclic dependency! (Car -> Engine -> Car)');
      expect((function() {
        return injector.asyncGet(Car);
      })).toThrowError('Cannot instantiate cyclic dependency! (Car -> Engine -> Car)');
    });
    it('should show the full path when error happens in a constructor', function() {
      var injector = new Injector([Car, bind(Engine).toClass(BrokenEngine)]);
      try {
        injector.get(Car);
        throw "Must throw";
      } catch (e) {
        expect(e.message).toContain("Error during instantiation of Engine! (Car -> Engine)");
      }
    });
    it('should instantiate an object after a failed attempt', function() {
      var isBroken = true;
      var injector = new Injector([Car, bind(Engine).toFactory((function() {
        return isBroken ? new BrokenEngine() : new Engine();
      }))]);
      expect((function() {
        return injector.get(Car);
      })).toThrowError(new RegExp("Error"));
      isBroken = false;
      expect(injector.get(Car)).toBeAnInstanceOf(Car);
    });
    describe("default bindings", function() {
      it("should be used when no matching binding found", function() {
        var injector = new Injector([], {defaultBindings: true});
        var car = injector.get(Car);
        expect(car).toBeAnInstanceOf(Car);
      });
      it("should use the matching binding when it is available", function() {
        var injector = new Injector([bind(Car).toClass(SportsCar)], {defaultBindings: true});
        var car = injector.get(Car);
        expect(car).toBeAnInstanceOf(SportsCar);
      });
    });
    describe("child", function() {
      it('should load instances from parent injector', function() {
        var parent = new Injector([Engine]);
        var child = parent.createChild([]);
        var engineFromParent = parent.get(Engine);
        var engineFromChild = child.get(Engine);
        expect(engineFromChild).toBe(engineFromParent);
      });
      it("should not use the child bindings when resolving the dependencies of a parent binding", function() {
        var parent = new Injector([Car, Engine]);
        var child = parent.createChild([bind(Engine).toClass(TurboEngine)]);
        var carFromChild = child.get(Car);
        expect(carFromChild.engine).toBeAnInstanceOf(Engine);
      });
      it('should create new instance in a child injector', function() {
        var parent = new Injector([Engine]);
        var child = parent.createChild([bind(Engine).toClass(TurboEngine)]);
        var engineFromParent = parent.get(Engine);
        var engineFromChild = child.get(Engine);
        expect(engineFromParent).not.toBe(engineFromChild);
        expect(engineFromChild).toBeAnInstanceOf(TurboEngine);
      });
      it("should create child injectors without default bindings", function() {
        var parent = new Injector([], {defaultBindings: true});
        var child = parent.createChild([]);
        var childCar = child.get(Car);
        var parentCar = parent.get(Car);
        expect(childCar).toBe(parentCar);
      });
    });
    describe("lazy", function() {
      it("should create dependencies lazily", function() {
        var injector = new Injector([Engine, CarWithLazyEngine]);
        var car = injector.get(CarWithLazyEngine);
        expect(car.engineFactory()).toBeAnInstanceOf(Engine);
      });
      it("should cache instance created lazily", function() {
        var injector = new Injector([Engine, CarWithLazyEngine]);
        var car = injector.get(CarWithLazyEngine);
        var e1 = car.engineFactory();
        var e2 = car.engineFactory();
        expect(e1).toBe(e2);
      });
    });
  });
}

//# sourceMappingURL=/Users/crush/Documents/learning_js/angular/modules/angular2/test/di/injector_spec.map

//# sourceMappingURL=./injector_spec.map
 main();