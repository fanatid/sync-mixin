# sync-mixin

[![build status](https://img.shields.io/travis/fanatid/sync-mixin.svg?branch=master&style=flat-square)](http://travis-ci.org/fanatid/sync-mixin)
[![Coverage Status](https://img.shields.io/coveralls/fanatid/sync-mixin.svg?style=flat-square)](https://coveralls.io/r/fanatid/sync-mixin)
[![Dependency status](https://img.shields.io/david/fanatid/sync-mixin.svg?style=flat-square)](https://david-dm.org/fanatid/sync-mixin#info=dependencies)
[![Dev Dependency status](https://img.shields.io/david/fanatid/sync-mixin.svg?style=flat-square)](https://david-dm.org/fanatid/sync-mixin#info=devDependencies)

[![NPM](https://nodei.co/npm/sync-mixin.png?downloads=true)](https://www.npmjs.com/package/sync-mixin)
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Installation

```
npm install sync-mixin
```

## API

### _getSyncCount()

**return**: `number`

### _setSyncCount()

  * `number` value

### _syncEnter()

### _syncExit()

### _withSync()

  * `function` fn

**return**: `Promise`

### _syncExitAll()

### isSyncing()

## Examples

###

```js
import { mixin } from 'core-decorators'
import SyncMixin from 'sync-mixin'

@mixin(SyncMixin)
class Process {
  run () {
    return this._withSync(() => {
      // some code that require time for execution
    })
  }
}

let process = new Process()
process.on('syncStart', () => console.log('Syncronization started!'))
process.on('syncStop', () => console.log('Syncronization finished!'))
setInterval(::process.run, 60 * 1000)
```

## License

Code released under [the MIT license](LICENSE).
