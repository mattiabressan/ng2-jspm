System.register(["angular2/src/facade/async", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/di", "../web_driver_extension", "../metric", "../sample_options"], function($__export) {
  "use strict";
  var PromiseWrapper,
      Promise,
      isPresent,
      isBlank,
      int,
      BaseException,
      StringWrapper,
      Math,
      ListWrapper,
      StringMap,
      StringMapWrapper,
      bind,
      OpaqueToken,
      WebDriverExtension,
      Metric,
      Options,
      PerflogMetric,
      _MAX_RETRY_COUNT,
      _MARK_NAME_PREFIX,
      _SET_TIMEOUT,
      _BINDINGS;
  return {
    setters: [function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      Promise = $__m.Promise;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      int = $__m.int;
      BaseException = $__m.BaseException;
      StringWrapper = $__m.StringWrapper;
      Math = $__m.Math;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      StringMap = $__m.StringMap;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      bind = $__m.bind;
      OpaqueToken = $__m.OpaqueToken;
    }, function($__m) {
      WebDriverExtension = $__m.WebDriverExtension;
    }, function($__m) {
      Metric = $__m.Metric;
    }, function($__m) {
      Options = $__m.Options;
    }],
    execute: function() {
      PerflogMetric = $__export("PerflogMetric", (function($__super) {
        var PerflogMetric = function PerflogMetric(driverExtension, setTimeout, microIterations) {
          $traceurRuntime.superConstructor(PerflogMetric).call(this);
          this._driverExtension = driverExtension;
          this._remainingEvents = [];
          this._measureCount = 0;
          this._setTimeout = setTimeout;
          this._microIterations = microIterations;
        };
        return ($traceurRuntime.createClass)(PerflogMetric, {
          describe: function() {
            var res = {
              'script': 'script execution time in ms',
              'render': 'render time in ms',
              'gcTime': 'gc time in ms',
              'gcAmount': 'gc amount in kbytes',
              'majorGcTime': 'time of major gcs in ms',
              'majorGcAmount': 'amount of major gcs in kbytes'
            };
            if (this._microIterations > 0) {
              res['scriptMicroAvg'] = 'average script time for a micro iteration';
            }
            return res;
          },
          beginMeasure: function() {
            return this._driverExtension.timeBegin(this._markName(this._measureCount++));
          },
          endMeasure: function(restart) {
            var $__0 = this;
            var markName = this._markName(this._measureCount - 1);
            var nextMarkName = restart ? this._markName(this._measureCount++) : null;
            return this._driverExtension.timeEnd(markName, nextMarkName).then((function(_) {
              return $__0._readUntilEndMark(markName);
            }));
          },
          _readUntilEndMark: function(markName) {
            var loopCount = arguments[1] !== (void 0) ? arguments[1] : 0;
            var startEvent = arguments[2] !== (void 0) ? arguments[2] : null;
            var $__0 = this;
            if (loopCount > _MAX_RETRY_COUNT) {
              throw new BaseException(("Tried too often to get the ending mark: " + loopCount));
            }
            return this._driverExtension.readPerfLog().then((function(events) {
              $__0._addEvents(events);
              var result = $__0._aggregateEvents($__0._remainingEvents, markName);
              if (isPresent(result)) {
                $__0._remainingEvents = events;
                return result;
              }
              var completer = PromiseWrapper.completer();
              $__0._setTimeout((function() {
                return completer.resolve($__0._readUntilEndMark(markName, loopCount + 1));
              }), 100);
              return completer.promise;
            }));
          },
          _addEvents: function(events) {
            var $__0 = this;
            var needSort = false;
            ListWrapper.forEach(events, (function(event) {
              if (StringWrapper.equals(event['ph'], 'X')) {
                needSort = true;
                var startEvent = {};
                var endEvent = {};
                StringMapWrapper.forEach(event, (function(value, prop) {
                  startEvent[prop] = value;
                  endEvent[prop] = value;
                }));
                startEvent['ph'] = 'B';
                endEvent['ph'] = 'E';
                endEvent['ts'] = startEvent['ts'] + startEvent['dur'];
                ListWrapper.push($__0._remainingEvents, startEvent);
                ListWrapper.push($__0._remainingEvents, endEvent);
              } else {
                ListWrapper.push($__0._remainingEvents, event);
              }
            }));
            if (needSort) {
              ListWrapper.sort(this._remainingEvents, (function(a, b) {
                var diff = a['ts'] - b['ts'];
                return diff > 0 ? 1 : diff < 0 ? -1 : 0;
              }));
            }
          },
          _aggregateEvents: function(events, markName) {
            var result = {
              'script': 0,
              'render': 0,
              'gcTime': 0,
              'gcAmount': 0,
              'majorGcTime': 0,
              'majorGcAmount': 0
            };
            var markStartEvent = null;
            var markEndEvent = null;
            var gcTimeInScript = 0;
            var intervalStarts = {};
            events.forEach((function(event) {
              var ph = event['ph'];
              var name = event['name'];
              if (StringWrapper.equals(ph, 'b') && StringWrapper.equals(name, markName)) {
                markStartEvent = event;
              } else if (StringWrapper.equals(ph, 'e') && StringWrapper.equals(name, markName)) {
                markEndEvent = event;
              }
              if (isPresent(markStartEvent) && isBlank(markEndEvent) && event['pid'] === markStartEvent['pid']) {
                if (StringWrapper.equals(ph, 'B')) {
                  intervalStarts[name] = event;
                } else if (StringWrapper.equals(ph, 'E') && isPresent(intervalStarts[name])) {
                  var startEvent = intervalStarts[name];
                  var duration = event['ts'] - startEvent['ts'];
                  intervalStarts[name] = null;
                  if (StringWrapper.equals(name, 'gc')) {
                    var amount = (startEvent['args']['usedHeapSize'] - event['args']['usedHeapSize']) / 1000;
                    result['gcTime'] += duration;
                    result['gcAmount'] += amount;
                    var majorGc = event['args']['majorGc'];
                    if (isPresent(majorGc) && majorGc) {
                      result['majorGcTime'] += duration;
                      result['majorGcAmount'] += amount;
                    }
                    if (isPresent(intervalStarts['script'])) {
                      gcTimeInScript += duration;
                    }
                  } else if (StringWrapper.equals(name, 'script') || StringWrapper.equals(name, 'render')) {
                    result[name] += duration;
                  }
                }
              }
            }));
            result['script'] -= gcTimeInScript;
            if (this._microIterations > 0) {
              result['scriptMicroAvg'] = result['script'] / this._microIterations;
            }
            return isPresent(markStartEvent) && isPresent(markEndEvent) ? result : null;
          },
          _markName: function(index) {
            return ("" + _MARK_NAME_PREFIX + index);
          }
        }, {
          get BINDINGS() {
            return _BINDINGS;
          },
          get SET_TIMEOUT() {
            return _SET_TIMEOUT;
          }
        }, $__super);
      }(Metric)));
      Object.defineProperty(PerflogMetric, "parameters", {get: function() {
          return [[WebDriverExtension], [Function], [int]];
        }});
      Object.defineProperty(PerflogMetric.prototype.endMeasure, "parameters", {get: function() {
          return [[assert.type.boolean]];
        }});
      Object.defineProperty(PerflogMetric.prototype._readUntilEndMark, "parameters", {get: function() {
          return [[assert.type.string], [int], []];
        }});
      _MAX_RETRY_COUNT = 20;
      _MARK_NAME_PREFIX = 'benchpress';
      _SET_TIMEOUT = new OpaqueToken('PerflogMetric.setTimeout');
      _BINDINGS = [bind(PerflogMetric).toFactory((function(driverExtension, setTimeout, microIterations) {
        return new PerflogMetric(driverExtension, setTimeout, microIterations);
      }), [WebDriverExtension, _SET_TIMEOUT, Options.MICRO_ITERATIONS]), bind(_SET_TIMEOUT).toValue((function(fn, millis) {
        return PromiseWrapper.setTimeout(fn, millis);
      })), bind(Options.MICRO_ITERATIONS).toValue(0)];
    }
  };
});

//# sourceMappingURL=benchpress/src/metric/perflog_metric.map

//# sourceMappingURL=../../../benchpress/src/metric/perflog_metric.js.map