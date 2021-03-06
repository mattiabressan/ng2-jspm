var parse5Adapter = require('angular2/src/dom/parse5_adapter');
parse5Adapter.Parse5DomAdapter.makeCurrent();
"use strict";
Object.defineProperties(module.exports, {
  main: {get: function() {
      return main;
    }},
  __esModule: {value: true}
});
var __moduleName = "angular2/test/core/compiler/integration_spec";
var $__rtts_95_assert_47_rtts_95_assert__,
    $__angular2_47_test_95_lib__,
    $__angular2_47_src_47_dom_47_dom_95_adapter__,
    $__angular2_47_src_47_facade_47_lang__,
    $__angular2_47_src_47_facade_47_async__,
    $__angular2_47_di__,
    $__angular2_47_change_95_detection__,
    $__angular2_47_src_47_core_47_compiler_47_compiler__,
    $__angular2_47_src_47_core_47_compiler_47_directive_95_metadata_95_reader__,
    $__angular2_47_src_47_core_47_compiler_47_shadow_95_dom_95_strategy__,
    $__angular2_47_src_47_core_47_compiler_47_template_95_loader__,
    $__angular2_47_src_47_mock_47_template_95_resolver_95_mock__,
    $__angular2_47_src_47_core_47_compiler_47_binding_95_propagation_95_config__,
    $__angular2_47_src_47_core_47_compiler_47_component_95_url_95_mapper__,
    $__angular2_47_src_47_core_47_compiler_47_url_95_resolver__,
    $__angular2_47_src_47_core_47_compiler_47_style_95_url_95_resolver__,
    $__angular2_47_src_47_core_47_compiler_47_css_95_processor__,
    $__angular2_47_src_47_core_47_annotations_47_annotations__,
    $__angular2_47_src_47_core_47_annotations_47_template__,
    $__angular2_47_src_47_core_47_annotations_47_visibility__,
    $__angular2_47_src_47_core_47_annotations_47_di__,
    $__angular2_47_src_47_directives_47_if__,
    $__angular2_47_src_47_core_47_compiler_47_view_95_container__,
    $__angular2_47_src_47_reflection_47_reflection__;
var assert = ($__rtts_95_assert_47_rtts_95_assert__ = require("rtts_assert/rtts_assert"), $__rtts_95_assert_47_rtts_95_assert__ && $__rtts_95_assert_47_rtts_95_assert__.__esModule && $__rtts_95_assert_47_rtts_95_assert__ || {default: $__rtts_95_assert_47_rtts_95_assert__}).assert;
var $__1 = ($__angular2_47_test_95_lib__ = require("angular2/test_lib"), $__angular2_47_test_95_lib__ && $__angular2_47_test_95_lib__.__esModule && $__angular2_47_test_95_lib__ || {default: $__angular2_47_test_95_lib__}),
    describe = $__1.describe,
    xit = $__1.xit,
    it = $__1.it,
    expect = $__1.expect,
    beforeEach = $__1.beforeEach,
    ddescribe = $__1.ddescribe,
    iit = $__1.iit,
    el = $__1.el;
var DOM = ($__angular2_47_src_47_dom_47_dom_95_adapter__ = require("angular2/src/dom/dom_adapter"), $__angular2_47_src_47_dom_47_dom_95_adapter__ && $__angular2_47_src_47_dom_47_dom_95_adapter__.__esModule && $__angular2_47_src_47_dom_47_dom_95_adapter__ || {default: $__angular2_47_src_47_dom_47_dom_95_adapter__}).DOM;
var $__3 = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}),
    Type = $__3.Type,
    isPresent = $__3.isPresent,
    BaseException = $__3.BaseException,
    assertionsEnabled = $__3.assertionsEnabled,
    isJsObject = $__3.isJsObject;
