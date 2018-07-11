import {
  Audio,
} from 'expo'

export default (function Singleton() {
  let instance

  function createInstance() {
    const object = {
      initAudio: true,
      playing: false,
      audio: new Audio.Sound(),
      title: 'unknow...',
      artist: 'unknow...',
      slug: null,
    }

    return object
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance()
      }

      return instance
    },
    updateInstance(data) {
      instance = {
        ...instance,
        ...data,
      }

      return instance
    },
  }
}())
