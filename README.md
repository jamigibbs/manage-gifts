[![Build Status](https://travis-ci.com/jamigibbs/gift-manager.svg?branch=development)](https://travis-ci.com/jamigibbs/gift-manager)

# Gift Manager

Step away from the spreadsheet

## Gitflow

### Features

All features are developed on `feature/...` branches. A feature branch will submit a pull request into the `development` branch.

### Releases

Approved feature branches are merged into `development` and the `development` branch is tested.

At deployment time, `development` is merged into `master` and a tag is assigned. This tag is named with [semantic versioning](https://semver.org/) and becomes the latest release.

### Bugs after release

Any bugs/regressions found after the release are dealt with using a `hotfix/...` branch. A hotfix branch will be tested and merged in the same way as standard `release` branches.
