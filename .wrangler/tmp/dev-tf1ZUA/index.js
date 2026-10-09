var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
// @__NO_SIDE_EFFECTS__
function notImplementedAsync(name) {
  const fn = /* @__PURE__ */ notImplemented(name);
  fn.__promisify__ = () => /* @__PURE__ */ notImplemented(name + ".__promisify__");
  fn.native = fn;
  return fn;
}
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
var init_utils = __esm({
  "node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    __name(notImplementedAsync, "notImplementedAsync");
    __name(notImplementedClass, "notImplementedClass");
  }
});

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin, _performanceNow, nodeTiming, PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceObserverEntryList, Performance, PerformanceObserver, performance;
var init_performance = __esm({
  "node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
    nodeTiming = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry = class {
      static {
        __name(this, "PerformanceEntry");
      }
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || _performanceNow();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
      static {
        __name(this, "PerformanceMark");
      }
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    };
    PerformanceMeasure = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceMeasure");
      }
      entryType = "measure";
    };
    PerformanceResourceTiming = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceResourceTiming");
      }
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    PerformanceObserverEntryList = class {
      static {
        __name(this, "PerformanceObserverEntryList");
      }
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type) {
        return [];
      }
    };
    Performance = class {
      static {
        __name(this, "Performance");
      }
      __unenv__ = true;
      timeOrigin = _timeOrigin;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw createNotImplementedError("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin) {
          return _performanceNow();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type) {
        return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
      }
      getEntriesByType(type) {
        return this._entries.filter((e) => e.entryType === type);
      }
      mark(name, options) {
        const entry = new PerformanceMark(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.addEventListener");
      }
      removeEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw createNotImplementedError("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    PerformanceObserver = class {
      static {
        __name(this, "PerformanceObserver");
      }
      __unenv__ = true;
      static supportedEntryTypes = [];
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw createNotImplementedError("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw createNotImplementedError("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
  }
});

// node_modules/unenv/dist/runtime/node/perf_hooks.mjs
var init_perf_hooks = __esm({
  "node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_performance();
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
var init_performance2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    if (!("__unenv__" in performance)) {
      const proto = Performance.prototype;
      for (const key of Object.getOwnPropertyNames(proto)) {
        if (key !== "constructor" && !(key in performance)) {
          const desc = Object.getOwnPropertyDescriptor(proto, key);
          if (desc) {
            Object.defineProperty(performance, key, desc);
          }
        }
      }
    }
    globalThis.performance = performance;
    globalThis.Performance = Performance;
    globalThis.PerformanceEntry = PerformanceEntry;
    globalThis.PerformanceMark = PerformanceMark;
    globalThis.PerformanceMeasure = PerformanceMeasure;
    globalThis.PerformanceObserver = PerformanceObserver;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
  }
});

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default;
var init_noop = __esm({
  "node_modules/unenv/dist/runtime/mock/noop.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noop_default = Object.assign(() => {
    }, { __unenv__: true });
  }
});

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";
var _console, _ignoreErrors, _stderr, _stdout, log, info, trace, debug, table, error, warn, createTask, clear, count, countReset, dir, dirxml, group, groupEnd, groupCollapsed, profile, profileEnd, time, timeEnd, timeLog, timeStamp, Console, _times, _stdoutErrorHandler, _stderrErrorHandler;
var init_console = __esm({
  "node_modules/unenv/dist/runtime/node/console.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_noop();
    init_utils();
    _console = globalThis.console;
    _ignoreErrors = true;
    _stderr = new Writable();
    _stdout = new Writable();
    log = _console?.log ?? noop_default;
    info = _console?.info ?? log;
    trace = _console?.trace ?? info;
    debug = _console?.debug ?? log;
    table = _console?.table ?? log;
    error = _console?.error ?? log;
    warn = _console?.warn ?? error;
    createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
    clear = _console?.clear ?? noop_default;
    count = _console?.count ?? noop_default;
    countReset = _console?.countReset ?? noop_default;
    dir = _console?.dir ?? noop_default;
    dirxml = _console?.dirxml ?? noop_default;
    group = _console?.group ?? noop_default;
    groupEnd = _console?.groupEnd ?? noop_default;
    groupCollapsed = _console?.groupCollapsed ?? noop_default;
    profile = _console?.profile ?? noop_default;
    profileEnd = _console?.profileEnd ?? noop_default;
    time = _console?.time ?? noop_default;
    timeEnd = _console?.timeEnd ?? noop_default;
    timeLog = _console?.timeLog ?? noop_default;
    timeStamp = _console?.timeStamp ?? noop_default;
    Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
    _times = /* @__PURE__ */ new Map();
    _stdoutErrorHandler = noop_default;
    _stderrErrorHandler = noop_default;
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole, assert, clear2, context, count2, countReset2, createTask2, debug2, dir2, dirxml2, error2, group2, groupCollapsed2, groupEnd2, info2, log2, profile2, profileEnd2, table2, time2, timeEnd2, timeLog2, timeStamp2, trace2, warn2, console_default;
var init_console2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_console();
    workerdConsole = globalThis["console"];
    ({
      assert,
      clear: clear2,
      context: (
        // @ts-expect-error undocumented public API
        context
      ),
      count: count2,
      countReset: countReset2,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask2
      ),
      debug: debug2,
      dir: dir2,
      dirxml: dirxml2,
      error: error2,
      group: group2,
      groupCollapsed: groupCollapsed2,
      groupEnd: groupEnd2,
      info: info2,
      log: log2,
      profile: profile2,
      profileEnd: profileEnd2,
      table: table2,
      time: time2,
      timeEnd: timeEnd2,
      timeLog: timeLog2,
      timeStamp: timeStamp2,
      trace: trace2,
      warn: warn2
    } = workerdConsole);
    Object.assign(workerdConsole, {
      Console,
      _ignoreErrors,
      _stderr,
      _stderrErrorHandler,
      _stdout,
      _stdoutErrorHandler,
      _times
    });
    console_default = workerdConsole;
  }
});

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
  "node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
    init_console2();
    globalThis.console = console_default;
  }
});

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime;
var init_hrtime = __esm({
  "node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
      const now = Date.now();
      const seconds2 = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime) {
        let diffSeconds = seconds2 - startTime[0];
        let diffNanos = nanos - startTime[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds2, nanos];
    }, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
      return BigInt(Date.now() * 1e6);
    }, "bigint") });
  }
});

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream;
var init_read_stream = __esm({
  "node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ReadStream = class {
      static {
        __name(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
    };
  }
});

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream;
var init_write_stream = __esm({
  "node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    WriteStream = class {
      static {
        __name(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      clearLine(dir3, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x, y, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env2) {
        return 1;
      }
      hasColors(count3, env2) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(str, encoding, cb) {
        if (str instanceof Uint8Array) {
          str = new TextDecoder().decode(str);
        }
        try {
          console.log(str);
        } catch {
        }
        cb && typeof cb === "function" && cb();
        return false;
      }
    };
  }
});

// node_modules/unenv/dist/runtime/node/tty.mjs
var init_tty = __esm({
  "node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});

// node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION;
var init_node_version = __esm({
  "node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    NODE_VERSION = "22.14.0";
  }
});

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";
var Process;
var init_process = __esm({
  "node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tty();
    init_utils();
    init_node_version();
    Process = class _Process extends EventEmitter {
      static {
        __name(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      // --- event emitter ---
      emitWarning(warning, type, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      // --- stdio (lazy initializers) ---
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream(2);
      }
      // --- cwd ---
      #cwd = "/";
      chdir(cwd2) {
        this.#cwd = cwd2;
      }
      cwd() {
        return this.#cwd;
      }
      // --- dummy props and getters ---
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return `v${NODE_VERSION}`;
      }
      get versions() {
        return { node: NODE_VERSION };
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      // --- noop methods ---
      ref() {
      }
      unref() {
      }
      // --- unimplemented methods ---
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
        return void 0;
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      // --- attached interfaces ---
      permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
      // --- undefined props ---
      mainModule = void 0;
      domain = void 0;
      // optional
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      // internals
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess, getBuiltinModule, workerdProcess, unenvProcess, exit, features, platform, _channel, _debugEnd, _debugProcess, _disconnect, _events, _eventsCount, _exiting, _fatalException, _getActiveHandles, _getActiveRequests, _handleQueue, _kill, _linkedBinding, _maxListeners, _pendingMessage, _preload_modules, _rawDebug, _send, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, abort, addListener, allowedNodeEnvironmentFlags, arch, argv, argv0, assert2, availableMemory, binding, channel, chdir, config, connected, constrainedMemory, cpuUsage, cwd, debugPort, disconnect, dlopen, domain, emit, emitWarning, env, eventNames, execArgv, execPath, exitCode, finalization, getActiveResourcesInfo, getegid, geteuid, getgid, getgroups, getMaxListeners, getuid, hasUncaughtExceptionCaptureCallback, hrtime3, initgroups, kill, listenerCount, listeners, loadEnvFile, mainModule, memoryUsage, moduleLoadList, nextTick, off, on, once, openStdin, permission, pid, ppid, prependListener, prependOnceListener, rawListeners, reallyExit, ref, release, removeAllListeners, removeListener, report, resourceUsage, send, setegid, seteuid, setgid, setgroups, setMaxListeners, setSourceMapsEnabled, setuid, setUncaughtExceptionCaptureCallback, sourceMapsEnabled, stderr, stdin, stdout, throwDeprecation, title, traceDeprecation, umask, unref, uptime, version, versions, _process, process_default;
var init_process2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess = globalThis["process"];
    getBuiltinModule = globalProcess.getBuiltinModule;
    workerdProcess = getBuiltinModule("node:process");
    unenvProcess = new Process({
      env: globalProcess.env,
      hrtime,
      // `nextTick` is available from workerd process v1
      nextTick: workerdProcess.nextTick
    });
    ({ exit, features, platform } = workerdProcess);
    ({
      _channel,
      _debugEnd,
      _debugProcess,
      _disconnect,
      _events,
      _eventsCount,
      _exiting,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _handleQueue,
      _kill,
      _linkedBinding,
      _maxListeners,
      _pendingMessage,
      _preload_modules,
      _rawDebug,
      _send,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      arch,
      argv,
      argv0,
      assert: assert2,
      availableMemory,
      binding,
      channel,
      chdir,
      config,
      connected,
      constrainedMemory,
      cpuUsage,
      cwd,
      debugPort,
      disconnect,
      dlopen,
      domain,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exitCode,
      finalization,
      getActiveResourcesInfo,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getMaxListeners,
      getuid,
      hasUncaughtExceptionCaptureCallback,
      hrtime: hrtime3,
      initgroups,
      kill,
      listenerCount,
      listeners,
      loadEnvFile,
      mainModule,
      memoryUsage,
      moduleLoadList,
      nextTick,
      off,
      on,
      once,
      openStdin,
      permission,
      pid,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      reallyExit,
      ref,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      send,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setMaxListeners,
      setSourceMapsEnabled,
      setuid,
      setUncaughtExceptionCaptureCallback,
      sourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      throwDeprecation,
      title,
      traceDeprecation,
      umask,
      unref,
      uptime,
      version,
      versions
    } = unenvProcess);
    _process = {
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exit,
      finalization,
      features,
      getBuiltinModule,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      nextTick,
      on,
      off,
      once,
      pid,
      platform,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      // @ts-expect-error old API
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    };
    process_default = _process;
  }
});

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default;
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/unenv/dist/runtime/node/internal/http/request.mjs
import { Socket } from "node:net";
import { Readable } from "node:stream";
var init_request = __esm({
  "node_modules/unenv/dist/runtime/node/internal/http/request.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// node_modules/unenv/dist/runtime/node/internal/http/response.mjs
import { Writable as Writable2 } from "node:stream";
var init_response = __esm({
  "node_modules/unenv/dist/runtime/node/internal/http/response.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// node_modules/unenv/dist/runtime/node/internal/http/agent.mjs
import { EventEmitter as EventEmitter2 } from "node:events";
var Agent;
var init_agent = __esm({
  "node_modules/unenv/dist/runtime/node/internal/http/agent.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Agent = class extends EventEmitter2 {
      static {
        __name(this, "Agent");
      }
      __unenv__ = {};
      maxFreeSockets = 256;
      maxSockets = Infinity;
      maxTotalSockets = Infinity;
      freeSockets = {};
      sockets = {};
      requests = {};
      options;
      constructor(opts = {}) {
        super();
        this.options = opts;
      }
      destroy() {
      }
    };
  }
});

// node_modules/unenv/dist/runtime/node/internal/http/constants.mjs
var STATUS_CODES;
var init_constants = __esm({
  "node_modules/unenv/dist/runtime/node/internal/http/constants.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    STATUS_CODES = {
      100: "Continue",
      101: "Switching Protocols",
      102: "Processing",
      103: "Early Hints",
      200: "OK",
      201: "Created",
      202: "Accepted",
      203: "Non-Authoritative Information",
      204: "No Content",
      205: "Reset Content",
      206: "Partial Content",
      207: "Multi-Status",
      208: "Already Reported",
      226: "IM Used",
      300: "Multiple Choices",
      301: "Moved Permanently",
      302: "Found",
      303: "See Other",
      304: "Not Modified",
      305: "Use Proxy",
      307: "Temporary Redirect",
      308: "Permanent Redirect",
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Timeout",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Payload Too Large",
      414: "URI Too Long",
      415: "Unsupported Media Type",
      416: "Range Not Satisfiable",
      417: "Expectation Failed",
      418: "I'm a Teapot",
      421: "Misdirected Request",
      422: "Unprocessable Entity",
      423: "Locked",
      424: "Failed Dependency",
      425: "Too Early",
      426: "Upgrade Required",
      428: "Precondition Required",
      429: "Too Many Requests",
      431: "Request Header Fields Too Large",
      451: "Unavailable For Legal Reasons",
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Timeout",
      505: "HTTP Version Not Supported",
      506: "Variant Also Negotiates",
      507: "Insufficient Storage",
      508: "Loop Detected",
      509: "Bandwidth Limit Exceeded",
      510: "Not Extended",
      511: "Network Authentication Required"
    };
  }
});

// node_modules/unenv/dist/runtime/node/http.mjs
var globalAgent, WebSocket, CloseEvent, MessageEvent;
var init_http = __esm({
  "node_modules/unenv/dist/runtime/node/http.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_agent();
    init_constants();
    init_request();
    init_response();
    globalAgent = new Agent();
    WebSocket = globalThis.WebSocket || /* @__PURE__ */ notImplementedClass("WebSocket");
    CloseEvent = globalThis.CloseEvent || /* @__PURE__ */ notImplementedClass("CloseEvent");
    MessageEvent = globalThis.MessageEvent || /* @__PURE__ */ notImplementedClass("MessageEvent");
  }
});

// node_modules/wreq-js/dist/wreq-js.js
var wreq_js_exports = {};
__export(wreq_js_exports, {
  Headers: () => Headers2,
  RequestError: () => RequestError,
  Response: () => Response2,
  Session: () => Session,
  Transport: () => Transport,
  WebSocket: () => WebSocket2,
  createSession: () => createSession,
  createTransport: () => createTransport,
  default: () => wreq_js_default,
  fetch: () => fetch2,
  get: () => get,
  getEmulationHeaders: () => getEmulationHeaders,
  getOperatingSystems: () => getOperatingSystems,
  getProfiles: () => getProfiles,
  post: () => post,
  request: () => request,
  resolveProfile: () => resolveProfile,
  websocket: () => websocket,
  withSession: () => withSession
});
import { createRequire } from "node:module";
import { randomUUID } from "node:crypto";
import { Readable as Readable2 } from "node:stream";
import { ReadableStream } from "node:stream/web";
function detectLibc() {
  if (process.platform !== "linux") return;
  const envLibc = process.env.LIBC ?? process.env.npm_config_libc;
  if (envLibc) return envLibc.toLowerCase().includes("musl") ? "musl" : "gnu";
  try {
    if (process.report?.getReport?.()?.header?.glibcVersionRuntime) return "gnu";
    return "musl";
  } catch {
    return "gnu";
  }
}
function resolveNativePlatform() {
  const platform2 = process.platform;
  const arch2 = process.arch;
  if (platform2 === "android" && arch2 === "arm64") return "android-arm64";
  if (platform2 === "darwin" && arch2 === "x64") return "darwin-x64";
  if (platform2 === "darwin" && arch2 === "arm64") return "darwin-arm64";
  if (platform2 === "linux" && arch2 === "x64") return detectLibc() === "musl" ? "linux-x64-musl" : "linux-x64-gnu";
  if (platform2 === "linux" && arch2 === "arm64") return detectLibc() === "musl" ? "linux-arm64-musl" : "linux-arm64-gnu";
  if (platform2 === "win32" && arch2 === "x64") return "win32-x64-msvc";
  if (platform2 === "win32" && arch2 === "arm64") return "win32-arm64-msvc";
}
function loadNativeBinding() {
  const target = resolveNativePlatform();
  if (!target) {
    const libc = detectLibc();
    throw new Error(`Unsupported platform: ${process.platform}-${process.arch}${libc ? `-${libc}` : ""}. Supported platforms: ${NATIVE_PLATFORMS.join(", ")}`);
  }
  const candidates = [
    `../rust/wreq-js.${target}.node`,
    `@wreq-js/binding-${target}`,
    "../rust/wreq-js.node"
  ];
  let notFoundError;
  let loadError;
  for (const candidate of candidates) try {
    return nativeRequire(candidate);
  } catch (error3) {
    if (error3?.code === "MODULE_NOT_FOUND") notFoundError ??= error3;
    else loadError ??= error3;
  }
  throw new Error(`Failed to load native module for ${target}. Tried: ${candidates.join(", ")}. Make sure the package is installed correctly and the native module is built for your platform.`, { cause: loadError ?? notFoundError });
}
function generateEphemeralSessionId() {
  return `_e${++ephemeralIdCounter}`;
}
function generateSessionId() {
  return randomUUID();
}
function normalizeSessionOptions(options) {
  const sessionId = options?.sessionId ?? generateSessionId();
  const defaults = {
    transportMode: resolveEmulationMode(options?.browser, options?.os, options?.emulation),
    trustStore: DEFAULT_TRUST_STORE
  };
  if (options?.proxy !== void 0) defaults.proxy = options.proxy;
  if (options?.timeout !== void 0) {
    validateTimeout(options.timeout);
    defaults.timeout = options.timeout;
  }
  if (options?.insecure !== void 0) defaults.insecure = options.insecure;
  if (options?.trustStore !== void 0) {
    validateTrustStore(options.trustStore);
    defaults.trustStore = options.trustStore;
  }
  if (options?.defaultHeaders !== void 0) defaults.defaultHeaders = headersToTuples(options.defaultHeaders);
  if (options?.captureDiagnostics !== void 0) defaults.captureDiagnostics = options.captureDiagnostics;
  return {
    sessionId,
    defaults
  };
}
function isIterable(value) {
  return Boolean(value) && typeof value[Symbol.iterator] === "function";
}
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}
function coerceHeaderValue(value) {
  return String(value);
}
function headersToTuples(init) {
  return new Headers2(init).toTuples();
}
function hasHeaderName(tuples, name) {
  if (!tuples) return false;
  const target = name.toLowerCase();
  for (const [headerName] of tuples) if (headerName.toLowerCase() === target) return true;
  return false;
}
function hasWebSocketProtocolHeader(headers) {
  const protocolHeaderName = "Sec-WebSocket-Protocol";
  if (!headers) return false;
  return hasHeaderName(headersToTuples(headers), protocolHeaderName);
}
function assertNoManualWebSocketProtocolHeader(headers) {
  if (hasWebSocketProtocolHeader(headers)) throw new RequestError("Do not set `Sec-WebSocket-Protocol` header manually; use the `protocols` option instead.");
}
function normalizeWebSocketProtocolList(protocols) {
  if (protocols === void 0) return;
  return typeof protocols === "string" ? [protocols] : [...protocols];
}
function mergeHeaderTuples(defaults, overrides) {
  if (!defaults) return overrides === void 0 ? void 0 : headersToTuples(overrides);
  if (overrides === void 0) return defaults;
  const overrideTuples = headersToTuples(overrides);
  if (overrideTuples.length === 0) return defaults;
  const overrideKeys = /* @__PURE__ */ new Set();
  for (const tuple of overrideTuples) overrideKeys.add(tuple[0].toLowerCase());
  const merged = [];
  for (const tuple of defaults) if (!overrideKeys.has(tuple[0].toLowerCase())) merged.push(tuple);
  for (const tuple of overrideTuples) merged.push(tuple);
  return merged;
}
function cloneNativeResponse(payload) {
  return {
    status: payload.status,
    headers: payload.headers.map(([name, value]) => [name, value]),
    bodyHandle: payload.bodyHandle,
    bodyBytes: payload.bodyBytes,
    contentLength: payload.contentLength,
    cookies: payload.cookies.map(([name, value]) => [name, value]),
    url: payload.url,
    diagnostics: payload.diagnostics ? { ...payload.diagnostics } : null
  };
}
function releaseNativeBody(handle) {
  if (handle.released) return;
  handle.released = true;
  try {
    nativeBinding.cancelBody(handle.id);
  } catch {
  }
  bodyHandleFinalizer?.unregister(handle);
}
function markNativeBodyReleased(handle) {
  if (handle.released) return;
  handle.released = true;
  bodyHandleFinalizer?.unregister(handle);
}
function createNativeBodyStream(handle) {
  const stream = new ReadableStream({
    async pull(controller) {
      try {
        const chunk = await nativeBinding.readBodyChunk(handle.id);
        if (chunk === null) {
          releaseNativeBody(handle);
          controller.close();
          return;
        }
        controller.enqueue(chunk);
      } catch (error3) {
        releaseNativeBody(handle);
        controller.error(error3);
      }
    },
    cancel() {
      releaseNativeBody(handle);
    }
  });
  bodyHandleFinalizer?.register(stream, handle, handle);
  return stream;
}
function wrapBodyStream(source, onFirstUse) {
  let started = false;
  let reader = null;
  return new ReadableStream({
    async pull(controller) {
      if (!started) {
        started = true;
        onFirstUse();
      }
      if (!reader) reader = source.getReader();
      try {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }
        controller.enqueue(value);
      } catch (error3) {
        controller.error(error3);
      }
    },
    cancel(reason) {
      if (!reader) return source.cancel(reason);
      return reader.cancel(reason);
    }
  });
}
function resolveSessionContext(config2) {
  const requestedMode = config2.cookieMode ?? "ephemeral";
  const sessionCandidate = config2.session;
  const providedSessionId = typeof config2.sessionId === "string" ? config2.sessionId.trim() : void 0;
  if (sessionCandidate && providedSessionId) throw new RequestError("Provide either `session` or `sessionId`, not both.");
  if (sessionCandidate) {
    if (!(sessionCandidate instanceof Session)) throw new RequestError("`session` must be created via createSession()");
    if (sessionCandidate.closed) throw new RequestError("Session has been closed");
    return {
      sessionId: sessionCandidate.id,
      cookieMode: "session",
      dropAfterRequest: false,
      defaults: sessionCandidate._defaultsRef()
    };
  }
  if (providedSessionId) {
    if (!providedSessionId) throw new RequestError("sessionId must not be empty");
    if (requestedMode === "ephemeral") throw new RequestError("cookieMode 'ephemeral' cannot be combined with sessionId");
    return {
      sessionId: providedSessionId,
      cookieMode: "session",
      dropAfterRequest: false
    };
  }
  if (requestedMode === "session") throw new RequestError("cookieMode 'session' requires a session or sessionId");
  return {
    sessionId: generateEphemeralSessionId(),
    cookieMode: "ephemeral",
    dropAfterRequest: true
  };
}
function resolveTransportContext(config2, sessionDefaults) {
  if (config2.transport !== void 0) {
    if (!(config2.transport instanceof Transport)) throw new RequestError("`transport` must be created via createTransport()");
    if (config2.transport.closed) throw new RequestError("Transport has been closed");
    const hasProxy = config2.proxy !== void 0;
    if (config2.browser !== void 0 || config2.os !== void 0 || config2.emulation !== void 0 || hasProxy || config2.insecure !== void 0 || config2.trustStore !== void 0) throw new RequestError("`transport` cannot be combined with browser/os/emulation/proxy/insecure/trustStore options");
    return {
      transportId: config2.transport.id,
      ...config2.captureDiagnostics !== void 0 && { captureDiagnostics: config2.captureDiagnostics }
    };
  }
  if (sessionDefaults?.transportId) {
    if (config2.emulation !== void 0) throw new RequestError("Session emulation cannot be changed after creation");
    if (config2.browser !== void 0) {
      if (resolveProfile(config2.browser) !== (sessionDefaults.transportMode.kind === "custom" ? void 0 : sessionDefaults.transportMode.browser)) throw new RequestError("Session browser cannot be changed after creation");
    }
    if (config2.os !== void 0) {
      validateOperatingSystem(config2.os);
      const lockedOs = sessionDefaults.transportMode.kind === "custom" ? void 0 : sessionDefaults.transportMode.os;
      if (config2.os !== lockedOs) throw new RequestError("Session operating system cannot be changed after creation");
    }
    const initHasProxy = Object.hasOwn(config2, "proxy");
    const requestedProxy = initHasProxy ? config2.proxy : void 0;
    if (initHasProxy && requestedProxy !== void 0 && (sessionDefaults.proxy ?? null) !== (requestedProxy ?? null)) throw new RequestError("Session proxy cannot be changed after creation");
    if (config2.insecure !== void 0) {
      const lockedInsecure = sessionDefaults.insecure ?? false;
      if (config2.insecure !== lockedInsecure) throw new RequestError("Session insecure setting cannot be changed after creation");
    }
    if (config2.trustStore !== void 0) {
      const lockedTrustStore = sessionDefaults.trustStore ?? DEFAULT_TRUST_STORE;
      if (config2.trustStore !== lockedTrustStore) throw new RequestError("Session trustStore setting cannot be changed after creation");
    }
    const captureDiagnostics = config2.captureDiagnostics ?? sessionDefaults.captureDiagnostics;
    return {
      transportId: sessionDefaults.transportId,
      ...captureDiagnostics !== void 0 && { captureDiagnostics }
    };
  }
  const resolved2 = { mode: resolveEmulationMode(config2.browser, config2.os, config2.emulation) };
  if (config2.proxy !== void 0) resolved2.proxy = config2.proxy;
  if (config2.insecure !== void 0) resolved2.insecure = config2.insecure;
  resolved2.trustStore = config2.trustStore ?? DEFAULT_TRUST_STORE;
  if (config2.captureDiagnostics !== void 0) resolved2.captureDiagnostics = config2.captureDiagnostics;
  return resolved2;
}
function createAbortError(reason) {
  const fallbackMessage = typeof reason === "string" ? reason : "The operation was aborted";
  if (typeof DOMException !== "undefined" && reason instanceof DOMException) return reason.name === "AbortError" ? reason : new DOMException(reason.message || fallbackMessage, "AbortError");
  if (reason instanceof Error) {
    const error4 = new Error(reason.message);
    error4.name = "AbortError";
    error4.cause = reason;
    return error4;
  }
  if (typeof DOMException !== "undefined") return new DOMException(fallbackMessage, "AbortError");
  const error3 = new Error(fallbackMessage);
  error3.name = "AbortError";
  return error3;
}
function isAbortError(error3) {
  return Boolean(error3) && typeof error3.name === "string" && error3.name === "AbortError";
}
function generateRequestId() {
  requestIdCounter += 1;
  if (requestIdCounter >= REQUEST_ID_MAX) requestIdCounter = 1;
  return requestIdCounter;
}
function setupAbort(signal, cancelNative) {
  if (!signal) return null;
  if (signal.aborted) {
    cancelNative();
    throw createAbortError(signal.reason);
  }
  let onAbortListener;
  const promise = new Promise((_, reject) => {
    onAbortListener = /* @__PURE__ */ __name(() => {
      cancelNative();
      reject(createAbortError(signal.reason));
    }, "onAbortListener");
    signal.addEventListener("abort", onAbortListener, { once: true });
  });
  const cleanup = /* @__PURE__ */ __name(() => {
    if (onAbortListener) {
      signal.removeEventListener("abort", onAbortListener);
      onAbortListener = void 0;
    }
  }, "cleanup");
  return {
    promise,
    cleanup
  };
}
function coerceUrlInput(input) {
  if (input instanceof URL) return input.href;
  if (input.length === 0) throw new RequestError("URL is required");
  if (input.charCodeAt(0) > 32 && input.charCodeAt(input.length - 1) > 32) return input;
  const trimmed = input.trim();
  if (trimmed.length === 0) throw new RequestError("URL is required");
  return trimmed;
}
function isRequestLike(input) {
  if (!input || typeof input !== "object") return false;
  if (typeof Request !== "undefined" && input instanceof Request) return true;
  const candidate = input;
  return typeof candidate.url === "string" && typeof candidate.method === "string" && typeof candidate.arrayBuffer === "function" && typeof candidate.redirect === "string";
}
async function resolveFetchArgs(input, init) {
  if (!isRequestLike(input)) return {
    url: coerceUrlInput(input),
    init: init ?? {}
  };
  const mergedInit = init ? { ...init } : {};
  if (mergedInit.method === void 0) mergedInit.method = input.method;
  if (mergedInit.headers === void 0) mergedInit.headers = input.headers;
  if (mergedInit.redirect === void 0 && (input.redirect === "follow" || input.redirect === "manual" || input.redirect === "error")) mergedInit.redirect = input.redirect;
  if (mergedInit.signal === void 0) mergedInit.signal = input.signal;
  if (mergedInit.body === void 0 && input.body !== null) {
    if (input.bodyUsed) throw new TypeError("Request body is already used");
    mergedInit.body = Buffer.from(await input.arrayBuffer());
  }
  return {
    url: coerceUrlInput(input.url),
    init: mergedInit
  };
}
function normalizeUrlForComparison(value) {
  try {
    return new URL(value).toString();
  } catch {
    return null;
  }
}
function validateRedirectMode(mode) {
  if (mode === void 0 || mode === "follow" || mode === "manual" || mode === "error") return;
  throw new RequestError(`Redirect mode '${mode}' is not supported`);
}
async function serializeBody(body) {
  if (body === null || body === void 0) return {};
  if (typeof body === "string") return { body: Buffer.from(body, "utf8") };
  if (Buffer.isBuffer(body)) return { body };
  if (body instanceof URLSearchParams) return {
    body: Buffer.from(body.toString(), "utf8"),
    contentType: "application/x-www-form-urlencoded;charset=UTF-8"
  };
  if (body instanceof ArrayBuffer) return { body: Buffer.from(body) };
  if (ArrayBuffer.isView(body)) return { body: Buffer.from(body.buffer, body.byteOffset, body.byteLength) };
  if (typeof Blob !== "undefined" && body instanceof Blob) return {
    body: Buffer.from(await body.arrayBuffer()),
    ...body.type ? { contentType: body.type } : {}
  };
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    const encoded = new globalThis.Response(body);
    const contentType = encoded.headers.get("content-type") ?? void 0;
    return {
      body: Buffer.from(await encoded.arrayBuffer()),
      ...contentType ? { contentType } : {}
    };
  }
  if (typeof body.getReader === "function") {
    const reader = body.getReader();
    const chunks = [];
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    return { body: Buffer.concat(chunks) };
  }
  if (typeof body[Symbol.asyncIterator] === "function" || typeof body[Symbol.iterator] === "function") {
    const chunks = [];
    for await (const chunk of body) {
      if (!ArrayBuffer.isView(chunk)) throw new TypeError("Iterable request bodies must yield Uint8Array chunks");
      chunks.push(chunk);
    }
    return { body: Buffer.concat(chunks) };
  }
  throw new TypeError("Unsupported body type; expected string, Buffer, ArrayBuffer, ArrayBufferView, URLSearchParams, Blob, FormData, ReadableStream, or an iterable of Uint8Array");
}
function ensureMethod(method) {
  if (method === void 0 || method.length === 0) return "GET";
  switch (method) {
    case "GET":
    case "POST":
    case "PUT":
    case "DELETE":
    case "PATCH":
    case "HEAD":
    case "OPTIONS":
      return method;
  }
  const normalized = method.trim().toUpperCase();
  return normalized.length > 0 ? normalized : "GET";
}
function ensureBodyAllowed(method, body) {
  if (body === void 0) return;
  if (method === "GET" || method === "HEAD") throw new RequestError(`Request with ${method} method cannot have a body`);
}
function validateBrowserProfile(browser) {
  if (browser === void 0) return;
  if (typeof browser !== "string" || browser.trim().length === 0) throw new RequestError("Browser profile must not be empty");
  if (!getProfileSet().has(browser) && !Object.hasOwn(BROWSER_ALIASES, browser)) throw new RequestError(`Invalid browser profile: ${browser}. Available aliases: ${Object.keys(BROWSER_ALIASES).join(", ")}. Available profiles: ${getProfiles().join(", ")}`);
}
function validateOperatingSystem(os) {
  if (os === void 0) return;
  if (typeof os !== "string" || os.trim().length === 0) throw new RequestError("Operating system must not be empty");
  if (!getOperatingSystemSet().has(os)) throw new RequestError(`Invalid operating system: ${os}. Available options: ${getOperatingSystems().join(", ")}`);
}
function validateTimeout(timeout) {
  if (timeout === void 0) return;
  if (typeof timeout !== "number" || !Number.isFinite(timeout)) throw new RequestError("Timeout must be a finite number");
  if (timeout < 0) throw new RequestError("Timeout must be 0 (no timeout) or a positive number");
}
function validateTrustStore(trustStore) {
  if (trustStore === void 0) return;
  if (trustStore !== "combined" && trustStore !== "mozilla" && trustStore !== "defaultPaths") throw new RequestError("trustStore must be one of: combined, mozilla, defaultPaths");
}
function validatePositiveNumber(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value)) throw new RequestError(`${label} must be a finite number`);
  if (value <= 0) throw new RequestError(`${label} must be greater than 0`);
}
function validateNonNegativeInteger(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value) || !Number.isInteger(value)) throw new RequestError(`${label} must be an integer`);
  if (value < 0) throw new RequestError(`${label} must be greater than or equal to 0`);
}
function validatePositiveInteger(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value) || !Number.isInteger(value)) throw new RequestError(`${label} must be an integer`);
  if (value <= 0) throw new RequestError(`${label} must be greater than 0`);
}
function validateResolve(resolve) {
  if (typeof resolve !== "object" || resolve === null || Array.isArray(resolve)) throw new RequestError("resolve must be an object mapping hosts to addresses");
  for (const [host, value] of Object.entries(resolve)) {
    const addresses = Array.isArray(value) ? value : [value];
    if (addresses.length === 0) throw new RequestError(`resolve['${host}'] must provide at least one address`);
    for (const address of addresses) if (typeof address !== "string" || address.trim() === "") throw new RequestError(`resolve['${host}'] addresses must be non-empty strings`);
  }
}
function validateIntegerInRange(value, min, max, label) {
  validateNonNegativeInteger(value, label);
  if (value < min || value > max) throw new RequestError(`${label} must be between ${min} and ${max}`);
}
function isNonEmpty(value) {
  for (const _ in value) return true;
  return false;
}
function normalizeProtocolList(value, label, allowed) {
  if (value === void 0) return;
  if (!Array.isArray(value)) throw new RequestError(`${label} must be an array`);
  for (const protocol of value) if (!allowed.has(protocol)) throw new RequestError(`${label} values must be one of: HTTP1, HTTP2, HTTP3`);
  return [...value];
}
function normalizeTlsVersion(value, label) {
  if (value === void 0) return;
  if (typeof value !== "string") throw new RequestError(`${label} must be a string`);
  const normalized = TLS_VERSION_ALIASES.get(value.trim().toLowerCase());
  if (!normalized) throw new RequestError(`${label} must be one of: 1.0, 1.1, 1.2, 1.3`);
  return normalized;
}
function normalizeOrigHeaders(origHeaders) {
  if (origHeaders === void 0) return;
  if (!Array.isArray(origHeaders)) throw new RequestError("emulation.origHeaders must be an array of strings");
  const normalized = [];
  const seen = /* @__PURE__ */ new Set();
  for (const entry of origHeaders) {
    if (typeof entry !== "string" || entry.trim().length === 0) throw new RequestError("emulation.origHeaders entries must be non-empty strings");
    const trimmed = entry.trim();
    const duplicateKey = trimmed.toLowerCase();
    if (seen.has(duplicateKey)) throw new RequestError(`Duplicate emulation.origHeaders entry: ${trimmed}`);
    seen.add(duplicateKey);
    normalized.push(trimmed);
  }
  return normalized.length > 0 ? normalized : void 0;
}
function normalizeCustomTlsOptions(options) {
  if (options === void 0) return;
  const normalized = {};
  const alpnProtocols = normalizeProtocolList(options.alpnProtocols, "emulation.tlsOptions.alpnProtocols", SUPPORTED_ALPN_PROTOCOLS);
  if (alpnProtocols !== void 0) normalized.alpnProtocols = alpnProtocols;
  const alpsProtocols = normalizeProtocolList(options.alpsProtocols, "emulation.tlsOptions.alpsProtocols", SUPPORTED_ALPS_PROTOCOLS);
  if (alpsProtocols !== void 0) normalized.alpsProtocols = alpsProtocols;
  const minTlsVersion = normalizeTlsVersion(options.minTlsVersion, "emulation.tlsOptions.minTlsVersion");
  if (minTlsVersion !== void 0) normalized.minTlsVersion = minTlsVersion;
  const maxTlsVersion = normalizeTlsVersion(options.maxTlsVersion, "emulation.tlsOptions.maxTlsVersion");
  if (maxTlsVersion !== void 0) normalized.maxTlsVersion = maxTlsVersion;
  if (options.alpsUseNewCodepoint !== void 0) normalized.alpsUseNewCodepoint = options.alpsUseNewCodepoint;
  if (options.sessionTicket !== void 0) normalized.sessionTicket = options.sessionTicket;
  if (options.preSharedKey !== void 0) normalized.preSharedKey = options.preSharedKey;
  if (options.enableEchGrease !== void 0) normalized.enableEchGrease = options.enableEchGrease;
  if (options.permuteExtensions !== void 0) normalized.permuteExtensions = options.permuteExtensions;
  if (options.greaseEnabled !== void 0) normalized.greaseEnabled = options.greaseEnabled;
  if (options.enableOcspStapling !== void 0) normalized.enableOcspStapling = options.enableOcspStapling;
  if (options.enableSignedCertTimestamps !== void 0) normalized.enableSignedCertTimestamps = options.enableSignedCertTimestamps;
  if (options.pskSkipSessionTicket !== void 0) normalized.pskSkipSessionTicket = options.pskSkipSessionTicket;
  if (options.pskDheKe !== void 0) normalized.pskDheKe = options.pskDheKe;
  if (options.renegotiation !== void 0) normalized.renegotiation = options.renegotiation;
  if (options.aesHwOverride !== void 0) normalized.aesHwOverride = options.aesHwOverride;
  if (options.preserveTls13CipherList !== void 0) normalized.preserveTls13CipherList = options.preserveTls13CipherList;
  if (options.randomAesHwOverride !== void 0) normalized.randomAesHwOverride = options.randomAesHwOverride;
  if (options.delegatedCredentials !== void 0) normalized.delegatedCredentials = options.delegatedCredentials;
  if (options.curvesList !== void 0) normalized.curvesList = options.curvesList;
  if (options.cipherList !== void 0) normalized.cipherList = options.cipherList;
  if (options.sigalgsList !== void 0) normalized.sigalgsList = options.sigalgsList;
  if (options.recordSizeLimit !== void 0) {
    validateIntegerInRange(options.recordSizeLimit, 0, 65535, "emulation.tlsOptions.recordSizeLimit");
    normalized.recordSizeLimit = options.recordSizeLimit;
  }
  if (options.certificateCompressionAlgorithms !== void 0) {
    if (!Array.isArray(options.certificateCompressionAlgorithms)) throw new RequestError("emulation.tlsOptions.certificateCompressionAlgorithms must be an array");
    const algorithms = [];
    const seen = /* @__PURE__ */ new Set();
    for (const algorithm of options.certificateCompressionAlgorithms) {
      if (!SUPPORTED_CERTIFICATE_COMPRESSION_ALGORITHMS.has(algorithm)) throw new RequestError("emulation.tlsOptions.certificateCompressionAlgorithms values must be one of: zlib, brotli, zstd");
      if (seen.has(algorithm)) throw new RequestError(`Duplicate emulation.tlsOptions.certificateCompressionAlgorithms entry: ${algorithm}`);
      seen.add(algorithm);
      algorithms.push(algorithm);
    }
    normalized.certificateCompressionAlgorithms = algorithms;
  }
  if (options.extensionPermutation !== void 0) {
    if (!Array.isArray(options.extensionPermutation)) throw new RequestError("emulation.tlsOptions.extensionPermutation must be an array");
    const permutation = [];
    const seen = /* @__PURE__ */ new Set();
    for (const extensionId of options.extensionPermutation) {
      validateIntegerInRange(extensionId, 0, 65535, "emulation.tlsOptions.extensionPermutation");
      if (seen.has(extensionId)) throw new RequestError(`Duplicate emulation.tlsOptions.extensionPermutation entry: ${extensionId}`);
      seen.add(extensionId);
      permutation.push(extensionId);
    }
    normalized.extensionPermutation = permutation;
  }
  return isNonEmpty(normalized) ? normalized : void 0;
}
function normalizeCustomHttp1Options(options) {
  if (options === void 0) return;
  const normalized = {};
  if (options.http09Responses !== void 0) normalized.http09Responses = options.http09Responses;
  if (options.writev !== void 0) normalized.writev = options.writev;
  if (options.ignoreInvalidHeadersInResponses !== void 0) normalized.ignoreInvalidHeadersInResponses = options.ignoreInvalidHeadersInResponses;
  if (options.allowSpacesAfterHeaderNameInResponses !== void 0) normalized.allowSpacesAfterHeaderNameInResponses = options.allowSpacesAfterHeaderNameInResponses;
  if (options.allowObsoleteMultilineHeadersInResponses !== void 0) normalized.allowObsoleteMultilineHeadersInResponses = options.allowObsoleteMultilineHeadersInResponses;
  if (options.maxHeaders !== void 0) {
    validateNonNegativeInteger(options.maxHeaders, "emulation.http1Options.maxHeaders");
    normalized.maxHeaders = options.maxHeaders;
  }
  if (options.readBufExactSize !== void 0) {
    validateNonNegativeInteger(options.readBufExactSize, "emulation.http1Options.readBufExactSize");
    normalized.readBufExactSize = options.readBufExactSize;
  }
  if (options.maxBufSize !== void 0) {
    validateNonNegativeInteger(options.maxBufSize, "emulation.http1Options.maxBufSize");
    if (options.maxBufSize < 8192) throw new RequestError("emulation.http1Options.maxBufSize must be greater than or equal to 8192");
    normalized.maxBufSize = options.maxBufSize;
  }
  if (normalized.readBufExactSize !== void 0 && normalized.maxBufSize !== void 0) throw new RequestError("emulation.http1Options.readBufExactSize and maxBufSize cannot both be set");
  return isNonEmpty(normalized) ? normalized : void 0;
}
function normalizeHttp2StreamDependency(dependency, label) {
  if (!isPlainObject(dependency)) throw new RequestError(`${label} must be an object`);
  validateIntegerInRange(dependency.dependencyId, 0, 2147483647, `${label}.dependencyId`);
  validateIntegerInRange(dependency.weight, 0, 255, `${label}.weight`);
  const normalized = {
    dependencyId: dependency.dependencyId,
    weight: dependency.weight
  };
  if (dependency.exclusive !== void 0) normalized.exclusive = dependency.exclusive;
  return normalized;
}
function normalizeCustomHttp2Options(options) {
  if (options === void 0) return;
  const normalized = {};
  if (options.adaptiveWindow !== void 0) normalized.adaptiveWindow = options.adaptiveWindow;
  if (options.keepAliveWhileIdle !== void 0) normalized.keepAliveWhileIdle = options.keepAliveWhileIdle;
  if (options.enablePush !== void 0) normalized.enablePush = options.enablePush;
  if (options.enableConnectProtocol !== void 0) normalized.enableConnectProtocol = options.enableConnectProtocol;
  if (options.noRfc7540Priorities !== void 0) normalized.noRfc7540Priorities = options.noRfc7540Priorities;
  if (options.initialStreamId !== void 0) {
    validateNonNegativeInteger(options.initialStreamId, "emulation.http2Options.initialStreamId");
    normalized.initialStreamId = options.initialStreamId;
  }
  if (options.initialConnectionWindowSize !== void 0) {
    validateNonNegativeInteger(options.initialConnectionWindowSize, "emulation.http2Options.initialConnectionWindowSize");
    normalized.initialConnectionWindowSize = options.initialConnectionWindowSize;
  }
  if (options.initialWindowSize !== void 0) {
    validateNonNegativeInteger(options.initialWindowSize, "emulation.http2Options.initialWindowSize");
    normalized.initialWindowSize = options.initialWindowSize;
  }
  if (options.initialMaxSendStreams !== void 0) {
    validateNonNegativeInteger(options.initialMaxSendStreams, "emulation.http2Options.initialMaxSendStreams");
    normalized.initialMaxSendStreams = options.initialMaxSendStreams;
  }
  if (options.maxFrameSize !== void 0) {
    validateNonNegativeInteger(options.maxFrameSize, "emulation.http2Options.maxFrameSize");
    normalized.maxFrameSize = options.maxFrameSize;
  }
  if (options.keepAliveInterval !== void 0) {
    validateNonNegativeInteger(options.keepAliveInterval, "emulation.http2Options.keepAliveInterval");
    normalized.keepAliveInterval = options.keepAliveInterval;
  }
  if (options.keepAliveTimeout !== void 0) {
    validateNonNegativeInteger(options.keepAliveTimeout, "emulation.http2Options.keepAliveTimeout");
    normalized.keepAliveTimeout = options.keepAliveTimeout;
  }
  if (options.maxConcurrentResetStreams !== void 0) {
    validateNonNegativeInteger(options.maxConcurrentResetStreams, "emulation.http2Options.maxConcurrentResetStreams");
    normalized.maxConcurrentResetStreams = options.maxConcurrentResetStreams;
  }
  if (options.maxSendBufferSize !== void 0) {
    validateNonNegativeInteger(options.maxSendBufferSize, "emulation.http2Options.maxSendBufferSize");
    normalized.maxSendBufferSize = options.maxSendBufferSize;
  }
  if (options.maxConcurrentStreams !== void 0) {
    validateNonNegativeInteger(options.maxConcurrentStreams, "emulation.http2Options.maxConcurrentStreams");
    normalized.maxConcurrentStreams = options.maxConcurrentStreams;
  }
  if (options.maxHeaderListSize !== void 0) {
    validateNonNegativeInteger(options.maxHeaderListSize, "emulation.http2Options.maxHeaderListSize");
    normalized.maxHeaderListSize = options.maxHeaderListSize;
  }
  if (options.maxPendingAcceptResetStreams !== void 0) {
    validateNonNegativeInteger(options.maxPendingAcceptResetStreams, "emulation.http2Options.maxPendingAcceptResetStreams");
    normalized.maxPendingAcceptResetStreams = options.maxPendingAcceptResetStreams;
  }
  if (options.headerTableSize !== void 0) {
    validateNonNegativeInteger(options.headerTableSize, "emulation.http2Options.headerTableSize");
    normalized.headerTableSize = options.headerTableSize;
  }
  if (options.settingsOrder !== void 0) {
    if (!Array.isArray(options.settingsOrder)) throw new RequestError("emulation.http2Options.settingsOrder must be an array");
    const settingsOrder = [];
    const seen = /* @__PURE__ */ new Set();
    for (const settingId of options.settingsOrder) {
      if (!HTTP2_SETTING_IDS.has(settingId)) throw new RequestError("emulation.http2Options.settingsOrder contains an unsupported setting id");
      if (seen.has(settingId)) throw new RequestError(`Duplicate emulation.http2Options.settingsOrder entry: ${settingId}`);
      seen.add(settingId);
      settingsOrder.push(settingId);
    }
    normalized.settingsOrder = settingsOrder;
  }
  if (options.headersPseudoOrder !== void 0) {
    if (!Array.isArray(options.headersPseudoOrder)) throw new RequestError("emulation.http2Options.headersPseudoOrder must be an array");
    const headersPseudoOrder = [];
    const seenPseudo = /* @__PURE__ */ new Set();
    for (const pseudoId of options.headersPseudoOrder) {
      if (!HTTP2_PSEUDO_HEADER_IDS.has(pseudoId)) throw new RequestError("emulation.http2Options.headersPseudoOrder contains an unsupported pseudo-header id");
      if (seenPseudo.has(pseudoId)) throw new RequestError(`Duplicate emulation.http2Options.headersPseudoOrder entry: ${pseudoId}`);
      seenPseudo.add(pseudoId);
      headersPseudoOrder.push(pseudoId);
    }
    normalized.headersPseudoOrder = headersPseudoOrder;
  }
  if (options.headersStreamDependency !== void 0) normalized.headersStreamDependency = normalizeHttp2StreamDependency(options.headersStreamDependency, "emulation.http2Options.headersStreamDependency");
  if (options.priorities !== void 0) {
    if (!Array.isArray(options.priorities)) throw new RequestError("emulation.http2Options.priorities must be an array");
    const priorities = [];
    const seenStreamIds = /* @__PURE__ */ new Set();
    for (const [index, priority] of options.priorities.entries()) {
      if (!isPlainObject(priority)) throw new RequestError(`emulation.http2Options.priorities[${index}] must be an object`);
      validatePositiveInteger(priority.streamId, `emulation.http2Options.priorities[${index}].streamId`);
      if (seenStreamIds.has(priority.streamId)) throw new RequestError(`Duplicate emulation.http2Options.priorities streamId: ${priority.streamId}`);
      seenStreamIds.add(priority.streamId);
      priorities.push({
        streamId: priority.streamId,
        dependency: normalizeHttp2StreamDependency(priority.dependency, `emulation.http2Options.priorities[${index}].dependency`)
      });
    }
    normalized.priorities = priorities;
  }
  return isNonEmpty(normalized) ? normalized : void 0;
}
function normalizeCustomEmulationOptions(emulation, allowEmpty) {
  if (emulation === void 0) return;
  if (!isPlainObject(emulation)) throw new RequestError("emulation must be an object");
  const source = emulation;
  const normalized = {};
  const tlsOptions = normalizeCustomTlsOptions(source.tlsOptions);
  if (tlsOptions !== void 0) normalized.tlsOptions = tlsOptions;
  const http1Options = normalizeCustomHttp1Options(source.http1Options);
  if (http1Options !== void 0) normalized.http1Options = http1Options;
  const http2Options = normalizeCustomHttp2Options(source.http2Options);
  if (http2Options !== void 0) normalized.http2Options = http2Options;
  if (source.headers !== void 0) {
    const headers = headersToTuples(source.headers);
    if (headers.length > 0) normalized.headers = headers;
  }
  const origHeaders = normalizeOrigHeaders(source.origHeaders);
  if (origHeaders !== void 0) normalized.origHeaders = origHeaders;
  if (!allowEmpty && !isNonEmpty(normalized)) throw new RequestError("Standalone custom emulation requires at least one of tlsOptions, http1Options, http2Options, headers, or origHeaders");
  return isNonEmpty(normalized) ? normalized : void 0;
}
function serializeCustomEmulationOptions(emulation, allowEmpty) {
  const normalized = normalizeCustomEmulationOptions(emulation, allowEmpty);
  return normalized ? JSON.stringify(normalized) : void 0;
}
function resolveEmulationMode(browser, os, emulation) {
  if (browser !== void 0) {
    const resolvedBrowser = resolveProfile(browser);
    if (os !== void 0) validateOperatingSystem(os);
    const emulationJson = serializeCustomEmulationOptions(emulation, true);
    return {
      kind: "preset",
      browser: resolvedBrowser,
      os: os ?? DEFAULT_OS,
      ...emulationJson !== void 0 && { emulationJson }
    };
  }
  if (os !== void 0) {
    validateOperatingSystem(os);
    const emulationJson = serializeCustomEmulationOptions(emulation, true);
    return {
      kind: "preset",
      browser: DEFAULT_BROWSER,
      os,
      ...emulationJson !== void 0 && { emulationJson }
    };
  }
  if (emulation !== void 0) {
    const emulationJson = serializeCustomEmulationOptions(emulation, false);
    if (emulationJson === void 0) throw new RequestError("Standalone custom emulation requires at least one of tlsOptions, http1Options, http2Options, headers, or origHeaders");
    return {
      kind: "custom",
      emulationJson
    };
  }
  return {
    kind: "preset",
    browser: DEFAULT_BROWSER,
    os: DEFAULT_OS
  };
}
function applyNativeEmulationMode(target, mode) {
  if (mode.kind === "custom") {
    target.emulationJson = mode.emulationJson;
    return;
  }
  target.browser = mode.browser;
  target.os = mode.os;
  if (mode.emulationJson !== void 0) target.emulationJson = mode.emulationJson;
}
async function dispatchRequest(options, requestUrl, signal) {
  if (!signal) {
    const requestId2 = generateRequestId();
    let payload2;
    try {
      payload2 = await nativeBinding.request(options, requestId2, false);
    } catch (error3) {
      if (error3 instanceof RequestError) throw error3;
      throw new RequestError(String(error3));
    }
    return new Response2(payload2, requestUrl);
  }
  const requestId = generateRequestId();
  const cancelNative = /* @__PURE__ */ __name(() => {
    try {
      nativeBinding.cancelRequest(requestId);
    } catch {
    }
  }, "cancelNative");
  const abortHandler = setupAbort(signal, cancelNative);
  const pending = Promise.race([nativeBinding.request(options, requestId, true), abortHandler.promise]);
  let payload;
  try {
    payload = await pending;
  } catch (error3) {
    if (isAbortError(error3)) throw error3;
    if (error3 instanceof RequestError) throw error3;
    throw new RequestError(String(error3));
  } finally {
    abortHandler.cleanup();
  }
  return new Response2(payload, requestUrl);
}
async function fetch2(input, init) {
  const resolved2 = await resolveFetchArgs(input, init);
  const url = resolved2.url;
  const config2 = resolved2.init;
  const sessionContext = resolveSessionContext(config2);
  const sessionDefaults = sessionContext.defaults;
  validateRedirectMode(config2.redirect);
  if (config2.timeout !== void 0) validateTimeout(config2.timeout);
  validateTrustStore(config2.trustStore);
  const method = ensureMethod(config2.method);
  const serializedBody = await serializeBody(config2.body ?? null);
  const body = serializedBody.body;
  ensureBodyAllowed(method, body);
  let headerTuples = mergeHeaderTuples(sessionDefaults?.defaultHeaders, config2.headers);
  if (serializedBody.contentType && !hasHeaderName(headerTuples, "content-type")) {
    if (!headerTuples) headerTuples = [];
    headerTuples.push(["Content-Type", serializedBody.contentType]);
  }
  const transport = resolveTransportContext(config2, sessionDefaults);
  const timeout = config2.timeout ?? sessionDefaults?.timeout ?? DEFAULT_REQUEST_TIMEOUT_MS;
  const requestOptions = {
    url,
    method,
    sessionId: sessionContext.sessionId,
    ephemeral: sessionContext.dropAfterRequest
  };
  if (body !== void 0) requestOptions.body = body;
  if (transport.captureDiagnostics !== void 0) requestOptions.captureDiagnostics = transport.captureDiagnostics;
  if (config2.onRequestEvent !== void 0) requestOptions.onRequestEvent = config2.onRequestEvent;
  if (transport.transportId) requestOptions.transportId = transport.transportId;
  else {
    if (transport.mode !== void 0) applyNativeEmulationMode(requestOptions, transport.mode);
    if (transport.proxy !== void 0) requestOptions.proxy = transport.proxy;
    if (transport.insecure !== void 0) requestOptions.insecure = transport.insecure;
    if (transport.trustStore !== void 0) requestOptions.trustStore = transport.trustStore;
  }
  requestOptions.timeout = timeout;
  if (config2.redirect !== void 0) requestOptions.redirect = config2.redirect;
  if (config2.disableDefaultHeaders !== void 0) requestOptions.disableDefaultHeaders = config2.disableDefaultHeaders;
  if (config2.compress !== void 0) requestOptions.compress = config2.compress;
  if (headerTuples && headerTuples.length > 0) requestOptions.headers = headerTuples;
  return dispatchRequest(requestOptions, url, config2.signal ?? null);
}
async function createTransport(options) {
  const mode = resolveEmulationMode(options?.browser, options?.os, options?.emulation);
  validateTrustStore(options?.trustStore);
  if (options?.resolve !== void 0) validateResolve(options.resolve);
  if (options?.poolIdleTimeout !== void 0) validatePositiveNumber(options.poolIdleTimeout, "poolIdleTimeout");
  if (options?.poolMaxIdlePerHost !== void 0) validateNonNegativeInteger(options.poolMaxIdlePerHost, "poolMaxIdlePerHost");
  if (options?.poolMaxSize !== void 0) validatePositiveInteger(options.poolMaxSize, "poolMaxSize");
  if (options?.connectTimeout !== void 0) validatePositiveNumber(options.connectTimeout, "connectTimeout");
  if (options?.readTimeout !== void 0) validatePositiveNumber(options.readTimeout, "readTimeout");
  try {
    const transportOptions = {
      ...options?.proxy !== void 0 && { proxy: options.proxy },
      ...options?.insecure !== void 0 && { insecure: options.insecure },
      trustStore: options?.trustStore ?? DEFAULT_TRUST_STORE,
      ...options?.resolve !== void 0 && { resolve: options.resolve },
      ...options?.poolIdleTimeout !== void 0 && { poolIdleTimeout: options.poolIdleTimeout },
      ...options?.poolMaxIdlePerHost !== void 0 && { poolMaxIdlePerHost: options.poolMaxIdlePerHost },
      ...options?.poolMaxSize !== void 0 && { poolMaxSize: options.poolMaxSize },
      ...options?.connectTimeout !== void 0 && { connectTimeout: options.connectTimeout },
      ...options?.readTimeout !== void 0 && { readTimeout: options.readTimeout },
      ...options?.captureDiagnostics !== void 0 && { captureDiagnostics: options.captureDiagnostics }
    };
    applyNativeEmulationMode(transportOptions, mode);
    return new Transport(nativeBinding.createTransport(transportOptions));
  } catch (error3) {
    throw new RequestError(String(error3));
  }
}
async function createSession(options) {
  const { sessionId, defaults } = normalizeSessionOptions(options);
  let createdId;
  let transportId;
  try {
    const transportOptions = {
      ...defaults.proxy !== void 0 && { proxy: defaults.proxy },
      ...defaults.insecure !== void 0 && { insecure: defaults.insecure },
      trustStore: defaults.trustStore ?? DEFAULT_TRUST_STORE,
      ...defaults.captureDiagnostics !== void 0 && { captureDiagnostics: defaults.captureDiagnostics }
    };
    applyNativeEmulationMode(transportOptions, defaults.transportMode);
    transportId = nativeBinding.createTransport(transportOptions);
  } catch (error3) {
    throw new RequestError(String(error3));
  }
  try {
    createdId = nativeBinding.createSession({ sessionId });
  } catch (error3) {
    try {
      nativeBinding.dropTransport(transportId);
    } catch {
    }
    throw new RequestError(String(error3));
  }
  defaults.transportId = transportId;
  defaults.ownsTransport = true;
  return new Session(createdId, defaults);
}
async function withSession(fn, options) {
  const session2 = await createSession(options);
  try {
    return await fn(session2);
  } finally {
    await session2.close();
  }
}
async function request(options) {
  if (!options.url) throw new RequestError("URL is required");
  const { url, ...rest } = options;
  const init = {};
  const legacy = rest;
  if (rest.method !== void 0) init.method = rest.method;
  if (rest.headers !== void 0) init.headers = rest.headers;
  if (rest.body !== void 0) init.body = rest.body;
  if (rest.browser !== void 0) init.browser = rest.browser;
  if (rest.os !== void 0) init.os = rest.os;
  if (rest.emulation !== void 0) init.emulation = rest.emulation;
  if (rest.proxy !== void 0) init.proxy = rest.proxy;
  if (rest.timeout !== void 0) init.timeout = rest.timeout;
  if (rest.sessionId !== void 0) init.sessionId = rest.sessionId;
  if (rest.transport !== void 0) init.transport = rest.transport;
  if (rest.insecure !== void 0) init.insecure = rest.insecure;
  if (rest.trustStore !== void 0) init.trustStore = rest.trustStore;
  if (rest.disableDefaultHeaders !== void 0) init.disableDefaultHeaders = rest.disableDefaultHeaders;
  if (rest.redirect !== void 0) init.redirect = rest.redirect;
  if (legacy.signal !== void 0) init.signal = legacy.signal;
  if (legacy.session !== void 0) init.session = legacy.session;
  if (legacy.cookieMode !== void 0) init.cookieMode = legacy.cookieMode;
  else if (legacy.ephemeral === true) init.cookieMode = "ephemeral";
  if (legacy.onRequestEvent !== void 0) init.onRequestEvent = legacy.onRequestEvent;
  if (legacy.captureDiagnostics !== void 0) init.captureDiagnostics = legacy.captureDiagnostics;
  return fetch2(url, init);
}
function getProfiles() {
  if (!cachedProfiles) cachedProfiles = nativeBinding.getProfiles();
  return cachedProfiles;
}
function getProfileSet() {
  if (!cachedProfileSet) cachedProfileSet = new Set(getProfiles());
  return cachedProfileSet;
}
function getOperatingSystems() {
  if (!cachedOperatingSystems) {
    const fromNative = nativeBinding.getOperatingSystems?.();
    cachedOperatingSystems = fromNative && fromNative.length > 0 ? fromNative : [...SUPPORTED_OSES];
  }
  return cachedOperatingSystems;
}
function getOperatingSystemSet() {
  if (!cachedOperatingSystemSet) cachedOperatingSystemSet = new Set(getOperatingSystems());
  return cachedOperatingSystemSet;
}
function resolveProfile(browser) {
  validateBrowserProfile(browser);
  return Object.hasOwn(BROWSER_ALIASES, browser) ? BROWSER_ALIASES[browser] : browser;
}
function getEmulationHeaders(browser, os) {
  validateOperatingSystem(os);
  const resolvedBrowser = browser === void 0 ? DEFAULT_BROWSER : resolveProfile(browser);
  const resolvedOs = os ?? DEFAULT_OS;
  const cacheKey = `${resolvedBrowser}\0${resolvedOs}`;
  let tuples = cachedEmulationHeaders.get(cacheKey);
  if (!tuples) {
    const readEmulationHeaders = nativeBinding.getEmulationHeaders;
    if (!readEmulationHeaders) throw new RequestError("getEmulationHeaders is not available in this build of the native addon");
    tuples = readEmulationHeaders(resolvedBrowser, resolvedOs);
    cachedEmulationHeaders.set(cacheKey, tuples);
  }
  return new Headers2(tuples);
}
async function get(url, init) {
  const config2 = {};
  if (init) Object.assign(config2, init);
  config2.method = "GET";
  return fetch2(url, config2);
}
async function post(url, body, init) {
  const config2 = {};
  if (init) Object.assign(config2, init);
  config2.method = "POST";
  if (body !== void 0) config2.body = body;
  return fetch2(url, config2);
}
function normalizeWebSocketUrl(url) {
  const normalized = String(url).trim();
  if (!normalized) throw new RequestError("URL is required");
  let parsed;
  try {
    parsed = new URL(normalized);
  } catch (error3) {
    throw new RequestError(String(error3));
  }
  if (parsed.hash) throw new RequestError("WebSocket URL must not include a hash fragment");
  if (parsed.protocol === "http:") parsed.protocol = "ws:";
  else if (parsed.protocol === "https:") parsed.protocol = "wss:";
  if (parsed.protocol !== "ws:" && parsed.protocol !== "wss:") throw new RequestError("expected a ws: or wss: url");
  return parsed.toString();
}
function validateWebSocketProtocols(protocols) {
  if (protocols === void 0) return;
  const protocolList = typeof protocols === "string" ? [protocols] : protocols;
  const seen = /* @__PURE__ */ new Set();
  const validToken = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
  for (const protocol of protocolList) {
    if (typeof protocol !== "string" || protocol.length === 0) throw new RequestError("WebSocket protocol values must be non-empty strings");
    if (!validToken.test(protocol)) throw new RequestError(`Invalid WebSocket protocol value: ${protocol}`);
    if (seen.has(protocol)) throw new RequestError(`Duplicate WebSocket protocol: ${protocol}`);
    seen.add(protocol);
  }
}
function normalizeWebSocketSizeOption(value, label) {
  if (value === void 0) return;
  if (!Number.isSafeInteger(value) || value <= 0) throw new RequestError(`${label} must be a positive safe integer`);
  return value;
}
function normalizeStandaloneWebSocketOptions(options) {
  const normalized = {};
  if (!options) return normalized;
  if (options.browser !== void 0) normalized.browser = options.browser;
  if (options.os !== void 0) normalized.os = options.os;
  if (options.emulation !== void 0) normalized.emulation = options.emulation;
  if (options.headers !== void 0) normalized.headers = options.headers;
  if (options.proxy !== void 0) normalized.proxy = options.proxy;
  if (options.protocols !== void 0) normalized.protocols = options.protocols;
  if (options.maxFrameSize !== void 0) {
    const maxFrameSize = normalizeWebSocketSizeOption(options.maxFrameSize, "maxFrameSize");
    if (maxFrameSize !== void 0) normalized.maxFrameSize = maxFrameSize;
  }
  if (options.maxMessageSize !== void 0) {
    const maxMessageSize = normalizeWebSocketSizeOption(options.maxMessageSize, "maxMessageSize");
    if (maxMessageSize !== void 0) normalized.maxMessageSize = maxMessageSize;
  }
  if (options.binaryType !== void 0) {
    if (options.binaryType !== "nodebuffer" && options.binaryType !== "arraybuffer" && options.binaryType !== "blob") throw new RequestError("binaryType must be one of: 'nodebuffer', 'arraybuffer', 'blob'");
    normalized.binaryType = options.binaryType;
  }
  return normalized;
}
function normalizeSessionWebSocketOptions(options) {
  const normalized = {};
  if (!options) return normalized;
  const optionsWithOverrides = options;
  if (optionsWithOverrides.browser !== void 0) throw new RequestError("`browser` is not supported in session.websocket(); the session controls browser emulation.");
  if (optionsWithOverrides.os !== void 0) throw new RequestError("`os` is not supported in session.websocket(); the session controls OS emulation.");
  if (optionsWithOverrides.emulation !== void 0) throw new RequestError("`emulation` is not supported in session.websocket(); the session transport controls emulation.");
  if (optionsWithOverrides.proxy !== void 0) throw new RequestError("`proxy` is not supported in session.websocket(); the session transport controls proxying.");
  if (options.headers !== void 0) normalized.headers = options.headers;
  if (options.protocols !== void 0) normalized.protocols = options.protocols;
  if (options.maxFrameSize !== void 0) {
    const maxFrameSize = normalizeWebSocketSizeOption(options.maxFrameSize, "maxFrameSize");
    if (maxFrameSize !== void 0) normalized.maxFrameSize = maxFrameSize;
  }
  if (options.maxMessageSize !== void 0) {
    const maxMessageSize = normalizeWebSocketSizeOption(options.maxMessageSize, "maxMessageSize");
    if (maxMessageSize !== void 0) normalized.maxMessageSize = maxMessageSize;
  }
  if (options.binaryType !== void 0) {
    if (options.binaryType !== "nodebuffer" && options.binaryType !== "arraybuffer" && options.binaryType !== "blob") throw new RequestError("binaryType must be one of: 'nodebuffer', 'arraybuffer', 'blob'");
    normalized.binaryType = options.binaryType;
  }
  return normalized;
}
function extractLegacyWebSocketCallbacks(options) {
  if (!isPlainObject(options)) return;
  const maybeCallbacks = options;
  const callbacks = {};
  if (typeof maybeCallbacks.onMessage === "function") callbacks.onMessage = maybeCallbacks.onMessage;
  if (typeof maybeCallbacks.onClose === "function") callbacks.onClose = maybeCallbacks.onClose;
  if (typeof maybeCallbacks.onError === "function") callbacks.onError = maybeCallbacks.onError;
  return Object.keys(callbacks).length > 0 ? callbacks : void 0;
}
function normalizeWebSocketCloseOptions(code, reason) {
  if (code === void 0 && reason === void 0) return;
  if (code === void 0) throw new RequestError("A close code is required when providing a close reason");
  if (!Number.isInteger(code)) throw new RequestError("Close code must be an integer");
  if (code !== 1e3 && (code < 3e3 || code > 4999)) throw new RequestError("Close code must be 1000 or in range 3000-4999");
  const normalizedReason = reason ?? "";
  if (Buffer.byteLength(normalizedReason, "utf8") > 123) throw new RequestError("Close reason must be 123 bytes or fewer");
  return {
    code,
    reason: normalizedReason
  };
}
function isWebSocketListenerType(type) {
  return type === "open" || type === "message" || type === "close" || type === "error";
}
function isInternalWebSocketInit(value) {
  if (!isPlainObject(value)) return false;
  const candidate = value;
  return candidate._internal === true && typeof candidate.url === "string" && typeof candidate.connect === "function";
}
function normalizeStandaloneWebSocketArgs(urlOrOptions, options) {
  if (typeof urlOrOptions === "string" || urlOrOptions instanceof URL) {
    const normalizedOptions2 = normalizeStandaloneWebSocketOptions(options);
    return {
      url: normalizeWebSocketUrl(urlOrOptions),
      options: normalizedOptions2,
      legacyCallbacks: extractLegacyWebSocketCallbacks(options)
    };
  }
  const legacy = urlOrOptions;
  const normalizedOptions = normalizeStandaloneWebSocketOptions(legacy);
  return {
    url: normalizeWebSocketUrl(legacy.url),
    options: normalizedOptions,
    legacyCallbacks: extractLegacyWebSocketCallbacks(legacy)
  };
}
function normalizeSessionWebSocketArgs(urlOrOptions, options) {
  if (typeof urlOrOptions === "string" || urlOrOptions instanceof URL) {
    const normalizedOptions2 = normalizeSessionWebSocketOptions(options);
    return {
      url: normalizeWebSocketUrl(urlOrOptions),
      options: normalizedOptions2,
      legacyCallbacks: extractLegacyWebSocketCallbacks(options)
    };
  }
  const legacy = urlOrOptions;
  const normalizedOptions = normalizeSessionWebSocketOptions(legacy);
  return {
    url: normalizeWebSocketUrl(legacy.url),
    options: normalizedOptions,
    legacyCallbacks: extractLegacyWebSocketCallbacks(legacy)
  };
}
async function websocket(urlOrOptions, options) {
  const normalized = normalizeStandaloneWebSocketArgs(urlOrOptions, options);
  validateWebSocketProtocols(normalized.options.protocols);
  assertNoManualWebSocketProtocolHeader(normalized.options.headers);
  const emulationMode = resolveEmulationMode(normalized.options.browser, normalized.options.os, normalized.options.emulation);
  const protocols = normalizeWebSocketProtocolList(normalized.options.protocols);
  return WebSocket2._connectWithInit({
    _internal: true,
    url: normalized.url,
    options: normalized.options,
    openDispatchMode: "deferred",
    connect: /* @__PURE__ */ __name((callbacks) => {
      const nativeOptions = {
        url: normalized.url,
        headers: headersToTuples(normalized.options.headers ?? {}),
        ...protocols && protocols.length > 0 && { protocols },
        ...normalized.options.proxy !== void 0 && { proxy: normalized.options.proxy },
        ...normalized.options.maxFrameSize !== void 0 && { maxFrameSize: normalized.options.maxFrameSize },
        ...normalized.options.maxMessageSize !== void 0 && { maxMessageSize: normalized.options.maxMessageSize },
        onMessage: callbacks.onMessage,
        onClose: callbacks.onClose,
        onError: callbacks.onError
      };
      applyNativeEmulationMode(nativeOptions, emulationMode);
      return nativeBinding.websocketConnect(nativeOptions);
    }, "connect"),
    legacyCallbacks: normalized.legacyCallbacks
  });
}
var BROWSER_ALIASES, nativeRequire, RequestError, nativeBinding, cachedProfiles, cachedProfileSet, cachedOperatingSystems, cachedOperatingSystemSet, cachedEmulationHeaders, NATIVE_PLATFORMS, websocketFinalizer, bodyHandleFinalizer, DEFAULT_BROWSER, DEFAULT_OS, DEFAULT_REQUEST_TIMEOUT_MS, DEFAULT_TRUST_STORE, SUPPORTED_OSES, UTF8_DECODER, ephemeralIdCounter, Headers2, Response2, Transport, Session, REQUEST_ID_MAX, requestIdCounter, SUPPORTED_ALPN_PROTOCOLS, SUPPORTED_ALPS_PROTOCOLS, SUPPORTED_CERTIFICATE_COMPRESSION_ALGORITHMS, HTTP2_SETTING_IDS, HTTP2_PSEUDO_HEADER_IDS, TLS_VERSION_ALIASES, WebSocket2, wreq_js_default;
var init_wreq_js = __esm({
  "node_modules/wreq-js/dist/wreq-js.js"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_http();
    BROWSER_ALIASES = {
      chrome: "chrome_149",
      edge: "edge_148",
      firefox: "firefox_151",
      firefox_android: "firefox_android_135",
      firefox_private: "firefox_private_136",
      okhttp: "okhttp_5",
      opera: "opera_131",
      safari: "safari_26.4",
      safari_ios: "safari_ios_26.2",
      safari_ipad: "safari_ipad_26.2"
    };
    nativeRequire = createRequire(import.meta.url);
    RequestError = class extends TypeError {
      static {
        __name(this, "RequestError");
      }
      constructor(message) {
        super(message);
        this.name = "RequestError";
      }
    };
    cachedEmulationHeaders = /* @__PURE__ */ new Map();
    __name(detectLibc, "detectLibc");
    NATIVE_PLATFORMS = [
      "darwin-x64",
      "darwin-arm64",
      "linux-x64-gnu",
      "linux-x64-musl",
      "linux-arm64-gnu",
      "linux-arm64-musl",
      "win32-x64-msvc",
      "win32-arm64-msvc",
      "android-arm64"
    ];
    __name(resolveNativePlatform, "resolveNativePlatform");
    __name(loadNativeBinding, "loadNativeBinding");
    nativeBinding = loadNativeBinding();
    websocketFinalizer = typeof FinalizationRegistry === "function" ? new FinalizationRegistry((connection) => {
      nativeBinding.websocketClose(connection).catch(() => void 0);
    }) : void 0;
    bodyHandleFinalizer = typeof FinalizationRegistry === "function" ? new FinalizationRegistry((handle) => {
      if (handle.released) return;
      handle.released = true;
      try {
        nativeBinding.cancelBody(handle.id);
      } catch {
      }
    }) : void 0;
    DEFAULT_BROWSER = BROWSER_ALIASES.chrome;
    DEFAULT_OS = "macos";
    DEFAULT_REQUEST_TIMEOUT_MS = 3e5;
    DEFAULT_TRUST_STORE = "combined";
    SUPPORTED_OSES = [
      "windows",
      "macos",
      "linux",
      "android",
      "ios"
    ];
    UTF8_DECODER = new TextDecoder("utf-8");
    ephemeralIdCounter = 0;
    __name(generateEphemeralSessionId, "generateEphemeralSessionId");
    __name(generateSessionId, "generateSessionId");
    __name(normalizeSessionOptions, "normalizeSessionOptions");
    __name(isIterable, "isIterable");
    __name(isPlainObject, "isPlainObject");
    __name(coerceHeaderValue, "coerceHeaderValue");
    Headers2 = class Headers3 {
      static {
        __name(this, "Headers");
      }
      store = /* @__PURE__ */ new Map();
      constructor(init) {
        if (init) this.applyInit(init);
      }
      applyInit(init) {
        if (init instanceof Headers3) {
          for (const [name, value] of init) this.append(name, value);
          return;
        }
        if (Array.isArray(init) || isIterable(init)) {
          for (const tuple of init) {
            if (!tuple) continue;
            const [name, value] = tuple;
            this.append(name, value);
          }
          return;
        }
        if (isPlainObject(init)) for (const [name, value] of Object.entries(init)) {
          if (value === void 0 || value === null) continue;
          this.set(name, coerceHeaderValue(value));
        }
      }
      normalizeName(name) {
        if (typeof name !== "string") throw new TypeError("Header name must be a string");
        const trimmed = name.trim();
        if (!trimmed) throw new TypeError("Header name must not be empty");
        return {
          key: trimmed.toLowerCase(),
          display: trimmed
        };
      }
      assertValue(value) {
        if (value === void 0 || value === null) throw new TypeError("Header value must not be null or undefined");
        return coerceHeaderValue(value);
      }
      append(name, value) {
        const normalized = this.normalizeName(name);
        const existing = this.store.get(normalized.key);
        const coercedValue = this.assertValue(value);
        if (existing) {
          existing.values.push(coercedValue);
          return;
        }
        this.store.set(normalized.key, {
          name: normalized.display,
          values: [coercedValue]
        });
      }
      set(name, value) {
        const normalized = this.normalizeName(name);
        const coercedValue = this.assertValue(value);
        this.store.set(normalized.key, {
          name: normalized.display,
          values: [coercedValue]
        });
      }
      get(name) {
        const normalized = this.normalizeName(name);
        const entry = this.store.get(normalized.key);
        return entry ? entry.values.join(", ") : null;
      }
      getSetCookie() {
        const entry = this.store.get("set-cookie");
        if (!entry) return [];
        return [...entry.values];
      }
      has(name) {
        const normalized = this.normalizeName(name);
        return this.store.has(normalized.key);
      }
      delete(name) {
        const normalized = this.normalizeName(name);
        this.store.delete(normalized.key);
      }
      entries() {
        return this[Symbol.iterator]();
      }
      *keys() {
        for (const [name] of this) yield name;
      }
      *values() {
        for (const [, value] of this) yield value;
      }
      forEach(callback, thisArg) {
        for (const [name, value] of this) callback.call(thisArg, value, name, this);
      }
      [Symbol.iterator]() {
        const generator = /* @__PURE__ */ __name(function* (store) {
          for (const entry of store.values()) if (entry.name.toLowerCase() === "set-cookie") for (const v of entry.values) yield [entry.name, v];
          else yield [entry.name, entry.values.join(", ")];
        }, "generator");
        return generator(this.store);
      }
      toObject() {
        const result = {};
        for (const entry of this.store.values()) result[entry.name] = entry.values.join(", ");
        return result;
      }
      toTuples() {
        const result = [];
        for (const [name, value] of this) result.push([name, value]);
        return result;
      }
    };
    __name(headersToTuples, "headersToTuples");
    __name(hasHeaderName, "hasHeaderName");
    __name(hasWebSocketProtocolHeader, "hasWebSocketProtocolHeader");
    __name(assertNoManualWebSocketProtocolHeader, "assertNoManualWebSocketProtocolHeader");
    __name(normalizeWebSocketProtocolList, "normalizeWebSocketProtocolList");
    __name(mergeHeaderTuples, "mergeHeaderTuples");
    __name(cloneNativeResponse, "cloneNativeResponse");
    __name(releaseNativeBody, "releaseNativeBody");
    __name(markNativeBodyReleased, "markNativeBodyReleased");
    __name(createNativeBodyStream, "createNativeBodyStream");
    __name(wrapBodyStream, "wrapBodyStream");
    Response2 = class Response3 {
      static {
        __name(this, "Response");
      }
      status;
      ok;
      contentLength;
      url;
      diagnostics;
      type = "basic";
      bodyUsed = false;
      payload;
      requestUrl;
      redirectedMemo;
      headersInit;
      headersInstance;
      cookiesInit;
      cookiesRecord;
      inlineBody;
      bodySource;
      bodyStream;
      nativeHandleAvailable;
      nativeHandle;
      constructor(payload, requestUrl, bodySource) {
        this.payload = payload;
        this.requestUrl = requestUrl;
        this.status = this.payload.status;
        this.ok = this.status >= 200 && this.status < 300;
        this.headersInit = this.payload.headers;
        this.headersInstance = null;
        this.url = this.payload.url;
        this.diagnostics = this.payload.diagnostics ?? null;
        this.cookiesInit = this.payload.cookies;
        this.cookiesRecord = null;
        this.contentLength = this.payload.contentLength ?? null;
        this.inlineBody = this.payload.bodyBytes ?? null;
        this.nativeHandle = null;
        if (typeof bodySource !== "undefined") {
          this.bodySource = bodySource;
          this.nativeHandleAvailable = false;
        } else if (this.inlineBody !== null) {
          this.bodySource = null;
          this.nativeHandleAvailable = false;
        } else if (this.payload.bodyHandle !== null) {
          this.bodySource = null;
          this.nativeHandleAvailable = true;
          this.nativeHandle = {
            id: this.payload.bodyHandle,
            released: false
          };
          bodyHandleFinalizer?.register(this, this.nativeHandle, this.nativeHandle);
        } else {
          this.bodySource = null;
          this.nativeHandleAvailable = false;
        }
        this.bodyStream = void 0;
      }
      get redirected() {
        if (this.redirectedMemo !== void 0) return this.redirectedMemo;
        if (this.url === this.requestUrl) {
          this.redirectedMemo = false;
          return false;
        }
        const normalizedRequestUrl = normalizeUrlForComparison(this.requestUrl);
        this.redirectedMemo = normalizedRequestUrl ? this.url !== normalizedRequestUrl : true;
        return this.redirectedMemo;
      }
      get statusText() {
        return STATUS_CODES[this.status] ?? "";
      }
      get headers() {
        if (!this.headersInstance) this.headersInstance = new Headers2(this.headersInit);
        return this.headersInstance;
      }
      get cookies() {
        if (!this.cookiesRecord) {
          const record = /* @__PURE__ */ Object.create(null);
          for (const [name, value] of this.cookiesInit) {
            const existing = record[name];
            if (existing === void 0) record[name] = value;
            else if (Array.isArray(existing)) existing.push(value);
            else record[name] = [existing, value];
          }
          this.cookiesRecord = record;
        }
        return this.cookiesRecord;
      }
      get body() {
        if (this.inlineBody && this.bodySource === null) {
          const bytes = this.inlineBody;
          this.inlineBody = null;
          this.bodySource = new ReadableStream({ start(controller) {
            controller.enqueue(bytes);
            controller.close();
          } });
        }
        if (this.inlineBody === null && this.payload.bodyHandle === null && this.bodySource === null) return null;
        if (this.bodySource === null && this.nativeHandleAvailable && this.payload.bodyHandle !== null) {
          if (this.nativeHandle) bodyHandleFinalizer?.unregister(this.nativeHandle);
          const handle = this.nativeHandle ?? {
            id: this.payload.bodyHandle,
            released: false
          };
          this.nativeHandle = handle;
          this.bodySource = createNativeBodyStream(handle);
          this.nativeHandleAvailable = false;
        }
        if (this.bodySource === null) return null;
        if (this.bodyStream === void 0) this.bodyStream = wrapBodyStream(this.bodySource, () => {
          this.bodyUsed = true;
        });
        return this.bodyStream;
      }
      async json() {
        const text = await this.text();
        return JSON.parse(text);
      }
      async arrayBuffer() {
        const bytes = await this.consumeBody();
        const { buffer, byteOffset, byteLength } = bytes;
        if (buffer instanceof ArrayBuffer) {
          if (byteOffset === 0 && byteLength === buffer.byteLength) return buffer;
          return buffer.slice(byteOffset, byteOffset + byteLength);
        }
        const view = new Uint8Array(byteLength);
        view.set(bytes);
        return view.buffer;
      }
      async bytes() {
        return new Uint8Array(await this.arrayBuffer());
      }
      async text() {
        const bytes = await this.consumeBody();
        return UTF8_DECODER.decode(bytes);
      }
      async blob() {
        const bytes = await this.consumeBody();
        const contentType = this.headers.get("content-type") ?? "";
        return new Blob([bytes], contentType ? { type: contentType } : void 0);
      }
      async formData() {
        const bytes = await this.consumeBody();
        const contentType = this.headers.get("content-type");
        return new globalThis.Response(bytes, contentType ? { headers: { "content-type": contentType } } : void 0).formData();
      }
      readable() {
        this.assertBodyAvailable();
        this.bodyUsed = true;
        const stream = this.body;
        if (stream === null) return Readable2.from([]);
        return Readable2.fromWeb(stream);
      }
      clone() {
        if (this.bodyUsed) throw new TypeError("Cannot clone a Response whose body is already used");
        if (this.nativeHandleAvailable && this.payload.bodyHandle !== null) {
          if (this.nativeHandle) bodyHandleFinalizer?.unregister(this.nativeHandle);
          const handle = this.nativeHandle ?? {
            id: this.payload.bodyHandle,
            released: false
          };
          this.nativeHandle = handle;
          this.bodySource = createNativeBodyStream(handle);
          this.nativeHandleAvailable = false;
        }
        if (this.bodySource === null) return new Response3(cloneNativeResponse(this.payload), this.requestUrl, null);
        const [branchA, branchB] = this.bodySource.tee();
        this.bodySource = branchA;
        this.bodyStream = void 0;
        return new Response3(cloneNativeResponse(this.payload), this.requestUrl, branchB);
      }
      assertBodyAvailable() {
        if (this.bodyUsed) throw new TypeError("Response body is already used");
      }
      async consumeBody() {
        this.assertBodyAvailable();
        this.bodyUsed = true;
        if (this.inlineBody) {
          const bytes = this.inlineBody;
          this.inlineBody = null;
          return bytes;
        }
        if (this.nativeHandleAvailable && this.payload.bodyHandle !== null) {
          this.nativeHandleAvailable = false;
          try {
            return await nativeBinding.readBodyAll(this.payload.bodyHandle);
          } catch (error3) {
            if (String(error3).includes("Body handle") && String(error3).includes("not found")) return Buffer.alloc(0);
            throw error3;
          } finally {
            if (this.nativeHandle) markNativeBodyReleased(this.nativeHandle);
          }
        }
        const stream = this.body;
        if (!stream) return Buffer.alloc(0);
        const reader = stream.getReader();
        const chunks = [];
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (value && value.byteLength > 0) if (Buffer.isBuffer(value)) chunks.push(value);
            else chunks.push(Buffer.from(value.buffer, value.byteOffset, value.byteLength));
          }
        } finally {
        }
        return chunks.length === 0 ? Buffer.alloc(0) : Buffer.concat(chunks);
      }
    };
    Transport = class {
      static {
        __name(this, "Transport");
      }
      id;
      disposed = false;
      constructor(id) {
        this.id = id;
      }
      get closed() {
        return this.disposed;
      }
      async close() {
        if (this.disposed) return;
        this.disposed = true;
        try {
          nativeBinding.dropTransport(this.id);
        } catch (error3) {
          throw new RequestError(String(error3));
        }
      }
      async [Symbol.asyncDispose]() {
        await this.close();
      }
    };
    Session = class {
      static {
        __name(this, "Session");
      }
      id;
      disposed = false;
      defaults;
      constructor(id, defaults) {
        this.id = id;
        this.defaults = defaults;
      }
      get closed() {
        return this.disposed;
      }
      ensureActive() {
        if (this.disposed) throw new RequestError("Session has been closed");
      }
      /** @internal */
      getDefaults() {
        const snapshot2 = { ...this.defaults };
        if (this.defaults.defaultHeaders) snapshot2.defaultHeaders = [...this.defaults.defaultHeaders];
        return snapshot2;
      }
      /** @internal */
      _defaultsRef() {
        return this.defaults;
      }
      async fetch(input, init) {
        this.ensureActive();
        return fetch2(input, init ? {
          ...init,
          session: this
        } : { session: this });
      }
      async clearCookies() {
        this.ensureActive();
        try {
          nativeBinding.clearSession(this.id);
        } catch (error3) {
          throw new RequestError(String(error3));
        }
      }
      getCookies(url) {
        this.ensureActive();
        try {
          return nativeBinding.getCookies(this.id, String(url));
        } catch (error3) {
          throw new RequestError(String(error3));
        }
      }
      getAllCookies() {
        this.ensureActive();
        try {
          return nativeBinding.getAllCookies(this.id);
        } catch (error3) {
          throw new RequestError(String(error3));
        }
      }
      setCookie(name, value, url) {
        this.ensureActive();
        try {
          nativeBinding.setCookie(this.id, name, value, String(url));
        } catch (error3) {
          throw new RequestError(String(error3));
        }
      }
      async websocket(urlOrOptions, options) {
        this.ensureActive();
        const normalized = normalizeSessionWebSocketArgs(urlOrOptions, options);
        validateWebSocketProtocols(normalized.options.protocols);
        assertNoManualWebSocketProtocolHeader(normalized.options.headers);
        const protocols = normalizeWebSocketProtocolList(normalized.options.protocols);
        const transportId = this.defaults.transportId;
        if (!transportId) throw new RequestError("Session has no transport. Create the session with browser/os options or pass a transport to use session.websocket().");
        return WebSocket2._connectWithInit({
          _internal: true,
          url: normalized.url,
          options: normalized.options,
          openDispatchMode: "deferred",
          connect: /* @__PURE__ */ __name((callbacks) => nativeBinding.websocketConnectSession({
            url: normalized.url,
            sessionId: this.id,
            transportId,
            headers: headersToTuples(normalized.options.headers ?? {}),
            ...protocols && protocols.length > 0 && { protocols },
            ...normalized.options.maxFrameSize !== void 0 && { maxFrameSize: normalized.options.maxFrameSize },
            ...normalized.options.maxMessageSize !== void 0 && { maxMessageSize: normalized.options.maxMessageSize },
            onMessage: callbacks.onMessage,
            onClose: callbacks.onClose,
            onError: callbacks.onError
          }), "connect"),
          legacyCallbacks: normalized.legacyCallbacks
        });
      }
      async close() {
        if (this.disposed) return;
        this.disposed = true;
        const transportId = this.defaults.transportId;
        const ownsTransport = this.defaults.ownsTransport;
        try {
          nativeBinding.dropSession(this.id);
        } catch (error3) {
          if (!ownsTransport || !transportId) throw new RequestError(String(error3));
          const originalError = error3;
          try {
            nativeBinding.dropTransport(transportId);
          } catch {
          }
          throw new RequestError(String(originalError));
        }
        if (ownsTransport && transportId) try {
          nativeBinding.dropTransport(transportId);
        } catch (error3) {
          throw new RequestError(String(error3));
        }
      }
      async [Symbol.asyncDispose]() {
        await this.close();
      }
    };
    __name(resolveSessionContext, "resolveSessionContext");
    __name(resolveTransportContext, "resolveTransportContext");
    __name(createAbortError, "createAbortError");
    __name(isAbortError, "isAbortError");
    REQUEST_ID_MAX = 2 ** 48;
    requestIdCounter = Math.trunc(Number(process.hrtime.bigint() % BigInt(REQUEST_ID_MAX - 1))) + 1;
    __name(generateRequestId, "generateRequestId");
    __name(setupAbort, "setupAbort");
    __name(coerceUrlInput, "coerceUrlInput");
    __name(isRequestLike, "isRequestLike");
    __name(resolveFetchArgs, "resolveFetchArgs");
    __name(normalizeUrlForComparison, "normalizeUrlForComparison");
    __name(validateRedirectMode, "validateRedirectMode");
    __name(serializeBody, "serializeBody");
    __name(ensureMethod, "ensureMethod");
    __name(ensureBodyAllowed, "ensureBodyAllowed");
    __name(validateBrowserProfile, "validateBrowserProfile");
    __name(validateOperatingSystem, "validateOperatingSystem");
    __name(validateTimeout, "validateTimeout");
    __name(validateTrustStore, "validateTrustStore");
    __name(validatePositiveNumber, "validatePositiveNumber");
    __name(validateNonNegativeInteger, "validateNonNegativeInteger");
    __name(validatePositiveInteger, "validatePositiveInteger");
    __name(validateResolve, "validateResolve");
    __name(validateIntegerInRange, "validateIntegerInRange");
    SUPPORTED_ALPN_PROTOCOLS = /* @__PURE__ */ new Set([
      "HTTP1",
      "HTTP2",
      "HTTP3"
    ]);
    SUPPORTED_ALPS_PROTOCOLS = /* @__PURE__ */ new Set([
      "HTTP1",
      "HTTP2",
      "HTTP3"
    ]);
    SUPPORTED_CERTIFICATE_COMPRESSION_ALGORITHMS = /* @__PURE__ */ new Set([
      "zlib",
      "brotli",
      "zstd"
    ]);
    HTTP2_SETTING_IDS = /* @__PURE__ */ new Set([
      "HeaderTableSize",
      "EnablePush",
      "MaxConcurrentStreams",
      "InitialWindowSize",
      "MaxFrameSize",
      "MaxHeaderListSize",
      "EnableConnectProtocol",
      "NoRfc7540Priorities"
    ]);
    HTTP2_PSEUDO_HEADER_IDS = /* @__PURE__ */ new Set([
      "Method",
      "Scheme",
      "Authority",
      "Path",
      "Protocol"
    ]);
    TLS_VERSION_ALIASES = /* @__PURE__ */ new Map([
      ["1.0", "1.0"],
      ["1.1", "1.1"],
      ["1.2", "1.2"],
      ["1.3", "1.3"],
      ["tls1.0", "1.0"],
      ["tls1.1", "1.1"],
      ["tls1.2", "1.2"],
      ["tls1.3", "1.3"]
    ]);
    __name(isNonEmpty, "isNonEmpty");
    __name(normalizeProtocolList, "normalizeProtocolList");
    __name(normalizeTlsVersion, "normalizeTlsVersion");
    __name(normalizeOrigHeaders, "normalizeOrigHeaders");
    __name(normalizeCustomTlsOptions, "normalizeCustomTlsOptions");
    __name(normalizeCustomHttp1Options, "normalizeCustomHttp1Options");
    __name(normalizeHttp2StreamDependency, "normalizeHttp2StreamDependency");
    __name(normalizeCustomHttp2Options, "normalizeCustomHttp2Options");
    __name(normalizeCustomEmulationOptions, "normalizeCustomEmulationOptions");
    __name(serializeCustomEmulationOptions, "serializeCustomEmulationOptions");
    __name(resolveEmulationMode, "resolveEmulationMode");
    __name(applyNativeEmulationMode, "applyNativeEmulationMode");
    __name(dispatchRequest, "dispatchRequest");
    __name(fetch2, "fetch");
    __name(createTransport, "createTransport");
    __name(createSession, "createSession");
    __name(withSession, "withSession");
    __name(request, "request");
    __name(getProfiles, "getProfiles");
    __name(getProfileSet, "getProfileSet");
    __name(getOperatingSystems, "getOperatingSystems");
    __name(getOperatingSystemSet, "getOperatingSystemSet");
    __name(resolveProfile, "resolveProfile");
    __name(getEmulationHeaders, "getEmulationHeaders");
    __name(get, "get");
    __name(post, "post");
    __name(normalizeWebSocketUrl, "normalizeWebSocketUrl");
    __name(validateWebSocketProtocols, "validateWebSocketProtocols");
    __name(normalizeWebSocketSizeOption, "normalizeWebSocketSizeOption");
    __name(normalizeStandaloneWebSocketOptions, "normalizeStandaloneWebSocketOptions");
    __name(normalizeSessionWebSocketOptions, "normalizeSessionWebSocketOptions");
    __name(extractLegacyWebSocketCallbacks, "extractLegacyWebSocketCallbacks");
    __name(normalizeWebSocketCloseOptions, "normalizeWebSocketCloseOptions");
    __name(isWebSocketListenerType, "isWebSocketListenerType");
    WebSocket2 = class WebSocket3 {
      static {
        __name(this, "WebSocket");
      }
      static CONNECTING = 0;
      static OPEN = 1;
      static CLOSING = 2;
      static CLOSED = 3;
      url;
      protocol = "";
      extensions = "";
      readyState = WebSocket3.CONNECTING;
      _binaryType = "nodebuffer";
      _bufferedAmount = 0;
      _onopen = null;
      _onmessage = null;
      _onclose = null;
      _onerror = null;
      _onHandlerOrder = {
        open: -1,
        message: -1,
        close: -1,
        error: -1
      };
      _listenerOrderCounter = 0;
      _listeners = {
        open: /* @__PURE__ */ new Map(),
        message: /* @__PURE__ */ new Map(),
        close: /* @__PURE__ */ new Map(),
        error: /* @__PURE__ */ new Map()
      };
      _legacyCallbacks;
      _openDispatchMode;
      _connection;
      _connectPromise;
      _closeOptions;
      _finalizerToken;
      _openEventDispatched = false;
      _openEventQueued = false;
      _closeEventDispatched = false;
      _nativeCloseStarted = false;
      _pendingMessages = [];
      _sendChain = Promise.resolve();
      constructor(urlOrInit, protocolsOrOptions, maybeOptions) {
        let init;
        if (isInternalWebSocketInit(urlOrInit)) init = urlOrInit;
        else init = WebSocket3.buildStandaloneInit(urlOrInit, protocolsOrOptions, maybeOptions);
        this.url = init.url;
        this.binaryType = init.options.binaryType ?? "nodebuffer";
        this._legacyCallbacks = init.legacyCallbacks;
        this._openDispatchMode = init.openDispatchMode;
        this._connectPromise = this.connect(init.connect);
        this._connectPromise.catch(() => void 0);
      }
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(value) {
        if (value === "arraybuffer" || value === "blob" || value === "nodebuffer") this._binaryType = value;
      }
      get bufferedAmount() {
        return this._bufferedAmount;
      }
      get onopen() {
        return this._onopen;
      }
      set onopen(listener) {
        this._onopen = listener;
        this._onHandlerOrder.open = listener ? ++this._listenerOrderCounter : -1;
      }
      get onmessage() {
        return this._onmessage;
      }
      set onmessage(listener) {
        this._onmessage = listener;
        this._onHandlerOrder.message = listener ? ++this._listenerOrderCounter : -1;
      }
      get onclose() {
        return this._onclose;
      }
      set onclose(listener) {
        this._onclose = listener;
        this._onHandlerOrder.close = listener ? ++this._listenerOrderCounter : -1;
      }
      get onerror() {
        return this._onerror;
      }
      set onerror(listener) {
        this._onerror = listener;
        this._onHandlerOrder.error = listener ? ++this._listenerOrderCounter : -1;
      }
      static async _connectWithInit(init) {
        const ws = new WebSocket3(init);
        await ws._waitUntilConnected();
        ws.scheduleOpenEventAfterAwait();
        return ws;
      }
      static buildStandaloneInit(url, protocolsOrOptions, maybeOptions) {
        const optionsCandidate = typeof protocolsOrOptions === "string" || Array.isArray(protocolsOrOptions) ? maybeOptions : protocolsOrOptions ?? maybeOptions;
        const normalizedOptions = normalizeStandaloneWebSocketOptions(optionsCandidate);
        validateWebSocketProtocols(typeof protocolsOrOptions === "string" || Array.isArray(protocolsOrOptions) ? protocolsOrOptions : normalizedOptions.protocols);
        assertNoManualWebSocketProtocolHeader(normalizedOptions.headers);
        const emulationMode = resolveEmulationMode(normalizedOptions.browser, normalizedOptions.os, normalizedOptions.emulation);
        const protocols = normalizeWebSocketProtocolList(typeof protocolsOrOptions === "string" || Array.isArray(protocolsOrOptions) ? protocolsOrOptions : normalizedOptions.protocols);
        return {
          _internal: true,
          url: normalizeWebSocketUrl(url),
          options: normalizedOptions,
          openDispatchMode: "automatic",
          connect: /* @__PURE__ */ __name((callbacks) => {
            const nativeOptions = {
              url: normalizeWebSocketUrl(url),
              headers: headersToTuples(normalizedOptions.headers ?? {}),
              ...protocols && protocols.length > 0 && { protocols },
              ...normalizedOptions.proxy !== void 0 && { proxy: normalizedOptions.proxy },
              ...normalizedOptions.maxFrameSize !== void 0 && { maxFrameSize: normalizedOptions.maxFrameSize },
              ...normalizedOptions.maxMessageSize !== void 0 && { maxMessageSize: normalizedOptions.maxMessageSize },
              onMessage: callbacks.onMessage,
              onClose: callbacks.onClose,
              onError: callbacks.onError
            };
            applyNativeEmulationMode(nativeOptions, emulationMode);
            return nativeBinding.websocketConnect(nativeOptions);
          }, "connect"),
          legacyCallbacks: extractLegacyWebSocketCallbacks(optionsCandidate)
        };
      }
      async connect(connectFn) {
        try {
          const connection = await connectFn({
            onMessage: /* @__PURE__ */ __name((data) => {
              this.handleNativeMessage(data);
            }, "onMessage"),
            onClose: /* @__PURE__ */ __name((event) => {
              this.handleNativeClose(event);
            }, "onClose"),
            onError: /* @__PURE__ */ __name((message) => {
              this.handleNativeError(message);
            }, "onError")
          });
          this._connection = connection;
          this.protocol = connection.protocol ?? "";
          this.extensions = connection.extensions ?? "";
          if (websocketFinalizer) {
            this._finalizerToken = connection;
            websocketFinalizer.register(this, connection, connection);
          }
          if (this.readyState === WebSocket3.CLOSING) {
            this.startNativeClose();
            return;
          }
          this.readyState = WebSocket3.OPEN;
          if (this._openDispatchMode === "automatic") this.scheduleOpenEventAfterConnect();
        } catch (error3) {
          this.handleNativeError(String(error3));
          this.finalizeClosed({
            code: 1006,
            reason: ""
          }, false);
          throw new RequestError(String(error3));
        }
      }
      _waitUntilConnected() {
        return this._connectPromise;
      }
      scheduleOpenEventAfterConnect() {
        this.scheduleOpenEventWithDepth(2);
      }
      scheduleOpenEventAfterAwait() {
        this.scheduleOpenEventWithDepth(3);
      }
      scheduleOpenEventWithDepth(depth) {
        if (this._openEventDispatched || this._openEventQueued || this.readyState !== WebSocket3.OPEN) return;
        this._openEventQueued = true;
        const queue = /* @__PURE__ */ __name((remaining) => {
          if (remaining === 0) {
            this._openEventQueued = false;
            if (this._openEventDispatched || this.readyState !== WebSocket3.OPEN) return;
            this._openEventDispatched = true;
            this.dispatchOpenEvent();
            return;
          }
          queueMicrotask(() => {
            queue(remaining - 1);
          });
        }, "queue");
        queue(depth);
      }
      releaseConnectionTracking() {
        if (!this._finalizerToken || !websocketFinalizer) return;
        websocketFinalizer.unregister(this._finalizerToken);
        this._finalizerToken = void 0;
      }
      toMessageEventData(data) {
        if (typeof data === "string") return data;
        if (this._binaryType === "arraybuffer") {
          const arrayBuffer = new ArrayBuffer(data.byteLength);
          new Uint8Array(arrayBuffer).set(data);
          return arrayBuffer;
        }
        if (this._binaryType === "blob") return new Blob([data]);
        return data;
      }
      invokeListener(listener, event) {
        try {
          if (typeof listener === "function") listener.call(this, event);
          else listener.handleEvent(event);
        } catch {
        }
      }
      createBaseEvent(type) {
        return {
          type,
          isTrusted: false,
          timeStamp: Date.now(),
          target: this,
          currentTarget: this
        };
      }
      getOnHandler(type) {
        switch (type) {
          case "open":
            return this._onopen;
          case "message":
            return this._onmessage;
          case "close":
            return this._onclose;
          case "error":
            return this._onerror;
          default:
            return null;
        }
      }
      getOnHandlerOrder(type) {
        return this._onHandlerOrder[type];
      }
      getListenerMap(type) {
        return this._listeners[type];
      }
      dispatchEvent(type, event) {
        const listenerMap = this.getListenerMap(type);
        const onHandler = this.getOnHandler(type);
        if (listenerMap.size === 0 && !onHandler) return;
        const ordered = [];
        for (const descriptor of listenerMap.values()) ordered.push({
          order: descriptor.order,
          listener: descriptor.listener,
          once: descriptor.once
        });
        if (onHandler) ordered.push({
          order: this.getOnHandlerOrder(type),
          listener: onHandler,
          once: false
        });
        ordered.sort((a, b) => a.order - b.order);
        for (const entry of ordered) {
          if (entry.once) this.removeEventListener(type, entry.listener);
          this.invokeListener(entry.listener, event);
        }
      }
      dispatchOpenEvent() {
        const event = this.createBaseEvent("open");
        this.dispatchEvent("open", event);
        if (!this._closeEventDispatched && this._pendingMessages.length > 0) {
          const pending = this._pendingMessages;
          this._pendingMessages = [];
          for (const data of pending) this.dispatchMessageEvent(this.toMessageEventData(data));
        }
      }
      dispatchMessageEvent(data) {
        const event = {
          ...this.createBaseEvent("message"),
          data
        };
        this.dispatchEvent("message", event);
      }
      dispatchCloseEvent(event) {
        this.dispatchEvent("close", event);
      }
      dispatchErrorEvent(message) {
        const event = {
          ...this.createBaseEvent("error"),
          ...message !== void 0 && { message }
        };
        this.dispatchEvent("error", event);
      }
      handleNativeMessage(data) {
        if (this._closeEventDispatched) return;
        this._legacyCallbacks?.onMessage?.(data);
        if (!this._openEventDispatched && this.readyState === WebSocket3.OPEN) {
          this._pendingMessages.push(data);
          return;
        }
        this.dispatchMessageEvent(this.toMessageEventData(data));
      }
      handleNativeError(message) {
        this._legacyCallbacks?.onError?.(message);
        this.dispatchErrorEvent(message);
      }
      handleNativeClose(event) {
        const wasClean = this.readyState === WebSocket3.CLOSING || event.code === 1e3;
        this.finalizeClosed(event, wasClean);
      }
      finalizeClosed(event, wasClean) {
        if (this._closeEventDispatched) return;
        this.readyState = WebSocket3.CLOSED;
        this._closeEventDispatched = true;
        this._pendingMessages = [];
        this.releaseConnectionTracking();
        const closeEvent = {
          ...this.createBaseEvent("close"),
          code: event.code,
          reason: event.reason,
          wasClean
        };
        this._legacyCallbacks?.onClose?.(closeEvent);
        this.dispatchCloseEvent(closeEvent);
      }
      startNativeClose() {
        if (this._nativeCloseStarted || !this._connection) return;
        this._nativeCloseStarted = true;
        const connection = this._connection;
        const closeOptions = this._closeOptions;
        nativeBinding.websocketClose(connection, closeOptions).catch((error3) => {
          this.handleNativeError(String(error3));
          this.finalizeClosed({
            code: 1006,
            reason: ""
          }, false);
        });
      }
      addEventListener(type, listener, options) {
        if (!listener || !isWebSocketListenerType(type)) return;
        const normalizedListener = listener;
        if (typeof normalizedListener !== "function" && (typeof normalizedListener !== "object" || normalizedListener === null || typeof normalizedListener.handleEvent !== "function")) return;
        const listenerMap = this.getListenerMap(type);
        if (listenerMap.has(normalizedListener)) return;
        const parsedOptions = typeof options === "boolean" ? {} : options ?? {};
        const once2 = parsedOptions.once === true;
        const signal = parsedOptions.signal;
        if (signal?.aborted) return;
        const descriptor = {
          listener: normalizedListener,
          order: ++this._listenerOrderCounter,
          once: once2
        };
        if (signal) {
          const onAbort = /* @__PURE__ */ __name(() => {
            this.removeEventListener(type, normalizedListener);
          }, "onAbort");
          descriptor.abortSignal = signal;
          descriptor.abortHandler = onAbort;
          signal.addEventListener("abort", onAbort, { once: true });
        }
        listenerMap.set(normalizedListener, descriptor);
      }
      removeEventListener(type, listener) {
        if (!listener || !isWebSocketListenerType(type)) return;
        const normalizedListener = listener;
        if (typeof normalizedListener !== "function" && typeof normalizedListener !== "object") return;
        const listenerMap = this.getListenerMap(type);
        const descriptor = listenerMap.get(normalizedListener);
        if (!descriptor) return;
        if (descriptor.abortSignal && descriptor.abortHandler) descriptor.abortSignal.removeEventListener("abort", descriptor.abortHandler);
        listenerMap.delete(normalizedListener);
      }
      getSendByteLength(data) {
        if (typeof data === "string") return Buffer.byteLength(data);
        if (Buffer.isBuffer(data)) return data.byteLength;
        if (data instanceof ArrayBuffer) return data.byteLength;
        if (ArrayBuffer.isView(data)) return data.byteLength;
        if (typeof Blob !== "undefined" && data instanceof Blob) return data.size;
        throw new TypeError("WebSocket data must be a string, Buffer, ArrayBuffer, ArrayBufferView, or Blob");
      }
      async normalizeSendPayload(data) {
        if (typeof data === "string") return data;
        if (Buffer.isBuffer(data)) return data;
        if (data instanceof ArrayBuffer) return Buffer.from(data);
        if (ArrayBuffer.isView(data)) return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
        if (typeof Blob !== "undefined" && data instanceof Blob) return Buffer.from(await data.arrayBuffer());
        throw new TypeError("WebSocket data must be a string, Buffer, ArrayBuffer, ArrayBufferView, or Blob");
      }
      send(data) {
        if (this.readyState !== WebSocket3.OPEN || !this._connection) throw new RequestError("WebSocket is not open");
        const queuedBytes = this.getSendByteLength(data);
        const connection = this._connection;
        this._bufferedAmount += queuedBytes;
        const sendTask = /* @__PURE__ */ __name(async () => {
          try {
            const payload = await this.normalizeSendPayload(data);
            await nativeBinding.websocketSend(connection, payload);
          } catch (error3) {
            this.handleNativeError(String(error3));
            this.finalizeClosed({
              code: 1006,
              reason: ""
            }, false);
          } finally {
            this._bufferedAmount = Math.max(0, this._bufferedAmount - queuedBytes);
          }
        }, "sendTask");
        this._sendChain = this._sendChain.then(sendTask, sendTask);
      }
      close(code, reason) {
        if (this.readyState === WebSocket3.CLOSING || this.readyState === WebSocket3.CLOSED) return;
        this._closeOptions = normalizeWebSocketCloseOptions(code, reason);
        this.readyState = WebSocket3.CLOSING;
        this.startNativeClose();
      }
      [Symbol.dispose]() {
        this.close();
      }
    };
    __name(isInternalWebSocketInit, "isInternalWebSocketInit");
    __name(normalizeStandaloneWebSocketArgs, "normalizeStandaloneWebSocketArgs");
    __name(normalizeSessionWebSocketArgs, "normalizeSessionWebSocketArgs");
    __name(websocket, "websocket");
    wreq_js_default = {
      fetch: fetch2,
      request,
      get,
      post,
      getProfiles,
      getOperatingSystems,
      createTransport,
      createSession,
      withSession,
      websocket,
      WebSocket: WebSocket2,
      Headers: Headers2,
      Response: Response2,
      Transport,
      Session,
      RequestError
    };
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs
var access, copyFile, cp, open, opendir, rename, truncate, rm, rmdir, mkdir, readdir, readlink, symlink, lstat, stat, link, unlink, chmod, lchmod, lchown, chown, utimes, lutimes, realpath, mkdtemp, writeFile, appendFile, readFile, watch, statfs, glob;
var init_promises = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    access = /* @__PURE__ */ notImplemented("fs.access");
    copyFile = /* @__PURE__ */ notImplemented("fs.copyFile");
    cp = /* @__PURE__ */ notImplemented("fs.cp");
    open = /* @__PURE__ */ notImplemented("fs.open");
    opendir = /* @__PURE__ */ notImplemented("fs.opendir");
    rename = /* @__PURE__ */ notImplemented("fs.rename");
    truncate = /* @__PURE__ */ notImplemented("fs.truncate");
    rm = /* @__PURE__ */ notImplemented("fs.rm");
    rmdir = /* @__PURE__ */ notImplemented("fs.rmdir");
    mkdir = /* @__PURE__ */ notImplemented("fs.mkdir");
    readdir = /* @__PURE__ */ notImplemented("fs.readdir");
    readlink = /* @__PURE__ */ notImplemented("fs.readlink");
    symlink = /* @__PURE__ */ notImplemented("fs.symlink");
    lstat = /* @__PURE__ */ notImplemented("fs.lstat");
    stat = /* @__PURE__ */ notImplemented("fs.stat");
    link = /* @__PURE__ */ notImplemented("fs.link");
    unlink = /* @__PURE__ */ notImplemented("fs.unlink");
    chmod = /* @__PURE__ */ notImplemented("fs.chmod");
    lchmod = /* @__PURE__ */ notImplemented("fs.lchmod");
    lchown = /* @__PURE__ */ notImplemented("fs.lchown");
    chown = /* @__PURE__ */ notImplemented("fs.chown");
    utimes = /* @__PURE__ */ notImplemented("fs.utimes");
    lutimes = /* @__PURE__ */ notImplemented("fs.lutimes");
    realpath = /* @__PURE__ */ notImplemented("fs.realpath");
    mkdtemp = /* @__PURE__ */ notImplemented("fs.mkdtemp");
    writeFile = /* @__PURE__ */ notImplemented("fs.writeFile");
    appendFile = /* @__PURE__ */ notImplemented("fs.appendFile");
    readFile = /* @__PURE__ */ notImplemented("fs.readFile");
    watch = /* @__PURE__ */ notImplemented("fs.watch");
    statfs = /* @__PURE__ */ notImplemented("fs.statfs");
    glob = /* @__PURE__ */ notImplemented("fs.glob");
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs
var constants_exports = {};
__export(constants_exports, {
  COPYFILE_EXCL: () => COPYFILE_EXCL,
  COPYFILE_FICLONE: () => COPYFILE_FICLONE,
  COPYFILE_FICLONE_FORCE: () => COPYFILE_FICLONE_FORCE,
  EXTENSIONLESS_FORMAT_JAVASCRIPT: () => EXTENSIONLESS_FORMAT_JAVASCRIPT,
  EXTENSIONLESS_FORMAT_WASM: () => EXTENSIONLESS_FORMAT_WASM,
  F_OK: () => F_OK,
  O_APPEND: () => O_APPEND,
  O_CREAT: () => O_CREAT,
  O_DIRECT: () => O_DIRECT,
  O_DIRECTORY: () => O_DIRECTORY,
  O_DSYNC: () => O_DSYNC,
  O_EXCL: () => O_EXCL,
  O_NOATIME: () => O_NOATIME,
  O_NOCTTY: () => O_NOCTTY,
  O_NOFOLLOW: () => O_NOFOLLOW,
  O_NONBLOCK: () => O_NONBLOCK,
  O_RDONLY: () => O_RDONLY,
  O_RDWR: () => O_RDWR,
  O_SYNC: () => O_SYNC,
  O_TRUNC: () => O_TRUNC,
  O_WRONLY: () => O_WRONLY,
  R_OK: () => R_OK,
  S_IFBLK: () => S_IFBLK,
  S_IFCHR: () => S_IFCHR,
  S_IFDIR: () => S_IFDIR,
  S_IFIFO: () => S_IFIFO,
  S_IFLNK: () => S_IFLNK,
  S_IFMT: () => S_IFMT,
  S_IFREG: () => S_IFREG,
  S_IFSOCK: () => S_IFSOCK,
  S_IRGRP: () => S_IRGRP,
  S_IROTH: () => S_IROTH,
  S_IRUSR: () => S_IRUSR,
  S_IRWXG: () => S_IRWXG,
  S_IRWXO: () => S_IRWXO,
  S_IRWXU: () => S_IRWXU,
  S_IWGRP: () => S_IWGRP,
  S_IWOTH: () => S_IWOTH,
  S_IWUSR: () => S_IWUSR,
  S_IXGRP: () => S_IXGRP,
  S_IXOTH: () => S_IXOTH,
  S_IXUSR: () => S_IXUSR,
  UV_DIRENT_BLOCK: () => UV_DIRENT_BLOCK,
  UV_DIRENT_CHAR: () => UV_DIRENT_CHAR,
  UV_DIRENT_DIR: () => UV_DIRENT_DIR,
  UV_DIRENT_FIFO: () => UV_DIRENT_FIFO,
  UV_DIRENT_FILE: () => UV_DIRENT_FILE,
  UV_DIRENT_LINK: () => UV_DIRENT_LINK,
  UV_DIRENT_SOCKET: () => UV_DIRENT_SOCKET,
  UV_DIRENT_UNKNOWN: () => UV_DIRENT_UNKNOWN,
  UV_FS_COPYFILE_EXCL: () => UV_FS_COPYFILE_EXCL,
  UV_FS_COPYFILE_FICLONE: () => UV_FS_COPYFILE_FICLONE,
  UV_FS_COPYFILE_FICLONE_FORCE: () => UV_FS_COPYFILE_FICLONE_FORCE,
  UV_FS_O_FILEMAP: () => UV_FS_O_FILEMAP,
  UV_FS_SYMLINK_DIR: () => UV_FS_SYMLINK_DIR,
  UV_FS_SYMLINK_JUNCTION: () => UV_FS_SYMLINK_JUNCTION,
  W_OK: () => W_OK,
  X_OK: () => X_OK
});
var UV_FS_SYMLINK_DIR, UV_FS_SYMLINK_JUNCTION, O_RDONLY, O_WRONLY, O_RDWR, UV_DIRENT_UNKNOWN, UV_DIRENT_FILE, UV_DIRENT_DIR, UV_DIRENT_LINK, UV_DIRENT_FIFO, UV_DIRENT_SOCKET, UV_DIRENT_CHAR, UV_DIRENT_BLOCK, EXTENSIONLESS_FORMAT_JAVASCRIPT, EXTENSIONLESS_FORMAT_WASM, S_IFMT, S_IFREG, S_IFDIR, S_IFCHR, S_IFBLK, S_IFIFO, S_IFLNK, S_IFSOCK, O_CREAT, O_EXCL, UV_FS_O_FILEMAP, O_NOCTTY, O_TRUNC, O_APPEND, O_DIRECTORY, O_NOATIME, O_NOFOLLOW, O_SYNC, O_DSYNC, O_DIRECT, O_NONBLOCK, S_IRWXU, S_IRUSR, S_IWUSR, S_IXUSR, S_IRWXG, S_IRGRP, S_IWGRP, S_IXGRP, S_IRWXO, S_IROTH, S_IWOTH, S_IXOTH, F_OK, R_OK, W_OK, X_OK, UV_FS_COPYFILE_EXCL, COPYFILE_EXCL, UV_FS_COPYFILE_FICLONE, COPYFILE_FICLONE, UV_FS_COPYFILE_FICLONE_FORCE, COPYFILE_FICLONE_FORCE;
var init_constants2 = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    UV_FS_SYMLINK_DIR = 1;
    UV_FS_SYMLINK_JUNCTION = 2;
    O_RDONLY = 0;
    O_WRONLY = 1;
    O_RDWR = 2;
    UV_DIRENT_UNKNOWN = 0;
    UV_DIRENT_FILE = 1;
    UV_DIRENT_DIR = 2;
    UV_DIRENT_LINK = 3;
    UV_DIRENT_FIFO = 4;
    UV_DIRENT_SOCKET = 5;
    UV_DIRENT_CHAR = 6;
    UV_DIRENT_BLOCK = 7;
    EXTENSIONLESS_FORMAT_JAVASCRIPT = 0;
    EXTENSIONLESS_FORMAT_WASM = 1;
    S_IFMT = 61440;
    S_IFREG = 32768;
    S_IFDIR = 16384;
    S_IFCHR = 8192;
    S_IFBLK = 24576;
    S_IFIFO = 4096;
    S_IFLNK = 40960;
    S_IFSOCK = 49152;
    O_CREAT = 64;
    O_EXCL = 128;
    UV_FS_O_FILEMAP = 0;
    O_NOCTTY = 256;
    O_TRUNC = 512;
    O_APPEND = 1024;
    O_DIRECTORY = 65536;
    O_NOATIME = 262144;
    O_NOFOLLOW = 131072;
    O_SYNC = 1052672;
    O_DSYNC = 4096;
    O_DIRECT = 16384;
    O_NONBLOCK = 2048;
    S_IRWXU = 448;
    S_IRUSR = 256;
    S_IWUSR = 128;
    S_IXUSR = 64;
    S_IRWXG = 56;
    S_IRGRP = 32;
    S_IWGRP = 16;
    S_IXGRP = 8;
    S_IRWXO = 7;
    S_IROTH = 4;
    S_IWOTH = 2;
    S_IXOTH = 1;
    F_OK = 0;
    R_OK = 4;
    W_OK = 2;
    X_OK = 1;
    UV_FS_COPYFILE_EXCL = 1;
    COPYFILE_EXCL = 1;
    UV_FS_COPYFILE_FICLONE = 2;
    COPYFILE_FICLONE = 2;
    UV_FS_COPYFILE_FICLONE_FORCE = 4;
    COPYFILE_FICLONE_FORCE = 4;
  }
});

// node_modules/unenv/dist/runtime/node/fs/promises.mjs
var promises_exports = {};
__export(promises_exports, {
  access: () => access,
  appendFile: () => appendFile,
  chmod: () => chmod,
  chown: () => chown,
  constants: () => constants_exports,
  copyFile: () => copyFile,
  cp: () => cp,
  default: () => promises_default,
  glob: () => glob,
  lchmod: () => lchmod,
  lchown: () => lchown,
  link: () => link,
  lstat: () => lstat,
  lutimes: () => lutimes,
  mkdir: () => mkdir,
  mkdtemp: () => mkdtemp,
  open: () => open,
  opendir: () => opendir,
  readFile: () => readFile,
  readdir: () => readdir,
  readlink: () => readlink,
  realpath: () => realpath,
  rename: () => rename,
  rm: () => rm,
  rmdir: () => rmdir,
  stat: () => stat,
  statfs: () => statfs,
  symlink: () => symlink,
  truncate: () => truncate,
  unlink: () => unlink,
  utimes: () => utimes,
  watch: () => watch,
  writeFile: () => writeFile
});
var promises_default;
var init_promises2 = __esm({
  "node_modules/unenv/dist/runtime/node/fs/promises.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises();
    init_constants2();
    init_promises();
    promises_default = {
      constants: constants_exports,
      access,
      appendFile,
      chmod,
      chown,
      copyFile,
      cp,
      glob,
      lchmod,
      lchown,
      link,
      lstat,
      lutimes,
      mkdir,
      mkdtemp,
      open,
      opendir,
      readFile,
      readdir,
      readlink,
      realpath,
      rename,
      rm,
      rmdir,
      stat,
      statfs,
      symlink,
      truncate,
      unlink,
      utimes,
      watch,
      writeFile
    };
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs
var Dir, Dirent, Stats, ReadStream2, WriteStream2, FileReadStream, FileWriteStream;
var init_classes = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    Dir = /* @__PURE__ */ notImplementedClass("fs.Dir");
    Dirent = /* @__PURE__ */ notImplementedClass("fs.Dirent");
    Stats = /* @__PURE__ */ notImplementedClass("fs.Stats");
    ReadStream2 = /* @__PURE__ */ notImplementedClass("fs.ReadStream");
    WriteStream2 = /* @__PURE__ */ notImplementedClass("fs.WriteStream");
    FileReadStream = ReadStream2;
    FileWriteStream = WriteStream2;
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs
function callbackify(fn) {
  const fnc = /* @__PURE__ */ __name(function(...args) {
    const cb = args.pop();
    fn().catch((error3) => cb(error3)).then((val) => cb(void 0, val));
  }, "fnc");
  fnc.__promisify__ = fn;
  fnc.native = fnc;
  return fnc;
}
var access2, appendFile2, chown2, chmod2, copyFile2, cp2, lchown2, lchmod2, link2, lstat2, lutimes2, mkdir2, mkdtemp2, realpath2, open2, opendir2, readdir2, readFile2, readlink2, rename2, rm2, rmdir2, stat2, symlink2, truncate2, unlink2, utimes2, writeFile2, statfs2, close, createReadStream, createWriteStream, exists, fchown, fchmod, fdatasync, fstat, fsync, ftruncate, futimes, lstatSync, read, readv, realpathSync, statSync, unwatchFile, watch2, watchFile, write, writev, _toUnixTimestamp, openAsBlob, glob2, appendFileSync, accessSync, chownSync, chmodSync, closeSync, copyFileSync, cpSync, existsSync, fchownSync, fchmodSync, fdatasyncSync, fstatSync, fsyncSync, ftruncateSync, futimesSync, lchownSync, lchmodSync, linkSync, lutimesSync, mkdirSync, mkdtempSync, openSync, opendirSync, readdirSync, readSync, readvSync, readFileSync, readlinkSync, renameSync, rmSync, rmdirSync, symlinkSync, truncateSync, unlinkSync, utimesSync, writeFileSync, writeSync, writevSync, statfsSync, globSync;
var init_fs = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_promises();
    __name(callbackify, "callbackify");
    access2 = callbackify(access);
    appendFile2 = callbackify(appendFile);
    chown2 = callbackify(chown);
    chmod2 = callbackify(chmod);
    copyFile2 = callbackify(copyFile);
    cp2 = callbackify(cp);
    lchown2 = callbackify(lchown);
    lchmod2 = callbackify(lchmod);
    link2 = callbackify(link);
    lstat2 = callbackify(lstat);
    lutimes2 = callbackify(lutimes);
    mkdir2 = callbackify(mkdir);
    mkdtemp2 = callbackify(mkdtemp);
    realpath2 = callbackify(realpath);
    open2 = callbackify(open);
    opendir2 = callbackify(opendir);
    readdir2 = callbackify(readdir);
    readFile2 = callbackify(readFile);
    readlink2 = callbackify(readlink);
    rename2 = callbackify(rename);
    rm2 = callbackify(rm);
    rmdir2 = callbackify(rmdir);
    stat2 = callbackify(stat);
    symlink2 = callbackify(symlink);
    truncate2 = callbackify(truncate);
    unlink2 = callbackify(unlink);
    utimes2 = callbackify(utimes);
    writeFile2 = callbackify(writeFile);
    statfs2 = callbackify(statfs);
    close = /* @__PURE__ */ notImplementedAsync("fs.close");
    createReadStream = /* @__PURE__ */ notImplementedAsync("fs.createReadStream");
    createWriteStream = /* @__PURE__ */ notImplementedAsync("fs.createWriteStream");
    exists = /* @__PURE__ */ notImplementedAsync("fs.exists");
    fchown = /* @__PURE__ */ notImplementedAsync("fs.fchown");
    fchmod = /* @__PURE__ */ notImplementedAsync("fs.fchmod");
    fdatasync = /* @__PURE__ */ notImplementedAsync("fs.fdatasync");
    fstat = /* @__PURE__ */ notImplementedAsync("fs.fstat");
    fsync = /* @__PURE__ */ notImplementedAsync("fs.fsync");
    ftruncate = /* @__PURE__ */ notImplementedAsync("fs.ftruncate");
    futimes = /* @__PURE__ */ notImplementedAsync("fs.futimes");
    lstatSync = /* @__PURE__ */ notImplementedAsync("fs.lstatSync");
    read = /* @__PURE__ */ notImplementedAsync("fs.read");
    readv = /* @__PURE__ */ notImplementedAsync("fs.readv");
    realpathSync = /* @__PURE__ */ notImplementedAsync("fs.realpathSync");
    statSync = /* @__PURE__ */ notImplementedAsync("fs.statSync");
    unwatchFile = /* @__PURE__ */ notImplementedAsync("fs.unwatchFile");
    watch2 = /* @__PURE__ */ notImplementedAsync("fs.watch");
    watchFile = /* @__PURE__ */ notImplementedAsync("fs.watchFile");
    write = /* @__PURE__ */ notImplementedAsync("fs.write");
    writev = /* @__PURE__ */ notImplementedAsync("fs.writev");
    _toUnixTimestamp = /* @__PURE__ */ notImplementedAsync("fs._toUnixTimestamp");
    openAsBlob = /* @__PURE__ */ notImplementedAsync("fs.openAsBlob");
    glob2 = /* @__PURE__ */ notImplementedAsync("fs.glob");
    appendFileSync = /* @__PURE__ */ notImplemented("fs.appendFileSync");
    accessSync = /* @__PURE__ */ notImplemented("fs.accessSync");
    chownSync = /* @__PURE__ */ notImplemented("fs.chownSync");
    chmodSync = /* @__PURE__ */ notImplemented("fs.chmodSync");
    closeSync = /* @__PURE__ */ notImplemented("fs.closeSync");
    copyFileSync = /* @__PURE__ */ notImplemented("fs.copyFileSync");
    cpSync = /* @__PURE__ */ notImplemented("fs.cpSync");
    existsSync = /* @__PURE__ */ __name(() => false, "existsSync");
    fchownSync = /* @__PURE__ */ notImplemented("fs.fchownSync");
    fchmodSync = /* @__PURE__ */ notImplemented("fs.fchmodSync");
    fdatasyncSync = /* @__PURE__ */ notImplemented("fs.fdatasyncSync");
    fstatSync = /* @__PURE__ */ notImplemented("fs.fstatSync");
    fsyncSync = /* @__PURE__ */ notImplemented("fs.fsyncSync");
    ftruncateSync = /* @__PURE__ */ notImplemented("fs.ftruncateSync");
    futimesSync = /* @__PURE__ */ notImplemented("fs.futimesSync");
    lchownSync = /* @__PURE__ */ notImplemented("fs.lchownSync");
    lchmodSync = /* @__PURE__ */ notImplemented("fs.lchmodSync");
    linkSync = /* @__PURE__ */ notImplemented("fs.linkSync");
    lutimesSync = /* @__PURE__ */ notImplemented("fs.lutimesSync");
    mkdirSync = /* @__PURE__ */ notImplemented("fs.mkdirSync");
    mkdtempSync = /* @__PURE__ */ notImplemented("fs.mkdtempSync");
    openSync = /* @__PURE__ */ notImplemented("fs.openSync");
    opendirSync = /* @__PURE__ */ notImplemented("fs.opendirSync");
    readdirSync = /* @__PURE__ */ notImplemented("fs.readdirSync");
    readSync = /* @__PURE__ */ notImplemented("fs.readSync");
    readvSync = /* @__PURE__ */ notImplemented("fs.readvSync");
    readFileSync = /* @__PURE__ */ notImplemented("fs.readFileSync");
    readlinkSync = /* @__PURE__ */ notImplemented("fs.readlinkSync");
    renameSync = /* @__PURE__ */ notImplemented("fs.renameSync");
    rmSync = /* @__PURE__ */ notImplemented("fs.rmSync");
    rmdirSync = /* @__PURE__ */ notImplemented("fs.rmdirSync");
    symlinkSync = /* @__PURE__ */ notImplemented("fs.symlinkSync");
    truncateSync = /* @__PURE__ */ notImplemented("fs.truncateSync");
    unlinkSync = /* @__PURE__ */ notImplemented("fs.unlinkSync");
    utimesSync = /* @__PURE__ */ notImplemented("fs.utimesSync");
    writeFileSync = /* @__PURE__ */ notImplemented("fs.writeFileSync");
    writeSync = /* @__PURE__ */ notImplemented("fs.writeSync");
    writevSync = /* @__PURE__ */ notImplemented("fs.writevSync");
    statfsSync = /* @__PURE__ */ notImplemented("fs.statfsSync");
    globSync = /* @__PURE__ */ notImplemented("fs.globSync");
  }
});

// node_modules/unenv/dist/runtime/node/fs.mjs
var fs_exports = {};
__export(fs_exports, {
  Dir: () => Dir,
  Dirent: () => Dirent,
  F_OK: () => F_OK,
  FileReadStream: () => FileReadStream,
  FileWriteStream: () => FileWriteStream,
  R_OK: () => R_OK,
  ReadStream: () => ReadStream2,
  Stats: () => Stats,
  W_OK: () => W_OK,
  WriteStream: () => WriteStream2,
  X_OK: () => X_OK,
  _toUnixTimestamp: () => _toUnixTimestamp,
  access: () => access2,
  accessSync: () => accessSync,
  appendFile: () => appendFile2,
  appendFileSync: () => appendFileSync,
  chmod: () => chmod2,
  chmodSync: () => chmodSync,
  chown: () => chown2,
  chownSync: () => chownSync,
  close: () => close,
  closeSync: () => closeSync,
  constants: () => constants_exports,
  copyFile: () => copyFile2,
  copyFileSync: () => copyFileSync,
  cp: () => cp2,
  cpSync: () => cpSync,
  createReadStream: () => createReadStream,
  createWriteStream: () => createWriteStream,
  default: () => fs_default,
  exists: () => exists,
  existsSync: () => existsSync,
  fchmod: () => fchmod,
  fchmodSync: () => fchmodSync,
  fchown: () => fchown,
  fchownSync: () => fchownSync,
  fdatasync: () => fdatasync,
  fdatasyncSync: () => fdatasyncSync,
  fstat: () => fstat,
  fstatSync: () => fstatSync,
  fsync: () => fsync,
  fsyncSync: () => fsyncSync,
  ftruncate: () => ftruncate,
  ftruncateSync: () => ftruncateSync,
  futimes: () => futimes,
  futimesSync: () => futimesSync,
  glob: () => glob2,
  globSync: () => globSync,
  lchmod: () => lchmod2,
  lchmodSync: () => lchmodSync,
  lchown: () => lchown2,
  lchownSync: () => lchownSync,
  link: () => link2,
  linkSync: () => linkSync,
  lstat: () => lstat2,
  lstatSync: () => lstatSync,
  lutimes: () => lutimes2,
  lutimesSync: () => lutimesSync,
  mkdir: () => mkdir2,
  mkdirSync: () => mkdirSync,
  mkdtemp: () => mkdtemp2,
  mkdtempSync: () => mkdtempSync,
  open: () => open2,
  openAsBlob: () => openAsBlob,
  openSync: () => openSync,
  opendir: () => opendir2,
  opendirSync: () => opendirSync,
  promises: () => promises_default,
  read: () => read,
  readFile: () => readFile2,
  readFileSync: () => readFileSync,
  readSync: () => readSync,
  readdir: () => readdir2,
  readdirSync: () => readdirSync,
  readlink: () => readlink2,
  readlinkSync: () => readlinkSync,
  readv: () => readv,
  readvSync: () => readvSync,
  realpath: () => realpath2,
  realpathSync: () => realpathSync,
  rename: () => rename2,
  renameSync: () => renameSync,
  rm: () => rm2,
  rmSync: () => rmSync,
  rmdir: () => rmdir2,
  rmdirSync: () => rmdirSync,
  stat: () => stat2,
  statSync: () => statSync,
  statfs: () => statfs2,
  statfsSync: () => statfsSync,
  symlink: () => symlink2,
  symlinkSync: () => symlinkSync,
  truncate: () => truncate2,
  truncateSync: () => truncateSync,
  unlink: () => unlink2,
  unlinkSync: () => unlinkSync,
  unwatchFile: () => unwatchFile,
  utimes: () => utimes2,
  utimesSync: () => utimesSync,
  watch: () => watch2,
  watchFile: () => watchFile,
  write: () => write,
  writeFile: () => writeFile2,
  writeFileSync: () => writeFileSync,
  writeSync: () => writeSync,
  writev: () => writev,
  writevSync: () => writevSync
});
var fs_default;
var init_fs2 = __esm({
  "node_modules/unenv/dist/runtime/node/fs.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises2();
    init_classes();
    init_fs();
    init_constants2();
    init_constants2();
    init_constants2();
    init_fs();
    init_classes();
    fs_default = {
      F_OK,
      R_OK,
      W_OK,
      X_OK,
      constants: constants_exports,
      promises: promises_default,
      Dir,
      Dirent,
      FileReadStream,
      FileWriteStream,
      ReadStream: ReadStream2,
      Stats,
      WriteStream: WriteStream2,
      _toUnixTimestamp,
      access: access2,
      accessSync,
      appendFile: appendFile2,
      appendFileSync,
      chmod: chmod2,
      chmodSync,
      chown: chown2,
      chownSync,
      close,
      closeSync,
      copyFile: copyFile2,
      copyFileSync,
      cp: cp2,
      cpSync,
      createReadStream,
      createWriteStream,
      exists,
      existsSync,
      fchmod,
      fchmodSync,
      fchown,
      fchownSync,
      fdatasync,
      fdatasyncSync,
      fstat,
      fstatSync,
      fsync,
      fsyncSync,
      ftruncate,
      ftruncateSync,
      futimes,
      futimesSync,
      glob: glob2,
      lchmod: lchmod2,
      globSync,
      lchmodSync,
      lchown: lchown2,
      lchownSync,
      link: link2,
      linkSync,
      lstat: lstat2,
      lstatSync,
      lutimes: lutimes2,
      lutimesSync,
      mkdir: mkdir2,
      mkdirSync,
      mkdtemp: mkdtemp2,
      mkdtempSync,
      open: open2,
      openAsBlob,
      openSync,
      opendir: opendir2,
      opendirSync,
      read,
      readFile: readFile2,
      readFileSync,
      readSync,
      readdir: readdir2,
      readdirSync,
      readlink: readlink2,
      readlinkSync,
      readv,
      readvSync,
      realpath: realpath2,
      realpathSync,
      rename: rename2,
      renameSync,
      rm: rm2,
      rmSync,
      rmdir: rmdir2,
      rmdirSync,
      stat: stat2,
      statSync,
      statfs: statfs2,
      statfsSync,
      symlink: symlink2,
      symlinkSync,
      truncate: truncate2,
      truncateSync,
      unlink: unlink2,
      unlinkSync,
      unwatchFile,
      utimes: utimes2,
      utimesSync,
      watch: watch2,
      watchFile,
      write,
      writeFile: writeFile2,
      writeFileSync,
      writeSync,
      writev,
      writevSync
    };
  }
});

// node_modules/unenv/dist/runtime/node/child_process.mjs
var child_process_exports = {};
__export(child_process_exports, {
  ChildProcess: () => ChildProcess,
  _forkChild: () => _forkChild,
  default: () => child_process_default,
  exec: () => exec,
  execFile: () => execFile,
  execFileSync: () => execFileSync,
  execSync: () => execSync,
  fork: () => fork,
  spawn: () => spawn,
  spawnSync: () => spawnSync
});
var ChildProcess, _forkChild, exec, execFile, execFileSync, execSync, fork, spawn, spawnSync, child_process_default;
var init_child_process = __esm({
  "node_modules/unenv/dist/runtime/node/child_process.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    ChildProcess = /* @__PURE__ */ notImplementedClass("child_process.ChildProcess");
    _forkChild = /* @__PURE__ */ notImplemented("child_process.ChildProcess");
    exec = /* @__PURE__ */ notImplemented("child_process.exec");
    execFile = /* @__PURE__ */ notImplemented("child_process.execFile");
    execFileSync = /* @__PURE__ */ notImplemented("child_process.execFileSync");
    execSync = /* @__PURE__ */ notImplemented("child_process.execSyn");
    fork = /* @__PURE__ */ notImplemented("child_process.fork");
    spawn = /* @__PURE__ */ notImplemented("child_process.spawn");
    spawnSync = /* @__PURE__ */ notImplemented("child_process.spawnSync");
    child_process_default = {
      ChildProcess,
      _forkChild,
      exec,
      execFile,
      execFileSync,
      execSync,
      fork,
      spawn,
      spawnSync
    };
  }
});

// .wrangler/tmp/bundle-tj8hnn/middleware-loader.entry.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// .wrangler/tmp/bundle-tj8hnn/middleware-insertion-facade.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// core/anilist.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var __name2 = /* @__PURE__ */ __name((fn, _) => fn, "__name");
var resolved = /* @__PURE__ */ new Map();
var inflight = /* @__PURE__ */ new Map();
var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
var ARM = "https://arm.haglund.dev/api/v2/ids";
var ANILIST_WEB = "https://anilist.co";
var AL_STATUS_MAP = {
  RELEASING: "RELEASING",
  FINISHED: "FINISHED",
  NOT_YET_RELEASED: "NOT_YET_RELEASED",
  CANCELLED: "FINISHED",
  HIATUS: "HIATUS"
};
function cookiesFromHeaders(headers) {
  const values = typeof headers.getSetCookie === "function" ? headers.getSetCookie() : [headers.get("set-cookie")].filter(Boolean);
  return values.map((value) => String(value).split(";")[0]).join("; ");
}
__name(cookiesFromHeaders, "cookiesFromHeaders");
async function mediaFromResponse(res) {
  if (!res?.ok) return null;
  try {
    const json5 = await res.json();
    return json5.data?.Media ?? null;
  } catch {
    return null;
  }
}
__name(mediaFromResponse, "mediaFromResponse");
async function fetchFromAniListWeb(body) {
  const home = await fetch(`${ANILIST_WEB}/`, {
    headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }
  }).catch(() => null);
  if (!home?.ok) return null;
  const html2 = await home.text();
  const token = html2.match(/window\.al_token\s*=\s*"([^"]+)"/)?.[1];
  const cookie = cookiesFromHeaders(home.headers);
  if (!token || !cookie) return null;
  const res = await fetch(`${ANILIST_WEB}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": UA,
      Referer: `${ANILIST_WEB}/home`,
      "x-csrf-token": token,
      schema: "default",
      Cookie: cookie
    },
    body
  }).catch(() => null);
  return mediaFromResponse(res);
}
__name(fetchFromAniListWeb, "fetchFromAniListWeb");
async function fetchFromAniList(id) {
  const fullQuery = `query($id:Int){Media(id:$id,type:ANIME){id idMal title{english romaji native} status format episodes seasonYear startDate{year} genres synonyms nextAiringEpisode{episode airingAt timeUntilAiring}}}`;
  const body = JSON.stringify({ query: fullQuery, variables: { id } });
  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json", "User-Agent": UA },
    body
  }).catch(() => null);
  return await mediaFromResponse(res) ?? fetchFromAniListWeb(body);
}
__name(fetchFromAniList, "fetchFromAniList");
async function getMedia(anilistId) {
  const id = Number(anilistId);
  if (resolved.has(id)) return resolved.get(id);
  if (inflight.has(id)) return inflight.get(id);
  const promise = (async () => {
    const arm = await fetch(`${ARM}?source=anilist&id=${id}`, {
      headers: { "User-Agent": UA, "Accept": "application/json" }
    }).then((r) => {
      if (!r.ok) return null;
      return r.json();
    }).catch(() => null);
    const al = await fetchFromAniList(id);
    if (!al) throw new Error(`No data found for AniList ID ${id}`);
    const media = {
      id,
      idMal: al.idMal ?? arm?.myanimelist ?? null,
      title: {
        english: al.title?.english ?? null,
        romaji: al.title?.romaji ?? null,
        native: al.title?.native ?? null
      },
      status: AL_STATUS_MAP[al.status] ?? "RELEASING",
      format: al.format ?? null,
      episodes: al.episodes ?? null,
      seasonYear: al.seasonYear ?? null,
      startDate: al.startDate ?? null,
      genres: Array.isArray(al.genres) ? al.genres : [],
      nextAiringEpisode: al.nextAiringEpisode ?? null,
      synonyms: Array.isArray(al.synonyms) ? al.synonyms : []
    };
    resolved.set(id, media);
    inflight.delete(id);
    return media;
  })().catch((e) => {
    inflight.delete(id);
    throw e;
  });
  inflight.set(id, promise);
  return promise;
}
__name(getMedia, "getMedia");
__name2(getMedia, "getMedia");
function forgetMedia(anilistId) {
  resolved.delete(Number(anilistId));
}
__name(forgetMedia, "forgetMedia");

// core/mapper.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var __name3 = /* @__PURE__ */ __name((fn, _) => fn, "__name");
var ARM2 = "https://arm.haglund.dev/api/v2/ids";
var UA2 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0";
function hashFranchiseId(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i) | 0;
  }
  return h >>> 0;
}
__name(hashFranchiseId, "hashFranchiseId");
__name3(hashFranchiseId, "hashFranchiseId");
async function fetchARM(anilistId) {
  const res = await fetch(`${ARM2}?source=anilist&id=${anilistId}`, {
    headers: { "User-Agent": UA2, "Accept": "application/json" }
  }).catch(() => null);
  if (!res || !res.ok) return null;
  return res.json().catch(() => null);
}
__name(fetchARM, "fetchARM");
__name3(fetchARM, "fetchARM");
async function fetchAniListRelations(anilistId) {
  const q = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id synonyms
      relations {
        edges {
          relationType(version: 2)
          node {
            id type format title { romaji english native }
            relations {
              edges {
                relationType(version: 2)
                node { id type format title { romaji english native } }
              }
            }
          }
        }
      }
    }
  }`;
  try {
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ query: q, variables: { id: Number(anilistId) } })
    });
    if (!res.ok) return null;
    const json6 = await res.json();
    return json6.data?.Media ?? null;
  } catch {
    return null;
  }
}
__name(fetchAniListRelations, "fetchAniListRelations");
__name3(fetchAniListRelations, "fetchAniListRelations");
async function mapAnimeIds(anilistId) {
  const [arm, media, alRelations] = await Promise.all([
    fetchARM(anilistId),
    getMedia(anilistId).catch(() => null),
    fetchAniListRelations(anilistId)
  ]);
  const malId = arm?.myanimelist ?? null;
  const format = media?.format ?? null;
  const year = media?.seasonYear ?? null;
  const titleEn = media?.title?.english || null;
  const titleRom = media?.title?.romaji || null;
  const synonyms = [...media?.synonyms ?? []];
  if (alRelations?.synonyms) {
    for (const s of alRelations.synonyms) {
      if (!synonyms.includes(s)) synonyms.push(s);
    }
  }
  const franchiseMap = /* @__PURE__ */ new Map();
  if (alRelations?.relations?.edges) {
    for (const e1 of alRelations.relations.edges) {
      if (!franchiseMap.has(e1.node.id)) {
        franchiseMap.set(e1.node.id, {
          relation: e1.relationType,
          anilistId: e1.node.id,
          title: e1.node.title.romaji || e1.node.title.english,
          type: e1.node.type,
          format: e1.node.format
        });
      }
      if (e1.node.relations?.edges) {
        for (const e2 of e1.node.relations.edges) {
          if (e2.node.id === Number(anilistId)) continue;
          if (!franchiseMap.has(e2.node.id)) {
            franchiseMap.set(e2.node.id, {
              relation: e2.relationType,
              anilistId: e2.node.id,
              title: e2.node.title.romaji || e2.node.title.english,
              type: e2.node.type,
              format: e2.node.format
            });
          }
        }
      }
    }
  }
  const thetvdbId = arm?.thetvdb ?? null;
  const themoviedbId = arm?.themoviedb ?? null;
  const imdbId = arm?.imdb ?? null;
  return {
    mappings: {
      id: Number(anilistId),
      title: titleEn || titleRom,
      type: arm?.media ?? null,
      format,
      episodes: media?.episodes ?? null,
      malId,
      aniId: Number(anilistId),
      anidbId: arm?.anidb ?? null,
      animePlanetId: arm?.["anime-planet"] ?? null,
      kitsuId: arm?.kitsu ?? null,
      animeCountdownId: arm?.animecountdown ?? null,
      anisearchId: arm?.anisearch ?? null,
      notifyMoeId: null,
      simklId: arm?.simkl ?? null,
      imdbId,
      themoviedbId,
      thetvdbId,
      livechartId: arm?.livechart ?? null,
      annId: arm?.animenewsnetwork ?? null,
      animescheduleId: null,
      animethemesId: null,
      animefillerlistId: null,
      franchiseAnchor: thetvdbId ? `tvdb:${thetvdbId}` : null,
      franchiseId: thetvdbId ? hashFranchiseId(`tvdb:${thetvdbId}`) : null,
      defaultTvdbSeason: arm?.["thetvdb-season"] != null ? String(arm["thetvdb-season"]) : null,
      tmdbSeason: arm?.["themoviedb-season"] != null ? String(arm["themoviedb-season"]) : null,
      episodeOffset: null,
      tmdbOffset: null,
      malIds: null,
      aniskip: null,
      animefillerlist: null,
      synonyms,
      franchise: Array.from(franchiseMap.values())
    }
  };
}
__name(mapAnimeIds, "mapAnimeIds");
__name3(mapAnimeIds, "mapAnimeIds");

// providers/mkissa.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
import crypto from "node:crypto";

// core/wreq.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var sessions = /* @__PURE__ */ new Map();
function sessionKey(name, browser, os) {
  return `${name}:${browser}:${os}`;
}
__name(sessionKey, "sessionKey");
var FallbackSessionClient = class {
  static {
    __name(this, "FallbackSessionClient");
  }
  constructor() {
    this.cookies = /* @__PURE__ */ new Map();
  }
  _parseCookies(headers) {
    if (!headers) return;
    const values = typeof headers.getSetCookie === "function" ? headers.getSetCookie() : [headers.get("set-cookie")].filter(Boolean);
    for (const val of values) {
      const parts = String(val).split(";");
      const first = parts[0]?.trim();
      if (!first) continue;
      const eqIdx = first.indexOf("=");
      if (eqIdx > 0) {
        const name = first.slice(0, eqIdx).trim();
        const value = first.slice(eqIdx + 1).trim();
        this.cookies.set(name, value);
      }
    }
  }
  _cookieHeader() {
    if (this.cookies.size === 0) return "";
    return Array.from(this.cookies.entries()).map(([k, v]) => `${k}=${v}`).join("; ");
  }
  async fetch(url, options = {}) {
    const { headers = {}, ...rest } = options;
    const reqHeaders = new Headers(headers);
    const cookieStr = this._cookieHeader();
    if (cookieStr && !reqHeaders.has("Cookie")) {
      reqHeaders.set("Cookie", cookieStr);
    }
    const res = await fetch(url, {
      ...rest,
      headers: reqHeaders
    });
    this._parseCookies(res.headers);
    return res;
  }
  async close() {
    this.cookies.clear();
  }
};
async function getSession(name, browser, os) {
  const key = sessionKey(name, browser, os);
  let current = sessions.get(key);
  if (!current) {
    current = Promise.resolve().then(() => (init_wreq_js(), wreq_js_exports)).then(({ createSession: createSession3 }) => createSession3({ browser, os })).catch((error3) => {
      return new FallbackSessionClient();
    });
    sessions.set(key, current);
  }
  return current;
}
__name(getSession, "getSession");
async function wreqFetch(url, options = {}) {
  const {
    session: session2 = "default",
    browser = "chrome_149",
    os = "windows",
    warm = [],
    ...request3
  } = options;
  const client = await getSession(session2, browser, os);
  for (const item of warm) {
    await client.fetch(item.url, {
      method: item.method ?? "GET",
      headers: item.headers,
      body: item.body,
      redirect: item.redirect ?? "follow"
    });
  }
  return client.fetch(url, request3);
}
__name(wreqFetch, "wreqFetch");

// core/new-provider-utils.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// core/smartcache.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var runtimeEnv = null;
function setRuntimeEnv(env2) {
  if (env2 && typeof env2 === "object") {
    runtimeEnv = env2;
    _CACHE_ENABLED = envBool("CACHE_ENABLED", false);
  }
}
__name(setRuntimeEnv, "setRuntimeEnv");
function readEnv(name) {
  try {
    if (runtimeEnv?.[name] !== void 0) return runtimeEnv[name];
    return typeof process !== "undefined" ? process.env?.[name] : void 0;
  } catch {
    return void 0;
  }
}
__name(readEnv, "readEnv");
function envBool(name, fallback) {
  const raw = readEnv(name);
  if (raw === void 0 || raw === "") return fallback;
  return ["true", "1", "yes", "on"].includes(String(raw).toLowerCase());
}
__name(envBool, "envBool");
function envInt(name, fallback) {
  const raw = readEnv(name);
  const n = Number(raw);
  return raw !== void 0 && raw !== "" && Number.isFinite(n) && n > 0 ? n : fallback;
}
__name(envInt, "envInt");
var _CACHE_ENABLED = envBool("CACHE_ENABLED", false);
function isCacheEnabled() {
  return envBool("CACHE_ENABLED", false);
}
__name(isCacheEnabled, "isCacheEnabled");
var IS_LOCAL_NODE = (() => {
  try {
    return typeof process !== "undefined" && typeof process.versions?.node === "string" && !process.env.VERCEL && !process.env.CF_PAGES && typeof navigator === "undefined";
  } catch {
    return false;
  }
})();
function getUpstashCredentials() {
  const url = readEnv("UPSTASH_REDIS_REST_URL") ?? "";
  const token = readEnv("UPSTASH_REDIS_REST_TOKEN") ?? "";
  return { url, token, enabled: Boolean(url && token) };
}
__name(getUpstashCredentials, "getUpstashCredentials");
function getKV() {
  return runtimeEnv?.CACHE_KV ?? runtimeEnv?.KV ?? null;
}
__name(getKV, "getKV");
function getRedisTtlMs() {
  return envInt("DEFAULT_REDIS_TTL", 900) * 1e3;
}
__name(getRedisTtlMs, "getRedisTtlMs");
function encodeEntry(entry) {
  return JSON.stringify(entry, (_, value) => value === Infinity ? "__Infinity__" : value);
}
__name(encodeEntry, "encodeEntry");
function decodeEntry(raw) {
  return JSON.parse(raw, (_, value) => value === "__Infinity__" ? Infinity : value);
}
__name(decodeEntry, "decodeEntry");
async function redisCommand(command) {
  const creds = getUpstashCredentials();
  if (!creds.enabled || typeof fetch !== "function") return null;
  const res = await fetch(creds.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${creds.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command)
  }).catch(() => null);
  if (!res?.ok) return null;
  const json5 = await res.json().catch(() => null);
  return json5?.result ?? null;
}
__name(redisCommand, "redisCommand");
async function redisWrite(key, entry) {
  const creds = getUpstashCredentials();
  if (!creds.enabled) return;
  const value = encodeEntry(entry);
  const ttlMs = Number.isFinite(entry.ttl) && entry.ttl > 0 ? entry.ttl : getRedisTtlMs();
  await redisCommand(["SET", key, value, "PX", Math.ceil(ttlMs)]);
}
__name(redisWrite, "redisWrite");
var diskInitialized = false;
var diskRead = /* @__PURE__ */ __name(() => null, "diskRead");
var diskWrite = /* @__PURE__ */ __name(() => {
}, "diskWrite");
var diskDel = /* @__PURE__ */ __name(() => {
}, "diskDel");
async function initDisk() {
  if (diskInitialized || !IS_LOCAL_NODE) return;
  diskInitialized = true;
  try {
    const fs = await Promise.resolve().then(() => (init_fs2(), fs_exports));
    const fsp = await Promise.resolve().then(() => (init_promises2(), promises_exports));
    const path = await import("node:path");
    const url = await import("node:url");
    const __dir = path.dirname(url.fileURLToPath(import.meta.url));
    const CACHE_DIR = path.join(__dir, ".cache");
    try {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    } catch {
    }
    const keyToPath = /* @__PURE__ */ __name((key) => path.join(CACHE_DIR, key.replace(/[^a-zA-Z0-9_-]/g, "_") + ".json"), "keyToPath");
    diskRead = /* @__PURE__ */ __name((key) => {
      try {
        const p = keyToPath(key);
        if (!fs.existsSync(p)) return null;
        return decodeEntry(fs.readFileSync(p, "utf8"));
      } catch {
        return null;
      }
    }, "diskRead");
    diskWrite = /* @__PURE__ */ __name((key, entry) => {
      fsp.writeFile(keyToPath(key), encodeEntry(entry)).catch(() => {
      });
    }, "diskWrite");
    diskDel = /* @__PURE__ */ __name((key) => {
      fsp.unlink(keyToPath(key)).catch(() => {
      });
    }, "diskDel");
  } catch {
  }
}
__name(initDisk, "initDisk");
if (IS_LOCAL_NODE) {
  initDisk().catch(() => {
  });
}
var MAX_MEM = 800;
var mem = /* @__PURE__ */ new Map();
function evict() {
  if (mem.size <= MAX_MEM) return;
  const drop = mem.size - MAX_MEM;
  let n = 0;
  for (const k of mem.keys()) {
    if (n++ >= drop) break;
    mem.delete(k);
  }
}
__name(evict, "evict");
function get2(key) {
  if (!isCacheEnabled()) return null;
  let e = mem.get(key);
  if (e) return e;
  e = diskRead(key);
  if (!e) return null;
  mem.set(key, e);
  evict();
  return e;
}
__name(get2, "get");
async function getAsync(key) {
  if (!isCacheEnabled()) return null;
  let e = get2(key);
  if (e) return e;
  const kv = getKV();
  if (kv) {
    try {
      const raw2 = await kv.get(key);
      if (raw2) {
        e = typeof raw2 === "string" ? decodeEntry(raw2) : raw2;
        if (!isFresh(e)) {
          kv.delete(key).catch(() => {
          });
        } else {
          mem.set(key, e);
          evict();
          return e;
        }
      }
    } catch {
    }
  }
  const raw = await redisCommand(["GET", key]);
  if (!raw) return null;
  try {
    e = typeof raw === "string" ? decodeEntry(raw) : raw;
    if (!isFresh(e)) {
      await delAsync(key);
      return null;
    }
    mem.set(key, e);
    evict();
    diskWrite(key, e);
    return e;
  } catch {
    return null;
  }
}
__name(getAsync, "getAsync");
function setLocal(key, data, ttlMs, refreshAfterMs) {
  const now = Date.now();
  const entry = {
    data,
    cachedAt: now,
    ttl: ttlMs,
    refreshAfter: refreshAfterMs ?? ttlMs,
    expiresAt: now + ttlMs
  };
  mem.delete(key);
  mem.set(key, entry);
  evict();
  diskWrite(key, entry);
  return entry;
}
__name(setLocal, "setLocal");
function set(key, data, ttlMs, refreshAfterMs) {
  if (!isCacheEnabled()) return { data, cachedAt: Date.now(), ttl: ttlMs, refreshAfter: refreshAfterMs ?? ttlMs, expiresAt: Date.now() + ttlMs };
  const entry = setLocal(key, data, ttlMs, refreshAfterMs);
  redisWrite(key, entry).catch(() => {
  });
  return entry;
}
__name(set, "set");
async function setAsync(key, data, ttlMs, refreshAfterMs) {
  if (!isCacheEnabled()) return { data, cachedAt: Date.now(), ttl: ttlMs, refreshAfter: refreshAfterMs ?? ttlMs, expiresAt: Date.now() + ttlMs };
  const entry = setLocal(key, data, ttlMs, refreshAfterMs);
  const kv = getKV();
  if (kv) {
    try {
      const val = encodeEntry(entry);
      const expTtl = Math.max(60, Math.ceil(ttlMs / 1e3));
      await kv.put(key, val, { expirationTtl: expTtl }).catch(() => {
      });
    } catch {
    }
  }
  await redisWrite(key, entry);
  return entry;
}
__name(setAsync, "setAsync");
function isFresh(entry) {
  return entry !== null && entry !== void 0 && Date.now() < entry.expiresAt;
}
__name(isFresh, "isFresh");
function needsRefresh(entry) {
  return !entry || Date.now() - entry.cachedAt > entry.refreshAfter;
}
__name(needsRefresh, "needsRefresh");
function delLocal(key) {
  mem.delete(key);
  diskDel(key);
}
__name(delLocal, "delLocal");
async function delAsync(key) {
  delLocal(key);
  const kv = getKV();
  if (kv) await kv.delete(key).catch(() => {
  });
  await redisCommand(["DEL", key]);
}
__name(delAsync, "delAsync");
function delByPrefix(prefix) {
  for (const k of [...mem.keys()]) {
    if (k.startsWith(prefix)) mem.delete(k);
  }
}
__name(delByPrefix, "delByPrefix");
async function delByPrefixAsync(prefix) {
  delByPrefix(prefix);
  const kv = getKV();
  if (kv && typeof kv.list === "function") {
    try {
      const list = await kv.list({ prefix });
      if (Array.isArray(list?.keys)) {
        await Promise.all(list.keys.map((k) => kv.delete(k.name).catch(() => {
        })));
      }
    } catch {
    }
  }
  const keys = await redisCommand(["KEYS", `${prefix}*`]);
  if (Array.isArray(keys) && keys.length) {
    await redisCommand(["DEL", ...keys]);
  }
}
__name(delByPrefixAsync, "delByPrefixAsync");
var MIN = 6e4;
var HOUR = 60 * MIN;
var DAY = 24 * HOUR;
function episodeTTL(status) {
  switch (status) {
    case "FINISHED":
      return [7 * DAY, Infinity];
    case "RELEASING":
      return [2 * HOUR, 15 * MIN];
    case "HIATUS":
      return [6 * HOUR, 60 * MIN];
    case "NOT_YET_RELEASED":
      return [30 * MIN, 15 * MIN];
    default:
      return [HOUR, 15 * MIN];
  }
}
__name(episodeTTL, "episodeTTL");
function mapTTL(status) {
  return status === "FINISHED" ? 30 * DAY : 12 * HOUR;
}
__name(mapTTL, "mapTTL");
var WATCH_TTL = 3 * HOUR;
var SHOW_IDENTITY_TTL = 24 * HOUR;
var THIRTY_DAYS = 30 * DAY;

// core/new-provider-utils.js
var UA3 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
var RELATION_FRAGMENT = `edges{relationType(version:2) node{id type episodes relations{edges{relationType(version:2) node{id type episodes relations{edges{relationType(version:2) node{id type episodes relations{edges{relationType(version:2) node{id type episodes}}}}}}}}}}}`;
async function fetchHtml(url, headers = {}) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA3,
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      ...headers
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.text();
}
__name(fetchHtml, "fetchHtml");
function decodeEntities(s = "") {
  return s.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16))).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
}
__name(decodeEntities, "decodeEntities");
function stripTags(html2 = "") {
  return decodeEntities(html2.replace(/<[^>]*>/g, " ").replace(/\s+/g, " "));
}
__name(stripTags, "stripTags");
function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}=["']([^"']*)["']`, "i"));
  return m ? decodeEntities(m[1]) : "";
}
__name(attr, "attr");
function norm(s = "") {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}
__name(norm, "norm");
function diceCoeff(a, b) {
  const na = norm(a);
  const nb = norm(b);
  if (na === nb) return 1;
  if (na.length < 2 || nb.length < 2) return 0;
  const bigrams = /* @__PURE__ */ new Map();
  for (let i = 0; i < na.length - 1; i++) {
    const bg2 = na.slice(i, i + 2);
    bigrams.set(bg2, (bigrams.get(bg2) ?? 0) + 1);
  }
  let hits = 0;
  for (let i = 0; i < nb.length - 1; i++) {
    const bg2 = nb.slice(i, i + 2);
    const count3 = bigrams.get(bg2) ?? 0;
    if (count3 > 0) {
      hits++;
      bigrams.set(bg2, count3 - 1);
    }
  }
  return 2 * hits / (na.length + nb.length - 2);
}
__name(diceCoeff, "diceCoeff");
var TITLE_STOP_WORDS = /* @__PURE__ */ new Set([
  "a",
  "an",
  "and",
  "of",
  "the",
  "to",
  "in",
  "on",
  "for",
  "no",
  "wa",
  "season",
  "part",
  "stage",
  "cour",
  "chapter",
  "chapters",
  "episode",
  "episodes",
  "movie",
  "film",
  "tv",
  "ova",
  "ona",
  "special",
  "specials",
  "final",
  "finale",
  "arc"
]);
function titleText(value) {
  return String(value ?? "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}
__name(titleText, "titleText");
function titleWords(value) {
  return new Set(titleText(value).split(/\s+/).filter(
    (word) => word.length > 1 && !TITLE_STOP_WORDS.has(word) && !/^\d+(?:st|nd|rd|th)?$/.test(word)
  ));
}
__name(titleWords, "titleWords");
function markerValues(value) {
  const normalized = titleText(value);
  const text = normalized.replace(/\s+/g, "");
  const markers = /* @__PURE__ */ new Map();
  for (const marker of ["season", "part", "stage", "cour"]) {
    const values = /* @__PURE__ */ new Set();
    for (const match of text.matchAll(new RegExp(`${marker}(\\d+)`, "g"))) values.add(match[1]);
    for (const match of text.matchAll(new RegExp(`(\\d+)(?:st|nd|rd|th)${marker}`, "g"))) values.add(match[1]);
    for (const match of text.matchAll(new RegExp(`((?:\\d+(?:st|nd|rd|th))+?)${marker}`, "g"))) {
      for (const ordinal3 of match[1].matchAll(/(\d+)(?:st|nd|rd|th)/g)) values.add(ordinal3[1]);
    }
    const words = { one: "1", two: "2", three: "3", four: "4", five: "5", six: "6", seven: "7", eight: "8", nine: "9", ten: "10", first: "1", second: "2", third: "3", fourth: "4", fifth: "5" };
    for (const [word, number2] of Object.entries(words)) {
      if (text.includes(`${marker}${word}`) || text.includes(`${word}${marker}`)) values.add(number2);
    }
    if (values.size) markers.set(marker, values);
  }
  const finalMarkers = /* @__PURE__ */ new Set();
  for (const match of text.matchAll(/final(season|chapters?|part|arc)/g)) {
    finalMarkers.add(match[1].startsWith("chapter") ? "chapters" : match[1]);
  }
  if (finalMarkers.size) markers.set("final", finalMarkers);
  if (/movie|film|gekijouban/.test(text)) markers.set("format", /* @__PURE__ */ new Set(["movie"]));
  const typeMarker = normalized.match(/\b(ova|ona|special)\b/)?.[1];
  if (typeMarker) markers.set("format", /* @__PURE__ */ new Set([typeMarker]));
  const ending = normalized.split(/\s+/).at(-1) || "";
  const number = ending.match(/^(\d{1,2})(?:st|nd|rd|th)?$/)?.[1] ?? text.match(/([a-z])(\d{1,2})$/)?.[2];
  const roman = { ii: "2", iii: "3", iv: "4", v: "5", vi: "6", vii: "7", viii: "8", ix: "9", x: "10" }[ending];
  const endingValue = number || roman;
  const isAlreadyMarked = endingValue && ["season", "part", "stage", "cour"].some((marker) => markers.get(marker)?.has(endingValue));
  if (endingValue && !isAlreadyMarked) markers.set("numbered", /* @__PURE__ */ new Set([endingValue]));
  for (const match of text.matchAll(/(?:movie|film)(\d+)/g)) {
    if (!markers.has("numbered")) markers.set("numbered", /* @__PURE__ */ new Set());
    markers.get("numbered").add(match[1]);
  }
  return markers;
}
__name(markerValues, "markerValues");
function unicodeDice(a, b) {
  const left = titleText(a).replace(/\s+/g, "");
  const right = titleText(b).replace(/\s+/g, "");
  if (left === right) return 1;
  if (left.length < 2 || right.length < 2) return 0;
  const bigrams = /* @__PURE__ */ new Map();
  for (let index = 0; index < left.length - 1; index++) {
    const pair = left.slice(index, index + 2);
    bigrams.set(pair, (bigrams.get(pair) ?? 0) + 1);
  }
  let hits = 0;
  for (let index = 0; index < right.length - 1; index++) {
    const pair = right.slice(index, index + 2);
    const count3 = bigrams.get(pair) ?? 0;
    if (count3) {
      hits++;
      bigrams.set(pair, count3 - 1);
    }
  }
  return 2 * hits / (left.length + right.length - 2);
}
__name(unicodeDice, "unicodeDice");
function titleIdentityScore(titles, candidates) {
  const targetTitles = (titles ?? []).filter(Boolean);
  const candidateTitles = (candidates ?? []).filter(Boolean);
  const targetMarkers = /* @__PURE__ */ new Map();
  for (const title2 of targetTitles.slice(0, 3)) {
    for (const [marker, values] of markerValues(title2)) {
      if (!targetMarkers.has(marker)) targetMarkers.set(marker, /* @__PURE__ */ new Set());
      for (const value of values) targetMarkers.get(marker).add(value);
    }
  }
  let best = 0;
  for (const title2 of targetTitles) {
    const queryWords = titleWords(title2);
    for (const candidate of candidateTitles) {
      const candidateWords = titleWords(candidate);
      const coreTitle = [...queryWords].join(" ") || title2;
      const coreCandidate = [...candidateWords].join(" ") || candidate;
      const lexical = unicodeDice(coreTitle, coreCandidate);
      if (!queryWords.size || !candidateWords.size) {
        if (lexical < 0.86) continue;
      }
      const candidateMarkers = markerValues(candidate);
      let markerConflict = false;
      let markerPenalty = 0;
      for (const [marker, queryValues] of targetMarkers) {
        const candidateValues = candidateMarkers.get(marker);
        if (candidateValues && ![...queryValues].some((value) => candidateValues.has(value))) {
          markerConflict = true;
          break;
        }
        if (!candidateValues && !(marker === "season" && candidateMarkers.has("final"))) {
          markerPenalty += ["season", "part", "stage", "cour"].includes(marker) ? 0.22 : 0.16;
        }
      }
      if (markerConflict) continue;
      for (const marker of candidateMarkers.keys()) {
        if (!targetMarkers.has(marker)) markerPenalty += ["season", "part", "stage", "cour"].includes(marker) ? 0.18 : 0.12;
      }
      markerPenalty = Math.min(0.48, markerPenalty);
      let shared = 0;
      for (const word of queryWords) if (candidateWords.has(word)) shared++;
      const coverage = queryWords.size && candidateWords.size ? Math.min(shared / queryWords.size, shared / candidateWords.size) : lexical;
      if (Math.min(queryWords.size, candidateWords.size) < 3) {
        if (lexical < 0.76) continue;
      } else if (coverage < 0.5) {
        continue;
      }
      best = Math.max(best, Math.max(0, lexical * 0.7 + coverage * 0.3 - markerPenalty));
    }
  }
  return best;
}
__name(titleIdentityScore, "titleIdentityScore");
function titleScore(query, candidate, slug) {
  const base = Math.max(diceCoeff(query, candidate), diceCoeff(query, slug.replace(/-/g, " ")));
  const queryFirstNum = norm(query).match(/\d+/)?.[0] ?? "";
  const slugFirstNum = slug.match(/\d+/)?.[0] ?? "";
  if (queryFirstNum && slugFirstNum && queryFirstNum !== slugFirstNum) return base * 0.65;
  if (queryFirstNum && !slugFirstNum) return base * 0.65;
  if (!queryFirstNum && slugFirstNum) {
    const n = parseInt(slugFirstNum);
    if (n > 1 && n < 1900) return base * (1 - 0.06 * (n - 1));
  }
  const isMovieQuery = /\b(movie|film|the movie)\b/i.test(query);
  const isMovieMatch = /\b(movie|film)\b/i.test(candidate) || /movie|film/.test(slug);
  if (isMovieQuery && !isMovieMatch) return base * 0.4;
  const qLen = norm(query).length;
  const sLen = norm(slug.replace(/-/g, " ")).length;
  return sLen > qLen * 1.6 + 4 ? base * 0.8 : base;
}
__name(titleScore, "titleScore");
function buildSearchQueries(title2) {
  const queries = /* @__PURE__ */ new Set([title2]);
  const words = title2.trim().split(/\s+/);
  if (words.length > 4) queries.add(words.slice(0, 4).join(" "));
  if (words.length > 3) queries.add(words.slice(0, 3).join(" "));
  const stripped = title2.replace(/\bseason\s*\d+\b/gi, "").replace(/\bpart\s*\d+\b/gi, "").replace(/\b\d+rd\b|\b\d+th\b|\b\d+st\b|\b\d+nd\b/gi, "").replace(/\s+/g, " ").trim();
  if (stripped && stripped !== title2) queries.add(stripped);
  return [...queries].filter((q) => q.length >= 3);
}
__name(buildSearchQueries, "buildSearchQueries");
function buildTitleSearchQueries(titles, limit = 24) {
  const queries = /* @__PURE__ */ new Map();
  const add = /* @__PURE__ */ __name((value) => {
    const query = String(value ?? "").replace(/\s+/g, " ").trim();
    if (query.length >= 3) queries.set(query.toLowerCase(), query);
  }, "add");
  const uniqueTitles = [...new Set(titles.filter(Boolean).map((title2) => String(title2).trim()).filter(Boolean))].slice(0, 12);
  for (const title2 of uniqueTitles.slice(0, 8)) add(title2);
  for (const title2 of uniqueTitles.slice(0, 4)) {
    add(String(title2).replace(/[^\p{L}\p{N}]+/gu, " "));
    for (const query of buildSearchQueries(String(title2))) add(query);
    const segments = String(title2).split(/[:\u2013\u2014|]/).map((part) => part.trim());
    for (const segment of segments) if (segment.length >= 4) add(segment);
    const broad = String(title2).replace(/\b(?:season|part|cour|stage|chapter|episode)\s*(?:\d+|one|two|three|four|five|final)?\b/gi, " ").replace(/\b(?:\d+)(?:st|nd|rd|th)\b/gi, " ").replace(/\bthe\s+final\s+chapters?\b/gi, " ").replace(/\s+/g, " ").trim();
    add(broad);
  }
  for (const title2 of uniqueTitles.slice(8)) add(title2);
  return [...queries.values()].slice(0, limit);
}
__name(buildTitleSearchQueries, "buildTitleSearchQueries");
async function findTopSlugs(titles, searchFn2, n = 6) {
  const allCandidates = /* @__PURE__ */ new Map();
  const searchQueries4 = buildTitleSearchQueries(titles, 20);
  await Promise.all(searchQueries4.map(async (q) => {
    try {
      const results = await searchFn2(q);
      for (const r of results) if (!allCandidates.has(r.slug)) allCandidates.set(r.slug, r.text);
    } catch {
    }
  }));
  const scored = [];
  for (const [slug, text] of allCandidates) {
    let best = 0;
    for (const title2 of titles) best = Math.max(best, titleScore(title2, text, slug));
    const identity = titleIdentityScore(titles, [text, slug.replace(/-/g, " ")]);
    if (identity >= 0.6 && best >= 0.5) scored.push({ slug, title: text, score: best * 0.65 + identity * 0.35 });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, n);
}
__name(findTopSlugs, "findTopSlugs");
async function anilistQuery(query, variables) {
  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query, variables })
  });
  if (!res.ok) throw new Error(`AniList HTTP ${res.status}`);
  const json5 = await res.json();
  if (json5.errors?.length) throw new Error(`AniList: ${json5.errors[0].message}`);
  return json5.data;
}
__name(anilistQuery, "anilistQuery");
function computePrequelOffset(relations, depth = 0) {
  if (!relations || depth > 5) return 0;
  const prequelEdge = relations.edges?.find(
    (e) => e.relationType === "PREQUEL" && e.node.type === "ANIME" && (e.node.episodes ?? 0) >= 5
  );
  if (!prequelEdge) return 0;
  return (prequelEdge.node.episodes ?? 0) + computePrequelOffset(prequelEdge.node.relations, depth + 1);
}
__name(computePrequelOffset, "computePrequelOffset");
async function getPrequelOffset(anilistId) {
  const key = `np-offset:${anilistId}`;
  const entry = get2(key);
  if (isFresh(entry)) return entry.data;
  const data = await anilistQuery(
    `query($id:Int){Media(id:$id,type:ANIME){relations{${RELATION_FRAGMENT}}}}`,
    { id: Number(anilistId) }
  );
  const offset = computePrequelOffset(data?.Media?.relations);
  set(key, offset, SHOW_IDENTITY_TTL);
  return offset;
}
__name(getPrequelOffset, "getPrequelOffset");
function buildTitles(media, anizip) {
  return [...new Set([
    media?.title?.english,
    media?.title?.romaji,
    media?.title?.native,
    anizip?.titles?.en,
    anizip?.titles?.["x-jat"],
    anizip?.titles?.ja,
    ...media?.synonyms ?? []
  ].filter(Boolean))];
}
__name(buildTitles, "buildTitles");
function expectedCount(media, anizip) {
  const counts = [
    media?.episodes,
    ...Object.keys(anizip?.episodes ?? {}).map(Number).filter(Number.isFinite)
  ].filter((n) => Number.isFinite(n) && n > 0);
  return counts.length ? Math.max(...counts) : null;
}
__name(expectedCount, "expectedCount");
function episodeMeta(n, ctx) {
  const az = ctx.anizip?.episodes?.[String(n)] ?? {};
  const runtime = az.runtime ?? az.length ?? null;
  return {
    title: az.title?.en ?? az.title?.["x-jat"] ?? null,
    duration: runtime ? runtime * 60 : null,
    filler: az.filler ?? false,
    uncensored: false,
    description: az.overview ?? az.summary ?? null,
    image: az.image ?? ctx.anizip?.images?.cover ?? null,
    airDate: az.airdate ?? az.aired ?? null
  };
}
__name(episodeMeta, "episodeMeta");
function selectSeries(candidates, scrapeSeries4, expected, status, offset, options = {}) {
  return Promise.all(candidates.map(async (candidate) => {
    const episodes = await scrapeSeries4(candidate.slug);
    const max = Math.max(0, ...episodes.map((e) => e.number));
    const localHits = expected ? episodes.filter((e) => e.number >= 1 && e.number <= expected).length : episodes.length;
    const offsetHits = expected && offset ? episodes.filter((e) => e.number > offset && e.number <= offset + expected).length : 0;
    const mode = offsetHits > localHits ? "offset" : "local";
    const hits = Math.max(localHits, offsetHits);
    let countScore = 1;
    if (expected && expected >= 6) {
      const needed = status === "FINISHED" ? Math.ceil(expected * 0.9) : 1;
      countScore = hits >= needed ? 1 : hits / needed;
    }
    return { ...candidate, episodes, max, mode, score: candidate.score * 0.7 + countScore * 0.3 };
  })).then((results) => {
    const minScore = options.minScore ?? 0.65;
    const viable = results.filter((r) => r.episodes.length && r.score >= minScore).sort((a, b) => b.score - a.score);
    if (!viable.length) return null;
    return viable[0];
  });
}
__name(selectSeries, "selectSeries");
function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300"
    }
  });
}
__name(json, "json");

// providers/mkissa.js
var __name4 = /* @__PURE__ */ __name((fn, _) => fn, "__name");
var UA4 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36";
var REFERER = "https://mkissa.to";
var API = "https://api.mkissa.net";
var API_URL = `${API}/api`;
var CDN_ROOT = "https://cdn.mkissa.net/all/mk";
var ANIZIP = "https://api.ani.zip/mappings";
var CONTENT_LANE = "k7";
var REFERER_HOST = "mkissa.to";
var KEY_GROUP = "mkissa";
var BOOT_EPOCH_MS = 6048e5;
var BOOT_GRACE_MS = 864e5;
var AA_REQ_MS = 3e5;
var WATCH_MEMORY_TTL = 3 * 60 * 60 * 1e3;
var DISCOVERY_CONCURRENCY = 16;
var DISCOVERY_LIMIT = 600;
var FETCH_TIMEOUT_MS = 1e4;
var EXTRACT_TIMEOUT_MS = 5e3;
var MKISSA_WREQ_BROWSER = process.env.MKISSA_WREQ_BROWSER || "chrome_149";
var MKISSA_WREQ_OS = process.env.MKISSA_WREQ_OS || "windows";
var TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjdkMWM0ZTgwMGUzM2FiMmE3Y2I3NDA5YmM4NjQ2YSIsIm5iZiI6MTc3OTUzMDcxOS40MzIsInN1YiI6IjZhMTE3YmRmYTlhNjNlYmFiOWUzYjc4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Z9pa96oJEyicf6wAoaKGKJd9ldapeiOdktoJd4xcgLo";
var HEX_TABLE = {
  "79": "A",
  "7a": "B",
  "7b": "C",
  "7c": "D",
  "7d": "E",
  "7e": "F",
  "7f": "G",
  "70": "H",
  "71": "I",
  "72": "J",
  "73": "K",
  "74": "L",
  "75": "M",
  "76": "N",
  "77": "O",
  "68": "P",
  "69": "Q",
  "6a": "R",
  "6b": "S",
  "6c": "T",
  "6d": "U",
  "6e": "V",
  "6f": "W",
  "60": "X",
  "61": "Y",
  "62": "Z",
  "59": "a",
  "5a": "b",
  "5b": "c",
  "5c": "d",
  "5d": "e",
  "5e": "f",
  "5f": "g",
  "50": "h",
  "51": "i",
  "52": "j",
  "53": "k",
  "54": "l",
  "55": "m",
  "56": "n",
  "57": "o",
  "48": "p",
  "49": "q",
  "4a": "r",
  "4b": "s",
  "4c": "t",
  "4d": "u",
  "4e": "v",
  "4f": "w",
  "40": "x",
  "41": "y",
  "42": "z",
  "08": "0",
  "09": "1",
  "0a": "2",
  "0b": "3",
  "0c": "4",
  "0d": "5",
  "0e": "6",
  "0f": "7",
  "00": "8",
  "01": "9",
  "15": "-",
  "16": ".",
  "67": "_",
  "46": "~",
  "02": ":",
  "17": "/",
  "07": "?",
  "1b": "#",
  "63": "[",
  "65": "]",
  "78": "@",
  "19": "!",
  "1c": "$",
  "1e": "&",
  "10": "(",
  "11": ")",
  "12": "*",
  "13": "+",
  "14": ",",
  "03": ";",
  "05": "=",
  "1d": "%"
};
var cryptoConfigCache = null;
var episodeQueryCache = null;
var sessionCookies = /* @__PURE__ */ new Map();
var watchMemoryCache = /* @__PURE__ */ new Map();
function decodeHexUrl(hex) {
  let out = "";
  for (let i = 0; i < hex.length; i += 2) {
    const pair = hex.substring(i, i + 2).toLowerCase();
    out += HEX_TABLE[pair] ?? pair;
  }
  return out;
}
__name(decodeHexUrl, "decodeHexUrl");
__name4(decodeHexUrl, "decodeHexUrl");
function sha256Hex(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}
__name(sha256Hex, "sha256Hex");
__name4(sha256Hex, "sha256Hex");
function hmacBytes(key, value) {
  return crypto.createHmac("sha256", key).update(value).digest();
}
__name(hmacBytes, "hmacBytes");
__name4(hmacBytes, "hmacBytes");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
__name(sleep, "sleep");
__name4(sleep, "sleep");
function storeCookies(headers) {
  const raw = typeof headers.getSetCookie === "function" ? headers.getSetCookie() : [headers.get("set-cookie")].filter(Boolean);
  for (const value of raw) {
    for (const part of String(value).split(/,(?=[^;,]+=)/)) {
      const pair = part.split(";")[0]?.trim();
      const index = pair?.indexOf("=");
      if (index > 0) sessionCookies.set(pair.slice(0, index), pair.slice(index + 1));
    }
  }
}
__name(storeCookies, "storeCookies");
__name4(storeCookies, "storeCookies");
function cookieHeader() {
  return [...sessionCookies].map(([key, value]) => `${key}=${value}`).join("; ");
}
__name(cookieHeader, "cookieHeader");
__name4(cookieHeader, "cookieHeader");
function browserHeaders(headers = {}) {
  const cookie = cookieHeader();
  return {
    "User-Agent": UA4,
    "Accept": "*/*",
    "Accept-Language": "en-US,en;q=0.9",
    "sec-ch-ua": '"Not=A?Brand";v="99", "Google Chrome";v="151", "Chromium";v="151"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    ...cookie ? { Cookie: cookie } : {},
    ...headers
  };
}
__name(browserHeaders, "browserHeaders");
__name4(browserHeaders, "browserHeaders");
function apiHeaders(buildId, headers = {}) {
  return {
    "Referer": `${REFERER}/`,
    "Origin": REFERER,
    "x-build-id": buildId,
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Priority": "u=1, i",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    ...headers
  };
}
__name(apiHeaders, "apiHeaders");
__name4(apiHeaders, "apiHeaders");
async function sessionFetch(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: browserHeaders(options.headers || {})
  });
  storeCookies(res.headers);
  return res;
}
__name(sessionFetch, "sessionFetch");
__name4(sessionFetch, "sessionFetch");
async function apiSessionFetch(url, options = {}) {
  try {
    const res = await wreqFetch(url, {
      ...options,
      warm: [{
        url: `${REFERER}/`,
        headers: { Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }
      }],
      session: "mkissa",
      browser: MKISSA_WREQ_BROWSER,
      os: MKISSA_WREQ_OS
    });
    storeCookies(res.headers);
    return res;
  } catch (error3) {
    if (process.env.MKISSA_WREQ_REQUIRED === "1") throw error3;
    return sessionFetch(url, options);
  }
}
__name(apiSessionFetch, "apiSessionFetch");
__name4(apiSessionFetch, "apiSessionFetch");
function absoluteAssetUrl(value, base = CDN_ROOT) {
  return new URL(value, base.endsWith("/") ? base : `${base}/`).toString();
}
__name(absoluteAssetUrl, "absoluteAssetUrl");
__name4(absoluteAssetUrl, "absoluteAssetUrl");
function findBalancedBlock(text, start) {
  let depth = 0;
  let seen = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{") {
      depth++;
      seen = true;
    } else if (ch === "}") {
      depth--;
      if (seen && depth === 0) return i + 1;
    }
  }
  return -1;
}
__name(findBalancedBlock, "findBalancedBlock");
__name4(findBalancedBlock, "findBalancedBlock");
function findOpeningParen(text, end) {
  let depth = 0;
  for (let i = end; i >= 0; i--) {
    const ch = text[i];
    if (ch === ")") depth++;
    else if (ch === "(" && --depth === 0) return i;
  }
  return -1;
}
__name(findOpeningParen, "findOpeningParen");
__name4(findOpeningParen, "findOpeningParen");
function normalizeCryptoConfig(out) {
  if (!out?.buildId || !Array.isArray(out.maskParts) || out.maskParts.length < 4) return null;
  return {
    scheme: "legacy",
    buildId: String(out.buildId),
    maskParts: out.maskParts.slice(0, 4).map(String)
  };
}
__name(normalizeCryptoConfig, "normalizeCryptoConfig");
__name4(normalizeCryptoConfig, "normalizeCryptoConfig");
function functionSource(text, name) {
  const match = new RegExp(`function\\s+${name}\\s*\\(`).exec(text);
  if (!match) return null;
  const start = text.indexOf("{", match.index);
  const end = findBalancedBlock(text, start);
  return end === -1 ? null : text.slice(match.index, end);
}
__name(functionSource, "functionSource");
__name4(functionSource, "functionSource");
function findStatementEnd(text, start) {
  let parens = 0;
  let brackets = 0;
  let braces = 0;
  let quote = "";
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (quote) {
      if (ch === "\\") i++;
      else if (ch === quote) quote = "";
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }
    if (ch === "(") parens++;
    else if (ch === ")") parens--;
    else if (ch === "[") brackets++;
    else if (ch === "]") brackets--;
    else if (ch === "{") braces++;
    else if (ch === "}") braces--;
    else if (ch === ";" && !parens && !brackets && !braces) return i;
  }
  return -1;
}
__name(findStatementEnd, "findStatementEnd");
__name4(findStatementEnd, "findStatementEnd");
function splitTopLevel(text) {
  const out = [];
  let start = 0;
  let parens = 0;
  let brackets = 0;
  let braces = 0;
  let quote = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quote) {
      if (ch === "\\") i++;
      else if (ch === quote) quote = "";
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }
    if (ch === "(") parens++;
    else if (ch === ")") parens--;
    else if (ch === "[") brackets++;
    else if (ch === "]") brackets--;
    else if (ch === "{") braces++;
    else if (ch === "}") braces--;
    else if (ch === "," && !parens && !brackets && !braces) {
      out.push(text.slice(start, i));
      start = i + 1;
    }
  }
  out.push(text.slice(start));
  return out;
}
__name(splitTopLevel, "splitTopLevel");
__name4(splitTopLevel, "splitTopLevel");
function declarationStatementAt(text, index) {
  const start = Math.max(text.lastIndexOf("const ", index), text.lastIndexOf("let ", index), text.lastIndexOf("var ", index));
  if (start < 0) return null;
  const end = findStatementEnd(text, start);
  if (end < 0 || index > end) return null;
  const keyword = /^(?:const|let|var)\s+/.exec(text.slice(start));
  if (!keyword) return null;
  const entries = splitTopLevel(text.slice(start + keyword[0].length, end)).map((value) => {
    const entry = /^\s*([A-Za-z_$][\w$]*)\s*=\s*([\s\S]+)$/.exec(value);
    return entry ? { name: entry[1], expression: entry[2], start, end } : null;
  }).filter(Boolean);
  return { start, end, entries };
}
__name(declarationStatementAt, "declarationStatementAt");
__name4(declarationStatementAt, "declarationStatementAt");
function templateDependencies(expression) {
  return [...expression.matchAll(/\$\{\s*([A-Za-z_$][\w$]*)\b[^}]*\}/g)].map((match) => match[1]);
}
__name(templateDependencies, "templateDependencies");
__name4(templateDependencies, "templateDependencies");
function templateDeclaration(chunk, name, before = chunk.length) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = [...chunk.matchAll(new RegExp(`(?<![A-Za-z0-9_$])${escaped}\\s*=`, "g"))];
  let fallback = null;
  for (const match of matches) {
    const statement = declarationStatementAt(chunk, match.index);
    const entry = statement?.entries.find((value) => value.name === name);
    if (!entry) continue;
    if (!fallback) fallback = entry;
    if (entry.start < before) fallback = entry;
  }
  return fallback;
}
__name(templateDeclaration, "templateDeclaration");
__name4(templateDeclaration, "templateDeclaration");
function bootstrapBuildDeclaration(chunk) {
  const matches = [...chunk.matchAll(/\bbuildId\s*:\s*[A-Za-z_$][\w$]*\s*=\s*([A-Za-z_$][\w$]*)\b/g)];
  for (const match of matches) {
    const entry = templateDeclaration(chunk, match[1], match.index);
    if (entry) return entry;
  }
  return null;
}
__name(bootstrapBuildDeclaration, "bootstrapBuildDeclaration");
__name4(bootstrapBuildDeclaration, "bootstrapBuildDeclaration");
function previousArrayAndBuildDeclaration(chunk, before) {
  const matches = [...chunk.slice(0, before).matchAll(/\b(?:const|let|var)\s+/g)];
  for (let i = matches.length - 1; i >= 0; i--) {
    const statement = declarationStatementAt(chunk, matches[i].index + matches[i][0].length);
    if (!statement?.entries.length || statement.start >= before) continue;
    const partsIndex = statement.entries.findIndex((entry) => entry.expression.trim().startsWith("["));
    if (partsIndex < 0) continue;
    const build = statement.entries.find((entry, index) => index < partsIndex && !entry.expression.trim().startsWith("["));
    if (build) return { build, parts: statement.entries[partsIndex] };
  }
  return null;
}
__name(previousArrayAndBuildDeclaration, "previousArrayAndBuildDeclaration");
__name4(previousArrayAndBuildDeclaration, "previousArrayAndBuildDeclaration");
function validEpisodeQuery(query) {
  return typeof query === "string" && !/[\uD800-\uDFFF]/.test(query) && /\bquery\b/.test(query) && /\bepisode\s*\(\s*showId\s*:\s*\$showId\s+translationType\s*:\s*\$translationType\s+episodeString\s*:\s*\$episodeString\s*\)/.test(query) && !query.includes("${");
}
__name(validEpisodeQuery, "validEpisodeQuery");
__name4(validEpisodeQuery, "validEpisodeQuery");
function evalEpisodeQueryChunk(chunk) {
  const operation = /\bepisode\s*\(\s*showId\s*:\s*\$showId\s*translationType\s*:\s*\$translationType\s*episodeString\s*:\s*\$episodeString\s*\)/g;
  const operationInExpression = new RegExp(operation.source);
  for (const match of chunk.matchAll(operation)) {
    const statement = declarationStatementAt(chunk, match.index);
    const candidate = statement?.entries.find((entry) => operationInExpression.test(entry.expression));
    if (!candidate) continue;
    const definitions = /* @__PURE__ */ new Map();
    const resolving = /* @__PURE__ */ new Set();
    const resolve = /* @__PURE__ */ __name((name, before) => {
      if (definitions.has(name) || resolving.has(name)) return;
      const entry = templateDeclaration(chunk, name, before);
      if (!entry) return;
      resolving.add(name);
      for (const dependency of templateDependencies(entry.expression)) resolve(dependency, entry.start);
      resolving.delete(name);
      definitions.set(name, entry);
    }, "resolve");
    resolve(candidate.name, candidate.start + 1);
    try {
      const source = [...definitions.values()].map((entry) => `const ${entry.name}=${entry.expression};`).join("\n");
      const query = Function(`${source}
return ${candidate.name}();`)();
      if (validEpisodeQuery(query)) return query;
    } catch {
    }
  }
  return null;
}
__name(evalEpisodeQueryChunk, "evalEpisodeQueryChunk");
__name4(evalEpisodeQueryChunk, "evalEpisodeQueryChunk");
function evalFragmentCryptoChunk(chunk) {
  for (const match of chunk.matchAll(/\bsaltMul\s*:/g)) {
    const declarationAt = chunk.lastIndexOf("const ", match.index);
    const declarationEnd = declarationAt === -1 ? -1 : findStatementEnd(chunk, declarationAt);
    if (declarationEnd === -1 || match.index > declarationEnd) continue;
    const declarations = splitTopLevel(chunk.slice(declarationAt + 6, declarationEnd)).map((value) => {
      const entry = /^\s*([A-Za-z_$][\w$]*)\s*=\s*([\s\S]+)$/.exec(value);
      return entry ? { name: entry[1], expression: entry[2] } : null;
    }).filter(Boolean);
    const configIndex = declarations.findIndex((entry) => /\b(?:saltMul|fragMul)\s*:/.test(entry.expression));
    if (configIndex < 0) continue;
    const previous = previousArrayAndBuildDeclaration(chunk, declarationAt);
    const partsIndex = declarations.slice(0, configIndex).map((entry, index) => ({ entry, index })).reverse().find(({ entry }) => entry.expression.trim().startsWith("["))?.index;
    const build = bootstrapBuildDeclaration(chunk) ?? previous?.build ?? declarations[0];
    const parts = partsIndex === void 0 ? previous?.parts : declarations[partsIndex];
    const params = declarations[configIndex];
    if (!build || !parts || !params) continue;
    const expression = `${build.expression};${parts.expression};${params.expression}`;
    const names = new Set([...expression.matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)].map((entry) => entry[1]));
    const helpers = [];
    for (let pass = 0; pass < 8; pass++) {
      let changed = false;
      for (const name of [...names]) {
        if (helpers.some((source3) => new RegExp(`function\\s+${name}\\s*\\(`).test(source3))) continue;
        const source2 = functionSource(chunk, name);
        if (!source2) continue;
        helpers.push(source2);
        for (const reference of source2.matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)) {
          if (!names.has(reference[1])) {
            names.add(reference[1]);
            changed = true;
          }
        }
      }
      if (helpers.some((source2) => /^function\s+[A-Za-z_$][\w$]*\s*\(\)\s*\{const\s+e=\[/.test(source2))) break;
      if (!changed) break;
    }
    const tableSource = helpers.find((source2) => /^function\s+[A-Za-z_$][\w$]*\s*\(\)\s*\{const\s+e=\[/.test(source2)) ?? null;
    const tableName = tableSource?.match(/^function\s+([A-Za-z_$][\w$]*)\s*\(/)?.[1] ?? null;
    const tableInitEnd = tableName ? chunk.lastIndexOf(`)(${tableName},`, declarationAt) : -1;
    const tableInitStart = tableInitEnd === -1 ? -1 : findOpeningParen(chunk, tableInitEnd);
    const tableInit = tableInitStart === -1 || tableInitEnd === -1 ? "" : chunk.slice(tableInitStart, chunk.indexOf(";", tableInitEnd) + 1);
    if (!tableSource || !tableInit) continue;
    const source = `${tableSource}
${tableInit}
${helpers.filter((helper) => !helper.startsWith(`function ${tableName}`)).join("\n")}
return { buildId: (${build.expression}), maskParts: (${parts.expression}), params: (${params.expression}) };`;
    const out = Function(source)();
    const config2 = out?.params;
    if (!out?.buildId || !Array.isArray(out.maskParts) || out.maskParts.length < 4 || !config2 || typeof config2 !== "object") continue;
    const numeric = ["saltMul", "saltAdd", "fragMul", "fragAdd"];
    if (numeric.some((key) => !Number.isFinite(Number(config2[key])))) continue;
    if (!Array.isArray(config2.parts) || !config2.parts.length || typeof config2.bootPrefix !== "string" || typeof config2.join !== "string") continue;
    return {
      scheme: "fragments",
      buildId: String(out.buildId),
      maskParts: out.maskParts.slice(0, 4).map(String),
      saltMul: Number(config2.saltMul),
      saltAdd: Number(config2.saltAdd),
      fragMul: Number(config2.fragMul),
      fragAdd: Number(config2.fragAdd),
      bootPrefix: config2.bootPrefix,
      join: config2.join,
      parts: config2.parts.map(String),
      omitEmptyLane: Boolean(config2.omitEmptyLane)
    };
  }
  return null;
}
__name(evalFragmentCryptoChunk, "evalFragmentCryptoChunk");
__name4(evalFragmentCryptoChunk, "evalFragmentCryptoChunk");
function evalOldCryptoChunk(chunk) {
  const cryptoStart = chunk.search(/const\s+[A-Za-z_$][\w$]*\s*=[^;]{0,180}\?"\d+":"",\s*[A-Za-z_$][\w$]*=\[/);
  if (cryptoStart < 0) return null;
  const tableMatches = [...chunk.slice(0, cryptoStart).matchAll(/function\s+([A-Za-z_$][\w$]*)\s*\(\)\{const e=\[/g)];
  const tableStart = tableMatches.at(-1)?.index ?? -1;
  const asyncStart = chunk.indexOf("async function", cryptoStart);
  if (tableStart < 0 || asyncStart < 0) return null;
  let code = chunk.slice(tableStart, asyncStart);
  const buildMatch = code.match(/const\s+([A-Za-z_$][\w$]*)\s*=([^;]+?\?"(\d+)":"")\s*,\s*([A-Za-z_$][\w$]*)=\[/);
  if (!buildMatch) return null;
  const buildName = buildMatch[1];
  const maskName = buildMatch[4];
  code = code.replace(new RegExp(`\\b[A-Za-z_$][\\w$]*\\(\\);\\s*const\\s+${buildName}=`), `const ${buildName}=`);
  code = code.replace(new RegExp(`const\\s+${buildName}=`), `var ${buildName}=`);
  code = code.replace(new RegExp(`,\\s*${maskName}=\\[`), `;var ${maskName}=[`);
  code += `
return { buildId: ${buildName}, maskParts: ${maskName} };`;
  return normalizeCryptoConfig(Function(code)());
}
__name(evalOldCryptoChunk, "evalOldCryptoChunk");
__name4(evalOldCryptoChunk, "evalOldCryptoChunk");
function evalModernCryptoChunk(chunk) {
  const cryptoStart = chunk.search(/const\s+[A-Za-z_$][\w$]*\s*=[^;]{0,220}\?"\d+":"",\s*[A-Za-z_$][\w$]*=\[/);
  if (cryptoStart < 0) return null;
  const wrapperMatch = [...chunk.slice(0, cryptoStart).matchAll(/const\s+[A-Za-z_$][\w$]*=\(function\(\)\{/g)].at(-1);
  const wrapperStart = wrapperMatch?.index ?? -1;
  const tableMatch = [...chunk.slice(0, wrapperStart).matchAll(/function\s+[A-Za-z_$][\w$]*\s*\(\)\{const\s+[A-Za-z_$][\w$]*=\[/g)].at(-1);
  const tableStart = tableMatch?.index ?? -1;
  const decoderMatch = [...chunk.slice(0, tableStart).matchAll(/function\s+[A-Za-z_$][\w$]*\s*\([A-Za-z_$][\w$]*(?:,[A-Za-z_$][\w$]*)?\)\{return\s+[A-Za-z_$][\w$]*=[A-Za-z_$][\w$]*-\d+,[A-Za-z_$][\w$]*\(\)\[[A-Za-z_$][\w$]*\]\}/g)].at(-1);
  const tiStart = decoderMatch?.index ?? -1;
  const asyncStart = chunk.indexOf("async function", cryptoStart);
  if (tiStart < 0 || wrapperStart < 0 || asyncStart < 0) return null;
  const head = chunk.slice(tiStart, wrapperStart);
  let body = chunk.slice(cryptoStart, asyncStart);
  const buildMatch = body.match(/const\s+([A-Za-z_$][\w$]*)=/);
  const maskMatch = body.match(/,([A-Za-z_$][\w$]*)=\[/);
  const maskFunction = body.match(/function\s+([A-Za-z_$][\w$]*)\s*\([^)]*=\s*([A-Za-z_$][\w$]*)\)/);
  if (!buildMatch || !maskMatch || !maskFunction) return null;
  const buildName = buildMatch[1];
  const maskName = maskMatch[1];
  const maskFunctionName = maskFunction[1];
  body = body.replace(new RegExp(`const\\s+${buildName}=`), `var ${buildName}=`);
  body = body.replace(new RegExp(`,${maskName}=\\[`), `;var ${maskName}=[`);
  body += `
return { buildId: ${buildName}, maskParts: ${maskName}, mask: Array.from(${maskFunctionName}(${buildName}) || []) };`;
  return normalizeCryptoConfig(Function(head + body)());
}
__name(evalModernCryptoChunk, "evalModernCryptoChunk");
__name4(evalModernCryptoChunk, "evalModernCryptoChunk");
function evalCryptoChunk(chunk) {
  try {
    const config2 = evalFragmentCryptoChunk(chunk);
    if (config2) return config2;
  } catch {
  }
  try {
    return evalModernCryptoChunk(chunk);
  } catch {
  }
  try {
    return evalOldCryptoChunk(chunk);
  } catch {
  }
  return null;
}
__name(evalCryptoChunk, "evalCryptoChunk");
__name4(evalCryptoChunk, "evalCryptoChunk");
async function fetchText(url, headers = {}) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await sessionFetch(url, {
      signal: ac.signal,
      headers: {
        "Referer": `${REFERER}/`,
        ...headers
      }
    });
    if (!res.ok) throw new Error(`Fetch ${res.status}: ${url}`);
    return res.text();
  } finally {
    clearTimeout(timer);
  }
}
__name(fetchText, "fetchText");
__name4(fetchText, "fetchText");
async function fetchWithTimeout(url, options = {}, timeout = EXTRACT_TIMEOUT_MS) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: options.signal || ac.signal });
    storeCookies(res.headers);
    return res;
  } finally {
    clearTimeout(timer);
  }
}
__name(fetchWithTimeout, "fetchWithTimeout");
__name4(fetchWithTimeout, "fetchWithTimeout");
function appEntryUrl(html2) {
  const entry = html2.match(/(?:import\(|src=)["']([^"']+\/_app\/immutable\/entry\/app\.[^"']+\.js)["']/)?.[1];
  return entry ? new URL(entry, REFERER).toString() : null;
}
__name(appEntryUrl, "appEntryUrl");
__name4(appEntryUrl, "appEntryUrl");
async function discoverCryptoConfig(force = false) {
  try {
    const entryUrl = new URL(`${REFERER}/`);
    if (force) entryUrl.searchParams.set("_mkissa", String(Date.now()));
    const html2 = await fetchText(entryUrl, {
      Accept: "text/html,*/*",
      "Cache-Control": "no-cache",
      Pragma: "no-cache"
    });
    const appUrl = appEntryUrl(html2);
    if (!appUrl) throw new Error("MKissa app entry not found");
    if (!force && cryptoConfigCache?.appUrl === appUrl) return cryptoConfigCache;
    const app = await fetchText(appUrl, { Accept: "application/javascript,*/*" });
    const queue = [appUrl];
    const seen = /* @__PURE__ */ new Set();
    while (queue.length && seen.size < DISCOVERY_LIMIT) {
      const batch = queue.splice(0, DISCOVERY_CONCURRENCY).filter((url) => {
        if (seen.has(url)) return false;
        seen.add(url);
        return true;
      });
      const chunks = await Promise.all(batch.map(async (url) => {
        try {
          return { url, text: url === appUrl ? app : await fetchText(url, { Accept: "application/javascript,*/*" }) };
        } catch {
          return null;
        }
      }));
      for (const item of chunks.filter(Boolean)) {
        const imported = [
          ...item.text.matchAll(/(?:import\(|from\s*)["']([^"']+\.js)["']/g),
          ...item.text.matchAll(/"(\.\.\/(?:chunks|nodes)\/[^"\n]+\.js)"/g)
        ].map((m) => m[1]).filter((value) => value.startsWith(".") || value.startsWith("/"));
        for (const value of imported) {
          const next = new URL(value, item.url).toString();
          if (!seen.has(next)) queue.push(next);
        }
        if (!/client-crypto|x-aa-boot|aaReq|partB/.test(item.text)) continue;
        const config2 = evalCryptoChunk(item.text);
        if (config2) {
          cryptoConfigCache = { ...config2, appUrl, sourceUrl: item.url };
          return cryptoConfigCache;
        }
      }
    }
    throw new Error("MKissa crypto chunk not found");
  } catch (error3) {
    cryptoConfigCache = null;
    throw error3;
  }
}
__name(discoverCryptoConfig, "discoverCryptoConfig");
__name4(discoverCryptoConfig, "discoverCryptoConfig");
async function discoverEpisodeQuery(force = false) {
  const config2 = await discoverCryptoConfig(force);
  if (!force && episodeQueryCache?.appUrl === config2.appUrl && episodeQueryCache.buildId === config2.buildId) return episodeQueryCache.query;
  const inspect = /* @__PURE__ */ __name((text) => {
    const query = evalEpisodeQueryChunk(text);
    if (query) {
      episodeQueryCache = { appUrl: config2.appUrl, buildId: config2.buildId, query };
      return query;
    }
    return null;
  }, "inspect");
  if (config2.sourceUrl) {
    try {
      const query = inspect(await fetchText(config2.sourceUrl, { Accept: "application/javascript,*/*" }));
      if (query) return query;
    } catch {
    }
  }
  const html2 = await fetchText(`${REFERER}/`, { Accept: "text/html,*/*", "Cache-Control": "no-cache", Pragma: "no-cache" });
  const appUrl = appEntryUrl(html2);
  if (!appUrl) return episodeQuery();
  const queue = [appUrl];
  const seen = /* @__PURE__ */ new Set();
  while (queue.length && seen.size < DISCOVERY_LIMIT) {
    const batch = queue.splice(0, DISCOVERY_CONCURRENCY).filter((url) => {
      if (seen.has(url)) return false;
      seen.add(url);
      return true;
    });
    const chunks = await Promise.all(batch.map(async (url) => {
      try {
        return { url, text: await fetchText(url, { Accept: "application/javascript,*/*" }) };
      } catch {
        return null;
      }
    }));
    for (const item of chunks.filter(Boolean)) {
      const query = inspect(item.text);
      if (query) return query;
      const imported = [
        ...item.text.matchAll(/(?:import\(|from\s*)["']([^"']+\.js)["']/g),
        ...item.text.matchAll(/["'](\.\.\/(?:chunks|nodes)\/[^"'\n]+\.js)["']/g)
      ].map((match) => match[1]).filter((value) => value.startsWith(".") || value.startsWith("/"));
      for (const value of imported) {
        const next = new URL(value, item.url).toString();
        if (!seen.has(next)) queue.push(next);
      }
    }
  }
  return episodeQuery();
}
__name(discoverEpisodeQuery, "discoverEpisodeQuery");
__name4(discoverEpisodeQuery, "discoverEpisodeQuery");
function buildMaskSeed(buildId) {
  const n = String(buildId || "");
  const out = Buffer.alloc(32);
  for (let i = 0; i < 32; i++) {
    out[i] = (n.charCodeAt(i % n.length) || 0) ^ i * 17 + 31 & 255;
  }
  return out;
}
__name(buildMaskSeed, "buildMaskSeed");
__name4(buildMaskSeed, "buildMaskSeed");
function buildMask(config2) {
  const { buildId, maskParts } = config2;
  if (config2.scheme === "fragments") {
    const salt = Buffer.alloc(32);
    const name = String(buildId || "");
    for (let i = 0; i < salt.length; i++) {
      salt[i] = (name.charCodeAt(i % name.length) || 0) ^ i * config2.saltMul + config2.saltAdd & 255;
    }
    const out2 = Buffer.alloc(32);
    for (let i = 0; i < maskParts.length; i++) {
      const part = Buffer.from(maskParts[i], "base64");
      const offset = i * 8;
      for (let j = 0; j < 8; j++) {
        out2[offset + j] = part[j] ^ salt[offset + j] ^ i * config2.fragMul + j * config2.fragAdd & 255;
      }
    }
    return out2;
  }
  const seed = buildMaskSeed(buildId);
  const out = Buffer.alloc(32);
  for (let i = 0; i < maskParts.length; i++) {
    const part = Buffer.from(maskParts[i], "base64");
    const offset = i * 8;
    for (let j = 0; j < 8; j++) {
      out[offset + j] = part[j] ^ seed[offset + j] ^ i * 41 + j * 7 & 255;
    }
  }
  return out;
}
__name(buildMask, "buildMask");
__name4(buildMask, "buildMask");
function currentEpochs(now = Date.now()) {
  const epoch = Math.floor(now / BOOT_EPOCH_MS);
  const previousGrace = now - epoch * BOOT_EPOCH_MS < BOOT_GRACE_MS && epoch > 0 ? epoch - 1 : epoch;
  return [.../* @__PURE__ */ new Set([previousGrace, epoch])];
}
__name(currentEpochs, "currentEpochs");
__name4(currentEpochs, "currentEpochs");
function makeBootToken(config2, epoch, lane = CONTENT_LANE) {
  const mask = buildMask(config2);
  const bootKey = hmacBytes(mask, `${config2.bootPrefix ?? "aa-boot:"}${config2.buildId}`);
  if (config2.scheme !== "fragments") {
    return hmacBytes(bootKey, `${config2.buildId}:${KEY_GROUP}:${REFERER_HOST}:${epoch}:${lane}`).toString("hex");
  }
  const fields = { buildId: config2.buildId, group: KEY_GROUP, host: REFERER_HOST, epoch: String(epoch), lane: String(lane || "") };
  const parts = config2.omitEmptyLane && !fields.lane ? config2.parts.filter((part) => part !== "lane") : config2.parts;
  return hmacBytes(bootKey, parts.map((part) => fields[part] ?? "").join(config2.join)).toString("hex");
}
__name(makeBootToken, "makeBootToken");
__name4(makeBootToken, "makeBootToken");
function isUnknownBuildId(raw) {
  try {
    return JSON.parse(raw)?.error === "unknown_build_id";
  } catch {
    return /unknown_build_id/i.test(raw);
  }
}
__name(isUnknownBuildId, "isUnknownBuildId");
__name4(isUnknownBuildId, "isUnknownBuildId");
async function fetchBootstrap(lane = CONTENT_LANE, force = false) {
  let lastError = null;
  for (let refresh = 0; refresh < 2; refresh++) {
    const config2 = await discoverCryptoConfig(force || refresh > 0);
    let retryWithFreshEntry = false;
    for (const epoch of currentEpochs()) {
      const res = await sessionFetch(`${API}/client-crypto/v1/bootstrap?buildId=${encodeURIComponent(config2.buildId)}&k=${encodeURIComponent(lane)}`, {
        headers: {
          "Referer": `${REFERER}/`,
          "Origin": REFERER,
          "x-build-id": config2.buildId,
          "x-aa-boot": makeBootToken(config2, epoch, lane)
        }
      });
      const raw = await res.text();
      if (!res.ok) {
        lastError = new Error(`Bootstrap ${res.status}: ${raw.slice(0, 180)}`);
        if (isUnknownBuildId(raw)) {
          cryptoConfigCache = null;
          episodeQueryCache = null;
          retryWithFreshEntry = true;
          break;
        }
        continue;
      }
      const data = JSON.parse(raw);
      if (!data?.partB) {
        lastError = new Error("Bootstrap missing partB");
        continue;
      }
      return { ...data, ...config2, lane, buildId: config2.buildId };
    }
    if (!retryWithFreshEntry) break;
  }
  throw lastError || new Error("MKissa bootstrap failed");
}
__name(fetchBootstrap, "fetchBootstrap");
__name4(fetchBootstrap, "fetchBootstrap");
function deriveLaneKey(partB, config2) {
  const encrypted = Buffer.from(partB, "base64");
  const mask = buildMask(config2);
  const key = Buffer.alloc(32);
  for (let i = 0; i < 32; i++) {
    key[i] = encrypted[i] ^ mask[i % mask.length];
  }
  return key;
}
__name(deriveLaneKey, "deriveLaneKey");
__name4(deriveLaneKey, "deriveLaneKey");
async function getLaneKey(lane = CONTENT_LANE, force = false) {
  const boot = await fetchBootstrap(lane, force);
  return { key: deriveLaneKey(boot.partB, boot), epoch: boot.epoch, buildId: boot.buildId };
}
__name(getLaneKey, "getLaneKey");
__name4(getLaneKey, "getLaneKey");
function makeAaReq(key, epoch, buildId, queryHash, lane = CONTENT_LANE) {
  const ts = Math.floor(Date.now() / AA_REQ_MS) * AA_REQ_MS;
  const payload = Buffer.from(JSON.stringify({ v: 1, ts, epoch, buildId, qh: queryHash, k: lane }));
  const iv = crypto.createHash("sha256").update(`${epoch}:${buildId}:${queryHash}:${ts}:${lane}`).digest().subarray(0, 12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const body = Buffer.concat([cipher.update(payload), cipher.final(), cipher.getAuthTag()]);
  return Buffer.concat([Buffer.from([1]), iv, body]).toString("base64");
}
__name(makeAaReq, "makeAaReq");
__name4(makeAaReq, "makeAaReq");
function decryptTobeparsed(b64, key) {
  const buf = Buffer.from(b64, "base64");
  const version2 = buf[0];
  if (version2 !== 1) throw new Error(`Unsupported MKissa encryption version: ${version2}`);
  const iv = buf.subarray(1, 13);
  const body = buf.subarray(13);
  const ct = body.subarray(0, body.length - 16);
  const tag = body.subarray(body.length - 16);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return JSON.parse(Buffer.concat([decipher.update(ct), decipher.final()]).toString("utf8"));
}
__name(decryptTobeparsed, "decryptTobeparsed");
__name4(decryptTobeparsed, "decryptTobeparsed");
function episodeQuery() {
  const zt = `
tbObj {
  u
  sm
  md
  ts
}
`;
  const pu = `
_id
name
englishName
nativeName
slugTime
`;
  const xa = `
${pu}
thumbnail
${zt}
lastEpisodeInfo
lastEpisodeDate
type
season
score
airedStart
availableEpisodes
episodeDuration
episodeCount
lastUpdateEnd
characterCount
`;
  const ef = `
  _id
  username
  displayName
  createdAt
  picture
  reputation
  roleLevel

  
  brief
  followerCount
  followingCount
  pDec
  equippedBadgeKey
  equippedBadge {
    key
    name
    rank
    iconPath
    date
  }
  ugcContributorStats {
    mediaEditReviewSubmitCount
    mediaEditApprovedCount
    mediaEditRejectedCount
    mediaEditAppliedCount
    mediaEditContributionPoints
    mediaEditModContributionPoints
  }

  hideMe
`;
  const fr = `
views
likesCount
commentCount
dislikesCount
boostsCount
reviewCount
userScoreCount
userScoreTotalValue
userScoreAverValue
viewers{
firstViewers{
viewCount
lastWatchedDate
user{
${ef}
}
}
recViewers{
viewCount
lastWatchedDate
user{
${ef}
}
}
}
`;
  return `
query(
$showId: String!
$translationType: VaildTranslationTypeEnumType!
$episodeString: String!
) {
episode(
showId: $showId
translationType: $translationType
episodeString: $episodeString
) {
episodeString
uploadDate
sourceUrls
thumbnail
notes
show{
${xa}
description
broadcastInterval
banner
characters
availableEpisodesDetail
nameOnlyString
characters
isAdult
relatedShows
relatedMangas
altNames
disqusIds
}
pageStatus{
_id
notes
pageId
showId
${fr}
}
episodeInfo{
notes
thumbnails
${zt}
vidInforssub
uploadDates
vidInforsdub
vidInforsraw
description
}
versionFix
}
}
`;
}
__name(episodeQuery, "episodeQuery");
__name4(episodeQuery, "episodeQuery");
async function apiPost(query, variables, options = {}) {
  const config2 = options.buildId ? options : await discoverCryptoConfig();
  const body = options.extensions ? { query, variables, extensions: options.extensions } : { query, variables };
  const res = await apiSessionFetch(API_URL, {
    method: "POST",
    headers: apiHeaders(config2.buildId, {
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(body)
  });
  const raw = await res.text();
  if (!res.ok) {
    const err = new Error(`API POST ${res.status}`);
    err.rawBody = raw;
    throw err;
  }
  const json5 = JSON.parse(raw);
  if (json5.errors?.length) {
    const messages = json5.errors.map((e) => e.message || e.extensions?.code || "GraphQL error");
    const err = new Error(messages.join(" \xB7 "));
    if (messages.includes("NEED_CAPTCHA")) err.code = "NEED_CAPTCHA";
    err.rawBody = raw;
    err.graphql = json5;
    throw err;
  }
  return json5.data;
}
__name(apiPost, "apiPost");
__name4(apiPost, "apiPost");
async function apiEpisode(query, variables, options = {}) {
  const { force = false, captchaRetry = 0, captcha = null, postFallback = false } = options;
  const hash2 = sha256Hex(query);
  const { key, epoch, buildId } = await getLaneKey(CONTENT_LANE, force);
  const extensions = {
    persistedQuery: { version: 1, sha256Hash: hash2 },
    k: CONTENT_LANE,
    aaReq: makeAaReq(key, epoch, buildId, hash2, CONTENT_LANE)
  };
  if (captcha) extensions.captcha = captcha;
  if (captcha) {
    const posted = await apiPost(query, variables, { buildId, extensions });
    return posted?.tobeparsed ? decryptTobeparsed(posted.tobeparsed, key) : posted;
  }
  const url = `${API_URL}?variables=${encodeURIComponent(JSON.stringify(variables))}&extensions=${encodeURIComponent(JSON.stringify(extensions))}`;
  const res = await apiSessionFetch(url, {
    headers: apiHeaders(buildId)
  });
  const raw = await res.text();
  if (!res.ok) {
    const err = new Error(`API ${res.status}`);
    err.rawBody = raw;
    throw err;
  }
  const json5 = JSON.parse(raw);
  const messages = json5.errors?.map((e) => e.message || e.extensions?.code).filter(Boolean) || [];
  if (messages.includes("PersistedQueryNotFound") || messages.some((m) => /Context creation failed/i.test(m))) {
    const posted = await apiPost(query, variables, { buildId, extensions });
    return posted?.tobeparsed ? decryptTobeparsed(posted.tobeparsed, key) : posted;
  }
  if (messages.includes("NEED_CAPTCHA")) {
    if (!postFallback) {
      try {
        const postHash = sha256Hex(query);
        const postExtensions = {
          persistedQuery: { version: 1, sha256Hash: postHash },
          k: CONTENT_LANE,
          aaReq: makeAaReq(key, epoch, buildId, postHash, CONTENT_LANE)
        };
        const posted = await apiPost(query, variables, { buildId, extensions: postExtensions });
        return posted?.tobeparsed ? decryptTobeparsed(posted.tobeparsed, key) : posted;
      } catch (err2) {
        if (err2.code !== "NEED_CAPTCHA") throw err2;
      }
    }
    if (captchaRetry < 5) {
      await sleep(1500 + captchaRetry * 1200);
      return apiEpisode(query, variables, { force: true, captchaRetry: captchaRetry + 1, postFallback: true });
    }
    const err = new Error("MKissa requested captcha");
    err.code = "NEED_CAPTCHA";
    err.rawBody = raw;
    throw err;
  }
  if (messages.some((m) => /^AA_CRYPTO_/.test(m))) {
    if (!force) return apiEpisode(query, variables, { force: true, captchaRetry, captcha, postFallback });
    const err = new Error(messages.join(" \xB7 "));
    err.rawBody = raw;
    throw err;
  }
  if (json5.data?.tobeparsed) {
    return decryptTobeparsed(json5.data.tobeparsed, key);
  }
  if (messages.length) {
    const err = new Error(messages.join(" \xB7 "));
    err.rawBody = raw;
    throw err;
  }
  return json5.data;
}
__name(apiEpisode, "apiEpisode");
__name4(apiEpisode, "apiEpisode");
async function searchMkissa(query, mode = "sub") {
  const gql = `query($search:SearchInput $limit:Int $page:Int $translationType:VaildTranslationTypeEnumType $countryOrigin:VaildCountryOriginEnumType){shows(search:$search limit:$limit page:$page translationType:$translationType countryOrigin:$countryOrigin){edges{_id name englishName nativeName slugTime availableEpisodes availableEpisodesDetail aniListId __typename}}}`;
  const data = await apiPost(gql, {
    search: { allowAdult: false, allowUnknown: false, query },
    limit: 40,
    page: 1,
    translationType: mode,
    countryOrigin: "ALL"
  });
  return data?.shows?.edges ?? [];
}
__name(searchMkissa, "searchMkissa");
__name4(searchMkissa, "searchMkissa");
async function getEpisodeSources(showId, epNum, audio = "sub", captcha = null) {
  const query = await discoverEpisodeQuery();
  const data = await apiEpisode(query, { showId, translationType: audio, episodeString: String(epNum) }, { captcha });
  return data?.episode ?? null;
}
__name(getEpisodeSources, "getEpisodeSources");
__name4(getEpisodeSources, "getEpisodeSources");
function slugifyTitle(value) {
  return String(value || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
__name(slugifyTitle, "slugifyTitle");
__name4(slugifyTitle, "slugifyTitle");
async function warmWatchPage(showId, show, epNum, audio) {
  const slug = show?.slugTime || slugifyTitle(show?.englishName || show?.name || show?.nativeName);
  if (!slug || !showId) return;
  const page = `${REFERER}/anime/${slug}-${showId}/${audio}/${epNum}`;
  try {
    await fetchWithTimeout(page, {
      headers: browserHeaders({
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Referer": `${REFERER}/`,
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1"
      })
    }, FETCH_TIMEOUT_MS);
  } catch {
  }
}
__name(warmWatchPage, "warmWatchPage");
__name4(warmWatchPage, "warmWatchPage");
async function fetchAniZip(anilistId) {
  const res = await fetch(`${ANIZIP}?anilist_id=${anilistId}`);
  if (!res.ok) return null;
  return res.json();
}
__name(fetchAniZip, "fetchAniZip");
__name4(fetchAniZip, "fetchAniZip");
function extractYear(title2) {
  if (!title2) return null;
  const m = title2.match(/\b(19\d{2}|20\d{2})\b/);
  return m ? parseInt(m[1]) : null;
}
__name(extractYear, "extractYear");
__name4(extractYear, "extractYear");
function findBestMatch(results, titles, targetYear, targetId) {
  const scored = [];
  for (const r of results) {
    if (targetId && r.aniListId && String(r.aniListId) === String(targetId)) return r;
    const titleScore3 = titleIdentityScore(titles, [r.name, r.englishName, r.nativeName]);
    if (titleScore3 < 0.62) continue;
    const rYear = extractYear(r.name) || extractYear(r.englishName) || extractYear(r.nativeName);
    const yearAdjustment = targetYear && rYear ? rYear === targetYear ? 0.08 : -0.08 : 0;
    scored.push({ show: r, score: titleScore3 + yearAdjustment });
  }
  scored.sort((left, right) => right.score - left.score);
  const best = scored[0];
  const runnerUp = scored[1];
  if (!best || best.score < 0.62 || runnerUp && best.score - runnerUp.score < 0.06) {
    throw new Error("MKissa title match is ambiguous");
  }
  return best.show;
}
__name(findBestMatch, "findBestMatch");
__name4(findBestMatch, "findBestMatch");
async function fetchAniListMedia(anilistId) {
  try {
    const q = "query ($id: Int) { Media (id: $id, type: ANIME) { seasonYear startDate { year } title { romaji english native } } }";
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json", "User-Agent": UA4, "Origin": "https://anilist.co" },
      body: JSON.stringify({ query: q, variables: { id: Number(anilistId) } })
    });
    if (!res.ok) return null;
    const json5 = await res.json();
    return json5.data?.Media ?? null;
  } catch {
    return null;
  }
}
__name(fetchAniListMedia, "fetchAniListMedia");
__name4(fetchAniListMedia, "fetchAniListMedia");
async function resolveMkissaId(anilistId, ctx = {}) {
  const [anizipRes, alMedia] = await Promise.all([
    ctx.anizip ? Promise.resolve(ctx.anizip) : fetchAniZip(anilistId).catch(() => ({})),
    ctx.media ? Promise.resolve(ctx.media) : fetchAniListMedia(anilistId).catch(() => null)
  ]);
  const anizip = anizipRes || {};
  let titlesToTry = [...new Set([...buildTitles(alMedia, anizip), ...Object.values(anizip.titles || {})].filter(Boolean))];
  if (!titlesToTry.length && anizip.mappings) {
    const apId = anizip.mappings.animeplanet_id;
    if (apId) titlesToTry = [apId.split(/[-_]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")];
  }
  if (!titlesToTry.length) throw new Error(`Could not resolve titles for AniList ID: ${anilistId}`);
  const targetYear = alMedia?.seasonYear || alMedia?.startDate?.year || null;
  const queries = buildTitleSearchQueries(titlesToTry, 16);
  const resultMap = /* @__PURE__ */ new Map();
  for (let index = 0; index < queries.length; index += 4) {
    const batches = await Promise.all(queries.slice(index, index + 4).map((query) => searchMkissa(query, "sub").catch(() => [])));
    for (const results of batches) {
      for (const result of results) {
        if (result?._id && !resultMap.has(result._id)) resultMap.set(result._id, result);
      }
    }
  }
  const allResults = [...resultMap.values()];
  if (!allResults.length) throw new Error(`No MKissa match for "${titlesToTry[0]}"`);
  const match = findBestMatch(allResults, titlesToTry, targetYear, anilistId);
  return { showId: match._id, show: match, anizip };
}
__name(resolveMkissaId, "resolveMkissaId");
__name4(resolveMkissaId, "resolveMkissaId");
function hexToBytes(hex) {
  const clean = hex.replace(/[^0-9a-f]/gi, "");
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  return out;
}
__name(hexToBytes, "hexToBytes");
__name4(hexToBytes, "hexToBytes");
async function aesDecrypt(hex) {
  const decipher = crypto.createDecipheriv("aes-128-cbc", Buffer.from("kiemtienmua911ca"), Buffer.from("1234567890oiuytr"));
  return Buffer.concat([decipher.update(Buffer.from(hexToBytes(hex))), decipher.final()]).toString("utf8");
}
__name(aesDecrypt, "aesDecrypt");
__name4(aesDecrypt, "aesDecrypt");
async function extractMp4(id) {
  try {
    const r = await fetchWithTimeout(`https://www.mp4upload.com/embed-${id}.html`, {
      headers: { "User-Agent": UA4, Referer: "https://mp4upload.com/" }
    });
    if (!r.ok) return null;
    const h = await r.text();
    const m = h.match(/player\.src\s*\(\s*\{[^}]*\bsrc\s*:\s*"([^"]+)"/) || h.match(/"file"\s*:\s*"(https?:[^"]+\.mp4[^"]*)"/) || h.match(/\bsrc\s*:\s*"(https?:[^"]+\.mp4[^"]*)"/);
    return m?.[1]?.replace(/\\/g, "") || null;
  } catch {
    return null;
  }
}
__name(extractMp4, "extractMp4");
__name4(extractMp4, "extractMp4");
async function extractUns(url) {
  try {
    const parsed = new URL(url);
    const id = parsed.hash.replace(/^#/, "").split("&")[0];
    if (!id) return null;
    const base = `${parsed.protocol}//${parsed.host}`;
    const r = await fetchWithTimeout(`${base}/api/v1/video?id=${encodeURIComponent(id)}&w=1280&h=720&r=`, {
      headers: { "User-Agent": UA4, Referer: `${base}/#${id}`, Origin: base }
    });
    if (!r.ok) return null;
    const hex = (await r.text()).trim();
    if (!hex || !/^[0-9a-f]+$/i.test(hex)) return null;
    const data = JSON.parse(await aesDecrypt(hex));
    return data?.source || data?.cf || null;
  } catch {
    return null;
  }
}
__name(extractUns, "extractUns");
__name4(extractUns, "extractUns");
async function extractOk(id) {
  try {
    const r = await fetchWithTimeout(`https://ok.ru/videoembed/${id}`, {
      headers: { "User-Agent": UA4, Referer: "https://ok.ru/" }
    });
    if (!r.ok) return null;
    const h = await r.text();
    const m = h.match(/ondemandHls\\&quot;:\\&quot;(https?:\/\/.*?)\\&quot;/);
    return m?.[1]?.replace(/\\u0026/g, "&") || null;
  } catch {
    return null;
  }
}
__name(extractOk, "extractOk");
__name4(extractOk, "extractOk");
async function extractStreamSB(id) {
  try {
    const baseHeaders = {
      "User-Agent": UA4,
      "Referer": `${REFERER}/`,
      "watchsb": "streamsb",
      "Accept": "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.9"
    };
    const r1 = await fetchWithTimeout(`https://streamsb.net/api/v1/video?id=${id}`, { headers: baseHeaders });
    const sid = (r1.headers.get("set-cookie") || "").match(/sid=([^;]+)/)?.[1] ?? "";
    const html2 = await r1.text();
    const m = html2.match(/window\.location\.replace\('([^']+)'\)/);
    if (!m) return null;
    const r2 = await fetchWithTimeout(m[1], { headers: { ...baseHeaders, Cookie: `sid=${sid}`, Referer: `https://streamsb.net/e/${id}.html` } });
    if (!r2.ok) return null;
    const ct = r2.headers.get("content-type") ?? "";
    if (!ct.includes("json")) return null;
    const data = await r2.json();
    return data?.stream_data?.file ?? data?.data?.file ?? null;
  } catch {
    return null;
  }
}
__name(extractStreamSB, "extractStreamSB");
__name4(extractStreamSB, "extractStreamSB");
async function extractStreamlare(id) {
  try {
    const r = await fetchWithTimeout("https://streamlare.com/api/video/stream/get", {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": UA4, "Referer": "https://streamlare.com/", "Origin": "https://streamlare.com", "Accept": "application/json, */*" },
      body: JSON.stringify({ id })
    });
    if (!r.ok) return null;
    const data = await r.json();
    return data?.data?.file ?? null;
  } catch {
    return null;
  }
}
__name(extractStreamlare, "extractStreamlare");
__name4(extractStreamlare, "extractStreamlare");
async function extractClock(url) {
  try {
    const parsed = new URL(url);
    const clockUrl = parsed.pathname.includes("/clock.json") ? url : url.replace("/clock", "/clock.json");
    const r = await fetchWithTimeout(clockUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36",
        "Referer": "https://allanime.day/player.html",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin"
      }
    });
    if (!r.ok) return null;
    const data = await r.json();
    const links = Array.isArray(data?.links) ? data.links : [];
    const best = links.find((item) => item?.hls && item?.link) || links.find((item) => item?.link);
    return best?.link || null;
  } catch {
    return null;
  }
}
__name(extractClock, "extractClock");
__name4(extractClock, "extractClock");
function embedMediaType(url) {
  if (!url) return null;
  if (url.includes(".m3u8")) return "hls";
  if (url.includes(".mp4")) return "mp4";
  return "direct";
}
__name(embedMediaType, "embedMediaType");
__name4(embedMediaType, "embedMediaType");
async function extractSource(src) {
  let url = src.sourceUrl;
  if (url && url.startsWith("--")) url = decodeHexUrl(url.slice(2));
  if (url && url.startsWith("/apivtwo/clock")) url = "https://allanime.day" + url.replace("/clock", "/clock.json");
  if (url && /^https?:\/\/allanime\.day\/apivtwo\/clock(?:\.json)?/i.test(url)) url = url.replace("/clock?", "/clock.json?");
  let extractedUrl = null;
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host === "allanime.day" && /\/apivtwo\/clock(?:\.json)?/i.test(new URL(url).pathname)) {
      extractedUrl = await extractClock(url);
    } else if (src.type === "player") extractedUrl = url;
    else if (host === "mp4upload.com") {
      const m = url.match(/embed-([a-zA-Z0-9]+)\.html/i);
      if (m?.[1]) extractedUrl = await extractMp4(m[1]);
    } else if (/uns\.bio$/i.test(host)) {
      extractedUrl = await extractUns(url);
    } else if (host === "ok.ru") {
      const m = url.match(/\/(?:videoembed\/)?(\d+)(?:[/?#]|$)/i);
      if (m?.[1]) extractedUrl = await extractOk(m[1]);
    } else if (/streamsb\./i.test(host)) {
      const m = url.match(/\/(?:e\/|embed-)([a-zA-Z0-9]+)(?:\.html)?/i);
      if (m?.[1]) extractedUrl = await extractStreamSB(m[1]);
    } else if (/streamlare\./i.test(host)) {
      const m = url.match(/\/e\/([a-zA-Z0-9]+)/i);
      if (m?.[1]) extractedUrl = await extractStreamlare(m[1]);
    }
  } catch {
  }
  return {
    name: src.sourceName || "",
    url,
    extractedUrl,
    extractedType: embedMediaType(extractedUrl),
    type: src.type,
    priority: src.priority,
    headers: {
      "Referer": REFERER,
      "User-Agent": UA4
    },
    downloads: src.downloads || null
  };
}
__name(extractSource, "extractSource");
__name4(extractSource, "extractSource");
async function fetchAniListFull(anilistId) {
  const q = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      idMal
      title { romaji english native }
      synonyms
      format
      episodes
      seasonYear
      startDate { year }
      type
      relations {
        edges { relationType(version: 2) node { id type format title { romaji english native } } }
      }
    }
  }`;
  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json", "User-Agent": UA4, "Origin": "https://anilist.co" },
    body: JSON.stringify({ query: q, variables: { id: Number(anilistId) } })
  });
  if (!res.ok) throw new Error("AniList fetch failed");
  const json5 = await res.json();
  return json5.data?.Media;
}
__name(fetchAniListFull, "fetchAniListFull");
__name4(fetchAniListFull, "fetchAniListFull");
async function fetchKitsuId(malId) {
  if (!malId) return null;
  try {
    const res = await fetch(`https://kitsu.io/api/edge/mappings?filter[externalSite]=myanimelist/anime&filter[externalId]=${malId}`);
    const json5 = await res.json();
    const mapping = json5.data?.[0];
    if (mapping?.relationships?.item?.links?.related) {
      const itemRes = await fetch(mapping.relationships.item.links.related);
      const itemJson = await itemRes.json();
      return itemJson.data?.id ? Number(itemJson.data.id) : null;
    }
  } catch {
  }
  return null;
}
__name(fetchKitsuId, "fetchKitsuId");
__name4(fetchKitsuId, "fetchKitsuId");
async function fetchTMDB(titles, year, format) {
  const tmdbType = format === "MOVIE" || format === "OVA" || format === "SPECIAL" ? "movie" : "tv";
  let result = null;
  for (const title2 of titles) {
    if (!title2) continue;
    try {
      const searchUrl = `https://api.themoviedb.org/3/search/${tmdbType}?query=${encodeURIComponent(title2)}&first_air_date_year=${year}&year=${year}`;
      const res = await fetch(searchUrl, { headers: { Authorization: `Bearer ${TMDB_TOKEN}`, Accept: "application/json" } });
      const json5 = await res.json();
      if (json5.results?.length) {
        result = json5.results[0];
        break;
      }
    } catch {
    }
  }
  if (!result) return { themoviedbId: null, imdbId: null, thetvdbId: null };
  try {
    const extUrl = `https://api.themoviedb.org/3/${tmdbType}/${result.id}/external_ids`;
    const extRes = await fetch(extUrl, { headers: { Authorization: `Bearer ${TMDB_TOKEN}`, Accept: "application/json" } });
    const externalIds = await extRes.json();
    return {
      themoviedbId: result.id,
      imdbId: externalIds.imdb_id || null,
      thetvdbId: externalIds.tvdb_id || null
    };
  } catch {
    return { themoviedbId: result.id, imdbId: null, thetvdbId: null };
  }
}
__name(fetchTMDB, "fetchTMDB");
__name4(fetchTMDB, "fetchTMDB");
async function handleMap(anilistId) {
  const al = await fetchAniListFull(anilistId);
  if (!al) throw new Error("AniList entry not found");
  const year = al.seasonYear || al.startDate?.year;
  const titlesToSearch = [al.title.english, al.title.romaji, al.title.native].filter(Boolean);
  const [kitsuId, tmdbData] = await Promise.all([
    fetchKitsuId(al.idMal),
    fetchTMDB(titlesToSearch, year, al.format)
  ]);
  return {
    mappings: {
      id: Number(anilistId),
      title: al.title.english || al.title.romaji,
      type: al.type,
      format: al.format,
      episodes: al.episodes,
      malId: al.idMal,
      aniId: Number(anilistId),
      anidbId: null,
      animePlanetId: null,
      kitsuId,
      imdbId: tmdbData.imdbId,
      themoviedbId: tmdbData.themoviedbId,
      thetvdbId: tmdbData.thetvdbId,
      livechartId: null,
      annId: null,
      synonyms: al.synonyms || [],
      franchise: al.relations?.edges?.map((e) => ({
        relation: e.relationType,
        id: e.node.id,
        title: e.node.title.romaji || e.node.title.english,
        type: e.node.type,
        format: e.node.format
      })) || []
    }
  };
}
__name(handleMap, "handleMap");
__name4(handleMap, "handleMap");
async function handleEpisodes(anilistId, ctx = {}) {
  const { showId, show, anizip } = await resolveMkissaId(anilistId, ctx);
  const epDetail = show.availableEpisodesDetail || {};
  const subEps = (epDetail.sub || []).map(Number).sort((a, b) => a - b);
  const dubEps = (epDetail.dub || []).map(Number).sort((a, b) => a - b);
  const buildList = /* @__PURE__ */ __name((nums, audio) => nums.map((n) => {
    const meta = anizip.episodes?.[String(n)] ?? {};
    return {
      id: `watch/mkissa/${anilistId}/${audio}/mkissa-${n}`,
      number: n,
      title: meta.title?.en || meta.title?.["x-jat"] || null,
      duration: meta.runtime ?? meta.length ?? 0,
      audio,
      filler: meta.filler ?? false,
      uncensored: false,
      description: meta.overview || meta.summary || null,
      image: meta.image || anizip.images?.cover || null,
      airDate: meta.airdate || meta.aired || null
    };
  }), "buildList");
  return {
    meta: {
      id: showId,
      title: show.englishName || show.name
    },
    episodes: {
      sub: buildList(subEps, "sub"),
      dub: buildList(dubEps, "dub"),
      raw: []
    }
  };
}
__name(handleEpisodes, "handleEpisodes");
__name4(handleEpisodes, "handleEpisodes");
async function handleEpisodesRoute(anilistId) {
  const { showId, show, anizip } = await resolveMkissaId(anilistId);
  const epDetail = show.availableEpisodesDetail || {};
  const subEps = (epDetail.sub || []).map(Number).sort((a, b) => a - b);
  const dubEps = (epDetail.dub || []).map(Number).sort((a, b) => a - b);
  const buildEpList = /* @__PURE__ */ __name((nums, audio) => nums.map((n) => {
    const meta = anizip.episodes?.[String(n)] ?? {};
    return {
      id: `watch/mkissa/${anilistId}/${audio}/mkissa-${n}`,
      number: n,
      title: meta.title?.en || meta.title?.["x-jat"] || `Episode ${n}`,
      duration: meta.runtime ?? meta.length ?? 0,
      audio,
      filler: meta.filler ?? false,
      uncensored: false,
      description: meta.overview || meta.summary || "",
      image: meta.image || anizip.images?.cover || "",
      airDate: meta.airdate || meta.aired || ""
    };
  }), "buildEpList");
  return {
    anilistId: Number(anilistId),
    mkissaId: showId,
    title: show.englishName || show.name,
    sub: buildEpList(subEps, "sub"),
    dub: buildEpList(dubEps, "dub")
  };
}
__name(handleEpisodesRoute, "handleEpisodesRoute");
__name4(handleEpisodesRoute, "handleEpisodesRoute");
function readCaptcha(request3, url) {
  const token = url.searchParams.get("captchaToken") || url.searchParams.get("turnstileToken") || request3.headers.get("x-captcha-token") || request3.headers.get("cf-turnstile-response");
  const provider = url.searchParams.get("captchaProvider") || request3.headers.get("x-captcha-provider") || "turnstile1";
  return token ? { token, provider } : null;
}
__name(readCaptcha, "readCaptcha");
__name4(readCaptcha, "readCaptcha");
function html(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store"
    }
  });
}
__name(html, "html");
__name4(html, "html");
function handleCaptchaPage(url) {
  const next = url.searchParams.get("next") || "";
  const safeNext = next.startsWith("/watch/mkissa/") ? next : "";
  const endpoint = `${API.replace(/\/$/, "")}/captcha/turnstile`;
  return html(`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>MKissa Security Check</title>
<style>
body{margin:0;font-family:system-ui,-apple-system,Segoe UI,sans-serif;background:#101114;color:#f5f5f5;display:grid;place-items:center;min-height:100vh}
main{width:min(720px,calc(100vw - 32px))}
h1{font-size:20px;font-weight:650;margin:0 0 14px}
#captcha-root{min-height:160px}
iframe{width:100%;min-height:180px;border:0;border-radius:8px;background:white}
pre{white-space:pre-wrap;word-break:break-word;background:#17191f;border:1px solid #2a2d36;border-radius:8px;padding:14px;max-height:48vh;overflow:auto}
button{border:0;border-radius:6px;padding:10px 14px;background:#f5f5f5;color:#111;font-weight:650;cursor:pointer}
</style>
</head>
<body>
<main>
<h1>MKissa Security Check</h1>
<div id="captcha-root"></div>
<pre id="out">Waiting for captcha...</pre>
</main>
<script>
const next=${JSON.stringify(safeNext)};
const endpoint=${JSON.stringify(endpoint)};
const out=document.getElementById("out");
const root=document.getElementById("captcha-root");
function show(value){out.textContent=typeof value==="string"?value:JSON.stringify(value,null,2)}
function run(token,provider){
  if(!next){show({error:"Missing next watch path"});return}
  const u=new URL(next,location.origin);
  u.searchParams.set("captchaToken",token);
  u.searchParams.set("captchaProvider",provider||"turnstile");
  show("Captcha solved. Retrying watch request...");
  fetch(u).then(r=>r.text().then(t=>{try{show(JSON.parse(t))}catch{show(t)}})).catch(e=>show({error:String(e)}));
}
window.addEventListener("message",event=>{
  if(event.origin!==new URL(endpoint).origin)return;
  const data=event.data;
  if(!data||data.type!=="sitea-captcha-ready")return;
  if(data.error){show({error:data.error});return}
  if(!data.token){show({error:"Captcha token missing"});return}
  run(data.token,data.provider);
});
const iframe=document.createElement("iframe");
iframe.src=endpoint;
iframe.title="Security check";
iframe.loading="eager";
iframe.referrerPolicy="strict-origin-when-cross-origin";
iframe.onerror=()=>show({error:"Failed to load captcha frame"});
root.appendChild(iframe);
<\/script>
</body>
</html>`);
}
__name(handleCaptchaPage, "handleCaptchaPage");
__name4(handleCaptchaPage, "handleCaptchaPage");
async function handleWatch(anilistId, audio, epNum, captcha = null) {
  const cacheKey = `${anilistId}:${audio}:${epNum}`;
  const cached = watchMemoryCache.get(cacheKey);
  if (cached && Date.now() < cached.expiresAt && !captcha) return cached.data;
  const { showId, show, anizip } = await resolveMkissaId(anilistId);
  if (!captcha) await warmWatchPage(showId, show, epNum, audio);
  let episode;
  try {
    episode = await getEpisodeSources(showId, epNum, audio, captcha);
  } catch (err) {
    if (err.code === "NEED_CAPTCHA" && cached?.data) return cached.data;
    throw err;
  }
  if (!episode) throw new Error("Episode not found");
  const sources = await Promise.all((episode.sourceUrls || []).map(extractSource));
  sources.sort((a, b) => b.priority - a.priority);
  const epMeta = anizip?.episodes?.[String(epNum)] ?? {};
  const data = {
    anilistId: Number(anilistId),
    mkissaId: showId,
    episode: Number(epNum),
    audio,
    intro: epMeta.intro ?? null,
    outro: epMeta.outro ?? null,
    sources
  };
  watchMemoryCache.set(cacheKey, { data, expiresAt: Date.now() + WATCH_MEMORY_TTL });
  return data;
}
__name(handleWatch, "handleWatch");
__name4(handleWatch, "handleWatch");
function json2(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300"
    }
  });
}
__name(json2, "json");
__name4(json2, "json");
function matchRoute(pathname) {
  let m = pathname.match(/^\/episodes\/(\d+)\/?$/);
  if (m) return { handler: "episodes", anilistId: m[1] };
  m = pathname.match(/^\/watch\/mkissa\/(\d+)\/(sub|dub)\/mkissa-(\d+)\/?$/);
  if (m) return { handler: "watch", anilistId: m[1], audio: m[2], ep: m[3] };
  m = pathname.match(/^\/map\/(\d+)\/?$/);
  if (m) return { handler: "map", anilistId: m[1] };
  m = pathname.match(/^\/captcha\/mkissa\/?$/);
  if (m) return { handler: "captcha" };
  return null;
}
__name(matchRoute, "matchRoute");
__name4(matchRoute, "matchRoute");
var mkissaDefault = {
  async fetch(request3) {
    const url = new URL(request3.url);
    if (request3.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "*"
        }
      });
    }
    const route = matchRoute(url.pathname);
    if (!route) {
      return json2({
        error: "Not found",
        routes: [
          "GET /episodes/:anilistId",
          "GET /watch/mkissa/:anilistId/:audio/mkissa-:ep",
          "GET /captcha/mkissa?next=/watch/mkissa/:anilistId/:audio/mkissa-:ep",
          "GET /map/:anilistId"
        ]
      }, 404);
    }
    try {
      if (route.handler === "captcha") return handleCaptchaPage(url);
      if (route.handler === "map") return json2(await handleMap(route.anilistId));
      if (route.handler === "episodes") return json2(await handleEpisodesRoute(route.anilistId));
      if (route.handler === "watch") return json2(await handleWatch(route.anilistId, route.audio, route.ep, readCaptcha(request3, url)));
    } catch (err) {
      const status = err.code === "NEED_CAPTCHA" ? 403 : 500;
      const solveUrl = route.handler === "watch" ? `/captcha/mkissa?next=${encodeURIComponent(url.pathname)}` : null;
      return json2({ error: err.message, code: err.code ?? null, captcha: err.code === "NEED_CAPTCHA" ? { endpoint: `${API.replace(/\/$/, "")}/captcha/turnstile`, provider: "turnstile", tokenQuery: "captchaToken", tokenHeader: "x-captcha-token", solveUrl } : null, "Raw-ERROR": err.rawBody ?? null, stack: err.stack }, status);
    }
  }
};
var mkissa_default = mkissaDefault;

// providers/reanime.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// extractors/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// extractors/byse.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
import { webcrypto as crypto2 } from "node:crypto";
var DEFAULT_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";
var BLOCKS = 512;
var MASK = BLOCKS - 1;
var ROUNDS = 2;
var MUL_A = 2654435761;
var MUL_B = 2246822519;
function b64u(value) {
  return Buffer.from(value).toString("base64url");
}
__name(b64u, "b64u");
function b64uDec(value) {
  return Buffer.from(value, "base64url");
}
__name(b64uDec, "b64uDec");
function rot(value, shift) {
  return (value << shift | value >>> 32 - shift) >>> 0;
}
__name(rot, "rot");
function mul(value, factor) {
  return Math.imul(value, factor) >>> 0;
}
__name(mul, "mul");
function mix(state) {
  state[0] = state[0] + state[1] >>> 0;
  state[3] = rot(state[3] ^ state[0], 16);
  state[2] = state[2] + state[3] >>> 0;
  state[1] = rot(state[1] ^ state[2], 12);
  state[0] = state[0] + state[1] >>> 0;
  state[3] = rot(state[3] ^ state[0], 8);
  state[2] = state[2] + state[3] >>> 0;
  state[1] = rot(state[1] ^ state[2], 7);
}
__name(mix, "mix");
function hash(bytes) {
  const state = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762]);
  for (let i = 0; i < bytes.length; i++) {
    state[0] = state[0] + bytes[i] >>> 0;
    state[0] = rot(state[0], 7);
    mix(state);
  }
  for (let i = 0; i < 8; i++) mix(state);
  const table3 = new Uint32Array(BLOCKS);
  for (let i = 0; i < BLOCKS; i++) {
    mix(state);
    table3[i] = (state[0] ^ state[2]) >>> 0;
  }
  for (let i = 0; i < ROUNDS; i++) {
    for (let index = 0; index < BLOCKS; index++) {
      const tableIndex = table3[index] & MASK;
      let value = table3[index] + table3[tableIndex] >>> 0;
      value = rot(value, 13);
      value = (value ^ mul(table3[index + 1 & MASK], MUL_A)) >>> 0;
      table3[index] = value;
      state[0] = (state[0] ^ value) >>> 0;
      mix(state);
    }
  }
  const out = new Uint32Array(8);
  const width = BLOCKS / 8;
  for (let i = 0; i < 8; i++) {
    mix(state);
    let value = state[0];
    const offset = i * width;
    for (let index = 0; index < width; index++) {
      const tableValue = table3[offset + index];
      value = value + tableValue >>> 0;
      value = rot(value, 5);
      value = (value ^ mul(tableValue, MUL_B)) >>> 0;
    }
    out[i] = (value ^ state[2]) >>> 0;
  }
  return out;
}
__name(hash, "hash");
function latin1Bytes(value) {
  const out = new Uint8Array(value.length);
  for (let i = 0; i < value.length; i++) out[i] = value.charCodeAt(i) & 255;
  return out;
}
__name(latin1Bytes, "latin1Bytes");
function leadingZeros(value) {
  let total = 0;
  for (let i = 0; i < value.length; i++) {
    const item = value[i];
    if (item === 0) {
      total += 32;
      continue;
    }
    return total + Math.clz32(item);
  }
  return total;
}
__name(leadingZeros, "leadingZeros");
function solvePoW(nonce, difficulty) {
  const prefix = `${nonce}:`;
  for (let counter = 0; ; counter++) {
    if (leadingZeros(hash(latin1Bytes(prefix + counter))) >= difficulty) return String(counter);
  }
}
__name(solvePoW, "solvePoW");
function canExtractByse(url) {
  return /(?:bysesayeveum\.com|gn1r5n\.org)\/e\//i.test(String(url));
}
__name(canExtractByse, "canExtractByse");
async function extractByse(embedUrl, { fetchImpl = fetch, userAgent = DEFAULT_USER_AGENT, referer } = {}) {
  const code = String(embedUrl).match(/\/e\/([a-z0-9]+)/i)?.[1];
  if (!code) throw new Error(`Cannot extract Byse code from ${embedUrl}`);
  const embedOrigin = new URL(embedUrl).origin;
  const parentUrl = referer || embedUrl;
  const parentHost = new URL(parentUrl).hostname;
  const embedHeaders = {
    "X-Embed-Origin": parentHost,
    "X-Embed-Referer": parentUrl,
    "X-Embed-Parent": embedUrl
  };
  const detailsResponse = await fetchImpl(`${embedOrigin}/api/videos/${code}/embed/details`, {
    headers: { "User-Agent": userAgent, "Referer": embedUrl, ...embedHeaders }
  });
  if (!detailsResponse.ok) throw new Error(`Byse details HTTP ${detailsResponse.status}`);
  const details = await detailsResponse.json();
  const frameUrl = details.embed_frame_url || embedUrl;
  const frameBase = new URL(frameUrl).origin;
  const challengeResponse = await fetchImpl(`${frameBase}/api/videos/access/challenge`, {
    method: "POST",
    headers: { "Content-Length": "0", "Origin": frameBase, "Referer": frameUrl, "User-Agent": userAgent }
  });
  if (!challengeResponse.ok) throw new Error(`Byse challenge HTTP ${challengeResponse.status}`);
  const challenge = await challengeResponse.json();
  const keyPair = await crypto2.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign"]);
  const publicKey = await crypto2.subtle.exportKey("jwk", keyPair.publicKey);
  const signature = await crypto2.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, keyPair.privateKey, new TextEncoder().encode(challenge.nonce));
  const attestResponse = await fetchImpl(`${frameBase}/api/videos/access/attest`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": frameBase, "Referer": frameUrl, "User-Agent": userAgent },
    body: JSON.stringify({ nonce: challenge.nonce, challenge_id: challenge.challenge_id, public_key: publicKey, signature: b64u(signature) })
  });
  if (!attestResponse.ok) throw new Error(`Byse attest HTTP ${attestResponse.status}`);
  const attest = await attestResponse.json();
  const cookie = `byse_viewer_id=${attest.viewer_id}; byse_device_id=${attest.device_id}`;
  const fingerprint = { token: attest.token, viewer_id: attest.viewer_id, device_id: attest.device_id, confidence: attest.confidence };
  const captchaResponse = await fetchImpl(`${frameBase}/api/videos/${code}/embed/captcha`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": frameBase, "Referer": frameUrl, "User-Agent": userAgent, "Cookie": cookie, ...embedHeaders },
    body: JSON.stringify({ fingerprint })
  });
  if (!captchaResponse.ok) throw new Error(`Byse captcha HTTP ${captchaResponse.status}`);
  const captcha = await captchaResponse.json();
  const verifyResponse = await fetchImpl(`${frameBase}/api/videos/${code}/embed/captcha/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": frameBase, "Referer": frameUrl, "User-Agent": userAgent, "Cookie": cookie, ...embedHeaders },
    body: JSON.stringify({ pow_token: captcha.pow_token, solution: solvePoW(captcha.pow_nonce, captcha.pow_difficulty), fingerprint })
  });
  if (!verifyResponse.ok) throw new Error(`Byse verify HTTP ${verifyResponse.status}`);
  const verification = await verifyResponse.json();
  const playbackResponse = await fetchImpl(`${frameBase}/api/videos/${code}/embed/playback`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": frameBase, "Referer": frameUrl, "User-Agent": userAgent, "Cookie": cookie, "X-Captcha-Token": verification.token, ...embedHeaders },
    body: JSON.stringify({ fingerprint })
  });
  if (!playbackResponse.ok) throw new Error(`Byse playback HTTP ${playbackResponse.status}`);
  const playbackData = await playbackResponse.json();
  const playback = playbackData.playback;
  const keyBytes = Buffer.concat(playback.key_parts.filter((item) => b64uDec(item).length === 16).map(b64uDec));
  const aesKey = await crypto2.subtle.importKey("raw", keyBytes, { name: "AES-GCM" }, false, ["decrypt"]);
  const decrypted = await crypto2.subtle.decrypt({ name: "AES-GCM", iv: b64uDec(playback.iv) }, aesKey, b64uDec(playback.payload));
  return JSON.parse(new TextDecoder().decode(decrypted)).sources.map((item) => item.url);
}
__name(extractByse, "extractByse");

// extractors/datasv.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var DEFAULT_USER_AGENT2 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";
function canExtractDataSv(url) {
  return /play\.echovideo\.ru\/embed-20\//i.test(String(url));
}
__name(canExtractDataSv, "canExtractDataSv");
async function extractDataSv(embedUrl, { fetchImpl = fetch, userAgent = DEFAULT_USER_AGENT2 } = {}) {
  const url = new URL(String(embedUrl));
  const id = url.pathname.match(/^\/embed-20\/([^/]+)$/i)?.[1];
  if (!id) throw new Error(`Cannot extract DATASV id from ${embedUrl}`);
  const endpoint = new URL("/embed-20/getSources", url.origin);
  endpoint.searchParams.set("id", id);
  const response = await fetchImpl(endpoint, {
    headers: {
      "User-Agent": userAgent,
      "Referer": embedUrl,
      "X-Requested-With": "XMLHttpRequest"
    }
  });
  if (!response.ok) throw new Error(`DATASV sources HTTP ${response.status}`);
  const data = await response.json();
  const sources = [];
  for (const [quality, urls] of Object.entries(data?.sources ?? {})) {
    for (const source of Array.isArray(urls) ? urls : [urls]) {
      if (typeof source === "string" && source) sources.push({ url: source, type: "mp4", quality });
    }
  }
  const available = await Promise.all(sources.map(async (source) => {
    try {
      const check = await fetchImpl(source.url, {
        method: "HEAD",
        headers: { "User-Agent": userAgent, "Referer": `${url.origin}/` }
      });
      return check.ok ? source : null;
    } catch {
      return null;
    }
  }));
  const valid = available.filter(Boolean);
  if (!valid.length) throw new Error("DATASV response has no available sources");
  return valid;
}
__name(extractDataSv, "extractDataSv");

// extractors/megaplay.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
import crypto3 from "node:crypto";

// node_modules/unenv/dist/runtime/node/vm.mjs
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_utils();

// node_modules/unenv/dist/runtime/node/internal/vm/script.mjs
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_utils();
var Script = class {
  static {
    __name(this, "Script");
  }
  runInContext(contextifiedObject, options) {
    throw createNotImplementedError("Script.runInContext");
  }
  runInNewContext(contextObject, options) {
    throw createNotImplementedError("Script.runInNewContext");
  }
  runInThisContext(options) {
    throw createNotImplementedError("Script.runInThisContext");
  }
  createCachedData() {
    throw createNotImplementedError("Script.createCachedData");
  }
};

// node_modules/unenv/dist/runtime/node/internal/vm/constants.mjs
var constants_exports2 = {};
__export(constants_exports2, {
  DONT_CONTEXTIFY: () => DONT_CONTEXTIFY,
  USE_MAIN_CONTEXT_DEFAULT_LOADER: () => USE_MAIN_CONTEXT_DEFAULT_LOADER
});
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var USE_MAIN_CONTEXT_DEFAULT_LOADER = /* @__PURE__ */ Symbol("vm_dynamic_import_main_context_default");
var DONT_CONTEXTIFY = /* @__PURE__ */ Symbol("vm_context_no_contextify");

// node_modules/unenv/dist/runtime/node/vm.mjs
var compileFunction = /* @__PURE__ */ notImplemented("vm.compileFunction");
var _contextSymbol = /* @__PURE__ */ Symbol("uenv.vm.context");
var createContext = /* @__PURE__ */ __name(function createContext2() {
  return Object.create(null, { [_contextSymbol]: { value: true } });
}, "createContext");
var createScript = /* @__PURE__ */ __name(function createScript2() {
  return new Script();
}, "createScript");
var isContext = /* @__PURE__ */ __name((context2) => {
  return context2 && context2[_contextSymbol] === true;
}, "isContext");
var measureMemory = /* @__PURE__ */ __name(() => Promise.resolve({
  total: {
    jsMemoryEstimate: 0,
    jsMemoryRange: [1, 2]
  },
  WebAssembly: {
    code: 0,
    metadata: 0
  }
}), "measureMemory");
var runInContext = /* @__PURE__ */ notImplemented("vm.runInContext");
var runInNewContext = /* @__PURE__ */ notImplemented("vm.runInNewContext");
var runInThisContext = /* @__PURE__ */ notImplemented("vm.runInThisContext");
var vm_default = {
  Script,
  compileFunction,
  constants: constants_exports2,
  createContext,
  isContext,
  measureMemory,
  runInContext,
  runInNewContext,
  runInThisContext,
  createScript
};

// extractors/megaplay.js
var DEFAULT_USER_AGENT3 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
function decodeScriptString(value) {
  return value.replace(/\\u([\dA-Fa-f]{4})|\\x([\dA-Fa-f]{2})|\\([\\'"bnfrtv0])/g, (_, unicode, hex, escaped) => {
    if (unicode) return String.fromCharCode(Number.parseInt(unicode, 16));
    if (hex) return String.fromCharCode(Number.parseInt(hex, 16));
    return { b: "\b", n: "\n", f: "\f", r: "\r", t: "	", v: "\v", 0: "\0" }[escaped] ?? escaped;
  });
}
__name(decodeScriptString, "decodeScriptString");
function getScriptStrings(script) {
  const strings = [];
  let index = 0;
  let previous = "";
  while (index < script.length) {
    const char = script[index];
    if (char === "/" && script[index + 1] === "/") {
      index = script.indexOf("\n", index + 2);
      if (index < 0) break;
      continue;
    }
    if (char === "/" && script[index + 1] === "*") {
      index = script.indexOf("*/", index + 2);
      if (index < 0) break;
      index += 2;
      continue;
    }
    if (char === "/" && /[=(:,[!&|?{};]/.test(previous)) {
      index++;
      let inClass = false;
      while (index < script.length) {
        if (script[index] === "\\") {
          index += 2;
          continue;
        }
        if (script[index] === "[") inClass = true;
        if (script[index] === "]") inClass = false;
        if (script[index] === "/" && !inClass) {
          index++;
          while (/[a-z]/i.test(script[index] ?? "")) index++;
          break;
        }
        index++;
      }
      continue;
    }
    if (char === "'" || char === '"') {
      const quote = char;
      let value = "";
      index++;
      while (index < script.length && script[index] !== quote) {
        if (script[index] === "\\" && index + 1 < script.length) value += script[index++];
        value += script[index++];
      }
      strings.push(decodeScriptString(value));
      index++;
      continue;
    }
    if (char === "`") {
      index++;
      while (index < script.length && script[index] !== "`") index += script[index] === "\\" ? 2 : 1;
      index++;
      continue;
    }
    if (!/\s/.test(char)) previous = char;
    index++;
  }
  return [...new Set(strings)];
}
__name(getScriptStrings, "getScriptStrings");
function getMegaPlayRoutes(script) {
  const routes = getScriptStrings(script).filter((value) => /^stream\/getSources[\w/-]*$/i.test(value)).sort((left, right) => left.length - right.length);
  const legacy = routes[0] ?? null;
  const modern = routes.find((route) => route !== legacy && route.startsWith(legacy)) ?? null;
  return { legacy, modern };
}
__name(getMegaPlayRoutes, "getMegaPlayRoutes");
function decryptMegaPlaySource(value, script) {
  if (!value) return null;
  const encrypted = Buffer.from(value, "base64url");
  if (!encrypted.length || encrypted.length % 16) return null;
  const values = getScriptStrings(script).filter((item) => Buffer.byteLength(item) > 0 && Buffer.byteLength(item) <= 32);
  const ivs = values.filter((item) => Buffer.byteLength(item) === 16);
  for (const keyValue of values) {
    const key = Buffer.alloc(32);
    Buffer.from(keyValue).copy(key);
    for (const ivValue of ivs) {
      try {
        const decipher = crypto3.createDecipheriv("aes-256-cbc", key, Buffer.from(ivValue));
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
        const data = JSON.parse(decrypted.toString("utf8"));
        const source = data?.file ?? data?.url ?? data?.sources?.file ?? data?.sources?.[0]?.file;
        if (typeof source === "string" && source) return source;
      } catch {
      }
    }
  }
  return null;
}
__name(decryptMegaPlaySource, "decryptMegaPlaySource");
function getMegaPlaySigningKey(script) {
  const objectName = script.match(/\blet\s+([A-Za-z_$][\w$]*)\s*;\s*!\s*function\s*\(\)\s*\{/i)?.[1];
  const entry = script.match(/\bconst\s+[A-Za-z_$][\w$]*\s*=\s*new URLSearchParams\b/);
  if (!objectName || !entry) return null;
  const encoderIndex = script.indexOf("new TextEncoder();return");
  if (encoderIndex < 0) return null;
  const keyVar = script.slice(encoderIndex, encoderIndex + 1600).match(/new TextEncoder\(\);return[\s\S]{0,1200}?\]\(([A-Za-z_$][\w$]*)\),\{/i)?.[1];
  if (!keyVar) return null;
  const keyExpression = script.match(
    new RegExp(`(?:const|let|var)\\s+${keyVar}\\s*=\\s*(${objectName}\\.[A-Za-z_$][\\w$]*\\(\\d+\\))`)
  )?.[1];
  if (!keyExpression) return null;
  try {
    const context2 = { console, decodeURI, encodeURI, Math, String, Array, Object, RegExp, Error, SyntaxError };
    context2.globalThis = context2;
    if (typeof vm_default?.runInNewContext === "function") {
      vm_default.runInNewContext(
        `${script.slice(0, entry.index)};globalThis.__megaPlaySigningKey=${keyExpression};`,
        context2,
        { timeout: 5e3 }
      );
      return typeof context2.__megaPlaySigningKey === "string" ? context2.__megaPlaySigningKey : null;
    }
    return null;
  } catch {
    return null;
  }
}
__name(getMegaPlaySigningKey, "getMegaPlaySigningKey");
function signMegaPlayUrl(value, signingKey) {
  if (!value || !signingKey || /[?&]token=/i.test(value)) return value;
  const match = String(value).match(/\/([a-f0-9]{32})\/([a-f0-9]{32})\//i);
  if (!match) return value;
  const pathKey = `${match[1].toLowerCase()}/${match[2].toLowerCase()}`;
  const payload = `${Math.floor(Date.now() / 1e3) + 90}|${pathKey}`;
  const signature = crypto3.createHmac("sha256", signingKey).update(payload).digest("base64url");
  const token = `${Buffer.from(payload).toString("base64url")}.${signature}`;
  const endpoint = new URL(value);
  endpoint.searchParams.set("token", token);
  return endpoint.href;
}
__name(signMegaPlayUrl, "signMegaPlayUrl");
function buildSourceUrl(origin, path, fileId) {
  const endpoint = new URL(path, origin);
  endpoint.searchParams.append("id", fileId);
  endpoint.searchParams.append("id", fileId);
  return endpoint;
}
__name(buildSourceUrl, "buildSourceUrl");
async function fetchText2(fetchImpl, url, headers) {
  const response = await fetchImpl(url, { headers });
  if (!response.ok) throw new Error(`MegaPlay HTTP ${response.status}: ${url}`);
  return response.text();
}
__name(fetchText2, "fetchText");
async function fetchJson(fetchImpl, url, headers) {
  const response = await fetchImpl(url, { headers });
  if (!response.ok) throw new Error(`MegaPlay HTTP ${response.status}: ${url}`);
  return response.json();
}
__name(fetchJson, "fetchJson");
function canExtractMegaPlay(url) {
  return /megaplay\.[^/]+\/stream\//i.test(String(url));
}
__name(canExtractMegaPlay, "canExtractMegaPlay");
async function extractMegaPlayDetails(embedUrl, { fetchImpl = fetch, userAgent = DEFAULT_USER_AGENT3, referer } = {}) {
  const pageUrl = new URL(String(embedUrl));
  const pageHeaders = {
    "User-Agent": userAgent,
    "Accept": "text/html,*/*",
    "Referer": referer ?? `${pageUrl.origin}/`
  };
  const pageHtml = await fetchText2(fetchImpl, pageUrl, pageHeaders);
  const fileId = pageHtml.match(/data-id=["']([^"']+)["']/i)?.[1];
  if (!fileId) throw new Error(`MegaPlay file id not found: ${embedUrl}`);
  const scriptUrls = [...pageHtml.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map((match) => new URL(match[1], pageUrl).href);
  const scripts = await Promise.all(scriptUrls.map(async (url) => {
    try {
      return await fetchText2(fetchImpl, url, { "User-Agent": userAgent, "Referer": pageUrl.href });
    } catch {
      return null;
    }
  }));
  const script = scripts.find((value) => /getSources/i.test(value) && /AES-CBC/i.test(value));
  const signingScript = scripts.find((value) => value.includes("[a-f0-9]{32}") && value.includes("token="));
  if (!script) throw new Error(`MegaPlay client script not found: ${embedUrl}`);
  const { legacy, modern } = getMegaPlayRoutes(script);
  if (!legacy && !modern) throw new Error(`MegaPlay source routes not found: ${embedUrl}`);
  const sourceHeaders = {
    "User-Agent": userAgent,
    "Accept": "application/json,*/*",
    "Referer": pageUrl.href,
    "X-Requested-With": "XMLHttpRequest"
  };
  const [modernData, legacyData] = await Promise.all([
    modern ? fetchJson(fetchImpl, buildSourceUrl(pageUrl.origin, modern, fileId), sourceHeaders).catch(() => null) : null,
    legacy ? fetchJson(fetchImpl, buildSourceUrl(pageUrl.origin, legacy, fileId), sourceHeaders).catch(() => null) : null
  ]);
  const signingKey = signingScript ? getMegaPlaySigningKey(signingScript) : null;
  const modernUrl = signMegaPlayUrl(
    modernData?.sources?.file ?? decryptMegaPlaySource(modernData?.enc, script),
    signingKey
  );
  const legacyUrl = signMegaPlayUrl(
    legacyData?.sources?.file ?? decryptMegaPlaySource(legacyData?.enc, script),
    signingKey
  );
  const sources = [
    modernUrl ? { url: modernUrl, variant: "modern" } : null,
    legacyUrl ? { url: legacyUrl, variant: "legacy" } : null
  ].filter((source, index, all) => source && all.findIndex((candidate) => candidate?.url === source.url) === index);
  if (!sources.length) throw new Error(`MegaPlay response has no sources: ${embedUrl}`);
  const metadata = modernData ?? legacyData ?? {};
  return {
    origin: pageUrl.origin,
    sources,
    tracks: Array.isArray(metadata.tracks) ? metadata.tracks : [],
    intro: metadata.intro ?? null,
    outro: metadata.outro ?? null
  };
}
__name(extractMegaPlayDetails, "extractMegaPlayDetails");
async function extractMegaPlay(embedUrl, options = {}) {
  const details = await extractMegaPlayDetails(embedUrl, options);
  return details.sources.map((source) => source.url);
}
__name(extractMegaPlay, "extractMegaPlay");

// extractors/nova.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
import crypto4 from "node:crypto";
var DEFAULT_USER_AGENT4 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";
var KEY = Buffer.from("6b69656d7469656e6d75613931316361", "hex");
var IV = Buffer.from("313233343536373839306f6975797472", "hex");
function canExtractNova(url) {
  return /upn\.one/i.test(String(url));
}
__name(canExtractNova, "canExtractNova");
async function extractNova(embedUrl, { fetchImpl = fetch, userAgent = DEFAULT_USER_AGENT4 } = {}) {
  const id = String(embedUrl).match(/upn\.one\/#([A-Za-z0-9]+)/i)?.[1];
  if (!id) throw new Error(`Cannot extract Nova id from ${embedUrl}`);
  const response = await fetchImpl(`https://nova.upn.one/api/v1/video?id=${id}&w=1920&h=1080&r=`, {
    headers: { "User-Agent": userAgent, "Referer": "https://nova.upn.one/" }
  });
  if (!response.ok) throw new Error(`Nova fetch HTTP ${response.status}`);
  const hex = (await response.text()).trim();
  const decipher = crypto4.createDecipheriv("aes-128-cbc", KEY, IV);
  const decrypted = Buffer.concat([decipher.update(Buffer.from(hex, "hex")), decipher.final()]);
  const data = JSON.parse(decrypted.toString("utf8"));
  const url = data.cf ?? data.source;
  if (!url) throw new Error("Nova response missing m3u8 url");
  return [url];
}
__name(extractNova, "extractNova");

// extractors/vidplay.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var DEFAULT_USER_AGENT5 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";
function canExtractVidplay(url) {
  return /play\.echovideo\.ru\/embed-[01]\//i.test(String(url));
}
__name(canExtractVidplay, "canExtractVidplay");
async function extractVidplay(embedUrl, { fetchImpl = fetch, userAgent = DEFAULT_USER_AGENT5 } = {}) {
  const url = new URL(String(embedUrl));
  const match = url.pathname.match(/^\/(embed-[01])\/([^/]+)$/i);
  const type = match?.[1];
  const id = match?.[2];
  if (!id) throw new Error(`Cannot extract Vidplay id from ${embedUrl}`);
  const endpoint = new URL(`/${type}/getSources`, url.origin);
  endpoint.searchParams.set("id", id);
  const response = await fetchImpl(endpoint, {
    headers: {
      "User-Agent": userAgent,
      "Referer": embedUrl,
      "X-Requested-With": "XMLHttpRequest"
    }
  });
  if (!response.ok) throw new Error(`Vidplay sources HTTP ${response.status}`);
  const data = await response.json();
  const sources = Array.isArray(data?.sources) ? data.sources.map((item) => typeof item === "string" ? item : item?.file ?? item?.url).filter(Boolean) : typeof data?.sources === "string" ? [data.sources] : [];
  if (!sources.length) throw new Error("Vidplay response has no sources");
  return sources;
}
__name(extractVidplay, "extractVidplay");

// extractors/vidmoly.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var DEFAULT_USER_AGENT6 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";
function canExtractVidmoly(url) {
  return /vidmoly\.(net|biz|to)/i.test(String(url));
}
__name(canExtractVidmoly, "canExtractVidmoly");
async function extractVidmoly(embedUrl, { fetchImpl = fetch, userAgent = DEFAULT_USER_AGENT6, referer } = {}) {
  const url = String(embedUrl).startsWith("//") ? `https:${embedUrl}` : String(embedUrl);
  const response = await fetchImpl(url, {
    headers: { "User-Agent": userAgent, "Referer": referer ?? "https://animenosub.to/" },
    redirect: "follow"
  });
  if (!response.ok) throw new Error(`Vidmoly fetch HTTP ${response.status}`);
  const html2 = await response.text();
  const match = html2.match(/sources:\s*\[\s*\{\s*file:\s*['"]([^'"]+\.m3u8[^'"]*)['"]/);
  if (!match) throw new Error("Vidmoly m3u8 not found in embed HTML");
  return [match[1]];
}
__name(extractVidmoly, "extractVidmoly");

// extractors/flixcloud.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
import { webcrypto as crypto5 } from "node:crypto";
var encoder = new TextEncoder();
var decoder = new TextDecoder();
async function sha256hex(value) {
  const bytes = await crypto5.subtle.digest("SHA-256", typeof value === "string" ? encoder.encode(value) : value);
  return Array.from(new Uint8Array(bytes)).map((item) => item.toString(16).padStart(2, "0")).join("");
}
__name(sha256hex, "sha256hex");
function b64toU8(value) {
  const binary = atob(value);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}
__name(b64toU8, "b64toU8");
function readLeb(bytes, position) {
  let value = 0;
  let shift = 0;
  let next;
  do {
    next = bytes[position++];
    value |= (next & 127) << shift;
    shift += 7;
  } while (next & 128);
  return [value, position];
}
__name(readLeb, "readLeb");
function extractPlaylistKey(wasmBytes) {
  let position = 8;
  while (position < wasmBytes.length) {
    const section = wasmBytes[position++];
    const [size, nextPosition] = readLeb(wasmBytes, position);
    position = nextPosition;
    if (section === 11) {
      const end = position + size;
      let dataPosition = position;
      const [count3, countPosition] = readLeb(wasmBytes, dataPosition);
      dataPosition = countPosition;
      for (let i = 0; i < count3 && dataPosition < end; i++) {
        const [, flagsPosition] = readLeb(wasmBytes, dataPosition);
        dataPosition = flagsPosition;
        if (wasmBytes[dataPosition] !== 65) break;
        dataPosition++;
        const [, offsetPosition] = readLeb(wasmBytes, dataPosition);
        dataPosition = offsetPosition;
        if (wasmBytes[dataPosition] === 11) dataPosition++;
        const [dataLength, lengthPosition] = readLeb(wasmBytes, dataPosition);
        dataPosition = lengthPosition;
        const segment = wasmBytes.slice(dataPosition, dataPosition + dataLength);
        dataPosition += dataLength;
        if (segment.length >= 64) {
          const out = new Uint8Array(32);
          for (let j = 0; j < 32; j++) out[j] = segment[j] ^ segment[j + 32];
          return btoa(String.fromCharCode(...out));
        }
      }
    }
    position += size;
  }
  return null;
}
__name(extractPlaylistKey, "extractPlaylistKey");
async function deriveFields(seed) {
  let first = seed;
  for (let i = 0; i < 3; i++) first = await sha256hex(first + i);
  let second = first;
  for (let i = 0; i < 3; i++) second = await sha256hex(second + i);
  return {
    keyField: "kf_" + first.substring(8, 16),
    ivField: "ivf_" + first.substring(16, 24),
    containerName: "cd_" + first.substring(24, 32),
    arrayName: "ad_" + first.substring(32, 40),
    objectName: "od_" + first.substring(40, 48),
    tokenField: first.substring(48, 64) + "_" + first.substring(56, 64),
    keyFrag2Field: second.substring(0, 16) + "_" + second.substring(16, 24)
  };
}
__name(deriveFields, "deriveFields");
function extractSsrObj(html2) {
  const match = html2.match(/\{type:"data",data:(\{)/);
  if (!match) throw new Error("SSR data block not found");
  let depth = 0;
  const start = html2.indexOf("{", match.index + match[0].length - 1);
  for (let i = start; i < html2.length; i++) {
    if (html2[i] === "{") depth++;
    else if (html2[i] === "}" && --depth === 0) return html2.slice(start, i + 1);
  }
  throw new Error("SSR brace matching failed");
}
__name(extractSsrObj, "extractSsrObj");
function parseJsLiteral(source) {
  let index = 0;
  function whitespace() {
    while (index < source.length && /\s/.test(source[index])) index++;
  }
  __name(whitespace, "whitespace");
  function doubleString() {
    let out = "";
    index++;
    while (index < source.length && source[index] !== '"') {
      if (source[index] === "\\") {
        index++;
        out += { n: "\n", t: "	", r: "\r", '"': '"', "\\": "\\" }[source[index]] ?? source[index];
        index++;
      } else out += source[index++];
    }
    index++;
    return out;
  }
  __name(doubleString, "doubleString");
  function singleString() {
    let out = "";
    index++;
    while (index < source.length && source[index] !== "'") {
      if (source[index] === "\\") {
        index++;
        out += source[index] === "'" ? "'" : { n: "\n", t: "	", r: "\r", "\\": "\\" }[source[index]] ?? source[index];
        index++;
      } else out += source[index++];
    }
    index++;
    return out;
  }
  __name(singleString, "singleString");
  function key() {
    whitespace();
    if (source[index] === '"') return doubleString();
    if (source[index] === "'") return singleString();
    const match = source.slice(index).match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/);
    if (!match) throw new Error(`Bad key at pos ${index}: ${source.slice(index, index + 20)}`);
    index += match[0].length;
    return match[0];
  }
  __name(key, "key");
  function object() {
    const out = {};
    index++;
    whitespace();
    while (index < source.length && source[index] !== "}") {
      if (source[index] === ",") {
        index++;
        whitespace();
        continue;
      }
      const property = key();
      whitespace();
      index++;
      out[property] = value();
      whitespace();
    }
    index++;
    return out;
  }
  __name(object, "object");
  function array() {
    const out = [];
    index++;
    whitespace();
    while (index < source.length && source[index] !== "]") {
      if (source[index] === ",") {
        index++;
        whitespace();
        continue;
      }
      out.push(value());
      whitespace();
    }
    index++;
    return out;
  }
  __name(array, "array");
  function value() {
    whitespace();
    if (source[index] === "{") return object();
    if (source[index] === "[") return array();
    if (source[index] === '"') return doubleString();
    if (source[index] === "'") return singleString();
    if (source.startsWith("true", index)) {
      index += 4;
      return true;
    }
    if (source.startsWith("false", index)) {
      index += 5;
      return false;
    }
    if (source.startsWith("null", index)) {
      index += 4;
      return null;
    }
    if (source.startsWith("undefined", index)) {
      index += 9;
      return null;
    }
    if (source.startsWith("!0", index)) {
      index += 2;
      return true;
    }
    if (source.startsWith("!1", index)) {
      index += 2;
      return false;
    }
    const match = source.slice(index).match(/^-?[\d.]+([eE][+-]?\d+)?/);
    if (match) {
      index += match[0].length;
      return parseFloat(match[0]);
    }
    throw new Error(`JS parse error at pos ${index}: ...${source.slice(index, index + 20)}`);
  }
  __name(value, "value");
  return value();
}
__name(parseJsLiteral, "parseJsLiteral");
function parseWasmDecrypt(bytes) {
  let position = 8;
  while (position < bytes.length) {
    const section = bytes[position++];
    let size = 0;
    let shift = 0;
    let next2;
    do {
      next2 = bytes[position++];
      size |= (next2 & 127) << shift;
      shift += 7;
    } while (next2 & 128);
    if (section === 10) {
      position++;
      let bodySize = 0;
      let bodyShift = 0;
      do {
        next2 = bytes[position++];
        bodySize |= (next2 & 127) << bodyShift;
        bodyShift += 7;
      } while (next2 & 128);
      position += bodySize;
      break;
    }
    position += size;
  }
  let functionSize = 0;
  let functionShift = 0;
  let next;
  do {
    next = bytes[position++];
    functionSize |= (next & 127) << functionShift;
    functionShift += 7;
  } while (next & 128);
  const body = bytes.slice(position, position + functionSize);
  function leb(array, index) {
    let value = 0;
    let shift = 0;
    let next2;
    do {
      next2 = array[index++];
      value |= (next2 & 127) << shift;
      shift += 7;
    } while (next2 & 128);
    return [value, index];
  }
  __name(leb, "leb");
  const xorEnd = [32, 2, 32, 5, 106, 45, 0, 0, 115, 33, 6];
  let transformStart = -1;
  outer: for (let i = 0; i < body.length - xorEnd.length; i++) {
    for (let j = 0; j < xorEnd.length; j++) if (body[i + j] !== xorEnd[j]) continue outer;
    transformStart = i + xorEnd.length;
    break;
  }
  if (transformStart < 0) throw new Error("WASM: transform start not found");
  let transformEnd = -1;
  let step = 36;
  for (let i = transformStart; i < body.length - 4; i++) {
    if (body[i] === 32 && body[i + 1] === 5 && body[i + 2] === 65) {
      const [value, nextIndex] = leb(body, i + 3);
      if (body[nextIndex] === 108) {
        transformEnd = i;
        step = value;
        break;
      }
    }
  }
  if (transformEnd < 0) throw new Error("WASM: keystream not found");
  const code = body.slice(transformStart, transformEnd);
  function transform(inputByte) {
    let local = inputByte & 255;
    const stack = [];
    let index = 0;
    while (index < code.length) {
      const opcode = code[index++];
      if (opcode === 32) {
        const [localIndex, nextIndex] = leb(code, index);
        index = nextIndex;
        stack.push(localIndex === 6 ? local : 0);
      } else if (opcode === 33) {
        const [localIndex, nextIndex] = leb(code, index);
        index = nextIndex;
        const value = stack.pop();
        if (localIndex === 6) local = value & 255;
      } else if (opcode === 65) {
        const [value, nextIndex] = leb(code, index);
        index = nextIndex;
        stack.push(value);
      } else if (opcode === 106) {
        const right = stack.pop();
        const left = stack.pop();
        stack.push(left + right & 255);
      } else if (opcode === 107) {
        const right = stack.pop();
        const left = stack.pop();
        stack.push(left - right + 256 & 255);
      } else if (opcode === 113) {
        const right = stack.pop();
        const left = stack.pop();
        stack.push(left & right & 255);
      } else if (opcode === 114) {
        const right = stack.pop();
        const left = stack.pop();
        stack.push(left | right & 255);
      } else if (opcode === 115) {
        const right = stack.pop();
        const left = stack.pop();
        stack.push(left ^ right & 255);
      } else if (opcode === 116) {
        const right = stack.pop();
        const left = stack.pop();
        stack.push(left << (right & 7) & 255);
      } else if (opcode === 118) {
        const right = stack.pop();
        const left = stack.pop();
        stack.push(left >>> (right & 7) & 255);
      }
    }
    return local;
  }
  __name(transform, "transform");
  return { step, transform };
}
__name(parseWasmDecrypt, "parseWasmDecrypt");
function runDecrypt(wasmBytes, fragment, keyFragment, token, seed) {
  const { step, transform } = parseWasmDecrypt(wasmBytes);
  const out = new Uint8Array(fragment.length);
  for (let i = 0; i < fragment.length; i++) {
    const value = fragment[i] ^ keyFragment[i] ^ token[i] & 255;
    out[i] = transform(value) ^ i * step + seed & 255;
  }
  return out;
}
__name(runDecrypt, "runDecrypt");
async function extractFlixcloud(embedHtml, { fetchImpl = fetch, apiBase = "https://flixcloud.cc", headers = {}, referer } = {}) {
  const data = parseJsLiteral(extractSsrObj(embedHtml));
  const seed = data.obfuscation_seed;
  if (!seed) {
    const error3 = new Error("obfuscation_seed missing");
    error3.debug = { topKeys: Object.keys(data).slice(0, 20) };
    throw error3;
  }
  const fields = await deriveFields(seed);
  const cryptoData = data.obfuscated_crypto_data;
  if (!cryptoData) {
    const error3 = new Error("obfuscated_crypto_data missing");
    error3.debug = { fields, topKeys: Object.keys(data).slice(0, 20) };
    throw error3;
  }
  const container = cryptoData[fields.containerName];
  if (!container) {
    const error3 = new Error(`containerName "${fields.containerName}" not in ocd`);
    error3.debug = { fields, ocdKeys: Object.keys(cryptoData).slice(0, 10) };
    throw error3;
  }
  const array = container[fields.arrayName];
  if (!array) {
    const error3 = new Error(`arrayName "${fields.arrayName}" not in container`);
    error3.debug = { fields, containerKeys: Object.keys(container).slice(0, 10) };
    throw error3;
  }
  const object = array[0][fields.objectName];
  if (!object) {
    const error3 = new Error(`objectName "${fields.objectName}" not in arr[0]`);
    error3.debug = { fields, arr0Keys: Object.keys(array[0]).slice(0, 10) };
    throw error3;
  }
  const fragment = b64toU8(object[fields.keyField]);
  const iv = b64toU8(object[fields.ivField]);
  const keyFragmentRaw = data[fields.keyFrag2Field];
  if (!keyFragmentRaw) {
    const error3 = new Error(`kf2 field "${fields.keyFrag2Field}" not in data`);
    error3.debug = { fields, topKeys: Object.keys(data).slice(0, 20) };
    throw error3;
  }
  const keyFragment = b64toU8(keyFragmentRaw);
  const token = data[fields.tokenField];
  if (!token) {
    const error3 = new Error(`tokenField "${fields.tokenField}" missing`);
    error3.debug = { fields, topKeys: Object.keys(data).slice(0, 20) };
    throw error3;
  }
  const tokenResponse = await fetchImpl(`${apiBase}/api/m3u8/${token}`, { headers: { ...headers, ...referer ? { Referer: referer } : {} } });
  if (!tokenResponse.ok) {
    const error3 = new Error(`Token API ${tokenResponse.status}`);
    error3.rawBody = await tokenResponse.text().catch(() => null);
    throw error3;
  }
  const tokenData = await tokenResponse.json();
  const videoKey = (await sha256hex(token + "vid")).substring(0, 10);
  const tokenKey = (await sha256hex(token + "key")).substring(0, 10);
  const videoBytes = b64toU8(tokenData[videoKey]);
  const tokenBytes = b64toU8(tokenData[tokenKey]);
  if (!videoBytes.length || !tokenBytes.length) {
    const error3 = new Error(`Token fields missing. vidKey="${videoKey}" keyKey="${tokenKey}"`);
    error3.debug = { tokKeys: Object.keys(tokenData).slice(0, 10) };
    throw error3;
  }
  const seedNumber = parseInt(seed.substring(0, 8), 16);
  const wasmPayload = b64toU8(data.w_payload ?? "");
  if (!wasmPayload.length) throw new Error("w_payload missing from embed data");
  const playlistKey = extractPlaylistKey(wasmPayload);
  let wasmOut;
  try {
    wasmOut = runDecrypt(wasmPayload, fragment, keyFragment, tokenBytes, seedNumber);
  } catch (error3) {
    error3.wasmHex = Array.from(wasmPayload).map((item) => item.toString(16).padStart(2, "0")).join("");
    throw error3;
  }
  const material = await crypto5.subtle.importKey("raw", wasmOut, { name: "PBKDF2" }, false, ["deriveBits"]);
  const derived = new Uint8Array(await crypto5.subtle.deriveBits({ name: "PBKDF2", salt: encoder.encode(seed), iterations: 1e3, hash: "SHA-256" }, material, 256));
  for (let i = 0; i < 32; i++) derived[i] ^= seed.charCodeAt(i % seed.length);
  const aesKeyBytes = new Uint8Array(await crypto5.subtle.digest("SHA-256", derived));
  const aesKey = await crypto5.subtle.importKey("raw", aesKeyBytes, { name: "AES-CBC" }, false, ["decrypt"]);
  let plain;
  try {
    plain = await crypto5.subtle.decrypt({ name: "AES-CBC", iv }, aesKey, videoBytes);
  } catch (error3) {
    error3.debug = {
      seedInt: "0x" + seedNumber.toString(16),
      frag1Len: fragment.length,
      kf2Len: keyFragment.length,
      T_bytesLen: tokenBytes.length,
      ivLen: iv.length,
      v_bytesLen: videoBytes.length,
      wPayloadLen: wasmPayload.length,
      wasmOutHex: Array.from(wasmOut).map((item) => item.toString(16).padStart(2, "0")).join("")
    };
    throw error3;
  }
  const url = decoder.decode(plain).trim().replace(/\0+$/, "");
  if (!url.startsWith("http")) throw new Error(`Unexpected decrypted value: ${url.substring(0, 60)}`);
  return {
    url,
    key: playlistKey,
    playlist_key: playlistKey,
    subtitles: data.subtitles ?? [],
    thumbnails_vtt: data.thumbnails_vtt ?? null,
    video_title: data.video_title ?? null,
    intro_chapter: data.intro_chapter ?? null,
    outro_chapter: data.outro_chapter ?? null,
    video_id: data.video_id ?? null
  };
}
__name(extractFlixcloud, "extractFlixcloud");

// extractors/index.js
var videoExtractors = [
  { name: "byse", matches: canExtractByse, extract: extractByse },
  { name: "datasv", matches: canExtractDataSv, extract: extractDataSv },
  { name: "megaplay", matches: canExtractMegaPlay, extract: extractMegaPlay },
  { name: "vidplay", matches: canExtractVidplay, extract: extractVidplay },
  { name: "vidmoly", matches: canExtractVidmoly, extract: extractVidmoly },
  { name: "nova", matches: canExtractNova, extract: extractNova }
];
function findVideoExtractor(url) {
  return videoExtractors.find((extractor) => extractor.matches(url)) ?? null;
}
__name(findVideoExtractor, "findVideoExtractor");

// providers/reanime.js
var __name5 = /* @__PURE__ */ __name((fn, _) => fn, "__name");
var BASE = "https://reanime.to";
var FLIX = "https://flixcloud.cc";
var ANIZIP2 = "https://api.ani.zip/mappings";
var UA5 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
var H = { "User-Agent": UA5, Accept: "application/json, */*" };
async function searchReanime(query, genre = null) {
  const params = new URLSearchParams({ q: query, limit: 10 });
  if (genre) params.set("genre", genre);
  const data = await fetch(`${BASE}/api/v1/search?${params}`, { headers: H }).then(async (r) => {
    const _raw = await r.text();
    if (!r.ok) {
      const _e = new Error(`reanime search ${r.status}`);
      _e.rawBody = _raw;
      throw _e;
    }
    try {
      return JSON.parse(_raw);
    } catch (_pe) {
      _pe.rawBody = _raw;
      throw _pe;
    }
  });
  return Array.isArray(data?.results) ? data.results : [];
}
__name(searchReanime, "searchReanime");
__name5(searchReanime, "searchReanime");
async function fetchAnimeDetail(animeId) {
  const res = await fetch(`${BASE}/api/v1/anime/${animeId}`, { headers: H });
  if (!res.ok) return null;
  return res.json().catch(() => null);
}
__name(fetchAnimeDetail, "fetchAnimeDetail");
__name5(fetchAnimeDetail, "fetchAnimeDetail");
function extractAnilistIdFromCover(coverImage) {
  const urls = [coverImage?.extra_large, coverImage?.large, coverImage?.medium].filter(Boolean);
  for (const url of urls) {
    const m = url.match(/anilist\.co\/.*\/bx(\d+)-/);
    if (m) return Number(m[1]);
  }
  return null;
}
__name(extractAnilistIdFromCover, "extractAnilistIdFromCover");
__name5(extractAnilistIdFromCover, "extractAnilistIdFromCover");
async function resolveSeries(anilistId, ctx = {}) {
  const cacheKey = `np:match2:reanime:${anilistId}`;
  const cached = get2(cacheKey);
  if (isFresh(cached)) return cached.data;
  const media = ctx.media ?? await getMedia(anilistId);
  const malId = media?.idMal ?? null;
  const queries = buildTitleSearchQueries(buildTitles(media, ctx.anizip), 16);
  const searchRequests = queries.map((query) => searchReanime(query));
  if (media?.genres?.includes("Hentai")) {
    searchRequests.push(...queries.map((query) => searchReanime(query, "Hentai")));
  }
  const candidates = /* @__PURE__ */ new Map();
  await Promise.all(searchRequests.map(async (request3) => {
    for (const r of await request3.catch(() => [])) {
      if (r?.anime_id && !candidates.has(r.anime_id)) candidates.set(r.anime_id, r);
    }
  }));
  for (const [id, r] of candidates) {
    const coverId = extractAnilistIdFromCover(r.cover_image);
    if (coverId && coverId === Number(anilistId)) {
      const data = {
        animeId: id,
        title: r.title?.english || r.title?.romaji || id,
        anilistId: Number(anilistId),
        malId: null,
        subbed: Number.isFinite(r.subbed) ? r.subbed : null,
        dubbed: Number.isFinite(r.dubbed) ? r.dubbed : null,
        episodesCount: Number.isFinite(r.episodes) ? r.episodes : null,
        matchType: "cover_image",
        matchScore: 1
      };
      set(cacheKey, data, SHOW_IDENTITY_TTL);
      return data;
    }
  }
  const needsDetail = [...candidates.keys()].filter(
    (id) => extractAnilistIdFromCover(candidates.get(id)?.cover_image) === null
  );
  const details = await Promise.all(
    needsDetail.map(async (id) => ({ id, detail: await fetchAnimeDetail(id).catch(() => null) }))
  );
  for (const { id, detail } of details) {
    if (detail?.anilist_id && Number(detail.anilist_id) === Number(anilistId)) {
      const data = {
        animeId: id,
        title: detail.title?.english || detail.title?.romaji || candidates.get(id)?.title?.english || id,
        anilistId: Number(anilistId),
        malId: detail.mal_id || null,
        subbed: Number.isFinite(detail.subbed) ? detail.subbed : null,
        dubbed: Number.isFinite(detail.dubbed) ? detail.dubbed : null,
        episodesCount: Number.isFinite(detail.episodes) ? detail.episodes : null,
        matchType: "anilist",
        matchScore: 1
      };
      set(cacheKey, data, SHOW_IDENTITY_TTL);
      return data;
    }
  }
  if (malId) {
    for (const { id, detail } of details) {
      const detailMal = detail?.mal_id;
      if (detailMal && Number(detailMal) === Number(malId)) {
        const data = {
          animeId: id,
          title: detail.title?.english || detail.title?.romaji || id,
          anilistId: Number(anilistId),
          malId: Number(detailMal),
          subbed: Number.isFinite(detail.subbed) ? detail.subbed : null,
          dubbed: Number.isFinite(detail.dubbed) ? detail.dubbed : null,
          episodesCount: Number.isFinite(detail.episodes) ? detail.episodes : null,
          matchType: "mal",
          matchScore: 0.9
        };
        set(cacheKey, data, SHOW_IDENTITY_TTL);
        return data;
      }
    }
  }
  throw new Error(`No confirmed reanime match for AniList ${anilistId}`);
}
__name(resolveSeries, "resolveSeries");
__name5(resolveSeries, "resolveSeries");
async function fetchEpisodesList(animeId, limit = 2e3) {
  const data = await fetch(`${BASE}/api/v1/anime/${animeId}/episodes?${new URLSearchParams({ limit })}`, { headers: H }).then(async (r) => {
    const _raw = await r.text();
    if (!r.ok) {
      const _e = new Error(`reanime episodes ${r.status}`);
      _e.rawBody = _raw;
      throw _e;
    }
    try {
      return JSON.parse(_raw);
    } catch (_pe) {
      _pe.rawBody = _raw;
      throw _pe;
    }
  });
  return Array.isArray(data?.data) ? data.data : [];
}
__name(fetchEpisodesList, "fetchEpisodesList");
__name5(fetchEpisodesList, "fetchEpisodesList");
async function fetchAnizip(anilistId) {
  return fetch(`${ANIZIP2}?anilist_id=${anilistId}`).then((r) => r.json()).catch(() => null);
}
__name(fetchAnizip, "fetchAnizip");
__name5(fetchAnizip, "fetchAnizip");
function mergeEpisode(anilistId, ep, meta, audio) {
  const number = ep.episode_number;
  return {
    id: `watch/reanime/${anilistId}/${audio}/reanime-${number}`,
    number,
    title: meta?.title?.en || meta?.title?.["x-jat"] || ep.title || `Episode ${number}`,
    titleJapanese: meta?.title?.ja || ep.title_japanese || null,
    titleRomanji: meta?.title?.["x-jat"] || ep.title_romanji || null,
    image: meta?.image || ep.thumbnail || null,
    airDate: meta?.airdate || ep.aired || null,
    duration: meta?.runtime ? meta.runtime * 60 : ep.duration ? ep.duration * 60 : null,
    score: null,
    filler: ep.is_filler ?? meta?.filler ?? false,
    recap: ep.is_recap ?? false,
    description: meta?.overview || ep.description || null,
    audio
  };
}
__name(mergeEpisode, "mergeEpisode");
__name5(mergeEpisode, "mergeEpisode");
function json3(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
}
__name(json3, "json3");
__name5(json3, "json");
async function handleEpisodes3(anilistId, url) {
  const series = await resolveSeries(anilistId);
  const [reanimeEps, anizip] = await Promise.all([
    fetchEpisodesList(series.animeId),
    fetchAnizip(anilistId)
  ]);
  if (!reanimeEps.length) return json3({ error: `No reanime episodes found for AniList ID ${anilistId} (slug ${series.animeId})` }, 404);
  const episodes = reanimeEps.map((ep) => {
    const meta = anizip?.episodes?.[String(ep.episode_number)] ?? null;
    return mergeEpisode(anilistId, ep, meta, "sub");
  }).sort((a, b) => a.number - b.number);
  return json3({
    anime: series.title,
    anilistId: Number(anilistId),
    malId: series.malId,
    animeId: series.animeId,
    episodes,
    pagination: { currentPage: 1, lastPage: 1, hasNextPage: false }
  });
}
__name(handleEpisodes3, "handleEpisodes3");
__name5(handleEpisodes3, "handleEpisodes");
async function resolveStream3(anilistId, audio, ep) {
  const series = await resolveSeries(anilistId);
  const title2 = series.title;
  const slug = series.animeId;
  const order = { "HD-2": 0, "HD-1": 1 };
  const byPrio = /* @__PURE__ */ __name((arr) => arr.slice().sort((a, b) => (order[a.serverName] ?? 9) - (order[b.serverName] ?? 9)), "byPrio");
  const [watchRes, flixRes] = await Promise.allSettled([
    fetch(`${BASE}/api/watch/${slug}/${ep}`, { headers: H }).then(async (r) => {
      const _raw = await r.text();
      if (!r.ok) {
        const _e = new Error(`watch ${r.status}`);
        _e.rawBody = _raw;
        throw _e;
      }
      try {
        return JSON.parse(_raw);
      } catch (_pe) {
        _pe.rawBody = _raw;
        throw _pe;
      }
    }),
    fetch(`${BASE}/api/flix/${anilistId}/${ep}`, { headers: H }).then(async (r) => {
      const _raw = await r.text();
      if (!r.ok) {
        const _e = new Error(`flix ${r.status}`);
        _e.rawBody = _raw;
        throw _e;
      }
      try {
        return JSON.parse(_raw);
      } catch (_pe) {
        _pe.rawBody = _raw;
        throw _pe;
      }
    })
  ]);
  const watchData = watchRes.status === "fulfilled" ? watchRes.value : null;
  const flixData = flixRes.status === "fulfilled" ? flixRes.value : null;
  const links = [...watchData?.episode_links ?? []];
  if (flixData?.success && flixData?.servers) {
    const seen = new Set(links.map((s) => s["$id"]));
    for (const s of flixData.servers) {
      if (!seen.has(s["$id"])) links.push(s);
    }
  }
  const audioTypes = audio === "sub" ? ["sub", "s-sub"] : ["dub", "s-dub"];
  const servers = byPrio(links.filter((s) => audioTypes.includes(s.dataType)));
  if (!servers.length) throw Object.assign(new Error(`No ${audio} servers for "${title2}" ep ${ep}`), { status: 404 });
  const seenServers = /* @__PURE__ */ new Set();
  const uniqueServers = servers.filter((s) => {
    const key = `${s.serverName}:${s.dataType}:${s.dataLink}`;
    if (seenServers.has(key)) return false;
    seenServers.add(key);
    return true;
  });
  const decrypted = await Promise.all(uniqueServers.map(async (server, index) => {
    try {
      const embedRes = await fetch(server.dataLink, { headers: { ...H, Referer: `${BASE}/` } });
      if (!embedRes.ok) throw new Error(`Embed fetch failed: ${embedRes.status}`);
      const stream = await extractFlixcloud(await embedRes.text(), { apiBase: FLIX, headers: H, referer: `${BASE}/` });
      return { server, stream, index };
    } catch (error3) {
      return { server, error: error3.message, index };
    }
  }));
  const streams = decrypted.filter((item) => item.stream?.url);
  if (!streams.length) {
    const error3 = decrypted.find((item) => item.error)?.error || "No decrypted streams";
    throw Object.assign(new Error(error3), { status: 502 });
  }
  return { title: title2, slug, watchData, stream: streams[0].stream, server: streams[0].server.serverName, servers: uniqueServers, streams, failedServers: decrypted.filter((item) => item.error) };
}
__name(resolveStream3, "resolveStream3");
__name5(resolveStream3, "resolveStream");
async function handleWatch3(anilistId, audio, epNum, origin) {
  if (audio !== "sub" && audio !== "dub") return json3({ error: "audio must be sub or dub" }, 400);
  const ep = parseInt(epNum);
  if (isNaN(ep)) return json3({ error: `Invalid episode: ${epNum}` }, 400);
  let resolved2;
  try {
    resolved2 = await resolveStream3(anilistId, audio, ep);
  } catch (e) {
    return json3({ error: e.message, "Raw-ERROR": e.rawBody ?? null, stack: e.stack }, e.status ?? 500);
  }
  const { title: title2, slug, watchData, stream, server, servers, streams, failedServers } = resolved2;
  const seenStreamUrls = /* @__PURE__ */ new Set();
  const cleanStreams = streams.map(({ server: source, stream: item, index }) => ({
    server: source.serverName,
    audio: source.dataType,
    index,
    url: item.url,
    type: "hls",
    embed: source.dataLink,
    key: item.key ?? null,
    playlist_key: item.playlist_key ?? item.key ?? null,
    subtitles: item.subtitles ?? [],
    thumbnails_vtt: item.thumbnails_vtt ?? null,
    video_title: item.video_title ?? null,
    intro: item.intro_chapter ?? null,
    outro: item.outro_chapter ?? null
  })).filter((item) => {
    if (seenStreamUrls.has(item.url)) return false;
    seenStreamUrls.add(item.url);
    return true;
  });
  const embeds = servers.map((s) => ({ name: s.serverName, type: s.dataType, url: s.dataLink }));
  return json3({
    anime: title2,
    slug,
    ep,
    audio,
    server,
    stream_url: stream.url,
    streams: cleanStreams,
    subtitles: stream.subtitles,
    thumbnails_vtt: stream.thumbnails_vtt,
    video_title: stream.video_title,
    intro: stream.intro_chapter,
    outro: stream.outro_chapter,
    intro_start: watchData?.intro_start ?? null,
    intro_end: watchData?.intro_end ?? null,
    outro_start: watchData?.outro_start ?? null,
    outro_end: watchData?.outro_end ?? null,
    embeds,
    allServers: servers.map((s) => ({ name: s.serverName, type: s.dataType, embed: s.dataLink })),
    failedServers: failedServers.map((s) => ({ name: s.server.serverName, type: s.server.dataType, error: s.error }))
  });
}
__name(handleWatch3, "handleWatch3");
__name5(handleWatch3, "handleWatch");
async function handleStream3(anilistId, audio, epNum) {
  if (audio !== "sub" && audio !== "dub") return json3({ error: "audio must be sub or dub" }, 400);
  const ep = parseInt(epNum);
  if (isNaN(ep)) return json3({ error: `Invalid episode: ${epNum}` }, 400);
  let resolved2;
  try {
    resolved2 = await resolveStream3(anilistId, audio, ep);
  } catch (e) {
    return json3({ error: e.message, "Raw-ERROR": e.rawBody ?? null, stack: e.stack }, e.status ?? 500);
  }
  return new Response(null, {
    status: 302,
    headers: {
      "Location": resolved2.stream.url,
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store"
    }
  });
}
__name(handleStream3, "handleStream3");
__name5(handleStream3, "handleStream");
var reanime_default = {
  async fetch(request3) {
    const url = new URL(request3.url);
    const path = url.pathname;
    if (request3.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,OPTIONS", "Access-Control-Allow-Headers": "*" } });
    }
    try {
      let m;
      if (path === "/healthz") return json3({ status: "ok", provider: "reanime" });
      m = path.match(/^\/episodes\/(\d+)$/);
      if (m) return await handleEpisodes3(m[1], url);
      m = path.match(/^\/watch\/(\d+)\/(sub|dub)\/(\d+)$/);
      if (m) return await handleWatch3(m[1], m[2], m[3], url.origin);
      m = path.match(/^\/stream\/(\d+)\/(sub|dub)\/(\d+)$/);
      if (m) return await handleStream3(m[1], m[2], m[3]);
      return json3({ error: "Not found", routes: ["GET /episodes/:anilistId", "GET /watch/:anilistId/sub|dub/:ep", "GET /stream/:anilistId/sub|dub/:ep"] }, 404);
    } catch (err) {
      return json3({ error: err.message, "Raw-ERROR": err.rawBody ?? null, ...err.debug ? { debug: err.debug } : {}, stack: err.stack }, 500);
    }
  }
};
async function getEpisodes3(anilistId, ctx = {}) {
  const series = await resolveSeries(anilistId, ctx);
  const anizip = ctx.anizip !== void 0 ? ctx.anizip : await fetchAnizip(anilistId);
  const reanimeEps = await fetchEpisodesList(series.animeId);
  if (!reanimeEps.length) throw new Error(`No reanime episodes found for AniList ${anilistId} (slug ${series.animeId})`);
  const hasSub = series.subbed == null || series.subbed > 0;
  const dubCount = series.dubbed ?? 0;
  const sub = [], dub = [];
  for (const ep of reanimeEps) {
    const meta = anizip?.episodes?.[String(ep.episode_number)] ?? null;
    if (hasSub) sub.push(mergeEpisode(anilistId, ep, meta, "sub"));
    if (dubCount > 0 && ep.episode_number <= dubCount) dub.push(mergeEpisode(anilistId, ep, meta, "dub"));
  }
  sub.sort((a, b) => a.number - b.number);
  dub.sort((a, b) => a.number - b.number);
  return {
    meta: { title: series.title, malId: series.malId, animeId: series.animeId },
    episodes: { sub, dub }
  };
}
__name(getEpisodes3, "getEpisodes3");
__name5(getEpisodes3, "getEpisodes");
var reanime_default2 = reanime_default;

// providers/anikoto.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var ANIKOTO = "https://anikototv.to";
var MAPPER = "https://mapper.nekostream.site/api/mal";
var ANIZIP3 = "https://api.ani.zip/mappings";
var SPOOF_REF = "https://hianimes.re/";
var UA6 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
var LANG_MAP = {
  en: "en",
  english: "en",
  ja: "ja",
  japanese: "ja",
  fr: "fr",
  french: "fr",
  de: "de",
  german: "de",
  es: "es",
  spanish: "es",
  pt: "pt",
  portuguese: "pt"
};
function normalize(s) {
  return (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}
__name(normalize, "normalize");
async function httpGet(url, headers = {}) {
  const res = await fetch(url, { headers: { "User-Agent": UA6, Accept: "text/html,*/*", ...headers } });
  if (!res.ok) {
    const _raw = await res.text().catch(() => null);
    const _e = new Error(`HTTP ${res.status} fetching ${url}`);
    _e.rawBody = _raw;
    throw _e;
  }
  return res.text();
}
__name(httpGet, "httpGet");
async function getJSON(url, headers = {}) {
  const res = await fetch(url, { headers: { "User-Agent": UA6, Accept: "application/json,*/*", ...headers } });
  if (!res.ok) {
    const _raw = await res.text().catch(() => null);
    const _e = new Error(`HTTP ${res.status} fetching ${url}`);
    _e.rawBody = _raw;
    throw _e;
  }
  return res.json();
}
__name(getJSON, "getJSON");
var MODIFIERS = [
  "ova",
  "movie",
  "special",
  "specials",
  "tales",
  "journal",
  "part",
  "season",
  "kanwa",
  "spin-off",
  "theatre"
];
function scoreCandidate(cand, primaryEn, primaryRom, synonyms) {
  let score = 0;
  const candNameNorm = normalize(cand.name);
  const candJpNorm = normalize(cand.jp);
  const candSlugNorm = normalize(cand.slug);
  const normEn = normalize(primaryEn);
  const normRom = normalize(primaryRom);
  if (normEn && candNameNorm === normEn) score += 1e3;
  if (normRom && candNameNorm === normRom) score += 900;
  if (normRom && candJpNorm === normRom) score += 800;
  const targetText = `${primaryEn || ""} ${primaryRom || ""} ${(synonyms || []).join(" ")}`.toLowerCase();
  for (const mod of MODIFIERS) {
    const candHasMod = candNameNorm.includes(mod) || candSlugNorm.includes(mod);
    const targetHasMod = targetText.includes(mod);
    if (candHasMod && !targetHasMod) {
      score -= 300;
    }
  }
  for (const t of [primaryEn, primaryRom, ...synonyms || []]) {
    const normT = normalize(t);
    if (!normT || normT.length < 3) continue;
    if (candNameNorm === normT) score += 200;
    else if (candNameNorm.startsWith(normT) || normT.startsWith(candNameNorm)) score += 80;
    else if (candNameNorm.includes(normT) || normT.includes(candNameNorm)) score += 40;
    if (candJpNorm && candJpNorm === normT) score += 100;
  }
  const lengthDiff = Math.abs(candNameNorm.length - (normEn || normRom || "").length);
  score -= lengthDiff * 2;
  return score;
}
__name(scoreCandidate, "scoreCandidate");
async function searchAnikoto(query) {
  const searchHtml = await httpGet(`${ANIKOTO}/filter?keyword=${encodeURIComponent(query)}`, { Referer: `${ANIKOTO}/` });
  const candidates = [];
  const re = /<a\s+class="name d-title"\s+href="https:\/\/anikototv\.to\/watch\/([^"/]+)(?:\/ep-\d+)?"[^>]*data-jp="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g;
  let m;
  while ((m = re.exec(searchHtml)) !== null) {
    const slug = m[1];
    const jp = decodeEntities(m[2].trim());
    const name = decodeEntities(m[3].replace(/<[^>]*>/g, "").trim());
    candidates.push({ slug, name, jp });
  }
  if (!candidates.length) {
    const reFallback = /<a\s+href="https:\/\/anikototv\.to\/watch\/([^"/]+)(?:\/ep-\d+)?"[^>]*>([\s\S]*?)<\/a>/g;
    while ((m = reFallback.exec(searchHtml)) !== null) {
      candidates.push({ slug: m[1], name: m[1], jp: "" });
    }
  }
  const seen = /* @__PURE__ */ new Set();
  return candidates.filter((c) => {
    if (seen.has(c.slug)) return false;
    seen.add(c.slug);
    return true;
  });
}
__name(searchAnikoto, "searchAnikoto");
function parseEpisodeRows(html2) {
  const rows = [];
  const re = /<a\s+[^>]*data-id="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g;
  for (const match of html2.matchAll(re)) {
    const tag = match[0];
    const getAttr = /* @__PURE__ */ __name((name) => tag.match(new RegExp(`data-${name}="([^"]*)"`))?.[1] ?? "", "getAttr");
    const number = Number.parseInt(getAttr("num"), 10);
    if (!Number.isInteger(number)) continue;
    const title2 = decodeEntities(match[2].match(/<span\s+class="d-title"[^>]*>([\s\S]*?)<\/span>/i)?.[1]?.replace(/<[^>]*>/g, "").trim() ?? "");
    rows.push({
      number,
      ids: getAttr("ids"),
      hasSub: getAttr("sub") === "1",
      hasDub: getAttr("dub") === "1",
      malId: Number.parseInt(getAttr("mal"), 10) || null,
      slug: getAttr("slug"),
      timestamp: getAttr("timestamp"),
      title: title2 || `Episode ${number}`
    });
  }
  return rows;
}
__name(parseEpisodeRows, "parseEpisodeRows");
async function inspectAnikotoCandidate(candidate) {
  const watchHtml = await httpGet(`${ANIKOTO}/watch/${candidate.slug}`, { Referer: `${ANIKOTO}/` });
  const showId = watchHtml.match(/data-id="(\d+)"/)?.[1];
  if (!showId) return null;
  const listJson = await getJSON(`${ANIKOTO}/ajax/episode/list/${showId}`, {
    "X-Requested-With": "XMLHttpRequest",
    Referer: `${ANIKOTO}/watch/${candidate.slug}`
  });
  const episodes = parseEpisodeRows(listJson.result || "");
  return episodes.length ? { ...candidate, showId, episodes } : null;
}
__name(inspectAnikotoCandidate, "inspectAnikotoCandidate");
async function findAnikotoShow(media, anizip) {
  const mappings = anizip ?? await getJSON(`${ANIZIP3}?anilist_id=${media.id}`).catch(() => null);
  const titles = [...new Set(buildTitles(media, mappings).filter(Boolean))];
  const keywords = buildTitleSearchQueries(titles, 18);
  const allCandidatesMap = /* @__PURE__ */ new Map();
  for (let index = 0; index < keywords.length; index += 4) {
    const results = await Promise.all(keywords.slice(index, index + 4).map((keyword) => searchAnikoto(keyword).catch(() => [])));
    for (const list of results) for (const candidate of list) allCandidatesMap.set(candidate.slug, candidate);
  }
  const candidates = [...allCandidatesMap.values()].map((candidate) => {
    const titleScore3 = titleIdentityScore(titles, [candidate.name, candidate.jp, candidate.slug.replace(/-/g, " ")]);
    return { ...candidate, titleScore: titleScore3, legacyScore: scoreCandidate(candidate, media.title?.english, media.title?.romaji, media.synonyms || []) };
  }).filter((candidate) => candidate.titleScore >= 0.28).sort((left, right) => right.titleScore - left.titleScore || right.legacyScore - left.legacyScore).slice(0, 12);
  if (!candidates.length) throw new Error(`No confident Anikoto title candidates for AniList ${media.id}`);
  const inspected = [];
  for (let index = 0; index < candidates.length; index += 4) {
    const batch = await Promise.allSettled(candidates.slice(index, index + 4).map(inspectAnikotoCandidate));
    for (const result of batch) if (result.status === "fulfilled" && result.value) inspected.push(result.value);
  }
  const expectedMal = Number(media.idMal) || null;
  if (expectedMal) {
    const exact = inspected.filter((candidate) => candidate.episodes.some((episode) => episode.malId === expectedMal));
    if (exact.length) {
      const expectedEpisodes = Number(media.episodes) > 0 ? Number(media.episodes) : null;
      const getMatchMetrics = /* @__PURE__ */ __name((candidate) => {
        const rows = candidate.episodes.filter((episode) => episode.malId === expectedMal);
        const numbers2 = new Set(rows.map((episode) => episode.number));
        const expectedRange = expectedEpisodes ? new Set(rows.map((episode) => episode.number).filter((number) => number >= 1 && number <= expectedEpisodes)).size : 0;
        return {
          completeRange: expectedEpisodes !== null && expectedRange === expectedEpisodes,
          exactCount: expectedEpisodes !== null && numbers2.size === expectedEpisodes,
          expectedRange,
          excess: expectedEpisodes === null ? 0 : Math.max(0, numbers2.size - expectedEpisodes)
        };
      }, "getMatchMetrics");
      exact.sort((left, right) => {
        const leftMetrics = getMatchMetrics(left);
        const rightMetrics = getMatchMetrics(right);
        return Number(rightMetrics.completeRange) - Number(leftMetrics.completeRange) || Number(rightMetrics.exactCount) - Number(leftMetrics.exactCount) || rightMetrics.expectedRange - leftMetrics.expectedRange || leftMetrics.excess - rightMetrics.excess || right.titleScore - left.titleScore;
      });
      const chosen2 = exact[0];
      const episodes = chosen2.episodes.filter((episode) => episode.malId === expectedMal);
      const numbers = new Set(episodes.map((episode) => episode.number));
      for (const candidate of exact.slice(1)) {
        const rows = candidate.episodes.filter((episode) => episode.malId === expectedMal);
        if (!rows.length || rows.some((episode) => numbers.has(episode.number))) continue;
        for (const episode of rows) {
          numbers.add(episode.number);
          episodes.push(episode);
        }
      }
      episodes.sort((left, right) => left.number - right.number);
      if (expectedEpisodes && episodes.length > expectedEpisodes) {
        const expectedRange = /* @__PURE__ */ new Map();
        for (const episode of episodes) {
          if (episode.number >= 1 && episode.number <= expectedEpisodes && !expectedRange.has(episode.number)) {
            expectedRange.set(episode.number, episode);
          }
        }
        if (expectedRange.size === expectedEpisodes) {
          episodes.splice(0, episodes.length, ...[...expectedRange.values()].sort((left, right) => left.number - right.number));
        }
      }
      return { ...chosen2, title: chosen2.name, episodes, malId: expectedMal };
    }
  }
  const viable = inspected.filter((candidate) => {
    const hasProviderMal = candidate.episodes.some((episode) => episode.malId);
    return candidate.titleScore >= 0.72 && (!expectedMal || !hasProviderMal);
  }).sort((left, right) => right.titleScore - left.titleScore || right.legacyScore - left.legacyScore);
  const chosen = viable[0];
  const runnerUp = viable[1];
  if (!chosen || runnerUp && chosen.titleScore - runnerUp.titleScore < 0.08) {
    throw new Error(`No confident Anikoto identity match for AniList ${media.id}`);
  }
  return { ...chosen, title: chosen.name, malId: expectedMal };
}
__name(findAnikotoShow, "findAnikotoShow");
function mapTrack(t, source) {
  const label = t.label ?? "";
  const langKey = label.toLowerCase().split(" ")[0];
  return {
    url: t.file,
    label: label || "English",
    srclang: LANG_MAP[langKey] ?? "en",
    default: t.default ?? false,
    source
  };
}
__name(mapTrack, "mapTrack");
function streamRank(stream) {
  if (stream.type === "hls" && stream.variant === "modern") return 0;
  if (stream.type === "hls") return 1;
  return 2;
}
__name(streamRank, "streamRank");
function subtitleTypeFromServerType(typeName) {
  if (typeName === "hsub") return "hardsub";
  if (typeName === "sub") return "softsub";
  return null;
}
__name(subtitleTypeFromServerType, "subtitleTypeFromServerType");
async function extractEmbedSource(embedUrl) {
  try {
    return await extractMegaPlayDetails(embedUrl, { userAgent: UA6, referer: SPOOF_REF });
  } catch (e) {
    return null;
  }
}
__name(extractEmbedSource, "extractEmbedSource");
async function getEpisodes(anilistId, ctx = {}) {
  const media = ctx.media || await getMedia(anilistId);
  if (!media) throw new Error(`Could not resolve media for AniList ID: ${anilistId}`);
  const anizipRes = ctx.anizip ?? await getJSON(`${ANIZIP3}?anilist_id=${anilistId}`).catch(() => null);
  const show = await findAnikotoShow(media, anizipRes);
  const sub = [];
  const dub = [];
  for (const row of show.episodes) {
    const num = row.number;
    const azEp = anizipRes?.episodes?.[String(num)] ?? {};
    const img = azEp.image || null;
    const desc = azEp.overview || azEp.summary || null;
    const airDate = azEp.airDate || azEp.airdate || null;
    const base = {
      number: num,
      title: row.title,
      duration: null,
      filler: false,
      uncensored: false,
      description: desc,
      image: img,
      airDate
    };
    if (row.hasSub) {
      sub.push({
        id: `watch/anikoto/${anilistId}/sub/anikoto-${num}`,
        ...base,
        audio: "sub"
      });
    }
    if (row.hasDub) {
      dub.push({
        id: `watch/anikoto/${anilistId}/dub/anikoto-${num}`,
        ...base,
        audio: "dub"
      });
    }
  }
  sub.sort((a, b) => a.number - b.number);
  dub.sort((a, b) => a.number - b.number);
  return {
    meta: {
      title: show.title,
      slug: show.slug,
      malId: show.malId,
      source: "anikoto"
    },
    episodes: { sub, dub }
  };
}
__name(getEpisodes, "getEpisodes");
async function handleWatch2(anilistId, audio, epNum, ctx = {}) {
  if (audio !== "sub" && audio !== "dub") {
    return jsonResponse({ error: "audio must be sub or dub" }, 400);
  }
  const media = ctx.media || await getMedia(anilistId);
  if (!media) {
    return jsonResponse({ error: `Could not resolve media for AniList ID: ${anilistId}` }, 400);
  }
  const show = await findAnikotoShow(media, ctx.anizip);
  const targetEp = show.episodes.find((episode) => episode.number === Number(epNum) && episode[audio === "sub" ? "hasSub" : "hasDub"]);
  if (!targetEp?.ids) {
    return jsonResponse({ error: `Episode ${epNum} not found for show: ${show.title}` }, 404);
  }
  const malIdNum = targetEp.malId || media.idMal || null;
  const [serverDataRes, mapperRes] = await Promise.allSettled([
    getJSON(`${ANIKOTO}/ajax/server/list?servers=${encodeURIComponent(targetEp.ids)}`, {
      "X-Requested-With": "XMLHttpRequest",
      Referer: `${ANIKOTO}/`
    }),
    targetEp.malId && targetEp.slug && targetEp.timestamp ? getJSON(`${MAPPER}/${targetEp.malId}/${targetEp.slug}/${targetEp.timestamp}`, { Referer: `${ANIKOTO}/` }) : Promise.resolve(null)
  ]);
  const serverData = serverDataRes.status === "fulfilled" ? serverDataRes.value : null;
  const mapperData = mapperRes.status === "fulfilled" ? mapperRes.value : null;
  const serverHtml = serverData?.result || "";
  const serverItems = [];
  const downloadItems = [];
  const typeRe = /<div class="type" data-type="([^"]+)">([\s\S]*?)<\/ul>\s*<\/div>/g;
  let typeM;
  while ((typeM = typeRe.exec(serverHtml)) !== null) {
    const typeName = typeM[1];
    for (const li of typeM[2].matchAll(/<li\s+([^>]*data-link-id[^>]*)>([\s\S]*?)<\/li>/g)) {
      const linkId = li[1].match(/data-link-id="([^"]+)"/)?.[1];
      const name = li[2].replace(/<[^>]+>/g, "").trim();
      if (!linkId) continue;
      if (typeName === "dl" || name.toLowerCase().includes("download") || name.toLowerCase().includes("kiwi")) {
        downloadItems.push({ linkId, name });
      } else if (typeName === audio || audio === "sub" && typeName === "hsub") {
        serverItems.push({ linkId, name, serverType: typeName, subtitleType: subtitleTypeFromServerType(typeName) });
      }
    }
  }
  if (mapperData) {
    for (const [sKey, sObj] of Object.entries(mapperData)) {
      if (sKey === "status") continue;
      const cleanName = sKey.replace(/[-_]+$/, "").trim();
      if (sObj?.[audio]?.url) {
        serverItems.push({
          linkId: sObj[audio].url,
          name: cleanName,
          serverType: audio,
          subtitleType: subtitleTypeFromServerType(audio)
        });
      }
      if (sObj?.[audio]?.download) {
        for (const [dLabel, dUrl] of Object.entries(sObj[audio].download)) {
          if (dUrl && typeof dUrl === "string") {
            downloadItems.push({ url: dUrl, name: cleanName });
          }
        }
      }
    }
  }
  const streams = [];
  const subtitles = [];
  const downloads = [];
  const serverSeen = /* @__PURE__ */ new Set();
  const subSeen = /* @__PURE__ */ new Set();
  const dlSeen = /* @__PURE__ */ new Set();
  for (const item of serverItems) {
    const serverKey = `${item.name}:${item.subtitleType || item.serverType || audio}`;
    if (serverSeen.has(serverKey)) continue;
    serverSeen.add(serverKey);
    const resolved2 = item.linkId.startsWith("http") ? { result: { url: item.linkId } } : await getJSON(`${ANIKOTO}/ajax/server?get=${encodeURIComponent(item.linkId)}`, {
      "X-Requested-With": "XMLHttpRequest",
      Referer: `${ANIKOTO}/`
    }).catch(() => null);
    const embedUrl = resolved2?.result?.url;
    if (!embedUrl) continue;
    let serverIntro = { start: 0, end: 0 };
    let serverOutro = { start: 0, end: 0 };
    if (resolved2?.result?.skip_data?.intro?.length === 2) {
      const [s, e] = resolved2.result.skip_data.intro;
      if (s || e) serverIntro = { start: Number(s) || 0, end: Number(e) || 0 };
    }
    if (resolved2?.result?.skip_data?.outro?.length === 2) {
      const [s, e] = resolved2.result.skip_data.outro;
      if (s || e) serverOutro = { start: Number(s) || 0, end: Number(e) || 0 };
    }
    const hlsSources = [];
    if (embedUrl.includes("#aHR0c")) {
      const b64 = embedUrl.split("#")[1];
      try {
        const decodedUrl = atob(b64);
        if (decodedUrl.includes(".m3u8")) {
          hlsSources.push({ url: decodedUrl, variant: null });
        }
      } catch (e) {
      }
    }
    const extracted = await extractEmbedSource(embedUrl);
    const itemSubs = [];
    if (extracted?.sources?.length) {
      for (const source of extracted.sources) {
        if (!hlsSources.some((item2) => item2.url === source.url)) hlsSources.push(source);
      }
      for (const t of extracted.tracks ?? []) {
        const mapped = mapTrack(t, item.name);
        itemSubs.push(mapped);
        if (!subSeen.has(mapped.url)) {
          subSeen.add(mapped.url);
          subtitles.push(mapped);
        }
      }
      if (extracted.intro?.start || extracted.intro?.end) {
        serverIntro = { start: Number(extracted.intro.start) || 0, end: Number(extracted.intro.end) || 0 };
      }
      if (extracted.outro?.start || extracted.outro?.end) {
        serverOutro = { start: Number(extracted.outro.start) || 0, end: Number(extracted.outro.end) || 0 };
      }
    }
    if (hlsSources.length) {
      for (const source of hlsSources) {
        const streamObj = {
          url: source.url,
          type: "hls",
          server: item.name,
          embedUrl,
          referer: extracted?.origin ? `${extracted.origin}/` : `${new URL(embedUrl).origin}/`,
          subtitles: itemSubs,
          priority: streams.length ? 4 : 5,
          isActive: streams.length === 0
        };
        if (item.subtitleType) streamObj.subtitleType = item.subtitleType;
        if (source.variant) streamObj.variant = source.variant;
        if (serverIntro.start || serverIntro.end) streamObj.intro = serverIntro;
        if (serverOutro.start || serverOutro.end) streamObj.outro = serverOutro;
        streams.push(streamObj);
      }
      streams.push({
        url: embedUrl,
        type: "embed",
        server: item.name,
        referer: `${new URL(embedUrl).origin}/`,
        priority: 4,
        isActive: false
      });
      if (item.subtitleType) streams[streams.length - 1].subtitleType = item.subtitleType;
    } else {
      const streamObj = {
        url: embedUrl,
        type: "embed",
        server: item.name,
        referer: `${new URL(embedUrl).origin}/`,
        priority: 4,
        isActive: streams.length === 0
      };
      if (item.subtitleType) streamObj.subtitleType = item.subtitleType;
      if (serverIntro.start || serverIntro.end) streamObj.intro = serverIntro;
      if (serverOutro.start || serverOutro.end) streamObj.outro = serverOutro;
      streams.push(streamObj);
    }
  }
  for (const dl of downloadItems) {
    let dlUrl = dl.url;
    if (!dlUrl && dl.linkId) {
      const resolved2 = await getJSON(`${ANIKOTO}/ajax/server?get=${encodeURIComponent(dl.linkId)}`, {
        "X-Requested-With": "XMLHttpRequest",
        Referer: `${ANIKOTO}/`
      }).catch(() => null);
      dlUrl = resolved2?.result?.url;
    }
    if (dlUrl && !dlSeen.has(dlUrl)) {
      dlSeen.add(dlUrl);
      downloads.push({
        url: dlUrl,
        label: dl.name
      });
    }
  }
  streams.sort((left, right) => streamRank(left) - streamRank(right));
  streams.forEach((stream, index) => {
    stream.priority = index === 0 ? 5 : 4;
    stream.isActive = index === 0;
  });
  return jsonResponse({
    anilistId: parseInt(anilistId),
    malId: malIdNum,
    episode: epNum,
    audio,
    streams,
    subtitles,
    downloads,
    headers: {
      "User-Agent": UA6,
      "Referer": streams[0]?.referer || "https://anikototv.to/"
    }
  });
}
__name(handleWatch2, "handleWatch");
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
  });
}
__name(jsonResponse, "jsonResponse");
var anikoto_default = {
  async fetch(request3) {
    const url = new URL(request3.url);
    const path = url.pathname;
    if (request3.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
          "Access-Control-Allow-Headers": "*"
        }
      });
    }
    try {
      let m = path.match(/^\/watch\/anikoto\/(\d+)\/(sub|dub)\/anikoto-(\d+)\/?$/);
      if (m) return await handleWatch2(m[1], m[2], parseInt(m[3]));
      m = path.match(/^\/episodes\/anikoto\/(\d+)\/?$/);
      if (m) {
        const data = await getEpisodes(parseInt(m[1]));
        return jsonResponse(data);
      }
      return jsonResponse({ error: "Not found" }, 404);
    } catch (err) {
      return jsonResponse({ error: err.message, stack: err.stack }, 500);
    }
  }
};

// providers/animegg.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var BASE2 = "https://www.animegg.org";
async function search(query) {
  const html2 = await fetchHtml(`${BASE2}/search/?q=${encodeURIComponent(query)}`);
  const results = [];
  for (const m of html2.matchAll(/<a\b[^>]*class=["'][^"']*\bmse\b[^"']*["'][^>]*>[\s\S]*?<\/a>/gi)) {
    const tag = m[0].match(/<a\b[^>]*>/i)?.[0] ?? "";
    const href = attr(tag, "href");
    const slug = href.match(/^\/series\/([^/?#]+)/)?.[1];
    if (!slug) continue;
    const strong = m[0].match(/<strong[^>]*>([\s\S]*?)<\/strong>/i)?.[1];
    results.push({ slug, text: strong ? stripTags(strong) : slug.replace(/-/g, " ") });
  }
  return results;
}
__name(search, "search");
async function scrapeSeries(slug) {
  const html2 = await fetchHtml(`${BASE2}/series/${slug}`);
  const episodes = [];
  for (const m of html2.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)) {
    const block = m[1];
    if (!/\banm_det_pop\b/.test(block)) continue;
    const link3 = block.match(/<a\b[^>]*class=["'][^"']*anm_det_pop[^"']*["'][^>]*>/i)?.[0] ?? "";
    const href = attr(link3, "href").replace(/#.*$/, "").replace(/^\//, "");
    const strong = stripTags(block.match(/<strong[^>]*>([\s\S]*?)<\/strong>/i)?.[1] ?? "");
    const rangeMatch = strong.match(/(\d+)-(\d+)\s*$/);
    const numMatch = rangeMatch || strong.match(/(\d+)\s*$/);
    if (!numMatch || !href) continue;
    const number = parseInt(numMatch[1]);
    const title2 = stripTags(block.match(/<i\b[^>]*class=["'][^"']*anititle[^"']*["'][^>]*>([\s\S]*?)<\/i>/i)?.[1] ?? "") || strong;
    const audio = [];
    if (/\bbtn-subbed\b/.test(block)) audio.push("sub");
    if (/\bbtn-dubbed\b/.test(block)) audio.push("dub");
    episodes.push({ number, title: title2, epSlug: href, hasSub: audio.includes("sub"), hasDub: audio.includes("dub") });
  }
  episodes.sort((a, b) => a.number - b.number);
  const seen = /* @__PURE__ */ new Set();
  return episodes.filter((e) => seen.has(e.number) ? false : (seen.add(e.number), true));
}
__name(scrapeSeries, "scrapeSeries");
async function scrapeEmbed(embedId) {
  const html2 = await fetchHtml(`${BASE2}/embed/${embedId}`, { Referer: BASE2 });
  const m = html2.match(/var\s+videoSources\s*=\s*(\[[\s\S]*?\]);/);
  if (!m) return [];
  let parsed = [];
  try {
    const asJson = m[1].replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":').replace(/:\s*'([^']*)'/g, ': "$1"');
    parsed = JSON.parse(asJson);
  } catch {
    return [];
  }
  return parsed.map((s) => {
    let backup = null;
    if (s.bk) {
      try {
        backup = decodeURIComponent(atob(s.bk));
      } catch {
        backup = null;
      }
    }
    return {
      quality: s.label || "unknown",
      url: s.file ? s.file.startsWith("http") ? s.file : `${BASE2}${s.file}` : "",
      backup
    };
  }).filter((s) => s.url);
}
__name(scrapeEmbed, "scrapeEmbed");
async function scrapeEpisodeWatch(epSlug, audio) {
  const html2 = await fetchHtml(`${BASE2}/${epSlug}`, { Referer: BASE2 });
  const title2 = stripTags(html2.match(/<div\b[^>]*class=["'][^"']*info[^"']*["'][^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i)?.[1] ?? "");
  const tabs = [];
  for (const m of html2.matchAll(/<a\b[^>]*data-toggle=["']tab["'][^>]*>/gi)) {
    const tag = m[0];
    const embedId = attr(tag, "data-id");
    const server = attr(tag, "data-mirror") || "AnimeGG";
    const version2 = attr(tag, "data-version") || "subbed";
    if (!embedId) continue;
    const normalized = version2.startsWith("dub") ? "dub" : "sub";
    if (audio === "all" || normalized === audio) {
      tabs.push({ embedId, embedUrl: `${BASE2}/embed/${embedId}`, server, normalized });
    }
  }
  const results = await Promise.allSettled(tabs.map(async (tab, i) => {
    const sources = await scrapeEmbed(tab.embedId);
    const streams = sources.map((s, j) => ({
      url: s.url,
      type: s.url.includes(".m3u8") ? "hls" : "mp4",
      quality: s.quality,
      backup: s.backup,
      audio: tab.normalized,
      server: tab.server,
      embed: tab.embedUrl,
      referer: `${new URL(tab.embedUrl).origin}/`,
      priority: tabs.length - i,
      isActive: i === 0 && j === 0
    }));
    streams.push({
      url: tab.embedUrl,
      type: "embed",
      audio: tab.normalized,
      server: `${tab.server}-embed`,
      referer: `${new URL(tab.embedUrl).origin}/`,
      priority: 1,
      isActive: false
    });
    return streams;
  }));
  return { title: title2, streams: results.flatMap((r) => r.status === "fulfilled" ? r.value : []) };
}
__name(scrapeEpisodeWatch, "scrapeEpisodeWatch");
async function searchFn(query) {
  const r1 = await search(query);
  const compact = query.split(/\s+/)[0].replace(/[^a-zA-Z0-9]/g, "");
  if (compact.length >= 4 && compact.toLowerCase() !== query.toLowerCase()) {
    try {
      const r2 = await search(compact);
      const seen = new Set(r1.map((r) => r.slug));
      r2.forEach((r) => {
        if (!seen.has(r.slug)) r1.push(r);
      });
    } catch {
    }
  }
  return r1;
}
__name(searchFn, "searchFn");
async function resolveSeries2(anilistId, ctx = {}) {
  const cacheKey = `np:match2:animegg:${anilistId}`;
  const cached = get2(cacheKey);
  if (isFresh(cached)) return cached.data;
  const media = ctx.media ?? await getMedia(anilistId);
  const titles = buildTitles(media, ctx.anizip);
  const candidates = await findTopSlugs(titles, searchFn);
  const expected = expectedCount(media, ctx.anizip);
  const offset = await getPrequelOffset(anilistId).catch(() => 0);
  const isSingleMovie = String(media?.format ?? "").toUpperCase() === "MOVIE" || expected === 1;
  const selected = await selectSeries(candidates, scrapeSeries, expected, media?.status, offset, {
    minScore: isSingleMovie ? 0.9 : 0.65
  });
  if (!selected) throw new Error(`AnimeGG match not found for AniList ${anilistId}`);
  const data = { slug: selected.slug, title: selected.title, mode: selected.mode, offset, score: selected.score };
  set(cacheKey, data, SHOW_IDENTITY_TTL);
  return data;
}
__name(resolveSeries2, "resolveSeries");
function buildEpisodeLists(anilistId, series, providerEpisodes, ctx, expected) {
  const sub = [], dub = [];
  for (const src of providerEpisodes) {
    const number = series.mode === "offset" ? src.number - series.offset : src.number;
    if (number < 1) continue;
    if (expected && number > expected) continue;
    const meta = episodeMeta(number, ctx);
    const base = {
      number,
      title: meta.title ?? src.title ?? `Episode ${number}`,
      duration: meta.duration,
      filler: meta.filler,
      uncensored: meta.uncensored,
      description: meta.description,
      image: meta.image,
      airDate: meta.airDate,
      sourceNumber: src.number
    };
    if (src.hasSub) sub.push({ ...base, id: `watch/animegg/${anilistId}/sub/animegg-${number}`, audio: "sub" });
    if (src.hasDub) dub.push({ ...base, id: `watch/animegg/${anilistId}/dub/animegg-${number}`, audio: "dub" });
  }
  return { sub, dub };
}
__name(buildEpisodeLists, "buildEpisodeLists");
async function getEpisodes2(anilistId, ctx = {}) {
  const media = ctx.media ?? await getMedia(anilistId);
  const localCtx = { ...ctx, media };
  const series = await resolveSeries2(anilistId, localCtx);
  const episodes = await scrapeSeries(series.slug);
  const expected = expectedCount(media, ctx.anizip);
  return {
    meta: {
      id: series.slug,
      title: series.title,
      source: "animegg",
      matchScore: Number(series.score.toFixed(3)),
      numbering: series.mode,
      episodeOffset: series.mode === "offset" ? series.offset : 0
    },
    episodes: buildEpisodeLists(anilistId, series, episodes, localCtx, expected)
  };
}
__name(getEpisodes2, "getEpisodes");
async function handleWatch4(anilistId, audio, epNum, ctx = {}) {
  const series = await resolveSeries2(anilistId, ctx);
  const providerEp = series.mode === "offset" ? Number(epNum) + series.offset : Number(epNum);
  const episodes = await scrapeSeries(series.slug);
  const ep = episodes.find((e) => e.number === providerEp);
  if (!ep) return json({ error: `AnimeGG episode ${providerEp} not found` }, 404);
  const watch3 = await scrapeEpisodeWatch(ep.epSlug, audio);
  return json({ anilistId: Number(anilistId), episode: Number(epNum), providerEpisode: providerEp, audio, title: watch3.title, streams: watch3.streams });
}
__name(handleWatch4, "handleWatch");
var animegg_default = {
  async fetch(request3) {
    const url = new URL(request3.url);
    if (request3.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,OPTIONS", "Access-Control-Allow-Headers": "*" } });
    }
    try {
      const m = url.pathname.match(/^\/watch\/animegg\/(\d+)\/(sub|dub)\/animegg-(\d+)\/?$/);
      if (m) return await handleWatch4(m[1], m[2], m[3]);
      return json({ error: "Not found" }, 404);
    } catch (err) {
      return json({ error: err.message, "Raw-ERROR": err.rawBody ?? null, stack: err.stack }, 500);
    }
  }
};

// providers/animenosub.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var BASE3 = "https://animenosub.to";
var UA7 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";
async function search2(query) {
  const res = await fetch(`${BASE3}/wp-admin/admin-ajax.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
      Origin: BASE3,
      Referer: `${BASE3}/`
    },
    body: `action=ts_ac_do_search&ts_ac_query=${encodeURIComponent(query)}`
  });
  if (!res.ok) throw new Error(`animenosub search HTTP ${res.status}`);
  const data = await res.json();
  const results = [];
  for (const item of data?.anime?.[0]?.all ?? []) {
    const slug = item.post_link?.match(/\/anime\/([^/]+)\/?$/)?.[1];
    if (!slug) continue;
    results.push({ slug, text: item.post_title ?? slug.replace(/-/g, " ") });
  }
  return results;
}
__name(search2, "search");
async function scrapeSeries2(slug) {
  const html2 = await fetchHtml(`${BASE3}/anime/${slug}/`, { Referer: BASE3 });
  const isSlugDub = /-dub$/.test(slug) || /(?:^|[-\s])dub(?:$|[-\s])/i.test(slug);
  const episodes = [];
  const seen = /* @__PURE__ */ new Set();
  const listRe = /<li\b[^>]*data-index="\d+"[^>]*>[\s\S]*?<a\s+href="(https?:\/\/animenosub\.to\/[^"]+)"[\s\S]*?<div\s+class="epl-num">([^<]+)<\/div>/gi;
  for (const m of html2.matchAll(listRe)) {
    const epUrl = decodeEntities(m[1]);
    const label = m[2].trim();
    let number;
    if (/^movie$/i.test(label)) {
      number = 1;
    } else {
      const n = parseFloat(label);
      number = Number.isFinite(n) && n >= 1 ? Math.round(n) : null;
    }
    if (number === null || seen.has(number)) continue;
    seen.add(number);
    const isDub2 = isSlugDub || /-dub(?:$|\/)/.test(epUrl);
    episodes.push({ number, title: /^movie$/i.test(label) ? "Movie" : `Episode ${number}`, epUrl, hasSub: !isDub2, hasDub: isDub2 });
  }
  episodes.sort((a, b) => a.number - b.number);
  return episodes;
}
__name(scrapeSeries2, "scrapeSeries");
async function scrapeEmbeds(epUrl) {
  const html2 = await fetchHtml(epUrl, { Referer: `${BASE3}/` });
  const streams = [];
  for (const m of html2.matchAll(/<option\s+value="([A-Za-z0-9+/=]+)"\s+data-index="\d+"[^>]*>([^<]+)<\/option>/gi)) {
    const b64 = m[1];
    const serverName = m[2].trim();
    if (!serverName || /select video server/i.test(serverName)) continue;
    let embedUrl = null;
    try {
      const decoded = atob(b64);
      embedUrl = decoded.match(/src=["']([^"']+)["']/i)?.[1] ?? null;
    } catch {
      continue;
    }
    if (!embedUrl) continue;
    const embedOrigin = (() => {
      try {
        const u = new URL(embedUrl.startsWith("//") ? `https:${embedUrl}` : embedUrl);
        return `${u.protocol}//${u.host}/`;
      } catch {
        return epUrl;
      }
    })();
    streams.push({
      url: embedUrl,
      type: "embed",
      server: serverName,
      referer: embedOrigin,
      priority: streams.length === 0 ? 2 : 1,
      isActive: streams.length === 0
    });
  }
  if (streams.length === 0) {
    for (const m of html2.matchAll(/<iframe[^>]+src=["']([^"']+)["'][^>]*>/gi)) {
      const src = m[1];
      if (/vidmoly|vtbe|streamtape|dood|filemoon|upn\.one|bysesa/i.test(src)) {
        const embedOrigin = (() => {
          try {
            const u = new URL(src.startsWith("//") ? `https:${src}` : src);
            return `${u.protocol}//${u.host}/`;
          } catch {
            return epUrl;
          }
        })();
        streams.push({ url: src, type: "embed", server: "Direct", referer: embedOrigin, priority: 2, isActive: true });
        break;
      }
    }
  }
  return streams;
}
__name(scrapeEmbeds, "scrapeEmbeds");
async function resolveSeries3(anilistId, ctx = {}) {
  const cacheKey = `np:match2:animenosub:${anilistId}`;
  const cached = get2(cacheKey);
  if (isFresh(cached)) return cached.data;
  const media = ctx.media ?? await getMedia(anilistId);
  const titles = buildTitles(media, ctx.anizip);
  const candidates = await findTopSlugs(titles, search2);
  const expected = expectedCount(media, ctx.anizip);
  const offset = await getPrequelOffset(anilistId).catch(() => 0);
  const selected = await selectSeries(candidates, scrapeSeries2, expected, media?.status, offset);
  if (!selected) throw new Error(`animenosub match not found for AniList ${anilistId}`);
  const data = { slug: selected.slug, title: selected.title, mode: selected.mode, offset, score: selected.score };
  set(cacheKey, data, SHOW_IDENTITY_TTL);
  return data;
}
__name(resolveSeries3, "resolveSeries");
function buildEpisodeLists2(anilistId, series, providerEpisodes, ctx, expected) {
  const sub = [], dub = [];
  for (const src of providerEpisodes) {
    const number = series.mode === "offset" ? src.number - series.offset : src.number;
    if (number < 1) continue;
    if (expected && number > expected) continue;
    const meta = episodeMeta(number, ctx);
    const base = {
      number,
      title: meta.title ?? src.title ?? `Episode ${number}`,
      duration: meta.duration,
      filler: meta.filler,
      uncensored: meta.uncensored,
      description: meta.description,
      image: meta.image,
      airDate: meta.airDate,
      sourceNumber: src.number
    };
    if (src.hasSub) sub.push({ ...base, id: `watch/animenosub/${anilistId}/sub/animenosub-${number}`, audio: "sub" });
    if (src.hasDub) dub.push({ ...base, id: `watch/animenosub/${anilistId}/dub/animenosub-${number}`, audio: "dub" });
  }
  return { sub, dub };
}
__name(buildEpisodeLists2, "buildEpisodeLists");
async function getEpisodes4(anilistId, ctx = {}) {
  const media = ctx.media ?? await getMedia(anilistId);
  const localCtx = { ...ctx, media };
  const series = await resolveSeries3(anilistId, localCtx);
  const episodes = await scrapeSeries2(series.slug);
  const expected = expectedCount(media, ctx.anizip);
  return {
    meta: {
      id: series.slug,
      title: series.title,
      source: "animenosub",
      matchScore: Number(series.score.toFixed(3)),
      numbering: series.mode,
      episodeOffset: series.mode === "offset" ? series.offset : 0
    },
    episodes: buildEpisodeLists2(anilistId, series, episodes, localCtx, expected)
  };
}
__name(getEpisodes4, "getEpisodes");
async function withRetry(fn, attempts = 2) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (_) {
      if (i === attempts - 1) return null;
    }
  }
  return null;
}
__name(withRetry, "withRetry");
async function handleWatch5(anilistId, audio, epNum, ctx = {}) {
  const series = await resolveSeries3(anilistId, ctx);
  const providerEp = series.mode === "offset" ? Number(epNum) + series.offset : Number(epNum);
  const episodes = await scrapeSeries2(series.slug);
  const ep = episodes.find((e) => e.number === providerEp && (audio === "dub" ? e.hasDub : e.hasSub)) ?? episodes.find((e) => e.number === providerEp);
  if (!ep) throw new Error(`animenosub episode ${providerEp} not found`);
  const embeds = await scrapeEmbeds(ep.epUrl);
  const resolvable = embeds.map((stream) => ({ stream, extractor: findVideoExtractor(stream.url) })).filter((item) => item.extractor);
  const resolvedList = await Promise.all(resolvable.map(({ stream, extractor }) => withRetry(() => extractor.extract(stream.url, { userAgent: UA7, referer: `${BASE3}/` }))));
  const resolvedMap = new Map(resolvable.map(({ stream, extractor }, index) => [stream.url, { extractor, urls: resolvedList[index] }]));
  const streams = [];
  for (const stream of embeds) {
    const resolved2 = resolvedMap.get(stream.url);
    if (resolved2?.urls) {
      const referer = resolved2.extractor.name === "vidmoly" ? "https://vidmoly.biz/" : resolved2.extractor.name === "nova" ? "https://nova.upn.one/" : "https://bysesayeveum.com/";
      for (const resolvedSource of resolved2.urls) {
        const source = typeof resolvedSource === "string" ? { url: resolvedSource, type: "hls" } : resolvedSource;
        streams.push({
          url: source.url,
          type: source.type,
          server: stream.server,
          referer,
          priority: stream.priority,
          isActive: stream.isActive
        });
      }
    }
    streams.push(stream);
  }
  return json({ anilistId: Number(anilistId), episode: Number(epNum), providerEpisode: providerEp, audio, streams });
}
__name(handleWatch5, "handleWatch");
var animenosub_default = {
  async fetch(request3) {
    const url = new URL(request3.url);
    if (request3.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,OPTIONS", "Access-Control-Allow-Headers": "*" } });
    }
    try {
      const m = url.pathname.match(/^\/watch\/animenosub\/(\d+)\/(sub|dub)\/animenosub-(\d+)\/?$/);
      if (m) return await handleWatch5(m[1], m[2], m[3]);
      return json({ error: "Not found" }, 404);
    } catch (err) {
      return json({ error: err.message, "Raw-ERROR": err.rawBody ?? null, stack: err.stack }, 500);
    }
  }
};

// providers/anizone.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var BASE4 = "https://anizone.to";
var UA8 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36";
function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
__name(escapeRegex, "escapeRegex");
function normalizeUrl(value) {
  return String(value || "").replace(/\\+\//g, "/");
}
__name(normalizeUrl, "normalizeUrl");
function decodeJsonArgument(raw) {
  if (!raw) return null;
  const marker = "U";
  let value = String(raw).replace(/\\\\u([0-9a-fA-F]{4})/g, `${marker}$1`);
  value = value.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  value = value.replace(/\x01U\x01([0-9a-fA-F]{4})/g, "\\u$1");
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
__name(decodeJsonArgument, "decodeJsonArgument");
function jsonArgument(html2, name) {
  const pattern = new RegExp(`${escapeRegex(name)}\\s*:\\s*JSON\\.parse\\('((?:[^'\\\\]|\\\\.)*)'\\)`, "i");
  return decodeJsonArgument(String(html2).match(pattern)?.[1]);
}
__name(jsonArgument, "jsonArgument");
function playerData(html2) {
  const match = String(html2).match(/vidstackPlayer\s*\(\s*JSON\.parse\('((?:[^'\\]|\\.)*)'\)\s*\)/i);
  return decodeJsonArgument(match?.[1]);
}
__name(playerData, "playerData");
function responseCookies(response) {
  if (typeof response.headers.getSetCookie === "function") return response.headers.getSetCookie();
  const value = response.headers.get("set-cookie");
  return value ? [value] : [];
}
__name(responseCookies, "responseCookies");
function mergeCookies(jar, values) {
  for (const value of values) {
    const match = String(value).match(/^\s*([^=;\s]+)=([^;]*)/);
    if (match) jar.set(match[1], match[2]);
  }
  return jar;
}
__name(mergeCookies, "mergeCookies");
function cookieHeader2(jar) {
  return [...jar].map(([name, value]) => `${name}=${value}`).join("; ");
}
__name(cookieHeader2, "cookieHeader");
async function request2(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "User-Agent": UA8,
      "Accept-Language": "en-US,en;q=0.9",
      ...options.headers
    }
  });
  const raw = await response.text();
  if (!response.ok) {
    const error3 = new Error(`AniZone HTTP ${response.status}: ${url}`);
    error3.rawBody = raw;
    throw error3;
  }
  return { raw, cookies: responseCookies(response) };
}
__name(request2, "request");
async function fetchPage(path) {
  return request2(`${BASE4}${path}`, {
    headers: {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Referer": `${BASE4}/`
    }
  });
}
__name(fetchPage, "fetchPage");
function pickTitle(titles) {
  return titles?.["1"] || titles?.["5"] || titles?.["8"] || Object.values(titles || {})[0] || "";
}
__name(pickTitle, "pickTitle");
function titleValues(item) {
  return [...new Set([item?.main_title, ...Object.values(item?.title_list || {})].filter(Boolean))];
}
__name(titleValues, "titleValues");
function formatName(value) {
  const type = String(value || "").toLowerCase();
  if (type.includes("special")) return "special";
  if (type.includes("movie")) return "movie";
  if (type.includes("ova")) return "ova";
  if (type.includes("web") || type.includes("ona")) return "ona";
  if (type.includes("tv")) return "tv";
  return "";
}
__name(formatName, "formatName");
function expectedFormat(value) {
  const format = String(value || "").toUpperCase();
  if (format === "TV" || format === "TV_SHORT") return "tv";
  if (format === "MOVIE") return "movie";
  if (format === "OVA") return "ova";
  if (format === "ONA") return "ona";
  if (format === "SPECIAL") return "special";
  return "";
}
__name(expectedFormat, "expectedFormat");
function searchQueries(titles) {
  return buildTitleSearchQueries(titles, 18);
}
__name(searchQueries, "searchQueries");
function parseSearchItems(html2) {
  const items = jsonArgument(html2, "items");
  if (!Array.isArray(items)) return [];
  return items.filter((item) => /^[a-z0-9-]+$/i.test(String(item?.slug || ""))).map((item) => ({
    slug: String(item.slug),
    title: pickTitle(item.title_list) || item.main_title || "",
    titles: titleValues(item),
    type: formatName(item.type),
    year: Number(item.start_year) || null,
    episodeCount: Number(item.episode_count) || 0
  })).filter((item) => item.title);
}
__name(parseSearchItems, "parseSearchItems");
async function search3(query) {
  const { raw } = await fetchPage(`/anime?search=${encodeURIComponent(query)}`);
  return parseSearchItems(raw);
}
__name(search3, "search");
function candidateTitleScore(titles, candidate) {
  return titleIdentityScore(titles, [...candidate.titles, candidate.slug.replace(/-/g, " ")]);
}
__name(candidateTitleScore, "candidateTitleScore");
function coverageScore(candidate, expected, status) {
  if (!expected || expected < 1) return 0.5;
  if (candidate.episodeCount < 1) return 0;
  if (status !== "FINISHED") return 1;
  if (expected < 6) return 1;
  const needed = Math.ceil(expected * 0.8);
  return Math.min(1, candidate.episodeCount / needed);
}
__name(coverageScore, "coverageScore");
function validateCandidate(candidate, media, titles, expected) {
  const titleScore3 = candidateTitleScore(titles, candidate);
  const format = expectedFormat(media?.format);
  const year = Number(media?.startDate?.year ?? media?.seasonYear ?? 0) || null;
  const primaryTitles = [media?.title?.english, media?.title?.romaji, media?.title?.native].filter(Boolean);
  const partOrdinal = Math.max(0, ...primaryTitles.map(ordinal));
  const partMapping = expected === 1 && format === "special" && candidate.type === "special" && year && candidate.year === year && partOrdinal >= 2 && candidate.episodeCount === partOrdinal && titleScore3 >= 0.65;
  if (titleScore3 < 0.68 && !partMapping) return null;
  if (format && candidate.type && format !== candidate.type) return null;
  if (year && candidate.year && year !== candidate.year) return null;
  const coverage = coverageScore(candidate, expected, media?.status);
  if (expected >= 6 && coverage < 0.8) return null;
  const score = titleScore3 * 0.72 + (format && candidate.type === format ? 0.14 : 0.07) + (year && candidate.year === year ? 0.1 : 0.04) + coverage * 0.04;
  const exactEpisodeCount = expected > 0 && candidate.episodeCount === expected;
  return { ...candidate, titleScore: titleScore3, coverage, score, exactEpisodeCount, partOrdinal: partMapping ? partOrdinal : 0 };
}
__name(validateCandidate, "validateCandidate");
async function resolveSeries4(anilistId, ctx = {}) {
  const cacheKey = `np:match2:anizone:${anilistId}`;
  const cached = get2(cacheKey);
  if (isFresh(cached)) return cached.data;
  const media = ctx.media ?? await getMedia(anilistId);
  const titles = buildTitles(media, ctx.anizip);
  const expected = expectedCount(media, ctx.anizip);
  const discovered = /* @__PURE__ */ new Map();
  await Promise.all(searchQueries(titles).map(async (query) => {
    try {
      for (const candidate of await search3(query)) if (!discovered.has(candidate.slug)) discovered.set(candidate.slug, candidate);
    } catch {
    }
  }));
  const valid = [...discovered.values()].map((candidate) => validateCandidate(candidate, media, titles, expected)).filter(Boolean).sort((left, right) => right.score - left.score || Number(right.exactEpisodeCount) - Number(left.exactEpisodeCount));
  const selected = valid[0];
  const runnerUp = valid[1];
  const exactCountResolvesTie = selected?.exactEpisodeCount && runnerUp && !runnerUp.exactEpisodeCount && selected.titleScore >= runnerUp.titleScore - 0.02;
  if (!selected || selected.score < 0.82 && !selected.partOrdinal || runnerUp && selected.score - runnerUp.score < 0.08 && !exactCountResolvesTie) {
    throw new Error(`AniZone match not confident for AniList ${anilistId}`);
  }
  const data = {
    slug: selected.slug,
    title: selected.title,
    matchScore: selected.titleScore,
    score: selected.score,
    type: selected.type,
    year: selected.year,
    episodeCount: selected.episodeCount,
    partOrdinal: selected.partOrdinal
  };
  set(cacheKey, data, SHOW_IDENTITY_TTL);
  return data;
}
__name(resolveSeries4, "resolveSeries");
function snapshot(html2) {
  const match = [...String(html2).matchAll(/wire:snapshot="([^"]*)"/gi)].find((item) => item[1].includes("pages.anime-detail"));
  return match ? decodeEntities(match[1]) : "";
}
__name(snapshot, "snapshot");
function cursor(html2) {
  return String(html2).match(/nextCursor:\s*'([^']+)'/i)?.[1] || null;
}
__name(cursor, "cursor");
function hasMore(html2) {
  return /hasMore:\s*true/i.test(String(html2));
}
__name(hasMore, "hasMore");
function csrf(html2) {
  return String(html2).match(/csrf-token"\s+content="([^"]+)"/i)?.[1] || "";
}
__name(csrf, "csrf");
function seconds(value) {
  const parts = String(value || "").match(/^(\d+):(\d{1,2})$/);
  if (!parts) return null;
  return Number(parts[1]) * 60 + Number(parts[2]);
}
__name(seconds, "seconds");
function episodeNumber(item) {
  const direct = Number(item?.slug);
  if (Number.isFinite(direct) && direct > 0) return direct;
  const fromUrl = normalizeUrl(item?.url).match(/\/(\d+)\/?$/)?.[1];
  const number = Number(fromUrl);
  return Number.isFinite(number) && number > 0 ? number : null;
}
__name(episodeNumber, "episodeNumber");
function parseEpisodes(items) {
  const seen = /* @__PURE__ */ new Set();
  return items.map((item) => {
    const number = episodeNumber(item);
    if (!number || seen.has(number)) return null;
    seen.add(number);
    return {
      number,
      sourceNumber: number,
      title: pickTitle(item.title_list) || `Episode ${number}`,
      duration: seconds(item.duration),
      description: item.summary || null,
      image: normalizeUrl(item.snapshot) || null,
      airDate: item.air_date || null,
      hasSub: Number(item.videos_count) > 0,
      hasDub: false
    };
  }).filter(Boolean).sort((left, right) => left.number - right.number);
}
__name(parseEpisodes, "parseEpisodes");
function initialPage(html2, cookies) {
  const items = jsonArgument(html2, "items");
  const data = {
    items: Array.isArray(items) ? items : [],
    snapshot: snapshot(html2),
    cursor: cursor(html2),
    hasMore: hasMore(html2),
    csrf: csrf(html2),
    cookies: mergeCookies(/* @__PURE__ */ new Map(), cookies)
  };
  if (!data.items.length || !data.snapshot || !data.csrf) {
    const error3 = new Error("AniZone page payload not found");
    error3.rawBody = html2;
    throw error3;
  }
  return data;
}
__name(initialPage, "initialPage");
async function loadPage(state, slug) {
  const response = await request2(`${BASE4}/livewire/update`, {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "X-Livewire": "",
      "X-CSRF-TOKEN": state.csrf,
      "X-Requested-With": "XMLHttpRequest",
      "Origin": BASE4,
      "Referer": `${BASE4}/anime/${slug}`,
      "Cookie": cookieHeader2(state.cookies)
    },
    body: JSON.stringify({
      components: [{
        snapshot: state.snapshot,
        updates: {},
        calls: [{ path: "", method: "loadPage", params: [state.cursor] }]
      }]
    })
  });
  let payload;
  try {
    payload = JSON.parse(response.raw);
  } catch {
    const error3 = new Error("AniZone returned invalid Livewire JSON");
    error3.rawBody = response.raw;
    throw error3;
  }
  const component = payload?.components?.[0];
  const dispatch = component?.effects?.dispatches?.find((item) => item?.name === "items-loaded");
  if (!component?.snapshot || !dispatch?.params || !Array.isArray(dispatch.params.items)) {
    const error3 = new Error("AniZone page continuation payload not found");
    error3.rawBody = response.raw;
    throw error3;
  }
  return {
    items: dispatch.params.items,
    snapshot: component.snapshot,
    cursor: dispatch.params.nextCursor || null,
    hasMore: Boolean(dispatch.params.hasMore),
    csrf: state.csrf,
    cookies: mergeCookies(state.cookies, response.cookies)
  };
}
__name(loadPage, "loadPage");
async function scrapeSeries3(slug, limit, maxPages) {
  const initial = await fetchPage(`/anime/${slug}`);
  let state = initialPage(initial.raw, initial.cookies);
  const items = [...state.items];
  let pages = 1;
  while (state.hasMore && state.cursor && items.length < limit && pages < maxPages) {
    state = await loadPage(state, slug);
    items.push(...state.items);
    pages++;
  }
  const episodes = parseEpisodes(items);
  if (!episodes.length) throw new Error(`AniZone has no episodes for ${slug}`);
  return episodes;
}
__name(scrapeSeries3, "scrapeSeries");
function chooseMode(episodes, expected, offset) {
  if (!expected || !offset) return "local";
  const local = episodes.filter((episode) => episode.number >= 1 && episode.number <= expected).length;
  const shifted = episodes.filter((episode) => episode.number > offset && episode.number <= offset + expected).length;
  return shifted > local ? "offset" : "local";
}
__name(chooseMode, "chooseMode");
function ordinal(value) {
  const match = String(value || "").toLowerCase().match(/\b(?:part|special|chapter)\s*(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\b/);
  if (!match) return 0;
  const words = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
  return Number(match[1]) || words[match[1]] || 0;
}
__name(ordinal, "ordinal");
function alignEpisodes(episodes, media, expected, series) {
  if (!expected || episodes.length <= expected) return episodes;
  const titles = [media?.title?.english, media?.title?.romaji, media?.title?.native].filter(Boolean);
  const target = Math.max(0, ...titles.map(ordinal));
  if (target < 2) return episodes;
  let start = episodes.findIndex((episode) => ordinal(episode.title) === target);
  if (start < 0 && series?.partOrdinal === target && episodes.length === target) start = target - 1;
  if (start < 0 || episodes.length - start < expected) return episodes;
  return episodes.slice(start, start + expected).map((episode, index) => ({ ...episode, number: index + 1 }));
}
__name(alignEpisodes, "alignEpisodes");
function buildEpisodeLists3(anilistId, episodes, mode, offset, ctx, expected) {
  const sub = [];
  const dub = [];
  for (const source of episodes) {
    const number = mode === "offset" ? source.number - offset : source.number;
    if (number < 1 || expected && number > expected) continue;
    const meta = episodeMeta(number, ctx);
    const base = {
      number,
      title: meta.title ?? source.title ?? `Episode ${number}`,
      duration: meta.duration ?? source.duration,
      filler: meta.filler,
      uncensored: meta.uncensored,
      description: meta.description ?? source.description,
      image: meta.image ?? source.image,
      airDate: meta.airDate ?? source.airDate,
      sourceNumber: source.sourceNumber
    };
    if (source.hasSub) sub.push({ id: `watch/anizone/${anilistId}/sub/anizone-${number}`, ...base, audio: "sub" });
    if (source.hasDub) dub.push({ id: `watch/anizone/${anilistId}/dub/anizone-${number}`, ...base, audio: "dub" });
  }
  return { sub, dub };
}
__name(buildEpisodeLists3, "buildEpisodeLists");
async function seriesEpisodes(anilistId, ctx = {}) {
  const media = ctx.media ?? await getMedia(anilistId);
  const localCtx = { ...ctx, media };
  const [series, offset] = await Promise.all([
    resolveSeries4(anilistId, localCtx),
    getPrequelOffset(anilistId).catch(() => 0)
  ]);
  const expected = expectedCount(media, ctx.anizip);
  const limit = expected ? Math.max(expected, series.partOrdinal || 0) + offset : Infinity;
  const maxPages = Number.isFinite(ctx.maxPages) ? Math.max(1, ctx.maxPages) : Infinity;
  const rawEpisodes = await scrapeSeries3(series.slug, limit, maxPages);
  const mode = chooseMode(rawEpisodes, expected, offset);
  return {
    media,
    ctx: localCtx,
    series,
    offset,
    expected,
    mode,
    episodes: alignEpisodes(rawEpisodes, media, expected, series)
  };
}
__name(seriesEpisodes, "seriesEpisodes");
async function getEpisodes5(anilistId, ctx = {}) {
  const data = await seriesEpisodes(anilistId, ctx);
  return {
    meta: {
      id: data.series.slug,
      title: data.series.title,
      source: "anizone",
      matchScore: Number(data.series.matchScore.toFixed(3)),
      numbering: data.mode,
      episodeOffset: data.mode === "offset" ? data.offset : 0
    },
    episodes: buildEpisodeLists3(anilistId, data.episodes, data.mode, data.offset, data.ctx, data.expected)
  };
}
__name(getEpisodes5, "getEpisodes");
async function scrapeWatch(slug, episode) {
  const { raw } = await fetchPage(`/anime/${slug}/${episode}`);
  const player = playerData(raw);
  if (!player?.src) {
    const error3 = new Error(`AniZone player payload not found for episode ${episode}`);
    error3.rawBody = raw;
    throw error3;
  }
  return {
    hls: normalizeUrl(player.src),
    subtitles: (Array.isArray(player.subtitles) ? player.subtitles : []).filter((subtitle) => subtitle?.file).map((subtitle) => ({
      url: normalizeUrl(subtitle.file),
      label: subtitle.title || "",
      srclang: subtitle.language || "",
      format: subtitle.format || "vtt",
      default: Boolean(subtitle.default)
    })),
    storyboard: normalizeUrl(player.storyboard) || null,
    chapters: normalizeUrl(player.chapter) || null
  };
}
__name(scrapeWatch, "scrapeWatch");
async function handleWatch6(anilistId, audio, epNum, ctx = {}) {
  const data = await seriesEpisodes(anilistId, ctx);
  const episode = data.episodes.find((item) => {
    const number = data.mode === "offset" ? item.number - data.offset : item.number;
    return number === Number(epNum);
  });
  if (!episode || audio === "sub" && !episode.hasSub || audio === "dub" && !episode.hasDub) {
    throw new Error(`AniZone ${audio} episode ${epNum} not found`);
  }
  const watch3 = await scrapeWatch(data.series.slug, episode.sourceNumber);
  return json({
    anilistId: Number(anilistId),
    episode: Number(epNum),
    providerEpisode: episode.sourceNumber,
    audio,
    streams: [{
      url: watch3.hls,
      type: "hls",
      server: "AniZone",
      subtitles: watch3.subtitles,
      storyboard: watch3.storyboard,
      chapters: watch3.chapters,
      priority: 1,
      isActive: true
    }]
  });
}
__name(handleWatch6, "handleWatch");
var anizone_default = {
  async fetch(request3) {
    const url = new URL(request3.url);
    if (request3.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
          "Access-Control-Allow-Headers": "*"
        }
      });
    }
    try {
      const match = url.pathname.match(/^\/watch\/anizone\/(\d+)\/(sub|dub)\/anizone-(\d+)\/?$/);
      if (match) return await handleWatch6(match[1], match[2], match[3]);
      return json({ error: "Not found" }, 404);
    } catch (error3) {
      return json({ error: error3.message, "Raw-ERROR": error3.rawBody ?? null, stack: error3.stack }, 500);
    }
  }
};

// providers/aniwaves.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var BASE5 = "https://aniwaves.ru";
var UA9 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36";
function escapeRegex2(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
__name(escapeRegex2, "escapeRegex");
function stripHtml(value = "") {
  return decodeEntities(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " "));
}
__name(stripHtml, "stripHtml");
function attribute(tag, name) {
  const match = String(tag).match(new RegExp(`\\b${escapeRegex2(name)}=["']([^"']*)["']`, "i"));
  return match ? decodeEntities(match[1]) : "";
}
__name(attribute, "attribute");
function formatName2(value) {
  const name = String(value || "").toUpperCase();
  if (name.includes("SPECIAL")) return "special";
  if (name === "TV" || name === "TV_SHORT") return "tv";
  if (name === "MOVIE") return "movie";
  if (name === "OVA") return "ova";
  if (name === "ONA") return "ona";
  if (name === "SPECIAL") return "special";
  return "";
}
__name(formatName2, "formatName");
function searchQueries2(titles) {
  return buildTitleSearchQueries(titles, 20);
}
__name(searchQueries2, "searchQueries");
async function fetchText3(url, headers = {}) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": UA9,
      "Accept-Language": "en-US,en;q=0.9",
      ...headers
    }
  });
  const raw = await response.text();
  if (!response.ok) {
    const error3 = new Error(`AniWaves HTTP ${response.status}: ${url}`);
    error3.rawBody = raw;
    throw error3;
  }
  return raw;
}
__name(fetchText3, "fetchText");
async function fetchAjax(path, referer) {
  const raw = await fetchText3(`${BASE5}${path}`, {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "X-Requested-With": "XMLHttpRequest",
    "Referer": referer
  });
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    const error3 = new Error(`AniWaves returned invalid JSON: ${path}`);
    error3.rawBody = raw;
    throw error3;
  }
  if (Number(data?.status) !== 200) {
    const error3 = new Error(data?.message || `AniWaves request failed: ${path}`);
    error3.rawBody = raw;
    throw error3;
  }
  return data.result;
}
__name(fetchAjax, "fetchAjax");
function parseSearchCards(html2) {
  const found = /* @__PURE__ */ new Map();
  for (const match of html2.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const tag = match[1];
    if (!/\bclass=["'][^"']*\bname\b[^"']*\bd-title\b/i.test(tag)) continue;
    const href = attribute(tag, "href");
    const slug = href.match(/^\/watch\/([a-z0-9-]+)$/i)?.[1];
    if (!slug || found.has(slug)) continue;
    const siteId = Number(slug.match(/-(\d+)$/)?.[1]);
    if (!Number.isFinite(siteId)) continue;
    const title2 = stripHtml(match[2]);
    if (!title2) continue;
    found.set(slug, {
      slug,
      siteId,
      title: title2,
      japanese: attribute(tag, "data-jp")
    });
  }
  return [...found.values()];
}
__name(parseSearchCards, "parseSearchCards");
async function search4(query) {
  const html2 = await fetchText3(`${BASE5}/filter?keyword=${encodeURIComponent(query)}`, {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Referer": `${BASE5}/`
  });
  return parseSearchCards(html2);
}
__name(search4, "search");
function detailField(html2, label) {
  const match = html2.match(new RegExp(`<div>\\s*${escapeRegex2(label)}:\\s*<span[^>]*>([\\s\\S]*?)<\\/span>`, "i"));
  return match ? stripHtml(match[1]) : "";
}
__name(detailField, "detailField");
function parseEpisodeCount(value) {
  const numbers = [...String(value).matchAll(/\d+/g)].map((match) => Number(match[0])).filter(Number.isFinite);
  return { available: numbers[0] ?? 0, total: numbers[1] ?? numbers[0] ?? 0 };
}
__name(parseEpisodeCount, "parseEpisodeCount");
async function fetchDetail(candidate) {
  const html2 = await fetchText3(`${BASE5}/watch/${candidate.slug}`, {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Referer": `${BASE5}/`
  });
  const premiered = detailField(html2, "Premiered");
  const aired = detailField(html2, "Date aired");
  const year = Number(aired.match(/\d{4}/)?.[0] ?? premiered.match(/\d{4}/)?.[0] ?? "");
  return {
    ...candidate,
    title: candidate.title || stripHtml(html2.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? ""),
    type: formatName2(detailField(html2, "Type")),
    year: Number.isFinite(year) ? year : null,
    episodes: parseEpisodeCount(detailField(html2, "Episodes"))
  };
}
__name(fetchDetail, "fetchDetail");
function candidateTitleScore2(titles, candidate) {
  const values = [candidate.title, candidate.japanese, candidate.slug.replace(/-/g, " ")].filter(Boolean);
  return titleIdentityScore(titles, values);
}
__name(candidateTitleScore2, "candidateTitleScore");
function coverageScore2(candidate, expected, status) {
  if (!expected || expected < 1) return 0.5;
  if (candidate.episodes.available < 1) return 0;
  if (status !== "FINISHED") return 1;
  if (expected < 6) return 1;
  const needed = Math.ceil(expected * 0.8);
  return Math.min(1, candidate.episodes.available / needed);
}
__name(coverageScore2, "coverageScore");
function validateCandidate2(candidate, media, titles, expected) {
  const titleScore3 = candidateTitleScore2(titles, candidate);
  const expectedType = formatName2(media?.format);
  const expectedYear = Number(media?.startDate?.year ?? media?.seasonYear ?? 0) || null;
  const primaryTitles = [media?.title?.english, media?.title?.romaji, media?.title?.native].filter(Boolean);
  const partOrdinal = Math.max(0, ...primaryTitles.map(ordinal2));
  const partMapping = expected === 1 && expectedType === "special" && candidate.type === "special" && expectedYear && candidate.year === expectedYear && partOrdinal >= 2 && candidate.episodes.available === partOrdinal && titleScore3 >= 0.65;
  if (titleScore3 < 0.68 && !partMapping) return null;
  if (expectedType && candidate.type && expectedType !== candidate.type) return null;
  if (expectedYear && candidate.year && expectedYear !== candidate.year) return null;
  const coverage = coverageScore2(candidate, expected, media?.status);
  if (expected >= 6 && coverage < 0.8) return null;
  const score = titleScore3 * 0.72 + (expectedType && candidate.type === expectedType ? 0.14 : 0.07) + (expectedYear && candidate.year === expectedYear ? 0.1 : 0.04) + coverage * 0.04;
  return { ...candidate, titleScore: titleScore3, coverage, score, partOrdinal: partMapping ? partOrdinal : 0 };
}
__name(validateCandidate2, "validateCandidate");
async function resolveSeries5(anilistId, ctx = {}) {
  const cacheKey = `np:match2:aniwaves:${anilistId}`;
  const cached = get2(cacheKey);
  if (isFresh(cached)) return cached.data;
  const media = ctx.media ?? await getMedia(anilistId);
  const titles = buildTitles(media, ctx.anizip);
  const expected = expectedCount(media, ctx.anizip);
  const discovered = /* @__PURE__ */ new Map();
  await Promise.all(searchQueries2(titles).map(async (query) => {
    try {
      for (const candidate of await search4(query)) if (!discovered.has(candidate.slug)) discovered.set(candidate.slug, candidate);
    } catch {
    }
  }));
  const shortlist = [...discovered.values()].map((candidate) => ({ candidate, score: candidateTitleScore2(titles, candidate) })).filter((item) => item.score >= 0.5).sort((left, right) => right.score - left.score).slice(0, 12).map((item) => item.candidate);
  const details = await Promise.all(shortlist.map((candidate) => fetchDetail(candidate).catch(() => null)));
  const valid = details.filter(Boolean).map((candidate) => validateCandidate2(candidate, media, titles, expected)).filter(Boolean).sort((left, right) => right.score - left.score);
  const selected = valid[0];
  const runnerUp = valid[1];
  if (!selected || selected.score < 0.82 && !selected.partOrdinal || runnerUp && selected.score - runnerUp.score < 0.08) {
    throw new Error(`AniWaves match not confident for AniList ${anilistId}`);
  }
  const data = {
    siteId: selected.siteId,
    slug: selected.slug,
    title: selected.title,
    score: selected.score,
    matchScore: selected.titleScore,
    episodeCount: selected.episodes.available,
    type: selected.type,
    year: selected.year,
    partOrdinal: selected.partOrdinal
  };
  set(cacheKey, data, SHOW_IDENTITY_TTL);
  return data;
}
__name(resolveSeries5, "resolveSeries");
function parseEpisodes2(html2) {
  const episodes = [];
  const seen = /* @__PURE__ */ new Set();
  for (const match of html2.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const attrs = match[1];
    const number = Number(attribute(attrs, "data-num"));
    const sourceNumber = attribute(attrs, "data-slug") || String(number);
    if (!Number.isFinite(number) || number < 1 || seen.has(number)) continue;
    const ids = attribute(attrs, "data-ids");
    if (!ids) continue;
    seen.add(number);
    episodes.push({
      number,
      sourceNumber,
      ids,
      title: stripHtml(match[2]).replace(/^\d+\s*/, "") || `Episode ${number}`,
      airDate: attribute(attrs, "data-aired") || null,
      duration: Number(attribute(attrs, "data-duration")) || null,
      filler: attribute(attrs, "data-filler") === "1",
      recap: attribute(attrs, "data-recap") === "1",
      hasSub: attribute(attrs, "data-sub") === "1",
      hasDub: attribute(attrs, "data-dub") === "1"
    });
  }
  return episodes.sort((left, right) => left.number - right.number);
}
__name(parseEpisodes2, "parseEpisodes");
async function fetchEpisodes(series) {
  const result = await fetchAjax(`/ajax/episode/list/${series.siteId}?vrf=`, `${BASE5}/watch/${series.slug}`);
  const episodes = parseEpisodes2(String(result || ""));
  if (!episodes.length) throw new Error(`AniWaves has no episodes for ${series.slug}`);
  return episodes;
}
__name(fetchEpisodes, "fetchEpisodes");
function ordinal2(value) {
  const match = String(value || "").toLowerCase().match(/\b(?:part|special|chapter)\s*(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\b/);
  if (!match) return 0;
  const word = match[1];
  const numbers = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
  return Number(word) || numbers[word] || 0;
}
__name(ordinal2, "ordinal");
function alignEpisodes2(sourceEpisodes, media, expected, series) {
  if (!expected || sourceEpisodes.length <= expected) return sourceEpisodes;
  const targetTitles = [media?.title?.english, media?.title?.romaji, media?.title?.native].filter(Boolean);
  const targetOrdinal = Math.max(0, ...targetTitles.map(ordinal2));
  if (targetOrdinal < 2) return sourceEpisodes;
  let start = sourceEpisodes.findIndex((episode) => ordinal2(episode.title) === targetOrdinal);
  if (start < 0 && series?.partOrdinal === targetOrdinal && sourceEpisodes.length === targetOrdinal) start = targetOrdinal - 1;
  if (start < 0 || sourceEpisodes.length - start < expected) return sourceEpisodes;
  return sourceEpisodes.slice(start, start + expected).map((episode, index) => ({ ...episode, number: index + 1 }));
}
__name(alignEpisodes2, "alignEpisodes");
function buildEpisodeLists4(anilistId, sourceEpisodes, ctx, expected) {
  const sub = [];
  const dub = [];
  for (const source of sourceEpisodes) {
    if (expected && source.number > expected) continue;
    const meta = episodeMeta(source.number, ctx);
    const base = {
      number: source.number,
      title: meta.title ?? source.title,
      duration: meta.duration ?? source.duration ?? null,
      filler: meta.filler ?? source.filler,
      uncensored: meta.uncensored,
      description: meta.description,
      image: meta.image,
      airDate: meta.airDate ?? source.airDate,
      recap: source.recap,
      sourceNumber: source.sourceNumber
    };
    if (source.hasSub) sub.push({ ...base, id: `watch/aniwaves/${anilistId}/sub/aniwaves-${source.number}`, audio: "sub" });
    if (source.hasDub) dub.push({ ...base, id: `watch/aniwaves/${anilistId}/dub/aniwaves-${source.number}`, audio: "dub" });
  }
  return { sub, dub };
}
__name(buildEpisodeLists4, "buildEpisodeLists");
async function getEpisodes6(anilistId, ctx = {}) {
  const media = ctx.media ?? await getMedia(anilistId);
  const localCtx = { ...ctx, media };
  const [series, expected] = await Promise.all([
    resolveSeries5(anilistId, localCtx),
    Promise.resolve(expectedCount(media, ctx.anizip))
  ]);
  const episodes = alignEpisodes2(await fetchEpisodes(series), media, expected, series);
  return {
    meta: {
      id: series.slug,
      title: series.title,
      source: "aniwaves",
      matchScore: Number(series.matchScore.toFixed(3)),
      numbering: "standard",
      episodeOffset: 0
    },
    episodes: buildEpisodeLists4(anilistId, episodes, localCtx, expected)
  };
}
__name(getEpisodes6, "getEpisodes");
function parseServerGroups(html2) {
  const groups = [];
  const markers = [...html2.matchAll(/<div\b([^>]*)>/gi)].map((match) => ({ index: match.index, attrs: match[1], type: attribute(match[1], "data-type") })).filter((item) => item.type === "sub" || item.type === "dub");
  for (let index = 0; index < markers.length; index++) {
    const current = markers[index];
    const end = markers[index + 1]?.index ?? html2.length;
    const segment = html2.slice(current.index, end);
    for (const match of segment.matchAll(/<li\b([^>]*)>([\s\S]*?)<\/li>/gi)) {
      const attrs = match[1];
      const linkId = attribute(attrs, "data-link-id");
      if (!linkId) continue;
      groups.push({
        audio: current.type,
        linkId,
        serverId: attribute(attrs, "data-sv-id") || null,
        server: stripHtml(match[2]) || "AniWaves"
      });
    }
  }
  return groups;
}
__name(parseServerGroups, "parseServerGroups");
async function fetchServers(series, episode) {
  const result = await fetchAjax(
    `/ajax/server/list?servers=${encodeURIComponent(series.siteId)}&eps=${encodeURIComponent(episode.sourceNumber)}`,
    `${BASE5}/watch/${series.slug}/ep-${episode.sourceNumber}`
  );
  return parseServerGroups(String(result || ""));
}
__name(fetchServers, "fetchServers");
async function fetchSource(linkId, referer) {
  const result = await fetchAjax(`/ajax/sources?id=${encodeURIComponent(linkId)}&asi=0&autoPlay=0`, referer);
  if (!result?.url) throw new Error("AniWaves source response has no embed url");
  return result;
}
__name(fetchSource, "fetchSource");
async function resolveSource(source, referer) {
  const extractor = findVideoExtractor(source.url);
  if (!extractor) return [];
  try {
    const streams = await extractor.extract(source.url, { userAgent: UA9, referer });
    return streams.map((stream) => typeof stream === "string" ? { url: stream, type: "hls" } : stream);
  } catch {
    return [];
  }
}
__name(resolveSource, "resolveSource");
function skipRange(value) {
  if (!Array.isArray(value) || value.length < 2) return null;
  const start = Number(value[0]);
  const end = Number(value[1]);
  return Number.isFinite(start) && Number.isFinite(end) && end > start ? { start, end } : null;
}
__name(skipRange, "skipRange");
async function handleWatch7(anilistId, audio, epNum, ctx = {}) {
  const media = ctx.media ?? await getMedia(anilistId);
  const series = await resolveSeries5(anilistId, { ...ctx, media });
  const expected = expectedCount(media, ctx.anizip);
  const episodes = alignEpisodes2(await fetchEpisodes(series), media, expected, series);
  const episode = episodes.find((item) => item.number === Number(epNum));
  if (!episode || audio === "sub" && !episode.hasSub || audio === "dub" && !episode.hasDub) {
    throw new Error(`AniWaves ${audio} episode ${epNum} not found`);
  }
  const servers = (await fetchServers(series, episode)).filter((server) => server.audio === audio);
  if (!servers.length) throw new Error(`AniWaves has no ${audio} servers for episode ${epNum}`);
  const referer = `${BASE5}/watch/${series.slug}/ep-${episode.sourceNumber}`;
  const settled = await Promise.all(servers.map(async (server) => {
    try {
      return { server, source: await fetchSource(server.linkId, referer) };
    } catch (error3) {
      return { server, error: error3 };
    }
  }));
  const resolved2 = await Promise.all(settled.map(async (item) => ({
    ...item,
    direct: item.source?.url ? await resolveSource(item.source, referer) : []
  })));
  const streams = [];
  let intro = null;
  let outro = null;
  for (const item of resolved2) {
    if (!item.source?.url) continue;
    const sourceReferer = (() => {
      try {
        return `${new URL(item.source.url).origin}/`;
      } catch {
        return referer;
      }
    })();
    const skip = item.source.skip_data ?? {};
    intro ??= skipRange(skip.intro);
    outro ??= skipRange(skip.outro);
    for (const stream of item.direct) {
      streams.push({
        url: stream.url,
        type: stream.type,
        server: item.server.server,
        referer: sourceReferer,
        quality: stream.quality,
        priority: streams.length ? 4 : 5,
        isActive: streams.length === 0
      });
    }
    streams.push({
      url: item.source.url,
      type: "embed",
      server: item.server.server,
      referer: sourceReferer,
      priority: streams.length ? 4 : 5,
      isActive: streams.length === 0
    });
  }
  if (!streams.length) {
    const failure = settled.find((item) => item.error)?.error;
    throw failure ?? new Error(`AniWaves sources unavailable for episode ${epNum}`);
  }
  return json({
    anilistId: Number(anilistId),
    episode: Number(epNum),
    providerEpisode: episode.sourceNumber,
    audio,
    intro,
    outro,
    streams
  });
}
__name(handleWatch7, "handleWatch");
var aniwaves_default = {
  async fetch(request3) {
    if (request3.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
          "Access-Control-Allow-Headers": "*"
        }
      });
    }
    const url = new URL(request3.url);
    try {
      const match = url.pathname.match(/^\/watch\/aniwaves\/(\d+)\/(sub|dub)\/aniwaves-(\d+)\/?$/);
      if (match) return await handleWatch7(match[1], match[2], match[3]);
      return json({ error: "Not found" }, 404);
    } catch (error3) {
      return json({ error: error3.message, "Raw-ERROR": error3.rawBody ?? null, stack: error3.stack }, 500);
    }
  }
};

// providers/senshi.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var BASE6 = "https://senshi.to";
var VID_CLOUD = "https://s.vidcloud.se";
var UA10 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";
var H2 = { "User-Agent": UA10, "Referer": `${BASE6}/` };
var SENSHI_WREQ_BROWSER = process.env.SENSHI_WREQ_BROWSER || "chrome_149";
var SENSHI_WREQ_OS = process.env.SENSHI_WREQ_OS || "windows";
async function fetchEpisodeList(malId) {
  const res = await fetch(`${BASE6}/episodes/${malId}`, { headers: H2 });
  if (!res.ok) throw new Error(`Senshi episodes ${res.status} (MAL ${malId})`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}
__name(fetchEpisodeList, "fetchEpisodeList");
async function fetchEmbeds(malId, epNum) {
  const res = await fetch(`${BASE6}/episode-embeds/${malId}/${epNum}`, { headers: H2 });
  if (!res.ok) throw new Error(`Senshi embeds ${res.status} (MAL ${malId} ep ${epNum})`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}
__name(fetchEmbeds, "fetchEmbeds");
async function resolveMalId(anilistId) {
  const cacheKey = `np:senshi:${anilistId}`;
  const cached = get2(cacheKey);
  if (isFresh(cached)) return cached.data;
  const media = await getMedia(anilistId);
  if (!media?.idMal) throw new Error(`Senshi: no MAL ID found for AniList ${anilistId}`);
  set(cacheKey, media.idMal, SHOW_IDENTITY_TTL);
  return media.idMal;
}
__name(resolveMalId, "resolveMalId");
function isDub(status) {
  return (status ?? "").toLowerCase() === "dub";
}
__name(isDub, "isDub");
function sourceAudioMatches(entry, audio) {
  const sourceAudio = entry?.source?.audio;
  if (!sourceAudio) return true;
  const normalized = sourceAudio.toLowerCase();
  return normalized === "both" || normalized === audio;
}
__name(sourceAudioMatches, "sourceAudioMatches");
function mapTrack2(track) {
  const url = track?.vtt_url || track?.url;
  if (!url) return null;
  const label = track.label || "English";
  if (label.toLowerCase() === "chapter") return null;
  const lang = label.toLowerCase().split(/\s+/)[0];
  return {
    url,
    label,
    srclang: lang === "english" ? "en" : lang.slice(0, 2),
    default: Boolean(track.default)
  };
}
__name(mapTrack2, "mapTrack");
async function fetchVidCloudSources(remoteSourceId) {
  if (!remoteSourceId) return [];
  const url = `${VID_CLOUD}/_v1/sources?id=${encodeURIComponent(remoteSourceId)}`;
  const headers = {
    "User-Agent": UA10,
    "Accept": "application/json,*/*",
    "Origin": BASE6,
    "Referer": `${BASE6}/`
  };
  let res;
  try {
    res = await wreqFetch(url, {
      session: "senshi",
      browser: SENSHI_WREQ_BROWSER,
      os: SENSHI_WREQ_OS,
      headers
    });
  } catch {
    res = await fetch(url, { headers });
  }
  if (!res.ok) throw new Error(`Senshi vidcloud ${res.status} (source ${remoteSourceId})`);
  const data = await res.json();
  return Array.isArray(data) ? data : data ? [data] : [];
}
__name(fetchVidCloudSources, "fetchVidCloudSources");
async function getEpisodes7(anilistId, ctx = {}) {
  const malId = await resolveMalId(anilistId);
  const items = await fetchEpisodeList(malId);
  if (!items.length) {
    throw new Error(`Senshi: no episodes for AniList ${anilistId} (MAL ${malId})`);
  }
  let hasDub = false;
  try {
    const probe = await fetchEmbeds(malId, 1);
    hasDub = probe.some((e) => isDub(e.status));
  } catch {
  }
  const sub = [];
  const dub = [];
  for (const item of items) {
    const num = item.ep_id;
    const meta = episodeMeta(num, ctx);
    const title2 = item.ep_title || meta.title || `Episode ${num}`;
    const duration = meta.duration;
    const filler = item.ep_filler || meta.filler || false;
    const recap = item.ep_recap || false;
    const description = meta.description;
    const image = item.ep_thumbnail || meta.image;
    const airDate = meta.airDate;
    sub.push({
      id: `watch/senshi/${anilistId}/sub/senshi-${num}`,
      number: num,
      title: title2,
      duration,
      audio: "sub",
      filler,
      recap,
      uncensored: false,
      description,
      image,
      airDate
    });
    if (hasDub) {
      dub.push({
        id: `watch/senshi/${anilistId}/dub/senshi-${num}`,
        number: num,
        title: title2,
        duration,
        audio: "dub",
        filler,
        recap,
        uncensored: false,
        description,
        image,
        airDate
      });
    }
  }
  sub.sort((a, b) => a.number - b.number);
  dub.sort((a, b) => a.number - b.number);
  return {
    meta: {
      title: ctx.media?.title?.english ?? ctx.media?.title?.romaji ?? null,
      malId,
      source: "senshi"
    },
    episodes: { sub, dub }
  };
}
__name(getEpisodes7, "getEpisodes");
async function handleWatch8(anilistId, audio, epNum) {
  const malId = await resolveMalId(anilistId);
  const embeds = await fetchEmbeds(malId, epNum);
  if (!embeds.length) {
    return json({ error: `Senshi: no sources for episode ${epNum}` }, 404);
  }
  const wantDub = audio === "dub";
  const source = embeds.find((e) => wantDub ? isDub(e.status) : !isDub(e.status));
  if (!source) {
    return json({ error: `Senshi: no ${audio} source for episode ${epNum}` }, 404);
  }
  const list = await fetchEpisodeList(malId).catch(() => []);
  const epItem = list.find((item) => Number(item.ep_id) === Number(epNum));
  const intro = {
    start: epItem?.intro_start ?? 0,
    end: epItem?.intro_end ?? 0
  };
  const outro = {
    start: epItem?.outro_start ?? 0,
    end: epItem?.outro_end ?? 0
  };
  const streams = [];
  const downloads = [];
  const subtitles = [];
  if (source.remote_source_id) {
    const vidCloudSources = await fetchVidCloudSources(source.remote_source_id).catch(() => []);
    const usableSources = vidCloudSources.filter((entry) => entry?.source?.src && sourceAudioMatches(entry, audio));
    for (const entry of usableSources) {
      const itemSubs = [];
      for (const track of entry.tracks || []) {
        const mapped = mapTrack2(track);
        if (!mapped) continue;
        itemSubs.push(mapped);
        if (!subtitles.some((sub) => sub.url === mapped.url)) subtitles.push(mapped);
      }
      streams.push({
        url: entry.source.src,
        type: "hls",
        server: "Senshi",
        referer: `${BASE6}/`,
        quality: entry.source.quality || null,
        subtitles: itemSubs,
        fonts: Array.isArray(entry.font) ? entry.font : [],
        priority: streams.length ? 4 : 5,
        isActive: streams.length === 0
      });
    }
  }
  if (!streams.length && source.url) {
    streams.push({
      url: source.url.replace(/^http:\/\//i, "https://"),
      type: "embed",
      server: "Senshi",
      referer: `${BASE6}/`,
      priority: 4,
      isActive: true
    });
  }
  if (source.server2) {
    streams.push({
      url: source.server2,
      type: "embed",
      server: "StreamNin",
      referer: `${BASE6}/`,
      priority: 3,
      isActive: false
    });
  }
  if (source.serverFM) {
    streams.push({
      url: source.serverFM,
      type: "embed",
      server: "FileMoon",
      referer: `${BASE6}/`,
      priority: 2,
      isActive: false
    });
  }
  if (source.download) {
    downloads.push({ url: source.download, label: "Download" });
  }
  return json({
    anilistId: Number(anilistId),
    malId,
    episode: Number(epNum),
    audio,
    intro,
    outro,
    streams,
    subtitles,
    downloads,
    headers: H2
  });
}
__name(handleWatch8, "handleWatch");
var senshi_default = {
  async fetch(request3) {
    if (request3.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
          "Access-Control-Allow-Headers": "*"
        }
      });
    }
    const url = new URL(request3.url);
    try {
      const m = url.pathname.match(/^\/watch\/senshi\/(\d+)\/(sub|dub)\/senshi-(\d+)\/?$/);
      if (m) return await handleWatch8(m[1], m[2], m[3]);
      return json({ error: "Not found" }, 404);
    } catch (err) {
      return json({ error: err.message, stack: err.stack }, 500);
    }
  }
};

// providers/kickassanime.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var BASE7 = "https://kaa.lt";
var HLS_BASE = "https://hls.krussdomi.com/manifest";
var UA11 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
var H3 = { "User-Agent": UA11, Accept: "application/json" };
async function kaaSearch(query) {
  const res = await fetch(`${BASE7}/api/fsearch`, {
    method: "POST",
    headers: { ...H3, "Content-Type": "application/json" },
    body: JSON.stringify({ page: 1, query })
  });
  if (!res.ok) throw new Error(`kaa fsearch HTTP ${res.status}`);
  const data = await res.json();
  return Array.isArray(data?.result) ? data.result : [];
}
__name(kaaSearch, "kaaSearch");
async function kaaShowInfo(showSlug) {
  const res = await fetch(`${BASE7}/api/show/${showSlug}`, { headers: H3 });
  if (!res.ok) throw new Error(`kaa show HTTP ${res.status}: ${showSlug}`);
  return res.json();
}
__name(kaaShowInfo, "kaaShowInfo");
async function kaaEpisodePage(showSlug, ep) {
  const res = await fetch(
    `${BASE7}/api/show/${showSlug}/episodes?ep=${ep}&lang=ja-JP`,
    { headers: H3 }
  );
  if (!res.ok) throw new Error(`kaa episodes HTTP ${res.status}`);
  return res.json();
}
__name(kaaEpisodePage, "kaaEpisodePage");
async function kaaAllEpisodes(showSlug) {
  const first = await kaaEpisodePage(showSlug, 1);
  const pages = Array.isArray(first.pages) ? first.pages : [];
  const all = Array.isArray(first.result) ? [...first.result] : [];
  if (pages.length > 1) {
    const rest = await Promise.all(
      pages.slice(1).map(async (pg) => {
        const startEp = pg.eps?.[0];
        if (!startEp) return [];
        const d = await kaaEpisodePage(showSlug, startEp);
        return Array.isArray(d.result) ? d.result : [];
      })
    );
    for (const batch of rest) all.push(...batch);
  }
  return all;
}
__name(kaaAllEpisodes, "kaaAllEpisodes");
async function kaaEpisodeServers(showSlug, fullEpSlug) {
  const res = await fetch(
    `${BASE7}/api/show/${showSlug}/episode/${fullEpSlug}`,
    { headers: H3 }
  );
  if (!res.ok) throw new Error(`kaa episode servers HTTP ${res.status}`);
  return res.json();
}
__name(kaaEpisodeServers, "kaaEpisodeServers");
function buildKaaQueries(titles) {
  const queries = /* @__PURE__ */ new Set();
  for (const title2 of titles.slice(0, 4)) {
    if (/[\u3000-\u9fff\u4e00-\u9faf]/.test(title2)) continue;
    const clean = title2.replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
    if (!clean || clean.length < 3) continue;
    const words = clean.split(" ").filter(Boolean);
    if (words.length <= 3) {
      queries.add(clean);
    } else {
      queries.add(words.slice(0, 2).join(" "));
      queries.add(words.slice(0, 3).join(" "));
    }
  }
  return [...queries];
}
__name(buildKaaQueries, "buildKaaQueries");
function scoreCandidate2(candidate, titles, seasonYear, anilistFormat) {
  const titleEn = candidate.title_en || "";
  const titleJp = candidate.title || "";
  const kaaYear = Number(candidate.year);
  const kaaType = (candidate.type || "").toLowerCase();
  const base = titleIdentityScore(titles, [titleEn, titleJp, candidate.slug]);
  let yearMult = 1;
  if (seasonYear && kaaYear) {
    const diff = Math.abs(Number(seasonYear) - kaaYear);
    if (diff === 0) yearMult = 1.2;
    else if (diff === 1) yearMult = 0.8;
    else yearMult = 0.5;
  }
  let typeMult = 1;
  const af = (anilistFormat || "").toUpperCase();
  if (af === "MOVIE" && kaaType !== "movie") typeMult = 0.25;
  else if (af !== "MOVIE" && kaaType === "movie") typeMult = 0.25;
  else if ((af === "OVA" || af === "ONA" || af === "SPECIAL") && kaaType === "tv") typeMult = 0.5;
  else if (af === "TV" && (kaaType === "ova" || kaaType === "special")) typeMult = 0.5;
  return Math.min(1, base * yearMult) * typeMult;
}
__name(scoreCandidate2, "scoreCandidate");
async function resolveSeries6(anilistId, ctx = {}) {
  const cacheKey = `np:match2:kaa:${anilistId}`;
  const cached = get2(cacheKey);
  if (isFresh(cached)) return cached.data;
  const media = ctx.media ?? await getMedia(anilistId);
  const titles = buildTitles(media, ctx.anizip);
  const queries = [.../* @__PURE__ */ new Set([...buildKaaQueries(titles), ...buildTitleSearchQueries(titles, 12)])].slice(0, 20);
  const seasonYear = media?.seasonYear;
  const format = media?.format;
  if (!queries.length) throw new Error(`KAA: no usable search queries for AniList ${anilistId}`);
  const allCandidates = /* @__PURE__ */ new Map();
  await Promise.all(
    queries.map(async (q) => {
      try {
        const results = await kaaSearch(q);
        for (const r of results) {
          if (!allCandidates.has(r.slug)) allCandidates.set(r.slug, r);
        }
      } catch {
      }
    })
  );
  if (!allCandidates.size) throw new Error(`KAA: no search results for AniList ${anilistId}`);
  const scored = [];
  for (const [, candidate] of allCandidates) {
    const score = scoreCandidate2(candidate, titles, seasonYear, format);
    if (score >= 0.5) {
      scored.push({
        slug: candidate.slug,
        title: candidate.title_en || candidate.title,
        locales: Array.isArray(candidate.locales) ? candidate.locales : [],
        score
      });
    }
  }
  scored.sort((a, b) => b.score - a.score);
  if (!scored.length) {
    throw new Error(`KAA: no confident match for AniList ${anilistId}`);
  }
  const best = scored[0];
  if (best.score < 0.6) {
    throw new Error(
      `KAA: low confidence match for AniList ${anilistId} \u2014 best "${best.slug}" score ${best.score.toFixed(3)}`
    );
  }
  const data = {
    slug: best.slug,
    title: best.title,
    locales: best.locales,
    score: best.score
  };
  set(cacheKey, data, SHOW_IDENTITY_TTL);
  return data;
}
__name(resolveSeries6, "resolveSeries");
async function buildEpMap(showSlug, showInfo) {
  if (showInfo?.type === "movie") {
    const m = (showInfo.watch_uri || "").match(/\/(ep-(\d+)-([a-f0-9]+))$/i);
    if (m) return [{ number: 1, fullSlug: m[1] }];
    return [];
  }
  const episodes = await kaaAllEpisodes(showSlug);
  return episodes.map((e) => ({
    number: e.episode_number,
    fullSlug: `ep-${e.episode_number}-${e.slug}`,
    title: e.title,
    duration: e.duration_ms ? Math.round(e.duration_ms / 1e3) : null
  }));
}
__name(buildEpMap, "buildEpMap");
function titleOrdinal(value) {
  const match = String(value || "").toLowerCase().match(/\b(?:part|special|chapter)\s*(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\b/);
  if (!match) return 0;
  const words = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
  return Number(match[1]) || words[match[1]] || 0;
}
__name(titleOrdinal, "titleOrdinal");
function alignEpisodes3(episodes, media, expected) {
  if (!expected || episodes.length <= expected) return episodes;
  const titles = [media?.title?.english, media?.title?.romaji, media?.title?.native].filter(Boolean);
  const targetOrdinal = Math.max(0, ...titles.map(titleOrdinal));
  if (targetOrdinal < 2) return episodes;
  const start = episodes.findIndex((episode) => titleOrdinal(episode.title) === targetOrdinal);
  if (start < 0 || episodes.length - start < expected) return episodes;
  return episodes.slice(start, start + expected).map((episode, index) => ({
    ...episode,
    sourceNumber: episode.number,
    number: index + 1
  }));
}
__name(alignEpisodes3, "alignEpisodes");
async function getEpisodes8(anilistId, ctx = {}) {
  const media = ctx.media ?? await getMedia(anilistId);
  const localCtx = { ...ctx, media };
  const series = await resolveSeries6(anilistId, localCtx);
  const showInfo = await kaaShowInfo(series.slug);
  const locales = Array.isArray(showInfo.locales) ? showInfo.locales : series.locales;
  const hasDub = locales.includes("en-US");
  const expected = expectedCount(media, ctx.anizip);
  const epMap = alignEpisodes3(await buildEpMap(series.slug, showInfo), media, expected);
  if (!epMap.length) throw new Error(`KAA: no episodes found for AniList ${anilistId} (slug: ${series.slug})`);
  const sub = [];
  const dub = [];
  for (const ep of epMap) {
    const num = ep.number;
    if (!Number.isFinite(num) || num < 1) continue;
    if (expected && num > expected) continue;
    const meta = episodeMeta(num, localCtx);
    const base = {
      number: num,
      title: meta.title ?? ep.title ?? `Episode ${num}`,
      duration: meta.duration ?? ep.duration,
      filler: meta.filler,
      uncensored: false,
      description: meta.description,
      image: meta.image,
      airDate: meta.airDate,
      sourceNumber: ep.sourceNumber ?? ep.number
    };
    sub.push({ id: `watch/kaa/${anilistId}/sub/kaa-${num}`, ...base, audio: "sub" });
    if (hasDub) {
      dub.push({ id: `watch/kaa/${anilistId}/dub/kaa-${num}`, ...base, audio: "dub" });
    }
  }
  return {
    meta: {
      id: series.slug,
      title: series.title,
      source: "kaa",
      matchScore: Number(series.score.toFixed(3))
    },
    episodes: { sub, dub }
  };
}
__name(getEpisodes8, "getEpisodes");
async function handleWatch9(anilistId, audio, epNum) {
  const media = await getMedia(anilistId);
  const series = await resolveSeries6(anilistId, { media });
  const showInfo = await kaaShowInfo(series.slug);
  const locales = Array.isArray(showInfo.locales) ? showInfo.locales : series.locales;
  if (audio === "dub" && !locales.includes("en-US")) {
    return json({ error: `KAA: no English dub for AniList ${anilistId}` }, 404);
  }
  const epMap = alignEpisodes3(
    await buildEpMap(series.slug, showInfo),
    media,
    expectedCount(media)
  );
  const ep = epMap.find((e) => e.number === Number(epNum));
  if (!ep) {
    return json({ error: `KAA: episode ${epNum} not found for AniList ${anilistId}` }, 404);
  }
  const episodeData = await kaaEpisodeServers(series.slug, ep.fullSlug);
  const servers = Array.isArray(episodeData.servers) ? episodeData.servers : [];
  if (!servers.length) {
    return json({ error: `KAA: no streams for episode ${epNum} (AniList ${anilistId})` }, 404);
  }
  const streams = [];
  for (const s of servers) {
    if (!s.src) continue;
    const m = s.src.match(/[?&]id=([^&]+)/);
    if (!m) continue;
    streams.push({
      url: `${HLS_BASE}/${m[1]}/master.m3u8`,
      type: "hls",
      server: s.name || "KAA",
      headers: { Referer: "https://krussdomi.com/" },
      priority: 1,
      isActive: true
    });
  }
  if (!streams.length) {
    return json({ error: `KAA: could not resolve stream for episode ${epNum}` }, 404);
  }
  return json({
    anilistId: Number(anilistId),
    episode: Number(epNum),
    audio,
    streams
  });
}
__name(handleWatch9, "handleWatch");
var kickassanime_default = {
  async fetch(request3) {
    if (request3.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
          "Access-Control-Allow-Headers": "*"
        }
      });
    }
    const url = new URL(request3.url);
    try {
      const m = url.pathname.match(/^\/watch\/kaa\/(\d+)\/(sub|dub)\/kaa-(\d+)\/?$/);
      if (m) return await handleWatch9(m[1], m[2], m[3]);
      return json({ error: "Not found" }, 404);
    } catch (err) {
      return json({ error: err.message, stack: err.stack }, 500);
    }
  }
};

// providers/animedunya.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var BASE8 = "https://anime-dunya.com";
async function resolveMalId2(anilistId) {
  const cacheKey = `np:animedunya:${anilistId}`;
  const cached = get2(cacheKey);
  if (isFresh(cached)) return cached.data;
  const media = await getMedia(anilistId);
  if (!media?.idMal) throw new Error("AnimeDunya: no MAL ID found");
  set(cacheKey, media.idMal, SHOW_IDENTITY_TTL);
  return media.idMal;
}
__name(resolveMalId2, "resolveMalId");
async function fetchHtml2(url) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9"
      },
      redirect: "follow"
    });
    if (res.ok) return await res.text();
  } catch {
  }
  if (typeof process !== "undefined" && process.versions?.node) {
    try {
      const cp3 = await Promise.resolve().then(() => (init_child_process(), child_process_exports));
      if (typeof cp3?.execSync === "function") {
        const cmd = `curl -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36" -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8" -H "Accept-Language: en-US,en;q=0.9" "${url}"`;
        return cp3.execSync(cmd, { encoding: "utf-8", maxBuffer: 10 * 1024 * 1024 });
      }
    } catch {
    }
  }
  return "";
}
__name(fetchHtml2, "fetchHtml");
function extractEpisodesList(html2) {
  const match = html2.match(/\\?"episodes\\?":\s*\[/);
  if (!match) return [];
  const idx = match.index;
  const matchLen = match[0].length;
  let braceCount = 1;
  let result = "[";
  for (let i = idx + matchLen; i < html2.length; i++) {
    const char = html2[i];
    if (char === "[") braceCount++;
    else if (char === "]") braceCount--;
    result += char;
    if (braceCount === 0) break;
  }
  try {
    const cleanStr = result.replace(/\\u0026/g, "&").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    return JSON.parse(cleanStr);
  } catch (e) {
    return [];
  }
}
__name(extractEpisodesList, "extractEpisodesList");
function extractStream(html2) {
  const match = html2.match(/\\?"stream\\?":\s*/);
  if (!match) return null;
  const idx = match.index;
  const matchLen = match[0].length;
  let braceCount = 0;
  let started = false;
  let result = "";
  for (let i = idx + matchLen; i < html2.length; i++) {
    const char = html2[i];
    if (char === "{") {
      braceCount++;
      started = true;
    } else if (char === "}") {
      braceCount--;
    }
    if (started) {
      result += char;
      if (braceCount === 0) break;
    }
  }
  try {
    const cleanStr = result.replace(/\\u0026/g, "&").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    return JSON.parse(cleanStr);
  } catch (e) {
    const sourceMatch = html2.match(/"source"\s*:\s*"([^"]+)"/);
    if (sourceMatch) {
      return { source: sourceMatch[1].replace(/\\/g, "") };
    }
    return null;
  }
}
__name(extractStream, "extractStream");
async function getEpisodes9(anilistId, ctx = {}) {
  const malId = await resolveMalId2(anilistId);
  const html2 = await fetchHtml2(`${BASE8}/en/anime/${malId}`);
  if (!html2) throw new Error("AnimeDunya: episodes fetch failed");
  let cdnBase = "https://cdn.anime-dunya.com/thumbnail/";
  let cdnExt = "small.jpg";
  const thumbMatch = html2.match(/(https?:\/\/[^\s"'`<>]+?\/thumbnail\/)([a-zA-Z0-9]+?)\/((?:small|large)\.jpg)/);
  if (thumbMatch) {
    cdnBase = thumbMatch[1];
    cdnExt = thumbMatch[3];
  }
  const episodes = extractEpisodesList(html2);
  const watchable = episodes.filter((ep) => ep.streamId !== null && ep.streamId !== void 0);
  const sub = [];
  for (const ep of watchable) {
    const epNum = ep.episodeNumber;
    const meta = episodeMeta(epNum, ctx);
    const customTitle = Array.isArray(ep.translations) ? ep.translations.find((t) => t.language === "en")?.title : ep.translations?.title;
    sub.push({
      id: `watch/animedunya/${anilistId}/sub/animedunya-${epNum}`,
      number: epNum,
      title: customTitle || meta.title || `Episode ${epNum}`,
      duration: meta.duration,
      audio: "sub",
      filler: ep.filler || meta.filler || false,
      uncensored: false,
      description: meta.description,
      image: ep.streamId ? `${cdnBase}${ep.streamId}/${cdnExt}` : meta.image,
      airDate: meta.airDate
    });
  }
  sub.sort((a, b) => a.number - b.number);
  return {
    meta: {
      title: ctx.media?.title?.english ?? ctx.media?.title?.romaji ?? null,
      malId,
      source: "animedunya"
    },
    episodes: { sub, dub: [] }
  };
}
__name(getEpisodes9, "getEpisodes");
async function handleWatch10(anilistId, audio, epNum) {
  const malId = await resolveMalId2(anilistId);
  const html2 = await fetchHtml2(`${BASE8}/en/play/${malId}/${epNum}`);
  if (!html2) return json({ error: "AnimeDunya watch fetch failed" }, 500);
  const streamData = extractStream(html2);
  if (!streamData || !streamData.source) {
    return json({ error: "AnimeDunya: stream source not found" }, 404);
  }
  const subtitles = (streamData.subtitles || []).map((s) => ({
    url: s.src,
    label: s.label,
    srclang: s.srclang,
    default: s.default || false
  }));
  const streams = [{
    url: streamData.source,
    type: "hls",
    server: "AnimeDunya",
    referer: `${BASE8}/`,
    subtitles,
    priority: 5,
    isActive: true
  }];
  return json({
    anilistId: Number(anilistId),
    malId,
    episode: Number(epNum),
    audio,
    streams
  });
}
__name(handleWatch10, "handleWatch");
var animedunya_default = {
  async fetch(request3) {
    if (request3.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
          "Access-Control-Allow-Headers": "*"
        }
      });
    }
    const url = new URL(request3.url);
    try {
      const m = url.pathname.match(/^\/watch\/animedunya\/(\d+)\/(sub|dub)\/animedunya-(\d+)\/?$/);
      if (m) return await handleWatch10(m[1], m[2], m[3]);
      return json({ error: "Not found" }, 404);
    } catch (err) {
      return json({ error: err.message, stack: err.stack }, 500);
    }
  }
};

// providers/animeonsen.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var SITE = "https://www.animeonsen.xyz";
var UA12 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36";
var session = null;
var sessionInFlight = null;
function attribute2(tag, name) {
  const escaped = String(name).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return String(tag).match(new RegExp(`\\b${escaped}=["']([^"']*)["']`, "i"))?.[1] ?? "";
}
__name(attribute2, "attribute");
function metaContent(html2, name) {
  for (const match of String(html2).matchAll(/<meta\b[^>]*>/gi)) {
    if (attribute2(match[0], "name").toLowerCase() === name.toLowerCase()) return attribute2(match[0], "content");
  }
  return "";
}
__name(metaContent, "metaContent");
function sessionCookie(headers) {
  const values = typeof headers.getSetCookie === "function" ? headers.getSetCookie() : [headers.get("set-cookie")].filter(Boolean);
  for (const value of values) {
    const cookie = String(value).match(/(?:^|;\s*)ao\.session=([^;]+)/)?.[1];
    if (cookie) return cookie;
  }
  return "";
}
__name(sessionCookie, "sessionCookie");
function decodeToken(cookie) {
  const decoded = Buffer.from(decodeURIComponent(cookie), "base64").toString("utf8");
  const token = [...decoded].map((char) => String.fromCharCode(char.charCodeAt(0) + 1)).join("");
  if (!token || !/^[\x20-\x7e]+$/.test(token)) throw new Error("AnimeOnsen returned an invalid session token");
  return token;
}
__name(decodeToken, "decodeToken");
async function createSession2() {
  const response = await fetch(`${SITE}/`, {
    headers: {
      "User-Agent": UA12,
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9"
    }
  });
  const html2 = await response.text();
  if (!response.ok) throw new Error(`AnimeOnsen homepage HTTP ${response.status}`);
  const cookie = sessionCookie(response.headers);
  const apiOrigin = metaContent(html2, "ao-api-origin");
  const searchOrigin = metaContent(html2, "ao-search-origin");
  const searchToken = metaContent(html2, "ao-search-token");
  if (!cookie || !apiOrigin || !searchOrigin || !searchToken) throw new Error("AnimeOnsen session bootstrap data missing");
  return {
    token: decodeToken(cookie),
    apiOrigin: new URL(apiOrigin).origin,
    searchOrigin: new URL(searchOrigin).origin,
    searchToken
  };
}
__name(createSession2, "createSession");
async function getSession2(force = false) {
  if (force) session = null;
  if (session) return session;
  if (!sessionInFlight) {
    sessionInFlight = createSession2().then((value) => {
      session = value;
      return value;
    }).finally(() => {
      sessionInFlight = null;
    });
  }
  return sessionInFlight;
}
__name(getSession2, "getSession");
async function responseJson(response, label) {
  const raw = await response.text();
  if (!response.ok) {
    const error3 = new Error(`AnimeOnsen ${label} HTTP ${response.status}`);
    error3.status = response.status;
    error3.rawBody = raw;
    throw error3;
  }
  try {
    return JSON.parse(raw);
  } catch {
    const error3 = new Error(`AnimeOnsen ${label} returned invalid JSON`);
    error3.rawBody = raw;
    throw error3;
  }
}
__name(responseJson, "responseJson");
async function apiJson(path, retry = true) {
  const current = await getSession2();
  const response = await fetch(`${current.apiOrigin}${path}`, {
    headers: {
      Authorization: `Bearer ${current.token}`,
      Accept: "application/json, text/plain, */*",
      Origin: SITE,
      Referer: `${SITE}/`,
      "User-Agent": UA12
    }
  });
  if ((response.status === 401 || response.status === 403) && retry) {
    await getSession2(true);
    return apiJson(path, false);
  }
  return responseJson(response, path);
}
__name(apiJson, "apiJson");
async function search5(query, retry = true) {
  const current = await getSession2();
  const response = await fetch(`${current.searchOrigin}/multi-search`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${current.searchToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: SITE,
      Referer: `${SITE}/`,
      "User-Agent": UA12
    },
    body: JSON.stringify({
      queries: [{ indexUid: "content", q: query, limit: 20 }]
    })
  });
  if ((response.status === 401 || response.status === 403) && retry) {
    await getSession2(true);
    return search5(query, false);
  }
  const data = await responseJson(response, `search: ${query}`);
  return Array.isArray(data?.results?.[0]?.hits) ? data.results[0].hits : [];
}
__name(search5, "search");
function searchQueries3(titles) {
  return buildTitleSearchQueries(titles, 20);
}
__name(searchQueries3, "searchQueries");
function titleScore2(titles, candidate) {
  const values = [candidate.content_title_en, candidate.content_title, candidate.content_title_jp].filter(Boolean);
  return titleIdentityScore(titles, values);
}
__name(titleScore2, "titleScore");
async function inspectCandidate(candidate) {
  const contentId = String(candidate?.content_id || "");
  if (!contentId) return null;
  try {
    const video = await apiJson(`/v4/content/${encodeURIComponent(contentId)}/video/1`);
    const metadata = video?.metadata;
    if (!metadata) return null;
    const episodeValues = Array.isArray(metadata.episode) ? metadata.episode : [metadata.episode];
    let episodeMap = null;
    for (const value of episodeValues) {
      if (!value || typeof value !== "object" || Array.isArray(value)) continue;
      if (Object.entries(value).some(([number, episode]) => /^\d+$/.test(number) && episode && typeof episode === "object" && (episode.contentTitle_episode_en || episode.contentTitle_episode_jp))) {
        episodeMap = value;
      }
    }
    return {
      contentId,
      title: candidate.content_title_en || candidate.content_title || "",
      candidate,
      malId: Number(metadata.mal_id) || null,
      episodeCount: Number(metadata.total_episodes) || 0,
      isMovie: Boolean(metadata.is_movie),
      episodeTitles: Object.entries(episodeMap || {}).map(([number, episode]) => ({
        number: Number(number),
        title: episode.contentTitle_episode_en || episode.contentTitle_episode_jp || ""
      })).filter((episode) => Number.isInteger(episode.number) && episode.number >= 1)
    };
  } catch {
    return null;
  }
}
__name(inspectCandidate, "inspectCandidate");
function titleOrdinal2(value) {
  const match = String(value || "").toLowerCase().match(/\b(?:part|special|chapter)\s*(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\b/);
  if (!match) return 0;
  const words = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
  return Number(match[1]) || words[match[1]] || 0;
}
__name(titleOrdinal2, "titleOrdinal");
function coverageScore3(episodeCount, expected, status) {
  if (!expected || expected < 2) return 1;
  if (!episodeCount) return 0.5;
  if (status !== "FINISHED") return 1;
  if (episodeCount === expected) return 1;
  if (episodeCount > expected && episodeCount <= expected + 2) return 0.95;
  return Math.min(1, episodeCount / expected);
}
__name(coverageScore3, "coverageScore");
function validateCandidate3(candidate, media, titles, expected) {
  const title2 = titleScore2(titles, candidate.candidate);
  const expectedMovie = media?.format === "MOVIE";
  if (candidate.isMovie !== expectedMovie) return null;
  const primaryTitles = [media?.title?.english, media?.title?.romaji, media?.title?.native].filter(Boolean);
  const partOrdinal = Math.max(0, ...primaryTitles.map(titleOrdinal2));
  const partMapping = expected === 1 && media?.format === "SPECIAL" && partOrdinal >= 2 && candidate.episodeCount === partOrdinal && candidate.episodeTitles.some((episode) => episode.number === partOrdinal) && title2 >= 0.65;
  const coverage = coverageScore3(candidate.episodeCount, expected, media?.status);
  if (expected >= 6) {
    const minimum = media?.status === "FINISHED" ? Math.ceil(expected * 0.8) : 1;
    if (candidate.episodeCount < minimum) return null;
  }
  if (title2 < 0.7 && !partMapping) return null;
  return {
    ...candidate,
    titleScore: title2,
    coverage,
    score: title2 * 0.7 + coverage * 0.2 + 0.1,
    partOrdinal: partMapping ? partOrdinal : 0
  };
}
__name(validateCandidate3, "validateCandidate");
async function resolveSeries7(anilistId, ctx = {}) {
  const cacheKey = `np:match2:animeonsen:${anilistId}`;
  const cached = get2(cacheKey);
  if (isFresh(cached)) return cached.data;
  const media = ctx.media ?? await getMedia(anilistId);
  const primaryTitles = [media?.title?.english, media?.title?.romaji, media?.title?.native].filter(Boolean);
  const titles = [.../* @__PURE__ */ new Set([...primaryTitles, ...buildTitles(media, ctx.anizip)])];
  if (!titles.length) throw new Error(`AnimeOnsen has no AniList titles for ${anilistId}`);
  const expected = expectedCount(media, ctx.anizip);
  const discovered = /* @__PURE__ */ new Map();
  await Promise.all(searchQueries3(titles).map(async (query) => {
    try {
      for (const candidate of await search5(query)) {
        if (candidate?.content_id && !discovered.has(candidate.content_id)) discovered.set(candidate.content_id, candidate);
      }
    } catch {
    }
  }));
  const shortlist = [...discovered.values()].map((candidate) => ({ candidate, score: titleScore2(titles, candidate) })).filter((item) => item.score >= 0.42).sort((left, right) => right.score - left.score).slice(0, 14).map((item) => item.candidate);
  const inspected = (await Promise.all(shortlist.map(inspectCandidate))).filter(Boolean);
  const expectedMalId = Number(media?.idMal) || null;
  const exact = expectedMalId ? inspected.filter((candidate) => candidate.malId === expectedMalId) : [];
  const validated = (exact.length ? exact : inspected.filter((candidate) => !expectedMalId || !candidate.malId)).map((candidate) => validateCandidate3(candidate, media, titles, expected)).filter(Boolean).sort((left, right) => right.score - left.score);
  const selected = validated[0];
  const runnerUp = validated[1];
  if (!selected || !exact.length && (selected.score < 0.82 && !selected.partOrdinal || runnerUp && selected.score - runnerUp.score < 0.08)) {
    throw new Error(`AnimeOnsen match not confident for AniList ${anilistId}`);
  }
  const data = {
    contentId: selected.contentId,
    title: selected.title,
    malId: selected.malId,
    episodeCount: selected.episodeCount,
    isMovie: selected.isMovie,
    matchScore: selected.titleScore,
    score: selected.score,
    partOrdinal: selected.partOrdinal
  };
  set(cacheKey, data, SHOW_IDENTITY_TTL);
  return data;
}
__name(resolveSeries7, "resolveSeries");
async function fetchEpisodes2(series) {
  const data = await apiJson(`/v4/content/${encodeURIComponent(series.contentId)}/episodes`);
  const episodes = Object.entries(data ?? {}).map(([sourceNumber, detail]) => ({
    number: Number(sourceNumber),
    sourceNumber,
    title: detail?.contentTitle_episode_en || detail?.contentTitle_episode_jp || null
  })).filter((episode) => Number.isInteger(episode.number) && episode.number >= 1).sort((left, right) => left.number - right.number);
  if (episodes.length) return episodes;
  if (series.isMovie) return [{ number: 1, sourceNumber: "1", title: null }];
  throw new Error(`AnimeOnsen has no episodes for ${series.contentId}`);
}
__name(fetchEpisodes2, "fetchEpisodes");
function alignEpisodes4(episodes, media, expected, series) {
  if (!expected || episodes.length <= expected) return episodes;
  const titles = [media?.title?.english, media?.title?.romaji, media?.title?.native].filter(Boolean);
  const targetOrdinal = Math.max(0, ...titles.map(titleOrdinal2));
  if (targetOrdinal < 2) return episodes;
  let start = episodes.findIndex((episode) => titleOrdinal2(episode.title) === targetOrdinal);
  if (start < 0 && series?.partOrdinal === targetOrdinal && episodes.length === targetOrdinal) start = targetOrdinal - 1;
  if (start < 0 || episodes.length - start < expected) return episodes;
  return episodes.slice(start, start + expected).map((episode, index) => ({ ...episode, number: index + 1 }));
}
__name(alignEpisodes4, "alignEpisodes");
function episodeList(anilistId, episodes, ctx, expected) {
  return episodes.filter((episode) => !expected || episode.number <= expected).map((episode) => {
    const meta = episodeMeta(episode.number, ctx);
    return {
      id: `watch/animeonsen/${anilistId}/sub/animeonsen-${episode.number}`,
      number: episode.number,
      sourceNumber: episode.sourceNumber,
      title: meta.title ?? episode.title ?? `Episode ${episode.number}`,
      duration: meta.duration,
      audio: "sub",
      filler: meta.filler,
      uncensored: false,
      description: meta.description,
      image: meta.image,
      airDate: meta.airDate
    };
  });
}
__name(episodeList, "episodeList");
async function getEpisodes10(anilistId, ctx = {}) {
  const media = ctx.media ?? await getMedia(anilistId);
  const localCtx = { ...ctx, media };
  const [series, expected] = await Promise.all([
    resolveSeries7(anilistId, localCtx),
    Promise.resolve(expectedCount(media, ctx.anizip))
  ]);
  return {
    meta: {
      id: series.contentId,
      title: series.title,
      source: "animeonsen",
      matchScore: Number(series.matchScore.toFixed(3)),
      numbering: "standard",
      episodeOffset: 0
    },
    episodes: {
      sub: episodeList(anilistId, alignEpisodes4(await fetchEpisodes2(series), media, expected, series), localCtx, expected),
      dub: []
    }
  };
}
__name(getEpisodes10, "getEpisodes");
function skipRange2(start, end) {
  const from = Number(start);
  const to = Number(end);
  return Number.isFinite(from) && Number.isFinite(to) && to > from ? { start: from, end: to } : null;
}
__name(skipRange2, "skipRange");
function videoSubtitles(video, headers) {
  const labels = video?.metadata?.subtitles ?? {};
  return Object.entries(video?.uri?.subtitles ?? {}).map(([language, url]) => ({
    url,
    label: labels[language] || language,
    srclang: language,
    default: language === "en-US",
    headers
  }));
}
__name(videoSubtitles, "videoSubtitles");
async function handleWatch11(anilistId, audio, epNum, ctx = {}) {
  if (audio !== "sub") throw new Error("AnimeOnsen only provides subtitled streams");
  const media = ctx.media ?? await getMedia(anilistId);
  const series = await resolveSeries7(anilistId, { ...ctx, media });
  const expected = expectedCount(media, ctx.anizip);
  const episodes = alignEpisodes4(await fetchEpisodes2(series), media, expected, series);
  const episode = episodes.find((item) => item.number === Number(epNum) && (!expected || item.number <= expected));
  if (!episode) throw new Error(`AnimeOnsen episode ${epNum} not found`);
  const video = await apiJson(`/v4/content/${encodeURIComponent(series.contentId)}/video/${encodeURIComponent(episode.sourceNumber)}`);
  const stream = video?.uri?.stream;
  if (!stream) throw new Error(`AnimeOnsen has no stream for episode ${epNum}`);
  const current = await getSession2();
  const headers = { Authorization: `Bearer ${current.token}` };
  const skip = Array.isArray(video?.metadata?.episode) ? video.metadata.episode.find((item) => item && typeof item === "object" && ("skipIntro_s" in item || "skipIntro_e" in item)) : null;
  return json({
    anilistId: Number(anilistId),
    episode: Number(epNum),
    providerEpisode: episode.sourceNumber,
    audio,
    intro: skipRange2(skip?.skipIntro_s, skip?.skipIntro_e),
    outro: null,
    streams: [{
      url: stream,
      type: "dash",
      server: "AnimeOnsen",
      referer: `${SITE}/`,
      headers,
      subtitles: videoSubtitles(video, headers),
      priority: 5,
      isActive: true
    }]
  });
}
__name(handleWatch11, "handleWatch");
var animeonsen_default = {
  async fetch(request3) {
    if (request3.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
          "Access-Control-Allow-Headers": "*"
        }
      });
    }
    const url = new URL(request3.url);
    const match = url.pathname.match(/^\/watch\/animeonsen\/(\d+)\/(sub|dub)\/animeonsen-(\d+)\/?$/);
    if (!match) return json({ error: "Not found" }, 404);
    try {
      return await handleWatch11(match[1], match[2], match[3]);
    } catch (error3) {
      return json({ error: error3.message, "Raw-ERROR": error3.rawBody ?? null, stack: error3.stack }, 500);
    }
  }
};

// providers/anipm.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var SITE2 = "https://ani.pm";
var EMBED = "https://embed.settlar.io";
var UA13 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";
var BROWSER = process.env.ANIPM_WREQ_BROWSER || "chrome_149";
var OS = process.env.ANIPM_WREQ_OS || "windows";
function requestHeaders(referer = `${SITE2}/`) {
  return {
    "User-Agent": UA13,
    Accept: "application/json, text/plain, */*",
    Referer: referer,
    Origin: new URL(referer).origin
  };
}
__name(requestHeaders, "requestHeaders");
async function wreq(url, options = {}) {
  return wreqFetch(url, {
    session: "anipm",
    browser: BROWSER,
    os: OS,
    ...options
  });
}
__name(wreq, "wreq");
async function requestJson(url, referer = `${SITE2}/`) {
  const response = await wreq(url, { headers: requestHeaders(referer) });
  const raw = await response.text();
  if (!response.ok) {
    const error3 = new Error(`Ani.pm HTTP ${response.status}: ${raw.slice(0, 400)}`);
    error3.status = response.status;
    error3.rawBody = raw.slice(0, 2e3);
    throw error3;
  }
  try {
    return JSON.parse(raw);
  } catch {
    const error3 = new Error("Ani.pm returned invalid JSON");
    error3.rawBody = raw.slice(0, 2e3);
    throw error3;
  }
}
__name(requestJson, "requestJson");
function titleVariants(media, anizip) {
  return [...new Set(buildTitles(media, anizip).map((value) => String(value).trim()).filter(Boolean))];
}
__name(titleVariants, "titleVariants");
function identityMatches(candidate, media) {
  const aid = Number(candidate?.anilistId) || null;
  const mal = Number(candidate?.malId) || null;
  const expectedAid = Number(media?.id) || null;
  const expectedMal = Number(media?.idMal) || null;
  if (aid && expectedAid && aid !== expectedAid) return false;
  if (mal && expectedMal && mal !== expectedMal) return false;
  return Boolean(aid && expectedAid && aid === expectedAid || mal && expectedMal && mal === expectedMal);
}
__name(identityMatches, "identityMatches");
function verifyBootstrap(data, media) {
  const core = data?.core ?? data?.anime ?? data?.data?.core;
  if (!core) throw new Error("Ani.pm bootstrap did not include anime metadata");
  const aid = Number(core.anilistId) || null;
  const mal = Number(core.malId) || null;
  const expectedAid = Number(media?.id) || null;
  const expectedMal = Number(media?.idMal) || null;
  if (!(aid && expectedAid && aid === expectedAid) && !(mal && expectedMal && mal === expectedMal)) {
    throw new Error(`Ani.pm bootstrap identity mismatch for AniList ${expectedAid}`);
  }
  if (aid && expectedAid && aid !== expectedAid) throw new Error(`Ani.pm AniList identity mismatch for ${expectedAid}`);
  if (mal && expectedMal && mal !== expectedMal) throw new Error(`Ani.pm MAL identity mismatch for ${expectedMal}`);
  return core;
}
__name(verifyBootstrap, "verifyBootstrap");
async function bootstrap(series, episode, audio) {
  const language = audio === "dub" ? "dub" : "sub";
  const url = new URL(`/api/anime/playback-bootstrap/${encodeURIComponent(series.source)}/${encodeURIComponent(series.id)}`, SITE2);
  url.searchParams.set("ep", String(episode));
  url.searchParams.set("lang", language);
  url.searchParams.set("routes", "e4");
  return requestJson(url.href);
}
__name(bootstrap, "bootstrap");
async function resolveSeries8(anilistId, ctx = {}) {
  const key = `np:match2:anipm:${anilistId}`;
  const cached = get2(key);
  if (isFresh(cached)) return cached.data;
  const media = ctx.media ?? await getMedia(anilistId);
  const titles = titleVariants(media, ctx.anizip);
  if (!titles.length) throw new Error(`Ani.pm has no AniList titles for ${anilistId}`);
  const candidates = /* @__PURE__ */ new Map();
  const queries = buildTitleSearchQueries(titles, 16);
  for (let index = 0; index < queries.length; index += 4) {
    const batches = await Promise.all(queries.slice(index, index + 4).map(async (title2) => {
      try {
        const url = new URL("/api/anime/search", SITE2);
        url.searchParams.set("q", title2);
        const result = await requestJson(url.href);
        return Array.isArray(result) ? result : result?.items ?? result?.results ?? result?.data ?? [];
      } catch {
        return [];
      }
    }));
    for (const items of batches) {
      for (const item of items) {
        if (item?.id && identityMatches(item, media)) {
          const source = item.source || item.provider;
          if (source) candidates.set(`${source}:${item.id}`, { id: String(item.id), source: String(source), title: item.title || item.name || "" });
        }
      }
    }
  }
  for (const candidate of candidates.values()) {
    for (const episode of [1]) {
      try {
        const data = await bootstrap(candidate, episode, "sub");
        const core = verifyBootstrap(data, media);
        const episodes = Array.isArray(core.episodes) ? core.episodes : [];
        const series = {
          ...candidate,
          title: core.title || candidate.title,
          episodes,
          packages: data.anipmPackages?.episodes ?? data.packages?.episodes ?? {}
        };
        if (!episodes.length) continue;
        set(key, series, SHOW_IDENTITY_TTL);
        return series;
      } catch {
      }
    }
  }
  throw new Error(`Ani.pm could not confidently map AniList ${anilistId}`);
}
__name(resolveSeries8, "resolveSeries");
function episodeNumber2(item) {
  return Number(item?.number ?? item?.episode ?? item?.ep ?? item?.id);
}
__name(episodeNumber2, "episodeNumber");
function hasChannel(series, number, audio, hard = false) {
  const info3 = series.packages?.[String(number)];
  const flag = `${audio}${hard ? "hard" : ""}`;
  return info3?.[flag] === true;
}
__name(hasChannel, "hasChannel");
function episodeList2(anilistId, series, audio, ctx) {
  return series.episodes.filter((item) => Number.isInteger(episodeNumber2(item)) && hasChannel(series, episodeNumber2(item), audio)).map((item) => {
    const number = episodeNumber2(item);
    const meta = episodeMeta(number, ctx);
    return {
      id: `watch/anipm/${anilistId}/${audio}/anipm-${number}`,
      number,
      sourceNumber: String(item.number ?? item.episode ?? item.ep ?? number),
      title: meta.title ?? item.title ?? `Episode ${number}`,
      duration: meta.duration,
      audio,
      filler: meta.filler,
      uncensored: false,
      description: meta.description,
      image: meta.image,
      airDate: meta.airDate
    };
  });
}
__name(episodeList2, "episodeList");
async function getEpisodes11(anilistId, ctx = {}) {
  const media = ctx.media ?? await getMedia(anilistId);
  const series = await resolveSeries8(anilistId, { ...ctx, media });
  const sub = episodeList2(anilistId, series, "sub", ctx);
  const dub = episodeList2(anilistId, series, "dub", ctx);
  if (!sub.length && !dub.length) throw new Error(`Ani.pm has no episodes for AniList ${anilistId}`);
  return {
    meta: { id: series.id, title: series.title, source: "anipm", numbering: "standard", episodeOffset: 0 },
    episodes: { sub, dub }
  };
}
__name(getEpisodes11, "getEpisodes");
function mapSubtitles(items, referer) {
  if (!Array.isArray(items)) return [];
  return items.map((item) => {
    if (typeof item === "string") return { url: item, label: "Subtitle", srclang: "und", headers: { Referer: referer } };
    const url = item?.url ?? item?.src ?? item?.file;
    if (!url) return null;
    return {
      url,
      label: item.label ?? item.lang ?? item.language ?? "Subtitle",
      srclang: item.srclang ?? item.lang ?? item.language ?? "und",
      default: Boolean(item.default),
      headers: { Referer: referer }
    };
  }).filter(Boolean);
}
__name(mapSubtitles, "mapSubtitles");
async function getChannelUrl(series, episode, audio, channel2) {
  const url = new URL("/api/anime/settlar/session", SITE2);
  url.searchParams.set("selection", series.selection);
  url.searchParams.set("provider", "anipm");
  3;
  url.searchParams.set("ep", String(episode));
  url.searchParams.set("channel", channel2);
  url.searchParams.set("telemetry", "0");
  const result = await requestJson(url.href);
  const embedUrl = result?.embedUrl ?? result?.url;
  if (!embedUrl) throw new Error(`Ani.pm returned no Settlar embed for ${channel2}`);
  const embed = new URL(embedUrl);
  const token = embed.searchParams.get("t");
  if (!token) throw new Error(`Ani.pm Settlar embed is missing its session token for ${channel2}`);
  const sessionUrl = new URL("/api/embed/session", EMBED);
  sessionUrl.searchParams.set("t", token);
  const response = await wreq(sessionUrl.href, {
    headers: requestHeaders(embed.href),
    warm: [{ url: `${EMBED}/`, headers: { "User-Agent": UA13, Referer: embed.href } }]
  });
  const raw = await response.text();
  if (!response.ok) throw new Error(`Settlar session HTTP ${response.status}: ${raw.slice(0, 350)}`);
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error("Settlar returned invalid session JSON");
  }
  const source = data?.source ?? data?.sources?.[0]?.file ?? data?.sources?.[0]?.url;
  if (!source || !/^https?:\/\//i.test(source)) throw new Error(`Settlar returned no playable source for ${channel2}`);
  return {
    url: source,
    embedUrl: embed.href,
    referer: `${embed.origin}/`,
    subtitles: mapSubtitles(data.subtitles ?? data.tracks, `${SITE2}/`),
    audioLang: data.audioLang ?? data.audio ?? null
  };
}
__name(getChannelUrl, "getChannelUrl");
async function handleWatch12(anilistId, audio, epNum, ctx = {}) {
  const media = ctx.media ?? await getMedia(anilistId);
  const series = await resolveSeries8(anilistId, { ...ctx, media });
  const initial = await bootstrap(series, epNum, audio);
  const core = verifyBootstrap(initial, media);
  const episodes = Array.isArray(core.episodes) ? core.episodes : series.episodes;
  const providerEpisode = episodes.find((item) => episodeNumber2(item) === Number(epNum));
  const packageInfo = initial.anipmPackages?.episodes?.[String(epNum)] ?? initial.packages?.episodes?.[String(epNum)] ?? series.packages?.[String(epNum)];
  if (!providerEpisode || packageInfo?.[audio] !== true) throw new Error(`Ani.pm ${audio} episode ${epNum} is unavailable`);
  const selection = initial.settlarSelection;
  if (!selection) throw new Error("Ani.pm bootstrap is missing Settlar selection data");
  const currentSeries = { ...series, selection };
  const channels = [audio, ...packageInfo?.[`${audio}hard`] === true ? [`${audio}hard`] : []];
  const streams = [];
  for (const channel2 of channels) {
    try {
      const resolved2 = await getChannelUrl(currentSeries, epNum, audio, channel2);
      streams.push({
        url: resolved2.url,
        type: "hls",
        server: "Ani.pm",
        referer: resolved2.referer,
        embed: resolved2.embedUrl,
        subtitleType: channel2.endsWith("hard") ? "hardsub" : "softsub",
        audioLang: resolved2.audioLang,
        subtitles: resolved2.subtitles,
        priority: channel2.endsWith("hard") ? 4 : 5,
        isActive: streams.length === 0
      });
    } catch (error3) {
      if (channel2 === audio) throw error3;
    }
  }
  return json({
    anilistId: Number(anilistId),
    episode: Number(epNum),
    providerEpisode: Number(epNum),
    audio,
    intro: null,
    outro: null,
    streams
  });
}
__name(handleWatch12, "handleWatch");
var anipm_default = {
  async fetch(request3) {
    if (request3.method === "OPTIONS") return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,OPTIONS", "Access-Control-Allow-Headers": "*" } });
    const match = new URL(request3.url).pathname.match(/^\/watch\/anipm\/(\d+)\/(sub|dub)\/anipm-(\d+)\/?$/);
    if (!match) return json({ error: "Not found" }, 404);
    try {
      return await handleWatch12(match[1], match[2], match[3]);
    } catch (error3) {
      return json({ error: error3.message, "Raw-ERROR": error3.rawBody ?? null, stack: error3.stack }, error3.status ?? 500);
    }
  }
};

// core/episode-cache.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// core/episode-strategy.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var bgRunning = /* @__PURE__ */ new Set();
function bg(key, fn) {
  if (bgRunning.has(key)) return;
  bgRunning.add(key);
  Promise.resolve().then(fn).catch((e) => console.error(`[bg:${key}]`, e.message)).finally(() => bgRunning.delete(key));
}
__name(bg, "bg");
async function withCache(key, status, fetchFn) {
  const [ttl, refreshAfter] = episodeTTL(status);
  const entry = await getAsync(key);
  if (isFresh(entry)) {
    if (needsRefresh(entry)) {
      bg(key, async () => {
        const data2 = await fetchFn();
        await setAsync(key, data2, ttl, refreshAfter);
      });
    }
    return entry.data;
  }
  const data = await fetchFn();
  await setAsync(key, data, ttl, refreshAfter);
  return data;
}
__name(withCache, "withCache");
function orderEpisodeFields(data) {
  if (!data?.episodes || typeof data.episodes !== "object") return data;
  const episodes = Object.fromEntries(Object.entries(data.episodes).map(([audio, list]) => [
    audio,
    Array.isArray(list) ? list.map(({ id, audio: itemAudio, sourceNumber, ...episode }) => ({
      ...id === void 0 ? {} : { id },
      ...sourceNumber === void 0 ? {} : { sourceNumber },
      ...itemAudio === void 0 ? {} : { audio: itemAudio },
      ...episode
    })) : list
  ]));
  return { ...data, episodes };
}
__name(orderEpisodeFields, "orderEpisodeFields");
async function safe(label, fn) {
  try {
    return { ok: true, data: orderEpisodeFields(await fn()) };
  } catch (e) {
    console.error(`[ep:${label}]`, e.message);
    return { ok: false, error: e.message, stack: e.stack };
  }
}
__name(safe, "safe");
var PROVIDER_ALIASES = {
  mkissa: "mkissa",
  reanime: "reanime",
  anikoto: "anikoto",
  animegg: "animegg",
  animenosub: "animenosub",
  anizone: "anizone",
  aniwaves: "aniwaves",
  senshi: "senshi",
  kaa: "kaa",
  animedunya: "animedunya",
  animeonsen: "animeonsen",
  anipm: "anipm"
};
function resolveProviders(rawNames) {
  const resolved2 = /* @__PURE__ */ new Set();
  const unknown = [];
  for (const raw of rawNames) {
    const name = PROVIDER_ALIASES[raw.toLowerCase()];
    if (name) resolved2.add(name);
    else unknown.push(raw);
  }
  return { resolved: resolved2, unknown };
}
__name(resolveProviders, "resolveProviders");
function providerFns(anilistId, status, ctx) {
  return {
    mkissa: /* @__PURE__ */ __name(() => withCache(`epv:match2:mkissa:${anilistId}`, status, () => handleEpisodes(anilistId, ctx)), "mkissa"),
    reanime: /* @__PURE__ */ __name(() => withCache(`epv:match2:reanime:${anilistId}`, status, () => getEpisodes3(anilistId, ctx)), "reanime"),
    anikoto: /* @__PURE__ */ __name(() => withCache(`epv:match2:anikoto:${anilistId}`, status, () => getEpisodes(anilistId, ctx)), "anikoto"),
    animegg: /* @__PURE__ */ __name(() => withCache(`epv:match2:animegg:${anilistId}`, status, () => getEpisodes2(anilistId, ctx)), "animegg"),
    animenosub: /* @__PURE__ */ __name(() => withCache(`epv:match2:animenosub:${anilistId}`, status, () => getEpisodes4(anilistId, ctx)), "animenosub"),
    anizone: /* @__PURE__ */ __name(() => withCache(`epv:match2:anizone:${anilistId}`, status, () => getEpisodes5(anilistId, ctx)), "anizone"),
    aniwaves: /* @__PURE__ */ __name(() => withCache(`epv:match2:aniwaves:${anilistId}`, status, () => getEpisodes6(anilistId, ctx)), "aniwaves"),
    senshi: /* @__PURE__ */ __name(() => withCache(`epv:senshi:${anilistId}`, status, () => getEpisodes7(anilistId, ctx)), "senshi"),
    kaa: /* @__PURE__ */ __name(() => withCache(`epv:match2:kaa:${anilistId}`, status, () => getEpisodes8(anilistId, ctx)), "kaa"),
    animedunya: /* @__PURE__ */ __name(() => withCache(`epv:animedunya:${anilistId}`, status, () => getEpisodes9(anilistId, ctx)), "animedunya"),
    animeonsen: /* @__PURE__ */ __name(() => withCache(`epv:match2:animeonsen:${anilistId}`, status, () => getEpisodes10(anilistId, ctx)), "animeonsen"),
    anipm: /* @__PURE__ */ __name(() => withCache(`epv:match2:anipm:${anilistId}`, status, () => getEpisodes11(anilistId, ctx)), "anipm")
  };
}
__name(providerFns, "providerFns");
async function buildFilteredEpisodesWithCache(anilistId, providers, media, anizip) {
  const status = media?.status ?? "RELEASING";
  const ctx = { media, anizip, maxPages: void 0 };
  const fns = providerFns(anilistId, status, ctx);
  const pairs = await Promise.all(
    [...providers].map(async (name) => {
      const result = await safe(name, fns[name]);
      return [name, result.ok ? result.data : { error: result.error, stack: result.stack }];
    })
  );
  return Object.fromEntries(pairs);
}
__name(buildFilteredEpisodesWithCache, "buildFilteredEpisodesWithCache");
async function buildEpisodesWithCache(anilistId, media, anizip) {
  const status = media?.status ?? "RELEASING";
  const ctx = { media, anizip, maxPages: void 0 };
  const [mkissa, reanime, anikoto, animegg, animenosub, anizone, aniwaves, senshi, kaa, animedunya, animeonsen, anipm] = await Promise.all([
    safe("mkissa", () => withCache(`epv:match2:mkissa:${anilistId}`, status, () => handleEpisodes(anilistId, ctx))),
    safe("reanime", () => withCache(`epv:match2:reanime:${anilistId}`, status, () => getEpisodes3(anilistId, ctx))),
    safe("anikoto", () => withCache(`epv:match2:anikoto:${anilistId}`, status, () => getEpisodes(anilistId, ctx))),
    safe("animegg", () => withCache(`epv:match2:animegg:${anilistId}`, status, () => getEpisodes2(anilistId, ctx))),
    safe("animenosub", () => withCache(`epv:match2:animenosub:${anilistId}`, status, () => getEpisodes4(anilistId, ctx))),
    safe("anizone", () => withCache(`epv:match2:anizone:${anilistId}`, status, () => getEpisodes5(anilistId, ctx))),
    safe("aniwaves", () => withCache(`epv:match2:aniwaves:${anilistId}`, status, () => getEpisodes6(anilistId, ctx))),
    safe("senshi", () => withCache(`epv:senshi:${anilistId}`, status, () => getEpisodes7(anilistId, ctx))),
    safe("kaa", () => withCache(`epv:match2:kaa:${anilistId}`, status, () => getEpisodes8(anilistId, ctx))),
    safe("animedunya", () => withCache(`epv:animedunya:${anilistId}`, status, () => getEpisodes9(anilistId, ctx))),
    safe("animeonsen", () => withCache(`epv:match2:animeonsen:${anilistId}`, status, () => getEpisodes10(anilistId, ctx))),
    safe("anipm", () => withCache(`epv:match2:anipm:${anilistId}`, status, () => getEpisodes11(anilistId, ctx)))
  ]);
  return {
    mkissa: mkissa.ok ? mkissa.data : { error: mkissa.error, stack: mkissa.stack },
    reanime: reanime.ok ? reanime.data : { error: reanime.error, stack: reanime.stack },
    anikoto: anikoto.ok ? anikoto.data : { error: anikoto.error, stack: anikoto.stack },
    animegg: animegg.ok ? animegg.data : { error: animegg.error, stack: animegg.stack },
    animenosub: animenosub.ok ? animenosub.data : { error: animenosub.error, stack: animenosub.stack },
    anizone: anizone.ok ? anizone.data : { error: anizone.error, stack: anizone.stack },
    aniwaves: aniwaves.ok ? aniwaves.data : { error: aniwaves.error, stack: aniwaves.stack },
    senshi: senshi.ok ? senshi.data : { error: senshi.error, stack: senshi.stack },
    kaa: kaa.ok ? kaa.data : { error: kaa.error, stack: kaa.stack },
    animedunya: animedunya.ok ? animedunya.data : { error: animedunya.error, stack: animedunya.stack },
    animeonsen: animeonsen.ok ? animeonsen.data : { error: animeonsen.error, stack: animeonsen.stack },
    anipm: anipm.ok ? anipm.data : { error: anipm.error, stack: anipm.stack }
  };
}
__name(buildEpisodesWithCache, "buildEpisodesWithCache");

// core/episode-cache.js
var ANIZIP4 = "https://api.ani.zip/mappings";
var MIN2 = 6e4;
var HOUR2 = 60 * MIN2;
var DAY2 = 24 * HOUR2;
var FULL_TTL = 30 * DAY2;
var NORMAL_PROBE_INTERVAL = 15 * MIN2;
var AIRING_PROBE_INTERVAL = 5 * MIN2;
var AIRING_EARLY_WINDOW = 10 * MIN2;
var AIRING_FAST_WINDOW = 6 * HOUR2;
var refreshing = /* @__PURE__ */ new Set();
function runBackground(env2, promise) {
  const waitUntil = env2?.context?.waitUntil ?? env2?.waitUntil;
  if (typeof waitUntil === "function") waitUntil.call(env2.context ?? env2, promise);
  else promise.catch(() => {
  });
}
__name(runBackground, "runBackground");
function latestEpisodeFromResponse(data) {
  let max = 0;
  for (const provider of Object.values(data ?? {})) {
    const episodes = provider?.episodes;
    if (!episodes || typeof episodes !== "object") continue;
    for (const list of Object.values(episodes)) {
      if (!Array.isArray(list)) continue;
      for (const ep of list) {
        const n = Number(ep?.number);
        if (Number.isFinite(n) && n > max) max = n;
      }
    }
  }
  return max || null;
}
__name(latestEpisodeFromResponse, "latestEpisodeFromResponse");
function hasCurrentProviders(data) {
  return data && Object.prototype.hasOwnProperty.call(data, "anizone") && Object.prototype.hasOwnProperty.call(data, "aniwaves") && Object.prototype.hasOwnProperty.call(data, "animeonsen") && Object.prototype.hasOwnProperty.call(data, "anipm") && !Object.prototype.hasOwnProperty.call(data, "anihq");
}
__name(hasCurrentProviders, "hasCurrentProviders");
function latestEpisodeFromAniZip(anizip) {
  const nums = Object.keys(anizip?.episodes ?? {}).map(Number).filter(Number.isFinite);
  return nums.length ? Math.max(...nums) : null;
}
__name(latestEpisodeFromAniZip, "latestEpisodeFromAniZip");
function resolveShared(anilistId, freshMedia = false) {
  if (freshMedia) forgetMedia(anilistId);
  return Promise.all([
    getMedia(anilistId).catch(() => null),
    fetch(`${ANIZIP4}?anilist_id=${anilistId}`).then((r) => r.json()).catch(() => null)
  ]);
}
__name(resolveShared, "resolveShared");
async function clearProviderCache(anilistId, media) {
  for (const p of ["pahe", "manga", "mkissa", "reanime", "anikoto", "animegg", "anizone", "aniwaves", "animeonsen", "anipm"]) {
    await delAsync(`epv:${p}:${anilistId}`);
    if (p === "reanime" || p === "anikoto") {
      await delAsync(`epv:${p}:v2:${anilistId}`);
    }
    await delAsync(`epv:match2:${p}:${anilistId}`);
  }
  if (media?.idMal) {
    await delAsync(`jm:${media.idMal}`);
    await delByPrefixAsync(`jp:${media.idMal}:`);
  }
}
__name(clearProviderCache, "clearProviderCache");
async function buildResponse(anilistId, media, anizip, forceRefresh = false) {
  if (forceRefresh) await clearProviderCache(anilistId, media);
  const [providerResult, mappingResult] = await Promise.all([
    buildEpisodesWithCache(anilistId, media, anizip),
    mapAnimeIds(anilistId).catch(() => null)
  ]);
  return {
    page: 1,
    type: "all",
    mappings: mappingResult?.mappings ?? null,
    ...providerResult
  };
}
__name(buildResponse, "buildResponse");
function probeInterval(state) {
  const airMs = state?.nextAiringAt ? state.nextAiringAt * 1e3 : null;
  if (!airMs) return NORMAL_PROBE_INTERVAL;
  const now = Date.now();
  return now >= airMs - AIRING_EARLY_WINDOW && now <= airMs + AIRING_FAST_WINDOW ? AIRING_PROBE_INTERVAL : NORMAL_PROBE_INTERVAL;
}
__name(probeInterval, "probeInterval");
function shouldRebuild(entry, media, anizip) {
  if ((media?.status ?? "RELEASING") === "FINISHED") return false;
  const cachedLatest = latestEpisodeFromResponse(entry?.data) ?? 0;
  const knownLatest = Math.max(
    latestEpisodeFromAniZip(anizip) ?? 0,
    Number(media?.episodes) || 0
  );
  if (knownLatest > cachedLatest) return true;
  const next = media?.nextAiringEpisode;
  if (next?.episode && cachedLatest >= Number(next.episode)) return false;
  if (next?.airingAt) {
    const airMs = Number(next.airingAt) * 1e3;
    const now = Date.now();
    if (now < airMs - AIRING_EARLY_WINDOW) return false;
    if (now <= airMs + AIRING_FAST_WINDOW) return true;
  }
  return needsRefresh(entry);
}
__name(shouldRebuild, "shouldRebuild");
function writeSyncState(anilistId, state, ttl = FULL_TTL) {
  set(`sync:${anilistId}`, state, ttl, NORMAL_PROBE_INTERVAL);
}
__name(writeSyncState, "writeSyncState");
function scheduleRefresh(anilistId, entry, env2) {
  const key = `ep-bg:${anilistId}`;
  if (refreshing.has(key)) return;
  const syncKey = `sync:${anilistId}`;
  const oldState = get2(syncKey)?.data;
  const now = Date.now();
  if (oldState?.lastProbeAt && now - oldState.lastProbeAt < probeInterval(oldState)) return;
  refreshing.add(key);
  writeSyncState(anilistId, { ...oldState, lastProbeAt: now, syncing: true });
  const task = (async () => {
    const [media, anizip] = await resolveShared(anilistId, true);
    const cachedLatest = latestEpisodeFromResponse(entry?.data);
    const next = media?.nextAiringEpisode ?? null;
    if (!shouldRebuild(entry, media, anizip)) {
      writeSyncState(anilistId, {
        lastProbeAt: Date.now(),
        lastSyncAt: oldState?.lastSyncAt ?? null,
        latestEpisode: cachedLatest,
        nextEpisode: next?.episode ?? null,
        nextAiringAt: next?.airingAt ?? null,
        syncing: false
      });
      return;
    }
    const result = await buildResponse(anilistId, media, anizip, true);
    const latestEpisode = latestEpisodeFromResponse(result);
    await setAsync(`episodes:match3:${anilistId}`, result, FULL_TTL, NORMAL_PROBE_INTERVAL);
    writeSyncState(anilistId, {
      lastProbeAt: Date.now(),
      lastSyncAt: Date.now(),
      latestEpisode,
      nextEpisode: next?.episode ?? null,
      nextAiringAt: next?.airingAt ?? null,
      syncing: false
    });
  })().catch((e) => {
    console.error(`[ep-bg:${anilistId}]`, e.message);
    writeSyncState(anilistId, {
      ...oldState,
      lastProbeAt: Date.now(),
      syncing: false,
      error: e.message
    }, HOUR2);
  }).finally(() => refreshing.delete(key));
  runBackground(env2, task);
}
__name(scheduleRefresh, "scheduleRefresh");
async function getEpisodesResponse(anilistId, env2) {
  const cacheKey = `episodes:match3:${anilistId}`;
  const entry = await getAsync(cacheKey);
  if (entry && hasCurrentProviders(entry.data)) {
    scheduleRefresh(anilistId, entry, env2);
    return entry.data;
  }
  const [media, anizip] = await resolveShared(anilistId);
  const result = await buildResponse(anilistId, media, anizip);
  await setAsync(cacheKey, result, FULL_TTL, NORMAL_PROBE_INTERVAL);
  writeSyncState(anilistId, {
    lastProbeAt: Date.now(),
    lastSyncAt: Date.now(),
    latestEpisode: latestEpisodeFromResponse(result),
    nextEpisode: media?.nextAiringEpisode?.episode ?? null,
    nextAiringAt: media?.nextAiringEpisode?.airingAt ?? null,
    syncing: false
  });
  return result;
}
__name(getEpisodesResponse, "getEpisodesResponse");
async function getFilteredEpisodesResponse(anilistId, providers, includeMap) {
  const [media, anizip] = await resolveShared(anilistId);
  const [providerResult, mappingResult] = await Promise.all([
    buildFilteredEpisodesWithCache(anilistId, providers, media, anizip),
    includeMap ? mapAnimeIds(anilistId).catch(() => null) : Promise.resolve(null)
  ]);
  return {
    page: 1,
    type: "filtered",
    ...includeMap ? { mappings: mappingResult?.mappings ?? null } : {},
    ...providerResult
  };
}
__name(getFilteredEpisodesResponse, "getFilteredEpisodesResponse");

// docs/static-assets.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var LANDING_HTML = `<!DOCTYPE html>\r
<html lang="en">\r
<head>\r
  <meta charset="UTF-8"/>\r
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\r
  <title>Anivexa API</title>\r
  <link rel="icon" type="image/svg+xml" href="logo.svg"/>\r
  <link rel="preconnect" href="https://fonts.googleapis.com"/>\r
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>\r
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>\r
  <style>\r
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\r
\r
    :root {\r
      --bg:       #0c0c0f;\r
      --border:   #1e1e26;\r
      --text:     #e6e6f0;\r
      --muted:    #5a5a6e;\r
      --accent:   #818cf8;\r
      --purple:   #c084fc;\r
      --surface:  rgba(255,255,255,.04);\r
    }\r
\r
    html, body {\r
      height: 100%;\r
      background: var(--bg);\r
      color: var(--text);\r
      font-family: 'Inter', system-ui, sans-serif;\r
      -webkit-font-smoothing: antialiased;\r
      cursor: none;\r
    }\r
\r
    a, button, [role="button"] { cursor: none; }\r
\r
    .cursor-dot,\r
    .cursor-ring {\r
      position: fixed;\r
      top: 0; left: 0;\r
      pointer-events: none;\r
      z-index: 99999;\r
      will-change: transform;\r
      border-radius: 50%;\r
    }\r
\r
    .cursor-dot {\r
      width: 6px; height: 6px;\r
      background: #818cf8;\r
      margin: -3px 0 0 -3px;\r
      box-shadow: 0 0 10px rgba(129,140,248,.8);\r
      transition: opacity .2s;\r
    }\r
\r
    .cursor-ring {\r
      width: 36px; height: 36px;\r
      border: 1.5px solid rgba(129,140,248,.45);\r
      margin: -18px 0 0 -18px;\r
      transition: width .25s cubic-bezier(.22,1,.36,1),\r
                  height .25s cubic-bezier(.22,1,.36,1),\r
                  margin .25s cubic-bezier(.22,1,.36,1),\r
                  border-color .25s, background .25s, opacity .2s;\r
    }\r
\r
    .cursor-ring.is-hovering {\r
      width: 52px; height: 52px;\r
      margin: -26px 0 0 -26px;\r
      border-color: rgba(129,140,248,.7);\r
      background: rgba(129,140,248,.06);\r
    }\r
\r
    .cursor-dot.is-hovering  { opacity: 0; }\r
    .cursor-dot.is-hidden,\r
    .cursor-ring.is-hidden   { opacity: 0; }\r
\r
    .cursor-ring.is-clicking {\r
      width: 28px; height: 28px;\r
      margin: -14px 0 0 -14px;\r
      border-color: rgba(129,140,248,.9);\r
      background: rgba(129,140,248,.12);\r
    }\r
\r
    @media (prefers-reduced-motion: reduce) {\r
      .cursor-dot, .cursor-ring { display: none; }\r
      body { cursor: auto; }\r
    }\r
\r
    body {\r
      display: flex;\r
      flex-direction: column;\r
      align-items: center;\r
      justify-content: center;\r
      min-height: 100vh;\r
      padding: 24px;\r
      position: relative;\r
      overflow: hidden;\r
    }\r
\r
    .glow {\r
      position: absolute;\r
      width: 600px;\r
      height: 600px;\r
      border-radius: 50%;\r
      background: radial-gradient(circle, rgba(129,140,248,.08) 0%, transparent 70%);\r
      top: 50%;\r
      left: 50%;\r
      transform: translate(-50%, -60%);\r
      pointer-events: none;\r
    }\r
\r
    .card {\r
      position: relative;\r
      display: flex;\r
      flex-direction: column;\r
      align-items: center;\r
      text-align: center;\r
      max-width: 520px;\r
      width: 100%;\r
      z-index: 1;\r
    }\r
\r
    .logo {\r
      width: 80px;\r
      height: 80px;\r
      margin-bottom: 28px;\r
      filter: drop-shadow(0 0 28px rgba(129,140,248,.35));\r
    }\r
\r
    h1 {\r
      font-size: 42px;\r
      font-weight: 800;\r
      letter-spacing: -1.2px;\r
      line-height: 1;\r
      margin-bottom: 6px;\r
      background: linear-gradient(135deg, #e6e6f0 30%, #818cf8 100%);\r
      -webkit-background-clip: text;\r
      -webkit-text-fill-color: transparent;\r
      background-clip: text;\r
    }\r
\r
    .tagline {\r
      font-size: 13px;\r
      font-weight: 600;\r
      letter-spacing: .14em;\r
      text-transform: uppercase;\r
      color: var(--accent);\r
      margin-bottom: 20px;\r
      opacity: .8;\r
    }\r
\r
    .desc {\r
      font-size: 16px;\r
      line-height: 1.65;\r
      color: var(--muted);\r
      max-width: 400px;\r
      margin-bottom: 36px;\r
    }\r
\r
    .actions {\r
      display: flex;\r
      align-items: center;\r
      gap: 12px;\r
      flex-wrap: wrap;\r
      justify-content: center;\r
    }\r
\r
    .btn-primary {\r
      display: inline-flex;\r
      align-items: center;\r
      gap: 8px;\r
      padding: 11px 26px;\r
      background: var(--text);\r
      color: var(--bg);\r
      font-size: 14px;\r
      font-weight: 700;\r
      border-radius: 8px;\r
      text-decoration: none;\r
      transition: opacity .15s, transform .15s;\r
      letter-spacing: -.1px;\r
    }\r
\r
    .btn-primary:hover {\r
      opacity: .88;\r
      transform: translateY(-1px);\r
    }\r
\r
    .btn-primary svg {\r
      flex-shrink: 0;\r
    }\r
\r
    .icon-group {\r
      display: flex;\r
      align-items: center;\r
      gap: 8px;\r
    }\r
\r
    .btn-icon {\r
      display: inline-flex;\r
      align-items: center;\r
      justify-content: center;\r
      width: 42px;\r
      height: 42px;\r
      border: 1px solid var(--border);\r
      border-radius: 8px;\r
      color: var(--muted);\r
      background: transparent;\r
      text-decoration: none;\r
      transition: color .15s, border-color .15s, background .15s, transform .15s;\r
    }\r
\r
    .btn-icon:hover {\r
      color: var(--text);\r
      border-color: rgba(255,255,255,.15);\r
      background: var(--surface);\r
      transform: translateY(-1px);\r
    }\r
\r
    .badge-row {\r
      display: flex;\r
      align-items: center;\r
      gap: 8px;\r
      margin-top: 40px;\r
      flex-wrap: wrap;\r
      justify-content: center;\r
    }\r
\r
    .badge {\r
      font-size: 11px;\r
      font-weight: 600;\r
      letter-spacing: .05em;\r
      padding: 4px 10px;\r
      border-radius: 20px;\r
      border: 1px solid var(--border);\r
      color: var(--muted);\r
    }\r
\r
    footer {\r
      position: fixed;\r
      bottom: 0; left: 0; right: 0;\r
      display: flex;\r
      align-items: center;\r
      justify-content: center;\r
      padding: 20px;\r
      font-size: 12.5px;\r
      color: var(--muted);\r
      opacity: .5;\r
      transition: opacity .2s;\r
    }\r
\r
    footer:hover { opacity: 1; }\r
\r
    @media (max-width: 480px) {\r
      h1 { font-size: 32px; }\r
      .logo { width: 64px; height: 64px; }\r
      .desc { font-size: 15px; }\r
    }\r
  </style>\r
</head>\r
<body>\r
\r
<div class="cursor-dot"  id="cursorDot"  aria-hidden="true"></div>\r
<div class="cursor-ring" id="cursorRing" aria-hidden="true"></div>\r
\r
<div class="glow"></div>\r
\r
<div class="card">\r
  <img src="logo.svg" alt="Anivexa" class="logo"/>\r
\r
  <h1>Anivexa</h1>\r
  <p class="tagline">Streaming Aggregator API</p>\r
\r
  <p class="desc">\r
    A unified API for anime stream sources. Resolve episodes and watch links across 13 providers using a single AniList ID, with title and installment checks for fuzzy-search catalogs.\r
  </p>\r
\r
  <div class="actions">\r
    <a href="/docs" class="btn-primary">\r
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">\r
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>\r
        <polyline points="14 2 14 8 20 8"/>\r
        <line x1="16" y1="13" x2="8" y2="13"/>\r
        <line x1="16" y1="17" x2="8" y2="17"/>\r
        <polyline points="10 9 9 9 8 9"/>\r
      </svg>\r
      Get Started\r
    </a>\r
\r
    <div class="icon-group">\r
      <a href="https://github.com/walterwhite-69/Anivexa-API/" target="_blank" rel="noopener noreferrer" class="btn-icon" aria-label="GitHub">\r
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">\r
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>\r
        </svg>\r
      </a>\r
\r
      <a href="https://discord.com/invite/MARQ9z9QSX" target="_blank" rel="noopener noreferrer" class="btn-icon" aria-label="Discord">\r
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">\r
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2498-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8745-.6177-1.2498a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>\r
        </svg>\r
      </a>\r
    </div>\r
  </div>\r
\r
  <div class="badge-row">\r
    <span class="badge">13 Providers</span>\r
    <span class="badge">AniList ID</span>\r
    <span class="badge">No Auth</span>\r
    <span class="badge">CORS Enabled</span>\r
  </div>\r
</div>\r
\r
<footer>\xA9 2026 Anivexa. All rights reserved.</footer>\r
\r
<script>\r
  (function () {\r
    const dot  = document.getElementById('cursorDot');\r
    const ring = document.getElementById('cursorRing');\r
    if (!dot || !ring) return;\r
\r
    let mx = -200, my = -200, rx = -200, ry = -200, visible = false;\r
    const LERP = 0.22;\r
    const INTERACTIVES = 'a, button, [role="button"]';\r
\r
    (function tick() {\r
      rx += (mx - rx) * LERP;\r
      ry += (my - ry) * LERP;\r
      dot.style.transform  = \`translate(\${mx}px,\${my}px)\`;\r
      ring.style.transform = \`translate(\${Math.round(rx * 10) / 10}px,\${Math.round(ry * 10) / 10}px)\`;\r
      requestAnimationFrame(tick);\r
    })();\r
\r
    document.addEventListener('mousemove', e => {\r
      mx = e.clientX; my = e.clientY;\r
      if (!visible) { visible = true; rx = mx; ry = my; dot.classList.remove('is-hidden'); ring.classList.remove('is-hidden'); }\r
    }, { passive: true });\r
\r
    document.addEventListener('mouseleave', () => { dot.classList.add('is-hidden');    ring.classList.add('is-hidden');    visible = false; }, { passive: true });\r
    document.addEventListener('mouseenter', () => { dot.classList.remove('is-hidden'); ring.classList.remove('is-hidden'); visible = true;  }, { passive: true });\r
    document.addEventListener('mousedown',  () => { ring.classList.add('is-clicking');    ring.classList.remove('is-hovering'); }, { passive: true });\r
    document.addEventListener('mouseup',    () => { ring.classList.remove('is-clicking'); }, { passive: true });\r
    document.addEventListener('mouseover',  e => { if (e.target.closest(INTERACTIVES)) { dot.classList.add('is-hovering');    ring.classList.add('is-hovering');    } }, { passive: true });\r
    document.addEventListener('mouseout',   e => { if (e.target.closest(INTERACTIVES)) { dot.classList.remove('is-hovering'); ring.classList.remove('is-hovering'); } }, { passive: true });\r
\r
    window.addEventListener('touchstart', () => { dot.style.display = 'none'; ring.style.display = 'none'; document.body.style.cursor = ''; }, { once: true, passive: true });\r
  })();\r
<\/script>\r
</body>\r
</html>\r
`;
var INDEX_HTML = `<!DOCTYPE html>\r
<html lang="en">\r
<head>\r
  <meta charset="UTF-8"/>\r
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\r
  <title>Anivexa API \u2014 Docs</title>\r
  <meta name="description" content="Anivexa API documentation \u2014 a unified anime streaming aggregator API with 12 providers, AniList ID mapping, and guarded fuzzy matching."/>\r
  <link rel="icon" type="image/svg+xml" href="logo.svg"/>\r
  <link rel="preconnect" href="https://fonts.googleapis.com"/>\r
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>\r
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet"/>\r
  <link rel="stylesheet" href="style.css"/>\r
</head>\r
<body>\r
\r
<div class="cursor-dot"  id="cursorDot"  aria-hidden="true"></div>\r
<div class="cursor-ring" id="cursorRing" aria-hidden="true"></div>\r
\r
<div class="bg-orbs" aria-hidden="true">\r
  <div class="bg-orb bg-orb-1"></div>\r
  <div class="bg-orb bg-orb-2"></div>\r
  <div class="bg-orb bg-orb-3"></div>\r
</div>\r
\r
<div class="overlay" id="overlay"></div>\r
\r
<div class="topbar">\r
  <img src="logo.svg" alt="Anivexa"/>\r
  <span class="topbar-title">Anivexa</span>\r
  <button class="menu-btn" id="menuBtn" aria-label="Toggle menu">\r
    <span></span><span></span><span></span>\r
  </button>\r
</div>\r
\r
<nav class="sidebar" id="sidebar">\r
    <div class="logo">\r
      <img src="logo.svg" alt="Anivexa"/>\r
      <span class="logo-text">Anivexa API</span>\r
      <span class="logo-version">v{{API_VERSION}}</span>\r
    </div>\r
    <div class="nav">\r
      <div class="nav-section">\r
        <div class="nav-label">Getting Started</div>\r
        <a class="nav-item" href="#overview">Overview</a>\r
        <a class="nav-item" href="#base-url">Base URL</a>\r
        <a class="nav-item" href="#providers-ref">Providers</a>\r
      </div>\r
      <div class="nav-section">\r
        <div class="nav-label">Core</div>\r
        <a class="nav-item" href="#ep-info"><span class="method">GET</span>API Info</a>\r
        <a class="nav-item" href="#ep-map"><span class="method">GET</span>Map IDs</a>\r
        <a class="nav-item" href="#ep-episodes"><span class="method">GET</span>Episodes</a>\r
        <a class="nav-item" href="#ep-episodes-filtered"><span class="method">GET</span>Episodes (Filtered)</a>\r
      </div>\r
      <div class="nav-section">\r
        <div class="nav-label">Watch</div>\r
        <a class="nav-item" href="#watch-mkissa"><span class="method">GET</span>MKissa</a>\r
        <a class="nav-item" href="#watch-reanime"><span class="method">GET</span>Reanime</a>\r
        <a class="nav-item" href="#watch-anikoto"><span class="method">GET</span>Anikoto</a>\r
        <a class="nav-item" href="#watch-animegg"><span class="method">GET</span>AnimeGG</a>\r
        <a class="nav-item" href="#watch-animenosub"><span class="method">GET</span>AnimeNoSub</a>\r
        <a class="nav-item" href="#watch-anizone"><span class="method">GET</span>AniZone</a>\r
        <a class="nav-item" href="#watch-aniwaves"><span class="method">GET</span>AniWaves</a>\r
        <a class="nav-item" href="#watch-senshi"><span class="method">GET</span>Senshi</a>\r
        <a class="nav-item" href="#watch-kaa"><span class="method">GET</span>KickAssAnime</a>\r
        <a class="nav-item" href="#watch-animedunya"><span class="method">GET</span>AnimeDunya</a>\r
        <a class="nav-item" href="#watch-animeonsen"><span class="method">GET</span>AnimeOnsen</a>\r
        <a class="nav-item" href="#watch-anipm"><span class="method">GET</span>Ani.pm</a>\r
      </div>\r
    </div>\r
  </nav>\r
\r
<div class="layout">\r
\r
  <main class="main">\r
\r
    <section class="section section-hero" id="overview">\r
      <img src="logo.svg" alt="Anivexa" class="hero-logo"/>\r
      <h1>Anivexa API</h1>\r
      <p>A unified anime streaming aggregator API. Resolve episode lists and stream sources across 12 providers using a single AniList ID, with title and installment checks for fuzzy-search catalogs.</p>\r
      <div class="callout">\r
        <span class="callout-icon">\u{1F4A1}</span>\r
        <span>All endpoints are read-only. No authentication required. All responses are JSON with CORS headers included.</span>\r
      </div>\r
    </section>\r
\r
    <section class="section" id="base-url">\r
      <h2>Base URL</h2>\r
      <p>All requests are made to the root of the server. When running locally:</p>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">BASE</span>\r
          <span class="endpoint-path">http://localhost:4000</span>\r
        </div>\r
      </div>\r
      <p>Replace with your deployed URL when in production. Every response includes <code>Access-Control-Allow-Origin: *</code>.</p>\r
    </section>\r
\r
    <section class="section" id="providers-ref">\r
      <h2>Providers</h2>\r
      <p>Twelve providers are available. They resolve from AniList IDs; fuzzy-search catalogs validate titles and installment markers before selecting a match.</p>\r
      <div class="provider-grid">\r
        <div class="provider-card" style="--i:0"><div class="provider-name">mkissa</div><div class="provider-meta">MKissa</div></div>\r
        <div class="provider-card" style="--i:1"><div class="provider-name">reanime</div><div class="provider-meta">Reanime</div></div>\r
        <div class="provider-card" style="--i:2"><div class="provider-name">anikoto</div><div class="provider-meta">Anikoto</div></div>\r
        <div class="provider-card" style="--i:3"><div class="provider-name">animegg</div><div class="provider-meta">AnimeGG</div></div>\r
        <div class="provider-card" style="--i:7"><div class="provider-name">animenosub</div><div class="provider-meta">AnimeNoSub</div></div>\r
        <div class="provider-card" style="--i:8"><div class="provider-name">anizone</div><div class="provider-meta">AniZone</div></div>\r
        <div class="provider-card" style="--i:9"><div class="provider-name">aniwaves</div><div class="provider-meta">AniWaves</div></div>\r
        <div class="provider-card" style="--i:11"><div class="provider-name">senshi</div><div class="provider-meta">Senshi</div></div>\r
        <div class="provider-card" style="--i:12"><div class="provider-name">kaa</div><div class="provider-meta">KickAssAnime</div></div>\r
        <div class="provider-card" style="--i:13"><div class="provider-name">animedunya</div><div class="provider-meta">AnimeDunya</div></div>\r
        <div class="provider-card" style="--i:14"><div class="provider-name">animeonsen</div><div class="provider-meta">AnimeOnsen</div></div>\r
        <div class="provider-card" style="--i:15"><div class="provider-name">anipm</div><div class="provider-meta">Ani.pm</div></div>\r
      </div>\r
    </section>\r
\r
    <hr class="divider"/>\r
\r
    <section class="section" id="ep-info">\r
      <h2>API Info</h2>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">GET</span>\r
          <span class="endpoint-path">/</span>\r
          <a class="try-btn" href="/" target="_blank">Try it \u2197</a>\r
        </div>\r
        <div class="endpoint-body">\r
          <p class="endpoint-desc">Returns API metadata: version, cache status, list of active providers, and all registered routes.</p>\r
        </div>\r
        <div class="code-label">Response</div>\r
        <pre><code><span class="p">{</span>\r
  <span class="n">"name"</span><span class="p">:</span> <span class="s">"Anivexa API {{API_VERSION}}"</span><span class="p">,</span>\r
  <span class="n">"cache"</span><span class="p">:</span> <span class="b">false</span><span class="p">,</span>\r
  <span class="n">"providers"</span><span class="p">: [</span><span class="s">"mkissa"</span><span class="p">,</span> <span class="s">"reanime"</span><span class="p">,</span> <span class="s">"..."</span><span class="p">],</span>\r
  <span class="n">"routes"</span><span class="p">: [</span><span class="s">"/map/:anilistId"</span><span class="p">,</span> <span class="s">"..."</span><span class="p">]</span>\r
<span class="p">}</span></code></pre>\r
      </div>\r
    </section>\r
\r
    <section class="section" id="ep-map">\r
      <h2>Map IDs</h2>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">GET</span>\r
          <span class="endpoint-path">/map/<span class="param">:anilistId</span></span>\r
          <a class="try-btn" href="/map/16498" target="_blank">Try it \u2197</a>\r
        </div>\r
        <div class="endpoint-body">\r
          <p class="endpoint-desc">Resolves an AniList ID to its equivalents across other databases (MAL, Kitsu, etc.).</p>\r
          <table class="params-table">\r
            <thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead>\r
            <tbody>\r
              <tr><td class="param-name">:anilistId</td><td class="param-type">integer</td><td class="param-desc">AniList media ID</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
        <div class="code-label">Example \u2014 /map/16498</div>\r
        <pre><code><span class="p">{</span>\r
  <span class="n">"anilistId"</span><span class="p">:</span> <span class="b">16498</span><span class="p">,</span>\r
  <span class="n">"malId"</span><span class="p">:</span> <span class="b">16498</span><span class="p">,</span>\r
  <span class="n">"kitsuId"</span><span class="p">:</span> <span class="b">7442</span>\r
<span class="p">}</span></code></pre>\r
      </div>\r
    </section>\r
\r
    <section class="section" id="ep-episodes">\r
      <h2>Episodes</h2>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">GET</span>\r
          <span class="endpoint-path">/episodes/<span class="param">:anilistId</span></span>\r
          <a class="try-btn" href="/episodes/16498" target="_blank">Try it \u2197</a>\r
        </div>\r
        <div class="endpoint-body">\r
          <p class="endpoint-desc">Fetches episode lists from all providers in parallel for the given AniList ID. Each provider key contains either its episode data or an error object if unavailable.</p>\r
          <table class="params-table">\r
            <thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead>\r
            <tbody>\r
              <tr><td class="param-name">:anilistId</td><td class="param-type">integer</td><td class="param-desc">AniList media ID</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
        <div class="code-label">Response shape</div>\r
        <pre><code><span class="p">{</span>\r
  <span class="n">"reanime"</span><span class="p">: {</span>\r
    <span class="n">"meta"</span><span class="p">: {</span> <span class="n">"title"</span><span class="p">:</span> <span class="s">"Attack on Titan"</span><span class="p">,</span> <span class="n">"malId"</span><span class="p">:</span> <span class="b">16498</span> <span class="p">},</span>\r
    <span class="n">"episodes"</span><span class="p">: {</span>\r
      <span class="n">"sub"</span><span class="p">: [</span>\r
        <span class="p">{</span>\r
          <span class="n">"id"</span><span class="p">:</span>     <span class="s">"watch/reanime/16498/sub/reanime-1"</span><span class="p">,</span>\r
          <span class="n">"number"</span><span class="p">:</span> <span class="b">1</span><span class="p">,</span>\r
          <span class="n">"title"</span><span class="p">:</span>  <span class="s">"To You, 2,000 Years in the Future"</span><span class="p">,</span>\r
          <span class="n">"filler"</span><span class="p">:</span> <span class="b">false</span><span class="p">,</span>\r
          <span class="n">"audio"</span><span class="p">:</span>  <span class="s">"sub"</span>\r
        <span class="p">}</span>\r
      <span class="p">],</span>\r
      <span class="n">"dub"</span><span class="p">: [</span> <span class="s">"..."</span> <span class="p">]</span>\r
    <span class="p">}</span>\r
  <span class="p">},</span>\r
  <span class="n">"senshi"</span><span class="p">: {</span> <span class="s">"..."</span> <span class="p">},</span>\r
<span class="p">}</span></code></pre>\r
      </div>\r
    </section>\r
\r
    <section class="section" id="ep-episodes-filtered">\r
      <h2>Episodes (Filtered)</h2>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">GET</span>\r
          <span class="endpoint-path">/episodes/<span class="param">:provider</span>/<span class="param">:anilistId</span></span>\r
          <a class="try-btn" href="/episodes/reanime/16498" target="_blank">Try it \u2197</a>\r
        </div>\r
        <div class="endpoint-body">\r
          <p class="endpoint-desc">Fetch episode data from one or more specific providers. Chain multiple provider names in the path. Use <code>?map=false</code> to skip the ID map lookup.</p>\r
          <table class="params-table">\r
            <thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead>\r
            <tbody>\r
              <tr><td class="param-name">:provider</td><td class="param-type">string</td><td class="param-desc">One or more provider slugs separated by <code>/</code></td></tr>\r
              <tr><td class="param-name">:anilistId</td><td class="param-type">integer</td><td class="param-desc">AniList media ID</td></tr>\r
              <tr><td class="param-name">?map</td><td class="param-type">boolean</td><td class="param-desc">Include ID map in response (default: <code>true</code>)</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
        <div class="code-label">Examples</div>\r
        <pre><code><span class="k">GET</span> /episodes/reanime/16498\r
<span class="k">GET</span> /episodes/reanime/senshi/16498\r
<span class="k">GET</span> /episodes/reanime/senshi/16498<span class="p">?map=false</span></code></pre>\r
      </div>\r
    </section>\r
\r
    <hr class="divider"/>\r
\r
    <section class="section" id="watch-mkissa">\r
      <h2>MKissa</h2>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">GET</span>\r
          <span class="endpoint-path">/watch/mkissa/<span class="param">:id</span>/<span class="param">sub|dub</span>/mkissa-<span class="param">:ep</span></span>\r
          <a class="try-btn" href="/watch/mkissa/16498/sub/mkissa-1" target="_blank">Try it \u2197</a>\r
        </div>\r
        <div class="endpoint-body">\r
          <p class="endpoint-desc">Returns stream sources for the given MKissa episode. The episode ID comes directly from the <code>id</code> field in the episodes list response.</p>\r
          <table class="params-table">\r
            <thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead>\r
            <tbody>\r
              <tr><td class="param-name">:id</td><td class="param-type">integer</td><td class="param-desc">AniList media ID</td></tr>\r
              <tr><td class="param-name">sub|dub</td><td class="param-type">string</td><td class="param-desc">Audio track preference</td></tr>\r
              <tr><td class="param-name">:ep</td><td class="param-type">integer</td><td class="param-desc">Episode number</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
        <div class="code-label">Response</div>\r
        <pre><code><span class="p">{</span>\r
  <span class="n">"anilistId"</span><span class="p">:</span> <span class="b">16498</span><span class="p">,</span>\r
  <span class="n">"episode"</span><span class="p">:</span>   <span class="b">1</span><span class="p">,</span>\r
  <span class="n">"audio"</span><span class="p">:</span>     <span class="s">"sub"</span><span class="p">,</span>\r
  <span class="n">"streams"</span><span class="p">: [</span>\r
    <span class="p">{</span>\r
      <span class="n">"url"</span><span class="p">:</span>      <span class="s">"https://..."</span><span class="p">,</span>\r
      <span class="n">"type"</span><span class="p">:</span>     <span class="s">"hls"</span><span class="p">,</span>\r
      <span class="n">"server"</span><span class="p">:</span>   <span class="s">"Server Name"</span><span class="p">,</span>\r
      <span class="n">"referer"</span><span class="p">:</span>  <span class="s">"https://..."</span><span class="p">,</span>\r
      <span class="n">"priority"</span><span class="p">:</span> <span class="b">5</span><span class="p">,</span>\r
      <span class="n">"isActive"</span><span class="p">:</span> <span class="b">true</span>\r
    <span class="p">}</span>\r
  <span class="p">]</span>\r
<span class="p">}</span></code></pre>\r
      </div>\r
    </section>\r
\r
    <section class="section" id="watch-reanime">\r
      <h2>Reanime</h2>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">GET</span>\r
          <span class="endpoint-path">/watch/reanime/<span class="param">:id</span>/<span class="param">sub|dub</span>/reanime-<span class="param">:ep</span></span>\r
          <a class="try-btn" href="/watch/reanime/16498/sub/reanime-1" target="_blank">Try it \u2197</a>\r
        </div>\r
        <div class="endpoint-body">\r
          <p class="endpoint-desc">Resolves stream sources from Reanime using AniList ID confirmation via cover image CDN URLs and detail endpoint matching. Returns decrypted HLS streams.</p>\r
          <table class="params-table">\r
            <thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead>\r
            <tbody>\r
              <tr><td class="param-name">:id</td><td class="param-type">integer</td><td class="param-desc">AniList media ID</td></tr>\r
              <tr><td class="param-name">sub|dub</td><td class="param-type">string</td><td class="param-desc">Audio track preference</td></tr>\r
              <tr><td class="param-name">:ep</td><td class="param-type">integer</td><td class="param-desc">Episode number</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">GET</span>\r
          <span class="endpoint-path">/stream/reanime/<span class="param">:id</span>/<span class="param">sub|dub</span>/<span class="param">:ep</span></span>\r
          <a class="try-btn" href="/stream/reanime/16498/sub/1" target="_blank">Try it \u2197</a>\r
        </div>\r
        <div class="endpoint-body">\r
          <p class="endpoint-desc">Direct stream variant \u2014 returns the raw stream response without the watch wrapper. Useful for direct playback.</p>\r
        </div>\r
      </div>\r
    </section>\r
\r
    <section class="section" id="watch-anikoto">\r
      <h2>Anikoto</h2>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">GET</span>\r
          <span class="endpoint-path">/watch/anikoto/<span class="param">:id</span>/<span class="param">sub|dub</span>/anikoto-<span class="param">:ep</span></span>\r
          <a class="try-btn" href="/watch/anikoto/16498/sub/anikoto-1" target="_blank">Try it \u2197</a>\r
        </div>\r
        <div class="endpoint-body">\r
          <p class="endpoint-desc">Returns stream sources from Anikoto for the specified episode.</p>\r
          <table class="params-table">\r
            <thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead>\r
            <tbody>\r
              <tr><td class="param-name">:id</td><td class="param-type">integer</td><td class="param-desc">AniList media ID</td></tr>\r
              <tr><td class="param-name">sub|dub</td><td class="param-type">string</td><td class="param-desc">Audio track preference</td></tr>\r
              <tr><td class="param-name">:ep</td><td class="param-type">integer</td><td class="param-desc">Episode number</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </section>\r
\r
    <section class="section" id="watch-animegg">\r
      <h2>AnimeGG</h2>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">GET</span>\r
          <span class="endpoint-path">/watch/animegg/<span class="param">:id</span>/<span class="param">sub|dub</span>/animegg-<span class="param">:ep</span></span>\r
          <a class="try-btn" href="/watch/animegg/16498/sub/animegg-1" target="_blank">Try it \u2197</a>\r
        </div>\r
        <div class="endpoint-body">\r
          <p class="endpoint-desc">Returns stream sources from AnimeGG for the specified episode.</p>\r
          <table class="params-table">\r
            <thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead>\r
            <tbody>\r
              <tr><td class="param-name">:id</td><td class="param-type">integer</td><td class="param-desc">AniList media ID</td></tr>\r
              <tr><td class="param-name">sub|dub</td><td class="param-type">string</td><td class="param-desc">Audio track preference</td></tr>\r
              <tr><td class="param-name">:ep</td><td class="param-type">integer</td><td class="param-desc">Episode number</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </section>\r
\r
    <section class="section" id="watch-animenosub">\r
      <h2>AnimeNoSub</h2>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">GET</span>\r
          <span class="endpoint-path">/watch/animenosub/<span class="param">:id</span>/<span class="param">sub|dub</span>/animenosub-<span class="param">:ep</span></span>\r
          <a class="try-btn" href="/watch/animenosub/199547/sub/animenosub-1" target="_blank">Try it \u2197</a>\r
        </div>\r
        <div class="endpoint-body">\r
          <p class="endpoint-desc">Returns stream sources from AnimeNoSub for the specified episode.</p>\r
          <table class="params-table">\r
            <thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead>\r
            <tbody>\r
              <tr><td class="param-name">:id</td><td class="param-type">integer</td><td class="param-desc">AniList media ID</td></tr>\r
              <tr><td class="param-name">sub|dub</td><td class="param-type">string</td><td class="param-desc">Audio track preference</td></tr>\r
              <tr><td class="param-name">:ep</td><td class="param-type">integer</td><td class="param-desc">Episode number</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </section>\r
\r
    <section class="section" id="watch-anizone">\r
      <h2>AniZone</h2>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">GET</span>\r
          <span class="endpoint-path">/watch/anizone/<span class="param">:id</span>/<span class="param">sub|dub</span>/anizone-<span class="param">:ep</span></span>\r
          <a class="try-btn" href="/watch/anizone/199547/sub/anizone-1" target="_blank">Try it \u2197</a>\r
        </div>\r
        <div class="endpoint-body">\r
          <p class="endpoint-desc">Returns stream sources from AniZone for the specified episode.</p>\r
          <table class="params-table">\r
            <thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead>\r
            <tbody>\r
              <tr><td class="param-name">:id</td><td class="param-type">integer</td><td class="param-desc">AniList media ID</td></tr>\r
              <tr><td class="param-name">sub|dub</td><td class="param-type">string</td><td class="param-desc">Audio track preference</td></tr>\r
              <tr><td class="param-name">:ep</td><td class="param-type">integer</td><td class="param-desc">Episode number</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </section>\r
\r
    <section class="section" id="watch-aniwaves">\r
      <h2>AniWaves</h2>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">GET</span>\r
          <span class="endpoint-path">/watch/aniwaves/<span class="param">:id</span>/<span class="param">sub|dub</span>/aniwaves-<span class="param">:ep</span></span>\r
          <a class="try-btn" href="/watch/aniwaves/16498/sub/aniwaves-1" target="_blank">Try it \u2197</a>\r
        </div>\r
        <div class="endpoint-body">\r
          <p class="endpoint-desc">Returns AniWaves stream sources for the specified episode, including direct HLS from Vidplay, MyCloud, and BYFMS, DATASV quality MP4 sources, and embed fallbacks.</p>\r
          <table class="params-table">\r
            <thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead>\r
            <tbody>\r
              <tr><td class="param-name">:id</td><td class="param-type">integer</td><td class="param-desc">AniList media ID</td></tr>\r
              <tr><td class="param-name">sub|dub</td><td class="param-type">string</td><td class="param-desc">Audio track preference</td></tr>\r
              <tr><td class="param-name">:ep</td><td class="param-type">integer</td><td class="param-desc">Episode number</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </section>\r
\r
    <section class="section" id="watch-senshi">\r
      <h2>Senshi</h2>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">GET</span>\r
          <span class="endpoint-path">/watch/senshi/<span class="param">:id</span>/<span class="param">sub|dub</span>/senshi-<span class="param">:ep</span></span>\r
          <a class="try-btn" href="/watch/senshi/16498/sub/senshi-1" target="_blank">Try it \u2197</a>\r
        </div>\r
        <div class="endpoint-body">\r
          <p class="endpoint-desc">Returns stream sources from Senshi. Uses MAL ID directly \u2014 no slug resolution. Returns all available sources including HLS, alternate servers, FileMoon embeds, and download links when present.</p>\r
          <table class="params-table">\r
            <thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead>\r
            <tbody>\r
              <tr><td class="param-name">:id</td><td class="param-type">integer</td><td class="param-desc">AniList media ID</td></tr>\r
              <tr><td class="param-name">sub|dub</td><td class="param-type">string</td><td class="param-desc">Audio track preference</td></tr>\r
              <tr><td class="param-name">:ep</td><td class="param-type">integer</td><td class="param-desc">Episode number</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
        <div class="code-label">Response</div>\r
        <pre><code><span class="p">{</span>\r
  <span class="n">"anilistId"</span><span class="p">:</span>  <span class="b">16498</span><span class="p">,</span>\r
  <span class="n">"malId"</span><span class="p">:</span>      <span class="b">16498</span><span class="p">,</span>\r
  <span class="n">"episode"</span><span class="p">:</span>    <span class="b">1</span><span class="p">,</span>\r
  <span class="n">"audio"</span><span class="p">:</span>      <span class="s">"sub"</span><span class="p">,</span>\r
  <span class="n">"intro"</span><span class="p">:</span>      <span class="p">{</span> <span class="n">"start"</span><span class="p">:</span> <span class="b">123</span><span class="p">,</span> <span class="n">"end"</span><span class="p">:</span> <span class="b">215</span> <span class="p">},</span>\r
  <span class="n">"outro"</span><span class="p">:</span>      <span class="p">{</span> <span class="n">"start"</span><span class="p">:</span> <span class="b">1435</span><span class="p">,</span> <span class="n">"end"</span><span class="p">:</span> <span class="b">1525</span> <span class="p">},</span>\r
  <span class="n">"streams"</span><span class="p">: [</span>\r
    <span class="p">{</span> <span class="n">"url"</span><span class="p">:</span> <span class="s">"https://ninstream.com/.../playlist.m3u8"</span><span class="p">,</span> <span class="n">"type"</span><span class="p">:</span> <span class="s">"hls"</span><span class="p">,</span>   <span class="n">"server"</span><span class="p">:</span> <span class="s">"Senshi"</span><span class="p">,</span>   <span class="n">"priority"</span><span class="p">:</span> <span class="b">5</span><span class="p">,</span> <span class="n">"isActive"</span><span class="p">:</span> <span class="b">true</span>  <span class="p">},</span>\r
    <span class="p">{</span> <span class="n">"url"</span><span class="p">:</span> <span class="s">"https://streamnin.xyz/d/..."</span><span class="p">,</span>              <span class="n">"type"</span><span class="p">:</span> <span class="s">"embed"</span><span class="p">,</span> <span class="n">"server"</span><span class="p">:</span> <span class="s">"StreamNin"</span><span class="p">,</span> <span class="n">"priority"</span><span class="p">:</span> <span class="b">3</span><span class="p">,</span> <span class="n">"isActive"</span><span class="p">:</span> <span class="b">false</span> <span class="p">},</span>\r
    <span class="p">{</span> <span class="n">"url"</span><span class="p">:</span> <span class="s">"https://bysesayeveum.com/e/..."</span><span class="p">,</span>             <span class="n">"type"</span><span class="p">:</span> <span class="s">"embed"</span><span class="p">,</span> <span class="n">"server"</span><span class="p">:</span> <span class="s">"FileMoon"</span><span class="p">,</span>  <span class="n">"priority"</span><span class="p">:</span> <span class="b">2</span><span class="p">,</span> <span class="n">"isActive"</span><span class="p">:</span> <span class="b">false</span> <span class="p">}</span>\r
  <span class="p">],</span>\r
  <span class="n">"downloads"</span><span class="p">: [</span>\r
    <span class="p">{</span> <span class="n">"url"</span><span class="p">:</span> <span class="s">"https://bzzhr.to/..."</span><span class="p">,</span> <span class="n">"label"</span><span class="p">:</span> <span class="s">"Download"</span> <span class="p">}</span>\r
  <span class="p">]</span>\r
<span class="p">}</span></code></pre>\r
      </div>\r
    </section>\r
\r
    <section class="section" id="watch-kaa">\r
      <h2>KickAssAnime</h2>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">GET</span>\r
          <span class="endpoint-path">/watch/kaa/<span class="param">:id</span>/<span class="param">sub|dub</span>/kaa-<span class="param">:ep</span></span>\r
          <a class="try-btn" href="/watch/kaa/21/sub/kaa-1" target="_blank">Try it \u2197</a>\r
        </div>\r
        <div class="endpoint-body">\r
          <p class="endpoint-desc">Returns stream sources from KickAssAnime for the specified episode. Streams are served via CatStream (HLS) and require the included <code>Referer</code> header for playback.</p>\r
          <table class="params-table">\r
            <thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead>\r
            <tbody>\r
              <tr><td class="param-name">:id</td><td class="param-type">integer</td><td class="param-desc">AniList media ID</td></tr>\r
              <tr><td class="param-name">sub|dub</td><td class="param-type">string</td><td class="param-desc">Audio track preference</td></tr>\r
              <tr><td class="param-name">:ep</td><td class="param-type">integer</td><td class="param-desc">Episode number</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
        <div class="code-label">Response</div>\r
        <pre><code><span class="p">{</span>\r
  <span class="n">"anilistId"</span><span class="p">:</span> <span class="b">21</span><span class="p">,</span>\r
  <span class="n">"episode"</span><span class="p">:</span>   <span class="b">1</span><span class="p">,</span>\r
  <span class="n">"audio"</span><span class="p">:</span>     <span class="s">"sub"</span><span class="p">,</span>\r
  <span class="n">"streams"</span><span class="p">: [</span>\r
    <span class="p">{</span>\r
      <span class="n">"url"</span><span class="p">:</span>      <span class="s">"https://hls.krussdomi.com/manifest/.../master.m3u8"</span><span class="p">,</span>\r
      <span class="n">"type"</span><span class="p">:</span>     <span class="s">"hls"</span><span class="p">,</span>\r
      <span class="n">"server"</span><span class="p">:</span>   <span class="s">"CatStream"</span><span class="p">,</span>\r
      <span class="n">"headers"</span><span class="p">: {</span> <span class="n">"Referer"</span><span class="p">:</span> <span class="s">"https://krussdomi.com/"</span> <span class="p">},</span>\r
      <span class="n">"priority"</span><span class="p">:</span> <span class="b">1</span><span class="p">,</span>\r
      <span class="n">"isActive"</span><span class="p">:</span> <span class="b">true</span>\r
    <span class="p">}</span>\r
  <span class="p">]</span>\r
<span class="p">}</span></code></pre>\r
      </div>\r
    </section>\r
\r
    <section class="section" id="watch-animedunya">\r
      <h2>AnimeDunya</h2>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">GET</span>\r
          <span class="endpoint-path">/watch/animedunya/<span class="param">:id</span>/<span class="param">sub|dub</span>/animedunya-<span class="param">:ep</span></span>\r
          <a class="try-btn" href="/watch/animedunya/16498/sub/animedunya-1" target="_blank">Try it \u2197</a>\r
        </div>\r
        <div class="endpoint-body">\r
          <p class="endpoint-desc">Returns stream sources from AnimeDunya for the specified episode. Streams are served as direct HLS playlists with multiple subtitle tracks included.</p>\r
          <table class="params-table">\r
            <thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead>\r
            <tbody>\r
              <tr><td class="param-name">:id</td><td class="param-type">integer</td><td class="param-desc">AniList media ID</td></tr>\r
              <tr><td class="param-name">sub|dub</td><td class="param-type">string</td><td class="param-desc">Audio track preference</td></tr>\r
              <tr><td class="param-name">:ep</td><td class="param-type">integer</td><td class="param-desc">Episode number</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
        <div class="code-label">Response</div>\r
        <pre><code><span class="p">{</span>\r
  <span class="n">"anilistId"</span><span class="p">:</span> <span class="b">16498</span><span class="p">,</span>\r
  <span class="n">"malId"</span><span class="p">:</span>     <span class="b">16498</span><span class="p">,</span>\r
  <span class="n">"episode"</span><span class="p">:</span>   <span class="b">1</span><span class="p">,</span>\r
  <span class="n">"audio"</span><span class="p">:</span>     <span class="s">"sub"</span><span class="p">,</span>\r
  <span class="n">"streams"</span><span class="p">: [</span>\r
    <span class="p">{</span>\r
      <span class="n">"url"</span><span class="p">:</span>       <span class="s">"https://fs2c.anime-dunya.com/files/.../master.m3u8"</span><span class="p">,</span>\r
      <span class="n">"type"</span><span class="p">:</span>      <span class="s">"hls"</span><span class="p">,</span>\r
      <span class="n">"server"</span><span class="p">:</span>    <span class="s">"AnimeDunya"</span><span class="p">,</span>\r
      <span class="n">"referer"</span><span class="p">:</span>   <span class="s">"https://anime-dunya.com/"</span><span class="p">,</span>\r
      <span class="n">"subtitles"</span><span class="p">: [</span>\r
        <span class="p">{</span> <span class="n">"url"</span><span class="p">:</span> <span class="s">"https://fs2c.anime-dunya.com/.../en.vtt"</span><span class="p">,</span> <span class="n">"label"</span><span class="p">:</span> <span class="s">"EN"</span><span class="p">,</span> <span class="n">"srclang"</span><span class="p">:</span> <span class="s">"en"</span><span class="p">,</span> <span class="n">"default"</span><span class="p">:</span> <span class="b">true</span> <span class="p">}</span>\r
      <span class="p">],</span>\r
      <span class="n">"priority"</span><span class="p">:</span>  <span class="b">5</span><span class="p">,</span>\r
      <span class="n">"isActive"</span><span class="p">:</span>  <span class="b">true</span>\r
    <span class="p">}</span>\r
  <span class="p">]</span>\r
<span class="p">}</span></code></pre>\r
      </div>\r
    </section>\r
\r
    <section class="section" id="watch-animeonsen">\r
      <h2>AnimeOnsen</h2>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">GET</span>\r
          <span class="endpoint-path">/watch/animeonsen/<span class="param">:id</span>/<span class="param">sub</span>/animeonsen-<span class="param">:ep</span></span>\r
          <a class="try-btn" href="/watch/animeonsen/16498/sub/animeonsen-1" target="_blank">Try it \u2197</a>\r
        </div>\r
        <div class="endpoint-body">\r
          <p class="endpoint-desc">Returns a DASH manifest and subtitle tracks. Apply each returned authorization header to the manifest and media-segment requests.</p>\r
          <table class="params-table">\r
            <thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead>\r
            <tbody>\r
              <tr><td class="param-name">:id</td><td class="param-type">integer</td><td class="param-desc">AniList media ID</td></tr>\r
              <tr><td class="param-name">sub</td><td class="param-type">string</td><td class="param-desc">AnimeOnsen provides subtitled streams only</td></tr>\r
              <tr><td class="param-name">:ep</td><td class="param-type">integer</td><td class="param-desc">Episode number</td></tr>\r
            </tbody>\r
          </table>\r
        </div>\r
        <div class="code-label">Response</div>\r
        <pre><code><span class="p">{</span>\r
  <span class="n">"anilistId"</span><span class="p">:</span> <span class="b">16498</span><span class="p">,</span>\r
  <span class="n">"episode"</span><span class="p">:</span> <span class="b">1</span><span class="p">,</span>\r
  <span class="n">"audio"</span><span class="p">:</span> <span class="s">"sub"</span><span class="p">,</span>\r
  <span class="n">"streams"</span><span class="p">: [</span>\r
    <span class="p">{</span>\r
      <span class="n">"url"</span><span class="p">:</span> <span class="s">"https://cdn.animeonsen.xyz/video/mp4-dash/.../manifest.mpd"</span><span class="p">,</span>\r
      <span class="n">"type"</span><span class="p">:</span> <span class="s">"dash"</span><span class="p">,</span>\r
      <span class="n">"server"</span><span class="p">:</span> <span class="s">"AnimeOnsen"</span><span class="p">,</span>\r
      <span class="n">"headers"</span><span class="p">:</span> <span class="p">{</span> <span class="n">"Authorization"</span><span class="p">:</span> <span class="s">"Bearer &lt;session-token&gt;"</span> <span class="p">},</span>\r
      <span class="n">"subtitles"</span><span class="p">:</span> <span class="p">[</span> <span class="p">{</span> <span class="n">"url"</span><span class="p">:</span> <span class="s">"https://api.animeonsen.xyz/v4/subtitles/..."</span> <span class="p">}</span> <span class="p">]</span>\r
    <span class="p">}</span>\r
  <span class="p">]</span>\r
<span class="p">}</span></code></pre>\r
      </div>\r
    </section>\r
\r
    <section class="section" id="watch-anipm">\r
      <h2>Ani.pm</h2>\r
      <div class="endpoint">\r
        <div class="endpoint-head">\r
          <span class="method-pill get">GET</span>\r
          <span class="endpoint-path">/watch/anipm/<span class="param">:id</span>/<span class="param">sub|dub</span>/anipm-<span class="param">:ep</span></span>\r
          <a class="try-btn" href="/watch/anipm/178788/sub/anipm-1" target="_blank">Try it \u2197</a>\r
        </div>\r
        <div class="endpoint-body">\r
          <p class="endpoint-desc">Returns the regular soft-sub HLS source and, when available, a separate hard-sub source. Each stream is labeled with <code>subtitleType</code>.</p>\r
        </div>\r
        <div class="code-label">Response</div>\r
        <pre><code><span class="p">{</span>\r
  <span class="n">"anilistId"</span><span class="p">:</span> <span class="b">178788</span><span class="p">,</span>\r
  <span class="n">"episode"</span><span class="p">:</span> <span class="b">1</span><span class="p">,</span>\r
  <span class="n">"audio"</span><span class="p">:</span> <span class="s">"sub"</span><span class="p">,</span>\r
  <span class="n">"streams"</span><span class="p">:</span> <span class="p">[</span>\r
    <span class="p">{</span> <span class="n">"url"</span><span class="p">:</span> <span class="s">"https://media.settlar.io/.../master.m3u8"</span><span class="p">,</span> <span class="n">"type"</span><span class="p">:</span> <span class="s">"hls"</span><span class="p">,</span> <span class="n">"server"</span><span class="p">:</span> <span class="s">"Ani.pm"</span><span class="p">,</span> <span class="n">"subtitleType"</span><span class="p">:</span> <span class="s">"softsub"</span> <span class="p">},</span>\r
    <span class="p">{</span> <span class="n">"url"</span><span class="p">:</span> <span class="s">"https://media.settlar.io/.../master.m3u8"</span><span class="p">,</span> <span class="n">"type"</span><span class="p">:</span> <span class="s">"hls"</span><span class="p">,</span> <span class="n">"server"</span><span class="p">:</span> <span class="s">"Ani.pm"</span><span class="p">,</span> <span class="n">"subtitleType"</span><span class="p">:</span> <span class="s">"hardsub"</span> <span class="p">}</span>\r
  <span class="p">]</span>\r
<span class="p">}</span></code></pre>\r
      </div>\r
    </section>\r
\r
  </main>\r
</div>\r
\r
<script>\r
  const sidebar = document.getElementById('sidebar');\r
  const overlay = document.getElementById('overlay');\r
  const menuBtn = document.getElementById('menuBtn');\r
\r
  const openSidebar = () => {\r
    sidebar.classList.add('open');\r
    overlay.classList.add('open');\r
    menuBtn.classList.add('active');\r
    document.body.style.overflow = 'hidden';\r
  };\r
\r
  const closeSidebar = () => {\r
    sidebar.classList.remove('open');\r
    overlay.classList.remove('open');\r
    menuBtn.classList.remove('active');\r
    document.body.style.overflow = '';\r
  };\r
\r
  menuBtn.addEventListener('click', () =>\r
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar()\r
  );\r
  overlay.addEventListener('click', closeSidebar);\r
  sidebar.querySelectorAll('.nav-item').forEach(l =>\r
    l.addEventListener('click', () => { if (window.innerWidth <= 768) closeSidebar(); })\r
  );\r
\r
  const navItems = sidebar.querySelectorAll('.nav-item[href^="#"]');\r
  const navObs = new IntersectionObserver(entries => {\r
    entries.forEach(e => {\r
      if (e.isIntersecting) {\r
        navItems.forEach(n => n.classList.remove('active'));\r
        const a = sidebar.querySelector(\`.nav-item[href="#\${e.target.id}"]\`);\r
        if (a) a.classList.add('active');\r
      }\r
    });\r
  }, { rootMargin: '-20% 0px -70% 0px' });\r
  document.querySelectorAll('.section[id]').forEach(s => navObs.observe(s));\r
\r
  const revealObs = new IntersectionObserver(entries => {\r
    entries.forEach(e => {\r
      if (e.isIntersecting) {\r
        e.target.classList.add('visible');\r
        revealObs.unobserve(e.target);\r
      }\r
    });\r
  }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });\r
  document.querySelectorAll('.section').forEach(s => revealObs.observe(s));\r
\r
  const tiltables = document.querySelectorAll('.provider-card, .endpoint');\r
  tiltables.forEach(el => {\r
    let raf = null;\r
    el.addEventListener('mousemove', e => {\r
      if (raf) return;\r
      raf = requestAnimationFrame(() => {\r
        const r = el.getBoundingClientRect();\r
        const x = (e.clientX - r.left) / r.width  - 0.5;\r
        const y = (e.clientY - r.top)  / r.height - 0.5;\r
        const maxDeg = el.classList.contains('provider-card') ? 10 : 5;\r
        el.style.setProperty('--rx', \`\${(-y * maxDeg).toFixed(2)}deg\`);\r
        el.style.setProperty('--ry', \`\${( x * maxDeg).toFixed(2)}deg\`);\r
        raf = null;\r
      });\r
    }, { passive: true });\r
    el.addEventListener('mouseleave', () => {\r
      if (raf) { cancelAnimationFrame(raf); raf = null; }\r
      el.style.setProperty('--rx', '0deg');\r
      el.style.setProperty('--ry', '0deg');\r
    }, { passive: true });\r
  });\r
\r
  (function () {\r
    const dot  = document.getElementById('cursorDot');\r
    const ring = document.getElementById('cursorRing');\r
    if (!dot || !ring) return;\r
\r
    let mx = -200, my = -200;\r
    let rx = -200, ry = -200;\r
    let visible = false;\r
\r
    const LERP = 0.22;\r
    const INTERACTIVES = 'a, button, .provider-card, .nav-item, .try-btn, .copy-btn, label, [role="button"]';\r
\r
    function tick() {\r
      rx += (mx - rx) * LERP;\r
      ry += (my - ry) * LERP;\r
      dot.style.transform  = \`translate(\${mx}px,\${my}px)\`;\r
      ring.style.transform = \`translate(\${Math.round(rx * 10) / 10}px,\${Math.round(ry * 10) / 10}px)\`;\r
      requestAnimationFrame(tick);\r
    }\r
    requestAnimationFrame(tick);\r
\r
    document.addEventListener('mousemove', e => {\r
      mx = e.clientX; my = e.clientY;\r
      if (!visible) {\r
        visible = true;\r
        dot.classList.remove('is-hidden');\r
        ring.classList.remove('is-hidden');\r
        rx = mx; ry = my;\r
      }\r
    }, { passive: true });\r
\r
    document.addEventListener('mouseleave', () => {\r
      dot.classList.add('is-hidden');\r
      ring.classList.add('is-hidden');\r
      visible = false;\r
    }, { passive: true });\r
\r
    document.addEventListener('mouseenter', () => {\r
      dot.classList.remove('is-hidden');\r
      ring.classList.remove('is-hidden');\r
      visible = true;\r
    }, { passive: true });\r
\r
    document.addEventListener('mousedown', () => {\r
      ring.classList.add('is-clicking');\r
      ring.classList.remove('is-hovering');\r
    }, { passive: true });\r
\r
    document.addEventListener('mouseup', () => {\r
      ring.classList.remove('is-clicking');\r
    }, { passive: true });\r
\r
    document.addEventListener('mouseover', e => {\r
      if (e.target.closest(INTERACTIVES)) {\r
        dot.classList.add('is-hovering');\r
        ring.classList.add('is-hovering');\r
      }\r
    }, { passive: true });\r
\r
    document.addEventListener('mouseout', e => {\r
      if (e.target.closest(INTERACTIVES)) {\r
        dot.classList.remove('is-hovering');\r
        ring.classList.remove('is-hovering');\r
      }\r
    }, { passive: true });\r
\r
    window.addEventListener('touchstart', () => {\r
      dot.style.display  = 'none';\r
      ring.style.display = 'none';\r
      document.body.style.cursor = '';\r
    }, { once: true, passive: true });\r
  })();\r
\r
  document.querySelectorAll('pre').forEach(pre => {\r
    const btn = document.createElement('button');\r
    btn.className = 'copy-btn';\r
    btn.textContent = 'Copy';\r
    btn.addEventListener('click', () => {\r
      const text = pre.innerText.replace(/\\nCopy$/, '').replace(/\\nCopied!$/, '').trim();\r
      navigator.clipboard.writeText(text).then(() => {\r
        btn.textContent = 'Copied!';\r
        btn.classList.add('copied');\r
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1800);\r
      }).catch(() => {});\r
    });\r
    pre.appendChild(btn);\r
  });\r
<\/script>\r
\r
</body>\r
</html>\r
`;
var STYLE_CSS = `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\r
\r
:root {\r
  --bg:           #09090d;\r
  --sidebar:      #0d0d12;\r
  --border:       #1c1c26;\r
  --border-hi:    #2a2a3a;\r
  --surface:      #111118;\r
  --surface-hi:   #16161f;\r
  --text:         #eaeaf4;\r
  --muted:        #63637a;\r
  --faint:        #1e1e2a;\r
  --accent:       #818cf8;\r
  --accent-dim:   rgba(129,140,248,.1);\r
  --accent-glow:  rgba(129,140,248,.18);\r
  --accent-mid:   rgba(129,140,248,.06);\r
  --green:        #4ade80;\r
  --green-dim:    rgba(74,222,128,.1);\r
  --purple:       #c084fc;\r
  --purple-dim:   rgba(192,132,252,.1);\r
  --sidebar-w:    264px;\r
  --header-h:     56px;\r
  --radius:       10px;\r
  --font:         'Inter', system-ui, sans-serif;\r
  --mono:         'JetBrains Mono', 'Fira Code', monospace;\r
}\r
\r
html { scroll-behavior: smooth; }\r
\r
body {\r
  background: var(--bg);\r
  color: var(--text);\r
  font-family: var(--font);\r
  font-size: 15px;\r
  line-height: 1.7;\r
  -webkit-font-smoothing: antialiased;\r
  overflow-x: hidden;\r
}\r
\r
a { color: var(--accent); text-decoration: none; }\r
a:hover { text-decoration: underline; }\r
\r
.bg-orbs {\r
  position: fixed;\r
  inset: 0;\r
  overflow: hidden;\r
  pointer-events: none;\r
  z-index: 0;\r
}\r
\r
.bg-orb {\r
  position: absolute;\r
  border-radius: 50%;\r
  filter: blur(90px);\r
  will-change: transform;\r
}\r
\r
.bg-orb-1 {\r
  width: 640px; height: 640px;\r
  background: radial-gradient(circle, rgba(129,140,248,.11) 0%, transparent 70%);\r
  top: -8%; left: 15%;\r
  animation: orbFloat1 18s ease-in-out infinite;\r
}\r
\r
.bg-orb-2 {\r
  width: 480px; height: 480px;\r
  background: radial-gradient(circle, rgba(192,132,252,.08) 0%, transparent 70%);\r
  top: 35%; right: -8%;\r
  animation: orbFloat2 22s ease-in-out infinite;\r
}\r
\r
.bg-orb-3 {\r
  width: 360px; height: 360px;\r
  background: radial-gradient(circle, rgba(74,222,128,.06) 0%, transparent 70%);\r
  bottom: 8%; left: 28%;\r
  animation: orbFloat3 26s ease-in-out infinite;\r
}\r
\r
@keyframes orbFloat1 {\r
  0%,100% { transform: translate(0,0); }\r
  33%     { transform: translate(30px,-40px); }\r
  66%     { transform: translate(-20px,25px); }\r
}\r
@keyframes orbFloat2 {\r
  0%,100% { transform: translate(0,0); }\r
  40%     { transform: translate(-35px,30px); }\r
  70%     { transform: translate(20px,-20px); }\r
}\r
@keyframes orbFloat3 {\r
  0%,100% { transform: translate(0,0); }\r
  30%     { transform: translate(25px,-30px); }\r
  65%     { transform: translate(-15px,20px); }\r
}\r
\r
.layout {\r
  display: flex;\r
  min-height: 100vh;\r
  position: relative;\r
  z-index: 1;\r
}\r
\r
.sidebar {\r
  position: fixed;\r
  top: 0; left: 0;\r
  width: var(--sidebar-w);\r
  height: 100vh;\r
  background: rgba(13,13,18,.92);\r
  backdrop-filter: blur(24px) saturate(180%);\r
  -webkit-backdrop-filter: blur(24px) saturate(180%);\r
  border-right: 1px solid var(--border);\r
  display: flex;\r
  flex-direction: column;\r
  overflow-y: auto;\r
  z-index: 100;\r
  scrollbar-width: thin;\r
  scrollbar-color: var(--faint) transparent;\r
}\r
\r
.sidebar::after {\r
  content: '';\r
  position: absolute;\r
  top: 0; right: 0;\r
  width: 1px;\r
  height: 100%;\r
  background: linear-gradient(to bottom, transparent, rgba(129,140,248,.15) 30%, rgba(129,140,248,.15) 70%, transparent);\r
  pointer-events: none;\r
}\r
\r
.sidebar::-webkit-scrollbar { width: 4px; }\r
.sidebar::-webkit-scrollbar-track { background: transparent; }\r
.sidebar::-webkit-scrollbar-thumb { background: var(--faint); border-radius: 4px; }\r
\r
.logo {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
  padding: 20px 20px 16px;\r
  border-bottom: 1px solid var(--border);\r
  position: relative;\r
}\r
\r
.logo::before {\r
  content: '';\r
  position: absolute;\r
  inset: 0;\r
  background: linear-gradient(135deg, rgba(129,140,248,.05), transparent 60%);\r
  pointer-events: none;\r
}\r
\r
.logo img {\r
  width: 28px; height: 28px;\r
  flex-shrink: 0;\r
  filter: drop-shadow(0 0 10px rgba(129,140,248,.4));\r
  animation: logoPulse 4s ease-in-out infinite;\r
}\r
\r
@keyframes logoPulse {\r
  0%,100% { filter: drop-shadow(0 0 10px rgba(129,140,248,.4)); }\r
  50%     { filter: drop-shadow(0 0 18px rgba(129,140,248,.65)); }\r
}\r
\r
.logo-text {\r
  font-size: 15px;\r
  font-weight: 700;\r
  letter-spacing: -.3px;\r
  color: var(--text);\r
}\r
\r
.logo-version {\r
  font-size: 10px;\r
  font-weight: 600;\r
  color: var(--accent);\r
  background: var(--accent-dim);\r
  border: 1px solid rgba(129,140,248,.2);\r
  padding: 2px 7px;\r
  border-radius: 20px;\r
  margin-left: auto;\r
  flex-shrink: 0;\r
  letter-spacing: .04em;\r
}\r
\r
.nav { padding: 12px 0 24px; flex: 1; }\r
\r
.nav-section {\r
  padding: 0 12px;\r
  margin-bottom: 4px;\r
}\r
\r
.nav-label {\r
  font-size: 10px;\r
  font-weight: 700;\r
  letter-spacing: .1em;\r
  text-transform: uppercase;\r
  color: var(--muted);\r
  padding: 16px 8px 6px;\r
}\r
\r
.nav-item {\r
  display: flex;\r
  align-items: center;\r
  padding: 6px 8px;\r
  border-radius: 7px;\r
  font-size: 13.5px;\r
  color: var(--muted);\r
  cursor: pointer;\r
  transition: color .15s, background .15s, transform .15s;\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  position: relative;\r
}\r
\r
.nav-item:hover {\r
  color: var(--text);\r
  background: var(--faint);\r
  text-decoration: none;\r
  transform: translateX(2px);\r
}\r
\r
.nav-item.active {\r
  color: var(--accent);\r
  background: var(--accent-dim);\r
}\r
\r
.nav-item.active::before {\r
  content: '';\r
  position: absolute;\r
  left: 0; top: 20%; bottom: 20%;\r
  width: 2px;\r
  background: var(--accent);\r
  border-radius: 2px;\r
  box-shadow: 0 0 8px var(--accent);\r
}\r
\r
.nav-item .method {\r
  font-size: 10px;\r
  font-family: var(--mono);\r
  font-weight: 600;\r
  color: var(--green);\r
  background: var(--green-dim);\r
  border: 1px solid rgba(74,222,128,.15);\r
  padding: 1px 5px;\r
  border-radius: 4px;\r
  margin-right: 7px;\r
  flex-shrink: 0;\r
}\r
\r
.main {\r
  margin-left: var(--sidebar-w);\r
  min-width: 0;\r
  flex: 1;\r
  padding: 64px max(40px, calc((100% - 820px) / 2));\r
}\r
\r
.topbar {\r
  display: none;\r
  position: fixed;\r
  top: 0; left: 0; right: 0;\r
  height: var(--header-h);\r
  background: rgba(9,9,13,.95);\r
  backdrop-filter: blur(20px) saturate(180%);\r
  -webkit-backdrop-filter: blur(20px) saturate(180%);\r
  border-bottom: 1px solid var(--border);\r
  align-items: center;\r
  padding: 0 16px;\r
  gap: 12px;\r
  z-index: 200;\r
}\r
\r
.topbar img { width: 24px; height: 24px; }\r
.topbar-title { font-size: 15px; font-weight: 700; color: var(--text); }\r
\r
.menu-btn {\r
  margin-left: auto;\r
  background: none;\r
  border: 1px solid var(--border);\r
  border-radius: 7px;\r
  padding: 6px 8px;\r
  color: var(--text);\r
  cursor: pointer;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  gap: 4px;\r
  transition: border-color .2s, background .2s;\r
}\r
\r
.menu-btn:hover {\r
  border-color: var(--accent);\r
  background: var(--accent-dim);\r
}\r
\r
.menu-btn span {\r
  display: block;\r
  width: 16px; height: 2px;\r
  background: var(--text);\r
  border-radius: 2px;\r
  transition: transform .3s cubic-bezier(.22,1,.36,1), opacity .2s;\r
}\r
\r
.menu-btn.active span:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }\r
.menu-btn.active span:nth-child(2) { opacity: 0; }\r
.menu-btn.active span:nth-child(3) { transform: rotate(-45deg) translate(4px, -4px); }\r
\r
.section {\r
  margin-bottom: 80px;\r
  scroll-margin-top: 32px;\r
  opacity: 0;\r
  transform: translateY(28px);\r
  transition: opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1);\r
}\r
\r
.section.visible {\r
  opacity: 1;\r
  transform: translateY(0);\r
}\r
\r
.section-hero { margin-bottom: 72px; }\r
\r
.hero-logo {\r
  width: 56px; height: 56px;\r
  margin-bottom: 24px;\r
  filter: drop-shadow(0 0 24px rgba(129,140,248,.5));\r
  animation: heroFloat 5s ease-in-out infinite;\r
  transform-style: preserve-3d;\r
}\r
\r
@keyframes heroFloat {\r
  0%,100% { transform: translateY(0) rotateY(0deg); }\r
  50%     { transform: translateY(-6px) rotateY(8deg); }\r
}\r
\r
h1 {\r
  font-size: 36px;\r
  font-weight: 800;\r
  letter-spacing: -.8px;\r
  line-height: 1.15;\r
  margin-bottom: 14px;\r
  background: linear-gradient(135deg, #eaeaf4 0%, #818cf8 55%, #c084fc 100%);\r
  -webkit-background-clip: text;\r
  -webkit-text-fill-color: transparent;\r
  background-clip: text;\r
}\r
\r
h2 {\r
  font-size: 20px;\r
  font-weight: 700;\r
  letter-spacing: -.3px;\r
  color: var(--text);\r
  margin-bottom: 18px;\r
  padding-bottom: 13px;\r
  border-bottom: 1px solid var(--border);\r
  position: relative;\r
}\r
\r
h2::after {\r
  content: '';\r
  position: absolute;\r
  bottom: -1px; left: 0;\r
  width: 40px; height: 1px;\r
  background: var(--accent);\r
  box-shadow: 0 0 8px var(--accent);\r
  border-radius: 2px;\r
}\r
\r
h3 {\r
  font-size: 15px;\r
  font-weight: 600;\r
  color: var(--text);\r
  margin: 24px 0 8px;\r
}\r
\r
p { color: var(--muted); margin-bottom: 16px; }\r
p:last-child { margin-bottom: 0; }\r
\r
.endpoint {\r
  background: var(--surface);\r
  border: 1px solid var(--border);\r
  border-radius: var(--radius);\r
  margin-bottom: 20px;\r
  overflow: hidden;\r
  transition: border-color .2s, box-shadow .2s, transform .2s;\r
  transform: perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateZ(0);\r
}\r
\r
.endpoint:hover {\r
  border-color: var(--border-hi);\r
  box-shadow: 0 8px 40px rgba(0,0,0,.35), 0 0 0 1px rgba(129,140,248,.06);\r
}\r
\r
.endpoint-head {\r
  display: flex;\r
  align-items: center;\r
  gap: 12px;\r
  padding: 14px 18px;\r
  border-bottom: 1px solid var(--border);\r
  background: linear-gradient(135deg, var(--sidebar) 0%, rgba(22,22,32,1) 100%);\r
  position: relative;\r
}\r
\r
.endpoint-head::before {\r
  content: '';\r
  position: absolute;\r
  inset: 0;\r
  background: linear-gradient(90deg, rgba(129,140,248,.03) 0%, transparent 100%);\r
  pointer-events: none;\r
}\r
\r
.method-pill {\r
  font-family: var(--mono);\r
  font-size: 11px;\r
  font-weight: 700;\r
  padding: 3px 9px;\r
  border-radius: 5px;\r
  flex-shrink: 0;\r
  letter-spacing: .04em;\r
}\r
\r
.method-pill.get {\r
  color: var(--green);\r
  background: var(--green-dim);\r
  border: 1px solid rgba(74,222,128,.2);\r
}\r
\r
.endpoint-path {\r
  font-family: var(--mono);\r
  font-size: 13.5px;\r
  color: var(--text);\r
  font-weight: 500;\r
  word-break: break-all;\r
}\r
\r
.endpoint-path .param { color: var(--accent); }\r
\r
.try-btn {\r
  margin-left: auto;\r
  flex-shrink: 0;\r
  font-size: 12px;\r
  font-weight: 600;\r
  color: var(--accent);\r
  background: var(--accent-dim);\r
  border: 1px solid rgba(129,140,248,.18);\r
  border-radius: 6px;\r
  padding: 4px 11px;\r
  white-space: nowrap;\r
  transition: background .15s, border-color .15s, box-shadow .15s;\r
  text-decoration: none;\r
}\r
\r
.try-btn:hover {\r
  background: rgba(129,140,248,.18);\r
  border-color: rgba(129,140,248,.4);\r
  box-shadow: 0 0 12px rgba(129,140,248,.2);\r
  text-decoration: none;\r
}\r
\r
.endpoint-body { padding: 16px 18px; }\r
\r
.endpoint-desc {\r
  color: var(--muted);\r
  font-size: 14px;\r
  margin-bottom: 14px;\r
}\r
\r
.params-table {\r
  width: 100%;\r
  border-collapse: collapse;\r
  font-size: 13.5px;\r
  margin-bottom: 16px;\r
}\r
\r
.params-table th {\r
  text-align: left;\r
  padding: 8px 12px;\r
  font-size: 11px;\r
  font-weight: 700;\r
  letter-spacing: .06em;\r
  text-transform: uppercase;\r
  color: var(--muted);\r
  border-bottom: 1px solid var(--border);\r
}\r
\r
.params-table td {\r
  padding: 9px 12px;\r
  border-bottom: 1px solid var(--faint);\r
  vertical-align: top;\r
}\r
\r
.params-table tr:last-child td { border-bottom: none; }\r
\r
.param-name {\r
  font-family: var(--mono);\r
  font-size: 12.5px;\r
  color: var(--accent);\r
  white-space: nowrap;\r
}\r
\r
.param-type {\r
  font-family: var(--mono);\r
  font-size: 11.5px;\r
  color: var(--purple);\r
  white-space: nowrap;\r
}\r
\r
.param-desc { color: var(--muted); }\r
\r
.code-label {\r
  font-size: 11px;\r
  font-weight: 600;\r
  text-transform: uppercase;\r
  letter-spacing: .07em;\r
  color: var(--muted);\r
  padding: 10px 18px 6px;\r
  background: var(--surface);\r
  border-top: 1px solid var(--border);\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
}\r
\r
pre {\r
  background: var(--surface);\r
  padding: 14px 18px 18px;\r
  overflow-x: auto;\r
  scrollbar-width: thin;\r
  scrollbar-color: var(--faint) transparent;\r
  position: relative;\r
  transition: background .2s;\r
}\r
\r
pre:hover { background: var(--surface-hi); }\r
\r
pre::-webkit-scrollbar { height: 4px; }\r
pre::-webkit-scrollbar-track { background: transparent; }\r
pre::-webkit-scrollbar-thumb { background: var(--faint); border-radius: 4px; }\r
\r
code {\r
  font-family: var(--mono);\r
  font-size: 12.5px;\r
  line-height: 1.7;\r
  color: var(--text);\r
}\r
\r
.k { color: #c084fc; }\r
.s { color: #86efac; }\r
.n { color: #818cf8; }\r
.p { color: #555568; }\r
.b { color: #fb923c; }\r
\r
.copy-btn {\r
  position: absolute;\r
  top: 10px; right: 12px;\r
  font-size: 11px;\r
  font-weight: 600;\r
  font-family: var(--font);\r
  color: var(--muted);\r
  background: var(--faint);\r
  border: 1px solid var(--border);\r
  border-radius: 5px;\r
  padding: 3px 9px;\r
  cursor: pointer;\r
  opacity: 0;\r
  transition: opacity .2s, color .15s, background .15s;\r
  z-index: 2;\r
}\r
\r
pre:hover .copy-btn { opacity: 1; }\r
\r
.copy-btn:hover {\r
  color: var(--text);\r
  background: var(--border-hi);\r
  border-color: var(--border-hi);\r
}\r
\r
.copy-btn.copied {\r
  color: var(--green);\r
  border-color: rgba(74,222,128,.3);\r
  background: var(--green-dim);\r
  opacity: 1;\r
}\r
\r
.provider-grid {\r
  display: grid;\r
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));\r
  gap: 12px;\r
  margin-top: 18px;\r
}\r
\r
.provider-card {\r
  background: var(--surface);\r
  border: 1px solid var(--border);\r
  border-radius: var(--radius);\r
  padding: 16px 18px;\r
  transition: border-color .2s, box-shadow .2s;\r
  transform: perspective(600px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));\r
  will-change: transform;\r
  cursor: default;\r
}\r
\r
.provider-card:hover {\r
  border-color: rgba(129,140,248,.35);\r
  box-shadow: 0 6px 28px rgba(0,0,0,.3), 0 0 0 1px rgba(129,140,248,.08), inset 0 1px 0 rgba(129,140,248,.06);\r
}\r
\r
.provider-name {\r
  font-family: var(--mono);\r
  font-size: 13px;\r
  font-weight: 600;\r
  color: var(--text);\r
  margin-bottom: 5px;\r
}\r
\r
.provider-meta {\r
  font-size: 12px;\r
  color: var(--muted);\r
}\r
\r
.callout {\r
  display: flex;\r
  gap: 12px;\r
  background: linear-gradient(135deg, rgba(129,140,248,.08) 0%, rgba(129,140,248,.04) 100%);\r
  border: 1px solid rgba(129,140,248,.18);\r
  border-radius: var(--radius);\r
  padding: 14px 18px;\r
  margin-bottom: 24px;\r
  font-size: 13.5px;\r
  color: var(--text);\r
  position: relative;\r
  overflow: hidden;\r
}\r
\r
.callout::before {\r
  content: '';\r
  position: absolute;\r
  top: 0; left: 0;\r
  width: 3px; height: 100%;\r
  background: linear-gradient(to bottom, var(--accent), var(--purple));\r
  border-radius: 2px 0 0 2px;\r
}\r
\r
.callout-icon { flex-shrink: 0; font-size: 15px; }\r
\r
.divider {\r
  border: none;\r
  height: 1px;\r
  background: linear-gradient(to right, transparent, var(--border) 20%, var(--border) 80%, transparent);\r
  margin: 56px 0;\r
}\r
\r
.overlay {\r
  display: none;\r
  position: fixed;\r
  inset: 0;\r
  background: transparent;\r
  z-index: 90;\r
}\r
\r
.overlay.open { display: block; }\r
\r
.provider-grid .provider-card { transition-delay: calc(var(--i, 0) * 40ms); }\r
\r
@media (max-width: 768px) {\r
  :root { --sidebar-w: 280px; }\r
\r
  .topbar { display: flex; }\r
\r
  .sidebar {\r
    transform: translateX(-100%);\r
    transition: transform .28s cubic-bezier(.4,0,.2,1);\r
    background: var(--sidebar);\r
    backdrop-filter: none;\r
    -webkit-backdrop-filter: none;\r
    -webkit-overflow-scrolling: touch;\r
    overscroll-behavior: contain;\r
  }\r
\r
  .sidebar.open {\r
    transform: translateX(0);\r
    box-shadow: 4px 0 24px rgba(0,0,0,.5);\r
  }\r
\r
  .main {\r
    margin-left: 0;\r
    padding: calc(var(--header-h) + 32px) 20px 48px;\r
  }\r
\r
  h1 { font-size: 26px; }\r
  h2 { font-size: 17px; }\r
  .bg-orb-2, .bg-orb-3 { display: none; }\r
\r
  .endpoint { transform: none !important; }\r
  .provider-card { transform: none !important; }\r
}\r
\r
@media (min-width: 769px) and (max-width: 1100px) {\r
  .main { padding: 52px 36px; }\r
}\r
\r
body, a, button, label, [role="button"] { cursor: none; }\r
\r
.cursor-dot,\r
.cursor-ring {\r
  position: fixed;\r
  top: 0; left: 0;\r
  pointer-events: none;\r
  z-index: 99999;\r
  will-change: transform;\r
  border-radius: 50%;\r
}\r
\r
.cursor-dot {\r
  width: 6px; height: 6px;\r
  background: var(--accent);\r
  margin: -3px 0 0 -3px;\r
  box-shadow: 0 0 10px rgba(129,140,248,.8);\r
  transition: opacity .2s, transform .1s;\r
}\r
\r
.cursor-ring {\r
  width: 36px; height: 36px;\r
  border: 1.5px solid rgba(129,140,248,.45);\r
  margin: -18px 0 0 -18px;\r
  transition: width .25s cubic-bezier(.22,1,.36,1),\r
              height .25s cubic-bezier(.22,1,.36,1),\r
              margin .25s cubic-bezier(.22,1,.36,1),\r
              border-color .25s,\r
              background .25s,\r
              opacity .2s;\r
}\r
\r
.cursor-ring.is-hovering {\r
  width: 52px; height: 52px;\r
  margin: -26px 0 0 -26px;\r
  border-color: rgba(129,140,248,.7);\r
  background: rgba(129,140,248,.06);\r
}\r
\r
.cursor-dot.is-hovering { opacity: 0; }\r
\r
.cursor-dot.is-hidden,\r
.cursor-ring.is-hidden  { opacity: 0; }\r
\r
.cursor-ring.is-clicking {\r
  width: 28px; height: 28px;\r
  margin: -14px 0 0 -14px;\r
  border-color: rgba(129,140,248,.9);\r
  background: rgba(129,140,248,.12);\r
}\r
\r
input, textarea, select { cursor: text; }\r
\r
@media (prefers-reduced-motion: reduce) {\r
  .section { opacity: 1; transform: none; transition: none; }\r
  .hero-logo, .logo img { animation: none; }\r
  .bg-orb { animation: none; }\r
  .provider-card, .endpoint { transform: none !important; }\r
}\r
`;
var LOGO_SVG = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none">\r\n  <defs>\r\n    <linearGradient id="ag" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">\r\n      <stop offset="0%" stop-color="#818cf8"/>\r\n      <stop offset="100%" stop-color="#c084fc"/>\r\n    </linearGradient>\r\n  </defs>\r\n  <path\r\n    fill-rule="evenodd"\r\n    clip-rule="evenodd"\r\n    fill="url(#ag)"\r\n    d="M50 7 L96 93 H78 L66 67 H34 L22 93 H4 Z M50 27 L63 59 H37 Z"\r\n  />\r\n</svg>\r\n';
function getStaticAsset(pathname, apiVersion = "2.3") {
  if (pathname === "/docs") {
    return {
      body: INDEX_HTML.replaceAll("{{API_VERSION}}", apiVersion),
      mime: "text/html; charset=utf-8"
    };
  }
  if (pathname === "/landing" || pathname === "/landing.html") {
    return {
      body: LANDING_HTML.replaceAll("{{API_VERSION}}", apiVersion),
      mime: "text/html; charset=utf-8"
    };
  }
  if (pathname === "/style.css") {
    return {
      body: STYLE_CSS,
      mime: "text/css; charset=utf-8"
    };
  }
  if (pathname === "/logo.svg") {
    return {
      body: LOGO_SVG,
      mime: "image/svg+xml"
    };
  }
  return null;
}
__name(getStaticAsset, "getStaticAsset");

// core/m3u8-proxy.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
async function handleM3u8Proxy(request3) {
  const reqUrl = new URL(request3.url);
  const targetUrl = reqUrl.searchParams.get("url");
  if (!targetUrl) {
    return new Response(JSON.stringify({ error: "Missing 'url' query parameter" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
  let customHeaders = {};
  const rawHeaders = reqUrl.searchParams.get("headers");
  if (rawHeaders) {
    try {
      customHeaders = typeof rawHeaders === "string" ? JSON.parse(rawHeaders) : rawHeaders;
    } catch {
    }
  }
  let referer = null;
  const candidates = [customHeaders.Referer, customHeaders.referer];
  for (const c of candidates) {
    if (c && typeof c === "string" && !c.includes("localhost") && !c.includes("127.0.0.1")) {
      referer = c;
      break;
    }
  }
  if (!referer) {
    try {
      const u = new URL(targetUrl);
      const h = u.hostname.toLowerCase();
      if (h.includes("krussdomi") || h.includes("advancedai") || h.includes("habibi") || h.includes("babybay") || h.includes("naruto")) {
        referer = "https://krussdomi.com/";
      } else if (h.includes("nexabloom") || h.includes("megaplay")) {
        referer = "https://megaplay.buzz/";
      } else if (h.includes("settlar.io")) {
        referer = "https://embed.settlar.io/";
      } else if (h.includes("flixcloud")) {
        referer = "https://flixcloud.cc/";
      } else if (h.includes("vidwish")) {
        referer = "https://vidwish.live/";
      } else {
        referer = u.origin + "/";
      }
    } catch {
    }
  }
  const upstreamHeaders = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    Accept: "*/*"
  };
  if (referer) {
    upstreamHeaders["Referer"] = referer;
    try {
      upstreamHeaders["Origin"] = new URL(referer).origin;
    } catch {
      upstreamHeaders["Origin"] = referer;
    }
  }
  for (const [k, v] of Object.entries(customHeaders)) {
    const lk = k.toLowerCase();
    if (lk !== "host" && lk !== "connection" && lk !== "content-length" && lk !== "referer") {
      upstreamHeaders[k] = v;
    }
  }
  try {
    const res = await fetch(targetUrl, {
      method: "GET",
      headers: upstreamHeaders
    });
    const responseHeaders = new Headers();
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    responseHeaders.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    responseHeaders.set("Access-Control-Allow-Headers", "*");
    const forwardHeaders = [
      "content-type",
      "content-length",
      "accept-ranges",
      "content-range",
      "cache-control"
    ];
    for (const h of forwardHeaders) {
      const val = res.headers.get(h);
      if (val) responseHeaders.set(h, val);
    }
    if (!res.ok && res.status !== 206) {
      const errBody = await res.arrayBuffer();
      return new Response(errBody, {
        status: res.status,
        headers: responseHeaders
      });
    }
    const arrayBuffer = await res.arrayBuffer();
    const contentType = res.headers.get("Content-Type") || "";
    const isM3u8 = targetUrl.includes(".m3u8") || contentType.includes("mpegurl") || contentType.includes("application/x-mpegURL") || contentType.includes("vnd.apple.mpegurl");
    if (isM3u8) {
      const text = new TextDecoder("utf-8").decode(arrayBuffer);
      if (text.includes("#EXTM3U")) {
        const proxyBase = `${reqUrl.origin}${reqUrl.pathname}`;
        const passHeaders = { Referer: referer };
        const headersParam = encodeURIComponent(JSON.stringify(passHeaders));
        let rewritten = text.replace(/URI="([^"]+)"/g, (match, uri) => {
          let resolved2;
          if (uri.startsWith("//")) resolved2 = "https:" + uri;
          else if (uri.startsWith("http://") || uri.startsWith("https://")) resolved2 = uri;
          else resolved2 = new URL(uri, targetUrl).toString();
          const proxied = `${proxyBase}?url=${encodeURIComponent(resolved2)}&headers=${headersParam}`;
          return `URI="${proxied}"`;
        });
        const lines = rewritten.split("\n");
        const rewrittenLines = lines.map((line) => {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) return line;
          let resolved2;
          if (trimmed.startsWith("//")) resolved2 = "https:" + trimmed;
          else if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) resolved2 = trimmed;
          else resolved2 = new URL(trimmed, targetUrl).toString();
          return `${proxyBase}?url=${encodeURIComponent(resolved2)}&headers=${headersParam}`;
        });
        rewritten = rewrittenLines.join("\n");
        responseHeaders.set("Content-Type", "application/vnd.apple.mpegurl");
        responseHeaders.set("Cache-Control", "no-cache");
        return new Response(rewritten, {
          status: 200,
          headers: responseHeaders
        });
      }
    }
    return new Response(arrayBuffer, {
      status: res.status,
      headers: responseHeaders
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: `Proxy fetch failed: ${err.message}` }), {
      status: 502,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}
__name(handleM3u8Proxy, "handleM3u8Proxy");

// index.js
function json4(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300"
    }
  });
}
__name(json4, "json");
function rewriteRequest(request3, newPath) {
  const u = new URL(request3.url);
  u.pathname = newPath;
  return new Request(u.toString(), { method: request3.method, headers: request3.headers });
}
__name(rewriteRequest, "rewriteRequest");
var watchInflight = /* @__PURE__ */ new Map();
var SIGNED_STREAM_WATCH_TTL = 6e4;
async function cachedWatch(cacheKey, handlerFn, ttl = WATCH_TTL) {
  const entry = await getAsync(cacheKey);
  if (entry && isFresh(entry)) return json4(entry.data);
  if (watchInflight.has(cacheKey)) {
    await watchInflight.get(cacheKey).catch(() => {
    });
    const warm = await getAsync(cacheKey);
    if (warm && isFresh(warm)) return json4(warm.data);
    return handlerFn();
  }
  const promise = (async () => {
    const response = await handlerFn();
    if (response.status === 200) {
      try {
        const data = await response.clone().json();
        await setAsync(cacheKey, data, ttl);
      } catch {
      }
    }
    return response;
  })();
  watchInflight.set(cacheKey, promise);
  try {
    return await promise;
  } finally {
    watchInflight.delete(cacheKey);
  }
}
__name(cachedWatch, "cachedWatch");
var index_default = {
  async fetch(request3, env2 = {}, ctx) {
    setRuntimeEnv(env2);
    const workerEnv = {
      ...env2,
      context: ctx || (env2?.waitUntil ? env2 : void 0),
      waitUntil: /* @__PURE__ */ __name((p) => {
        if (typeof ctx?.waitUntil === "function") ctx.waitUntil(p);
        else if (typeof env2?.waitUntil === "function") env2.waitUntil(p);
        else p.catch(() => {
        });
      }, "waitUntil")
    };
    const url = new URL(request3.url);
    const path = url.pathname;
    const apiVersion = env2?.API_VERSION ?? "2.3";
    if (request3.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "*"
        }
      });
    }
    if (path === "/m3u8-proxy" || path === "/m3u8-proxy/") {
      return handleM3u8Proxy(request3);
    }
    if (request3.method === "GET") {
      const staticAsset = getStaticAsset(path, apiVersion);
      if (staticAsset) {
        return new Response(staticAsset.body, {
          headers: {
            "Content-Type": staticAsset.mime,
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
      if (path === "/" || path === "") {
        const accept = request3.headers.get("accept") || "";
        if (accept.includes("text/html")) {
          const landing = getStaticAsset("/landing", apiVersion);
          if (landing) {
            return new Response(landing.body, {
              headers: {
                "Content-Type": landing.mime,
                "Cache-Control": "public, max-age=3600"
              }
            });
          }
        }
      }
    }
    let m = path.match(/^\/map\/(\d+)\/?$/);
    if (m) {
      const anilistId = m[1];
      const cacheKey = `map:${anilistId}`;
      const entry = await getAsync(cacheKey);
      if (entry && isFresh(entry)) return json4(entry.data);
      try {
        const [data, media] = await Promise.all([
          mapAnimeIds(anilistId),
          getMedia(anilistId).catch(() => null)
        ]);
        await setAsync(cacheKey, data, mapTTL(media?.status ?? "RELEASING"));
        return json4(data);
      } catch (e) {
        if (entry) return json4(entry.data);
        return json4({ error: e.message }, 500);
      }
    }
    m = path.match(/^\/episodes\/((?:[\w-]+\/)+)(\d+)\/?$/i);
    if (m) {
      const rawNames = m[1].replace(/\/$/, "").split("/");
      const anilistId = m[2];
      const includeMap = url.searchParams.get("map") !== "false";
      const { resolved: resolved2, unknown } = resolveProviders(rawNames);
      if (resolved2.size === 0) {
        return json4({ error: "No valid providers specified", unknown }, 400);
      }
      try {
        const data = await getFilteredEpisodesResponse(anilistId, resolved2, includeMap);
        if (unknown.length) data._unknownProviders = unknown;
        return json4(data);
      } catch (e) {
        return json4({ error: e.message }, 500);
      }
    }
    m = path.match(/^\/episodes\/(\d+)\/?$/);
    if (m) {
      const anilistId = m[1];
      try {
        return json4(await getEpisodesResponse(anilistId, workerEnv));
      } catch (e) {
        return json4({ error: e.message }, 500);
      }
    }
    m = path.match(/^\/watch\/mkissa\/(\d+)\/(sub|dub)\/mkissa-(\d+)\/?$/);
    if (m) {
      const [, id, audio, ep] = m;
      return cachedWatch(
        `watch:mkissa:${id}:${audio}:${ep}`,
        () => mkissa_default.fetch(request3)
      );
    }
    if (path.match(/^\/captcha\/mkissa\/?$/)) {
      return mkissa_default.fetch(request3);
    }
    m = path.match(/^\/watch\/reanime\/(\d+)\/(sub|dub)\/reanime-(\d+)\/?$/);
    if (m) {
      const [, id, audio, ep] = m;
      return cachedWatch(
        `watch:reanime:${id}:${audio}:${ep}`,
        () => reanime_default2.fetch(rewriteRequest(request3, `/watch/${id}/${audio}/${ep}`))
      );
    }
    m = path.match(/^\/stream\/reanime\/(\d+)\/(sub|dub)\/(\d+)\/?$/);
    if (m) {
      const [, id, audio, ep] = m;
      return reanime_default2.fetch(rewriteRequest(request3, `/stream/${id}/${audio}/${ep}`));
    }
    m = path.match(/^\/watch\/anikoto\/(\d+)\/(sub|dub)\/anikoto-(\d+)\/?$/);
    if (m) {
      const [, id, audio, ep] = m;
      return cachedWatch(
        `watch:anikoto:${id}:${audio}:${ep}`,
        () => anikoto_default.fetch(request3),
        SIGNED_STREAM_WATCH_TTL
      );
    }
    m = path.match(/^\/watch\/animegg\/(\d+)\/(sub|dub)\/animegg-(\d+)\/?$/);
    if (m) {
      const [, id, audio, ep] = m;
      return cachedWatch(
        `watch:animegg:${id}:${audio}:${ep}`,
        () => animegg_default.fetch(request3)
      );
    }
    m = path.match(/^\/watch\/animenosub\/(\d+)\/(sub|dub)\/animenosub-(\d+)\/?$/);
    if (m) {
      const [, id, audio, ep] = m;
      return cachedWatch(
        `watch:animenosub:${id}:${audio}:${ep}`,
        () => animenosub_default.fetch(request3)
      );
    }
    m = path.match(/^\/watch\/anizone\/(\d+)\/(sub|dub)\/anizone-(\d+)\/?$/);
    if (m) {
      const [, id, audio, ep] = m;
      return cachedWatch(
        `watch:anizone:${id}:${audio}:${ep}`,
        () => anizone_default.fetch(request3)
      );
    }
    m = path.match(/^\/watch\/aniwaves\/(\d+)\/(sub|dub)\/aniwaves-(\d+)\/?$/);
    if (m) {
      const [, id, audio, ep] = m;
      return cachedWatch(
        `watch:aniwaves:${id}:${audio}:${ep}`,
        () => aniwaves_default.fetch(request3)
      );
    }
    m = path.match(/^\/watch\/senshi\/(\d+)\/(sub|dub)\/senshi-(\d+)\/?$/);
    if (m) {
      const [, id, audio, ep] = m;
      return cachedWatch(
        `watch:senshi:${id}:${audio}:${ep}`,
        () => senshi_default.fetch(request3),
        SIGNED_STREAM_WATCH_TTL
      );
    }
    m = path.match(/^\/watch\/kaa\/(\d+)\/(sub|dub)\/kaa-(\d+)\/?$/);
    if (m) {
      const [, id, audio, ep] = m;
      return cachedWatch(
        `watch:kaa:${id}:${audio}:${ep}`,
        () => kickassanime_default.fetch(request3)
      );
    }
    m = path.match(/^\/watch\/animedunya\/(\d+)\/(sub|dub)\/animedunya-(\d+)\/?$/);
    if (m) {
      const [, id, audio, ep] = m;
      return cachedWatch(
        `watch:animedunya:${id}:${audio}:${ep}`,
        () => animedunya_default.fetch(request3)
      );
    }
    m = path.match(/^\/watch\/animeonsen\/(\d+)\/(sub|dub)\/animeonsen-(\d+)\/?$/);
    if (m) {
      const [, id, audio, ep] = m;
      return cachedWatch(
        `watch:animeonsen:${id}:${audio}:${ep}`,
        () => animeonsen_default.fetch(request3)
      );
    }
    m = path.match(/^\/watch\/anipm\/(\d+)\/(sub|dub)\/anipm-(\d+)\/?$/);
    if (m) {
      const [, id, audio, ep] = m;
      return cachedWatch(
        `watch:anipm:${id}:${audio}:${ep}`,
        () => anipm_default.fetch(request3),
        SIGNED_STREAM_WATCH_TTL
      );
    }
    if (path.startsWith("/watch/")) return json4({ error: "Not found" }, 404);
    return json4({
      name: `Anivexa API ${apiVersion}`,
      cache: isCacheEnabled(),
      providers: [
        "mkissa",
        "reanime",
        "anikoto",
        "animegg",
        "animenosub",
        "anizone",
        "aniwaves",
        "senshi",
        "kaa",
        "animedunya",
        "animeonsen",
        "anipm"
      ],
      routes: [
        "/map/:anilistId",
        "/episodes/:anilistId",
        "/episodes/:provider[/:provider...]/:anilistId?map=true|false",
        "/watch/mkissa/:id/sub|dub/mkissa-:ep",
        "/watch/reanime/:id/sub|dub/reanime-:ep",
        "/stream/reanime/:id/sub|dub/:ep",
        "/watch/anikoto/:id/sub|dub/anikoto-:ep",
        "/watch/animegg/:id/sub|dub/animegg-:ep",
        "/watch/animenosub/:id/sub|dub/animenosub-:ep",
        "/watch/anizone/:id/sub|dub/anizone-:ep",
        "/watch/aniwaves/:id/sub|dub/aniwaves-:ep",
        "/watch/senshi/:id/sub|dub/senshi-:ep",
        "/watch/kaa/:id/sub|dub/kaa-:ep",
        "/watch/animedunya/:id/sub|dub/animedunya-:ep",
        "/watch/animeonsen/:id/sub|dub/animeonsen-:ep",
        "/watch/anipm/:id/sub|dub/anipm-:ep"
      ]
    });
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var drainBody = /* @__PURE__ */ __name(async (request3, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request3, env2);
  } finally {
    try {
      if (request3.body !== null && !request3.bodyUsed) {
        const reader = request3.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request3, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request3, env2);
  } catch (e) {
    const error3 = reduceError(e);
    const body = JSON.stringify(error3);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-tj8hnn/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = index_default;

// node_modules/wrangler/templates/middleware/common.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request3, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request3, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request3, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request3, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-tj8hnn/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request3, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request3, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request3, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request3, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request3, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request3);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request3) {
      return __facade_invoke__(
        request3,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
