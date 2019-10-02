<template>
  <div class="form-row labl mt-2">
    <!-- // ************************************************** -->
    <div class="col-md-3">
      <div class="text-center">
        <h5>
          <span class="badge">Общие параметры</span>
        </h5>
      </div>

      <div class="form-group">
        <!-- <div class='form-row'> -->

        <div class="col">
          <b-form-checkbox switch size="sm" v-model.number="isx.IL" value="1" unchecked-value="0">
            <h6>
              <span class="badge">Измерительные линии</span>
            </h6>
          </b-form-checkbox>
        </div>

        <div class="form-row">
          <div class="col">
            <h6>
              <span class="badge">Системный блок</span>
            </h6>
            <select class="form-control form-control-sm" v-model.number="sb.tipSB">
              <option value="0">СБ-04 с блоком бесперебойного питания</option>
              <option value="1">СБ-04 с сетевым питанием</option>
              <option value="2">СБ-04 из проекта ТС</option>
            </select>
          </div>
          <div class="col" v-if="sb_to">
            <label class="col-form-label">шифр</label>
            <input type="text" class="form-control form-control-sm" v-model="sb.shifr_to" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="col">
          <h6>
            <span class="badge">Платы расширения</span>
          </h6>
          <multiselect
            v-model="plats"
            :options="Plats_r"
            :multiple="true"
            track-by="lib"
            :custom-label="customLabel"
            placeholder="Платы расширения"
            :option-height="34"
          ></multiselect>
        </div>
      </div>

      <div class="form-group">
        <div class="col">
          <h6>
            <span class="badge">Длина кабельных проводок</span>
          </h6>
          <div class="form-row">
            <div class="col">
              <label class="col-form-label">ВРУ => СБ</label>
              <input type="text" class="form-control form-control-sm" v-model="sb.lvru" />
            </div>
            <div class="col">
              <label class="col-form-label">СБ => ИМ ХВС</label>
              <input type="text" class="form-control form-control-sm" v-model="sb.lsbh" />
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="col">
          <h6>
            <span class="badge">Вставка внешних файлов</span>
          </h6>
          <div class="form-row">
            <div class="col">
              <label class="col-form-label">Принципиальная схема</label>
              <input
                type="file"
                id="fileImagePrSx_hvs"
                name="princ_sx_uploads_hvs"
                accept="image/jpeg, image/png"
                style="font-size:0.8em;"
                @change="ImageSPL_hvs"
              />
            </div>
            <div class="col">
              <label class="col-form-label">Формат листа:</label>
              <select
                class="form-control form-control-sm"
                name="formatPRSX_hvs"
                :disabled="otklFormatPrSx_hvs"
              >
                <option value="A3">А3</option>
                <option value="A2">А2</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="col">
              <label class="col-form-label">Ситуационный план</label>
              <input
                type="file"
                id="fileImageSPL_hvs"
                name="sitplan_uploads_hvs"
                accept="image/jpeg, image/png"
                style="font-size:0.8em;"
                @change="ImageSPL_hvs"
              />
            </div>
            <div class="col">
              <label class="col-form-label">Формат листа:</label>
              <select
                class="form-control form-control-sm"
                name="formatSitPl_hvs"
                :disabled="otklFormatSPL_hvs"
              >
                <option value="A3">А3</option>
                <option value="A2">А2</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4 px-3 border-left border-warning">
      <div class="text-center">
        <h5>
          <span class="badge">{{infh}}</span>
        </h5>
      </div>

      <div class="form-group">
        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Расход часовой, м³/ч</label>
            <input
              type="number"
              step="0.001"
              min="0"
              max="2500"
              class="form-control form-control-sm"
              placeholder="qt"
              v-model.number="isx.qt"
              v-on:input="proj('qt')"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="8"
              v-b-popover.hover.bottomright="'Среднечасовой расход  воды'"
            />
          </div>

          <div class="col">
            <label class="col-form-label">Расход суточный, м³/сут</label>
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="Qсут"
              step="0.001"
              v-model.number="isx.Qsut"
              v-on:input="proj('Qsut')"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="7"
              v-b-popover.hover.bottomright="'Расчетный суточный    расход   воды '"
            />
          </div>
          <div class="col">
            <label class="col-form-label">Период, ч</label>
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="T"
              min="0"
              max="24"
              v-model.number="isx.Tper"
              v-on:input="proj('Tper')"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="2"
              v-b-popover.hover.bottomright="'Период водопотребления воды (сутки, смена), ч'"
            />
          </div>
        </div>

        <!-- <div class="form-row">
          <div class="col text-center">
            <label class="col-form-label">qhr</label>
            <input
              type="number"
              step="0.1"
              class="form-control form-control-sm"
              placeholder="qhr"
              v-model.number="isx.qhr"
              value="5"
              v-on:input="proj('')"
              v-b-popover.hover.bottomright="'Максимальньный часовой расход воды'"
            />
          </div>

          <div class="col text-center">
            <label class="col-form-label">Kmax</label>
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="Kmax"
              step="0.01"
              v-model.number="isx.Kmax"
              v-on:input="proj()"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="4"
              v-b-popover.hover.bottomright="'Коэффициент максимальной часовой неравномерности'"
            />
          </div>
          <div class="col text-center">
            <label class="col-form-label">Kmin</label>
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="Kmin"
              step="0.01"
              v-model.number="isx.Kmin"
              v-on:input="proj()"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="4"
              v-b-popover.hover.bottomright="'Коэффициент минимальной часовой неравномерности'"
            />
          </div>
        </div>-->

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Тип изм. линии</label>
            <select
              class="form-control form-control-sm"
              v-model="isx.tipLh"
              :class="{ 'red-error': ml.h }"
              @change="proj()"
              id="mlh"
            >
              <option value="kl">Классическая</option>
              <option value="ml">Модифицированная</option>
            </select>
            <b-popover :disabled="!ml.h" :show="ml.h" triggers="hover" target="mlh">{{popup.m}}</b-popover>
          </div>
          <div class="col">
            <label class="col-form-label">Фильтр</label>
            <select
              class="form-control form-control-sm"
              id="fig"
              v-model.number="isx.filh"
              :disabled="fh"
              :class="{'red-error' : grz.h }"
              @change="proj()"
            >
              <option value="0">без фильтра</option>
              <option value="1">сетчатый фильтр</option>
              <option value="2">грязевик</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="col-md-4 text-center">
            <label class="col-form-label md-3">Датчик давления</label>
            <b-form-checkbox switch v-model.number="isx.sens_d" value="1" unchecked-value="0"></b-form-checkbox>
          </div>
          <div class="col-md-4 text-center">
            <label class="col-form-label md-3">Датчик температуры</label>
            <b-form-checkbox switch v-model.number="isx.sens_t" value="1" unchecked-value="0"></b-form-checkbox>
          </div>

          <div class="col-md-4 text-center">
            <label class="col-form-label md-3">Байпас</label>
            <b-form-checkbox switch v-model.number="isx.baypass" value="1" unchecked-value="0"></b-form-checkbox>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="form-row mb-2">
          <div class="col-md-3">
            <label class="col-form-label">Температура, °C</label>
          </div>
          <div class="col-md-3">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="50"
              v-model.number="isx.t1"
              v-on:input="proj('')"
            />
          </div>
        </div>
        <div class="form-row mb-2">
          <div class="col-md-3">
            <label class="col-form-label">Давление, мвст</label>
          </div>
          <div class="col-md-3">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="50"
              v-model.number="isx.p1"
              v-on:input="proj('')"
            />
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col-md-3">
            <label class="col-form-label">Ду прибора</label>
          </div>

          <div class="col-md-3">
            <select
              class="form-control form-control-sm"
              v-model.number="isx.di"
              v-on:change="change_du()"
            >
              <option
                v-for="(option, index) in DU"
                v-bind:value="option.value"
                :key="index"
              >{{ option.text }}</option>
            </select>
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col-md-3">
            <label class="col-form-label">Скорость, м/с</label>
          </div>
          <div class="col-md-3">
            <input
              type="number"
              class="form-control form-control-sm"
              id="V"
              :class="{'red-error' : !speed }"
              v-model.number="rescalc.gdr.V"
              readonly
            />
          </div>
          <b-popover :disabled="speed" :show="!speed" triggers="hover" target="V">{{popup.s}}</b-popover>
        </div>

        <div class="form-row mb-2">
          <div class="col-md-3">
            <label class="col-form-label">ИМ ХВС</label>
          </div>
          <div class="col-md-3">
            <select
              class="form-control form-control-sm"
              :class="{'red-error' : check6.red }"
              v-model.number="isx.tipIMh"
              id="im"
            >
              <option value="6">И6</option>
              <option value="5">К5</option>
            </select>
            <b-popover
              :disabled="!check6.pop"
              :show="check6.pop"
              triggers="hover"
              target="im"
            >{{popup.d}}</b-popover>
          </div>
        </div>
        <div class="form-row mb-2">
          <div class="col-md-3">
            <label class="col-form-label">Ду тр-да В1</label>
          </div>

          <div class="col-md-3">
            <select class="form-control form-control-sm" v-model.number="isx.dut">
              <option
                v-for="(option,index) in diptr.duu1"
                v-bind:value="option.value"
                :key="index"
              >{{ option.value }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- // ************************************************** -->
    <div class="col-md-3 px-3 border-left border-warning">
      <div class="text-center">
        <h5>
          <span class="badge"></span>
        </h5>
      </div>

      <div class="d-flex justify-content-center">
        <div class="col-md-9">
          <b-btn
            type="submit"
            class="btn btn-sm btn-block mb-3"
            formaction="./pdf/project/pr_hvs.php"
            :disabled="disbutton"
          >
            Создать проект
            <b-badge variant="light">{{'ХВС'}}</b-badge>
          </b-btn>

          <input type="hidden" name="H" v-model="phpH" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import clc_hvs from "@/utils/calc_hvs.js";
// import clc_kp from "@/utils/calc_kp.js";
import Multiselect from "vue-multiselect";
import DU from "@/utils/du";
import Plats_r from "@/utils/plats_R";
export default {
  components: {
    Multiselect
  },

  data() {
    return {
      DU,
      Plats_r,
      plats: [
        {
          plt: "GSM-модем",
          lib: "gsm"
        },
        {
          plt: "USBA",
          lib: "usba"
        }
      ],
      isx: {
        pr_hvs: 0,
        sens_d: 1,
        sens_t: 0,
        baypass: 0,
        Qsut: null,
        Tper: 24,
        qt: null,
        qhr: null,
        Kmax: null,
        Kmin: 0.1,
        t1: 5,
        p1: 50,
        di: 0,
        dut: null,
        tipLh: "kl",
        tipIMh: 6,
        filh: 0,
        IL: 0
      },
      sb: {
        tipSB: 0,
        shifr_to: "",
        lvru: 30,
        lsbh: 15
      },
      infh: "Параметры ХВС",
      fh: false,
      otklFormatSPL_hvs: true,
      otklFormatPrSx_hvs: true,
      file: null
    };
  },
  computed: {
    ...mapState({
      rescalc: state => state.hvs.rescalc_hvs
    }),
    phpH() {
      let plll = { plt: this.plats };
      let ppp = JSON.stringify(
        Object.assign({}, this.isx, this.rescalc, this.sb, plll)
      );
      return ppp;
    },
    sb_to() {
      let a = 0;
      this.sb.tipSB == 2 ? (a = 1) : (a = 0);
      return a;
    },
    ml() {
      let h = false;
      this.isx.tipLh == "ml"
        ? ((this.fh = true), (this.isx.filh = 0))
        : (this.fh = false);
      if (this.isx.tipLh == "ml" && this.isx.di) {
        if (this.isx.di > 80 || this.isx.di < 32) {
          h = true;
        }
      }
      return {
        h: h
      };
    },
    grz() {
      let h = false;
      this.isx.dut < 33 && this.isx.di > 0 && this.isx.filh == 2
        ? (h = true)
        : (h = false);

      return {
        h: h
      };
    },
    speed() {
      let are;
      this.rescalc.gdr.V > 1.5 ? (are = false) : (are = true);
      return are;
    },
    popup() {
      return {
        qm: "Qмакс = Qср * Kчн",
        qs: "Qср = Qмакс / Kчн",
        kc: "коэффициент часовой неравномерности <br> Kчн = Qмакс / Qср",
        r:
          "Данный параметр необходим для подбора датчиков температуры.<br> При Ду ИМ менее 50, датчики устанавливаются в расширение Ду65.",
        s: "Скорость потока в ИМ больше 1,5 м/с,",
        d: "диап. Ду ИМ И6: 25 - 80",
        m: "диап. Ду ИМ для модифиц. линий: 32 - 80"
      };
    },
    diptr() {
      let du = [15, 20, 25, 32, 40, 50, 65, 80, 100, 125, 150, 200, 250, 300];
      let duu1 = [];
      let d1 = +this.isx.di;
      let A1 = du.indexOf(d1);
      let duk1 = du.slice(A1, A1 + 4);
      duk1.forEach(function(el) {
        let h = {
          text: el,
          value: el
        };
        duu1.push(h);
      });
      return {
        duu1
      };
    },
    check6() {
      let du = [25, 32, 40, 50, 65, 80];
      let d1 = this.isx.di;
      let red = false;
      let pop = false;
      if (this.isx.tipIMh == 6 && d1 > 0) {
        let A1 = du.indexOf(d1);
        A1 >= 0 ? ((red = false), (pop = false)) : ((red = true), (pop = true));
      }

      return { red, pop };
    },
    disbutton() {
      let a;
      let b;
      let c;
      let d;
      let g;
      this.isx.qt > 0 ? (a = 0) : (a = 1);
      this.check6.red ? (b = 1) : (b = 0);
      this.ml.h ? (c = 1) : (c = 0);
      d = a + b + c;
      d > 0 ? (g = true) : (g = false);
      return g;
    }
  },
  methods: {
    proj(m, u) {
      switch (m) {
        case "qt":
        case "Tper":
          this.isx.qt > 0
            ? ((this.isx.Qsut = (this.isx.qt * this.isx.Tper).toFixed(3)),
              (this.isx.pr_hvs = 1))
            : ((this.isx.Qsut = ""), (this.isx.pr_hvs = 0));
          break;
        case "Qsut":
          this.isx.Qsut > 0 && this.isx.Tper > 0
            ? ((this.isx.qt = (this.isx.Qsut / this.isx.Tper).toFixed(3)),
              (this.isx.pr_hvs = 1))
            : ((this.isx.qt = ""), (this.isx.pr_hvs = 0));
          break;
        case "qhr":
          break;

        default:
          break;
      }
      let result = clc_hvs(this.isx, 1.5, "");
      if (result.gdr) {
        this.isx.di = result.gdr.du_im;
        this.isx.dut = result.gdr.du_tr;
      }
      this.$store.dispatch({
        type: "RESULT_HVS",
        result: result
      });
    },
    change_du() {
      this.diptr.duu1[1]
        ? (this.isx.dut = this.diptr.duu1[1].value)
        : (this.isx.dut = this.diptr.duu1[0].value);

      let result = clc_hvs(this.isx, 1.5, "peres");
      this.$store.dispatch({
        type: "RESULT_HVS",
        result: result
      });
    },
    checkdiapTR(du_im, du_tr) {
      let du = [15, 20, 25, 32, 40, 50, 65, 80, 100, 125, 150, 200, 250, 300];
      let k1 = du.indexOf(+du_im);
      let k11 = du.indexOf(+du_tr);
      if (!du_tr || k1 > k11 || k11 - k1 > 3) {
        return true;
      } else {
        return false;
      }
    },
    ImageSPL_hvs() {
      let fileSPL = document.getElementById("fileImageSPL_hvs").files.length;
      let filePrSx = document.getElementById("fileImagePrSx_hvs").files.length;
      if (fileSPL === 0) {
        this.otklFormatSPL_hvs = true;
      } else {
        this.otklFormatSPL_hvs = false;
      }
      if (filePrSx === 0) {
        this.otklFormatPrSx_hvs = true;
      } else {
        this.otklFormatPrSx_hvs = false;
      }
    },
    customLabel(option) {
      return ` ${option.plt}`;
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style scoped >
.col-form-label {
  font-size: 0.65em;
  color: rgb(96, 113, 162);
}
.labl {
  text-align: left;
}
.form-control-sm {
  /* border-color: #656565; */
  border-width: 1px;
  height: 25px;
  font-size: 0.8em;
  font-weight: bold;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
.form-control::placeholder {
  color: #868686 !important;
  opacity: 0.5 !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield;
}
.form-control.red-error {
  border-color: #dd4b39;
  background: #fc9fa6 !important;
}
.form-control.yellow-error {
  border-color: #ffe603;
  background: #ffe603 !important;
}
.text-blue {
  color: #0073b7 !important;
}
.text-maroon {
  color: #d81b60 !important;
}

.text-s {
  font-size: 12px;
  font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.text-kp {
  font-size: 8px;
  font-family: Arial, Helvetica, sans-serif;
  /* font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif */
}
#tkp,
#bkp {
  font-size: 14px;
}
</style>

