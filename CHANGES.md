# Changes

## 0.0.5 (2023-12-29)

This is a maintenance release.

### Changed

- Updated dependencies

## 0.0.4 (2023-10-21)

### Changed

- Updated dependencies

## 0.0.3 (2023-09-07)

### Changed

- Removed dependency on Bluebird promises
- Fixed tests to work with native promises

## 0.0.2 (2022-11-10)

### Added

- Added `limitedConcurrency()` to allow for limiting the number of concurrent promises running at a time.

## 0.0.1 (2022-10-01)

### Added

- Added `protectPromise()` to protect promises
- Added `coalescePromises()` to allow you to run a bunch of promises and coalesce them by whether they were resolved or rejected.
