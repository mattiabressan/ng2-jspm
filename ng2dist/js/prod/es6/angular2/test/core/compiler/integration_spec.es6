import {describe,
  xit,
  it,
  expect,
  beforeEach,
  ddescribe,
  iit,
  el} from 'angular2/test_lib';
import {DOM} from 'angular2/src/dom/dom_adapter';
import {Type,
  isPresent,
  BaseException,
  assertionsEnabled,
  isJsObject} from 'angular2/src/facade/lang';
import {PromiseWrapper} from 'angular2/src/facade/async';
import {Injector} from 'angular2/di';
import {Lexer,
  Parser,
  dynamicChangeDetection,
  DynamicChangeDetection,
  Pipe,
  PipeRegistry} from 'angular2/change_detection';
import {Compiler,
  CompilerCache} from 'angular2/src/core/compiler/compiler';
import {DirectiveMetadataReader} from 'angular2/src/core/compiler/directive_metadata_reader';
import {NativeShadowDomStrategy} from 'angular2/src/core/compiler/shadow_dom_strategy';
import {TemplateLoader} from 'angular2/src/core/compiler/template_loader';
import {MockTemplateResolver} from 'angular2/src/mock/template_resolver_mock';
import {BindingPropagationConfig} from 'angular2/src/core/compiler/binding_propagation_config';
import {ComponentUrlMapper} from 'angular2/src/core/compiler/component_url_mapper';
import {UrlResolver} from 'angular2/src/core/compiler/url_resolver';
import {StyleUrlResolver} from 'angular2/src/core/compiler/style_url_resolver';
import {CssProcessor} from 'angular2/src/core/compiler/css_processor';
import {Decorator,
  Component,
  Viewport} from 'angular2/src/core/annotations/annotations';
import {Template} from 'angular2/src/core/annotations/template';
import {Parent,
  Ancestor} from 'angular2/src/core/annotations/visibility';
