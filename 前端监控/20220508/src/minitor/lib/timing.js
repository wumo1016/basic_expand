import { formatTime, getLastEvent, getSelector, onload } from '../util'
import tracker from '../util/tracker'

export function timing() {
  let FMP, LCP
  // FMP (有意义的元素可以手动在标签上添加属性 elementtiming="meaningful")
  new PerformanceObserver((entryList, observer) => {
    let perfEntries = entryList.getEntries()
    FMP = perfEntries[0]
    observer.disconnect()
  }).observe({ entryTypes: ['element'] })
  // LCP
  new PerformanceObserver((entryList, observer) => {
    const perfEntries = entryList.getEntries()
    const lastEntry = perfEntries[perfEntries.length - 1]
    LCP = lastEntry
    observer.disconnect()
  }).observe({ entryTypes: ['largest-contentful-paint'] })
  // FID
  new PerformanceObserver(function (entryList, observer) {
    let lastEvent = getLastEvent()
    const firstInput = entryList.getEntries()[0]
    if (firstInput) {
      let inputDelay = firstInput.processingStart - firstInput.startTime //处理延迟
      let duration = firstInput.duration //处理耗时
      if (firstInput > 0 || duration > 0) {
        console.log(123);
        tracker.send({
          kind: 'experience',
          type: 'firstInputDelay',
          inputDelay: inputDelay ? formatTime(inputDelay) : 0,
          duration: duration ? formatTime(duration) : 0,
          startTime: firstInput.startTime,
          selector: lastEvent
            ? getSelector(lastEvent.path || lastEvent.target)
            : ''
        })
      }
    }
    observer.disconnect()
  }).observe({ type: 'first-input', buffered: true })

  onload(function () {
    setTimeout(() => {
      const {
        fetchStart,
        connectStart,
        connectEnd,
        requestStart,
        responseStart,
        responseEnd,
        domLoading,
        domInteractive,
        domContentLoadedEventStart,
        domContentLoadedEventEnd,
        loadEventStart
      } = performance.timing

      // 记录加载时间
      tracker.send({
        kind: 'experience', // 用户体验指标
        type: 'timing', // 统计每个阶段的时间
        connectTime: connectEnd - connectStart, // TCP连接耗时
        ttfbTime: responseStart - requestStart, // ttfb
        responseTime: responseEnd - responseStart, // Response响应耗时
        parseDOMTime: loadEventStart - domLoading, // DOM解析渲染耗时
        domContentLoadedTime:
          domContentLoadedEventEnd - domContentLoadedEventStart, // DOMContentLoaded事件回调耗时
        timeToInteractive: domInteractive - fetchStart, // 首次可交互时间
        loadTime: loadEventStart - fetchStart // 完整的加载时间
      })

      // 记录页面性能指标
      const FP = performance.getEntriesByName('first-paint')[0]
      const FCP = performance.getEntriesByName('first-contentful-paint')[0]
      // console.log(FP)
      // console.log(FCP)
      // console.log(FMP)
      // console.log(LCP)
      tracker.send({
        kind: 'experience',
        type: 'paint',
        firstPaint: FP ? formatTime(FP.startTime) : 0,
        firstContentPaint: FCP ? formatTime(FCP.startTime) : 0,
        firstMeaningfulPaint: FMP ? formatTime(FMP.startTime) : 0,
        largestContentfulPaint: LCP
          ? formatTime(LCP.renderTime || LCP.loadTime)
          : 0
      })
    }, 3000)
  })
}
