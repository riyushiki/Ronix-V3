# Changelog

### [2.0.2](https://www.github.com/mljs/peak-shape-generator/compare/v2.0.1...v2.0.2) (2021-08-12)


### Bug Fixes

* avoid import/named eslint error ([3345373](https://www.github.com/mljs/peak-shape-generator/commit/3345373aa3ab5ceffeffc596886d21cec82efeb9))

### [2.0.1](https://www.github.com/mljs/peak-shape-generator/compare/v2.0.0...v2.0.1) (2021-08-09)


### Bug Fixes

* exhaustive switch and export interfaces ([#48](https://www.github.com/mljs/peak-shape-generator/issues/48)) ([590fbaa](https://www.github.com/mljs/peak-shape-generator/commit/590fbaa976de614fc637e208f46917cc023f657e))

## [2.0.0](https://www.github.com/mljs/peak-shape-generator/compare/v1.0.0...v2.0.0) (2021-08-06)


### ⚠ BREAKING CHANGES

* 

### Features

* abstract methods to abstract class Shape2D ([52c065e](https://www.github.com/mljs/peak-shape-generator/commit/52c065e765b665339cd1773f5ce400ac714fd2fe))
* classes extend Shape1D or Shape2D ([de6ce2c](https://www.github.com/mljs/peak-shape-generator/commit/de6ce2c3576e045bda335c1ace9815d25359dfe0))
* classes extend Shape1D or Shape2D ([99dc46c](https://www.github.com/mljs/peak-shape-generator/commit/99dc46c4b95748a017da175cbc659893f61e7384))
* typescript migration ([#45](https://www.github.com/mljs/peak-shape-generator/issues/45)) ([f546490](https://www.github.com/mljs/peak-shape-generator/commit/f546490c897039e7ec5790acecc0227644b726d3))


### Bug Fixes

* workflows master branch is now 'main' ([69dc7a0](https://www.github.com/mljs/peak-shape-generator/commit/69dc7a05e9ccd54f9dde7fb012d3a674bf0982f3))

## [1.0.0](https://www.github.com/mljs/peak-shape-generator/compare/v0.14.0...v1.0.0) (2021-03-24)


### Bug Fixes

* update readme ([a31c51b](https://www.github.com/mljs/peak-shape-generator/commit/a31c51ba010619b5230bac8b9e76b8bd9b79d5a3))

## [0.14.0](https://www.github.com/mljs/peak-shape-generator/compare/v0.13.0...v0.14.0) (2021-02-02)


### Features

* fix getShapeGenerator for gaussian2D ([68d8271](https://www.github.com/mljs/peak-shape-generator/commit/68d827151db69d9b54fe7afc2a913f81b110ba03))

## [0.13.0](https://www.github.com/mljs/peak-shape-generator/compare/v0.12.0...v0.13.0) (2021-01-29)


### Features

* add gaussian2D class ([#37](https://www.github.com/mljs/peak-shape-generator/issues/37)) ([39ba7d9](https://www.github.com/mljs/peak-shape-generator/commit/39ba7d967690a51b4fb9482bf0338b652ec8bd2b))

## [0.12.0](https://www.github.com/mljs/peak-shape-generator/compare/v0.11.0...v0.12.0) (2020-12-11)


### Features

* add fwhmToWidth, widthToFWHM and getFactor static function for each kind of shape ([0bc6807](https://www.github.com/mljs/peak-shape-generator/commit/0bc6807da60d3777d80a751a0220f2ad3fd18ae3))
* implement internal erfinv code ([13b1e7a](https://www.github.com/mljs/peak-shape-generator/commit/13b1e7a328f3b1d713da4d0625463b89feb9135b))


### Bug Fixes

* avoid a big factor for mu=1 in pseudoVoigt shape ([20a79a1](https://www.github.com/mljs/peak-shape-generator/commit/20a79a136341f0ee59c8daff5bd1cbcfde10cbc5)), closes [#35](https://www.github.com/mljs/peak-shape-generator/issues/35)

## [0.11.0](https://www.github.com/mljs/peak-shape-generator/compare/v0.10.2...v0.11.0) (2020-12-10)


### Features

* add getShapeFct ([6792fd7](https://www.github.com/mljs/peak-shape-generator/commit/6792fd71a194a34ad50c689f1b3ed3be1e915b23))
* add getShapeGenerator function ([ba19753](https://www.github.com/mljs/peak-shape-generator/commit/ba19753360f29448a6eb83f08b740bc6c741668a))
* interval option to calculate the shape values ([8ad11d9](https://www.github.com/mljs/peak-shape-generator/commit/8ad11d9e1c247811d55881adc5af5bd430d7f8b0))
* It is possible to have differents fwhm for gaussian and lorentzian contributions in pseudo voigt shape ([a5658a4](https://www.github.com/mljs/peak-shape-generator/commit/a5658a483bd0953eda074dfa89f556802b75c759))
* refactor and added getArea static function ([240b792](https://www.github.com/mljs/peak-shape-generator/commit/240b792cecf315db8cc3585ac0890c4b578b8eda))


### Bug Fixes

* convertion between with between inflection points and FWHM ([3f6657d](https://www.github.com/mljs/peak-shape-generator/commit/3f6657da4f31e21aa5e0a5fa5fd9297c08e489ab))

### [0.10.2](https://www.github.com/mljs/peak-shape-generator/compare/v0.10.1...v0.10.2) (2020-11-16)


### Bug Fixes

* wrong covertion from FWHM to width between inflectionPointswidth ([75b7763](https://www.github.com/mljs/peak-shape-generator/commit/75b776399473b43cbb96e3b955cf23d957786d16))

### [0.10.1](https://www.github.com/mljs/peak-shape-generator/compare/v0.10.0...v0.10.1) (2020-11-16)


### Bug Fixes

* wrong convertion from standard deviation to FWHM ([66f1bd5](https://www.github.com/mljs/peak-shape-generator/commit/66f1bd5be618b8d845b5b31fe5cd570bf708ac38))
* wrong covertion from width between inflectionPointswidth to FWHM ([8d3a658](https://www.github.com/mljs/peak-shape-generator/commit/8d3a6581130769e24a7f10659600f5ff671fdfda))

## [0.10.0](https://www.github.com/mljs/peak-shape-generator/compare/v0.9.0...v0.10.0) (2020-11-12)


### Features

* export getKind ([997266e](https://www.github.com/mljs/peak-shape-generator/commit/997266e3e7ea340ec51c13352ea2d7f1c08636aa))

## [0.9.0](https://www.github.com/mljs/peak-shape-generator/compare/v0.8.0...v0.9.0) (2020-11-12)


### Features

* fix homepage link in package.json ([7b3b1db](https://www.github.com/mljs/peak-shape-generator/commit/7b3b1dbb89ab7658ceb13d74e051fe4982c0071f))

## [0.8.0](https://www.github.com/mljs/peak-shape-generator/compare/v0.7.0...v0.8.0) (2020-11-11)


### Features

* add getArea ([b77b3a0](https://www.github.com/mljs/peak-shape-generator/commit/b77b3a090ae4b042d6535fb3657ed19887130389))
* add inflectionPointsWidthToFWHM and fwhmToInflectionPointsWidth ([#25](https://www.github.com/mljs/peak-shape-generator/issues/25)) ([c3c2c2a](https://www.github.com/mljs/peak-shape-generator/commit/c3c2c2a52675394385fb81f3eb9da8f8e1be99cf)), closes [#21](https://www.github.com/mljs/peak-shape-generator/issues/21)
* added getArea method  ([#23](https://www.github.com/mljs/peak-shape-generator/issues/23)) ([cccc44e](https://www.github.com/mljs/peak-shape-generator/commit/cccc44e48148b17da41f302a59892168246b3a7b)), closes [#17](https://www.github.com/mljs/peak-shape-generator/issues/17)

## [0.7.0](https://www.github.com/mljs/peak-shape-generator/compare/v0.6.1...v0.7.0) (2020-11-04)


### ⚠ BREAKING CHANGES

* refactor xFct functions (#19)

### Features

* refactor xFct functions ([#19](https://www.github.com/mljs/peak-shape-generator/issues/19)) ([1c0271e](https://www.github.com/mljs/peak-shape-generator/commit/1c0271eaf7292c8080ac76f6fe79470f6d2b030c))

### [0.6.1](https://www.github.com/mljs/peak-shape-generator/compare/v0.6.0...v0.6.1) (2020-11-04)


### Bug Fixes

* replace hash-object by object-hash for browser compatiblity ([8aec664](https://www.github.com/mljs/peak-shape-generator/commit/8aec664692bcaba9eb891c22e104bc676420a6dc))

## [0.6.0](https://www.github.com/mljs/peak-shape-generator/compare/v0.5.1...v0.6.0) (2020-11-03)


### Features

* export function and deal with shape height ([f7dfade](https://www.github.com/mljs/peak-shape-generator/commit/f7dfade288d37b8f3fddd01d9205751a1cea7eb2))

### [0.5.1](https://www.github.com/mljs/peak-shape-generator/compare/v0.5.0...v0.5.1) (2020-10-14)


### Bug Fixes

* remove docs ([e84aa37](https://www.github.com/mljs/peak-shape-generator/commit/e84aa371ef440a0feb49cddea15c5a5ab4af3dd0))

## [0.5.0](https://github.com/cheminfo/ml-peak-shape-generator/compare/v0.4.0...v0.5.0) (2020-10-14)


### Features

* add PeakShapeGenerator ([142a750](https://github.com/cheminfo/ml-peak-shape-generator/commit/142a7501e2326eb105f19884663aff9c99e95057))


### Bug Fixes

* default length to odd number ([0d77fff](https://github.com/cheminfo/ml-peak-shape-generator/commit/0d77fff7f09b2cf8591d2b58ed1b1eca909a5df3))
* ensure default odd number of points ([720b864](https://github.com/cheminfo/ml-peak-shape-generator/commit/720b864740027e45d23a05587b76a593e163eebd))

# [0.4.0](https://github.com/cheminfo/ml-peak-shape-generator/compare/v0.3.0...v0.4.0) (2020-03-06)


### Bug Fixes

* documentation ([09b4ab8](https://github.com/cheminfo/ml-peak-shape-generator/commit/09b4ab89223f2c603eb76969c81f4c37823b22f8))


### Features

* returns data + fwhm ([01483ed](https://github.com/cheminfo/ml-peak-shape-generator/commit/01483ed5d8ec7ae78cd161a4aa77a588f313d86f))



# [0.3.0](https://github.com/cheminfo/ml-peak-shape-generator/compare/v0.2.0...v0.3.0) (2020-03-02)


### Features

* allow to specify final length of array ([e83ab31](https://github.com/cheminfo/ml-peak-shape-generator/commit/e83ab31f59c141b95a9f76d6cee782cd6b70b9a8))



# [0.2.0](https://github.com/cheminfo/ml-peak-shape-generator/compare/v0.1.0...v0.2.0) (2020-03-02)


### Bug Fixes

* final nbPoints is always fwhm * factor ([c72259b](https://github.com/cheminfo/ml-peak-shape-generator/commit/c72259be2e808754dfe8802062bcf4995bdf2313))



# [0.1.0](https://github.com/cheminfo/ml-peak-shape-generator/compare/v0.0.1...v0.1.0) (2020-03-02)


### Features

* add getShape ([10264f5](https://github.com/cheminfo/ml-peak-shape-generator/commit/10264f5387cfa50b0e2938ee2c1df2b96a8abeb5))



## 0.0.1 (2020-02-29)