import {EventEmitter} from 'angular2/src/core/annotations/di';
import {If} from 'angular2/src/directives/if';
import {ViewContainer} from 'angular2/src/core/compiler/view_container';
import {reflector} from 'angular2/src/reflection/reflection';
export function main() {
  describe('integration tests', function() {
    var compiler,
        tplResolver;
    function createCompiler(tplResolver, changedDetection) {
      var urlResolver = new UrlResolver();
      return new Compiler(changedDetection, new TemplateLoader(null, null), new DirectiveMetadataReader(), new Parser(new Lexer()), new CompilerCache(), new NativeShadowDomStrategy(new StyleUrlResolver(urlResolver)), tplResolver, new ComponentUrlMapper(), urlResolver, new CssProcessor(null));
    }
    beforeEach(() => {
      tplResolver = new MockTemplateResolver();
      compiler = createCompiler(tplResolver, dynamicChangeDetection);
    });
    describe('react to record changes', function() {
      var view,
          ctx,
          cd;
      function createView(pv) {
        ctx = new MyComp();
        view = pv.instantiate(null, null, reflector);
        view.hydrate(new Injector([]), null, ctx);
        cd = view.changeDetector;
      }
      it('should consume text node changes', (done) => {
        tplResolver.setTemplate(MyComp, new Template({inline: '<div>{{ctxProp}}</div>'}));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          ctx.ctxProp = 'Hello World!';
          cd.detectChanges();
          expect(DOM.getInnerHTML(view.nodes[0])).toEqual('Hello World!');
          done();
        });
      });
      it('should consume element binding changes', (done) => {
        tplResolver.setTemplate(MyComp, new Template({inline: '<div [id]="ctxProp"></div>'}));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          ctx.ctxProp = 'Hello World!';
          cd.detectChanges();
          expect(view.nodes[0].id).toEqual('Hello World!');
          done();
        });
      });
      it('should consume binding to aria-* attributes', (done) => {
        tplResolver.setTemplate(MyComp, new Template({inline: '<div [aria-label]="ctxProp"></div>'}));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          ctx.ctxProp = 'Initial aria label';
          cd.detectChanges();
          expect(DOM.getAttribute(view.nodes[0], 'aria-label')).toEqual('Initial aria label');
          ctx.ctxProp = 'Changed aria label';
          cd.detectChanges();
          expect(DOM.getAttribute(view.nodes[0], 'aria-label')).toEqual('Changed aria label');
          done();
        });
      });
      it('should consume binding to property names where attr name and property name do not match', (done) => {
        tplResolver.setTemplate(MyComp, new Template({inline: '<div [tabindex]="ctxNumProp"></div>'}));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          cd.detectChanges();
          expect(view.nodes[0].tabIndex).toEqual(0);
          ctx.ctxNumProp = 5;
          cd.detectChanges();
          expect(view.nodes[0].tabIndex).toEqual(5);
          done();
        });
      });
      it('should consume binding to inner-html', (done) => {
        tplResolver.setTemplate(MyComp, new Template({inline: '<div inner-html="{{ctxProp}}"></div>'}));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          ctx.ctxProp = 'Some <span>HTML</span>';
          cd.detectChanges();
          expect(DOM.getInnerHTML(view.nodes[0])).toEqual('Some <span>HTML</span>');
          ctx.ctxProp = 'Some other <div>HTML</div>';
          cd.detectChanges();
          expect(DOM.getInnerHTML(view.nodes[0])).toEqual('Some other <div>HTML</div>');
          done();
        });
      });
      it('should consume directive watch expression change.', (done) => {
        var tpl = '<div>' + '<div my-dir [elprop]="ctxProp"></div>' + '<div my-dir elprop="Hi there!"></div>' + '<div my-dir elprop="Hi {{\'there!\'}}"></div>' + '<div my-dir elprop="One more {{ctxProp}}"></div>' + '</div>';
        tplResolver.setTemplate(MyComp, new Template({
          inline: tpl,
          directives: [MyDir]
        }));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          ctx.ctxProp = 'Hello World!';
          cd.detectChanges();
          expect(view.elementInjectors[0].get(MyDir).dirProp).toEqual('Hello World!');
          expect(view.elementInjectors[1].get(MyDir).dirProp).toEqual('Hi there!');
          expect(view.elementInjectors[2].get(MyDir).dirProp).toEqual('Hi there!');
          expect(view.elementInjectors[3].get(MyDir).dirProp).toEqual('One more Hello World!');
          done();
        });
      });
      it("should support pipes in bindings and bind config", (done) => {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<component-with-pipes #comp [prop]="ctxProp | double"></component-with-pipes>',
          directives: [ComponentWithPipes]
        }));
        var registry = new PipeRegistry({"double": [new DoublePipeFactory()]});
        var changeDetection = new DynamicChangeDetection(registry);
        var compiler = createCompiler(tplResolver, changeDetection);
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          ctx.ctxProp = 'a';
          cd.detectChanges();
          var comp = view.contextWithLocals.get("comp");
          expect(comp.prop).toEqual('aaaa');
          done();
        });
      });
      it('should support nested components.', (done) => {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<child-cmp></child-cmp>',
          directives: [ChildComp]
        }));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          cd.detectChanges();
          expect(view.nodes[0].shadowRoot.childNodes[0].nodeValue).toEqual('hello');
          done();
        });
      });
      it('should support different directive types on a single node', (done) => {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<child-cmp my-dir [elprop]="ctxProp"></child-cmp>',
          directives: [MyDir, ChildComp]
        }));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          ctx.ctxProp = 'Hello World!';
          cd.detectChanges();
          var elInj = view.elementInjectors[0];
          expect(elInj.get(MyDir).dirProp).toEqual('Hello World!');
          expect(elInj.get(ChildComp).dirProp).toEqual(null);
          done();
        });
      });
      it('should support directives where a binding attribute is not given', function(done) {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<p my-dir></p>',
          directives: [MyDir]
        }));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          done();
        });
      });
      it('should support template directives via `<template>` elements.', (done) => {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<div><template some-viewport var-greeting="some-tmpl"><copy-me>{{greeting}}</copy-me></template></div>',
          directives: [SomeViewport]
        }));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          cd.detectChanges();
          var childNodesOfWrapper = view.nodes[0].childNodes;
          expect(childNodesOfWrapper.length).toBe(3);
          expect(childNodesOfWrapper[1].childNodes[0].nodeValue).toEqual('hello');
          expect(childNodesOfWrapper[2].childNodes[0].nodeValue).toEqual('again');
          done();
        });
      });
      it('should support template directives via `template` attribute.', (done) => {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<div><copy-me template="some-viewport: var greeting=some-tmpl">{{greeting}}</copy-me></div>',
          directives: [SomeViewport]
        }));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          cd.detectChanges();
          var childNodesOfWrapper = view.nodes[0].childNodes;
          expect(childNodesOfWrapper.length).toBe(3);
          expect(childNodesOfWrapper[1].childNodes[0].nodeValue).toEqual('hello');
          expect(childNodesOfWrapper[2].childNodes[0].nodeValue).toEqual('again');
          done();
        });
      });
      it('should assign the component instance to a var-', (done) => {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<p><child-cmp var-alice></child-cmp></p>',
          directives: [ChildComp]
        }));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          expect(view.contextWithLocals).not.toBe(null);
          expect(view.contextWithLocals.get('alice')).toBeAnInstanceOf(ChildComp);
          done();
        });
      });
      it('should assign two component instances each with a var-', (done) => {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<p><child-cmp var-alice></child-cmp><child-cmp var-bob></p>',
          directives: [ChildComp]
        }));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          expect(view.contextWithLocals).not.toBe(null);
          expect(view.contextWithLocals.get('alice')).toBeAnInstanceOf(ChildComp);
          expect(view.contextWithLocals.get('bob')).toBeAnInstanceOf(ChildComp);
          expect(view.contextWithLocals.get('alice')).not.toBe(view.contextWithLocals.get('bob'));
          done();
        });
      });
      it('should assign the component instance to a var- with shorthand syntax', (done) => {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<child-cmp #alice></child-cmp>',
          directives: [ChildComp]
        }));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          expect(view.contextWithLocals).not.toBe(null);
          expect(view.contextWithLocals.get('alice')).toBeAnInstanceOf(ChildComp);
          done();
        });
      });
      it('should assign the element instance to a user-defined variable', (done) => {
        tplResolver.setTemplate(MyComp, new Template({inline: '<p><div var-alice><i>Hello</i></div></p>'}));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          expect(view.contextWithLocals).not.toBe(null);
          var value = view.contextWithLocals.get('alice');
          expect(value).not.toBe(null);
          expect(value.tagName.toLowerCase()).toEqual('div');
          done();
        });
      });
      it('should provide binding configuration config to the component', (done) => {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<push-cmp #cmp></push-cmp>',
          directives: [[[PushBasedComp]]]
        }));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          var cmp = view.contextWithLocals.get('cmp');
          cd.detectChanges();
          expect(cmp.numberOfChecks).toEqual(1);
          cd.detectChanges();
          expect(cmp.numberOfChecks).toEqual(1);
          cmp.propagate();
          cd.detectChanges();
          expect(cmp.numberOfChecks).toEqual(2);
          done();
        });
      });
      it('should create a component that injects a @Parent', (done) => {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<some-directive><cmp-with-parent #child></cmp-with-parent></some-directive>',
          directives: [SomeDirective, CompWithParent]
        }));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          var childComponent = view.contextWithLocals.get('child');
          expect(childComponent.myParent).toBeAnInstanceOf(SomeDirective);
          done();
        });
      });
      it('should create a component that injects an @Ancestor', (done) => {
        tplResolver.setTemplate(MyComp, new Template({
          inline: `
            <some-directive>
              <p>
                <cmp-with-ancestor #child></cmp-with-ancestor>
              </p>
            </some-directive>`,
          directives: [SomeDirective, CompWithAncestor]
        }));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          var childComponent = view.contextWithLocals.get('child');
          expect(childComponent.myAncestor).toBeAnInstanceOf(SomeDirective);
          done();
        });
      });
      it('should create a component that injects an @Ancestor through viewport directive', (done) => {
        tplResolver.setTemplate(MyComp, new Template({
          inline: `
            <some-directive>
              <p *if="true">
                <cmp-with-ancestor #child></cmp-with-ancestor>
              </p>
            </some-directive>`,
          directives: [SomeDirective, CompWithAncestor, If]
        }));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          cd.detectChanges();
          var subview = view.viewContainers[0].get(0);
          var childComponent = subview.contextWithLocals.get('child');
          expect(childComponent.myAncestor).toBeAnInstanceOf(SomeDirective);
          done();
        });
      });
      it('should support events', (done) => {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<div emitter listener></div>',
          directives: [DecoratorEmitingEvent, DecoratorListeningEvent]
        }));
        compiler.compile(MyComp).then((pv) => {
          createView(pv);
          var injector = view.elementInjectors[0];
          var emitter = injector.get(DecoratorEmitingEvent);
          var listener = injector.get(DecoratorListeningEvent);
          expect(emitter.msg).toEqual('');
          expect(listener.msg).toEqual('');
          emitter.fireEvent('fired !');
          expect(emitter.msg).toEqual('fired !');
          expect(listener.msg).toEqual('fired !');
          done();
        });
      });
    });
    if (assertionsEnabled()) {
      function expectCompileError(inlineTpl, errMessage, done) {
        tplResolver.setTemplate(MyComp, new Template({inline: inlineTpl}));
        PromiseWrapper.then(compiler.compile(MyComp), (value) => {
          done("Test failure: should not have come here as an exception was expected");
        }, (err) => {
          expect(err.message).toEqual(errMessage);
          done();
        });
      }
      it('should raise an error if no directive is registered for an unsupported DOM property', (done) => {
        expectCompileError('<div [some-prop]="foo"></div>', 'Missing directive to handle \'some-prop\' in MyComp: <div [some-prop]="foo">', done);
      });
      it('should raise an error if no directive is registered for a template with template bindings', (done) => {
        expectCompileError('<div><div template="if: foo"></div></div>', 'Missing directive to handle \'if\' in <div template="if: foo">', done);
      });
      it('should raise an error for missing template directive (1)', (done) => {
        expectCompileError('<div><template foo></template></div>', 'Missing directive to handle: <template foo>', done);
      });
      it('should raise an error for missing template directive (2)', (done) => {
        expectCompileError('<div><template *if="condition"></template></div>', 'Missing directive to handle: <template *if="condition">', done);
      });
      it('should raise an error for missing template directive (3)', (done) => {
        expectCompileError('<div *if="condition"></div>', 'Missing directive to handle \'if\' in MyComp: <div *if="condition">', done);
      });
    }
  });
}
class MyDir {
  constructor() {
    this.dirProp = '';
  }
}
Object.defineProperty(MyDir, "annotations", {get: function() {
    return [new Decorator({
      selector: '[my-dir]',
      bind: {'dirProp': 'elprop'}
    })];
  }});