var PromiseWrapper = ($__angular2_47_src_47_facade_47_async__ = require("angular2/src/facade/async"), $__angular2_47_src_47_facade_47_async__ && $__angular2_47_src_47_facade_47_async__.__esModule && $__angular2_47_src_47_facade_47_async__ || {default: $__angular2_47_src_47_facade_47_async__}).PromiseWrapper;
var Injector = ($__angular2_47_di__ = require("angular2/di"), $__angular2_47_di__ && $__angular2_47_di__.__esModule && $__angular2_47_di__ || {default: $__angular2_47_di__}).Injector;
var $__6 = ($__angular2_47_change_95_detection__ = require("angular2/change_detection"), $__angular2_47_change_95_detection__ && $__angular2_47_change_95_detection__.__esModule && $__angular2_47_change_95_detection__ || {default: $__angular2_47_change_95_detection__}),
    Lexer = $__6.Lexer,
    Parser = $__6.Parser,
    dynamicChangeDetection = $__6.dynamicChangeDetection,
    DynamicChangeDetection = $__6.DynamicChangeDetection,
    Pipe = $__6.Pipe,
    PipeRegistry = $__6.PipeRegistry;
var $__7 = ($__angular2_47_src_47_core_47_compiler_47_compiler__ = require("angular2/src/core/compiler/compiler"), $__angular2_47_src_47_core_47_compiler_47_compiler__ && $__angular2_47_src_47_core_47_compiler_47_compiler__.__esModule && $__angular2_47_src_47_core_47_compiler_47_compiler__ || {default: $__angular2_47_src_47_core_47_compiler_47_compiler__}),
    Compiler = $__7.Compiler,
    CompilerCache = $__7.CompilerCache;
