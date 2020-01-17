<template>
  <form
    id="formAUU"
    method="post"
    target="_blank"
    enctype="multipart/form-data"
    onkeypress="if(event.keyCode == 13) return false;"
  >
    <div class="row mt-2">
      <div class="col-md-3 px-3">
        <div class="text-center">
          <h5>
            <span class="badge">Раздел ТМ</span>
          </h5>
        </div>
        <div class="form-group">
          <div class="form-row mb-1">
            <div class="col-md-6 labll">
              <label class="col-form-label">Тепловая нагрузка, Гкал/ч</label>
            </div>
            <div class="col">
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="Qco"
                v-model.number="isx.qco"
                v-on:input="raschet()"
                step="0.1"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="5"
              />
            </div>
            <div class="col"></div>
          </div>
          <div class="form-row mb-1">
            <div class="col-md-6 labll">
              <label class="col-form-label">этажи / стат. высота</label>
            </div>
            <div class="col">
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="этажей"
                v-model.number="isx.floor"
                v-on:input="raschet()"
                step="1"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="2"
              />
            </div>
            <div class="col">
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="H"
                v-model.number="isx.Hst"
                step="1"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="3"
              />
            </div>
          </div>
          <div class="form-row mb-1">
            <div class="col-md-6"></div>
            <div class="col text-maroon text-s">Подача</div>
            <div class="col text-blue text-s">Обратка</div>
          </div>
          <div class="form-row mb-2">
            <div class="col-md-6 labll">
              <label class="col-form-label">Tемп график тепл. сети, °C</label>
            </div>
            <div class="col">
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="T1"
                v-model.number="isx.t1"
                v-on:input="raschet()"
                step="0.1"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="5"
              />
            </div>
            <div class="col">
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="T2"
                v-model.number="isx.t2"
                v-on:input="raschet()"
                step="0.1"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="5"
              />
            </div>
          </div>

          <div class="form-row mb-2">
            <div class="col-md-6 labll">
              <label class="col-form-label">Tемп график сист отопл, °C</label>
            </div>
            <div class="col">
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="T11"
                v-model.number="isx.t11"
                v-on:input="raschet()"
                step="0.1"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="5"
              />
            </div>
            <div class="col">
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="T21"
                v-model.number="isx.t21"
                v-on:input="raschet()"
                step="0.1"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="5"
              />
            </div>
          </div>

          <div class="form-row mb-2">
            <div class="col-md-6 labll">
              <label class="col-form-label">Давление, мвст</label>
            </div>
            <div class="col">
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="50"
                v-model.number="isx.p1"
                v-on:input="raschet()"
              />
            </div>
            <div class="col">
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="40"
                v-model.number="isx.p2"
                v-on:input="raschet()"
              />
            </div>
          </div>

          <!-- ------------------------------------------------------------------->
          <div class="form-row mb-2">
            <div class="col">
              <label class="col-form-label">Сопр. системы</label>
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="5"
                v-model.number="isx.dP_so"
              />
            </div>
            <div class="col">
              <label class="col-form-label labll">коэф. запаса</label>
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="5"
                v-model.number="isx.kf_zap"
              />
            </div>
            <div class="col">
              <label class="col-form-label">резерв</label>
            </div>
            <div class="col">
              <label class="col-form-label">резерв</label>
            </div>
          </div>
          <!-- ------------------------------------------------------------------->

          <div class="form-row mb-1">
            <div class="col-md-2">
              <label class="col-form-label">термостаты</label>
              <b-form-checkbox
                switch
                size="sm"
                v-model.number="isx.termostats"
                v-on:change="raschet()"
                value="1"
                unchecked-value="0"
              ></b-form-checkbox>
            </div>
            <div class="col">
              <label class="col-form-label labll">насосы</label>
              <select class="form-control form-control-sm" v-model.number="isx.pump">
                <option value="1">DAB</option>
                <option value="2">Grundfos</option>
                <option value="3">WILO</option>
              </select>
            </div>
            <div class="col">
              <label class="col-form-label">клапан регул</label>
              <select class="form-control form-control-sm" v-model.number="isx.reg_valve">
                <option value="1">Siemens</option>
                <option value="2">Danfoss</option>
                <option value="3">Broen</option>
                <option value="4">Теплосила</option>
              </select>
            </div>
            <div class="col">
              <label class="col-form-label">регул давл</label>
              <select class="form-control form-control-sm" v-model.number="isx.press_valve">
                <option value="1">Теплосила</option>
                <option value="2">Nemen</option>
                <option value="3">Broen</option>
              </select>
            </div>
          </div>

          <div class="form-row mb-1">
            <div class="col">
              <hr />
            </div>
          </div>
        </div>

        <!-- расходы -->

        <div class="form-group">
          <div class="form-row">
            <div class="col">
              <label class="col-form-label">расход сетевой</label>
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="G1"
                v-model.number="isx.G1"
                disabled
              />
            </div>

            <div class="col">
              <label class="col-form-label">расход системный</label>
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="G2"
                v-model.number="isx.G2"
                disabled
              />
            </div>

            <div class="col">
              <label class="col-form-label">расход подмеса</label>
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="G3"
                v-model.number="isx.G3"
                disabled
              />
            </div>
          </div>

          <!-- выбор насосов -->
          <div class="form-row mb-1">
            <div class="col">
              <label class="col-form-label">Схема АУУ</label>
              <select class="form-control form-control-sm" v-model.number="isx.sxema">
                <option value="1">Схема 1</option>
                <option value="2">Схема 2</option>
                <option value="3">Схема 3</option>
                <option value="4">Схема 4</option>
                <option value="5">Схема 5</option>
                <option value="6">Схема 6</option>
              </select>
            </div>
            <div class="col">
              <label class="col-form-label">коэф. смеш</label>
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="u"
                v-model.number="isx.kf_u"
              />
            </div>
            <div class="col">
              <label class="col-form-label">подача насоса</label>
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="G4"
                v-model.number="isx.G_pump"
              />
            </div>
          </div>

          <div class="form-row mb-2">
            <div class="col">
              <hr />
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-9 px-3">
        <div class="mnemo" :style="{ backgroundImage: `url('${image}')` }">
          <div class="form-row mt-2" style="margin-left:125px; ">
            <div class="col-md-1">
              <label class="col-form-label labll">кран</label>
              <select class="form-control form-control-mnemo">
                <option
                  v-for="(option,index) in DU"
                  v-bind:value="option.value"
                  :key="index"
                >{{ option.value }}</option>
              </select>
            </div>
            <div class="col-md-1">
              <label class="col-form-label labll">фильтр</label>
              <select class="form-control form-control-mnemo">
                <option
                  v-for="(option,index) in DU"
                  v-bind:value="option.value"
                  :key="index"
                >{{ option.value }}</option>
              </select>
            </div>
            <div class="col-md-2">
              <label class="col-form-label">регул давл</label>
              <select class="form-control form-control-sm" v-model.number="isx.press_valve">
                <option value="1">Теплосила</option>
                <option value="2">Nemen</option>
                <option value="3">Broen</option>
              </select>
              <select class="form-control form-control-sm">
                <option
                  v-for="(option,index) in DU"
                  v-bind:value="option.value"
                  :key="index"
                >{{ option.value }}</option>
              </select>
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="G1"
                v-model.number="isx.G1"
                disabled
              />
            </div>
            <div class="col-md-2">
              <label class="col-form-label labll">Клапан</label>
              <select class="form-control form-control-sm" v-model.number="isx.reg_valve">
                <option value="1">Siemens</option>
                <option value="2">Danfoss</option>
                <option value="3">Broen</option>
                <option value="4">Теплосила</option>
              </select>

              <select class="form-control form-control-sm">
                <option
                  v-for="(option,index) in DU"
                  v-bind:value="option.value"
                  :key="index"
                >{{ option.value }}</option>
              </select>

              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="G1"
                v-model.number="isx.G1"
                disabled
              />
            </div>
            <div class="col-md-1 offset-md-2">
              <label class="col-form-label labll">Кран</label>
              <select class="form-control form-control-mnemo">
                <option
                  v-for="(option,index) in DU"
                  v-bind:value="option.value"
                  :key="index"
                >{{ option.value }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";
import Axios from "axios";
import DU from "@/utils/du";
import clc_pr from "@/utils/calc_AUU.js";
import Regions from "@/utils/regions";

export default {
  components: {},

  data() {
    return {
      image: "./img/auu_back/sx_1.png",
      text: "",
      DU,
      Regions,
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
      dop: {
        truba_dop: "",
        tpl_dop: "",
        perehod_dop: "",
        otvod_dop: "",
        kozuh: 0
      },

      isx: {
        qco: null,
        floor: null,
        Hst: null,
        t1: 105,
        t2: 70,
        t11: 95,
        t21: 70,
        p1: 65,
        p2: 50,
        p3: 50,
        p4: 40,
        dP_so: 5,
        kf_zap: 1.15,
        termostats: 0,
        G1: null,
        G2: null,
        G3: null,
        sxema: null,
        kf_u: null,
        G_pump: null,
        pump: 1,
        reg_valve: 1,
        press_valve: 1,
        di1: 0,
        di2: 0,
        di9: 0,
        di3: 0,
        di4: 0,
        dut1: null,
        dut2: null,
        dut9: null,
        dut3: null,
        dut4: null
      },
      rashods: {}
    };
  },
  computed: {
    ...mapState({
      rekv: state => state.rekvz.rekvizits
    })
  },
  watch: {
    isx: {
      handler() {
        if (this.isx.qco > 0) {
          if (this.isx.qco > 100) this.isx.qco = this.isx.qco / 1000;
          if (this.isx.t1 > 0 && this.isx.t11 > 0 && this.isx.t2 > 0)
            this.isx.kf_u =
              (this.isx.t1 - this.isx.t11) / (this.isx.t11 - this.isx.t2);
        }
        switch (this.isx.sxema) {
          case 1:
          case 2:
          case 3:
          case 4:
            if (this.isx.G1 > 0)
              this.isx.G_pump = (
                this.isx.kf_zap *
                this.isx.G1 *
                (1 + this.isx.kf_u)
              ).toFixed(3);
            break;
          case 5:
          case 6:
            if (this.isx.G3 > 0)
              this.isx.G_pump = (
                this.isx.kf_zap *
                this.isx.G1 *
                this.isx.kf_u
              ).toFixed(3);
            break;
        }
      },
      deep: true
    }
  },
  methods: {
    raschet() {
      this.isx.floor > 0
        ? (this.isx.Hst = this.isx.floor * 3 + 10)
        : (this.isx.Hst = null);

      if (this.isx.qco && this.isx.Hst > 0) {
        let result = clc_pr(this.isx);
        this.isx.G1 = result.G1;
        this.isx.G2 = result.G2;
        this.isx.G3 = result.G3;
        let p1 = this.isx.p1;
        let p2 = this.isx.p2;
        let H = this.isx.Hst;
        let delt_P = p1 - p2;
        if (delt_P >= 12 && p2 >= H) this.isx.sxema = 1;
        if (delt_P >= 8 && delt_P < 12 && p2 >= H) this.isx.sxema = 2;
        if (delt_P >= 8 && delt_P < 12 && p2 < H) this.isx.sxema = 3;
        if (delt_P >= 12 && p2 < H) this.isx.sxema = 4;
        if (delt_P <= 8 && this.isx.termostats == 0) this.isx.sxema = 5;
        if (delt_P <= 8 && this.isx.termostats == 1) this.isx.sxema = 6;
      }
    },
    checkdiapTR(du_im, du_tr) {
      let check,
        du = [15, 20, 25, 32, 40, 50, 65, 80, 100, 125, 150, 200, 250, 300],
        k1 = du.indexOf(+du_im),
        k11 = du.indexOf(+du_tr);
      !du_tr || k1 > k11 || k11 - k1 > 3 ? (check = true) : (check = false);
      return check;
    },

    nasp() {
      if (this.isx.selReg != 0) {
        // this.mess = [];
        let asd = [];
        Axios.post("./pdf/project/regions.php", {
          sReg: this.isx.selReg
        })
          .then(response => {
            response.data.forEach(item => {
              asd.push({
                item
              });
            });
            this.isx.mess = asd;
            this.isx.indexnas = this.isx.mess[0].item;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.isx.indexnas = "";
      }
    }
  }
};
</script>

<style scoped >
hr {
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  border: 0;
  border-top: 1px solid rgba(3, 103, 174, 0.7);
}
.mnemo {
  /* border: 2px solid rgb(40, 151, 230); */
  /* height: 600px; */
  min-height: 482px;
  max-width: 800px;
  background-size: 100% 100%;
}
.col-form-label {
  font-size: 0.65em;
  color: rgb(96, 113, 162);
}
.labll {
  text-align: left;
}
.labl {
  text-align: center;
}
.form-control-sm {
  /* border-color: #656565; */
  border-width: 1px;
  height: 25px;
  font-size: 0.75em;
  font-weight: bold;
  /* padding-top: 0.15em; */
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.form-control::placeholder {
  color: #868686 !important;
  opacity: 0.5 !important;
}

.form-control-mnemo {
  border-color: #656565;
  border-width: 1px;
  height: 20px;
  font-size: 0.7em;
  font-weight: bold;
  padding: 0.1em;
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
  font-size: 10px;
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

