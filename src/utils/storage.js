const storage = {
  set (name, value) {
    if (!value) {
      localStorage.removeItem(name)
      return
    }
    const expire = new Date().getTime()
    localStorage[name] = JSON.stringify({
      value,
      time: expire + 7 * 24 * 60 * 60 * 1000
    })
  },
  get (name) {
    const data = localStorage[name]
    if (data !== undefined) {
      const cacheData = JSON.parse(data)
      if (!cacheData || cacheData.time < new Date()) {
        localStorage.removeItem(name)
        return null
      }
      return cacheData.value
    }
  },
  remove (name) {
    return localStorage.removeItem(name)
  }
}
export default storage