var DirectiveMetadataReader = ($__angular2_47_src_47_core_47_compiler_47_directive_95_metadata_95_reader__ = require("angular2/src/core/compiler/directive_metadata_reader"), $__angular2_47_src_47_core_47_compiler_47_directive_95_metadata_95_reader__ && $__angular2_47_src_47_core_47_compiler_47_directive_95_metadata_95_reader__.__esModule && $__angular2_47_src_47_core_47_compiler_47_directive_95_metadata_95_reader__ || {default: $__angular2_47_src_47_core_47_compiler_47_directive_95_metadata_95_reader__}).DirectiveMetadataReader;
var NativeShadowDomStrategy = ($__angular2_47_src_47_core_47_compiler_47_shadow_95_dom_95_strategy__ = require("angular2/src/core/compiler/shadow_dom_strategy"), $__angular2_47_src_47_core_47_compiler_47_shadow_95_dom_95_strategy__ && $__angular2_47_src_47_core_47_compiler_47_shadow_95_dom_95_strategy__.__esModule && $__angular2_47_src_47_core_47_compiler_47_shadow_95_dom_95_strategy__ || {default: $__angular2_47_src_47_core_47_compiler_47_shadow_95_dom_95_strategy__}).NativeShadowDomStrategy;
var TemplateLoader = ($__angular2_47_src_47_core_47_compiler_47_template_95_loader__ = require("angular2/src/core/compiler/template_loader"), $__angular2_47_src_47_core_47_compiler_47_template_95_loader__ && $__angular2_47_src_47_core_47_compiler_47_template_95_loader__.__esModule && $__angular2_47_src_47_core_47_compiler_47_template_95_loader__ || {default: $__angular2_47_src_47_core_47_compiler_47_template_95_loader__}).TemplateLoader;
var MockTemplateResolver = ($__angular2_47_src_47_mock_47_template_95_resolver_95_mock__ = require("angular2/src/mock/template_resolver_mock"), $__angular2_47_src_47_mock_47_template_95_resolver_95_mock__ && $__angular2_47_src_47_mock_47_template_95_resolver_95_mock__.__esModule && $__angular2_47_src_47_mock_47_template_95_resolver_95_mock__ || {default: $__angular2_47_src_47_mock_47_template_95_resolver_95_mock__}).MockTemplateResolver;
var BindingPropagationConfig = ($__angular2_47_src_47_core_47_compiler_47_binding_95_propagation_95_config__ = require("angular2/src/core/compiler/binding_propagation_config"), $__angular2_47_src_47_core_47_compiler_47_binding_95_propagation_95_config__ && $__angular2_47_src_47_core_47_compiler_47_binding_95_propagation_95_config__.__esModule && $__angular2_47_src_47_core_47_compiler_47_binding_95_propagation_95_config__ || {default: $__angular2_47_src_47_core_47_compiler_47_binding_95_propagation_95_config__}).BindingPropagationConfig;
var ComponentUrlMapper = ($__angular2_47_src_47_core_47_compiler_47_component_95_url_95_mapper__ = require("angular2/src/core/compiler/component_url_mapper"), $__angular2_47_src_47_core_47_compiler_47_component_95_url_95_mapper__ && $__angular2_47_src_47_core_47_compiler_47_component_95_url_95_mapper__.__esModule && $__angular2_47_src_47_core_47_compiler_47_component_95_url_95_mapper__ || {default: $__angular2_47_src_47_core_47_compiler_47_component_95_url_95_mapper__}).ComponentUrlMapper;
var UrlResolver = ($__angular2_47_src_47_core_47_compiler_47_url_95_resolver__ = require("angular2/src/core/compiler/url_resolver"), $__angular2_47_src_47_core_47_compiler_47_url_95_resolver__ && $__angular2_47_src_47_core_47_compiler_47_url_95_resolver__.__esModule && $__angular2_47_src_47_core_47_compiler_47_url_95_resolver__ || {default: $__angular2_47_src_47_core_47_compiler_47_url_95_resolver__}).UrlResolver;
var StyleUrlResolver = ($__angular2_47_src_47_core_47_compiler_47_style_95_url_95_resolver__ = require("angular2/src/core/compiler/style_url_resolver"), $__angular2_47_src_47_core_47_compiler_47_style_95_url_95_resolver__ && $__angular2_47_src_47_core_47_compiler_47_style_95_url_95_resolver__.__esModule && $__angular2_47_src_47_core_47_compiler_47_style_95_url_95_resolver__ || {default: $__angular2_47_src_47_core_47_compiler_47_style_95_url_95_resolver__}).StyleUrlResolver;
var CssProcessor = ($__angular2_47_src_47_core_47_compiler_47_css_95_processor__ = require("angular2/src/core/compiler/css_processor"), $__angular2_47_src_47_core_47_compiler_47_css_95_processor__ && $__angular2_47_src_47_core_47_compiler_47_css_95_processor__.__esModule && $__angular2_47_src_47_core_47_compiler_47_css_95_processor__ || {default: $__angular2_47_src_47_core_47_compiler_47_css_95_processor__}).CssProcessor;
var $__17 = ($__angular2_47_src_47_core_47_annotations_47_annotations__ = require("angular2/src/core/annotations/annotations"), $__angular2_47_src_47_core_47_annotations_47_annotations__ && $__angular2_47_src_47_core_47_annotations_47_annotations__.__esModule && $__angular2_47_src_47_core_47_annotations_47_annotations__ || {default: $__angular2_47_src_47_core_47_annotations_47_annotations__}),
    Decorator = $__17.Decorator,
    Component = $__17.Component,
    Viewport = $__17.Viewport;
var Template = ($__angular2_47_src_47_core_47_annotations_47_template__ = require("angular2/src/core/annotations/template"), $__angular2_47_src_47_core_47_annotations_47_template__ && $__angular2_47_src_47_core_47_annotations_47_template__.__esModule && $__angular2_47_src_47_core_47_annotations_47_template__ || {default: $__angular2_47_src_47_core_47_annotations_47_template__}).Template;
var $__19 = ($__angular2_47_src_47_core_47_annotations_47_visibility__ = require("angular2/src/core/annotations/visibility"), $__angular2_47_src_47_core_47_annotations_47_visibility__ && $__angular2_47_src_47_core_47_annotations_47_visibility__.__esModule && $__angular2_47_src_47_core_47_annotations_47_visibility__ || {default: $__angular2_47_src_47_core_47_annotations_47_visibility__}),
    Parent = $__19.Parent,
    Ancestor = $__19.Ancestor;
