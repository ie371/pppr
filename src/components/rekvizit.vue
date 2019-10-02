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
          id="name_prj"
          name="name_prj"
          list="name_prj_list"
          v-model="isx.nazvPR"
        />
        <datalist id="name_prj_list">
          <option>Узел коммерческого учёта тепловой энергии, теплоносителя</option>
          <option>Узел технологического учёта тепловой энергии, теплоносителя</option>
          <option>Индивидуальный узел учета тепловой энергии, теплоносителя</option>
        </datalist>

        <label class="col-form-label">Шифр</label>
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="шифр"
          name="cod"
          v-model="isx.cod"
        />

        <label class="col-form-label">Название проектной организации</label>
        <input
          type="text"
          class="form-control form-control-sm"
          name="name_ooo"
          v-model="isx.nazvPrO"
        />

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">ГИП</label>
            <input type="text" class="form-control form-control-sm" name="GIP" v-model="isx.GIP" />
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
            <input
              type="text"
              class="form-control form-control-sm"
              name="razr"
              v-model="isx.razrab"
            />
          </div>
          <div class="col">
            <label class="col-form-label">Подпись</label>
            <input
              type="file"
              name="razr_uploads_sign"
              accept="image/jpeg, image/png"
              style="font-size:0.8em;"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Проверил</label>
            <input type="text" class="form-control form-control-sm" name="prov" v-model="isx.prov" />
          </div>
          <div class="col">
            <label class="col-form-label">Подпись</label>
            <input
              type="file"
              name="prov_uploads_signs"
              accept="image/jpeg, image/png"
              style="font-size:0.8em;"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Технический контролер</label>
            <input
              type="text"
              class="form-control form-control-sm"
              name="tcontr"
              v-model="isx.tcontr"
            />
          </div>
          <div class="col">
            <label class="col-form-label">Подпись</label>
            <input
              type="file"
              name="tcontr_uploads_sign"
              accept="image/jpeg, image/png"
              style="font-size:0.8em;"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Нормоконтролер</label>
            <input
              type="text"
              class="form-control form-control-sm"
              name="ncontr"
              v-model="isx.ncontr"
            />
          </div>
          <div class="col">
            <label class="col-form-label">Подпись</label>
            <input
              type="file"
              name="ncontr_uploads_sign"
              accept="image/jpeg, image/png"
              style="font-size:0.8em;"
            />
          </div>
        </div>

        <!-- <label class='col-form-label'>ГИП</label>
    <input type='text' class='form-control form-control-sm' name='GIP' v-model="isx.GIP">

    <label class='col-form-label'>Разработал</label>
    <input type='text' class='form-control form-control-sm' name='razr' v-model="isx.razrab">

    <label class='col-form-label'>Проверил</label>
    <input type='text' class='form-control form-control-sm' name='prov' v-model="isx.prov">

    <label class='col-form-label'>Технический контролер</label>
    <input type='text' class='form-control form-control-sm' name='tcontr' v-model="isx.tcontr">

    <label class='col-form-label'>Нормоконтролер</label>
        <input type='text' class='form-control form-control-sm' name='ncontr' v-model="isx.ncontr">-->
      </div>

      <div class="col-md-5 labl">
        <!-- <h6><span class="badge">Реквизиты объекта</span></h6> -->
        <div class="text-center">
          <h5>
            <span class="badge">Реквизиты объекта</span>
          </h5>
        </div>

        <label class="col-form-label">Адрес</label>
        <input
          type="text"
          class="form-control form-control-sm"
          name="adress"
          placeholder="140180, Московская область, г. Жуковский, ул. Энергетическая, д. 15"
          v-model="isx.adress"
        />

        <label class="col-form-label">Тип объекта</label>
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="Многоквартирный жилой дом"
          name="tip_obj"
          list="tip_obj_list"
          v-model="isx.tipObj"
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
          name="zakazchik"
          v-model="isx.zakazc"
        />

        <label class="col-form-label">Абонент</label>
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="Абонент"
          name="abonent"
          v-model="isx.abon"
        />

        <label class="col-form-label">Источник теплоснабжения</label>
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="Источник теплоснабжения"
          name="istochnik"
          v-model="isx.istT"
        />

        <label class="col-form-label">Ресурсоснабжающая компания</label>
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="Ресурсоснабжающая компания"
          name="resurscomp"
          v-model="isx.resK"
        />

        <hr />
        <div class="form-group">
          <b-form-checkbox
            v-model="status"
            value="accepted"
            unchecked-value="not_accepted"
            name="checkTiul"
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
export default {
  data() {
    return {
      status: "accepted"
    };
  },

  computed: {
    isx() {
      return this.$store.getters.getRekv;
    }
  },
  methods: {
    ls_save() {
      let ppp = JSON.stringify(this.isx);
      localStorage.rekv = ppp;
    },
    ls_load() {
      if (localStorage.getItem("rekv")) {
        const rekv = JSON.parse(localStorage.getItem("rekv"));
        this.$store.dispatch("load_rekv", rekv);
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