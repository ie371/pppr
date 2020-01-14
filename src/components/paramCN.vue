<template>
  <div class="form-row labl mt-2">
    <!-- // ************************************************** -->
    <div class="col-md-3">
      <div class="text-center mb-3">
        <h5>
          <span class="badge">Общие параметры</span>
        </h5>
      </div>

      <div class="form-group">
        <div class="col">
          <div class="form-row">
            <div class="col">
              <b-form-checkbox
                switch
                size="sm"
                v-model.number="isx.IL"
                value="1"
                unchecked-value="0"
              >
                <h6>
                  <span class="badge">Изм. линии</span>
                </h6>
              </b-form-checkbox>
            </div>
            <div class="col">
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="доп строки в прочее"
                v-model="isx.dop_str"
              />
            </div>
          </div>

          <div class="form-row">
            <h6>
              <span class="badge">Системный блок</span>
            </h6>
            <select class="form-control form-control-sm" v-model.number="sb.tipSB">
              <option value="0">СБ-04 с блоком бесперебойного питания</option>
              <option value="1">СБ-04 с сетевым питанием</option>
            </select>
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
          <div class="form-row">
            <div class="col">
              <h6>
                <span class="badge">Длина кабельных проводок</span>
              </h6>
            </div>
            <div class="col">
              <b-form-checkbox
                switch
                size="sm"
                v-model.number="isx.met_ruk"
                value="1"
                unchecked-value="0"
              >
                <h6>
                  <span class="badge">Мет. рукав</span>
                </h6>
              </b-form-checkbox>
            </div>
          </div>
          <div class="form-row">
            <div class="col">
              <label class="col-form-label">ВРУ => СБ</label>
              <input type="text" class="form-control form-control-sm" v-model="sb.lvru" />
            </div>
            <div class="col">
              <label class="col-form-label">СБ => ИМ ЦО</label>
              <input type="text" class="form-control form-control-sm" v-model="sb.lsbo" />
            </div>
            <div class="col">
              <label class="col-form-label">СБ => ИМ ГВС</label>
              <input type="text" class="form-control form-control-sm" v-model="sb.lsbg" />
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="col">
          <div class="form-row">
            <div class="col">
              <h6>
                <span class="badge">Теплоизоляция</span>
              </h6>
            </div>
            <div class="col badge">ТС</div>
            <div class="col badge">ГВС</div>
          </div>
          <div class="form-row">
            <div class="col"></div>
            <div class="col">
              <select
                class="form-control form-control-sm"
                v-model.number="isx.teploiz_ot"
                :class="{'red-error' : teploiz.o }"
              >
                <option value="0">Energoflex</option>
                <option value="1">K-flex</option>
                <option value="2">Цилиндры кашированные, 40мм</option>
              </select>
            </div>
            <div class="col">
              <select
                class="form-control form-control-sm"
                v-model.number="isx.teploiz_gvs"
                :class="{'red-error' : teploiz.g }"
              >
                <option value="0">Energoflex</option>
                <option value="1">K-flex</option>
                <option value="2">Цилиндры кашированные, 40мм</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="col">
          <h6>
            <span class="badge">Климатология</span>
          </h6>
          <div class="form-row">
            <div class="col">
              <label class="col-form-label">Республика, край, область :</label>
              <select
                class="form-control form-control-sm"
                v-on:change="nasp"
                v-model.number="isx.selReg"
                name="region"
              >
                <option
                  v-for="region in Regions"
                  v-bind:value="region.value"
                  :key="region.key"
                >{{ region.text }}</option>
              </select>
            </div>

            <div class="col">
              <label class="col-form-label">Населенный пункт:</label>
              <select
                class="form-control form-control-sm"
                v-model.number="isx.indexnas"
                :disabled=" isx.selReg == 0"
                name="naspunkt"
              >
                <option v-for="mes in isx.mess" :key="mes.key">{{ mes.item}}</option>
              </select>
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
                ref="file"
                id="fileImagePrSx"
                name="princ_sx_uploads"
                accept="image/jpeg, image/png"
                style="font-size:0.7em;"
                v-on:change="handleFileUpload()"
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
                ref="file"
                id="fileImageSPL"
                name="sitplan_uploads"
                accept="image/jpeg, image/png"
                style="font-size:0.7em;"
                v-on:change="handleFileUpload()"
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

    <!-- // ************************************************** -->
    <div class="col-md-3 px-3 border-left border-warning">
      <div class="text-center">
        <h5>
          <span class="badge">{{info}}</span>
        </h5>
      </div>

      <div class="form-group">
        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Qco, Гкал/ч</label>
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="Qцо"
              v-model.number="isx.qco"
              v-on:input="proj('qco')"
              step="0.0000001"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="8"
            />
          </div>

          <div class="col-md-5">
            <label class="col-form-label">Схема теплоснабжения</label>
            <select
              class="form-control form-control-sm"
              v-model.number="isx.sx_otkr"
              @change="proj('wgvs'+$event.target.value)"
              :disabled="disablOtkr.diso"
            >
              <option value="0">закрытая</option>
              <option value="1">открытая с ИМ на ГВС</option>
              <option value="2">открытая без ИМ на ГВСЦ</option>
              <option value="3">открытая без ИМ на ГВСТ</option>
            </select>
          </div>

          <div class="col">
            <label class="col-form-label">Формула учета</label>
            <select class="form-control form-control-sm" v-model="isx.fuCo" :disabled="dis_fu">
              <option value="0">закрытая (М1 = М2)</option>
              <option value="1">открытая (М1 - М2)</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Тип изм. линии</label>
            <select
              class="form-control form-control-sm"
              v-model="isx.tipLo"
              :class="{'red-error' : ml.o }"
              @change="proj('qco')"
              id="mlo"
            >
              <option value="kl">Классическая</option>
              <option value="ml">Модифицированная</option>
            </select>
            <b-popover :disabled="!ml.o" :show="ml.o" triggers="hover" target="mlo">{{popup.m}}</b-popover>
          </div>
          <div class="col">
            <label class="col-form-label">Фильтр</label>
            <select
              class="form-control form-control-sm"
              v-model.number="isx.filo"
              :disabled="fo"
              :class="{'red-error' : grz.o }"
              @change="proj('qco')"
            >
              <option value="0">без фильтра</option>
              <option value="1">сетчатый фильтр</option>
              <option value="2">грязевик</option>
            </select>
          </div>
          <div class="col-md-3 text-center" v-if="isx.sx_otkr>0">
            <label class="col-form-label md-3">реверс на Т2</label>
            <b-form-checkbox
              switch
              size="sm"
              v-model.number="isx.revers"
              value="1"
              unchecked-value="0"
            ></b-form-checkbox>
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Схема присоединения</label>
            <select
              class="form-control form-control-sm"
              v-model.number="isx.sx_ot"
              @change="proj('sx_ot'+$event.target.value)"
            >
              <option value="0">зависимая</option>
              <option value="1">независимая (с подпиткой)</option>
            </select>
          </div>
          <div class="col" v-if="isx.sx_ot">
            <label class="col-form-label">Фильтр подпитки</label>
            <select class="form-control form-control-sm" v-model.number="isx.filp">
              <option value="0">без фильтра</option>
              <option value="1">сетчатый фильтр</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="form-row mb-1">
          <div class="col">
            <!-- <label class="col-form-label"></label> -->
            <input
              type="text"
              class="form-control form-control-sm"
              placeholder="T до срезки"
              v-model="isx.t_srez"
            />
          </div>
          <div class="col text-maroon text-s">Подача Т1</div>
          <div class="col text-blue text-s">Обратка Т2</div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Tемп график, °C</label>
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="T1"
              v-model.number="isx.t1"
              v-on:input="proj()"
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
              v-on:input="proj()"
              step="0.1"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="5"
            />
          </div>
        </div>
        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Давление, мвст</label>
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="50"
              v-model.number="isx.p1"
              v-on:input="proj()"
            />
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="40"
              v-model.number="isx.p2"
              v-on:input="proj()"
            />
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Расход, м³/ч</label>
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              v-model.number="rescalc.gdr1.Gv"
              v-on:input="rash('t1')"
              step="0.001"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="5"
            />
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              v-model="rescalc.gdr2.Gv"
              disabled
            />
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Ду прибора</label>
          </div>

          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model.number="isx.di1"
              v-on:change="change_du('t1')"
            >
              <option
                v-for="(option, index) in DU"
                v-bind:value="option.value"
                :key="index"
              >{{ option.text }}</option>
            </select>
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control form-control-sm"
              v-model.number="select_T2.dim"
              disabled
            />
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Скорость, м/с</label>
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control form-control-sm"
              v-model.number="rescalc.gdr1.V"
              :class="{'red-error' : !speed.v0 }"
              id="V1"
              readonly
            />
            <b-popover
              :disabled="speed.v0"
              :show="!speed.v0"
              triggers="hover"
              target="V1"
            >{{popup.s}}</b-popover>
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="rescalc.gdr2.V"
              disabled
            />
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">ИМ отопление</label>
          </div>
          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model.number="isx.tipIMo"
              :class="{'red-error' : check6.y1 }"
              @change="proj('qco')"
              id="im1"
            >
              <option value="6">И6</option>
              <option value="5">К5</option>
            </select>

            <b-popover
              :disabled="!check6.y1"
              :show="check6.y1"
              triggers="hover"
              target="im1"
            >{{popup.d}}</b-popover>
          </div>

          <div class="col">
            <input
              type="text"
              class="form-control form-control-sm"
              v-model.number="this.select_T2.im"
              disabled
            />
          </div>
        </div>
        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Ду тр-дов Т1/Т2</label>
          </div>

          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model="isx.dut1"
              v-on:change="change_du('t1')"
            >
              <option
                v-for="(option, index) in diptr.duu1"
                v-bind:value="option.value"
                :key="index"
              >{{ option.value }}</option>
            </select>
          </div>
          <div class="col">
            <!-- <input
              type="number"
              class="form-control form-control-sm"
              v-model="this.select_T2.dtr"
              disabled
            />-->
            <select
              class="form-control form-control-sm"
              v-model="isx.dut2"
              v-on:change="change_du('t2')"
            >
              <option
                v-for="(option, index) in diptr.duu1"
                v-bind:value="option.value"
                :key="index"
              >{{ option.value }}</option>
            </select>
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Отметки</label>
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control form-control-sm"
              placeholder="min 0,4"
              v-model="isx.otmetka_T1"
            />
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control form-control-sm"
              placeholder="min 0,4"
              v-model="isx.otmetka_T2"
            />
          </div>
        </div>

        <div class="form-row mb-2" v-if="+isx.sx_ot">
          <div class="form-row mb-1">
            <label class="col-form-label">Подпитка:</label>
          </div>

          <div class="form-row mb-1">
            <div class="col">
              <label class="col-form-label">Расх.,м³/ч</label>
              <input
                type="number"
                class="form-control form-control-sm"
                v-model="rescalc.gdr9.Gv"
                readonly
                step="0.001"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="5"
              />
            </div>

            <div class="col">
              <label class="col-form-label">Ду ИМ</label>
              <select
                class="form-control form-control-sm"
                v-model.number="isx.di9"
                v-on:change="change_du('t9')"
              >
                <option
                  v-for="(option, index) in DU"
                  v-bind:value="option.value"
                  :key="index"
                >{{ option.text }}</option>
              </select>
            </div>
            <div class="col">
              <label class="col-form-label">Скорость</label>
              <input
                type="text"
                class="form-control form-control-sm"
                v-model="rescalc.gdr9.V"
                :class="{'red-error' : !speed.v1 }"
                id="V9"
                readonly
              />
            </div>
            <b-popover :disabled="speed.v1" triggers="hover focus" target="V9">{{popup.s}}</b-popover>
            <div class="col">
              <label class="col-form-label">Ду Т94</label>
              <select
                class="form-control form-control-sm"
                v-model.number="isx.dut9"
                v-on:change="change_du('t9')"
              >
                <option
                  v-for="(option,index) in diptr.duu9"
                  v-bind:value="option.value"
                  :key="index"
                >{{ option.text }}</option>
              </select>
            </div>

            <div class="col">
              <label class="col-form-label">Отметка</label>
              <input
                type="text"
                placeholder="min 0,4"
                class="form-control form-control-sm"
                v-model="isx.otmetka_T9"
              />
            </div>
          </div>
        </div>

        <!-- <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label text-maroon">Ду тр-дов на вводе</label>
          </div>

          <div class="col">
            <select class="form-control form-control-sm" v-model="isx.dut1_vv">
              <option
                v-for="(option, index) in DU"
                v-bind:value="option.value"
                :key="index"
              >{{ option.text }}</option>
            </select>
          </div>
          <div class="col">
            <select class="form-control form-control-sm" v-model="isx.dut2_vv">
              <option
                v-for="(option, index) in DU"
                v-bind:value="option.value"
                :key="index"
              >{{ option.text }}</option>
            </select>
          </div>
        </div>-->
      </div>
    </div>

    <div class="col-md-3 px-3 border-left border-warning">
      <div class="text-center">
        <h5>
          <span class="badge">{{infg}}</span>
        </h5>
      </div>

      <div class="form-group">
        <div class="form-row">
          <div class="col-md-3">
            <label class="col-form-label">Qmax, Гкал/ч</label>
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="Qmax"
              step="0.0000001"
              v-model.number="isx.qmax"
              v-on:input="proj('qmax')"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="8"
              v-b-popover.hover.bottomright.html="popup.qm"
            />
          </div>

          <div class="col-md-3">
            <label class="col-form-label">Qсред, Гкал/ч</label>
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="Qср"
              step="0.0000001"
              v-model.number="isx.qgvssr"
              v-on:input="proj('qgvssr')"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="8"
              v-b-popover.hover.bottomright.html="popup.qs"
            />
          </div>

          <div class="col">
            <label class="col-form-label">Схема теплоснабжения</label>
            <select
              class="form-control form-control-sm"
              v-model.number="isx.sx_gvs_dep"
              @change="proj('itp'+$event.target.value)"
              :disabled="disablOtkr.disg"
            >
              <option value="0">открытая</option>
              <option value="1">закрытая 1 ступ</option>
              <option value="2">закрытая 2-х ступ</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Тип изм. линии</label>
            <select
              class="form-control form-control-sm"
              v-model="isx.tipLg3"
              :class="{ 'yellow-error': ml.y, 'red-error': ml.g }"
              @change="proj('qmax')"
              id="mlg"
              :disabled="disable_gvs"
            >
              <option value="kl">Классическая</option>
              <option value="ml">Модифицированная</option>
            </select>
            <b-popover :disabled="!ml.g" :show="ml.g" triggers="hover" target="mlg">{{popup.m}}</b-popover>
          </div>
          <div class="col">
            <label class="col-form-label">Фильтр</label>
            <select
              class="form-control form-control-sm"
              id="fig"
              v-model.number="isx.filg"
              :disabled="fg||disable_gvs"
              :class="{'red-error' : grz.g }"
              @change="proj('qmax')"
            >
              <option value="0">без фильтра</option>
              <option value="1">сетчатый фильтр</option>
              <option value="2">грязевик</option>
            </select>
          </div>
          <div class="col-md-3 text-center">
            <label class="col-form-label md-3">Обр. клапан</label>
            <b-form-checkbox
              switch
              size="sm"
              v-model.number="isx.ok"
              :disabled="fg||tupik_gvs"
              value="1"
              unchecked-value="0"
            ></b-form-checkbox>
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Кчн</label>
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="Кчн"
              step="0.1"
              v-model.number="isx.Kchn"
              v-on:input="proj('Kchn')"
              v-b-popover.hover.bottomright.html="popup.kc"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="4"
            />
          </div>

          <div class="col">
            <label class="col-form-label">Тхвл</label>
            <input
              type="number"
              step="0.1"
              class="form-control form-control-sm"
              v-model.number="isx.txvL"
              value="15"
              v-on:input="proj()"
              v-b-popover.hover.bottomright="'Температура хол. воды (лето - 15 °С)'"
            />
          </div>

          <div class="col">
            <label class="col-form-label">Тхвз</label>
            <input
              type="number"
              step="0.1"
              class="form-control form-control-sm"
              v-model.number="isx.txvZ"
              value="5"
              v-on:input="proj()"
              v-b-popover.hover.bottomright="'Температура хол. воды (зима - 5 °С)'"
            />
          </div>

          <div class="col">
            <label class="col-form-label">Кнп</label>
            <input
              type="number"
              class="form-control form-control-sm"
              step="0.01"
              v-model.number="isx.knp"
              v-on:input="proj()"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="4"
              v-b-popover.hover.bottomright="'коэффициент, учитывающий уменьшение расхода тепла в трубопроводах ГВС в летний период'"
            />
          </div>

          <div class="col">
            <label class="col-form-label">Ктп</label>
            <input
              type="number"
              class="form-control form-control-sm"
              step="0.01"
              v-model.number="isx.ktp"
              v-on:input="proj()"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="4"
              v-b-popover.hover.bottomright="'коэффициент, учитывающий потери тепла в трубопроводах '"
            />
          </div>
          <div class="col">
            <label class="col-form-label">&beta;</label>
            <input
              type="number"
              class="form-control form-control-sm"
              step="0.01"
              v-model.number="isx.beta"
              v-on:input="proj()"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="4"
              v-b-popover.hover.bottomright="'коэффициент запаса на разрегулировку стояков ГВС'"
            />
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label"></label>
          </div>

          <div class="col text-maroon text-s">Подача Т3</div>
          <div class="col text-blue text-s">Обратка Т4</div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Tемп график, °C</label>
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="T3"
              v-model.number="isx.t3"
              v-on:input="proj()"
              step="0.1"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="5"
            />
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="T4"
              v-model.number="isx.t4"
              v-on:input="proj()"
              step="0.1"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="5"
            />
          </div>
        </div>
        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Давление, мвст</label>
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="50"
              v-model.number="isx.p3"
              v-on:input="proj()"
            />
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="40"
              v-model.number="isx.p4"
              v-on:input="proj()"
            />
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Расход, м³/ч</label>
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              v-model="rescalc.gdr3.Gv"
              v-on:input="rash('t3')"
              step="0.001"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="5"
              :disabled="disable_gvs"
            />
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              v-model="rescalc.gdr4.Gv"
              disabled
            />
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Ду прибора</label>
          </div>

          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model.number="isx.di3"
              v-on:change="change_du('t3')"
              :disabled="disable_gvs"
            >
              <option
                v-for="(option, index) in DU"
                v-bind:value="option.value"
                :key="index"
              >{{ option.text }}</option>
            </select>
          </div>
          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model.number="isx.di4"
              v-on:change="change_du('t4')"
              :disabled="disable_gvs"
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
          <div class="col">
            <label class="col-form-label">Скорость, м/с</label>
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              v-model.number="rescalc.gdr3.V"
              :class="{'red-error' : !speed.v2 }"
              id="V3"
              readonly
            />
          </div>
          <b-popover :disabled="speed.v2" :show="!speed.v2" triggers="hover" target="V3">{{popup.s}}</b-popover>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              v-model.number="rescalc.gdr4.V"
              :class="{'red-error' : !speed.v3 }"
              id="V4"
              readonly
            />
          </div>
          <b-popover :disabled="speed.v3" :show="!speed.v3" triggers="hover" target="V4">{{popup.s}}</b-popover>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">ИМ ГВС</label>
          </div>
          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model.number="isx.tipIMg3"
              :class="{'red-error' : check6.y3 }"
              @change="proj('qmax',1)"
              id="im3"
              :disabled="disable_gvs"
            >
              <option value="6">И6</option>
              <option value="5">К5</option>
            </select>
            <b-popover
              :disabled="!check6.y3"
              :show="check6.y3"
              triggers="hover"
              target="im3"
            >{{popup.d}}</b-popover>
          </div>
          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model.number="isx.tipIMg4"
              :class="{ 'yellow-error': yellow_t4, 'red-error': check6.y4 }"
              id="im4"
              :disabled="tupik_gvs"
            >
              <option value="6">И6</option>
              <option value="5">К5</option>
            </select>
            <b-popover
              :disabled="!check6.y4"
              :show="check6.y4"
              triggers="hover"
              target="im4"
            >{{popup.d}}</b-popover>
          </div>
        </div>
        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Ду тр-дов Т3/Т4</label>
          </div>

          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model.number="isx.dut3"
              v-on:change="change_du('t3')"
              :disabled="disable_gvs"
            >
              <option
                v-for="(option,index) in diptr.duu3"
                v-bind:value="option.value"
                :key="index"
              >{{ option.value }}</option>
            </select>
          </div>

          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model.number="isx.dut4"
              v-on:change="change_du('t4')"
              :disabled="tupik_gvs"
            >
              <option
                v-for="(option,index) in diptr.duu4"
                v-bind:value="option.value"
                :key="index"
              >{{ option.value }}</option>
            </select>
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Отметки</label>
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control form-control-sm"
              placeholder="min 0,4"
              v-model="isx.otmetka_T3"
              :disabled="disable_gvs"
            />
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control form-control-sm"
              placeholder="min 0,4"
              v-model="isx.otmetka_T4"
              :disabled="tupik_gvs"
            />
          </div>
        </div>

        <div v-if="+isx.fuCo||+isx.sx_otkr>0">
          <div class="form-row mb-1">
            <div class="col-6">
              <label class="col-form-label">Температура ХВ для откр.схемы</label>
            </div>
            <div class="col">
              <label class="col-form-label md-3">Программ</label>
              <b-form-checkbox
                switch
                size="sm"
                v-model.number="isx.progr_txv"
                :disabled="fg"
                value="1"
                unchecked-value="0"
              ></b-form-checkbox>
            </div>
            <div class="col" v-if="+isx.progr_txv">
              <label class="col-form-label">темп. ХВ, °C</label>
              <input type="number" class="form-control form-control-sm" v-model.number="isx.txv_pr" />
            </div>
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

      <div class="form-group">
        <b-row>
          <div class="col-md-12">
            <img
              id="sximageog"
              v-bind:src="img.sx"
              width="100%"
              @click="showModal"
              style="cursor: pointer;"
            />
            <b-modal ref="myModalRef" hide-footer title="Принципиальная схема узла учета" size="lg">
              <div class="d-block text-center">
                <img id="sximageog" v-bind:src="img.sx" width="100%" />
              </div>
              <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Закрыть</b-btn>
            </b-modal>
          </div>
        </b-row>
      </div>

      <div class="d-flex justify-content-center">
        <div class="col-md-9">
          <b-btn
            type="submit"
            class="btn btn-sm btn-block mb-3"
            formaction="./pdf/project/pr.php"
            :disabled="disable_button.bf7 ===1 ? true : false"
          >
            Создать проект
            <b-badge variant="light">{{img.zz}}</b-badge>
          </b-btn>
          <!-- 
          <b-button
            class="btn btn-sm btn-block mb-3"
            @click="savePDF(rekv.cod)"
            :disabled="disable_button.bf7 ===1 ? true : false"
            label="aaa"
          >save PDF</b-button>

          <b-btn
            class="btn btn-sm btn-block mb-3"
            @click="openPDF"
            :disabled="disable_button.bf7 ===1 ? true : false"
          >open new tab</b-btn>-->

          <div>
            <div class="form-row">
              <div class="col">
                <label class="col-form-label">Доп. трубы</label>
              </div>
              <div class="col">
                <b-form-checkbox
                  switch
                  size="sm"
                  v-model.number="dop.tpl_dop"
                  value="1"
                  unchecked-value="0"
                >
                  <span style="font-size:0.75em">с теплоизол.</span>
                </b-form-checkbox>
              </div>
            </div>

            <b-form-input
              class="form-control form-control-sm"
              v-model="dop.truba_dop"
              placeholder="4-50, 3-80-z"
            ></b-form-input>
            <label class="col-form-label">Доп. переходы</label>
            <b-form-input
              class="form-control form-control-sm"
              v-model="dop.perehod_dop"
              placeholder="2-40-32, 3-65-40-z"
            ></b-form-input>
            <label class="col-form-label">Доп. отводы</label>
            <b-form-input
              class="form-control form-control-sm"
              v-model="dop.otvod_dop"
              placeholder="6-32, 6-50-z"
            ></b-form-input>
            <label class="col-form-label"></label>
            <b-form-checkbox
              id="checkbox-1"
              v-model.number="dop.kozuh"
              value="1"
              unchecked-value="0"
            >
              <h6>
                <span class="badge">Кожух</span>
              </h6>
            </b-form-checkbox>
          </div>

          <input type="hidden" name="A" v-model="php" />
          <input type="hidden" name="R" v-model="php_rekv" />
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
import Regions from "@/utils/regions";
import Plats_r from "@/utils/plats_R";
export default {
  components: {
    Multiselect
  },

  data() {
    return {
      text: "",
      DU,
      Plats_r,
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
        pr_ot: 0,
        pr_gvs: 0,
        tipuu: "",
        sx_ot: 0,
        sx_otkr: 0,
        sx_gvs: 0,
        sx_gvs_dep: 0,
        fuCo: 0,
        qco: null,
        qmax: null,
        qgvssr: null,
        Kchn: 2.2,
        knp: 0.8,
        ktp: 0.25,
        beta: 1.3,
        t1: 95,
        t2: 70,
        t3: 60,
        t4: 50,
        p1: 50,
        p2: 40,
        p3: 50,
        p4: 40,
        di1: 0,
        di2: 0,
        di9: 0,
        di3: 0,
        di4: 0,
        dut1: null,
        dut2: null,
        dut9: null,
        dut3: null,
        dut4: null,
        tipLo: "kl",
        tipLp: "kl",
        tipLg3: "kl",
        tipLg4: "kl",
        tipIMo: 6,
        tipIMp: 5,
        tipIMg3: 6,
        tipIMg4: 6,
        revers: 0,
        ok: 0,
        teploiz_ot: 0,
        teploiz_gvs: 0,
        txvL: 15,
        txvZ: 5,
        progr_txv: 0,
        txv_pr: 10,
        filo: 0,
        filg: 0,
        filp: 0,
        IL: 0,
        selReg: 0,
        mess: [],
        indexnas: "",
        imagePlane: "",
        t_srez: "",
        dop_str: "",
        met_ruk: 0,
        otmetka_T1: "",
        otmetka_T2: "",
        otmetka_T3: "",
        otmetka_T4: "",
        otmetka_T9: ""
      },
      sb: {
        tipSB: 0,
        lvru: 30,
        lsbo: 15,
        lsbg: 15
      },
      info: "Параметры ЦО",
      infg: "Параметры ГВС",
      fo: false,
      fg: false,
      disable_gvs: false,
      tupik_gvs: false,
      otklFormatSPL: true,
      otklFormatPrSx: true,
      file: "",
      status: "load",
      dis_fu: false,
      disablOtkr: {
        diso: true,
        disg: true
      },
      ml: {
        o: false,
        g: false,
        y: false
      },
      grz: {
        o: false,
        g: false
      },
      dis_txv_pr: 0
    };
  },
  computed: {
    ...mapState({
      rescalc: state => state.calcModule.rescalc,
      rekv: state => state.rekvz.rekvizits
    }),
    php() {
      let dop = this.dop;
      let plll = { plt: this.plats };
      let ppp = JSON.stringify(
        Object.assign({}, this.isx, this.rescalc, this.sb, plll, dop)
      );
      return ppp;
    },
    php_rekv() {
      let rr = JSON.stringify(this.rekv);
      return rr;
    },
    img() {
      let tipu = this.tipProject,
        z = 10,
        z1 = 0,
        z2 = this.isx.sx_ot,
        z3 = this.isx.sx_otkr,
        z4 = this.isx.sx_gvs,
        zz = "";
      switch (tipu) {
        case "o":
          z1 = 10;
          z = z1 + z2;
          zz = "ЦО";
          break;
        case "g":
          z1 = 20;
          z = z1 + z4;
          zz = "ГВС";
          break;
        case "og":
          this.isx.sx_otkr < 2 ? (zz = "ЦО + ГВС") : (zz = "TC");
          z1 = 3;
          this.isx.sx_otkr == 3 ? (z4 = 1) : z4;
          if (this.isx.sx_gvs_dep > 0) {
            z4 = this.isx.sx_gvs_dep + 3;
            zz = "ИТП";
          }
          z = "" + z1 + z2 + z3 + z4;
          break;
        default:
          break;
      }
      let sx = "./img/" + z + ".svg";
      return {
        sx,
        zz
      };
    },
    select_T2() {
      let im = "И6",
        dim = this.isx.di1,
        dtr = this.isx.dut2;
      if (this.isx.tipIMo == 5) im = "К5";
      if (+this.isx.di1 === 0) dim = "нет";
      if (+this.isx.dut2 === 0) dtr = "";
      return {
        im: im,
        dim: dim,
        dtr: dtr
      };
    },
    speed() {
      let are = {},
        sp = [
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
      let du = [15, 20, 25, 32, 40, 50, 65, 80, 100, 125, 150, 200, 250, 300],
        duu1 = [],
        duu9 = [],
        duu3 = [],
        duu4 = [],
        d1 = +this.isx.di1,
        d9 = +this.isx.di9,
        d3 = +this.isx.di3,
        d4 = +this.isx.di4,
        A1 = du.indexOf(d1),
        A9 = du.indexOf(d9),
        A3 = du.indexOf(d3),
        A4 = du.indexOf(d4),
        duk1 = du.slice(A1, A1 + 4),
        duk9 = du.slice(A9, A9 + 4),
        duk3 = du.slice(A3, A3 + 4),
        duk4 = du.slice(A4, A4 + 4);
      duk1.forEach(function(el) {
        let h = {
          text: el,
          value: el
        };
        duu1.push(h);
      });
      duk9.forEach(function(el) {
        let h = {
          text: el,
          value: el
        };
        duu9.push(h);
      });
      duk3.forEach(function(el) {
        let h = {
          text: el,
          value: el
        };
        duu3.push(h);
      });
      duk4.forEach(function(el) {
        let h = {
          text: el,
          value: el
        };
        duu4.push(h);
      });
      return {
        duu1,
        duu9,
        duu3,
        duu4
      };
    },
    check6() {
      let du = [25, 32, 40, 50, 65, 80],
        d1 = +this.isx.di1,
        d3 = +this.isx.di3,
        d4 = +this.isx.di4,
        A1 = du.indexOf(d1),
        A3 = du.indexOf(d3),
        A4 = du.indexOf(d4),
        y1 = "",
        y3 = "",
        y4 = "";
      if (+this.isx.tipIMo == 6) {
        A1 >= 0 || !d1 ? (y1 = false) : (y1 = true);
      } else {
        y1 = false;
      }
      if (this.isx.tipIMg3 == 6) {
        A3 >= 0 || !d3 ? (y3 = false) : (y3 = true);
      } else {
        y3 = false;
      }
      if (this.isx.tipIMg4 == 6) {
        A4 >= 0 || !d4 ? (y4 = false) : (y4 = true);
      } else {
        y4 = false;
      }
      return {
        y1,
        y3,
        y4
      };
    },
    disable_button() {
      let bf7 = 1,
        bf8 = 1,
        v1 = 1,
        v2 = 1,
        v3 = 0;
      switch (this.tipProject) {
        case "o":
          this.check6.y1 || this.ml.o ? (v1 = 1) : (v1 = 0);
          this.isx.dut1 < 33 && this.isx.filo == "2" ? (v2 = 1) : (v2 = 0);
          break;
        case "g":
          this.check6.y3 || this.check6.y4 || this.ml.g ? (v1 = 1) : (v1 = 0);
          (this.isx.dut3 < 33 && this.isx.di3 > 0 && this.isx.filg == 2) ||
          (this.isx.dut4 < 33 && this.isx.di4 > 0 && this.isx.filg == 2)
            ? (v2 = 1)
            : (v2 = 0);
          // this.isx.di4 > 0 && this.isx.tipIMg3 !== this.isx.tipIMg4
          //   ? (v3 = 1)
          //   : (v3 = 0);
          break;
        case "og":
          this.ml.y ? (v1 = 0) : v1;
          this.check6.y1 ||
          this.check6.y3 ||
          this.check6.y4 ||
          this.ml.o ||
          this.ml.g
            ? (v1 = 1)
            : (v1 = 0);
          (this.isx.dut1 < 33 && this.isx.filo == 2) ||
          (this.isx.dut3 < 33 && this.isx.di3 > 0 && this.isx.filg == 2) ||
          (this.isx.dut4 < 33 && this.isx.di4 > 0 && this.isx.filg == 2)
            ? (v2 = 1)
            : (v2 = 0);
          break;
        default:
          bf7 = 1;
          break;
      }
      bf8 = v1 + v2 + v3;
      bf8 > 0 ? (bf7 = 1) : (bf7 = 0);
      return {
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
    },
    ml4_kl4() {
      let s = "";
      if (this.isx.tipLg3 == "ml" && (this.isx.di3 > 0 || this.isx.di4 > 0)) {
        if ((this.isx.di4 > 80 || this.isx.di4 < 32) && this.isx.di4 > 0) {
          s = "kl";
        } else {
          s = this.isx.tipLg3;
        }
      } else {
        s = this.isx.tipLg3;
      }
      return s;
    },
    yellow_t4() {
      let yel;
      if (this.isx.tipIMg4 != this.isx.tipIMg3) {
        this.isx.sx_gvs_dep > 0 || this.isx.sx_otkr > 1
          ? (yel = false)
          : (yel = true);
      }
      return yel;
    },
    teploiz() {
      let o;
      let g;
      if (this.isx.teploiz_ot == 0) this.isx.t1 > 95 ? (o = true) : (o = false);
      if (this.isx.teploiz_gvs == 0)
        this.isx.t3 > 95 ? (g = true) : (g = false);
      return { o, g };
    }
  },
  watch: {
    isx: {
      handler() {
        // откр/закр схемы
        this.isx.sx_otkr < 1
          ? (this.dis_fu = false)
          : ((this.isx.fuCo = 1), (this.dis_fu = true));
        if (this.isx.qco > 0 && this.isx.qmax > 0) {
          this.isx.sx_gvs_dep > 0
            ? ((this.isx.sx_otkr = 0), (this.disablOtkr.diso = true))
            : (this.disablOtkr.diso = false);
          this.isx.sx_otkr < 2
            ? (this.disablOtkr.disg = false)
            : (this.disablOtkr.disg = true);
        }
        // модиф.линии
        if (this.isx.tipLo == "ml" && this.isx.di1) {
          if (this.isx.di1 > 80 || this.isx.di1 < 32) this.ml.o = true;
        } else {
          this.ml.o = false;
        }
        if (this.isx.tipLg3 == "ml" && (this.isx.di3 > 0 || this.isx.di4 > 0)) {
          if ((this.isx.di4 > 80 || this.isx.di4 < 32) && this.isx.di4 > 0) {
            this.ml.g = false;
            this.ml.y = true;
          }
          if (this.isx.tipLg3 == "ml") this.isx.ok = 0;
          if ((this.isx.di3 > 80 || this.isx.di3 < 32) && this.isx.di3 > 0) {
            this.ml.g = true;
            this.ml.y = false;
          }
        } else {
          this.ml.g = false;
          this.ml.y = false;
        }
        // грязевики
        if (this.isx.dut1 < 33 && this.isx.di1 > 0 && this.isx.filo == 2) {
          this.grz.o = true;
        } else {
          this.grz.o = false;
        }
        if (
          ((this.isx.dut3 < 33 && this.isx.di3 > 0) ||
            (this.isx.dut4 < 33 && this.isx.di4 > 0)) &&
          this.isx.filg == 2
        ) {
          this.grz.g = true;
        } else {
          this.grz.g = false;
        }
        // программ txv
        if (this.isx.fuCo == 0) this.isx.progr_txv = 0;
      },
      deep: true
    }
  },
  methods: {
    proj(m, u) {
      let tip_rascheta = "";
      this.isx.tipuu = this.tipProject;
      this.isx.t1 > 95
        ? (this.isx.teploiz_ot = 1)
        : (this.isx.teploiz_ot = this.isx.teploiz_ot);
      switch (m) {
        case "qco":
          this.isx.qco > 0
            ? ((this.isx.pr_ot = 1), (tip_rascheta = "o"))
            : (this.isx.pr_ot = 0);
          if (this.isx.qco > 100) this.isx.qco = this.isx.qco / 1000;
          if (this.isx.tipLo == "ml") {
            this.fo = true;
            this.isx.filo = 0;
          } else {
            this.fo = false;
          }
          break;
        case "qmax":
        case "Kchn":
          this.isx.sx_gvs = 0;
          this.isx.qmax > 100
            ? (this.isx.qmax = this.isx.qmax / 1000)
            : this.isx.qmax;

          this.isx.qmax > 0
            ? (this.isx.qgvssr = (this.isx.qmax / this.isx.Kchn).toFixed(6))
            : ((this.isx.qgvssr = ""),
              (this.isx.tipLg4 = this.isx.tipLg3),
              (this.isx.tipIMg4 = this.isx.tipIMg3),
              (this.isx.revers = 0),
              (this.isx.fuCo = 0),
              (this.isx.sx_gvs_dep = 0));
          // (this.isx.t3 = 60),
          // (this.isx.t4 = 50)

          // this.isx.sx_gvs_dep > 0 || this.isx.sx_otkr > 1
          //   ? (this.stup = true)
          //   : (this.stup = false);

          this.isx.tipLg3 == "ml"
            ? ((this.fg = true), (this.isx.filg = 0))
            : (this.fg = false);
          this.isx.qmax > 0
            ? ((this.isx.pr_gvs = 1),
              this.isx.sx_otkr > 0 || this.isx.sx_gvs_dep > 0
                ? (tip_rascheta = "og")
                : (tip_rascheta = "g"))
            : ((this.isx.pr_gvs = 0), (tip_rascheta = this.tipProject));

          break;
        case "qgvssr":
          this.isx.sx_gvs = 0;
          this.isx.qgvssr > 100
            ? (this.isx.qgvssr = this.isx.qgvssr / 1000)
            : this.isx.qgvssr;

          this.isx.qgvssr > 0
            ? (this.isx.qmax = (this.isx.qgvssr * this.isx.Kchn).toFixed(6))
            : ((this.isx.qmax = ""),
              (this.isx.tipLg4 = this.isx.tipLg3),
              (this.isx.tipIMg4 = this.isx.tipIMg3),
              (this.isx.revers = 0),
              (this.isx.fuCo = 0),
              (this.isx.sx_gvs_dep = 0));

          this.isx.qgvssr > 0 ? (this.isx.pr_gvs = 1) : (this.isx.pr_gvs = 0);
          this.isx.tipLg3 == "ml"
            ? ((this.fg = true), (this.isx.filg = 0))
            : (this.fg = false);
          this.isx.qgvssr > 0
            ? ((this.isx.pr_gvs = 1),
              this.isx.sx_otkr > 0 || this.isx.sx_gvs_dep > 0
                ? (tip_rascheta = "og")
                : (tip_rascheta = "g"))
            : ((this.isx.pr_gvs = 0), (tip_rascheta = this.tipProject));
          break;
        case "itp0":
          this.disable_gvs = false;
          this.tupik_gvs = false;
          this.isx.t3 = 60;
          this.isx.t4 = 50;
          this.isx.sx_gvs_dep = 0;
          tip_rascheta = "og";
          break;
        case "itp1":
        case "itp2":
          this.disable_gvs = true;
          this.tupik_gvs = true;
          this.isx.ok = 0;
          this.isx.t3 = 70;
          this.isx.t4 = 40;
          tip_rascheta = "og";
          this.isx.fuCo = 0;
          break;
        case "wgvs0":
          this.disable_gvs = false;
          this.tupik_gvs = false;
          this.isx.sx_gvs = 0;
          this.isx.progr_txv = 0;
          if (this.isx.sx_otkr < 1) this.isx.fuCo = 0;
          tip_rascheta = "og";
          break;
        case "wgvs1":
          this.disable_gvs = false;
          this.tupik_gvs = false;
          this.isx.sx_gvs = 0;
          tip_rascheta = "og";
          break;
        case "wgvs2":
          this.disable_gvs = true;
          this.tupik_gvs = true;
          this.isx.ok = 0;
          this.isx.sx_gvs = 0;
          this.isx.p3 = this.isx.p1;
          this.isx.p4 = this.isx.p2;
          tip_rascheta = "og";
          break;
        case "wgvs3":
          this.disable_gvs = true;
          this.tupik_gvs = true;
          this.isx.ok = 0;
          this.isx.sx_gvs = 1;
          this.isx.p3 = this.isx.p1;
          this.isx.p4 = this.isx.p2;
          this.$store.dispatch("TUPIC");
          this.isx.dut4 = null;
          tip_rascheta = "og";
          break;
        case "sx_ot0":
          this.isx.sx_ot = 0;
          this.isx.filp = 0;
          tip_rascheta = "o";
          break;
        case "sx_ot1":
          tip_rascheta = "o";
          break;
        default:
          break;
      }
      if (u) this.isx.tipIMg4 = this.isx.tipIMg3;
      if (this.disablOtkr.diso) this.isx.sx_otkr = 0;
      let result = clc_pr(this.isx, 1.5, "", tip_rascheta);
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

        result.gdr4.du_im < 25 && this.isx.tipIMg3 == 6 && result.gdr4.du_im > 0
          ? (this.isx.tipIMg4 = 5)
          : (this.isx.tipIMg4 = this.isx.tipIMg3);
      }
      this.$store.dispatch({
        type: "RESULT",
        result: result
      });
    },
    rash(d) {
      let R = 0;
      this.isx.sx_otkr = 0;
      switch (d) {
        case "t1":
          this.isx.pr_ot = 0;
          R = this.rescalc.gdr1.Gv;
          this.isx.qco = null;
          if (R > 0) {
            //вычисляем Ду прибора
            let result = clc_kp(R, 1.5, d, "", "", "");
            this.isx.di1 = result.gdr1.du_im;
            this.isx.di2 = result.gdr2.du_im;
            this.isx.di9 = result.gdr9.du_im;
            this.$store.dispatch({
              type: "CHANGE_RASH",
              result: result,
              d: d
            });
            //проверяю Ду трубы
            this.diptr.duu1[1]
              ? (this.isx.dut1 = this.diptr.duu1[1].value)
              : (this.isx.dut1 = this.diptr.duu1[0].value);
            this.isx.dut2 = this.isx.di1;
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
          this.isx.pr_gvs = 0;
          this.isx.sx_gvs = 0;
          R = this.rescalc.gdr3.Gv;
          this.isx.qmax = null;
          this.isx.qgvssr = null;
          if (R > 0) {
            //вычисляем Ду прибора
            let result = clc_kp(R, 1.5, d, "", "", "");
            this.isx.di3 = result.gdr3.du_im;
            this.isx.di4 = result.gdr4.du_im;
            this.$store.dispatch({
              type: "CHANGE_RASH",
              result: result,
              d: d
            });
            //проверяю Ду трубы
            this.diptr.duu3[1]
              ? (this.isx.dut3 = this.diptr.duu3[1].value)
              : (this.isx.dut3 = this.diptr.duu3[0].value);
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
    change_du(d) {
      let R = "",
        result = "";
      switch (d) {
        case "t1":
          if (this.isx.di1 > 0) {
            this.isx.di2 = this.isx.di1;
            // проверка отличия 3-х ду
            let ch = this.checkdiapTR(this.isx.di1, this.isx.dut1);
            if (ch) {
              this.diptr.duu1[1]
                ? (this.isx.dut1 = this.diptr.duu1[1].value)
                : (this.isx.dut1 = this.diptr.duu1[0].value);
              // this.isx.dut2 = this.isx.dut1;
            }
            this.isx.dut2 = this.isx.dut1;
            if (this.isx.pr_ot === 1) {
              result = clc_pr(this.isx, 1.5, "peres", "ot");
            } else {
              R = this.rescalc.gdr1.Gv;
              if (R > 0) {
                result = clc_kp(R, 1.5, d, "peres", this.isx.di1, "");
              }
            }
            // this.isx.dut2 = result.gdr2.du_tr;
            this.$store.dispatch({
              type: "RESULT",
              result: result
            });
          } else {
            this.isx.pr_ot = 0;
            this.isx.qco = null;
            this.isx.di1 = 0;
            this.isx.di2 = 0;
            this.isx.di9 = 0;
            this.isx.dut1 = null;
            this.isx.dut2 = null;
            this.isx.dut9 = null;
            this.$store.dispatch("OT_NULL");
          }
          break;
        case "t2":
          result = clc_pr(this.isx, 1.5, "peres", "ot");
          this.$store.dispatch({
            type: "RESULT",
            result: result
          });
          break;
        case "t3":
          if (this.isx.di3 > 0) {
            let ch = this.checkdiapTR(this.isx.di3, this.isx.dut3);
            if (ch) {
              this.diptr.duu3[1]
                ? (this.isx.dut3 = this.diptr.duu3[1].value)
                : (this.isx.dut3 = this.diptr.duu3[0].value);
            }

            if (this.isx.pr_gvs === 1) {
              result = clc_pr(this.isx, 1.5, "peres", "gvs");
            } else {
              R = this.rescalc.gdr3.Gv;
              if (R > 0) {
                result = clc_kp(R, 1.5, d, "peres", this.isx.di3, "");
              }
            }
            this.$store.dispatch({
              type: "RESULT",
              result: result
            });
          } else {
            this.isx.pr_gvs = 0;
            this.isx.qmax = null;
            this.isx.qgvssr = null;
            this.isx.sx_otkr = 0;
            this.isx.di3 = 0;
            this.isx.di4 = 0;
            this.isx.dut3 = null;
            this.isx.dut4 = null;
            this.$store.dispatch("GVS_NULL");
            if (this.isx.sx_otkr) {
              result = clc_pr(this.isx, 1.5, "t1", "ot");
              this.$store.dispatch({
                type: "RESULT",
                result: result
              });
            }
          }

          break;
        case "t4":
          if (this.isx.di4 > 0) {
            this.tupik_gvs = false;
            let ch = this.checkdiapTR(this.isx.di4, this.isx.dut4);
            if (ch) {
              this.diptr.duu4[1]
                ? (this.isx.dut4 = this.diptr.duu4[1].value)
                : (this.isx.dut4 = this.diptr.duu4[0].value);
            }
            this.isx.sx_gvs = 0;
            if (this.isx.pr_gvs === 1) {
              result = clc_pr(this.isx, 1.5, "peres", "gvs");
            } else {
              R = this.rescalc.gdr4.Gv;
              if (R > 0) {
                result = clc_kp(R, 1.5, d, "peres", this.isx.di4, "");
              }
            }
            this.$store.dispatch({
              type: "RESULT",
              result: result
            });
            // смешанный уу гвс
            this.isx.tipLg4 = this.ml4_kl4;
          } else {
            // переключаем на тупик
            this.tupik_gvs = true;
            this.isx.ok = 0;
            this.isx.sx_gvs = 1;
            this.isx.dut4 = null;
            this.$store.dispatch("TUPIC");
            if (this.isx.pr_gvs === 1) {
              result = clc_pr(this.isx, 1.5, "peres", "gvs");
            }
            this.$store.dispatch({
              type: "RESULT",
              result: result
            });
          }

          break;
        case "t9":
          if (this.isx.di9 > 0) {
            let ch = this.checkdiapTR(this.isx.di9, this.isx.dut9);
            if (ch) {
              this.diptr.duu9[1]
                ? (this.isx.dut9 = this.diptr.duu9[1].value)
                : (this.isx.dut9 = this.diptr.duu9[0].value);
            }
            if (this.isx.pr_ot === 1) {
              result = clc_pr(this.isx, 1.5, "peres", "ot");
            } else {
              R = this.rescalc.gdr9.Gv;
              if (R > 0) {
                result = clc_kp(R, 1.5, d, "peres", this.isx.di9, "");
              }
            }
            this.$store.dispatch({
              type: "RESULT",
              result: result
            });
          } else {
            this.isx.sx_ot = 0;
            this.isx.filp = 0;
          }
          break;
      }
      this.isx.tipuu = this.tipProject;
    },
    checkdiapTR(du_im, du_tr) {
      let check,
        du = [15, 20, 25, 32, 40, 50, 65, 80, 100, 125, 150, 200, 250, 300],
        k1 = du.indexOf(+du_im),
        k11 = du.indexOf(+du_tr);
      !du_tr || k1 > k11 || k11 - k1 > 3 ? (check = true) : (check = false);
      return check;
    },
    ImageSPL() {
      let fileSPL = document.getElementById("fileImageSPL").files.length,
        filePrSx = document.getElementById("fileImagePrSx").files.length;
      fileSPL === 0
        ? (this.otklFormatSPL = true)
        : (this.otklFormatSPL = false);
      filePrSx === 0
        ? (this.otklFormatPrSx = true)
        : (this.otklFormatPrSx = false);
    },
    customLabel(option) {
      return ` ${option.plt}`;
    },
    showModal() {
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
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
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    savePDF(nPDF) {
      !nPDF ? (nPDF = "file") : nPDF;
      let formData = new FormData(form);
      formData.append("A", this.php);
      formData.append("R", this.php_rekv);
      formData.append("newfile", this.file);
      Axios.post("./pdf/project/pr.php", formData, {
        responseType: "blob",
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(response => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${nPDF}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      });
    },

    openPDF() {
      let formData = new FormData(form);
      formData.append("A", this.php);
      formData.append("R", this.php_rekv);
      formData.append("newfile", this.file);
      Axios.post("./pdf/project/pr.php", formData, {
        responseType: "blob",
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(response => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("target", "_blank");
        // link.click();
        window.open(link);
        link.remove();
        setTimeout(function() {
          window.URL.revokeObjectURL(url);
          100;
        });
      });
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
  /* padding-top: 0.15em; */
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

