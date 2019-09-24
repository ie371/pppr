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
                id="fileImagePrSx"
                name="princ_sx_uploads"
                accept="image/jpeg, image/png"
                style="font-size:0.8em;"
                @change="ImageSPL"
              />
            </div>
            <div class="col">
              <label class="col-form-label">Формат листа:</label>
              <select
                class="form-control form-control-sm"
                name="formatPRSX"
                :disabled="otklFormatPrSx"
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
                id="fileImageSPL"
                name="sitplan_uploads"
                accept="image/jpeg, image/png"
                style="font-size:0.8em;"
                @change="ImageSPL"
              />
            </div>
            <div class="col">
              <label class="col-form-label">Формат листа:</label>
              <select
                class="form-control form-control-sm"
                name="formatSitPl"
                :disabled="otklFormatSPL"
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
            <label class="col-form-label">Расход суточный, м³/сут</label>
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="Qсут"
              step="0.0000001"
              v-model.number="isx.qmax"
              v-on:input="proj('qmax')"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="8"
              v-b-popover.hover.bottomright.html="popup.qm"
            />
          </div>
          <div class="col">
            <label class="col-form-label">Период, ч</label>
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="T"
              step="0.1"
              v-model.number="isx.T"
              v-on:input="proj('T')"
              v-b-popover.hover.bottomright.html="popup.kc"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="4"
            />
          </div>
          <div class="col">
            <label class="col-form-label">Расход часовой, м³/ч</label>
            <input
              type="number"
              step="0.1"
              class="form-control form-control-sm"
              placeholder="qt"
              v-model.number="isx.qt"
              value="15"
              v-on:input="proj('')"
              v-b-popover.hover.bottomright="'Температура хол. воды (лето - 15 °С)'"
            />
          </div>
        </div>

        <div class="form-row">
          <!-- <div class="col">
            <label class="col-form-label">Расход часовой, м³/ч</label>
            <input
              type="number"
              step="0.1"
              class="form-control form-control-sm"
              placeholder="qt"
              v-model.number="isx.qt"
              value="15"
              v-on:input="proj('')"
              v-b-popover.hover.bottomright="'Температура хол. воды (лето - 15 °С)'"
            />
          </div>-->

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
              v-b-popover.hover.bottomright="'Температура хол. воды (зима - 5 °С)'"
            />
          </div>

          <div class="col text-center">
            <label class="col-form-label">qm</label>
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="qm"
              step="0.01"
              v-model.number="isx.knp"
              v-on:input="proj('')"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="4"
              v-b-popover.hover.bottomright="'коэффициент, учитывающий уменьшение расхода тепла в трубопроводах ГВС в летний период'"
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
              v-on:input="proj('')"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="4"
              v-b-popover.hover.bottomright="'коэффициент, учитывающий потери тепла в трубопроводах '"
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
              v-on:input="proj('')"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="4"
              v-b-popover.hover.bottomright="'коэффициент запаса на разрегулировку стояков ГВС'"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Тип изм. линии</label>
            <select
              class="form-control form-control-sm"
              v-model="isx.tipLh"
              :class="{ 'red-error': ml.h }"
              @change="proj()"
              id="mlh"
              :disabled="stup"
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
              :disabled="fh||stup"
              :class="{'red-error' : grz.h }"
              @change="proj('qmax')"
            >
              <option value="0">без фильтра</option>
              <option value="1">сетчатый фильтр</option>
              <option value="2">грязевик</option>
            </select>
          </div>
          <div class="col-md-3 text-center">
            <label class="col-form-label md-3">Байпас</label>
            <b-form-checkbox
              switch
              size="sm"
              v-model.number="isx.baypass"
              value="1"
              unchecked-value="0"
            ></b-form-checkbox>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="form-row mb-2">
          <div class="col-md-3">
            <label class="col-form-label">Давление, мвст</label>
          </div>
          <div class="col-md-3">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="50"
              v-model.number="isx.p3"
              v-on:input="proj('')"
              :disabled="stup"
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
            <input type="number" class="form-control form-control-sm" id="V3" readonly />
          </div>
          <b-popover :disabled="speed.v2" :show="!speed.v2" triggers="hover" target="V3">{{popup.s}}</b-popover>
        </div>

        <div class="form-row mb-2">
          <div class="col-md-3">
            <label class="col-form-label">ИМ ХВС</label>
          </div>
          <div class="col-md-3">
            <select class="form-control form-control-sm" v-model.number="isx.tipIMh" id="im3">
              <option value="6">И6</option>
              <option value="5">К5</option>
            </select>
            <b-popover
              :disabled="!check6.y3"
              :show="check6.y1"
              triggers="hover"
              target="im3"
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
          <span class="badge">Принципиальная схема</span>
        </h5>
      </div>

      <!-- <div class="form-group">
        <b-row>
          <div class="col-md-12">
            <img
              id="sximageog"
              v-bind:src="imgsx.sx"
              width="100%"
              @click="showModal"
              style="cursor: pointer;"
            />
            <b-modal ref="myModalRef" hide-footer title="Принципиальная схема узла учета" size="lg">
              <div class="d-block text-center">
                <img id="sximageog" v-bind:src="imgsx.sx" width="100%" />
              </div>
              <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Закрыть</b-btn>
            </b-modal>
          </div>
        </b-row>
      </div>-->

      <div class="d-flex justify-content-center">
        <div class="col-md-9">
          <b-btn
            type="submit"
            class="btn btn-sm btn-block mb-3"
            formaction="./pdf/project/pr.php"
            :disabled="imgsx.bf7 ===1 ? true : false"
          >
            Создать проект
            <b-badge variant="light">{{imgsx.zz}}</b-badge>
          </b-btn>

          <!-- <b-btn class="btn btn-sm btn-block mb-3" @click="test">test JSON</b-btn> -->

          <input type="hidden" name="A" v-model="php" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Axios from "axios";
