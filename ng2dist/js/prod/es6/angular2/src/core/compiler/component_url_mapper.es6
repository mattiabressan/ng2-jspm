import {Type,
  isPresent} from 'angular2/src/facade/lang';
import {Map,
  MapWrapper} from 'angular2/src/facade/collection';
export class ComponentUrlMapper {
  getUrl(component) {
    return './';
  }
}
Object.defineProperty(ComponentUrlMapper.prototype.getUrl, "parameters", {get: function() {
    return [[Type]];
  }});
export class RuntimeComponentUrlMapper extends ComponentUrlMapper {
  constructor() {
    super();
    this._componentUrls = MapWrapper.create();
  }
  setComponentUrl(component, url) {
    MapWrapper.set(this._componentUrls, component, url);
  }
  getUrl(component) {
    var url = MapWrapper.get(this._componentUrls, component);
    if (isPresent(url))
      return url;
    return super.getUrl(component);
  }
}
Object.defineProperty(RuntimeComponentUrlMapper.prototype.setComponentUrl, "parameters", {get: function() {
    return [[Type], [assert.type.string]];
  }});
Object.defineProperty(RuntimeComponentUrlMapper.prototype.getUrl, "parameters", {get: function() {
    return [[Type]];
  }});

//# sourceMappingURL=/Users/crush/Documents/learning_js/angular/modules/angular2/src/core/compiler/component_url_mapper.map

//# sourceMappingURL=./component_url_mapper.map