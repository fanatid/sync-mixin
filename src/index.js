export default {
  _getSyncCount () {
    if (this._syncCount === undefined) {
      this._syncCount = 0
    }

    return this._syncCount
  },

  _setSyncCount (value) {
    let wasSyncing = this.isSyncing()
    this._syncCount = value

    if (wasSyncing && value === 0) {
      this.emit('syncStop')
    }

    if (!wasSyncing && value > 0) {
      this.emit('syncStart')
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