var EventEmitter = ($__angular2_47_src_47_core_47_annotations_47_di__ = require("angular2/src/core/annotations/di"), $__angular2_47_src_47_core_47_annotations_47_di__ && $__angular2_47_src_47_core_47_annotations_47_di__.__esModule && $__angular2_47_src_47_core_47_annotations_47_di__ || {default: $__angular2_47_src_47_core_47_annotations_47_di__}).EventEmitter;
var If = ($__angular2_47_src_47_directives_47_if__ = require("angular2/src/directives/if"), $__angular2_47_src_47_directives_47_if__ && $__angular2_47_src_47_directives_47_if__.__esModule && $__angular2_47_src_47_directives_47_if__ || {default: $__angular2_47_src_47_directives_47_if__}).If;
var ViewContainer = ($__angular2_47_src_47_core_47_compiler_47_view_95_container__ = require("angular2/src/core/compiler/view_container"), $__angular2_47_src_47_core_47_compiler_47_view_95_container__ && $__angular2_47_src_47_core_47_compiler_47_view_95_container__.__esModule && $__angular2_47_src_47_core_47_compiler_47_view_95_container__ || {default: $__angular2_47_src_47_core_47_compiler_47_view_95_container__}).ViewContainer;
var reflector = ($__angular2_47_src_47_reflection_47_reflection__ = require("angular2/src/reflection/reflection"), $__angular2_47_src_47_reflection_47_reflection__ && $__angular2_47_src_47_reflection_47_reflection__.__esModule && $__angular2_47_src_47_reflection_47_reflection__ || {default: $__angular2_47_src_47_reflection_47_reflection__}).reflector;
function main() {
  describe('integration tests', function() {
    var compiler,
        tplResolver;
    function createCompiler(tplResolver, changedDetection) {
      var urlResolver = new UrlResolver();
      return new Compiler(changedDetection, new TemplateLoader(null, null), new DirectiveMetadataReader(), new Parser(new Lexer()), new CompilerCache(), new NativeShadowDomStrategy(new StyleUrlResolver(urlResolver)), tplResolver, new ComponentUrlMapper(), urlResolver, new CssProcessor(null));
    }
    beforeEach((function() {
      tplResolver = new MockTemplateResolver();
      compiler = createCompiler(tplResolver, dynamicChangeDetection);
    }));
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
      it('should consume text node changes', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({inline: '<div>{{ctxProp}}</div>'}));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          ctx.ctxProp = 'Hello World!';
          cd.detectChanges();
          expect(DOM.getInnerHTML(view.nodes[0])).toEqual('Hello World!');
          done();
        }));
      }));
      it('should consume element binding changes', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({inline: '<div [id]="ctxProp"></div>'}));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          ctx.ctxProp = 'Hello World!';
          cd.detectChanges();
          expect(view.nodes[0].id).toEqual('Hello World!');
          done();
        }));
      }));
      it('should consume binding to aria-* attributes', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({inline: '<div [aria-label]="ctxProp"></div>'}));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          ctx.ctxProp = 'Initial aria label';
          cd.detectChanges();
          expect(DOM.getAttribute(view.nodes[0], 'aria-label')).toEqual('Initial aria label');
          ctx.ctxProp = 'Changed aria label';
          cd.detectChanges();
          expect(DOM.getAttribute(view.nodes[0], 'aria-label')).toEqual('Changed aria label');
          done();
        }));
      }));
      it('should consume binding to property names where attr name and property name do not match', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({inline: '<div [tabindex]="ctxNumProp"></div>'}));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(view.nodes[0].tabIndex).toEqual(0);
          ctx.ctxNumProp = 5;
          cd.detectChanges();
          expect(view.nodes[0].tabIndex).toEqual(5);
          done();
        }));
      }));
      it('should consume binding to inner-html', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({inline: '<div inner-html="{{ctxProp}}"></div>'}));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          ctx.ctxProp = 'Some <span>HTML</span>';
          cd.detectChanges();
          expect(DOM.getInnerHTML(view.nodes[0])).toEqual('Some <span>HTML</span>');
          ctx.ctxProp = 'Some other <div>HTML</div>';
          cd.detectChanges();
          expect(DOM.getInnerHTML(view.nodes[0])).toEqual('Some other <div>HTML</div>');
          done();
        }));
      }));
      it('should consume directive watch expression change.', (function(done) {
        var tpl = '<div>' + '<div my-dir [elprop]="ctxProp"></div>' + '<div my-dir elprop="Hi there!"></div>' + '<div my-dir elprop="Hi {{\'there!\'}}"></div>' + '<div my-dir elprop="One more {{ctxProp}}"></div>' + '</div>';
        tplResolver.setTemplate(MyComp, new Template({
          inline: tpl,
          directives: [MyDir]
        }));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          ctx.ctxProp = 'Hello World!';
          cd.detectChanges();
          expect(view.elementInjectors[0].get(MyDir).dirProp).toEqual('Hello World!');
          expect(view.elementInjectors[1].get(MyDir).dirProp).toEqual('Hi there!');
          expect(view.elementInjectors[2].get(MyDir).dirProp).toEqual('Hi there!');
          expect(view.elementInjectors[3].get(MyDir).dirProp).toEqual('One more Hello World!');
          done();
        }));
      }));
      it("should support pipes in bindings and bind config", (function(done) {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<component-with-pipes #comp [prop]="ctxProp | double"></component-with-pipes>',
          directives: [ComponentWithPipes]
        }));
        var registry = new PipeRegistry({"double": [new DoublePipeFactory()]});
        var changeDetection = new DynamicChangeDetection(registry);
        var compiler = createCompiler(tplResolver, changeDetection);
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          ctx.ctxProp = 'a';
          cd.detectChanges();
          var comp = view.contextWithLocals.get("comp");
          expect(comp.prop).toEqual('aaaa');
          done();
        }));
      }));
      it('should support nested components.', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<child-cmp></child-cmp>',
          directives: [ChildComp]
        }));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(view.nodes[0].shadowRoot.childNodes[0].nodeValue).toEqual('hello');
          done();
        }));
      }));
      it('should support different directive types on a single node', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<child-cmp my-dir [elprop]="ctxProp"></child-cmp>',
          directives: [MyDir, ChildComp]
        }));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          ctx.ctxProp = 'Hello World!';
          cd.detectChanges();
          var elInj = view.elementInjectors[0];
          expect(elInj.get(MyDir).dirProp).toEqual('Hello World!');
          expect(elInj.get(ChildComp).dirProp).toEqual(null);
          done();
        }));
      }));
      it('should support directives where a binding attribute is not given', function(done) {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<p my-dir></p>',
          directives: [MyDir]
        }));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          done();
        }));
      });
      it('should support template directives via `<template>` elements.', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<div><template some-viewport var-greeting="some-tmpl"><copy-me>{{greeting}}</copy-me></template></div>',
          directives: [SomeViewport]
        }));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          var childNodesOfWrapper = view.nodes[0].childNodes;
          expect(childNodesOfWrapper.length).toBe(3);
          expect(childNodesOfWrapper[1].childNodes[0].nodeValue).toEqual('hello');
          expect(childNodesOfWrapper[2].childNodes[0].nodeValue).toEqual('again');
          done();
        }));
      }));
      it('should support template directives via `template` attribute.', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<div><copy-me template="some-viewport: var greeting=some-tmpl">{{greeting}}</copy-me></div>',
          directives: [SomeViewport]
        }));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          var childNodesOfWrapper = view.nodes[0].childNodes;
          expect(childNodesOfWrapper.length).toBe(3);
          expect(childNodesOfWrapper[1].childNodes[0].nodeValue).toEqual('hello');
          expect(childNodesOfWrapper[2].childNodes[0].nodeValue).toEqual('again');
          done();
        }));
      }));
      it('should assign the component instance to a var-', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<p><child-cmp var-alice></child-cmp></p>',
          directives: [ChildComp]
        }));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          expect(view.contextWithLocals).not.toBe(null);
          expect(view.contextWithLocals.get('alice')).toBeAnInstanceOf(ChildComp);
          done();
        }));
      }));
      it('should assign two component instances each with a var-', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<p><child-cmp var-alice></child-cmp><child-cmp var-bob></p>',
          directives: [ChildComp]
        }));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          expect(view.contextWithLocals).not.toBe(null);
          expect(view.contextWithLocals.get('alice')).toBeAnInstanceOf(ChildComp);
          expect(view.contextWithLocals.get('bob')).toBeAnInstanceOf(ChildComp);
          expect(view.contextWithLocals.get('alice')).not.toBe(view.contextWithLocals.get('bob'));
          done();
        }));
      }));
      it('should assign the component instance to a var- with shorthand syntax', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<child-cmp #alice></child-cmp>',
          directives: [ChildComp]
        }));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          expect(view.contextWithLocals).not.toBe(null);
          expect(view.contextWithLocals.get('alice')).toBeAnInstanceOf(ChildComp);
          done();
        }));
      }));
      it('should assign the element instance to a user-defined variable', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({inline: '<p><div var-alice><i>Hello</i></div></p>'}));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          expect(view.contextWithLocals).not.toBe(null);
          var value = view.contextWithLocals.get('alice');
          expect(value).not.toBe(null);
          expect(value.tagName.toLowerCase()).toEqual('div');
          done();
        }));
      }));
      it('should provide binding configuration config to the component', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<push-cmp #cmp></push-cmp>',
          directives: [[[PushBasedComp]]]
        }));
        compiler.compile(MyComp).then((function(pv) {
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
        }));
      }));
      it('should create a component that injects a @Parent', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<some-directive><cmp-with-parent #child></cmp-with-parent></some-directive>',
          directives: [SomeDirective, CompWithParent]
        }));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          var childComponent = view.contextWithLocals.get('child');
          expect(childComponent.myParent).toBeAnInstanceOf(SomeDirective);
          done();
        }));
      }));
      it('should create a component that injects an @Ancestor', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({
          inline: "\n            <some-directive>\n              <p>\n                <cmp-with-ancestor #child></cmp-with-ancestor>\n              </p>\n            </some-directive>",
          directives: [SomeDirective, CompWithAncestor]
        }));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          var childComponent = view.contextWithLocals.get('child');
          expect(childComponent.myAncestor).toBeAnInstanceOf(SomeDirective);
          done();
        }));
      }));
      it('should create a component that injects an @Ancestor through viewport directive', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({
          inline: "\n            <some-directive>\n              <p *if=\"true\">\n                <cmp-with-ancestor #child></cmp-with-ancestor>\n              </p>\n            </some-directive>",
          directives: [SomeDirective, CompWithAncestor, If]
        }));
        compiler.compile(MyComp).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          var subview = view.viewContainers[0].get(0);
          var childComponent = subview.contextWithLocals.get('child');
          expect(childComponent.myAncestor).toBeAnInstanceOf(SomeDirective);
          done();
        }));
      }));
      it('should support events', (function(done) {
        tplResolver.setTemplate(MyComp, new Template({
          inline: '<div emitter listener></div>',
          directives: [DecoratorEmitingEvent, DecoratorListeningEvent]
        }));
        compiler.compile(MyComp).then((function(pv) {
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
        }));
      }));
    });
    if (assertionsEnabled()) {
      var expectCompileError = function(inlineTpl, errMessage, done) {
        tplResolver.setTemplate(MyComp, new Template({inline: inlineTpl}));
        PromiseWrapper.then(compiler.compile(MyComp), (function(value) {
          done("Test failure: should not have come here as an exception was expected");
        }), (function(err) {
          expect(err.message).toEqual(errMessage);
          done();
        }));
      };
      it('should raise an error if no directive is registered for an unsupported DOM property', (function(done) {
        expectCompileError('<div [some-prop]="foo"></div>', 'Missing directive to handle \'some-prop\' in MyComp: <div [some-prop]="foo">', done);
      }));
      it('should raise an error if no directive is registered for a template with template bindings', (function(done) {
        expectCompileError('<div><div template="if: foo"></div></div>', 'Missing directive to handle \'if\' in <div template="if: foo">', done);
      }));
      it('should raise an error for missing template directive (1)', (function(done) {
        expectCompileError('<div><template foo></template></div>', 'Missing directive to handle: <template foo>', done);
      }));
      it('should raise an error for missing template directive (2)', (function(done) {
        expectCompileError('<div><template *if="condition"></template></div>', 'Missing directive to handle: <template *if="condition">', done);
      }));
      it('should raise an error for missing template directive (3)', (function(done) {
        expectCompileError('<div *if="condition"></div>', 'Missing directive to handle \'if\' in MyComp: <div *if="condition">', done);
      }));
    }
  });
}
var MyDir = function MyDir() {
  this.dirProp = '';
};
($traceurRuntime.createClass)(MyDir, {}, {});
Object.defineProperty(MyDir, "annotations", {get: function() {
    return [new Decorator({
      selector: '[my-dir]',
      bind: {'dirProp': 'elprop'}
    })];
  }});
