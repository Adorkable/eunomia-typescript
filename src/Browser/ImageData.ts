export const saveImageDataToFile = (imageData: string, fileName: string) => {
  var link = document.createElement('a')
  if (link && typeof link.download === 'string') {
    if (document.body) {
      const body = document.body
      body.appendChild(link) // Firefox requires the link to be in the body
      link.download = fileName
      link.href = imageData
      link.click()
      body.removeChild(link) // remove the link when done
    } else {
      alert('There was an issue attempting to save, please try again!')
      console.log(
        'Error: while attempting to save there was no document.body available'
      )
    }
  } else {
    // TODO:
    // location.replace(uri);
  }
}

declare global {
  interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, defaultName: string) => void
  }
}

export const saveImageStateToFile = (imageState: Object, fileName: string) => {
  const contents = JSON.stringify(imageState)
  var file = new Blob([contents], { type: 'txt' })
  if (window.navigator.msSaveOrOpenBlob) {
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, fileName)
  } else {
    // Others
    const a = document.createElement('a')
    const url = URL.createObjectURL(file)
    a.href = url
    a.download = fileName
    if (document.body) {
      document.body.appendChild(a)
    }
    a.click()
    setTimeout(function () {
      if (document.body) {
        document.body.removeChild(a)
      }
      window.URL.revokeObjectURL(url)
    }, 0)
  }
}
