<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { width } = useDisplay();
const activeNames = ref<Array<string>>(["1"]);

const mobileWidth: any = computed(() => {
  return width.value;
});
</script>

<template>
  <div class="m-about-main-body mx-3 px-6 py-5">
    <div class="text-700-14 white">
      {{ t("about.page.text_10") }}
    </div>
    <div class="text-400-10 gray mt-2">
      {{ t("about.page.text_11") }}
    </div>
    <div class="m-about-collapse mt-2">
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="t('about.page.text_12')" name="1">
          <div>{{ t("about.page.text_13") }}</div>
          <div>{{ t("about.page.text_14") }}</div>
          <div>{{ t("about.page.text_15") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_16')" name="2">
          <div>{{ t("about.page.text_17") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_18')" name="3">
          <div>{{ t("about.page.text_19") }}</div>
          <div>{{ t("about.page.text_20") }}</div>
          <div>{{ t("about.page.text_21") }}</div>
          <div>{{ t("about.page.text_22") }}</div>
          <div>{{ t("about.page.text_23") }}</div>
          <div>{{ t("about.page.text_24") }}</div>
          <div>{{ t("about.page.text_25") }}</div>
          <div>{{ t("about.page.text_26") }}</div>
          <div>{{ t("about.page.text_27") }}</div>
          <div>{{ t("about.page.text_28") }}</div>
          <div>{{ t("about.page.text_29") }}</div>
          <div>{{ t("about.page.text_30") }}</div>
          <div>{{ t("about.page.text_31") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_32')" name="4">
          <div>{{ t("about.page.text_33") }}</div>
          <div>{{ t("about.page.text_34") }}</div>
          <div>{{ t("about.page.text_35") }}</div>
          <div>{{ t("about.page.text_36") }}</div>
          <li>{{ t("about.page.text_37") }}</li>
          <li>{{ t("about.page.text_38") }}</li>
          <li>{{ t("about.page.text_39") }}</li>
          <li>{{ t("about.page.text_40") }}</li>
          <li>{{ t("about.page.text_41") }}</li>
          <li>{{ t("about.page.text_42") }}</li>
          <li>{{ t("about.page.text_43") }}</li>
          <li>{{ t("about.page.text_44") }}</li>
          <div>{{ t("about.page.text_45") }}</div>
          <div>{{ t("about.page.text_46") }}</div>
          <div>{{ t("about.page.text_47") }}</div>
          <div>{{ t("about.page.text_48") }}</div>
          <div>{{ t("about.page.text_49") }}</div>
          <div>{{ t("about.page.text_50") }}</div>
          <div>{{ t("about.page.text_51") }}</div>
          <div>{{ t("about.page.text_52") }}</div>
          <div>{{ t("about.page.text_53") }}</div>
          <div>{{ t("about.page.text_54") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_55')" name="5">
          <div>{{ t("about.page.text_56") }}</div>
          <div>{{ t("about.page.text_57") }}</div>
          <div>{{ t("about.page.text_58") }}</div>
          <div>{{ t("about.page.text_59") }}</div>
          <div>{{ t("about.page.text_60") }}</div>
          <div>{{ t("about.page.text_61") }}</div>
          <div>{{ t("about.page.text_62") }}</div>
          <div>{{ t("about.page.text_63") }}</div>
          <div>{{ t("about.page.text_64") }}</div>
          <div>{{ t("about.page.text_65") }}</div>
          <div>{{ t("about.page.text_66") }}</div>
          <div>{{ t("about.page.text_67") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_68')" name="6">
          <div>{{ t("about.page.text_69") }}</div>
          <div>{{ t("about.page.text_70") }}</div>
          <div>{{ t("about.page.text_71") }}</div>
          <div>{{ t("about.page.text_72") }}</div>
          <div>{{ t("about.page.text_73") }}</div>
          <div>{{ t("about.page.text_74") }}</div>
          <div>{{ t("about.page.text_75") }}</div>
          <div>{{ t("about.page.text_76") }}</div>
          <div>{{ t("about.page.text_77") }}</div>
          <div>{{ t("about.page.text_78") }}</div>
          <div>{{ t("about.page.text_79") }}</div>
          <div>{{ t("about.page.text_80") }}</div>
          <div>{{ t("about.page.text_81") }}</div>
          <div>{{ t("about.page.text_82") }}</div>
          <div>{{ t("about.page.text_83") }}</div>
          <div>{{ t("about.page.text_84") }}</div>
          <div>{{ t("about.page.text_85") }}</div>
          <div>{{ t("about.page.text_86") }}</div>
          <div>{{ t("about.page.text_87") }}</div>
          <div>{{ t("about.page.text_88") }}</div>
          <div>{{ t("about.page.text_89") }}</div>
          <div>{{ t("about.page.text_90") }}</div>
          <div>{{ t("about.page.text_91") }}</div>
          <div>{{ t("about.page.text_92") }}</div>
          <div>{{ t("about.page.text_93") }}</div>
          <div>{{ t("about.page.text_94") }}</div>
          <div>{{ t("about.page.text_95") }}</div>
          <div>{{ t("about.page.text_96") }}</div>
          <div>{{ t("about.page.text_97") }}</div>
          <div>{{ t("about.page.text_98") }}</div>
          <div>{{ t("about.page.text_99") }}</div>
          <div>{{ t("about.page.text_100") }}</div>
          <div>{{ t("about.page.text_101") }}</div>
          <div>{{ t("about.page.text_102") }}</div>
          <div>{{ t("about.page.text_103") }}</div>
          <div>{{ t("about.page.text_104") }}</div>
          <div>{{ t("about.page.text_105") }}</div>
          <div>{{ t("about.page.text_106") }}</div>
          <div>{{ t("about.page.text_107") }}</div>
          <div>{{ t("about.page.text_108") }}</div>
          <div>{{ t("about.page.text_109") }}</div>
          <div>{{ t("about.page.text_110") }}</div>
          <div>{{ t("about.page.text_111") }}</div>
          <div>{{ t("about.page.text_112") }}</div>
          <div>{{ t("about.page.text_113") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_114')" name="7">
          <div>{{ t("about.page.text_115") }}</div>
          <div>{{ t("about.page.text_116") }}</div>
          <div>{{ t("about.page.text_117") }}</div>
          <div>{{ t("about.page.text_118") }}</div>
          <div>{{ t("about.page.text_119") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_120')" name="8">
          <div>{{ t("about.page.text_121") }}</div>
          <div>{{ t("about.page.text_122") }}</div>
          <div>{{ t("about.page.text_123") }}</div>
          <div>{{ t("about.page.text_124") }}</div>
          <div>{{ t("about.page.text_125") }}</div>
          <div>{{ t("about.page.text_126") }}</div>
          <div>{{ t("about.page.text_127") }}</div>
          <div>{{ t("about.page.text_128") }}</div>
          <div>{{ t("about.page.text_129") }}</div>
          <div>{{ t("about.page.text_130") }}</div>
          <div>{{ t("about.page.text_131") }}</div>
          <div>{{ t("about.page.text_132") }}</div>
          <div>{{ t("about.page.text_133") }}</div>
          <div>{{ t("about.page.text_134") }}</div>
          <div>{{ t("about.page.text_135") }}</div>
          <div>{{ t("about.page.text_136") }}</div>
          <div>{{ t("about.page.text_137") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_138')" name="9">
          <div>{{ t("about.page.text_139") }}</div>
          <div>{{ t("about.page.text_140") }}</div>
          <div>{{ t("about.page.text_141") }}</div>
          <div>{{ t("about.page.text_142") }}</div>
          <div>{{ t("about.page.text_143") }}</div>
          <div>{{ t("about.page.text_144") }}</div>
          <div>{{ t("about.page.text_145") }}</div>
          <div>{{ t("about.page.text_146") }}</div>
          <div>{{ t("about.page.text_147") }}</div>
          <div>{{ t("about.page.text_148") }}</div>
          <div>{{ t("about.page.text_149") }}</div>
          <div>{{ t("about.page.text_150") }}</div>
          <div>{{ t("about.page.text_151") }}</div>
          <div>{{ t("about.page.text_152") }}</div>
          <div>{{ t("about.page.text_153") }}</div>
          <div>{{ t("about.page.text_154") }}</div>
          <div>{{ t("about.page.text_155") }}</div>
          <div>{{ t("about.page.text_156") }}</div>
          <div>{{ t("about.page.text_157") }}</div>
          <div>{{ t("about.page.text_158") }}</div>
          <div>{{ t("about.page.text_159") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_160')" name="10">
          <div>{{ t("about.page.text_161") }}</div>
          <div>{{ t("about.page.text_162") }}</div>
          <div>{{ t("about.page.text_163") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_164')" name="11">
          <div>{{ t("about.page.text_165") }}</div>
          <div>{{ t("about.page.text_166") }}</div>
          <div>{{ t("about.page.text_167") }}</div>
          <div>{{ t("about.page.text_168") }}</div>
          <div>{{ t("about.page.text_169") }}</div>
          <div>{{ t("about.page.text_170") }}</div>
          <div>{{ t("about.page.text_171") }}</div>
          <div>{{ t("about.page.text_172") }}</div>
          <div>{{ t("about.page.text_173") }}</div>
          <div>{{ t("about.page.text_174") }}</div>
          <div>{{ t("about.page.text_175") }}</div>
          <div>{{ t("about.page.text_176") }}</div>
          <div>{{ t("about.page.text_177") }}</div>
          <div>{{ t("about.page.text_178") }}</div>
          <div>{{ t("about.page.text_179") }}</div>
          <div>{{ t("about.page.text_180") }}</div>
          <div>{{ t("about.page.text_181") }}</div>
          <div>{{ t("about.page.text_182") }}</div>
          <div>{{ t("about.page.text_183") }}</div>
          <div>{{ t("about.page.text_184") }}</div>
          <div>{{ t("about.page.text_185") }}</div>
          <div>{{ t("about.page.text_186") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_187')" name="12">
          <div>{{ t("about.page.text_187") }}</div>
          <div>{{ t("about.page.text_188") }}</div>
          <div>{{ t("about.page.text_189") }}</div>
          <div>{{ t("about.page.text_190") }}</div>
          <div>{{ t("about.page.text_191") }}</div>
          <div>{{ t("about.page.text_192") }}</div>
          <div>{{ t("about.page.text_193") }}</div>
          <div>{{ t("about.page.text_194") }}</div>
          <div>{{ t("about.page.text_195") }}</div>
          <div>{{ t("about.page.text_196") }}</div>
          <div>{{ t("about.page.text_197") }}</div>
          <div>{{ t("about.page.text_198") }}</div>
          <div>{{ t("about.page.text_199") }}</div>
          <div>{{ t("about.page.text_200") }}</div>
          <div>{{ t("about.page.text_201") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_202')" name="13">
          <div>{{ t("about.page.text_203") }}</div>
          <div>{{ t("about.page.text_204") }}</div>
          <div>{{ t("about.page.text_205") }}</div>
          <div>{{ t("about.page.text_206") }}</div>
          <div>{{ t("about.page.text_207") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_208')" name="14">
          <div>{{ t("about.page.text_209") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_210')" name="15">
          <div>{{ t("about.page.text_211") }}</div>
          <div>{{ t("about.page.text_212") }}</div>
          <div>{{ t("about.page.text_213") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_214')" name="16">
          <div>{{ t("about.page.text_215") }}</div>
          <li>{{ t("about.page.text_216") }}</li>
          <li>{{ t("about.page.text_217") }}</li>
          <li>{{ t("about.page.text_218") }}</li>
          <div>{{ t("about.page.text_219") }}</div>
          <div>{{ t("about.page.text_220") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_221')" name="17">
          <div>{{ t("about.page.text_222") }}</div>
          <div>{{ t("about.page.text_223") }}</div>
          <div>{{ t("about.page.text_224") }}</div>
          <div>{{ t("about.page.text_225") }}</div>
          <div>{{ t("about.page.text_226") }}</div>
          <div>{{ t("about.page.text_227") }}</div>
          <div>{{ t("about.page.text_228") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_229')" name="18">
          <div>{{ t("about.page.text_230") }}</div>
          <div>{{ t("about.page.text_231") }}</div>
          <div>{{ t("about.page.text_232") }}</div>
          <div>{{ t("about.page.text_233") }}</div>
          <div>{{ t("about.page.text_234") }}</div>
          <div>{{ t("about.page.text_235") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_236')" name="19">
          <div>{{ t("about.page.text_237") }}</div>
          <div>{{ t("about.page.text_238") }}</div>
          <div>{{ t("about.page.text_239") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_240')" name="20">
          <div>{{ t("about.page.text_241") }}</div>
          <div>{{ t("about.page.text_242") }}</div>
          <div>{{ t("about.page.text_243") }}</div>
          <div>{{ t("about.page.text_244") }}</div>
          <div>{{ t("about.page.text_245") }}</div>
          <div>{{ t("about.page.text_246") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_247')" name="21">
          <div>{{ t("about.page.text_248") }}</div>
          <div>{{ t("about.page.text_249") }}</div>
          <div>{{ t("about.page.text_250") }}</div>
          <div>{{ t("about.page.text_251") }}</div>
          <div>{{ t("about.page.text_252") }}</div>
          <div>{{ t("about.page.text_253") }}</div>
          <div>{{ t("about.page.text_254") }}</div>
          <div>{{ t("about.page.text_255") }}</div>
          <div>{{ t("about.page.text_256") }}</div>
          <div>{{ t("about.page.text_257") }}</div>
          <div>{{ t("about.page.text_258") }}</div>
          <div>{{ t("about.page.text_259") }}</div>
          <div>{{ t("about.page.text_260") }}</div>
          <div>{{ t("about.page.text_261") }}</div>
          <div>{{ t("about.page.text_262") }}</div>
          <div>{{ t("about.page.text_263") }}</div>
          <div>{{ t("about.page.text_264") }}</div>
          <div>{{ t("about.page.text_265") }}</div>
          <div>{{ t("about.page.text_266") }}</div>
          <div>{{ t("about.page.text_267") }}</div>
          <div>{{ t("about.page.text_268") }}</div>
          <div>{{ t("about.page.text_269") }}</div>
          <div>{{ t("about.page.text_270") }}</div>
          <div>{{ t("about.page.text_271") }}</div>
          <div>{{ t("about.page.text_272") }}</div>
          <div>{{ t("about.page.text_273") }}</div>
          <div>{{ t("about.page.text_274") }}</div>
          <div>{{ t("about.page.text_275") }}</div>
          <div>{{ t("about.page.text_276") }}</div>
          <div>{{ t("about.page.text_277") }}</div>
          <div>{{ t("about.page.text_278") }}</div>
          <div>{{ t("about.page.text_279") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_280')" name="22">
          <div>{{ t("about.page.text_281") }}</div>
          <div>{{ t("about.page.text_282") }}</div>
          <div>{{ t("about.page.text_283") }}</div>
          <div>{{ t("about.page.text_284") }}</div>
          <div>{{ t("about.page.text_285") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_286')" name="23">
          <div>{{ t("about.page.text_287") }}</div>
          <div>{{ t("about.page.text_288") }}</div>
          <div>{{ t("about.page.text_289") }}</div>
          <div>{{ t("about.page.text_290") }}</div>
          <div>{{ t("about.page.text_291") }}</div>
          <div>{{ t("about.page.text_292") }}</div>
          <div>{{ t("about.page.text_293") }}</div>
          <div>{{ t("about.page.text_294") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_295')" name="24">
          <div>{{ t("about.page.text_296") }}</div>
          <div>{{ t("about.page.text_297") }}</div>
          <div>{{ t("about.page.text_298") }}</div>
          <div>{{ t("about.page.text_299") }}</div>
          <div>{{ t("about.page.text_300") }}</div>
          <div>{{ t("about.page.text_301") }}</div>
          <div>{{ t("about.page.text_302") }}</div>
          <div>{{ t("about.page.text_303") }}</div>
          <div>{{ t("about.page.text_304") }}</div>
          <div>{{ t("about.page.text_305") }}</div>
          <div>{{ t("about.page.text_306") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_307')" name="25">
          <div>{{ t("about.page.text_308") }}</div>
          <div>{{ t("about.page.text_309") }}</div>
          <div>{{ t("about.page.text_310") }}</div>
          <div>{{ t("about.page.text_311") }}</div>
          <div>{{ t("about.page.text_312") }}</div>
          <div>{{ t("about.page.text_313") }}</div>
          <div>{{ t("about.page.text_314") }}</div>
          <div>{{ t("about.page.text_315") }}</div>
          <div>{{ t("about.page.text_316") }}</div>
          <div>{{ t("about.page.text_317") }}</div>
          <div>{{ t("about.page.text_318") }}</div>
          <div>{{ t("about.page.text_319") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_320')" name="26">
          <div>{{ t("about.page.text_321") }}</div>
          <div>{{ t("about.page.text_322") }}</div>
          <div>{{ t("about.page.text_323") }}</div>
          <div>{{ t("about.page.text_324") }}</div>
          <div>{{ t("about.page.text_325") }}</div>
          <div>{{ t("about.page.text_326") }}</div>
          <div>{{ t("about.page.text_327") }}</div>
          <div>{{ t("about.page.text_328") }}</div>
          <div>{{ t("about.page.text_329") }}</div>
          <div>{{ t("about.page.text_330") }}</div>
          <div>{{ t("about.page.text_331") }}</div>
          <div>{{ t("about.page.text_332") }}</div>
          <div>{{ t("about.page.text_333") }}</div>
          <div>{{ t("about.page.text_334") }}</div>
          <div>{{ t("about.page.text_335") }}</div>
          <div>{{ t("about.page.text_336") }}</div>
          <div>{{ t("about.page.text_337") }}</div>
          <div>{{ t("about.page.text_338") }}</div>
          <div>{{ t("about.page.text_339") }}</div>
          <div>{{ t("about.page.text_340") }}</div>
          <div>{{ t("about.page.text_341") }}</div>
          <div>{{ t("about.page.text_342") }}</div>
          <div>{{ t("about.page.text_343") }}</div>
          <div>{{ t("about.page.text_344") }}</div>
          <div>{{ t("about.page.text_345") }}</div>
          <div>{{ t("about.page.text_346") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_347')" name="27">
          <div>{{ t("about.page.text_348") }}</div>
          <div>{{ t("about.page.text_349") }}</div>
          <div>{{ t("about.page.text_350") }}</div>
          <div>{{ t("about.page.text_351") }}</div>
          <div>{{ t("about.page.text_352") }}</div>
          <div>{{ t("about.page.text_353") }}</div>
          <div>{{ t("about.page.text_354") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_355')" name="28">
          <div>{{ t("about.page.text_356") }}</div>
          <div>{{ t("about.page.text_357") }}</div>
          <div>{{ t("about.page.text_358") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_359')" name="29">
          <div>{{ t("about.page.text_360") }}</div>
          <div>{{ t("about.page.text_361") }}</div>
          <div>{{ t("about.page.text_362") }}</div>
          <div>{{ t("about.page.text_363") }}</div>
          <div>{{ t("about.page.text_364") }}</div>
          <div>{{ t("about.page.text_365") }}</div>
          <div>{{ t("about.page.text_366") }}</div>
          <div>{{ t("about.page.text_367") }}</div>
          <div>{{ t("about.page.text_368") }}</div>
          <div>{{ t("about.page.text_369") }}</div>
          <div>{{ t("about.page.text_370") }}</div>
          <div>{{ t("about.page.text_371") }}</div>
          <div>{{ t("about.page.text_372") }}</div>
          <div>{{ t("about.page.text_373") }}</div>
          <div>{{ t("about.page.text_374") }}</div>
          <div>{{ t("about.page.text_375") }}</div>
          <div>{{ t("about.page.text_376") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_377')" name="30">
          <div>{{ t("about.page.text_378") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_379')" name="31">
          <div>{{ t("about.page.text_380") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_381')" name="32">
          <div>{{ t("about.page.text_382") }}</div>
        </el-collapse-item>
        <el-collapse-item :title="t('about.page.text_383')" name="33">
          <div>
            {{ t("about.page.text_384") }}
            <font class="text-700-12 white">{{ t("about.page.text_385") }}</font>
            {{ t("about.page.text_386") }}
          </div>
          <div>
            {{ t("about.page.text_387") }}
            <font class="text-700-12 white">{{ t("about.page.text_388") }}</font>
            {{ t("about.page.text_389") }}
          </div>
          <div>
            {{ t("about.page.text_390") }}
            <font class="text-700-12 white">{{ t("about.page.text_391") }}</font>
            {{ t("about.page.text_392") }}
          </div>
          <div>
            {{ t("about.page.text_393") }}
            <font class="text-700-12 white">{{ t("about.page.text_394") }}</font>
            {{ t("about.page.text_395") }}
          </div>
          <div>
            {{ t("about.page.text_396") }}
            <font class="text-700-12 white">{{ t("about.page.text_397") }}</font>
            {{ t("about.page.text_398") }}
          </div>
          <div>
            {{ t("about.page.text_399") }}
            <font class="text-700-12 white">{{ t("about.page.text_400") }}</font>
            {{ t("about.page.text_401") }}
          </div>
          <div>
            {{ t("about.page.text_402") }}
            <font class="text-700-12 white">{{ t("about.page.text_403") }}</font>
            {{ t("about.page.text_404") }}
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<style lang="scss">
.m-about-collapse {
  .el-collapse {
    border-top: unset !important;
    border-bottom: unset !important;
  }
  .el-collapse-item {
    border-bottom: 2px solid #1D2027;
  }
  .el-collapse-item__header {
    background-color: #15161C !important;
    border-bottom: unset !important;
    color: var(--White-BG, #fff);
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .el-collapse-item__wrap {
    background-color: #15161C !important;
  }
  .el-collapse-item__content {
    padding-bottom: 16px;
    color: var(--Sec-Text-7782AA, #7782aa);
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 19.2px */
  }
  .el-icon {
    color: white !important;
    font-size: 14px;
  }
}
</style>