var PushBasedComp = function PushBasedComp(bpc) {
  assert.argumentTypes(bpc, BindingPropagationConfig);
  this.numberOfChecks = 0;
  this.bpc = bpc;
  bpc.shouldBePropagated();
};
($traceurRuntime.createClass)(PushBasedComp, {
  get field() {
    this.numberOfChecks++;
    return "fixed";
  },
  propagate: function() {
    this.bpc.shouldBePropagatedFromRoot();
  }
}, {});
Object.defineProperty(PushBasedComp, "annotations", {get: function() {
    return [new Component({selector: 'push-cmp'}), new Template({inline: '{{field}}'})];
  }});
Object.defineProperty(PushBasedComp, "parameters", {get: function() {
    return [[BindingPropagationConfig]];
  }});
var MyComp = function MyComp() {
  this.ctxProp = 'initial value';
  this.ctxNumProp = 0;
};
($traceurRuntime.createClass)(MyComp, {}, {});
Object.defineProperty(MyComp, "annotations", {get: function() {
    return [new Component()];
  }});
var ComponentWithPipes = function ComponentWithPipes() {};
($traceurRuntime.createClass)(ComponentWithPipes, {}, {});
Object.defineProperty(ComponentWithPipes, "annotations", {get: function() {
    return [new Component({
      selector: 'component-with-pipes',
      bind: {"prop": "prop | double"}
    }), new Template({inline: ''})];
  }});
