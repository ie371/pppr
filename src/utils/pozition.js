      
// Исходные объекты с номерами позиций

pozOtisx: {
  im1: { id: 0, name: "im1", col: 2 },
  im2: { id: 0, name: "im2", col: 0 },
  im9: { id: 1, name: "im9", col: 0 },
  sensT: { id: 2, name: "sensT", col: 1 },
  sensD: { id: 3, name: "sensD", col: 2 },
  kr9: { id: 4, name: "kr9", col: 0 },
  kr1: { id: 5, name: "kr1", col: 4 },
  kr11: { id: 6, name: "kr11", col: 0 },
  filtr1: { id: 7, name: "filtr1", col: 0 },
  filtr9: { id: 8, name: "filtr9", col: 0 },
  kr3x: { id: 9, name: "kr3x", col: 4 },
  man: { id: 10, name: "man", col: 4 },
  term: { id: 11, name: "term", col: 2 },
  terman: { id: 12, name: "terman", col: 0 },
  spu15: { id: 13, name: "spu15", col: 2 },
  spu25: { id: 14, name: "spu25", col: 0 },
  petl: { id: 15, name: "petl", col: 0 },
  vst1: { id: 16, name: "vst1", col: 2 },
  vst9: { id: 17, name: "vst9", col: 0 }
},
pozGVSisx: {
  im4: { id: 0, name: "im4", col: 1 },
  im3: { id: 1, name: "im3", col: 1 },
  sensT: { id: 2, name: "sensT", col: 1 },
  sensD: { id: 3, name: "sensD", col: 2 },
  kr4: { id: 4, name: "kr4", col: 2 },
  kr3: { id: 5, name: "kr3", col: 2 },
  kr44: { id: 6, name: "kr44", col: 0 },
  kr33: { id: 7, name: "kr33", col: 0 },
  ok: { id: 8, name: "ok", col: 1 },
  filtr4: { id: 9, name: "filtr4", col: 0 },
  filtr3: { id: 10, name: "filtr3", col: 0 },
  kr3x: { id: 11, name: "kr3x", col: 4 },
  man: { id: 12, name: "man", col: 4 },
  term: { id: 13, name: "term", col: 2 },
  terman: { id: 14, name: "terman", col: 0 },
  spu15: { id: 15, name: "spu15", col: 2 },
  spu25: { id: 16, name: "spu25", col: 0 },
  vst4: { id: 17, name: "vst4", col: 1 },
  vst3: { id: 18, name: "vst3", col: 1 }
},
// Функция расчета номеров и количества позиций
pozOt() {
let i = this.plats.length + 2;
let arNPOZot = {};
let arNPOZgvs = {};
let arCOLot = {};
let arCOLgvs = {};
if (this.isx.sx_otkr > 1) {
  this.pozOtisx.im1.col = 1;
  this.pozOtisx.im2.col = 1;
} else {
  this.pozOtisx.im1.col = 2;
  this.pozOtisx.im2.col = 0;
}

if (this.isx.pr_ot !== 0) {
  //  модифицированная
  if (this.isx.tipLo === "ml") {
    this.pozOtisx.kr1.col = 2;
    this.pozOtisx.kr11.col = 2;

    if (this.isx.tipIMo == 6) {
      this.pozOtisx.kr3x.col = 0;
      this.pozOtisx.man.col = 0;
      this.pozOtisx.term.col = 0;
      this.pozOtisx.terman.col = 2;
    } else {
      this.pozOtisx.kr3x.col = 2;
      this.pozOtisx.man.col = 0;
      this.pozOtisx.term.col = 0;
      this.pozOtisx.terman.col = 2;
    }

    if (this.isx.sx_ot > 0) {
      this.pozOtisx.im9.col = 1;
      this.pozOtisx.kr9.col = 2;
      this.pozOtisx.vst9.col = 1;
      this.pozOtisx.spu15.col = 3;

      if (this.isx.filp > 0) {
        this.pozOtisx.filtr9.col = 1;
        this.pozOtisx.man.col = 2;

        if (this.isx.tipIMo == 6) {
          this.pozOtisx.kr3x.col = 2;
        } else {
          this.pozOtisx.kr3x.col = 4;
        }
      } else {
        this.pozOtisx.filtr9.col = 0;
      }
    } else {
      this.pozOtisx.im9.col = 0;
      this.pozOtisx.kr9.col = 0;
      this.pozOtisx.vst9.col = 0;
      this.pozOtisx.spu15.col = 2;
      this.pozOtisx.filtr9.col = 0;
    }

    // классическая
  } else {
    if (this.isx.t1 > 114) {
      this.pozOtisx.petl.col = 1;
    } else {
      this.pozOtisx.petl.col = 0;
    }

    this.pozOtisx.kr1.col = 4;
    this.pozOtisx.kr11.col = 0;

    if (this.isx.tipIMo == 6) {
      this.pozOtisx.kr3x.col = 4;
      this.pozOtisx.man.col = 4;
      this.pozOtisx.term.col = 2;
      this.pozOtisx.terman.col = 0;
    } else {
      this.pozOtisx.kr3x.col = 6;
      this.pozOtisx.man.col = 4;
      this.pozOtisx.term.col = 2;
      this.pozOtisx.terman.col = 0;
    }

    if (this.isx.sx_ot > 0) {
      this.pozOtisx.im9.col = 1;
      this.pozOtisx.kr9.col = 2;
      this.pozOtisx.vst9.col = 1;
      this.pozOtisx.spu15.col = 3;

      if (this.isx.filp > 0) {
        this.pozOtisx.filtr9.col = 1;
        this.pozOtisx.man.col = 6;

        if (this.isx.tipIMo == 6) {
          this.pozOtisx.kr3x.col = 6;
        } else {
          this.pozOtisx.kr3x.col = 8;
        }
      } else {
        this.pozOtisx.filtr9.col = 0;
      }
    } else {
      this.pozOtisx.im9.col = 0;
      this.pozOtisx.kr9.col = 0;
      this.pozOtisx.vst9.col = 0;
      this.pozOtisx.spu15.col = 2;
      this.pozOtisx.filtr9.col = 0;
    }
  }

  if (this.isx.filo > 0) {
    this.pozOtisx.filtr1.col = 1;
    this.pozOtisx.man.col = this.pozOtisx.man.col + 2;
    this.pozOtisx.kr3x.col = this.pozOtisx.kr3x.col + 2;
    if (this.isx.filo > 1) {
      this.pozOtisx.spu25.col = 2;
    } else {
      this.pozOtisx.spu25.col = 0;
    }
  } else {
    this.pozOtisx.filtr1.col = 0;
    this.pozOtisx.spu25.col = 0;
  }

  let temp01 = Object.entries(this.pozOtisx);
  temp01.forEach(function(item) {
    if (item[1].col > 0) {
      arNPOZot[item[1].name] = i;
      arCOLot[item[1].name] = item[1].col;
      i++;
    }
  });
}

if (this.isx.pr_gvs !== 0) {
  //с циркуляцией
  if (this.isx.sx_gvs < 1) {
    this.pozGVSisx.sensD.col = 2;
    this.pozGVSisx.spu15.col = 2;

    //  модули
    if (+this.isx.di3 !== +this.isx.di4) {
      this.pozGVSisx.im4.col = 1;
      this.pozGVSisx.vst4.col = 1;
      this.pozGVSisx.im3.col = 1;
      this.pozGVSisx.vst3.col = 1;
    } else {
      this.pozGVSisx.im4.col = 0;
      this.pozGVSisx.vst4.col = 0;
      this.pozGVSisx.im3.col = 2;
      this.pozGVSisx.vst3.col = 2;
    }

    //  модифицированная
    if (this.isx.tipLg === "ml") {
      this.pozGVSisx.ok.col = 0;
      this.pozGVSisx.filtr3.col = 0;
      this.pozGVSisx.filtr4.col = 0;

      if (+this.isx.di3 !== +this.isx.di4) {
        this.pozGVSisx.kr3.col = 1;
        this.pozGVSisx.kr33.col = 1;
        this.pozGVSisx.kr4.col = 1;
        this.pozGVSisx.kr44.col = 1;
      } else {
        this.pozGVSisx.kr3.col = 2;
        this.pozGVSisx.kr33.col = 2;
        this.pozGVSisx.kr4.col = 0;
        this.pozGVSisx.kr44.col = 0;
      }

      if (this.isx.tipIMg3 == 6) {
        this.pozGVSisx.kr3x.col = 0;
        this.pozGVSisx.man.col = 0;
        this.pozGVSisx.term.col = 0;
        this.pozGVSisx.terman.col = 2;
      } else {
        this.pozGVSisx.kr3x.col = 2;
        this.pozGVSisx.man.col = 0;
        this.pozGVSisx.term.col = 0;
        this.pozGVSisx.terman.col = 2;
      }

      // классическая
    } else {
      this.pozGVSisx.ok.col = 1;
      this.pozGVSisx.kr33.col = 0;
      this.pozGVSisx.kr44.col = 0;

      if (+this.isx.dut3 !== +this.isx.dut4) {
        this.pozGVSisx.kr3.col = 2;
        this.pozGVSisx.kr4.col = 2;
      } else {
        this.pozGVSisx.kr3.col = 4;
        this.pozGVSisx.kr4.col = 0;
      }

      if (this.isx.tipIMg3 == 6) {
        this.pozGVSisx.kr3x.col = 4;
        this.pozGVSisx.man.col = 4;
        this.pozGVSisx.term.col = 2;
        this.pozGVSisx.terman.col = 0;
      } else {
        this.pozGVSisx.kr3x.col = 6;
        this.pozGVSisx.man.col = 4;
        this.pozGVSisx.term.col = 2;
        this.pozGVSisx.terman.col = 0;
      }

      if (this.isx.filg > 0) {
        if (+this.isx.dut3 !== +this.isx.dut4) {
          this.pozGVSisx.filtr3.col = 1;
          this.pozGVSisx.filtr4.col = 1;
        } else {
          this.pozGVSisx.filtr3.col = 2;
          this.pozGVSisx.filtr4.col = 0;
        }

        this.pozGVSisx.man.col = this.pozGVSisx.man.col + 2;
        this.pozGVSisx.kr3x.col = this.pozGVSisx.kr3x.col + 2;

        if (this.isx.filg > 1) {
          this.pozGVSisx.spu25.col = 2;
        } else {
          this.pozGVSisx.spu25.col = 0;
        }
      } else {
        this.pozGVSisx.filtr3.col = 0;
        this.pozGVSisx.filtr4.col = 0;
        this.pozGVSisx.spu25.col = 0;
      }
    }
  } else {
    this.pozGVSisx.sensD.col = 1;
    this.pozGVSisx.spu15.col = 1;
    //  модули
    this.pozGVSisx.im3.col = 1;
    this.pozGVSisx.im4.col = 0;
    this.pozGVSisx.vst3.col = 1;
    this.pozGVSisx.vst4.col = 0;
    this.pozGVSisx.ok.col = 0;
    this.pozGVSisx.filtr4.col = 0;
    this.pozGVSisx.kr4.col = 0;
    this.pozGVSisx.kr44.col = 0;

    //  модифицированная
    if (this.isx.tipLg === "ml") {
      this.pozGVSisx.filtr3.col = 0;
      this.pozGVSisx.kr3.col = 1;
      this.pozGVSisx.kr33.col = 1;
      this.pozGVSisx.man.col = 0;
      this.pozGVSisx.term.col = 0;
      this.pozGVSisx.terman.col = 1;

      if (this.isx.tipIMg3 == 6) {
        this.pozGVSisx.kr3x.col = 0;
      } else {
        this.pozGVSisx.kr3x.col = 1;
      }

      // классическая
    } else {
      this.pozGVSisx.kr3.col = 2;
      this.pozGVSisx.kr33.col = 0;
      this.pozGVSisx.man.col = 2;
      this.pozGVSisx.term.col = 1;
      this.pozGVSisx.terman.col = 0;

      if (this.isx.tipIMg3 == 6) {
        this.pozGVSisx.kr3x.col = 2;
      } else {
        this.pozGVSisx.kr3x.col = 3;
      }

      if (this.isx.filg > 0) {
        this.pozGVSisx.filtr3.col = 1;
        this.pozGVSisx.man.col = this.pozGVSisx.man.col + 1;
        this.pozGVSisx.kr3x.col = this.pozGVSisx.kr3x.col + 1;
        if (this.isx.filg > 1) {
          this.pozGVSisx.spu25.col = 1;
        } else {
          this.pozGVSisx.spu25.col = 0;
        }
      } else {
        this.pozGVSisx.filtr3.col = 0;
        this.pozGVSisx.filtr4.col = 0;
        this.pozGVSisx.spu25.col = 0;
      }
    }
  }

  let temp02 = Object.entries(this.pozGVSisx);
  temp02.forEach(function(item) {
    if (item[1].col > 0) {
      arNPOZgvs[item[1].name] = i;
      arCOLgvs[item[1].name] = item[1].col;
      i++;
    }
  });
}

// console.log('arCOLot',arCOLot)
// console.log('arNPOZot',arNPOZot)
// console.log('arNPOZgvs',arNPOZgvs)

return { arNPOZot, arCOLot, arNPOZgvs, arCOLgvs };
}