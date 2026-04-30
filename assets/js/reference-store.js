    (function () {
      'use strict';

      const toItem = (src) => ({
        name: src.split('/').pop(),
        src,
        caption: ''
      });
      const list = (paths) => paths.map(toItem);

      const lyraReference = list([
        'img/RefImg/Lyra/ProjectC_2.jpg',
        'img/RefImg/Lyra/ProjectC_3.png',
        'img/RefImg/Lyra/ProjectC_5.png',
        'img/RefImg/Lyra/ProjectC_7.png',
        'img/RefImg/Lyra/ProjectC_13.png',
        'img/RefImg/Lyra/ProjectC_14.png',
        'img/RefImg/Lyra/ProjectC_16.png',
        'img/RefImg/Lyra/ProjectC_17.png',
        'img/RefImg/Lyra/ProjectC_20.png',
        'img/RefImg/Lyra/ProjectC_21.png',
        'img/RefImg/Lyra/ProjectC_22.png',
        'img/RefImg/Lyra/ProjectC_23.png',
        'img/RefImg/Lyra/ProjectC_24.png',
        'img/RefImg/Lyra/ProjectC_25.png',
        'img/RefImg/Lyra/ProjectC_27.jpeg',
        'img/RefImg/Lyra/ProjectC_28.jpg',
        'img/RefImg/Lyra/ProjectC_29.png',
        'img/RefImg/Lyra/ProjectC_31.jpeg',
        'img/RefImg/Lyra/ProjectC_32.jpg',
        'img/RefImg/Lyra/ProjectC_33.png',
        'img/RefImg/Lyra/ProjectC_35.jpg',
        'img/RefImg/Lyra/ProjectC_36.png',
        'img/RefImg/Lyra/ProjectC_38.jpg',
        'img/RefImg/Lyra/ProjectC_39.png',
        'img/RefImg/Lyra/ProjectC_41.jpg',
        'img/RefImg/Lyra/ProjectC_42.png',
        'img/RefImg/Lyra/ProjectC_44.jpg',
        'img/RefImg/Lyra/ProjectC_45.png',
        'img/RefImg/Lyra/ProjectC_48.png',
        'img/RefImg/Lyra/ProjectC_51.png',
        'img/RefImg/Lyra/ProjectC_53.jpg',
        'img/RefImg/Lyra/ProjectC_54.png',
        'img/RefImg/Lyra/ProjectC_56.jpg',
        'img/RefImg/Lyra/ProjectC_57.png',
        'img/RefImg/Lyra/ProjectC_59.jpg',
        'img/RefImg/Lyra/ProjectC_62.jpg',
        'img/RefImg/Lyra/ProjectC_63.png',
        'img/RefImg/Lyra/ProjectC_65.jpg',
        'img/RefImg/Lyra/ProjectC_68.jpg',
        'img/RefImg/Lyra/ProjectC_69.png',
        'img/RefImg/Lyra/ProjectC_71.jpg',
        'img/RefImg/Lyra/ProjectC_72.png',
        'img/RefImg/Lyra/ProjectC_74.jpg',
        'img/RefImg/Lyra/ProjectC_75.png',
        'img/RefImg/Lyra/ProjectC_77.jpg',
        'img/RefImg/Lyra/ProjectC_80.jpg',
        'img/RefImg/Lyra/ProjectC_83.jpg',
        'img/RefImg/Lyra/ProjectC_86.jpg',
        'img/RefImg/Lyra/ProjectC_87.png',
        'img/RefImg/Lyra/ProjectC_89.jpg'
      ]);

      const lyraSample = list([
        'img/Lyra_Samplev02 copy.png',
        'img/Lyra_Samplev02_01.png',
        'img/Lyra_Samplev02_02.png'
      ]);

      const lyraVariation = list([
        'img/ProjectC_9.png',
        'img/ProjectC_11.png',
        'img/ProjectC_15.png',
        'img/ProjectC_18.png',
        'img/ProjectC_60.png',
        'img/ProjectC_66.png',
        'img/ProjectC_78.png',
        'img/ProjectC_90.png'
      ]);

      const pipReference = list([
        'img/RefImg/PIP/ccd_en_02.png',
        'img/RefImg/PIP/character-creation-v0-hwqsc0jawmxd1.jpg',
        'img/RefImg/PIP/pjm6e29bhxyd1.jpeg'
      ]);

      const pipSample = list([
        'img/RefImg/PIP/ProjectC_26.jfif',
        'img/RefImg/PIP/ProjectC_34.jfif',
        'img/RefImg/PIP/ProjectC_37.jfif',
        'img/RefImg/PIP/ProjectC_40.jfif',
        'img/RefImg/PIP/ProjectC_46.jfif',
        'img/RefImg/PIP/ProjectC_47.jpg'
      ]);

      const pipVariation = list([
        'img/RefImg/PIP/ProjectC_50.jpg',
        'img/RefImg/PIP/ProjectC_58.jfif',
        'img/RefImg/PIP/ProjectC_76.jfif',
        'img/RefImg/PIP/ProjectC_81.png'
      ]);

      const environmentReference = list([
        'img/RefImg/배경/ProjectC_1.jfif',
        'img/RefImg/배경/ProjectC_4.jfif',
        'img/RefImg/배경/ProjectC_6.jfif',
        'img/RefImg/배경/ProjectC_8.jfif',
        'img/RefImg/배경/ProjectC_12.jfif',
        'img/RefImg/배경/ProjectC_30.jfif',
        'img/RefImg/배경/ProjectC_43.jfif',
        'img/RefImg/배경/ProjectC_49.jfif',
        'img/RefImg/배경/ProjectC_52.jfif',
        'img/RefImg/배경/ProjectC_55.jfif',
        'img/RefImg/배경/ProjectC_61.jfif',
        'img/RefImg/배경/ProjectC_64.jfif',
        'img/RefImg/배경/ProjectC_67.jfif',
        'img/RefImg/배경/ProjectC_70.jfif',
        'img/RefImg/배경/ProjectC_73.jfif',
        'img/RefImg/배경/ProjectC_79.jfif',
        'img/RefImg/배경/ProjectC_82.jfif',
        'img/RefImg/배경/ProjectC_85.jfif',
        'img/RefImg/배경/ProjectC_88.jfif'
      ]);

      const outlandReference = list([
        'img/World/ProjectC_Outland_Canyon01.png',
        'img/World/ProjectC_Outland_Canyon02.png',
        'img/World/ProjectC_Outland_Cave01.png',
        'img/World/ProjectC_Outland_Jungle01.png',
        'img/World/ProjectC_Outland_Jungle02.png',
        'img/World/ProjectC_Outland_Jungle03.png'
      ]);

      const hazardReference = list([
        'img/World/ProjectC_Outland_Swamp00.png',
        'img/World/ProjectC_Outland_Swamp01.png',
        'img/World/ProjectC_Outland_Swamp02.png',
        'img/World/ProjectC_Outland_Swamp03.png',
        'img/World/ProjectC_Outland_Swamp04.png',
        'img/World/ProjectC_Outland_Swamp05.png',
        'img/World/ProjectC_Outland_Swamp06.png',
        'img/World/ProjectC_Outland_Wasteland01.png',
        'img/World/ProjectC_Outland_Wasteland02.png',
        'img/World/ProjectC_Outland_Wasteland03.png'
      ]);

      const worldMapReference = list([
        'img/Worldmap01.png',
        'img/World/Worldmap00.png',
        'img/World/Worldmap_Map.png'
      ]);

      window.DEFAULT_REFERENCE_STORE = {
        aria: lyraReference,
        'aria-sample': lyraSample,
        'aria-variation': lyraVariation,
        trace: pipReference,
        'trace-sample': pipSample,
        'trace-variation': pipVariation,
        vault: [],
        'vault-sample': [],
        'vault-variation': [],
        'lyra-part-map': list(['img/Partss.png']),
        'env-worldmap': worldMapReference,
        'env-capital': environmentReference,
        'env-outland': outlandReference,
        'env-hazard': hazardReference
      };
    })();
