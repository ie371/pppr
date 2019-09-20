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
          <h6>
            <span class="badge">Системный блок</span>
          </h6>
          <select class="form-control form-control-sm" v-model.number="sb.tipSB">
            <option value="0">СБ-04 с блоком бесперебойного питания</option>
            <option value="1">СБ-04 с сетевым питанием</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <div class="col">
          <h6>
            <span class="badge">Платы расширения</span>
          </h6>
          <multiselect
            v-model="plats"
            :options="options"
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
                  v-for="region in regions"
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
            <select class="form-control form-control-sm" v-model="isx.fuCo" :disabled="fu_Co">
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
            <label class="col-form-label"></label>
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
              v-on:input="proj('')"
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
              v-on:input="proj('')"
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
              v-on:input="proj('')"
            />
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="40"
              v-model.number="isx.p2"
              v-on:input="proj('')"
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
              v-on:change="change_du('t1','peres')"
            >
              <option
                v-for="(option, index) in opt"
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
              v-on:change="change_du('t1','peres')"
            >
              <option
                v-for="(option, index) in diptr.duu1"
                v-bind:value="option.value"
                :key="index"
              >{{ option.value }}</option>
            </select>
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              v-model="this.select_T2.dtr"
              disabled
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
                v-on:change="change_du('t9','peres')"
              >
                <option
                  v-for="(option, index) in opt"
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
                v-on:change="change_du('t9','peres')"
              >
                <option
                  v-for="(option,index) in diptr.duu9"
                  v-bind:value="option.value"
                  :key="index"
                >{{ option.text }}</option>
              </select>
            </div>
          </div>
        </div>
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

        <!-- <div class="form-group"> -->
        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Тип изм. линии</label>
            <select
              class="form-control form-control-sm"
              v-model="isx.tipLg3"
              :class="{ 'yellow-error': ml.y, 'red-error': ml.g }"
              @change="proj('qmax')"
              id="mlg"
              :disabled="stup"
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
              :disabled="fg||stup"
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
              size="sm"
              v-model.number="isx.ok"
              :disabled="fg"
              value="1"
              unchecked-value="0"
            ></b-form-checkbox>
          </div>
        </div>
        <!-- </div> -->

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
              v-on:input="proj('')"
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
              v-on:input="proj('')"
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
              v-on:input="proj('')"
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
              v-on:input="proj('')"
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
              v-on:input="proj('')"
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
              v-on:input="proj('')"
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
              v-on:input="proj('')"
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
              v-on:input="proj('')"
              :disabled="stup"
            />
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="40"
              v-model.number="isx.p4"
              v-on:input="proj('')"
              :disabled="stup"
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
              :disabled="stup"
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
              v-on:change="change_du('t3','peres')"
              :disabled="stup"
            >
              <option
                v-for="(option, index) in opt"
                v-bind:value="option.value"
                :key="index"
              >{{ option.text }}</option>
            </select>
          </div>
          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model.number="isx.di4"
              v-on:change="change_du('t4','peres')"
              :disabled="im4||stup"
            >
              <option
                v-for="(option, index) in opt"
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
              :disabled="stup"
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
              :class="{'red-error' : check6.y4 }"
              id="im4"
              :disabled="stup"
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
              v-on:change="change_du('t3','peres')"
              :disabled="stup"
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
              v-on:change="change_du('t4','peres')"
              :disabled="stup"
            >
              <option
                v-for="(option,index) in diptr.duu4"
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

      <div class="form-group">
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
      </div>

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

          <b-btn class="btn btn-sm btn-block mb-3" @click="test">test JSON</b-btn>

          <!-- <div class='form-group'>
                            <b-row>
          <div class='col-md-6' style="font-size:.7em;">-->
          <!-- <ul id="example-1">
                                    <li v-for="(item, index) in rescalc.OT" :key="index">
                                        {{ item }} - {{index}} 
                                    
                                    </li>
          </ul>-->
          <!-- <ul id="example-2">
                                    <li v-for="(item, index) in rescalc.Ggvs" :key="index">
                                        {{index}}: {{ item }}
                                    
                                    </li>
          </ul>-->

          <!-- <div class="form-group" style="font-size:.7em;">
            Основное оборудование - {{plats.length+1}}
            <br />Узел учета ЦО NPOZ:
            <ul id="example-1">
              <li v-for="(item, index) in pozOt.arNPOZot" :key="index">поз. - {{ item }} - {{index}}</li>
            </ul>Узел учета CO NPOZ:
            <ul id="example-1">
              <li v-for="(item, index) in pozOt.arNPOZot" :key="index">{{index}} - {{ item }}</li>
            </ul>Узел учета ГВС:
            <ul id="example-1">
              <li
                v-for="(item, index) in pozOt.arNPOZgvs"
                :key="index"
              >поз. - {{ item }} - {{index}}</li>
            </ul>
          </div>-->

          <!--                                     
                                </div>

                                <div class='col-md-6' style="font-size:.7em;">

                                Узел учета GVS  NPOZ:
                                <ul id="example-1">
                                    <li v-for="(item, index) in pozOt.arNPOZgvs" :key="index">
                                        {{index}} - {{ item }}
                                        
                                    </li>
                                    </ul>
    
                                    
                                </div>
                            </b-row>
          </div>-->
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
export default {
  components: {
    Multiselect
  },

  data() {
    return {
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
      options: [
        {
          plt: "GSM-модем",
          lib: "gsm"
        },
        {
          plt: "USBA",
          lib: "usba"
        },
        {
          plt: "Ethernet ПРС-802",
          lib: "prs802"
        },
        {
          plt: "RS485E",
          lib: "rs485"
        },
        {
          plt: "УПП",
          lib: "lpt"
        }
      ],
      regions: [
        {
          text: "Без климатологии",
          value: "0"
        },
        {
          text: "Алтайский край",
          value: "1"
        },
        {
          text: "Амурская область",
          value: "2"
        },
        {
          text: "Архангельская область",
          value: "3"
        },
        {
          text: "Астраханская область",
          value: "4"
        },
        {
          text: "Белгородская область",
          value: "5"
        },
        {
          text: "Брянская область",
          value: "6"
        },
        {
          text: "Владимирская область",
          value: "7"
        },
        {
          text: "Волгоградская область",
          value: "8"
        },
        {
          text: "Вологодская область",
          value: "9"
        },
        {
          text: "Воронежская область",
          value: "10"
        },
        {
          text: "Ивановская область",
          value: "11"
        },
        {
          text: "Иркутская область",
          value: "12"
        },
        {
          text: "Кабардино- Балкарская Республика",
          value: "13"
        },
        {
          text: "Калининградская область",
          value: "14"
        },
        {
          text: "Калужская область",
          value: "15"
        },
        {
          text: "Камчатская область",
          value: "16"
        },
        {
          text: "Карачаево-Черкесская Республика",
          value: "17"
        },
        {
          text: "Кемеровская область",
          value: "18"
        },
        {
          text: "Кировская область",
          value: "19"
        },
        {
          text: "Костромская область",
          value: "20"
        },
        {
          text: "Краснодарский край",
          value: "21"
        },
        {
          text: "Красноярский край",
          value: "22"
        },
        {
          text: "Курганская область",
          value: "23"
        },
        {
          text: "Курская область",
          value: "24"
        },
        {
          text: "Ленинградская область",
          value: "25"
        },
        {
          text: "Липецкая область",
          value: "26"
        },
        {
          text: "Магаданская область",
          value: "27"
        },
        {
          text: "Московская область",
          value: "28"
        },
        {
          text: "Мурманская область",
          value: "29"
        },
        {
          text: "Ненецкий АО  (Архангельская область)",
          value: "30"
        },
        {
          text: "Нижегородская область",
          value: "31"
        },
        {
          text: "Новгородская область",
          value: "32"
        },
        {
          text: "Новосибирская область",
          value: "33"
        },
        {
          text: "Омская область",
          value: "34"
        },
        {
          text: "Оренбургская область",
          value: "35"
        },
        {
          text: "Орловская область",
          value: "36"
        },
        {
          text: "Пензенская область",
          value: "37"
        },
        {
          text: "Пермская область",
          value: "38"
        },
        {
          text: "Приморский край",
          value: "39"
        },
        {
          text: "Псковская область",
          value: "40"
        },
        {
          text: "Республика Адыгея",
          value: "41"
        },
        {
          text: "Республика Алтай",
          value: "42"
        },
        {
          text: "Республика Башкортостан",
          value: "43"
        },
        {
          text: "Республика Бурятия",
          value: "44"
        },
        {
          text: "Республика Дагестан",
          value: "45"
        },
        {
          text: "Республика Калмыкия",
          value: "46"
        },
        {
          text: "Республика Карелия",
          value: "47"
        },
        {
          text: "Республика Коми",
          value: "48"
        },
        {
          text: "Республика Марий Эл",
          value: "49"
        },
        {
          text: "Республика Мордовия",
          value: "50"
        },
        {
          text: "Республика Саха (Якутия)",
          value: "51"
        },
        {
          text: "Республика Северная Осетия - Алания",
          value: "52"
        },
        {
          text: "Республика Татарстан",
          value: "53"
        },
        {
          text: "Республика Тыва",
          value: "54"
        },
        {
          text: "Республика Хакассия",
          value: "55"
        },
        {
          text: "Ростовская область",
          value: "56"
        },
        {
          text: "Рязанская область",
          value: "57"
        },
        {
          text: "Самарская область",
          value: "58"
        },
        {
          text: "Саратовская область",
          value: "59"
        },
        {
          text: "Сахалинская область",
          value: "60"
        },
        {
          text: "Свердловская область",
          value: "61"
        },
        {
          text: "Смоленская область",
          value: "62"
        },
        {
          text: "Ставропольский край",
          value: "63"
        },
        {
          text: "Тамбовская область",
          value: "64"
        },
        {
          text: "Тверская область",
          value: "65"
        },
        {
          text: "Томская область",
          value: "66"
        },
        {
          text: "Тульская область",
          value: "67"
        },
        {
          text: "Тюменская область",
          value: "68"
        },
        {
          text: "Удмуртская Республика",
          value: "69"
        },
        {
          text: "Ульяновская область",
          value: "70"
        },
        {
          text: "Хабаровский край",
          value: "71"
        },
        {
          text: "Челябинская область",
          value: "72"
        },
        {
          text: "Чеченская Республика",
          value: "73"
        },
        {
          text: "Читинская область",
          value: "74"
        },
        {
          text: "Чувашская Республика",
          value: "75"
        },
        {
          text: "Чукотский АО (Магаданская область)",
          value: "76"
        },
        {
          text: "Ярославская область",
          value: "77"
        },
        {
          text: "Республика Крым",
          value: "78"
        }
      ],
      opt: [
        {
          text: "нет",
          value: "0"
        },
        {
          text: "15",
          value: "15"
        },
        {
          text: "25",
          value: "25"
        },
        {
          text: "32",
          value: "32"
        },
        {
          text: "40",
          value: "40"
        },
        {
          text: "50",
          value: "50"
        },
        {
          text: "65",
          value: "65"
        },
        {
          text: "80",
          value: "80"
        },
        {
          text: "100",
          value: "100"
        },
        {
          text: "150",
          value: "150"
        },
        {
          text: "200",
          value: "200"
        },
        {
          text: "300",
          value: "300"
        }
      ],
      isx: {
        pr_ot: 0,
        pr_gvs: 0,
        tipuu: "",
        tipkp: "",
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
        tipLg3: "kl",
        tipLg4: "kl",
        tipIMo: 6,
        tipIMg3: 6,
        tipIMg4: 6,
        ok: 1,
        txvL: 15,
        txvZ: 5,
        filo: 0,
        filg: 0,
        filp: 0,
        selReg: 0,
        mess: [],
        indexnas: "",
        onlineKP: true,
        imagePlane: ""
      },
      sb: {
        tipSB: 0,
        lvru: 30,
        lsbo: 15,
        lsbg: 15
      },
      info: "Параметры ЦО",
      ro: true,
      fo: false,
      infg: "Параметры ГВС",
      rg: true,
      fg: false,
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
    disButKP() {
      let empt = "";
      let c6 = "";
      if (this.isx.di1 == "0" && this.isx.di3 == "0") {
        empt = 1;
      } else {
        empt = 0;
      }
      if (this.check6.y1 || this.check6.y3 || this.check6.y4) {
        c6 = 1;
      } else {
        c6 = 0;
      }
      let f = empt + c6;
      if (f > 0) {
        return true;
      } else {
        return false;
      }
    },
    select_T2() {
      let im = "И6";
      let dim = this.isx.di1;
      let dtr = this.isx.dut2;
      if (this.isx.tipIMo == 5) {
        im = "К5";
      }
      if (+this.isx.di1 === 0) {
        dim = "нет";
      }
      if (+this.isx.dut2 === 0) {
        dtr = "";
      }
      return {
        im: im,
        dim: dim,
        dtr: dtr
      };
    },
    disablOtkr() {
      let diso = true;
      let disg = true;
      if (this.isx.qco > 0 && this.isx.qmax > 0) {
        if (this.isx.sx_gvs_dep > 0) {
          this.isx.sx_otkr = 0;
          diso = true;
        } else {
          diso = false;
        }
        if (this.isx.sx_otkr < 2) {
          disg = false;
        } else {
          disg = true;
        }
      }
      return {
        diso: diso,
        disg: disg
      };
    },
    ml() {
      let o = false;
      let g = false;
      let y = false;
      if (this.isx.tipLo == "ml" && this.isx.di1) {
        if (this.isx.di1 > 80 || this.isx.di1 < 32) {
          o = true;
        }
      }
      if (this.isx.tipLg3 == "ml" && (this.isx.di3 > 0 || this.isx.di4 > 0)) {
        if ((this.isx.di4 > 80 || this.isx.di4 < 32) && this.isx.di4 > 0) {
          g = false;
          y = true;
        }
        if (this.isx.tipLg3 == "ml") {
          this.isx.ok = 0;
        }
        if ((this.isx.di3 > 80 || this.isx.di3 < 32) && this.isx.di3 > 0) {
          g = true;
          y = false;
        }
      }
      return {
        o: o,
        g: g,
        y: y
      };
    },

    grz() {
      let o = false;
      let g = false;
      if (this.isx.dut1 < 33 && this.isx.di1 > 0 && this.isx.filo == 2) {
        o = true;
      }
      if (
        ((this.isx.dut3 < 33 && this.isx.di3 > 0) ||
          (this.isx.dut4 < 33 && this.isx.di4 > 0)) &&
        this.isx.filg == 2
      ) {
        g = true;
      }
      return {
        o: o,
        g: g
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
      let dd1 = [];
      let duu9 = [];
      let duu3 = [];
      let duu4 = [];
      let d1 = +this.isx.di1;
      let d9 = +this.isx.di9;
      let d3 = +this.isx.di3;
      let d4 = +this.isx.di4;
      let A1 = du.indexOf(d1);
      let A9 = du.indexOf(d9);
      let A3 = du.indexOf(d3);
      let A4 = du.indexOf(d4);
      let duk1 = du.slice(A1, A1 + 4);
      let duk9 = du.slice(A9, A9 + 4);
      let duk3 = du.slice(A3, A3 + 4);
      let duk4 = du.slice(A4, A4 + 4);
      duk1.forEach(function(el) {
        let h = {
          text: el,
          value: el
        };
        duu1.push(h);
        dd1.push(el);
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
        duu4,
        dd1
      };
    },
    check6() {
      let du = [25, 32, 40, 50, 65, 80];
      let d1 = +this.isx.di1;
      let d9 = +this.isx.di9;
      let d3 = +this.isx.di3;
      let d4 = +this.isx.di4;
      let A1 = du.indexOf(d1);
      let A9 = du.indexOf(d9);
      let A3 = du.indexOf(d3);
      let A4 = du.indexOf(d4);
      let y1 = "";
      let y3 = "";
      let y4 = "";
      if (+this.isx.tipIMo == 6) {
        if (A1 >= 0 || !d1) {
          y1 = false;
        } else {
          y1 = true;
        }
      } else {
        y1 = false;
      }
      if (this.isx.tipIMg3 == 6) {
        if (A3 >= 0 || !d3) {
          y3 = false;
        } else {
          y3 = true;
        }
      } else {
        y3 = false;
      }
      if (this.isx.tipIMg4 == 6) {
        if (A4 >= 0 || !d4) {
          y4 = false;
        } else {
          y4 = true;
        }
      } else {
        y4 = false;
      }
      return {
        y1,
        y3,
        y4
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
      let z2 = this.isx.sx_ot;
      let z3 = this.isx.sx_otkr;
      let z4 = this.isx.sx_gvs;

      switch (tipu) {
        case "o":
          z1 = 1;
          z = z1 + z2;
          zz = "ЦО";
          if (this.check6.y1 || this.ml.o) {
            v1 = 1;
          } else {
            v1 = 0;
          }
          if (this.isx.dut1 < 33 && this.isx.filo == "2") {
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
        case "g":
          z1 = 2;
          z = z1 + z4;
          zz = "ГВС";
          if (this.check6.y3 || this.check6.y4 || this.ml.g) {
            v1 = 1;
          } else {
            v1 = 0;
          }
          if (
            (this.isx.dut3 < 33 && this.isx.di3 > 0 && this.isx.filg == 2) ||
            (this.isx.dut4 < 33 && this.isx.di4 > 0 && this.isx.filg == 2)
          ) {
            v2 = 1;
          } else {
            v2 = 0;
          }
          // if (this.isx.di4 > 0 && this.isx.tipIMg3 !== this.isx.tipIMg4) {
          //   v3 = 1;
          // } else {
          //   v3 = 0;
          // }
          bf8 = v1 + v2 + v3;
          if (bf8 > 0) {
            bf7 = 1;
          } else {
            bf7 = 0;
          }
          break;
        case "og":
          if (this.isx.sx_gvs_dep < 1) {
            if (this.isx.sx_otkr < 2) {
              zz = "ЦО + ГВС";
            } else {
              zz = "TC";
            }
          } else {
            zz = "ИТП";
            z4 = +this.isx.sx_gvs_dep + 3;
          }

          z1 = 3;
          z = z1 + z2 + z3 + z4;
          if (this.ml.y) {
            v1 = 0;
          }
          if (
            this.check6.y1 ||
            this.check6.y3 ||
            this.check6.y4 ||
            this.ml.o ||
            this.ml.g
          ) {
            v1 = 1;
          } else {
            v1 = 0;
          }

          if (
            (this.isx.dut1 < 33 && this.isx.filo == 2) ||
            (this.isx.dut3 < 33 && this.isx.di3 > 0 && this.isx.filg == 2) ||
            (this.isx.dut4 < 33 && this.isx.di4 > 0 && this.isx.filg == 2)
          ) {
            v2 = 1;
          } else {
            v2 = 0;
          }

          // if (this.isx.di4 > 0 && this.isx.tipIMg3 !== this.isx.tipIMg4) {
          //   v3 = 1;
          // } else {
          //   v3 = 0;
          // }
          // console.log("v1=", v1);
          // console.log("v2=", v2);
          // console.log("v3=", v3);
          bf8 = v1 + v2 + v3;
          if (bf8 > 0) {
            bf7 = 1;
          } else {
            bf7 = 0;
          }

          break;
        default:
          zz = "";
          bf7 = 1;
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
    },
    tipKP() {
      let tipk = "";
      if (this.isx.di1 > 0 && this.isx.di3 > 0) {
        tipk = "og";
      } else if (this.isx.di1 > 0) {
        tipk = "o";
      } else if (this.isx.di3 > 0) {
        tipk = "g";
      } else {
        tipk = "";
      }
      return tipk;
    },
    fu_Co() {
      if (this.isx.sx_otkr < 1) {
        return false;
      } else {
        this.isx.fuCo = 1;
        return true;
      }
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
          // this.isx.t3 = 60;
          // this.isx.t4 = 50;
          // this.isx.sx_gvs_dep = 0;
          this.stup = false;

          if (this.isx.tipLg3 == "ml") {
            this.fg = true;
            this.isx.filg = 0;
          } else {
            this.fg = false;
          }
          tip_rascheta = "gvs";
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
          this.isx.t3 = 60;
          this.isx.t4 = 50;
          this.isx.sx_gvs_dep = 0;
          tip_rascheta = "gvs";
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

      let result = clc_pr(this.isx, 1.5, m, 0, tip_rascheta);

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
      let R4 = 0;
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

    change_du(d, h) {
      // console.log("d==", d);
      let R = "";
      let result = "";
      switch (d) {
        case "t1":
          if (this.isx.di1 > 0) {
            this.isx.di2 = this.isx.di1;
            // проверка отличия 3-х ду
            let ch = this.checkdiapTR(this.isx.di1, this.isx.dut1);
            if (ch) {
              this.isx.dut1 = this.isx.di1;
              this.isx.dut2 = this.isx.di1;
            }
            if (this.isx.pr_ot === 1) {
              result = clc_pr(this.isx, 1.5, "peres", "", "ot");
              this.im4 = false;
            } else {
              R = this.rescalc.gdr1.Gv;
              if (R > 0) {
                result = clc_kp(R, 1.5, d, "peres", this.isx.di1, "");
              }
            }
            this.isx.dut2 = result.gdr2.du_tr;
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
        case "t3":
          if (this.isx.di3 > 0) {
            let ch = this.checkdiapTR(this.isx.di3, this.isx.dut3);
            if (ch) {
              this.isx.dut3 = this.isx.di3;
            }
            if (this.isx.pr_gvs === 1) {
              result = clc_pr(this.isx, 1.5, "peres", "", "gvs");
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
            this.im4 = false;
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
            this.im4 = true;
            if (this.isx.sx_otkr) {
              result = clc_pr(this.isx, 1.5, "t1", R, "ot");
              this.$store.dispatch({
                type: "RESULT",
                result: result
              });
            }
          }

          break;
        case "t4":
          if (this.isx.di4 > 0) {
            let ch = this.checkdiapTR(this.isx.di4, this.isx.dut4);
            if (ch) {
              this.isx.dut4 = this.isx.di4;
            }
            this.isx.sx_gvs = 0;
            if (this.isx.pr_gvs === 1) {
              result = clc_pr(this.isx, 1.5, "peres", "", "gvs");
              this.im4 = false;
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
            // this.isx.tipLg4 = this.ml4_kl4;
            // console.log("смешанный уу гвс", this.ml4_kl4());
            this.isx.tipLg4 = this.ml4_kl4;
          } else {
            // переключаем на тупик
            this.isx.sx_gvs = 1;
            this.isx.dut4 = null;
            this.$store.dispatch("TUPIC");
            if (this.isx.pr_gvs === 1) {
              result = clc_pr(this.isx, 1.5, "peres", "", "gvs");
              this.im4 = false;
            }
            this.$store.dispatch({
              type: "RESULT",
              result: result
            });
          }

          break;
        case "t9":
          if (+this.isx.di9 > 0) {
            let ch = this.checkdiapTR(this.isx.di9, this.isx.dut9);
            if (ch) {
              this.isx.dut9 = this.isx.di9;
            }
            if (this.isx.pr_ot === 1) {
              result = clc_pr(this.isx, 1.5, "peres", "", "ot");
              this.im4 = false;
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
      let kp = this.tipKP;
      // this.$store.dispatch("tipkp", kp);
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
    onOk() {
      let ee = "";
      if (this.top || this.bottom) {
        ee = false;
      } else {
        ee = true;
      }
      this.$store.dispatch("actOKP", ee);
      this.show = false;
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
        this.mess = [];
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
            // if (this.isx.mess == "") {
            //   this.isx.indexnas = "";
            // } else {
            this.isx.indexnas = this.isx.mess[0].item;
            // }

            // this.$store.dispatch("actnas", asd);
          })

          .catch(function(error) {
            console.log(error);
          });
      } else {
        let asd = [];
        this.isx.indexnas = "";
        // this.$store.dispatch("actnas", asd);
      }
    },
    test() {
      window.open("./pdf/project/test.php");

      Axios.post("./pdf/project/test.php", {
        sReg: this.isx
      })
        .then(response => {})

        .catch(function(error) {
          console.log(error);
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

