import {ddescribe,
  describe,
  it,
  iit,
  xit,
  expect,
  beforeEach,
  afterEach} from 'angular2/test_lib';
import {List,
  ListWrapper,
  StringMap} from 'angular2/src/facade/collection';
import {PromiseWrapper,
  Promise} from 'angular2/src/facade/async';
import {DateWrapper} from 'angular2/src/facade/lang';
import {Reporter,
  MultiReporter,
  bind,
  Injector,
  MeasureValues} from 'benchpress/common';
export function main() {
  function createReporters(ids) {
    return new Injector([ListWrapper.map(ids, (id) => bind(id).toValue(new MockReporter(id))), MultiReporter.createBindings(ids)]).asyncGet(MultiReporter);
  }
  describe('multi reporter', () => {
    it('should reportMeasureValues to all', (done) => {
      var mv = new MeasureValues(0, DateWrapper.now(), {});
      createReporters(['m1', 'm2']).then((r) => r.reportMeasureValues(mv)).then((values) => {
        expect(values).toEqual([{
          'id': 'm1',
          'values': mv
        }, {
          'id': 'm2',
          'values': mv
        }]);
        done();
      });
    });
    it('should reportSample to call', (done) => {
      var completeSample = [new MeasureValues(0, DateWrapper.now(), {}), new MeasureValues(1, DateWrapper.now(), {})];
      var validSample = [completeSample[1]];
      createReporters(['m1', 'm2']).then((r) => r.reportSample(completeSample, validSample)).then((values) => {
        expect(values).toEqual([{
          'id': 'm1',
          'completeSample': completeSample,
          'validSample': validSample
        }, {
          'id': 'm2',
          'completeSample': completeSample,
          'validSample': validSample
        }]);
        done();
      });
    });
  });
}
class MockReporter extends Reporter {
  constructor(id) {
    super();
    this._id = id;
  }
  reportMeasureValues(values) {
    return PromiseWrapper.resolve({
      'id': this._id,
      'values': values
    });
  }
  reportSample(completeSample, validSample) {
    return PromiseWrapper.resolve({
      'id': this._id,
      'completeSample': completeSample,
      'validSample': validSample
    });
  }
}
Object.defineProperty(MockReporter.prototype.reportMeasureValues, "parameters", {get: function() {
    return [[MeasureValues]];
  }});
Object.defineProperty(MockReporter.prototype.reportSample, "parameters", {get: function() {
    return [[assert.genericType(List, MeasureValues)], [assert.genericType(List, MeasureValues)]];
  }});

//# sourceMappingURL=/Users/crush/Documents/learning_js/angular/modules/benchpress/test/reporter/multi_reporter_spec.map

//# sourceMappingURL=./multi_reporter_spec.map