class PushBasedComp {
  constructor(bpc) {
    this.numberOfChecks = 0;
    this.bpc = bpc;
    bpc.shouldBePropagated();
  }
  get field() {
    this.numberOfChecks++;
    return "fixed";
  }
  propagate() {
    this.bpc.shouldBePropagatedFromRoot();
  }
}
Object.defineProperty(PushBasedComp, "annotations", {get: function() {
    return [new Component({selector: 'push-cmp'}), new Template({inline: '{{field}}'})];
  }});
Object.defineProperty(PushBasedComp, "parameters", {get: function() {
    return [[BindingPropagationConfig]];
  }});
class MyComp {
  constructor() {
    this.ctxProp = 'initial value';
    this.ctxNumProp = 0;
  }
}
Object.defineProperty(MyComp, "annotations", {get: function() {
    return [new Component()];
  }});
class ComponentWithPipes {
}
Object.defineProperty(ComponentWithPipes, "annotations", {get: function() {
    return [new Component({
      selector: 'component-with-pipes',
      bind: {"prop": "prop | double"}
    }), new Template({inline: ''})];
  }});
class ChildComp {
  constructor(service) {
    this.ctxProp = service.greeting;
    this.dirProp = null;
  }
}
Object.defineProperty(ChildComp, "annotations", {get: function() {
    return [new Component({
      selector: 'child-cmp',
      componentServices: [MyService]
    }), new Template({
      directives: [MyDir],
      inline: '{{ctxProp}}'
    })];
  }});
