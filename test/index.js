import { expect } from 'chai'
import { EventEmitter } from 'events'
import { mixin } from 'core-decorators'

import SyncMixin from '../src'

describe('SyncMixin', () => {
  let tc

  @mixin(SyncMixin)
  class TestCls extends EventEmitter {}

  beforeEach(() => {
    tc = new TestCls()
  })

  afterEach(() => {
    tc.removeAllListeners()
  })

  it('_syncEnter/_syncExit', async () => {
    expect(tc._getSyncCount()).to.equal(0)

    await new Promise((resolve, reject) => {
      tc.once('syncStart', resolve)
      setTimeout(() => reject('expect emit syncStart'), 10)
      tc._syncEnter()
    })
    expect(tc._getSyncCount()).to.equal(1)

    await new Promise((resolve, reject) => {
      tc.once('syncStart', () => reject('not expect emit syncStart'))
      setTimeout(resolve, 10)
      tc._syncEnter()
    })
    expect(tc._getSyncCount()).to.equal(2)

    await new Promise((resolve, reject) => {
      tc.once('syncStop', () => reject('not expect emit syncStop'))
      setTimeout(resolve, 10)
      tc._syncExit()
    })
    expect(tc._getSyncCount()).to.equal(1)

    await new Promise((resolve, reject) => {
      tc.once('syncStop', resolve)
      setTimeout(() => reject('expect emit syncStop'), 10)
      tc._syncExit()
    })
    expect(tc._getSyncCount()).to.equal(0)
  })

  it('_withSync', async () => {
    expect(tc._getSyncCount()).to.equal(0)

    await new Promise(async (resolve, reject) => {
      let deferred
      function continueFunc () {
        if (deferred) {
          Promise.resolve()
            .then(async () => {
              await new Promise((resolve) => setTimeout(resolve, 100))
              await new Promise((resolve, reject) => {
                tc.once('syncStart', () => reject('not expect emit syncStart'))
                setTimeout(resolve, 10)

                tc._withSync(() => {})
              })
            })
            .then(deferred.resolve, deferred.reject)
        } else {
          deferred = {}
          deferred.promise = new Promise((resolve, reject) => {
            deferred = {resolve: resolve, reject: reject}
          })
        }

        return deferred.promise
      }

      tc.once('syncStart', continueFunc)
      setTimeout(() => reject('expect emit syncStart'), 1000)

      tc._withSync(continueFunc).then(resolve, reject)
    })

    expect(tc._getSyncCount()).to.equal(0)
  })

  it('_syncExitAll', async () => {
    tc._syncEnter()
    tc._syncEnter()
    expect(tc._getSyncCount()).to.equal(2)

    await new Promise((resolve, reject) => {
      tc.once('syncStop', resolve)
      setTimeout(() => reject('expect emit syncStop'), 10)
      tc._syncExitAll()
    })
    expect(tc._getSyncCount()).to.equal(0)
  })

  it('isSyncing', async () => {
    expect(tc.isSyncing()).to.be.false

    tc._syncEnter()
    expect(tc.isSyncing()).to.be.true

    tc._syncEnter()
    expect(tc.isSyncing()).to.be.true

    tc._syncExitAll()
    expect(tc.isSyncing()).to.be.false
  })
})
