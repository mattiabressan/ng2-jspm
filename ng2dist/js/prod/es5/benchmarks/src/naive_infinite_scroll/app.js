System.register(["angular2/src/facade/lang", "angular2/src/reflection/reflection", "angular2/src/test_lib/benchmark_util", "angular2/angular2", "angular2/src/facade/async", "angular2/src/facade/collection", "./scroll_area", "angular2/directives", "angular2/src/dom/dom_adapter", "angular2/src/facade/browser"], function($__export) {
  "use strict";
  var int,
      isPresent,
      reflector,
      getIntParameter,
      bindAction,
      bootstrap,
      Component,
      Viewport,
      Template,
      ViewContainer,
      Compiler,
      PromiseWrapper,
      ListWrapper,
      ScrollAreaComponent,
      If,
      Foreach,
      DOM,
      document,
      App;
  function setupReflectorForApp() {
    reflector.registerType(App, {
      'factory': (function() {
        return new App();
      }),
      'parameters': [],
      'annotations': [new Component({selector: 'scroll-app'}), new Template({
        directives: [ScrollAreaComponent, If, Foreach],
        inline: "\n          <div>\n            <div style=\"display: flex\">\n              <scroll-area id=\"testArea\"></scroll-area>\n            </div>\n            <div template=\"if scrollAreas.length > 0\">\n              <p>Following tables are only here to add weight to the UI:</p>\n              <scroll-area template=\"foreach #scrollArea in scrollAreas\"></scroll-area>\n            </div>\n          </div>"
      })]
    });
  }
  $__export("setupReflectorForApp", setupReflectorForApp);
  return {
    setters: [function($__m) {
      int = $__m.int;
      isPresent = $__m.isPresent;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      getIntParameter = $__m.getIntParameter;
      bindAction = $__m.bindAction;
    }, function($__m) {
      bootstrap = $__m.bootstrap;
      Component = $__m.Component;
      Viewport = $__m.Viewport;
      Template = $__m.Template;
      ViewContainer = $__m.ViewContainer;
      Compiler = $__m.Compiler;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      ScrollAreaComponent = $__m.ScrollAreaComponent;
    }, function($__m) {
      If = $__m.If;
      Foreach = $__m.Foreach;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      document = $__m.document;
    }],
    execute: function() {
      App = $__export("App", (function() {
        var App = function App() {
          var $__0 = this;
          var appSize = getIntParameter('appSize');
          this.iterationCount = getIntParameter('iterationCount');
          this.scrollIncrement = getIntParameter('scrollIncrement');
          appSize = appSize > 1 ? appSize - 1 : 0;
          this.scrollAreas = [];
          for (var i = 0; i < appSize; i++) {
            ListWrapper.push(this.scrollAreas, i);
          }
          bindAction('#run-btn', (function() {
            $__0.runBenchmark();
          }));
          bindAction('#reset-btn', (function() {
            $__0._getScrollDiv().scrollTop = 0;
            var existingMarker = $__0._locateFinishedMarker();
            if (isPresent(existingMarker)) {
              DOM.removeChild(document.body, existingMarker);
            }
          }));
        };
        return ($traceurRuntime.createClass)(App, {
          runBenchmark: function() {
            var $__0 = this;
            var scrollDiv = this._getScrollDiv();
            var n = this.iterationCount;
            var scheduleScroll;
            scheduleScroll = (function() {
              PromiseWrapper.setTimeout((function() {
                scrollDiv.scrollTop += $__0.scrollIncrement;
                n--;
                if (n > 0) {
                  scheduleScroll();
                } else {
                  $__0._scheduleFinishedMarker();
                }
              }), 0);
            });
            scheduleScroll();
          },
          _scheduleFinishedMarker: function() {
            var existingMarker = this._locateFinishedMarker();
            if (isPresent(existingMarker)) {
              return ;
            }
            PromiseWrapper.setTimeout((function() {
              var finishedDiv = DOM.createElement('div');
              finishedDiv.id = 'done';
              DOM.setInnerHTML(finishedDiv, 'Finished');
              DOM.appendChild(document.body, finishedDiv);
            }), 0);
          },
          _locateFinishedMarker: function() {
            return DOM.querySelector(document.body, '#done');
          },
          _getScrollDiv: function() {
            return DOM.query('body /deep/ #testArea /deep/ #scrollDiv');
          }
        }, {});
      }()));
    }
  };
});

//# sourceMappingURL=benchmarks/src/naive_infinite_scroll/app.map

//# sourceMappingURL=../../../benchmarks/src/naive_infinite_scroll/app.js.map