Object.defineProperty(ChildComp, "parameters", {get: function() {
    return [[MyService]];
  }});
class SomeDirective {}
Object.defineProperty(SomeDirective, "annotations", {get: function() {
    return [new Decorator({selector: 'some-directive'})];
  }});
class CompWithParent {
  constructor(someComp) {
    this.myParent = someComp;
  }
}
Object.defineProperty(CompWithParent, "annotations", {get: function() {
    return [new Component({selector: 'cmp-with-parent'}), new Template({
      inline: '<p>Component with an injected parent</p>',
      directives: [SomeDirective]
    })];
  }});
Object.defineProperty(CompWithParent, "parameters", {get: function() {
    return [[SomeDirective, new Parent()]];
  }});
class CompWithAncestor {
  constructor(someComp) {
    this.myAncestor = someComp;
  }
}
Object.defineProperty(CompWithAncestor, "annotations", {get: function() {
    return [new Component({selector: 'cmp-with-ancestor'}), new Template({
      inline: '<p>Component with an injected ancestor</p>',
      directives: [SomeDirective]
    })];
  }});
Object.defineProperty(CompWithAncestor, "parameters", {get: function() {
    return [[SomeDirective, new Ancestor()]];
  }});
class ChildComp2 {
  constructor(service) {
    this.ctxProp = service.greeting;
    this.dirProp = null;
  }
}
Object.defineProperty(ChildComp2, "annotations", {get: function() {
    return [new Component({
      selector: '[child-cmp2]',
      componentServices: [MyService]
    })];
  }});