var ChildComp = function ChildComp(service) {
  assert.argumentTypes(service, MyService);
  this.ctxProp = service.greeting;
  this.dirProp = null;
};
($traceurRuntime.createClass)(ChildComp, {}, {});
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
var SomeDirective = function SomeDirective() {};
($traceurRuntime.createClass)(SomeDirective, {}, {});
Object.defineProperty(SomeDirective, "annotations", {get: function() {
    return [new Decorator({selector: 'some-directive'})];
  }});
var CompWithParent = function CompWithParent(someComp) {
  assert.argumentTypes(someComp, SomeDirective);
  this.myParent = someComp;
};
($traceurRuntime.createClass)(CompWithParent, {}, {});
Object.defineProperty(CompWithParent, "annotations", {get: function() {
    return [new Component({selector: 'cmp-with-parent'}), new Template({
      inline: '<p>Component with an injected parent</p>',
      directives: [SomeDirective]
    })];
  }});
Object.defineProperty(CompWithParent, "parameters", {get: function() {
    return [[SomeDirective, new Parent()]];
  }});
var CompWithAncestor = function CompWithAncestor(someComp) {
  assert.argumentTypes(someComp, SomeDirective);
  this.myAncestor = someComp;
};
($traceurRuntime.createClass)(CompWithAncestor, {}, {});
Object.defineProperty(CompWithAncestor, "annotations", {get: function() {
    return [new Component({selector: 'cmp-with-ancestor'}), new Template({
      inline: '<p>Component with an injected ancestor</p>',
      directives: [SomeDirective]
    })];
  }});
