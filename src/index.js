export default {
  _getSyncCount () {
    if (this._syncCount === undefined) {
      this._syncCount = 0
    }

    return this._syncCount
  },

  _setSyncCount (value) {
    this._syncCount = value

    if (value === 0) {
      return this.emit('syncStop')
    }

    if (value === 1) {
      return this.emit('syncStart')
    }
  },

  _syncEnter () {
    this._setSyncCount(this._getSyncCount() + 1)
  },

  _syncExit () {
    this._setSyncCount(this._getSyncCount() - 1)
  },

  async _withSync (fn) {
    this._syncEnter()
    try {
      return await fn()
    } finally {
      this._syncExit()
    }
  },

  _syncExitAll () {
    this._setSyncCount(0)
  },

  isSyncing () {
    return this._getSyncCount() > 0
  }
}
