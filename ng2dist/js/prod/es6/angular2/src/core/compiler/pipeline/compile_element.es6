import {List,
  Map,
  ListWrapper,
  MapWrapper} from 'angular2/src/facade/collection';
import {DOM} from 'angular2/src/dom/dom_adapter';
import {int,
  isBlank,
  isPresent,
  Type,
  StringJoiner,
  assertionsEnabled} from 'angular2/src/facade/lang';
import {DirectiveMetadata} from '../directive_metadata';
import {Decorator,
  Component,
  Viewport} from '../../annotations/annotations';
import {ElementBinder} from '../element_binder';
import {ProtoElementInjector} from '../element_injector';
import {ProtoView} from '../view';
import {AST} from 'angular2/change_detection';
export class CompileElement {
  constructor(element, compilationUnit = '') {
    this.element = element;
    this._attrs = null;
    this._classList = null;
    this.textNodeBindings = null;
    this.propertyBindings = null;
    this.eventBindings = null;
    this.variableBindings = null;
    this.decoratorDirectives = null;
    this.viewportDirective = null;
    this.componentDirective = null;
    this._allDirectives = null;
    this.isViewRoot = false;
    this.hasBindings = false;
    this.inheritedProtoView = null;
    this.inheritedProtoElementInjector = null;
    this.inheritedElementBinder = null;
    this.distanceToParentInjector = 0;
    this.compileChildren = true;
    this.ignoreBindings = false;
    var tplDesc = assertionsEnabled() ? getElementDescription(element) : null;
    if (compilationUnit !== '') {
      this.elementDescription = compilationUnit;
      if (isPresent(tplDesc))
        this.elementDescription += ": " + tplDesc;
    } else {
      this.elementDescription = tplDesc;
    }
  }
  refreshAttrs() {
    this._attrs = null;
  }
  attrs() {
    if (isBlank(this._attrs)) {
      this._attrs = DOM.attributeMap(this.element);
    }
    return this._attrs;
  }
  refreshClassList() {
    this._classList = null;
  }
  classList() {
    if (isBlank(this._classList)) {
      this._classList = ListWrapper.create();
      var elClassList = DOM.classList(this.element);
      for (var i = 0; i < elClassList.length; i++) {
        ListWrapper.push(this._classList, elClassList[i]);
      }
    }
    return this._classList;
  }
  addTextNodeBinding(indexInParent, expression) {
    if (isBlank(this.textNodeBindings)) {
      this.textNodeBindings = MapWrapper.create();
    }
    MapWrapper.set(this.textNodeBindings, indexInParent, expression);
  }
  addPropertyBinding(property, expression) {
    if (isBlank(this.propertyBindings)) {
      this.propertyBindings = MapWrapper.create();
    }
    MapWrapper.set(this.propertyBindings, property, expression);
  }
  addVariableBinding(variableName, variableValue) {
    if (isBlank(this.variableBindings)) {
      this.variableBindings = MapWrapper.create();
    }
    MapWrapper.set(this.variableBindings, variableValue, variableName);
  }
  addEventBinding(eventName, expression) {
    if (isBlank(this.eventBindings)) {
      this.eventBindings = MapWrapper.create();
    }
    MapWrapper.set(this.eventBindings, eventName, expression);
  }
  addDirective(directive) {
    var annotation = directive.annotation;
    this._allDirectives = null;
    if (annotation instanceof Decorator) {
      if (isBlank(this.decoratorDirectives)) {
        this.decoratorDirectives = ListWrapper.create();
      }
      ListWrapper.push(this.decoratorDirectives, directive);
      if (!annotation.compileChildren) {
        this.compileChildren = false;
      }
    } else if (annotation instanceof Viewport) {
      this.viewportDirective = directive;
    } else if (annotation instanceof Component) {
      this.componentDirective = directive;
    }
  }
  getAllDirectives() {
    if (this._allDirectives === null) {
      var directives = ListWrapper.create();
      if (isPresent(this.componentDirective)) {
        ListWrapper.push(directives, this.componentDirective);
      }
      if (isPresent(this.viewportDirective)) {
        ListWrapper.push(directives, this.viewportDirective);
      }
      if (isPresent(this.decoratorDirectives)) {
        directives = ListWrapper.concat(directives, this.decoratorDirectives);
      }
      this._allDirectives = directives;
    }
    return this._allDirectives;
  }
}
Object.defineProperty(CompileElement.prototype.addTextNodeBinding, "parameters", {get: function() {
    return [[int], [AST]];
  }});
Object.defineProperty(CompileElement.prototype.addPropertyBinding, "parameters", {get: function() {
    return [[assert.type.string], [AST]];
  }});
Object.defineProperty(CompileElement.prototype.addVariableBinding, "parameters", {get: function() {
    return [[assert.type.string], [assert.type.string]];
  }});
Object.defineProperty(CompileElement.prototype.addEventBinding, "parameters", {get: function() {
    return [[assert.type.string], [AST]];
  }});
Object.defineProperty(CompileElement.prototype.addDirective, "parameters", {get: function() {
    return [[DirectiveMetadata]];
  }});
function getElementDescription(domElement) {
  var buf = new StringJoiner();
  var atts = DOM.attributeMap(domElement);
  buf.add("<");
  buf.add(DOM.tagName(domElement).toLowerCase());
  addDescriptionAttribute(buf, "id", MapWrapper.get(atts, "id"));
  addDescriptionAttribute(buf, "class", MapWrapper.get(atts, "class"));
  MapWrapper.forEach(atts, (attValue, attName) => {
    if (attName !== "id" && attName !== "class") {
      addDescriptionAttribute(buf, attName, attValue);
    }
  });
  buf.add(">");
  return buf.toString();
}
function addDescriptionAttribute(buffer, attName, attValue) {
  if (isPresent(attValue)) {
    if (attValue.length === 0) {
      buffer.add(' ' + attName);
    } else {
      buffer.add(' ' + attName + '="' + attValue + '"');
    }
  }
}
Object.defineProperty(addDescriptionAttribute, "parameters", {get: function() {
    return [[StringJoiner], [assert.type.string], []];
  }});

//# sourceMappingURL=/Users/crush/Documents/learning_js/angular/modules/angular2/src/core/compiler/pipeline/compile_element.map

//# sourceMappingURL=./compile_element.map