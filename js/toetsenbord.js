class Toetsenbord {
  constructor() {
    $(() => {
      $(document).keydown(e => this.on_keydown(e))
    })
  }

  on_keydown(e) {
    const key = e.which
    if (65 <= key && key <= 90) {
      // Letter!
      const letter = String.fromCharCode(key)
      if (typeof this[letter] === 'function') {
        this[letter]()
      }
    }
  }
}
