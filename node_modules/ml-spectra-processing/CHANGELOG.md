# Changelog

## [6.8.0](https://www.github.com/mljs/spectra-processing/compare/v6.7.1...v6.8.0) (2021-07-23)


### Features

* add xUniqueSorted ([104cf0f](https://www.github.com/mljs/spectra-processing/commit/104cf0f8b31f1e31a07028093f8d374af5dfe5d3))

### [6.7.1](https://www.github.com/mljs/spectra-processing/compare/v6.7.0...v6.7.1) (2021-06-16)


### Bug Fixes

* **xyArrayAlignToFirst:** deal correctly with delta as function ([9cef8f4](https://www.github.com/mljs/spectra-processing/commit/9cef8f49bfa66acc17f66c2ddc62ee30f459d6f5))

## [6.7.0](https://www.github.com/mljs/spectra-processing/compare/v6.6.0...v6.7.0) (2021-06-16)


### Features

* add xyArrayAlighToFirst ([9ea0921](https://www.github.com/mljs/spectra-processing/commit/9ea0921617714eff982285eaa6aa6126c7e05e53))
* xyMedian function added ([#85](https://www.github.com/mljs/spectra-processing/issues/85)) ([e54280a](https://www.github.com/mljs/spectra-processing/commit/e54280a55417e7ade305248e3e6aec269aad730f))

## [6.6.0](https://www.github.com/mljs/spectra-processing/compare/v6.5.0...v6.6.0) (2021-05-12)


### Features

* export san plot chart ([#83](https://www.github.com/mljs/spectra-processing/issues/83)) ([fdaa738](https://www.github.com/mljs/spectra-processing/commit/fdaa738c48751dd514e99989570dd1200d5ac000))

## [6.5.0](https://www.github.com/mljs/spectra-processing/compare/v6.4.0...v6.5.0) (2021-05-04)


### Features

* optimize xySortX if already sorted ([e6dac65](https://www.github.com/mljs/spectra-processing/commit/e6dac65c584b9dcc64a5add1e9819051cf476db4))


### Bug Fixes

* script to deploy documentation ([2c2cbee](https://www.github.com/mljs/spectra-processing/commit/2c2cbee01967156ab1a2578ae0f8c6fbe8a3fd02))

## [6.4.0](https://www.github.com/mljs/spectra-processing/compare/v6.3.0...v6.4.0) (2021-05-04)


### Features

* add xyArrayWeightedMerge ([37032c2](https://www.github.com/mljs/spectra-processing/commit/37032c2da9b84f2503a58af7e83ce76c1673e357))
* xyArrayWeightedMerge allows a function for delta ([028eaa1](https://www.github.com/mljs/spectra-processing/commit/028eaa16648b33328207b1c2f4a01cbf06a4569f))

## [6.3.0](https://www.github.com/mljs/spectra-processing/compare/v6.2.1...v6.3.0) (2021-04-30)


### Features

* add xMinMaxValues ([7e2a85b](https://www.github.com/mljs/spectra-processing/commit/7e2a85bde1e3ca2adf828b80877ed63ee1d4d496))

### [6.2.1](https://www.github.com/mljs/spectra-processing/compare/v6.2.0...v6.2.1) (2021-04-30)


### Bug Fixes

* fix matrixHistogram with log scale ([c531c6c](https://www.github.com/mljs/spectra-processing/commit/c531c6c1754866cdde50a2202c65d0c7a13efb1e))

## [6.2.0](https://www.github.com/mljs/spectra-processing/compare/v6.1.3...v6.2.0) (2021-04-30)


### Features

* add absolute option in xHisotgram and matrixHistogram ([f3ea8a3](https://www.github.com/mljs/spectra-processing/commit/f3ea8a337d6464816bf9d764ca34ce10207c7a40))
* add matrixMinMaxAbsoluteZ ([0b30854](https://www.github.com/mljs/spectra-processing/commit/0b30854e6e5e35ca6ad1461777ff178568f1e0d6))
* add matrixMinMaxAbsoluteZ ([e8662e7](https://www.github.com/mljs/spectra-processing/commit/e8662e7c2502615e398969224230f2a8f0b8ba71))
* allow absolute in matrixHistogram ([f4e266c](https://www.github.com/mljs/spectra-processing/commit/f4e266cb327af3e8c1459f5b622a914d1ede9c2b))

### [6.1.3](https://www.github.com/mljs/spectra-processing/compare/v6.1.2...v6.1.3) (2021-04-29)


### Bug Fixes

* correct matrixHistogram for count of 0 ([a1c6b0d](https://www.github.com/mljs/spectra-processing/commit/a1c6b0d289ee612077b7931cceb52d110569544a))

### [6.1.2](https://www.github.com/mljs/spectra-processing/compare/v6.1.1...v6.1.2) (2021-04-29)


### Bug Fixes

* xHistogram log should be value + 1 ([024fd33](https://www.github.com/mljs/spectra-processing/commit/024fd3308f25d828f88dc49c929da634f44596c2))

### [6.1.1](https://www.github.com/mljs/spectra-processing/compare/v6.1.0...v6.1.1) (2021-04-29)


### Bug Fixes

* histogram is a float array to allow log ([7db1295](https://www.github.com/mljs/spectra-processing/commit/7db1295662a6193fdd773a29d21dfd4a6943c82a))

## [6.1.0](https://www.github.com/mljs/spectra-processing/compare/v6.0.0...v6.1.0) (2021-04-29)


### Features

* xHistogram and matrixHistogram add x and y log scale ([bf50407](https://www.github.com/mljs/spectra-processing/commit/bf50407c1927b9ae695c89b56bea1b3138b42f10))
* **xHistogram:** allow any base for log scale on X axis ([23dc2b3](https://www.github.com/mljs/spectra-processing/commit/23dc2b308c6135459d6a44db1704292cf5c51213))

## [6.0.0](https://www.github.com/mljs/spectra-processing/compare/v5.10.0...v6.0.0) (2021-04-25)


### ⚠ BREAKING CHANGES

* **matrixYRescale:** rename method to matrixZRescale
* **matrixCenterYMean:** rename method to matrixCenterZMean

### Features

* add matrixHistogram ([b49d2bf](https://www.github.com/mljs/spectra-processing/commit/b49d2bf353b6355aad9e21823234eb62daf199e5))
* **matrixCenterYMean:** rename method to matrixCenterZMean ([44f2673](https://www.github.com/mljs/spectra-processing/commit/44f2673b15f59480baa5c380ba5e3b77f950fd60))
* **matrixMinMaxZ:** add new method ([08d242e](https://www.github.com/mljs/spectra-processing/commit/08d242e6236b69f9ad8e12cf97cfffb7b1b7c99c))
* **matrixYRescale:** rename method to matrixZRescale ([8f980eb](https://www.github.com/mljs/spectra-processing/commit/8f980ebdcd1882f9de9e626b487a44ea1ce9c8c5))
* xHistogram returns a DataXY ([44089c7](https://www.github.com/mljs/spectra-processing/commit/44089c7915aad8372aba00c6857c4aa210150461))
* xHistogram: add log10Scale option ([6952e19](https://www.github.com/mljs/spectra-processing/commit/6952e1931ca7a0a2a984ae4a6c21f2f0e54c3d85))
* **xHistogram:** give possibility to append to existing histogram ([31f1e0d](https://www.github.com/mljs/spectra-processing/commit/31f1e0dad2b7585e7b71acaa9967a21317c9ddd0))


### Bug Fixes

* edge case of xHistogram ([40752b0](https://www.github.com/mljs/spectra-processing/commit/40752b0f3921262d25e1ff24c4df06ac0866100d))

## [5.10.0](https://www.github.com/mljs/spectra-processing/compare/v5.9.0...v5.10.0) (2021-04-22)


### Features

* add xCumulative ([a991750](https://www.github.com/mljs/spectra-processing/commit/a991750db1f218877bf457b67b20fe79147f20fd))
* add xyCumulativeDistributionStatistics ([d805015](https://www.github.com/mljs/spectra-processing/commit/d8050152c10b27dbafcc0da682beb2010134c85e))


### Bug Fixes

* xyCumulativeDistributionStatistics ([a154964](https://www.github.com/mljs/spectra-processing/commit/a154964e20bc554a77c9c1f7545fd0f2042685cc))

## [5.9.0](https://www.github.com/mljs/spectra-processing/compare/v5.8.0...v5.9.0) (2021-03-24)


### Features

* add xHistogram ([7297b55](https://www.github.com/mljs/spectra-processing/commit/7297b5507f3f0dd81bb8a4ea19db043b7830b0c4))


### Bug Fixes

* update dependencies ([80dcdcf](https://www.github.com/mljs/spectra-processing/commit/80dcdcf7303c1f01ed6c3f8dd16b8b8615eef938))

## [5.8.0](https://www.github.com/mljs/spectra-processing/compare/v5.7.2...v5.8.0) (2021-03-10)


### Features

* add xyArrayMerge ([e0a53ab](https://www.github.com/mljs/spectra-processing/commit/e0a53ab80614643d7f8eff70989d0b81e785baa6))

### [5.7.2](https://www.github.com/mljs/spectra-processing/compare/v5.7.1...v5.7.2) (2021-03-10)


### Bug Fixes

* xyObjectJoinX with y=0 ([feaa0fe](https://www.github.com/mljs/spectra-processing/commit/feaa0fe91923542963489835a7d0c00482d64f43))

### [5.7.1](https://www.github.com/mljs/spectra-processing/compare/v5.7.0...v5.7.1) (2021-03-09)


### Bug Fixes

* xyJoinX when Y values are zero ([69c7089](https://www.github.com/mljs/spectra-processing/commit/69c7089d048870f0266cf5db76cb8ab8c23326bb))

## [5.7.0](https://www.github.com/mljs/spectra-processing/compare/v5.6.0...v5.7.0) (2021-03-04)


### Features

* add xyFilterXPositive ([7d8ffcb](https://www.github.com/mljs/spectra-processing/commit/7d8ffcbe39702db030f514e37dcf7ba7f4d18db4))

## [5.6.0](https://www.github.com/mljs/spectra-processing/compare/v5.5.3...v5.6.0) (2021-03-03)


### Features

* filter non growing data ([#61](https://www.github.com/mljs/spectra-processing/issues/61)) ([f13c9eb](https://www.github.com/mljs/spectra-processing/commit/f13c9eb2666c5ca6c484ee1141a0761ca39c434e))

### [5.5.3](https://www.github.com/mljs/spectra-processing/compare/v5.5.2...v5.5.3) (2021-02-23)


### Bug Fixes

* release.yml ([e012f5d](https://www.github.com/mljs/spectra-processing/commit/e012f5d58d91c8fd23e4f8b7cdbe70df209b7d4d))

### [5.5.2](https://www.github.com/mljs/spectra-processing/compare/v5.5.1...v5.5.2) (2021-02-23)


### Bug Fixes

* try to change lactame.yml to trigger it ([28cd509](https://www.github.com/mljs/spectra-processing/commit/28cd509c3fbbf4bc0f1944062fa2627b3047de02))

### [5.5.1](https://www.github.com/mljs/spectra-processing/compare/v5.5.0...v5.5.1) (2021-02-23)


### Bug Fixes

* update documentation ([1292579](https://www.github.com/mljs/spectra-processing/commit/1292579334bb663b65204cdf039d520d14668dac))

## [5.5.0](https://www.github.com/mljs/spectra-processing/compare/v5.4.0...v5.5.0) (2021-02-23)


### Features

* add lactame deployment ([81f70c0](https://www.github.com/mljs/spectra-processing/commit/81f70c0741cf556327cd72a22e69319c96d20ef8))

## [5.4.0](https://www.github.com/mljs/spectra-processing/compare/v5.3.1...v5.4.0) (2021-02-23)


### Features

* add xMean ([7d98aa9](https://www.github.com/mljs/spectra-processing/commit/7d98aa9bab601a5a87214517853ba03a530ee527))
* add xyArrayAlign ([a96d786](https://www.github.com/mljs/spectra-processing/commit/a96d7867cf178d5e01f09663ea0c7934e3637f90))
* add xyJoinX ([6c53bf0](https://www.github.com/mljs/spectra-processing/commit/6c53bf08741c3bd5eef0a35f1231f2461d2a6264))
* delta may be a function in xyAlign ([f4cde8a](https://www.github.com/mljs/spectra-processing/commit/f4cde8a5c052872ab87d9428605bf585e8e9742b))

### [5.3.1](https://www.github.com/mljs/spectra-processing/compare/v5.3.0...v5.3.1) (2021-02-16)


### Bug Fixes

* xAdd/substract/divide/multiply also work with floatarray ([#53](https://www.github.com/mljs/spectra-processing/issues/53)) ([6460573](https://www.github.com/mljs/spectra-processing/commit/6460573974c04387f144faa4d0b7a88ebef9cec4))
* xMonotone was failing if it started with constant values ([#54](https://www.github.com/mljs/spectra-processing/issues/54)) ([3fbd82b](https://www.github.com/mljs/spectra-processing/commit/3fbd82b9a335724bbada5343e9654836ab769e47))

## [5.3.0](https://www.github.com/mljs/spectra-processing/compare/v5.2.0...v5.3.0) (2021-02-15)


### Features

* exporting xDotProduct in index.js ([#51](https://www.github.com/mljs/spectra-processing/issues/51)) ([e84b430](https://www.github.com/mljs/spectra-processing/commit/e84b4304b58919cfed0c8ef32e345666b7d20d7e))

## [5.2.0](https://www.github.com/mljs/spectra-processing/compare/v5.1.0...v5.2.0) (2021-02-10)


### Features

* added rollingMax, rollingMin ([#48](https://www.github.com/mljs/spectra-processing/issues/48)) ([083ca2c](https://www.github.com/mljs/spectra-processing/commit/083ca2c24a1364dd5fee1f310ee3624192704326))
* implemented mae and mse ([#50](https://www.github.com/mljs/spectra-processing/issues/50)) ([5cabd0a](https://www.github.com/mljs/spectra-processing/commit/5cabd0a9c2c65b5b71d949bd47bd8a023a57715f))

## [5.1.0](https://www.github.com/mljs/spectra-processing/compare/v5.0.0...v5.1.0) (2021-01-19)


### Features

* add matrixCenterYMean ([55dd43c](https://www.github.com/mljs/spectra-processing/commit/55dd43c8a31a2be34d0c614b319c6f56d327a6f2))
* add matrixYRescale ([1acf214](https://www.github.com/mljs/spectra-processing/commit/1acf21484c291b9cc9c4a6fd210b30bb15dfd2ed))
* rename probabilisticQuotientNormalization to matrixPQN ([8a1c7e0](https://www.github.com/mljs/spectra-processing/commit/8a1c7e03c698db88e5a4dc829c47d98a724a2721))

## [5.0.0](https://www.github.com/mljs/spectra-processing/compare/v4.12.0...v5.0.0) (2021-01-19)


### ⚠ BREAKING CHANGES

* rename xyXShift to xyCalibrate

### Features

* rename xyXShift to xyCalibrate ([eb04e3d](https://www.github.com/mljs/spectra-processing/commit/eb04e3d2dec985e092d730e0feec5d5254d6860c))

## [4.12.0](https://www.github.com/mljs/spectra-processing/compare/v4.11.0...v4.12.0) (2021-01-08)


### Features

* add xMaxValue ([df69c01](https://www.github.com/mljs/spectra-processing/commit/df69c01003788510ffb2bb80bf8e724000885869))
* add xMinValue ([4674548](https://www.github.com/mljs/spectra-processing/commit/467454822b888a81409cf2143623deff8909e6fc))
* add xSum ([6c3b90c](https://www.github.com/mljs/spectra-processing/commit/6c3b90ca16ce2eab5ee615b195dff323bdebcffc))

## [4.11.0](https://www.github.com/mljs/spectra-processing/compare/v4.10.0...v4.11.0) (2021-01-08)


### Features

* add createSequentialArray ([649547d](https://www.github.com/mljs/spectra-processing/commit/649547d48c51f8b4ce95553824ed8b92b6b17040))
* add xParetoNormalization ([ec0c517](https://www.github.com/mljs/spectra-processing/commit/ec0c5170f097fb0d4e8ed2a05e8aa96c5a4062b4))


### Bug Fixes

* change mean by median close[#32](https://www.github.com/mljs/spectra-processing/issues/32) ([#40](https://www.github.com/mljs/spectra-processing/issues/40)) ([9272c73](https://www.github.com/mljs/spectra-processing/commit/9272c7373b930567ee5ca2ab01ca746af495e8bc))

## [4.10.0](https://www.github.com/mljs/spectra-processing/compare/v4.9.4...v4.10.0) (2020-12-08)


### Features

* add xyUniqueX and xyQuickSortX ([6fd6711](https://www.github.com/mljs/spectra-processing/commit/6fd6711c61d3bfb5cc0ee8e73894c6564e80710b))
* add xyUniqueX and xySortX ([3ab1b4e](https://www.github.com/mljs/spectra-processing/commit/3ab1b4ed1380197747eacf62544f4679349481e8))

### [4.9.4](https://www.github.com/mljs/spectra-processing/compare/v4.9.3...v4.9.4) (2020-11-19)


### Bug Fixes

* return value of xyXShift if from / to not defined ([ca747f5](https://www.github.com/mljs/spectra-processing/commit/ca747f5af8d88fd09b5d20162d753afdae6d7f43))

### [4.9.3](https://www.github.com/mljs/spectra-processing/compare/v4.9.2...v4.9.3) (2020-11-19)


### Bug Fixes

* deal with from=0 or to=0 in xyXShift ([e0f8292](https://www.github.com/mljs/spectra-processing/commit/e0f829247c66712560d76a662e349aa97f3fb1b7))
* in xyXShift if no peaks returns 0 ([19b1643](https://www.github.com/mljs/spectra-processing/commit/19b1643c66f4ceccf416ec0140f0b64c76892960))

### [4.9.2](https://www.github.com/mljs/spectra-processing/compare/v4.9.1...v4.9.2) (2020-11-18)


### Bug Fixes

* documentation ([be46a70](https://www.github.com/mljs/spectra-processing/commit/be46a70b6fffa39e5d869f95930e226627b20ae9))

### [4.9.1](https://www.github.com/mljs/spectra-processing/compare/v4.9.0...v4.9.1) (2020-11-18)


### Bug Fixes

* remove docs ([b82a088](https://www.github.com/mljs/spectra-processing/commit/b82a088368dc55599db1847cc598bd5a8a3c962b))

## [4.9.0](https://www.github.com/mljs/spectra-processing/compare/v4.8.0...v4.9.0) (2020-11-18)


### Features

* add xyXShift ([2dd4b48](https://www.github.com/mljs/spectra-processing/commit/2dd4b4894307dc9f8aa2262d4db419dfaa455fac))

## [4.8.0](https://www.github.com/mljs/spectra-processing/compare/v4.7.0...v4.8.0) (2020-11-11)


### Features

* add Probabilistic quotient normalization method ([#30](https://www.github.com/mljs/spectra-processing/issues/30)) ([67f2ce0](https://www.github.com/mljs/spectra-processing/commit/67f2ce0243ef5d7648614e47b34e57ebd7dc5050))

## [4.7.0](https://www.github.com/mljs/spectra-processing/compare/v4.6.0...v4.7.0) (2020-11-06)


### Features

* add xyToXYArray ([71c2c4a](https://www.github.com/mljs/spectra-processing/commit/71c2c4a4f55f3c723117bb2a42a4524dbd1bb313))

## [4.6.0](https://www.github.com/mljs/spectra-processing/compare/v4.5.1...v4.6.0) (2020-11-02)


### Features

* add xyToXYArray ([17a9de5](https://www.github.com/mljs/spectra-processing/commit/17a9de5accc7107fcc4ab5af85a4d2d286234cf6))

### [4.5.1](https://www.github.com/mljs/spectra-processing/compare/v4.5.0...v4.5.1) (2020-10-09)


### Bug Fixes

* setup registry url for npm publish ([1ae83d5](https://www.github.com/mljs/spectra-processing/commit/1ae83d522591871f2c8d44e3b34e0ed057d8f28a))

## [4.5.0](https://www.github.com/mljs/spectra-processing/compare/v4.4.0...v4.5.0) (2020-10-09)


### Features

* add xyRolling ([#24](https://www.github.com/mljs/spectra-processing/issues/24)) ([0613eae](https://www.github.com/mljs/spectra-processing/commit/0613eaec01cfe13da6da6ec92e91a22e89183f75))


### Bug Fixes

* check that xRolling parameter is an array ([eb398ba](https://www.github.com/mljs/spectra-processing/commit/eb398baf813e7aef33b4b104d92c17165080a8f1))

## [4.4.0](https://www.github.com/mljs/spectra-processing/compare/v4.3.0...v4.4.0) (2020-10-09)


### Features

* add xRolling and xRollingAverage ([#19](https://www.github.com/mljs/spectra-processing/issues/19)) ([a439036](https://www.github.com/mljs/spectra-processing/commit/a439036365311d50374fd70a1e59f61033a91ddb))
* add xRollingMedian ([#21](https://www.github.com/mljs/spectra-processing/issues/21)) ([32676ab](https://www.github.com/mljs/spectra-processing/commit/32676ab12ea5ee70e8862dc0c4063dff90a470ee))

## [4.3.0](https://github.com/cheminfo/spectra-processing/compare/v4.2.1...v4.3.0) (2020-10-09)


### Features

* add xAbsolute ([#15](https://github.com/cheminfo/spectra-processing/issues/15)) ([22c51d8](https://github.com/cheminfo/spectra-processing/commit/22c51d86790b23deba0b3769dd8cb7ddc5105092))
* add xPadding ([#14](https://github.com/cheminfo/spectra-processing/issues/14)) ([7ee6dcf](https://github.com/cheminfo/spectra-processing/commit/7ee6dcf435442281f0f0fc33b72cd5c9983d02fe))
* add xyObjectBestPoints ([de52f2b](https://github.com/cheminfo/spectra-processing/commit/de52f2b7fc6d861c60ba6ae4b3f937a85c861e36))
* add xyObjectMaxXPoint and xyObjectMinXPoint ([876dc34](https://github.com/cheminfo/spectra-processing/commit/876dc34000435bea06d3c8fb003fa1dd7833123c))
* added argmin and argmax ([#10](https://github.com/cheminfo/spectra-processing/issues/10)) ([2a0b4b3](https://github.com/cheminfo/spectra-processing/commit/2a0b4b36b417f13155a21e053e40f9e8f460ce0c))



## [4.2.1](https://github.com/cheminfo/spectra-processing/compare/v4.2.0...v4.2.1) (2020-09-09)



# [4.2.0](https://github.com/cheminfo/spectra-processing/compare/v4.1.1...v4.2.0) (2020-07-14)


### Features

* add matrixColumnsCorrelation ([892a429](https://github.com/cheminfo/spectra-processing/commit/892a429069ad93d9b0be20ab1dd9126d33c2ba7d))
* add xIsMonotone ([3121f38](https://github.com/cheminfo/spectra-processing/commit/3121f380d4bfc58e3db486c3fd99d4c3a40b7597))



# [4.1.0](https://github.com/cheminfo/spectra-processing/compare/v4.0.0...v4.1.0) (2020-05-23)


### Features

* add zoneToX ([9857200](https://github.com/cheminfo/spectra-processing/commit/9857200226d9e98bbccfc37f7fa2a2fd875c87e4))



# [4.0.0](https://github.com/cheminfo/spectra-processing/compare/v3.0.2...v4.0.0) (2020-05-20)



## [3.0.2](https://github.com/cheminfo/spectra-processing/compare/v3.0.1...v3.0.2) (2020-05-16)


### Bug Fixes

* wrong search and replace ([430934a](https://github.com/cheminfo/spectra-processing/commit/430934a4c99100af13912a97d342cea9ab727225))



## [3.0.1](https://github.com/cheminfo/spectra-processing/compare/v3.0.0...v3.0.1) (2020-05-15)



# [3.0.0](https://github.com/cheminfo/spectra-processing/compare/v2.4.0...v3.0.0) (2020-05-15)



# [2.4.0](https://github.com/cheminfo/spectra-processing/compare/v2.3.0...v2.4.0) (2020-05-12)


### Features

* add X.absoluteMedian ([7732f39](https://github.com/cheminfo/spectra-processing/commit/7732f395aa5085ee17c82ca1912b9e2c0325f89f))



# [2.3.0](https://github.com/cheminfo/spectra-processing/compare/v2.2.0...v2.3.0) (2020-05-08)


### Features

* add automatic phase correction in ReIm ([#6](https://github.com/cheminfo/spectra-processing/issues/6)) ([cab2afa](https://github.com/cheminfo/spectra-processing/commit/cab2afaddb082448247675497df12f5dad08209e))



# [2.2.0](https://github.com/cheminfo/spectra-processing/compare/v2.1.1...v2.2.0) (2020-04-16)



## [2.1.1](https://github.com/cheminfo/spectra-processing/compare/v2.1.0...v2.1.1) (2020-04-09)



# [2.1.0](https://github.com/cheminfo/spectra-processing/compare/v2.0.2...v2.1.0) (2020-04-03)


### Features

* add the align method ([f490bf1](https://github.com/cheminfo/spectra-processing/commit/f490bf1c282a99e90725ee78bf20570c57f826b2))



## [2.0.2](https://github.com/cheminfo/spectra-processing/compare/v2.0.1...v2.0.2) (2020-03-27)



## [2.0.1](https://github.com/cheminfo/spectra-processing/compare/v2.0.0...v2.0.1) (2020-02-25)


### Bug Fixes

* correctly import is-any-array ([568b20b](https://github.com/cheminfo/spectra-processing/commit/568b20baaad30d9198ea005c9ea7484c88d9467b))
* rollup.config ([f1f8943](https://github.com/cheminfo/spectra-processing/commit/f1f894320ad55727f84ad848ed37a8f4091b77fd))



# [2.0.0](https://github.com/cheminfo/spectra-processing/compare/v1.3.1...v2.0.0) (2020-02-08)


### Bug Fixes

* eslint ([af497eb](https://github.com/cheminfo/spectra-processing/commit/af497eb5fd8e20e2b9111a174b8259894f240617))
* use Number.NEGATIVE_INFINITY and not Number.MIN_VALUE ([06827c1](https://github.com/cheminfo/spectra-processing/commit/06827c1b58f4fa75263e05a839c798130b430474))


### Features

* add XY.extract ([5dae851](https://github.com/cheminfo/spectra-processing/commit/5dae851b16653b97b072a7da5a871f9a0e8eb4c1))
* add zones ([bbe4a2f](https://github.com/cheminfo/spectra-processing/commit/bbe4a2f473d758fc4dc001d318a01e162a4b40ea))
* add zones in reduce ([9a2c573](https://github.com/cheminfo/spectra-processing/commit/9a2c573b5b3f7f10399e443b2cf9d2da442922c2))
* normalizeZones allow from / to ([a7e0762](https://github.com/cheminfo/spectra-processing/commit/a7e0762731a6919dbe56009a5590e6e9d5049645))



# [1.2.0](https://github.com/cheminfo/spectra-processing/compare/v1.1.0...v1.2.0) (2019-12-13)


### Features

* add XYObject.slotX ([deb03c1](https://github.com/cheminfo/spectra-processing/commit/deb03c1e8099342b0358c2231531de2f290967ce))



# [1.1.0](https://github.com/cheminfo/spectra-processing/compare/v0.6.1...v1.1.0) (2019-12-13)


### Bug Fixes

* export X.getFromToIndex ([39e16c3](https://github.com/cheminfo/spectra-processing/commit/39e16c346031524676b2ef76f94df96ffd2c601a))


### Features

* add optimize in reduce ([b00a6ce](https://github.com/cheminfo/spectra-processing/commit/b00a6cea4d6f263b431f319b405d52bf37ac02df))
* add xyObject ([dcd8c44](https://github.com/cheminfo/spectra-processing/commit/dcd8c445a2909300204e5b1b61d6fcdc6ab0e876))
* export X.findClosestIndex ([f5321b3](https://github.com/cheminfo/spectra-processing/commit/f5321b30652003eb97ac72d38cbaf4d9814ce168))



## [0.6.1](https://github.com/cheminfo/spectra-processing/compare/v0.6.0...v0.6.1) (2019-11-13)


### Features

* add index in minYPiont and maxYPoint ([0b5e135](https://github.com/cheminfo/spectra-processing/commit/0b5e1350229d259489ff652acd0176168d664b90))



# [0.6.0](https://github.com/cheminfo/spectra-processing/compare/v0.4.0...v0.6.0) (2019-11-13)


### Features

* add correlation ([dd6569c](https://github.com/cheminfo/spectra-processing/commit/dd6569c973efc17d437b31f338219c3ecb1da0f8))
* add maximaY ([e2cfa9b](https://github.com/cheminfo/spectra-processing/commit/e2cfa9b9c05f1a62975a322613b15d032f09a481))
* add peakInfo ([c76bfe6](https://github.com/cheminfo/spectra-processing/commit/c76bfe6a526e26cc0231d0eddcf378a65b7c9c7e))
* add XY minimaY and maximaY ([a2cff7f](https://github.com/cheminfo/spectra-processing/commit/a2cff7f30e42e33e38c658758c78eb87d4fdcaf7))
* invert from / to if required ([d99ef8e](https://github.com/cheminfo/spectra-processing/commit/d99ef8e0dbc044eae46ee302007d8d497e0589c9))



# [0.4.0](https://github.com/cheminfo/spectra-processing/compare/v0.3.0...v0.4.0) (2019-10-01)


### Features

* add X.boxPlot ([3a1f0ea](https://github.com/cheminfo/spectra-processing/commit/3a1f0ea))



# [0.3.0](https://github.com/cheminfo/spectra-processing/compare/v0.2.0...v0.3.0) (2019-08-30)


### Features

* **x:** add getTargetIndex ([389c3be](https://github.com/cheminfo/spectra-processing/commit/389c3be))
* **xy:** add maxClosestYPoint and minClosestYPoint ([85e36fe](https://github.com/cheminfo/spectra-processing/commit/85e36fe))
* **xy:** add realMinYPoint and realMaxYPoint ([0c628e3](https://github.com/cheminfo/spectra-processing/commit/0c628e3))



# [0.2.0](https://github.com/cheminfo/spectra-processing/compare/v0.1.5...v0.2.0) (2019-08-17)



## [0.1.5](https://github.com/cheminfo/spectra-processing/compare/v0.1.4...v0.1.5) (2019-08-16)



## [0.1.4](https://github.com/cheminfo/spectra-processing/compare/v0.1.3...v0.1.4) (2019-08-16)



## [0.1.3](https://github.com/cheminfo/spectra-processing/compare/v0.1.2...v0.1.3) (2019-08-06)



## [0.1.2](https://github.com/cheminfo/spectra-processing/compare/v0.1.1...v0.1.2) (2019-08-05)



## [0.1.1](https://github.com/cheminfo/spectra-processing/compare/v0.1.0...v0.1.1) (2019-07-26)



# [0.1.0](https://github.com/cheminfo/spectra-processing/compare/v0.0.3...v0.1.0) (2019-07-26)



## [0.0.3](https://github.com/cheminfo/spectra-processing/compare/v0.0.2...v0.0.3) (2019-07-14)



## [0.0.2](https://github.com/cheminfo/spectra-processing/compare/v0.0.1...v0.0.2) (2019-07-11)



## 0.0.1 (2019-07-11)
