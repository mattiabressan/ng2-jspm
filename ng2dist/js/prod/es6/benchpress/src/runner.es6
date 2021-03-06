import {Injector,
  bind} from 'angular2/di';
import {isPresent,
  isBlank} from 'angular2/src/facade/lang';
import {List,
  ListWrapper} from 'angular2/src/facade/collection';
import {Promise} from 'angular2/src/facade/async';
import {Sampler,
  SampleState} from './sampler';
import {ConsoleReporter} from './reporter/console_reporter';
import {MultiReporter} from './reporter/multi_reporter';
import {RegressionSlopeValidator} from './validator/regression_slope_validator';
import {SizeValidator} from './validator/size_validator';
import {Validator} from './validator';
import {PerflogMetric} from './metric/perflog_metric';
import {MultiMetric} from './metric/multi_metric';
import {ChromeDriverExtension} from './webdriver/chrome_driver_extension';
import {IOsDriverExtension} from './webdriver/ios_driver_extension';
import {WebDriverExtension} from './web_driver_extension';
import {SampleDescription} from './sample_description';
import {WebDriverAdapter} from './web_driver_adapter';
import {Reporter} from './reporter';
import {Metric} from './metric';
import {Options} from './sample_options';
export class Runner {
  constructor(defaultBindings = null) {
    if (isBlank(defaultBindings)) {
      defaultBindings = [];
    }
    this._defaultBindings = defaultBindings;
  }
  sample({id,
    execute,
    prepare,
    microIterations,
    bindings}) {
    var sampleBindings = [_DEFAULT_BINDINGS, this._defaultBindings, bind(Options.SAMPLE_ID).toValue(id), bind(Options.EXECUTE).toValue(execute)];
    if (isPresent(prepare)) {
      ListWrapper.push(sampleBindings, bind(Options.PREPARE).toValue(prepare));
    }
    if (isPresent(microIterations)) {
      ListWrapper.push(sampleBindings, bind(Options.MICRO_ITERATIONS).toValue(microIterations));
    }
    if (isPresent(bindings)) {
      ListWrapper.push(sampleBindings, bindings);
    }
    return new Injector(sampleBindings).asyncGet(Sampler).then((sampler) => sampler.sample());
  }
}
Object.defineProperty(Runner, "parameters", {get: function() {
    return [[List]];
  }});
var _DEFAULT_BINDINGS = [Sampler.BINDINGS, ConsoleReporter.BINDINGS, RegressionSlopeValidator.BINDINGS, SizeValidator.BINDINGS, ChromeDriverExtension.BINDINGS, IOsDriverExtension.BINDINGS, PerflogMetric.BINDINGS, SampleDescription.BINDINGS, MultiReporter.createBindings([ConsoleReporter]), MultiMetric.createBindings([PerflogMetric]), Reporter.bindTo(MultiReporter), Validator.bindTo(RegressionSlopeValidator), WebDriverExtension.bindTo([ChromeDriverExtension, IOsDriverExtension]), Metric.bindTo(MultiMetric), bind(Options.CAPABILITIES).toAsyncFactory((adapter) => adapter.capabilities(), [WebDriverAdapter]), bind(Options.USER_AGENT).toAsyncFactory((adapter) => adapter.executeScript('return window.navigator.userAgent;'), [WebDriverAdapter])];

//# sourceMappingURL=/Users/crush/Documents/learning_js/angular/modules/benchpress/src/runner.map

//# sourceMappingURL=./runner.map