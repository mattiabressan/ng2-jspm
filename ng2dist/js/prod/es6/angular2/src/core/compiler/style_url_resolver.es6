import {RegExp,
  RegExpWrapper,
  StringWrapper} from 'angular2/src/facade/lang';
import {UrlResolver} from './url_resolver';
export class StyleUrlResolver {
  constructor(resolver) {
    this._resolver = resolver;
  }
  resolveUrls(cssText, baseUrl) {
    cssText = this._replaceUrls(cssText, _cssUrlRe, baseUrl);
    cssText = this._replaceUrls(cssText, _cssImportRe, baseUrl);
    return cssText;
  }
  _replaceUrls(cssText, re, baseUrl) {
    return StringWrapper.replaceAllMapped(cssText, re, (m) => {
      var pre = m[1];
      var url = StringWrapper.replaceAll(m[2], _quoteRe, '');
      var post = m[3];
      var resolvedUrl = this._resolver.resolve(baseUrl, url);
      return pre + "'" + resolvedUrl + "'" + post;
    });
  }
}
Object.defineProperty(StyleUrlResolver, "parameters", {get: function() {
    return [[UrlResolver]];
  }});
Object.defineProperty(StyleUrlResolver.prototype.resolveUrls, "parameters", {get: function() {
    return [[assert.type.string], [assert.type.string]];
  }});
Object.defineProperty(StyleUrlResolver.prototype._replaceUrls, "parameters", {get: function() {
    return [[assert.type.string], [RegExp], [assert.type.string]];
  }});
var _cssUrlRe = RegExpWrapper.create('(url\\()([^)]*)(\\))');
var _cssImportRe = RegExpWrapper.create('(@import[\\s]+(?!url\\())[\'"]([^\'"]*)[\'"](.*;)');
var _quoteRe = RegExpWrapper.create('[\'"]');

//# sourceMappingURL=/Users/crush/Documents/learning_js/angular/modules/angular2/src/core/compiler/style_url_resolver.map

//# sourceMappingURL=./style_url_resolver.map