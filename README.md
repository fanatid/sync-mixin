# sync-mixin

[![NPM Package](https://img.shields.io/npm/v/sync-mixin.svg?style=flat-square)](https://www.npmjs.org/package/sync-mixin)
[![Build Status](https://img.shields.io/travis/fanatid/sync-mixin.svg?branch=master&style=flat-square)](https://travis-ci.org/fanatid/sync-mixin)
[![Coverage Status](https://img.shields.io/coveralls/fanatid/sync-mixin.svg?style=flat-square)](https://coveralls.io/r/fanatid/sync-mixin)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![Dependency status](https://img.shields.io/david/fanatid/sync-mixin.svg?style=flat-square)](https://david-dm.org/fanatid/sync-mixin#info=dependencies)

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

This software is licensed under the MIT License.
