System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/forms"], function($__export) {
  "use strict";
  var assert,
      StringMapWrapper,
      ListWrapper,
      isPresent,
      ControlGroup,
      Control,
      OptionalControl,
      OptionalControlGroup,
      FormBuilder;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      ControlGroup = $__m.ControlGroup;
      Control = $__m.Control;
      OptionalControl = $__m.OptionalControl;
      OptionalControlGroup = $__m.OptionalControlGroup;
    }],
    execute: function() {
      FormBuilder = $__export("FormBuilder", (function() {
        var FormBuilder = function FormBuilder() {};
        return ($traceurRuntime.createClass)(FormBuilder, {
          group: function(controlsConfig) {
            var extra = arguments[1] !== (void 0) ? arguments[1] : null;
            var controls = this._reduceControls(controlsConfig);
            var optionals = isPresent(extra) ? StringMapWrapper.get(extra, "optionals") : null;
            var validator = isPresent(extra) ? StringMapWrapper.get(extra, "validator") : null;
            if (isPresent(validator)) {
              return assert.returnType((new ControlGroup(controls, optionals, validator)), ControlGroup);
            } else {
              return assert.returnType((new ControlGroup(controls, optionals)), ControlGroup);
            }
          },
          control: function(value) {
            var validator = arguments[1] !== (void 0) ? arguments[1] : null;
            assert.argumentTypes(value, assert.type.any, validator, Function);
            if (isPresent(validator)) {
              return assert.returnType((new Control(value, validator)), Control);
            } else {
              return assert.returnType((new Control(value)), Control);
            }
          },
          _reduceControls: function(controlsConfig) {
            var $__0 = this;
            var controls = {};
            StringMapWrapper.forEach(controlsConfig, (function(controlConfig, controlName) {
              controls[controlName] = $__0._createControl(controlConfig);
            }));
            return controls;
          },
          _createControl: function(controlConfig) {
            if (controlConfig instanceof Control || controlConfig instanceof ControlGroup) {
              return controlConfig;
            } else if (ListWrapper.isList(controlConfig)) {
              var value = ListWrapper.get(controlConfig, 0);
              var validator = controlConfig.length > 1 ? controlConfig[1] : null;
              return this.control(value, validator);
            } else {
              return this.control(controlConfig);
            }
          }
        }, {});
      }()));
      Object.defineProperty(FormBuilder.prototype.control, "parameters", {get: function() {
          return [[], [Function]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/forms/form_builder.map

//# sourceMappingURL=../../../angular2/src/forms/form_builder.js.map