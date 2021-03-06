System.register(["angular2/test_lib", "angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/view", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/template", "angular2/src/core/compiler/pipeline/compile_element", "angular2/src/core/compiler/pipeline/compile_step", "angular2/src/core/compiler/pipeline/compile_control", "angular2/src/core/compiler/template_loader", "angular2/src/core/compiler/template_resolver", "angular2/src/core/compiler/component_url_mapper", "angular2/src/core/compiler/url_resolver", "angular2/src/core/compiler/style_url_resolver", "angular2/src/core/compiler/css_processor", "angular2/change_detection", "angular2/src/core/compiler/shadow_dom_strategy"], function($__export) {
  "use strict";
  var describe,
      beforeEach,
      it,
      expect,
      ddescribe,
      iit,
      el,
      IS_DARTIUM,
      DOM,
      List,
      ListWrapper,
      Map,
      MapWrapper,
      StringMapWrapper,
      Type,
      isBlank,
      stringify,
      isPresent,
      PromiseWrapper,
      Compiler,
      CompilerCache,
      ProtoView,
      DirectiveMetadataReader,
      Component,
      Template,
      CompileElement,
      CompileStep,
      CompileControl,
      TemplateLoader,
      TemplateResolver,
      ComponentUrlMapper,
      RuntimeComponentUrlMapper,
      UrlResolver,
      StyleUrlResolver,
      CssProcessor,
      Lexer,
      Parser,
      dynamicChangeDetection,
      ShadowDomStrategy,
      NativeShadowDomStrategy,
      ParentComponent,
      MainComponent,
      NestedComponent,
      RecursiveComponent,
      TestableCompiler,
      MockStep,
      FakeUrlResolver,
      FakeTemplateLoader,
      FakeTemplateResolver;
  function runCompilerCommonTests() {
    describe('compiler', function() {
      StringMapWrapper.forEach({
        '(sync TemplateLoader)': true,
        '(async TemplateLoader)': false
      }, (function(sync, name) {
        var reader,
            tplResolver;
        beforeEach((function() {
          reader = new DirectiveMetadataReader();
          tplResolver = new FakeTemplateResolver();
          if (sync) {
            tplResolver.forceSync();
          } else {
            tplResolver.forceAsync();
          }
        }));
        describe(name, (function() {
          function createCompiler(processClosure) {
            var steps = [new MockStep(processClosure)];
            var urlResolver = new FakeUrlResolver();
            var tplLoader = new FakeTemplateLoader(urlResolver);
            return new TestableCompiler(reader, steps, tplLoader, tplResolver, urlResolver, new ComponentUrlMapper());
          }
          it('should run the steps and return the ProtoView of the root element', (function(done) {
            var rootProtoView = new ProtoView(null, null, null);
            var compiler = createCompiler((function(parent, current, control) {
              current.inheritedProtoView = rootProtoView;
            }));
            tplResolver.setTemplate(MainComponent, new Template({inline: '<div></div>'}));
            compiler.compile(MainComponent).then((function(protoView) {
              expect(protoView).toBe(rootProtoView);
              done();
            }));
          }));
          it('should use the inline template', (function(done) {
            var compiler = createCompiler((function(parent, current, control) {
              current.inheritedProtoView = new ProtoView(current.element, null, null);
            }));
            compiler.compile(MainComponent).then((function(protoView) {
              expect(DOM.getInnerHTML(protoView.element)).toEqual('inline component');
              done();
            }));
          }));
          it('should wait for async styles to be resolved', (function(done) {
            var styleResolved = false;
            var completer = PromiseWrapper.completer();
            var compiler = createCompiler((function(parent, current, control) {
              var protoView = new ProtoView(current.element, null, null);
              ListWrapper.push(protoView.stylePromises, completer.promise.then((function(_) {
                styleResolved = true;
              })));
              current.inheritedProtoView = protoView;
            }));
            var pvPromise = compiler.compile(MainComponent);
            expect(pvPromise).toBePromise();
            expect(styleResolved).toEqual(false);
            completer.resolve(null);
            pvPromise.then((function(protoView) {
              expect(styleResolved).toEqual(true);
              done();
            }));
          }));
          it('should load nested components', (function(done) {
            var compiler = createCompiler((function(parent, current, control) {
              if (DOM.hasClass(current.element, 'nested')) {
                current.componentDirective = reader.read(NestedComponent);
                current.inheritedProtoView = parent.inheritedProtoView;
                current.inheritedElementBinder = current.inheritedProtoView.bindElement(null);
              } else {
                current.inheritedProtoView = new ProtoView(current.element, null, null);
              }
            }));
            tplResolver.setTemplate(MainComponent, new Template({inline: '<div class="nested"></div>'}));
            compiler.compile(MainComponent).then((function(protoView) {
              var nestedView = protoView.elementBinders[0].nestedProtoView;
              expect(DOM.getInnerHTML(nestedView.element)).toEqual('nested component');
              done();
            }));
          }));
          it('should cache compiled components', (function(done) {
            var compiler = createCompiler((function(parent, current, control) {
              current.inheritedProtoView = new ProtoView(current.element, null, null);
            }));
            var firstProtoView;
            tplResolver.setTemplate(MainComponent, new Template({inline: '<div></div>'}));
            compiler.compile(MainComponent).then((function(protoView) {
              firstProtoView = protoView;
              return compiler.compile(MainComponent);
            })).then((function(protoView) {
              expect(firstProtoView).toBe(protoView);
              done();
            }));
          }));
          it('should re-use components being compiled', (function(done) {
            var nestedElBinders = [];
            var compiler = createCompiler((function(parent, current, control) {
              current.inheritedProtoView = new ProtoView(current.element, null, null);
              if (DOM.hasClass(current.element, 'nested')) {
                current.inheritedElementBinder = current.inheritedProtoView.bindElement(null);
                current.componentDirective = reader.read(NestedComponent);
                ListWrapper.push(nestedElBinders, current.inheritedElementBinder);
              }
            }));
            tplResolver.setTemplate(MainComponent, new Template({inline: '<div><div class="nested"></div><div class="nested"></div></div>'}));
            compiler.compile(MainComponent).then((function(protoView) {
              expect(nestedElBinders[0].nestedProtoView).toBe(nestedElBinders[1].nestedProtoView);
              done();
            }));
          }));
          it('should allow recursive components', (function(done) {
            var compiler = createCompiler((function(parent, current, control) {
              current.inheritedProtoView = new ProtoView(current.element, null, null);
              current.inheritedElementBinder = current.inheritedProtoView.bindElement(null);
              current.componentDirective = reader.read(RecursiveComponent);
            }));
            compiler.compile(RecursiveComponent).then((function(protoView) {
              expect(protoView.elementBinders[0].nestedProtoView).toBe(protoView);
              done();
            }));
          }));
        }));
      }));
      describe('(mixed async, sync TemplateLoader)', (function() {
        var reader = new DirectiveMetadataReader();
        function createCompiler(processClosure, templateResolver) {
          var steps = [new MockStep(processClosure)];
          var urlResolver = new FakeUrlResolver();
          var tplLoader = new FakeTemplateLoader(urlResolver);
          return new TestableCompiler(reader, steps, tplLoader, templateResolver, urlResolver, new ComponentUrlMapper());
        }
        Object.defineProperty(createCompiler, "parameters", {get: function() {
            return [[], [TemplateResolver]];
          }});
        function createNestedComponentSpec(name, resolver) {
          var error = arguments[2] !== (void 0) ? arguments[2] : null;
          it(("should load nested components " + name), (function(done) {
            var compiler = createCompiler((function(parent, current, control) {
              if (DOM.hasClass(current.element, 'parent')) {
                current.componentDirective = reader.read(NestedComponent);
                current.inheritedProtoView = parent.inheritedProtoView;
                current.inheritedElementBinder = current.inheritedProtoView.bindElement(null);
              } else {
                current.inheritedProtoView = new ProtoView(current.element, null, null);
              }
            }), resolver);
            PromiseWrapper.then(compiler.compile(ParentComponent), function(protoView) {
              var nestedView = protoView.elementBinders[0].nestedProtoView;
              expect(error).toBeNull();
              expect(DOM.getInnerHTML(nestedView.element)).toEqual('nested component');
              done();
            }, function(compileError) {
              expect(compileError.message).toEqual(error);
              done();
            });
          }));
        }
        Object.defineProperty(createNestedComponentSpec, "parameters", {get: function() {
            return [[], [TemplateResolver], [assert.type.string]];
          }});
        var templateResolver = new FakeTemplateResolver();
        templateResolver.setSync(ParentComponent);
        templateResolver.setSync(NestedComponent);
        createNestedComponentSpec('(sync -> sync)', templateResolver);
        templateResolver = new FakeTemplateResolver();
        templateResolver.setAsync(ParentComponent);
        templateResolver.setSync(NestedComponent);
        createNestedComponentSpec('(async -> sync)', templateResolver);
        templateResolver = new FakeTemplateResolver();
        templateResolver.setSync(ParentComponent);
        templateResolver.setAsync(NestedComponent);
        createNestedComponentSpec('(sync -> async)', templateResolver);
        templateResolver = new FakeTemplateResolver();
        templateResolver.setAsync(ParentComponent);
        templateResolver.setAsync(NestedComponent);
        createNestedComponentSpec('(async -> async)', templateResolver);
        templateResolver = new FakeTemplateResolver();
        templateResolver.setError(ParentComponent);
        templateResolver.setSync(NestedComponent);
        createNestedComponentSpec('(error -> sync)', templateResolver, 'Failed to load the template for ParentComponent');
        templateResolver = new FakeTemplateResolver();
        templateResolver.setSync(ParentComponent);
        templateResolver.setError(NestedComponent);
        createNestedComponentSpec('(sync -> error)', templateResolver, 'Failed to load the template for NestedComponent -> Failed to compile ParentComponent');
        templateResolver = new FakeTemplateResolver();
        templateResolver.setAsync(ParentComponent);
        templateResolver.setError(NestedComponent);
        createNestedComponentSpec('(async -> error)', templateResolver, 'Failed to load the template for NestedComponent -> Failed to compile ParentComponent');
      }));
      describe('URL resolution', (function() {
        it('should resolve template URLs by combining application, component and template URLs', (function(done) {
          var steps = [new MockStep((function(parent, current, control) {
            current.inheritedProtoView = new ProtoView(current.element, null, null);
          }))];
          var reader = new DirectiveMetadataReader();
          var tplResolver = new FakeTemplateResolver();
          var urlResolver = new FakeUrlResolver();
          var tplLoader = new FakeTemplateLoader(urlResolver);
          var template = new Template({
            inline: '<div></div>',
            url: '/tpl.html'
          });
          var cmpUrlMapper = new RuntimeComponentUrlMapper();
          cmpUrlMapper.setComponentUrl(MainComponent, '/cmp');
          var compiler = new TestableCompiler(reader, steps, tplLoader, tplResolver, urlResolver, cmpUrlMapper);
          tplResolver.forceSync();
          tplResolver.setTemplate(MainComponent, template);
          compiler.compile(MainComponent).then((function(protoView) {
            expect(tplLoader.getTemplateUrl(template)).toEqual('http://www.app.com/cmp/tpl.html');
            done();
          }));
        }));
      }));
    });
  }
  $__export("runCompilerCommonTests", runCompilerCommonTests);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      beforeEach = $__m.beforeEach;
      it = $__m.it;
      expect = $__m.expect;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      el = $__m.el;
      IS_DARTIUM = $__m.IS_DARTIUM;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      Type = $__m.Type;
      isBlank = $__m.isBlank;
      stringify = $__m.stringify;
      isPresent = $__m.isPresent;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      Compiler = $__m.Compiler;
      CompilerCache = $__m.CompilerCache;
    }, function($__m) {
      ProtoView = $__m.ProtoView;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      TemplateResolver = $__m.TemplateResolver;
    }, function($__m) {
      ComponentUrlMapper = $__m.ComponentUrlMapper;
      RuntimeComponentUrlMapper = $__m.RuntimeComponentUrlMapper;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      CssProcessor = $__m.CssProcessor;
    }, function($__m) {
      Lexer = $__m.Lexer;
      Parser = $__m.Parser;
      dynamicChangeDetection = $__m.dynamicChangeDetection;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
    }],
    execute: function() {
      ParentComponent = (function() {
        var ParentComponent = function ParentComponent() {};
        return ($traceurRuntime.createClass)(ParentComponent, {}, {});
      }());
      Object.defineProperty(ParentComponent, "annotations", {get: function() {
          return [new Component(), new Template({inline: '<div class="parent"></div>'})];
        }});
      MainComponent = (function() {
        var MainComponent = function MainComponent() {};
        return ($traceurRuntime.createClass)(MainComponent, {}, {});
      }());
      Object.defineProperty(MainComponent, "annotations", {get: function() {
          return [new Component(), new Template({inline: 'inline component'})];
        }});
      NestedComponent = (function() {
        var NestedComponent = function NestedComponent() {};
        return ($traceurRuntime.createClass)(NestedComponent, {}, {});
      }());
      Object.defineProperty(NestedComponent, "annotations", {get: function() {
          return [new Component(), new Template({inline: 'nested component'})];
        }});
      RecursiveComponent = (function() {
        var RecursiveComponent = function RecursiveComponent() {};
        return ($traceurRuntime.createClass)(RecursiveComponent, {}, {});
      }());
      Object.defineProperty(RecursiveComponent, "annotations", {get: function() {
          return [new Component({selector: 'rec-comp'}), new Template({inline: '<div rec-comp></div>'})];
        }});
      TestableCompiler = (function($__super) {
        var TestableCompiler = function TestableCompiler(reader, steps, loader, templateResolver, urlResolver, cmpUrlMapper) {
          $traceurRuntime.superConstructor(TestableCompiler).call(this, dynamicChangeDetection, loader, reader, new Parser(new Lexer()), new CompilerCache(), new NativeShadowDomStrategy(new StyleUrlResolver(urlResolver)), templateResolver, cmpUrlMapper, urlResolver, new CssProcessor(null));
          this.steps = steps;
        };
        return ($traceurRuntime.createClass)(TestableCompiler, {createSteps: function(component, template) {
            return this.steps;
          }}, {}, $__super);
      }(Compiler));
      Object.defineProperty(TestableCompiler, "parameters", {get: function() {
          return [[DirectiveMetadataReader], [assert.genericType(List, CompileStep)], [TemplateLoader], [TemplateResolver], [UrlResolver], [ComponentUrlMapper]];
        }});
      Object.defineProperty(TestableCompiler.prototype.createSteps, "parameters", {get: function() {
          return [[Type], [Template]];
        }});
      MockStep = (function($__super) {
        var MockStep = function MockStep(process) {
          $traceurRuntime.superConstructor(MockStep).call(this);
          this.processClosure = process;
        };
        return ($traceurRuntime.createClass)(MockStep, {process: function(parent, current, control) {
            this.processClosure(parent, current, control);
          }}, {}, $__super);
      }(CompileStep));
      Object.defineProperty(MockStep.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      FakeUrlResolver = (function($__super) {
        var FakeUrlResolver = function FakeUrlResolver() {
          $traceurRuntime.superConstructor(FakeUrlResolver).call(this);
        };
        return ($traceurRuntime.createClass)(FakeUrlResolver, {resolve: function(baseUrl, url) {
            if (baseUrl === null && url == './') {
              return 'http://www.app.com';
            }
            ;
            return baseUrl + url;
          }}, {}, $__super);
      }(UrlResolver));
      Object.defineProperty(FakeUrlResolver.prototype.resolve, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      FakeTemplateLoader = (function($__super) {
        var FakeTemplateLoader = function FakeTemplateLoader(urlResolver) {
          $traceurRuntime.superConstructor(FakeTemplateLoader).call(this, null, urlResolver);
        };
        return ($traceurRuntime.createClass)(FakeTemplateLoader, {load: function(template) {
            if (isPresent(template.inline)) {
              return DOM.createTemplate(template.inline);
            }
            if (isPresent(template.url)) {
              var tplElement = DOM.createTemplate(template.url);
              return PromiseWrapper.resolve(tplElement);
            }
            return PromiseWrapper.reject('Fail to load');
          }}, {}, $__super);
      }(TemplateLoader));
      Object.defineProperty(FakeTemplateLoader, "parameters", {get: function() {
          return [[UrlResolver]];
        }});
      Object.defineProperty(FakeTemplateLoader.prototype.load, "parameters", {get: function() {
          return [[Template]];
        }});
      FakeTemplateResolver = (function($__super) {
        var FakeTemplateResolver = function FakeTemplateResolver() {
          $traceurRuntime.superConstructor(FakeTemplateResolver).call(this);
          this._forceSync = false;
          this._forceAsync = false;
          this._syncCmp = [];
          this._asyncCmp = [];
          this._errorCmp = [];
          this._cmpTemplates = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(FakeTemplateResolver, {
          resolve: function(component) {
            var template = MapWrapper.get(this._cmpTemplates, component);
            if (isBlank(template)) {
              template = $traceurRuntime.superGet(this, FakeTemplateResolver.prototype, "resolve").call(this, component);
            }
            var html = template.inline;
            if (isBlank(template.inline)) {
              throw 'The tested component must define an inline template';
            }
            if (ListWrapper.contains(this._errorCmp, component)) {
              return new Template({
                url: null,
                inline: null
              });
            }
            if (ListWrapper.contains(this._syncCmp, component)) {
              return template;
            }
            if (ListWrapper.contains(this._asyncCmp, component)) {
              return new Template({url: html});
            }
            if (this._forceSync)
              return template;
            if (this._forceAsync)
              return new Template({url: html});
            throw 'No template';
          },
          forceSync: function() {
            this._forceSync = true;
            this._forceAsync = false;
          },
          forceAsync: function() {
            this._forceAsync = true;
            this._forceSync = false;
          },
          setSync: function(component) {
            ListWrapper.push(this._syncCmp, component);
          },
          setAsync: function(component) {
            ListWrapper.push(this._asyncCmp, component);
          },
          setError: function(component) {
            ListWrapper.push(this._errorCmp, component);
          },
          setTemplate: function(component, template) {
            MapWrapper.set(this._cmpTemplates, component, template);
          }
        }, {}, $__super);
      }(TemplateResolver));
      Object.defineProperty(FakeTemplateResolver.prototype.resolve, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(FakeTemplateResolver.prototype.setSync, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(FakeTemplateResolver.prototype.setAsync, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(FakeTemplateResolver.prototype.setError, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(FakeTemplateResolver.prototype.setTemplate, "parameters", {get: function() {
          return [[Type], [Template]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/compiler_common_tests.map

//# sourceMappingURL=../../../../angular2/test/core/compiler/compiler_common_tests.js.map