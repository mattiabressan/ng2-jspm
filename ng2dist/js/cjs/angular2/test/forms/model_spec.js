var parse5Adapter = require('angular2/src/dom/parse5_adapter');
parse5Adapter.Parse5DomAdapter.makeCurrent();
"use strict";
Object.defineProperties(module.exports, {
  main: {get: function() {
      return main;
    }},
  __esModule: {value: true}
});
var __moduleName = "angular2/test/forms/model_spec";
var $__angular2_47_test_95_lib__,
    $__angular2_47_forms__,
    $__angular2_47_forms__;
var $__0 = ($__angular2_47_test_95_lib__ = require("angular2/test_lib"), $__angular2_47_test_95_lib__ && $__angular2_47_test_95_lib__.__esModule && $__angular2_47_test_95_lib__ || {default: $__angular2_47_test_95_lib__}),
    ddescribe = $__0.ddescribe,
    describe = $__0.describe,
    it = $__0.it,
    iit = $__0.iit,
    xit = $__0.xit,
    expect = $__0.expect,
    beforeEach = $__0.beforeEach,
    afterEach = $__0.afterEach,
    el = $__0.el;
var $__1 = ($__angular2_47_forms__ = require("angular2/forms"), $__angular2_47_forms__ && $__angular2_47_forms__.__esModule && $__angular2_47_forms__ || {default: $__angular2_47_forms__}),
    ControlGroup = $__1.ControlGroup,
    Control = $__1.Control,
    OptionalControl = $__1.OptionalControl;
var validations = ($__angular2_47_forms__ = require("angular2/forms"), $__angular2_47_forms__ && $__angular2_47_forms__.__esModule && $__angular2_47_forms__ || {default: $__angular2_47_forms__});
function main() {
  describe("Form Model", (function() {
    describe("Control", (function() {
      describe("validator", (function() {
        it("should run validator with the initial value", (function() {
          var c = new Control("value", validations.required);
          expect(c.valid).toEqual(true);
        }));
        it("should rerun the validator when the value changes", (function() {
          var c = new Control("value", validations.required);
          c.updateValue(null);
          expect(c.valid).toEqual(false);
        }));
        it("should return errors", (function() {
          var c = new Control(null, validations.required);
          expect(c.errors).toEqual({"required": true});
        }));
      }));
    }));
    describe("ControlGroup", (function() {
      describe("value", (function() {
        it("should be the reduced value of the child controls", (function() {
          var g = new ControlGroup({
            "one": new Control("111"),
            "two": new Control("222")
          });
          expect(g.value).toEqual({
            "one": "111",
            "two": "222"
          });
        }));
        it("should be empty when there are no child controls", (function() {
          var g = new ControlGroup({});
          expect(g.value).toEqual({});
        }));
        it("should support nested groups", (function() {
          var g = new ControlGroup({
            "one": new Control("111"),
            "nested": new ControlGroup({"two": new Control("222")})
          });
          expect(g.value).toEqual({
            "one": "111",
            "nested": {"two": "222"}
          });
          g.controls["nested"].controls["two"].updateValue("333");
          expect(g.value).toEqual({
            "one": "111",
            "nested": {"two": "333"}
          });
        }));
      }));
      describe("validator", (function() {
        it("should run the validator with the initial value (valid)", (function() {
          var g = new ControlGroup({"one": new Control('value', validations.required)});
          expect(g.valid).toEqual(true);
          expect(g.errors).toEqual(null);
        }));
        it("should run the validator with the initial value (invalid)", (function() {
          var one = new Control(null, validations.required);
          var g = new ControlGroup({"one": one});
          expect(g.valid).toEqual(false);
          expect(g.errors).toEqual({"required": [one]});
        }));
        it("should run the validator with the value changes", (function() {
          var c = new Control(null, validations.required);
          var g = new ControlGroup({"one": c});
          c.updateValue("some value");
          expect(g.valid).toEqual(true);
          expect(g.errors).toEqual(null);
        }));
      }));
      describe("optional components", (function() {
        describe("contains", (function() {
          var group;
          beforeEach((function() {
            group = new ControlGroup({
              "required": new Control("requiredValue"),
              "optional": new Control("optionalValue")
            }, {"optional": false});
          }));
          it("should return false when the component is not included", (function() {
            expect(group.contains("optional")).toEqual(false);
          }));
          it("should return false when there is no component with the given name", (function() {
            expect(group.contains("something else")).toEqual(false);
          }));
          it("should return true when the component is included", (function() {
            expect(group.contains("required")).toEqual(true);
            group.include("optional");
            expect(group.contains("optional")).toEqual(true);
          }));
        }));
        it("should not include an inactive component into the group value", (function() {
          var group = new ControlGroup({
            "required": new Control("requiredValue"),
            "optional": new Control("optionalValue")
          }, {"optional": false});
          expect(group.value).toEqual({"required": "requiredValue"});
          group.include("optional");
          expect(group.value).toEqual({
            "required": "requiredValue",
            "optional": "optionalValue"
          });
        }));
        it("should not run validations on an inactive component", (function() {
          var group = new ControlGroup({
            "required": new Control("requiredValue", validations.required),
            "optional": new Control("", validations.required)
          }, {"optional": false});
          expect(group.valid).toEqual(true);
          group.include("optional");
          expect(group.valid).toEqual(false);
        }));
      }));
    }));
  }));
}

//# sourceMappingURL=/Users/crush/Documents/learning_js/angular/modules/angular2/test/forms/model_spec.map

//# sourceMappingURL=./model_spec.map
 main();