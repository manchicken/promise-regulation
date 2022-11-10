# promise-regulation

This is a simple Node library to help you take a bit more control over your Promises.

## Why?

In large data processing scenarios where you use Promises to help manage asynchronous processes, it can sometimes be really tedious to manage all of your Promise rejects and resolves. Sometimes you just want to have a bunch of Promises which run, and then you'll handle which ones resolve and reject when the processing is done. This module helps with that task.

This can help you reduce code complexity, and can result in a more fault-tolerant data processing program.

## Protected Promises

If you use `Promise.all()` for a bunch of Promises, and one of them rejects, you get a rejection from the `Promise.all()` call. This can lead some to add complexity, and all together it can reduce the reliability of large-ish data processing tasks. A Protected Promise is a Promise which has been protected using the `protectPromise()` function. This adds fault tolerance to the individual Promise so that it can be run in a way which still holds on to the rejection context but which allows the list of Promises to all be run.

## Usage

### `protectPromise()`

This function will make the `Promise` you pass in to it always resolve and never reject, but in the event of a caught rejection the resolved value will be `PromiseProtectedRejected` which is an `Error` type.

In this example, you can see that I have a promise which resolves.

```javascript
// A function which resolves a Promise with a value of 1
const resolvePromise = () => Promise.resolve(1)

// A function which rejects a Promise with an Error
const rejectPromise = () => Promise.reject(new Error('Rejected'))

// Let's protect the resolvePromise
expect(protectPromise(resolvePromise)).resolves.toBe(1)

// Let's protect the rejectPromise
expect(promiseProtectedRejected(protectPromise(rejectPromise))).resolves.toBeInstanceOf(PromiseProtectedRejected)
```

### `coalescePromises()`

In this example, you can use `coalescePromises()` to track which promises resolved successfully, and which were rejected.

```javascript
const { coalescePromises } = require('@manchicken/promise-regulation')
const { readdir, unlink } = require('fs/promises')
const path = require('path')

const deleteAllFilesInFolder = (folderPath) =>
  Promise.resolve()
    .then(() =>
      readdir(folderPath, { withFileTypes: true })
    )
    .then((contents) =>
      coalescePromises(
        contents
          .filter((entry) => entry.isFile())
          .map((fileEntry) => path.resolve(folderPath, fileEntry.name))
          .map((fileEntry) => unlink(fileEntry)),
      ),
    )
```

At the end of this, you'll see the `resolved` entries with all of the `unlink()` results, and you'll also see the `rejected` entries with all of the ones which failed to be deleted.

### `limitedConcurrency()`

This function provides the ability to run a bunch of promises, but limit how many are running concurrently. This can be useful if you have a bunch of promises which are IO bound, and you want to limit the number of concurrent IO operations. It's also super helpful if you are operating in an environment, such as AWS Lambda or other such serverless implementation, where resource constraints get in the way of your ability to run a bunch of promises concurrently.

```javascript
const { limitedConcurrency } = require('@manchicken/promise-regulation')

const allRegions = someFunctionWhichReturnsABunchOfRegions() // Fake function for demonstration purposes

const operationsToRun = allRegions.map((region) => () => someFunctionWhichReturnsAPromise(region))
await limitConcurrency(operationToRun, 5)
```
