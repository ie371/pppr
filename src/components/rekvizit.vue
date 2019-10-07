<template>
  <div class="form-group">
    <div class="form-row ml-3">
      <div class="col-md-4 labl">
        <!-- <h6><span class="badge">Реквизиты проекта</span></h6> -->
        <div class="text-center">
          <h5>
            <span class="badge">Реквизиты проекта</span>
          </h5>
        </div>

        <label class="col-form-label">Название проекта</label>
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="Узел коммерческого учёта тепловой энергии, теплоносителя"
          list="name_prj_list"
          v-model="rekv.name_prj"
        />
        <datalist id="name_prj_list">
          <option>Узел коммерческого учёта тепловой энергии, теплоносителя</option>
          <option>Узел технологического учёта тепловой энергии, теплоносителя</option>
          <option>Индивидуальный узел учета тепловой энергии, теплоносителя</option>
          <option>Узел коммерческого учёта холодного водоснабжения</option>
        </datalist>

        <label class="col-form-label">Шифр</label>
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="шифр"
          v-model="rekv.cod"
        />

        <label class="col-form-label">Название проектной организации</label>
        <input type="text" class="form-control form-control-sm" v-model="rekv.name_ooo" />

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">ГИП</label>
            <input type="text" class="form-control form-control-sm" v-model="rekv.GIP" />
          </div>
          <div class="col">
            <label class="col-form-label">Подпись</label>
            <input
              type="file"
              name="gip_uploads_sign"
              accept="image/jpeg, image/png"
              style="font-size:0.8em;"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Разработал</label>
            <input type="text" class="form-control form-control-sm" v-model="rekv.razr" />
          </div>
          <div class="col">
            <label class="col-form-label">Подпись</label>
            <input
              type="file"
              ref="file"
              name="razr_uploads_sign"
              accept="image/jpeg, image/png"
              style="font-size:0.8em;"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Проверил</label>
            <input type="text" class="form-control form-control-sm" v-model="rekv.prov" />
          </div>
          <div class="col">
            <label class="col-form-label">Подпись</label>
            <input
              type="file"
              ref="file"
              name="prov_uploads_signs"
              accept="image/jpeg, image/png"
              style="font-size:0.8em;"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Технический контролер</label>
            <input type="text" class="form-control form-control-sm" v-model="rekv.tcontr" />
          </div>
          <div class="col">
            <label class="col-form-label">Подпись</label>
            <input
              type="file"
              ref="file"
              name="tcontr_uploads_sign"
              accept="image/jpeg, image/png"
              style="font-size:0.8em;"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Нормоконтролер</label>
            <input type="text" class="form-control form-control-sm" v-model="rekv.ncontr" />
          </div>
          <div class="col">
            <label class="col-form-label">Подпись</label>
            <input
              type="file"
              ref="file"
              name="ncontr_uploads_sign"
              accept="image/jpeg, image/png"
              style="font-size:0.8em;"
            />
          </div>
        </div>
      </div>

      <div class="col-md-5 labl">
        <div class="text-center">
          <h5>
            <span class="badge">Реквизиты объекта</span>
          </h5>
        </div>

        <label class="col-form-label">Адрес</label>
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="140180, Московская область, г. Жуковский, ул. Энергетическая, д. 15"
          v-model="rekv.adress"
        />

        <label class="col-form-label">Тип объекта</label>
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="Многоквартирный жилой дом"
          list="tip_obj_list"
          v-model="rekv.tip_obj"
        />
        <datalist id="tip_obj_list">
          <option>Многоквартирный жилой дом</option>
          <option>Школа</option>
          <option>Детский сад</option>
          <option>Административное здание</option>
        </datalist>

        <label class="col-form-label">Заказчик</label>
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="Заказчик"
          v-model="rekv.zakazchik"
        />

        <label class="col-form-label">Абонент</label>
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="Абонент"
          v-model="rekv.abonent"
        />

        <label class="col-form-label">Источник теплоснабжения</label>
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="Источник теплоснабжения"
          v-model="rekv.istochnik"
        />

        <label class="col-form-label">Ресурсоснабжающая компания</label>
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="Ресурсоснабжающая компания"
          v-model="rekv.resurscomp"
        />

        <hr />
        <div class="form-group">
          <b-form-checkbox
            v-model.number="rekv.checkTiul"
            value="1"
            unchecked-value="0"
          >Печатать титульный лист</b-form-checkbox>
        </div>
      </div>

      <div class="mx-auto mt-5 pt-3" style="width: 120px;">
        <!-- <div class="col-md-6"> -->
        <b-btn variant="primary" class="btn btn-sm btn-block mb-3" @click="ls_save">Сохранить</b-btn>
        <b-btn variant="success" class="btn btn-sm btn-block mb-3" @click="ls_load">Загрузить</b-btn>
        <b-btn class="btn btn-sm btn-block mb-3" @click="ls_remove">Удалить</b-btn>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // checkTiul: "accepted"
    };
  },

  computed: {
    ...mapState({
      rekv: state => state.rekvz.rekvizits
    })
  },
  methods: {
    ls_save() {
      let ppp = JSON.stringify(this.rekv);
      localStorage.rekv = ppp;
    },
    ls_load() {
      if (localStorage.getItem("rekv")) {
        const rekvi = JSON.parse(localStorage.getItem("rekv"));
        this.$store.dispatch("LOAD_REKV", rekvi);
      }
    },
    ls_remove() {
      localStorage.removeItem("rekv");
    }
  }
};
</script>

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
 -webkit-appearance: none;
  margin: 0; 
}

input[type="number"] {
  -moz-appearance: textfield;
}
.form-control.red-error {
  border-color: #dd4b39;
  background: #fc9fa6 !important;
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