import clc_pr from "@/utils/calc_pr.js";
import clc_kp from "@/utils/calc_kp.js";
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
        baypass: 0,
        Qsut: null,
        T: 24,
        qt: null,
        qhr: null,
        Kmax: null,
        Kmin: null,
        t1: 5,
        p1: 50,
        di: 0,
        dut: null,
        tipLh: "kl",
        tipIMh: 6,
        txvL: 15,
        txvZ: 5,
        filh: 0,
        IL: 0,
        imagePlane: ""
      },
      sb: {
        tipSB: 0,
        shifr_to: "",
        lvru: 30,
        lsbh: 15
      },
      infh: "Параметры ХВС",
      fh: false,
      im4: true,
      show: false,
      stup: false,
      stup4: false,
      otklFormatSPL: true,
      otklFormatPrSx: true,
      file: null
    };
  },
  computed: {
    ...mapState({
      rescalc: state => state.calcModule.rescalc
    }),
    php() {
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
      let are = {};
      let sp = [
        this.rescalc.gdr1.V,
        this.rescalc.gdr9.V,
        this.rescalc.gdr3.V,
        this.rescalc.gdr4.V
      ];
      sp.forEach(function(el, i) {
        if (el > 1.5) {
          are["v" + i] = false;
        } else {
          are["v" + i] = true;
        }
      });
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
      let d1 = +this.isx.di;
      let A1 = du.indexOf(d1);
      let y1 = "";
      if (+this.isx.tipIMh == 6) {
        A1 >= 0 || !d1 ? (y1 = false) : (y1 = true);
      } else {
        y1 = false;
      }

      return {
        y1
      };
    },
    imgsx() {
      let z = "10";
      let z1 = "";
      let zz = "";
      let bf7 = 1;
      let bf8 = 0;
      let v1 = 0;
      let v2 = 0;
      let v3 = 0;
      let tipu = this.tipProject;

      switch (tipu) {
        case "h":
          if (this.check6.y1 || this.ml.h) {
            v1 = 1;
          } else {
            v1 = 0;
          }
          if (this.isx.dut < 33 && this.isx.filh == "2") {
            v2 = 1;
          } else {
            v2 = 0;
          }
          bf8 = v1 + v2;
          if (bf8 > 0) {
            bf7 = 1;
          } else {
            bf7 = 0;
          }
          break;
        default:
          break;
      }
      let sx = "./img/" + z + ".svg";
      return {
        sx,
        zz,
        bf7
      };
    },
    tipProject() {
      let tipu = this.isx.tipuu;
      if (this.isx.qco > 0 && this.isx.qmax > 0) {
        tipu = "og";
      } else if (this.isx.qco > 0) {
        tipu = "o";
      } else if (this.isx.qmax > 0) {
        tipu = "g";
      } else {
        tipu = "";
      }
      return tipu;
    }
  },
  watch: {},
  methods: {
    proj(m, u) {
      let tip_rascheta = "";
      this.isx.tipuu = this.tipProject;
      switch (m) {
        case "qco":
          if (this.isx.qco > 0) {
            this.isx.pr_ot = 1;
            if (this.isx.qco > 100) {
              this.isx.qco = this.isx.qco / 1000;
            }
          }
          if (this.isx.tipLo == "ml") {
            this.fo = true;
            this.isx.filo = 0;
          } else {
            this.fo = false;
          }
          tip_rascheta = "ot";
          break;
        case "qmax":
        case "Kchn":
          if (this.isx.qmax > 100) {
            this.isx.qmax = this.isx.qmax / 1000;
          }

          if (this.isx.qmax > 0) {
            this.isx.qgvssr = (this.isx.qmax / this.isx.Kchn).toFixed(6);
          } else {
            this.isx.qgvssr = "";
            this.isx.tipLg4 = this.isx.tipLg3;
          }
          this.isx.pr_gvs = 1;
          this.isx.sx_gvs = 0;
          this.isx.sx_gvs_dep > 0 ? (this.stup = true) : (this.stup = false);

          this.isx.sx_otkr > 0 || this.isx.sx_gvs_dep > 0
            ? (tip_rascheta = "ot_gvs")
            : (tip_rascheta = "gvs");
          if (this.isx.tipLg3 == "ml") {
            this.fg = true;
            this.isx.filg = 0;
          } else {
            this.fg = false;
          }

          break;
        case "qgvssr":
          if (this.isx.qgvssr > 100) {
            this.isx.qgvssr = this.isx.qgvssr / 1000;
          }
          if (this.isx.qgvssr > 0) {
            this.isx.qmax = (this.isx.qgvssr * this.isx.Kchn).toFixed(6);
          } else {
            this.isx.qmax = "";
            this.isx.tipLg4 = this.isx.tipLg3;
          }
          this.isx.pr_gvs = 1;
          this.isx.sx_gvs = 0;
          this.isx.sx_gvs_dep > 0 ? (this.stup = true) : (this.stup = false);
          this.isx.sx_otkr > 0 || this.isx.sx_gvs_dep > 0
            ? (tip_rascheta = "ot_gvs")
            : (tip_rascheta = "gvs");
          if (this.isx.tipLg3 == "ml") {
            this.fg = true;
            this.isx.filg = 0;
          } else {
            this.fg = false;
          }

          break;
        case "itp0":
          this.stup = false;
          this.isx.t3 = 60;
          this.isx.t4 = 50;
          this.isx.sx_gvs_dep = 0;
          tip_rascheta = "ot_gvs";
          break;
        case "itp1":
          this.stup = true;
          this.isx.t3 = 70;
          this.isx.t4 = 40;
          tip_rascheta = "ot_gvs";
          break;
        case "itp2":
          this.stup = true;
          this.isx.t3 = 70;
          this.isx.t4 = 40;
          tip_rascheta = "ot_gvs";
          break;
        case "wgvs0":
          this.stup = false;
          this.isx.sx_gvs = 0;
          if (this.isx.sx_otkr < 1) {
            this.isx.fuCo = 0;
          }
          tip_rascheta = "ot_gvs";
          break;
        case "wgvs1":
          this.stup = false;
          this.isx.sx_gvs = 0;
          tip_rascheta = "ot_gvs";
          break;
        case "wgvs2":
          this.stup = true;
          this.isx.sx_gvs = 0;
          tip_rascheta = "ot_gvs";
          break;
        case "wgvs3":
          this.stup = true;
          this.$store.dispatch("TUPIC");
          this.isx.dut4 = null;
          tip_rascheta = "ot_gvs";
          break;
        case "sx_ot0":
          this.$store.dispatch("actPodp", 0);
          this.isx.sx_ot = 0;
          this.isx.filp = 0;
          tip_rascheta = "ot";
          break;
        case "sx_ot1":
          tip_rascheta = "ot";
          break;
        default:
          break;
      }
      if (u) {
        this.isx.tipIMg4 = this.isx.tipIMg3;
      }

      if (this.disablOtkr.diso) {
        this.isx.sx_otkr = 0;
      }

      // let result = clc_pr(this.isx, 1.5, m, 0, tip_rascheta);

      if (result.gdr1) {
        this.isx.di1 = result.gdr1.du_im;
        this.isx.dut1 = result.gdr1.du_tr;
        this.isx.di2 = result.gdr1.du_im;
        this.isx.dut2 = result.gdr2.du_tr;
        this.isx.di9 = result.gdr9.du_im;
        this.isx.dut9 = result.gdr9.du_tr;
      }
      if (result.gdr3) {
        this.isx.di3 = result.gdr3.du_im;
        this.isx.dut3 = result.gdr3.du_tr;
        this.isx.di4 = result.gdr4.du_im;
        this.isx.dut4 = result.gdr4.du_tr;
        this.isx.tipLg4 = this.ml4_kl4;
        if (result.gdr4.du_im < 25 && this.isx.tipIMg3 == 6) {
          this.isx.tipIMg4 = 5;
        } else {
          this.isx.tipIMg4 = this.isx.tipIMg3;
        }
      }
      this.$store.dispatch({
        type: "RESULT",
        result: result
      });
      this.im4 = false;
    },
    rash(d) {
      let R = 0;
      switch (d) {
        case "t1":
          R = this.rescalc.gdr1.Gv;
          this.isx.qco = null;
          this.isx.pr_ot = 0;

          if (R > 0) {
            //вычисляем Ду прибора
            let result = clc_kp(R, 1.5, d, "", "", "");
            this.isx.pr_ot = 0;
            this.isx.di1 = result.gdr1.du_im;
            this.isx.di2 = result.gdr2.du_im;
            this.isx.di9 = result.gdr9.du_im;
            this.$store.dispatch({
              type: "CHANGE_RASH",
              result: result,
              d: d
            });
            //проверяю Ду трубы
            let ch1 = this.dipTR(this.isx.di1, this.isx.dut1);
            if (ch1) {
              this.isx.dut1 = this.isx.di1;
              this.isx.dut2 = this.isx.di1;
            }
          } else {
            this.isx.di1 = 0;
            this.isx.di2 = 0;
            this.isx.di9 = 0;
            this.isx.dut1 = null;
            this.isx.dut2 = null;
            this.isx.dut9 = null;
            this.$store.dispatch("OT_NULL");
          }
          break;
        case "t3":
          R = this.rescalc.gdr3.Gv;
          this.im4 = false;
          this.isx.pr_gvs = 0;
          this.isx.qmax = null;
          this.isx.qgvssr = null;

          //пересчитываем отопление если открытая схема
          if (this.isx.sx_otkr) {
            this.isx.sx_otkr = 0;
            let reslt = clc_pr(this.isx, 1.5, "t1", R, "ot");

            this.isx.di3 = reslt.gdr3.du_im;
            this.isx.di4 = reslt.gdr4.du_im;
            this.isx.dut3 = reslt.gdr3.du_tr;
            this.isx.dut4 = reslt.gdr4.du_tr;
            this.$store.dispatch({
              type: "RESULT",
              result: reslt
            });
            this.im4 = false;
          }
          this.isx.sx_gvs = 0;

          if (R > 0) {
            //вычисляем Ду прибора
            let result = clc_kp(R, 1.5, d, "", "", "");
            this.isx.di3 = result.gdr3.du_im;
            this.isx.di4 = result.gdr4.du_im;
            this.isx.pr_gvs = 0;
            this.$store.dispatch({
              type: "CHANGE_RASH",
              result: result,
              d: d
            });

            //проверяю Ду трубы
            let ch3 = this.dipTR(this.isx.di3, this.isx.dut3);
            if (ch3) {
              this.isx.dut3 = this.isx.di3;
              this.isx.dut4 = this.isx.di4;
            }
          } else {
            this.isx.di3 = 0;
            this.isx.di4 = 0;
            this.isx.dut3 = null;
            this.isx.dut4 = null;
            this.$store.dispatch("GVS_NULL");
          }
          break;
      }
      this.isx.tipuu = this.tipProject;
    },
    change_du() {
      this.diptr.duu1[1]
        ? (this.isx.dut = this.diptr.duu1[1].value)
        : (this.isx.dut = this.diptr.duu1[0].value);
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
    ImageSPL() {
      let fileSPL = document.getElementById("fileImageSPL").files.length;
      let filePrSx = document.getElementById("fileImagePrSx").files.length;
      if (fileSPL === 0) {
        this.otklFormatSPL = true;
      } else {
        this.otklFormatSPL = false;
      }
      if (filePrSx === 0) {
        this.otklFormatPrSx = true;
      } else {
        this.otklFormatPrSx = false;
      }
    },
    customLabel(option) {
      return ` ${option.plt}`;
    },
    showModal() {
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
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

