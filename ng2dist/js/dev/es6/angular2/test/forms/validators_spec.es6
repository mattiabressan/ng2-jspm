import {assert} from "rtts_assert/rtts_assert";
import {ddescribe,
  describe,
  it,
  iit,
  xit,
  expect,
  beforeEach,
  afterEach,
  el} from 'angular2/test_lib';
import {ControlGroup,
  Control,
  required,
  compose,
  controlGroupValidator,
  nullValidator} from 'angular2/forms';
export function main() {
  function validator(key, error) {
    assert.argumentTypes(key, assert.type.string, error, assert.type.any);
    return function(c) {
      assert.argumentTypes(c, Control);
      var r = {};
      r[key] = error;
      return r;
    };
  }
  Object.defineProperty(validator, "parameters", {get: function() {
      return [[assert.type.string], [assert.type.any]];
    }});
  describe("Validators", () => {
    describe("required", () => {
      it("should error on an empty string", () => {
        expect(required(new Control(""))).toEqual({"required": true});
      });
      it("should error on null", () => {
        expect(required(new Control(null))).toEqual({"required": true});
      });
      it("should not error on a non-empty string", () => {
        expect(required(new Control("not empty"))).toEqual(null);
      });
    });
    describe("compose", () => {
      it("should collect errors from all the validators", () => {
        var c = compose([validator("a", true), validator("b", true)]);
        expect(c(new Control(""))).toEqual({
          "a": true,
          "b": true
        });
      });
      it("should run validators left to right", () => {
        var c = compose([validator("a", 1), validator("a", 2)]);
        expect(c(new Control(""))).toEqual({"a": 2});
      });
      it("should return null when no errors", () => {
        var c = compose([nullValidator, nullValidator]);
        expect(c(new Control(""))).toEqual(null);
      });
    });
    describe("controlGroupValidator", () => {
      it("should collect errors from the child controls", () => {
        var one = new Control("one", validator("a", true));
        var two = new Control("one", validator("b", true));
        var g = new ControlGroup({
          "one": one,
          "two": two
        });
        expect(controlGroupValidator(g)).toEqual({
          "a": [one],
          "b": [two]
        });
      });
      it("should not include controls that have no errors", () => {
        var one = new Control("one", validator("a", true));
        var two = new Control("two");
        var g = new ControlGroup({
          "one": one,
          "two": two
        });
        expect(controlGroupValidator(g)).toEqual({"a": [one]});
      });
      it("should return null when no errors", () => {
        var g = new ControlGroup({"one": new Control("one")});
        expect(controlGroupValidator(g)).toEqual(null);
      });
    });
  });
}

//# sourceMappingURL=/Users/crush/Documents/learning_js/angular/modules/angular2/test/forms/validators_spec.map

//# sourceMappingURL=./validators_spec.map