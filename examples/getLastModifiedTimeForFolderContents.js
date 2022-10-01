const { coalescePromises } = require('../src/coalesce-promises')
const { readdir, stat } = require('fs/promises')
const { resolve } = require('path')

const getLastModifiedTimeForFolderContents = (folderPath) =>
  Promise.resolve()
    .then(() => readdir(folderPath, { withFileTypes: true }))
    .then((contents) => {
      console.log(contents)
      return contents
    })
    .then((contents) =>
      coalescePromises(
        contents
          .filter((entry) => entry.isFile())
          .map((fileEntry) => resolve(folderPath, fileEntry.name))
          .map((fileEntry) =>
            stat(fileEntry).then((res) => {
              res.fileEntry = fileEntry
              return res
            }),
          ),
      ),
    )

const main = async () => {
  const results = await getLastModifiedTimeForFolderContents('src')
  console.log(results)
}
main()