Object.defineProperty(ChildComp2, "parameters", {get: function() {
    return [[MyService]];
  }});
class SomeViewport {
  constructor(container) {
    container.create().setLocal('some-tmpl', 'hello');
    container.create().setLocal('some-tmpl', 'again');
  }
}
Object.defineProperty(SomeViewport, "annotations", {get: function() {
    return [new Viewport({selector: '[some-viewport]'})];
  }});
Object.defineProperty(SomeViewport, "parameters", {get: function() {
    return [[ViewContainer]];
  }});
class MyService {
  constructor() {
    this.greeting = 'hello';
  }
}
class DoublePipe extends Pipe {
  supports(obj) {
    return true;
  }
  transform(value) {
    return `${value}${value}`;
  }
}
class DoublePipeFactory {
  supports(obj) {
    return true;
  }
  create() {
    return new DoublePipe();
  }
}
class DecoratorEmitingEvent {
  constructor(emitter) {
    this.msg = '';
    this.emitter = emitter;
  }
  fireEvent(msg) {
    this.emitter(msg);
  }
  onEvent(msg) {
    this.msg = msg;
  }
}
Object.defineProperty(DecoratorEmitingEvent, "annotations", {get: function() {
    return [new Decorator({
      selector: '[emitter]',
      events: {'event': 'onEvent($event)'}
    })];
  }});
Object.defineProperty(DecoratorEmitingEvent, "parameters", {get: function() {
    return [[Function, new EventEmitter('event')]];
  }});
Object.defineProperty(DecoratorEmitingEvent.prototype.fireEvent, "parameters", {get: function() {
    return [[assert.type.string]];
  }});
Object.defineProperty(DecoratorEmitingEvent.prototype.onEvent, "parameters", {get: function() {
    return [[assert.type.string]];
  }});
class DecoratorListeningEvent {
  constructor() {
    this.msg = '';
  }
  onEvent(msg) {
    this.msg = msg;
  }
}
Object.defineProperty(DecoratorListeningEvent, "annotations", {get: function() {
    return [new Decorator({
      selector: '[listener]',
      events: {'event': 'onEvent($event)'}
    })];
  }});
Object.defineProperty(DecoratorListeningEvent.prototype.onEvent, "parameters", {get: function() {
    return [[assert.type.string]];
  }});

//# sourceMappingURL=/Users/crush/Documents/learning_js/angular/modules/angular2/test/core/compiler/integration_spec.map

//# sourceMappingURL=./integration_spec.map