Object.defineProperty(CompWithAncestor, "parameters", {get: function() {
    return [[SomeDirective, new Ancestor()]];
  }});
var ChildComp2 = function ChildComp2(service) {
  assert.argumentTypes(service, MyService);
  this.ctxProp = service.greeting;
  this.dirProp = null;
};
($traceurRuntime.createClass)(ChildComp2, {}, {});
Object.defineProperty(ChildComp2, "annotations", {get: function() {
    return [new Component({
      selector: '[child-cmp2]',
      componentServices: [MyService]
    })];
  }});
Object.defineProperty(ChildComp2, "parameters", {get: function() {
    return [[MyService]];
  }});
var SomeViewport = function SomeViewport(container) {
  assert.argumentTypes(container, ViewContainer);
  container.create().setLocal('some-tmpl', 'hello');
  container.create().setLocal('some-tmpl', 'again');
};
($traceurRuntime.createClass)(SomeViewport, {}, {});
Object.defineProperty(SomeViewport, "annotations", {get: function() {
    return [new Viewport({selector: '[some-viewport]'})];
  }});
Object.defineProperty(SomeViewport, "parameters", {get: function() {
    return [[ViewContainer]];
  }});
var MyService = function MyService() {
  this.greeting = 'hello';
};
($traceurRuntime.createClass)(MyService, {}, {});
var DoublePipe = function DoublePipe() {
  $traceurRuntime.superConstructor($DoublePipe).apply(this, arguments);
};
var $DoublePipe = DoublePipe;
($traceurRuntime.createClass)(DoublePipe, {
  supports: function(obj) {
    return true;
  },
  transform: function(value) {
    return ("" + value + value);
  }
}, {}, Pipe);
var DoublePipeFactory = function DoublePipeFactory() {};
($traceurRuntime.createClass)(DoublePipeFactory, {
  supports: function(obj) {
    return true;
  },
  create: function() {
    return new DoublePipe();
  }
}, {});
var DecoratorEmitingEvent = function DecoratorEmitingEvent(emitter) {
  assert.argumentTypes(emitter, Function);
  this.msg = '';
  this.emitter = emitter;
};
($traceurRuntime.createClass)(DecoratorEmitingEvent, {
  fireEvent: function(msg) {
    assert.argumentTypes(msg, assert.type.string);
    this.emitter(msg);
  },
  onEvent: function(msg) {
    assert.argumentTypes(msg, assert.type.string);
    this.msg = msg;
  }
}, {});
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
var DecoratorListeningEvent = function DecoratorListeningEvent() {
  this.msg = '';
};
($traceurRuntime.createClass)(DecoratorListeningEvent, {onEvent: function(msg) {
    assert.argumentTypes(msg, assert.type.string);
    this.msg = msg;
  }}, {});
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
 main();