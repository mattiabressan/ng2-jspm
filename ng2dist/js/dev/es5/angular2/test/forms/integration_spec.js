System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/change_detection", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/template_loader", "angular2/src/core/compiler/component_url_mapper", "angular2/src/core/compiler/url_resolver", "angular2/src/core/compiler/style_url_resolver", "angular2/src/core/compiler/css_processor", "angular2/src/mock/template_resolver_mock", "angular2/di", "angular2/core", "angular2/forms", "angular2/src/forms/validators", "angular2/src/reflection/reflection"], function($__export) {
  "use strict";
  var assert,
      ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      el,
      queryView,
      dispatchEvent,
      Lexer,
      Parser,
      ChangeDetector,
      dynamicChangeDetection,
      Compiler,
      CompilerCache,
      DirectiveMetadataReader,
      NativeShadowDomStrategy,
      TemplateLoader,
      ComponentUrlMapper,
      UrlResolver,
      StyleUrlResolver,
      CssProcessor,
      MockTemplateResolver,
      Injector,
      Component,
      Decorator,
      Template,
      ControlGroupDirective,
      ControlDirective,
      Control,
      ControlGroup,
      OptionalControl,
      ControlValueAccessor,
      RequiredValidatorDirective,
      validators,
      reflector,
      MyComp,
      WrappedValueAccessor,
      WrappedValue;
  function main() {
    function detectChanges(view) {
      view.changeDetector.detectChanges();
    }
    function compile(componentType, template, context, callback) {
      var tplResolver = new MockTemplateResolver();
      var urlResolver = new UrlResolver();
      var compiler = new Compiler(dynamicChangeDetection, new TemplateLoader(null, null), new DirectiveMetadataReader(), new Parser(new Lexer()), new CompilerCache(), new NativeShadowDomStrategy(new StyleUrlResolver(urlResolver)), tplResolver, new ComponentUrlMapper(), urlResolver, new CssProcessor(null));
      tplResolver.setTemplate(componentType, new Template({
        inline: template,
        directives: [ControlGroupDirective, ControlDirective, WrappedValue, RequiredValidatorDirective]
      }));
      compiler.compile(componentType).then((function(pv) {
        var view = pv.instantiate(null, null, reflector);
        view.hydrate(new Injector([]), null, context);
        detectChanges(view);
        callback(view);
      }));
    }
    describe("integration tests", (function() {
      it("should initialize DOM elements with the given form object", (function(done) {
        var ctx = new MyComp(new ControlGroup({"login": new Control("loginValue")}));
        var t = "<div [control-group]=\"form\">\n                <input type=\"text\" control=\"login\">\n              </div>";
        compile(MyComp, t, ctx, (function(view) {
          var input = queryView(view, "input");
          expect(input.value).toEqual("loginValue");
          done();
        }));
      }));
      it("should update the control group values on DOM change", (function(done) {
        var form = new ControlGroup({"login": new Control("oldValue")});
        var ctx = new MyComp(form);
        var t = "<div [control-group]=\"form\">\n                <input type=\"text\" control=\"login\">\n              </div>";
        compile(MyComp, t, ctx, (function(view) {
          var input = queryView(view, "input");
          input.value = "updatedValue";
          dispatchEvent(input, "change");
          expect(form.value).toEqual({"login": "updatedValue"});
          done();
        }));
      }));
      it("should update DOM elements when rebinding the control group", (function(done) {
        var form = new ControlGroup({"login": new Control("oldValue")});
        var ctx = new MyComp(form);
        var t = "<div [control-group]=\"form\">\n                <input type=\"text\" control=\"login\">\n              </div>";
        compile(MyComp, t, ctx, (function(view) {
          ctx.form = new ControlGroup({"login": new Control("newValue")});
          detectChanges(view);
          var input = queryView(view, "input");
          expect(input.value).toEqual("newValue");
          done();
        }));
      }));
      it("should update DOM element when rebinding the control name", (function(done) {
        var ctx = new MyComp(new ControlGroup({
          "one": new Control("one"),
          "two": new Control("two")
        }), "one");
        var t = "<div [control-group]=\"form\">\n                <input type=\"text\" [control]=\"name\">\n              </div>";
        compile(MyComp, t, ctx, (function(view) {
          var input = queryView(view, "input");
          expect(input.value).toEqual("one");
          ctx.name = "two";
          detectChanges(view);
          expect(input.value).toEqual("two");
          done();
        }));
      }));
      describe("different control types", (function() {
        it("should support type=checkbox", (function(done) {
          var ctx = new MyComp(new ControlGroup({"checkbox": new Control(true)}));
          var t = "<div [control-group]=\"form\">\n                  <input type=\"checkbox\" control=\"checkbox\">\n                </div>";
          compile(MyComp, t, ctx, (function(view) {
            var input = queryView(view, "input");
            expect(input.checked).toBe(true);
            input.checked = false;
            dispatchEvent(input, "change");
            expect(ctx.form.value).toEqual({"checkbox": false});
            done();
          }));
        }));
        it("should support custom value accessors", (function(done) {
          var ctx = new MyComp(new ControlGroup({"name": new Control("aa")}));
          var t = "<div [control-group]=\"form\">\n                  <input type=\"text\" control=\"name\" wrapped-value>\n                </div>";
          compile(MyComp, t, ctx, (function(view) {
            var input = queryView(view, "input");
            expect(input.value).toEqual("!aa!");
            input.value = "!bb!";
            dispatchEvent(input, "change");
            expect(ctx.form.value).toEqual({"name": "bb"});
            done();
          }));
        }));
      }));
      describe("validations", (function() {
        it("should use validators defined in html", (function(done) {
          var form = new ControlGroup({"login": new Control("aa")});
          var ctx = new MyComp(form);
          var t = "<div [control-group]=\"form\">\n                  <input type=\"text\" control=\"login\" required>\n                 </div>";
          compile(MyComp, t, ctx, (function(view) {
            expect(form.valid).toEqual(true);
            var input = queryView(view, "input");
            input.value = "";
            dispatchEvent(input, "change");
            expect(form.valid).toEqual(false);
            done();
          }));
        }));
        it("should use validators defined in the model", (function(done) {
          var form = new ControlGroup({"login": new Control("aa", validators.required)});
          var ctx = new MyComp(form);
          var t = "<div [control-group]=\"form\">\n                  <input type=\"text\" control=\"login\">\n                 </div>";
          compile(MyComp, t, ctx, (function(view) {
            expect(form.valid).toEqual(true);
            var input = queryView(view, "input");
            input.value = "";
            dispatchEvent(input, "change");
            expect(form.valid).toEqual(false);
            done();
          }));
        }));
      }));
      describe("nested forms", (function() {
        it("should init DOM with the given form object", (function(done) {
          var form = new ControlGroup({"nested": new ControlGroup({"login": new Control("value")})});
          var ctx = new MyComp(form);
          var t = "<div [control-group]=\"form\">\n                    <div control-group=\"nested\">\n                      <input type=\"text\" control=\"login\">\n                    </div>\n                </div>";
          compile(MyComp, t, ctx, (function(view) {
            var input = queryView(view, "input");
            expect(input.value).toEqual("value");
            done();
          }));
        }));
        it("should update the control group values on DOM change", (function(done) {
          var form = new ControlGroup({"nested": new ControlGroup({"login": new Control("value")})});
          var ctx = new MyComp(form);
          var t = "<div [control-group]=\"form\">\n                    <div control-group=\"nested\">\n                      <input type=\"text\" control=\"login\">\n                    </div>\n                </div>";
          compile(MyComp, t, ctx, (function(view) {
            var input = queryView(view, "input");
            input.value = "updatedValue";
            dispatchEvent(input, "change");
            expect(form.value).toEqual({"nested": {"login": "updatedValue"}});
            done();
          }));
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      afterEach = $__m.afterEach;
      el = $__m.el;
      queryView = $__m.queryView;
      dispatchEvent = $__m.dispatchEvent;
    }, function($__m) {
      Lexer = $__m.Lexer;
      Parser = $__m.Parser;
      ChangeDetector = $__m.ChangeDetector;
      dynamicChangeDetection = $__m.dynamicChangeDetection;
    }, function($__m) {
      Compiler = $__m.Compiler;
      CompilerCache = $__m.CompilerCache;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      ComponentUrlMapper = $__m.ComponentUrlMapper;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      CssProcessor = $__m.CssProcessor;
    }, function($__m) {
      MockTemplateResolver = $__m.MockTemplateResolver;
    }, function($__m) {
      Injector = $__m.Injector;
    }, function($__m) {
      Component = $__m.Component;
      Decorator = $__m.Decorator;
      Template = $__m.Template;
    }, function($__m) {
      ControlGroupDirective = $__m.ControlGroupDirective;
      ControlDirective = $__m.ControlDirective;
      Control = $__m.Control;
      ControlGroup = $__m.ControlGroup;
      OptionalControl = $__m.OptionalControl;
      ControlValueAccessor = $__m.ControlValueAccessor;
      RequiredValidatorDirective = $__m.RequiredValidatorDirective;
    }, function($__m) {
      validators = $__m;
    }, function($__m) {
      reflector = $__m.reflector;
    }],
    execute: function() {
      MyComp = (function() {
        var MyComp = function MyComp() {
          var form = arguments[0] !== (void 0) ? arguments[0] : null;
          var name = arguments[1] !== (void 0) ? arguments[1] : null;
          this.form = form;
          this.name = name;
        };
        return ($traceurRuntime.createClass)(MyComp, {}, {});
      }());
      Object.defineProperty(MyComp, "annotations", {get: function() {
          return [new Component({selector: "my-comp"})];
        }});
      WrappedValueAccessor = (function($__super) {
        var WrappedValueAccessor = function WrappedValueAccessor() {
          $traceurRuntime.superConstructor(WrappedValueAccessor).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(WrappedValueAccessor, {
          readValue: function(el) {
            return el.value.substring(1, el.value.length - 1);
          },
          writeValue: function(el, value) {
            el.value = ("!" + value + "!");
          }
        }, {}, $__super);
      }(ControlValueAccessor));
      WrappedValue = (function() {
        var WrappedValue = function WrappedValue(cd) {
          assert.argumentTypes(cd, ControlDirective);
          cd.valueAccessor = new WrappedValueAccessor();
        };
        return ($traceurRuntime.createClass)(WrappedValue, {}, {});
      }());
      Object.defineProperty(WrappedValue, "annotations", {get: function() {
          return [new Decorator({selector: '[wrapped-value]'})];
        }});
      Object.defineProperty(WrappedValue, "parameters", {get: function() {
          return [[ControlDirective]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/forms/integration_spec.map

//# sourceMappingURL=../../../angular2/test/forms/integration_spec.js.map