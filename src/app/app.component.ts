import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calculator10097';

  input:string = '0';
  formula:string = '';
  result:string = '';
  operator:string ='';
  putMemory:string = '0';
  mode:string = 'integer_mode';
  eq_flg:string = 'off';
  memoryState:string = '';
  flg_SRM:string = 'off';     // メモリー、2乗、ルートの状態管理フラグ（memory,squared,route）
  percent_flg:string = 'off';
  putPercentPreValue:string = '';
  preFormula:string = '';

  value_btn(target:string){
    let target_value = target;
    if(this.input == 'エラー' || this.input == '桁数オーバーです'){
      this.allClear();
      this.input = target_value;
    }else{
      if(this.flg_SRM == 'off'){
        if(this.eq_flg == 'off'){
        if(!(this.operator == '')){
            this.input = target_value;
            this.operator = '';
          }else{
            if(this.input == '0'){
              this.input = target_value;
            }else{
              this.input += target_value;
            };
          };
        }else if(this.eq_flg == 'on'){
          this.input = target_value;
          this.formula = '';
          this.eq_flg = 'off';
        };
      }else if(this.flg_SRM == 'on'){
        this.input = target_value;
        this.operator = '';
        this.mode = 'integer_mode';
        this.eq_flg = 'off';
        this.flg_SRM = 'off';
      };
    };
    this.percent_flg = 'off';
    this.input = this.decimalLimit(this.input);
    this.input = this.integerLimit1(this.input);
    this.input = this.maxLength(this.input);
    this.input = this.threeComma(this.input);
  };

  zero(target:string){  
    let target_value = target;
    if(this.input == 'エラー'|| this.input == '桁数オーバーです'){
      this.allClear();
      this.input = target_value;
    }else{
      if(this.flg_SRM == 'off'){
        if(this.eq_flg == 'off'){
          if(!(this.operator == '')){
            this.input = '0';
            this.operator = '';
        }else{
           if(this.input == '0'){
             this.input = target_value;
            }else{
              this.input += target_value;
            };
          };
        }else if(this.eq_flg == 'on'){
          this.input = '0';
          this.formula = '';
          this.eq_flg = 'off';
        };
      }else if(this.flg_SRM == 'on'){
        this.input = '0';
        this.operator = '';
        this.mode = 'integer_mode';
        this.eq_flg = 'off';
        this.flg_SRM = 'off';
      };
    };
    this.percent_flg = 'off';
    this.input = this.decimalLimit(this.input);
    this.input = this.integerLimit1(this.input);
    this.input = this.maxLength(this.input);
    this.input = this.threeComma(this.input);
  };

  zeroZero(target:string){
    let target_value = target;
    if(this.input == 'エラー'|| this.input == '桁数オーバーです'){
      this.allClear();
    }else{
      if(this.flg_SRM == 'off'){
        if(this.eq_flg == 'off'){
          if(!(this.operator == '')){
            this.input = '0';
            this.operator = '';
        }else{
           if(this.input == '0'){
             return;
            }else{
              this.input += target_value;
            };
          };
        }else if(this.eq_flg == 'on'){
          this.input = '0';
          this.formula = '';
          this.eq_flg = 'off';
        };
      }else if(this.flg_SRM == 'on'){
        this.input = '0';
        this.operator = '';
        this.mode = 'integer_mode';
        this.eq_flg = 'off';
        this.flg_SRM = 'off';
      };
    };
    this.percent_flg = 'off';
    this.input = this.decimalLimit_zeroZero(this.input);
    this.input = this.integerLimit_zeroZero1(this.input);
    this.input = this.maxLength(this.input);
    this.input = this.threeComma(this.input);
  };

  point(){
    if(this.input == 'エラー'|| this.input == '桁数オーバーです'){
      this.allClear();
      this.input = '0.';
    }else{
      if(this.flg_SRM == 'off'){
        if(this.eq_flg == 'off'){
          if(!(this.operator == '')){
            this.input = '0.';
            this.operator = '';
          }else{
            if(this.mode == 'integer_mode'){
              if(this.input == '0'){
                this.input = '0.';
              }else{
                this.input += '.';
              };
            }else if(this.mode = 'decimal_mode'){
              return;
            };
          };
        }else if(this.eq_flg == 'on'){
          this.input = '0.';
          this.formula = '';
          this.eq_flg = 'off';
        };
      }else if(this.flg_SRM == 'on'){
        this.input = '0.';
        this.operator = '';
        this.eq_flg = 'off';
        this.flg_SRM = 'off';
      };
      this.mode = 'decimal_mode';
      this.percent_flg = 'off';
    };
  };

  operator_btn(target:string){                //errorMode OK
    this.errorMode();
    if(this.eq_flg == 'off'){
      if(!(this.operator == '')){
        this.operator = target;
        this.formula = this.input + this.operator;
      }else if(this.operator == ''){
        this.operator = target;
        let preValue = String(this.input).slice(-1);
        if(preValue == '.'){
          this.operator = '';
        }else{
          if(this.formula == ''){
            this.formula = this.input + this.operator;
          }else{
            this.preFormula = this.formula;
            this.formula = this.input + this.operator;
            this.input = this.calculation1(this.input);
            this.input = this.threeComma(this.input);   ///追加 計算式にカンマを表示させるため
            this.formula = this.input + this.operator;  ///追加 計算式にカンマを表示させるため
          };
        this.mode = 'integer_mode';
        };
      };
      this.input = this.input.replace(/,/g , '')
    }else if(this.eq_flg == 'on'){
      this.operator = target;
      if(this.percent_flg == 'off'){
        this.formula = this.input + this.operator;
        this.eq_flg = 'off';
      }else if(this.percent_flg == 'on'){             // + -の場合のみ、×％後の処理を行う
        if(this.operator == '×'||this.operator == '÷'){
          this.formula = this.input + this.operator;
          this.eq_flg = 'off';
        }else if(this.operator == '+'||this.operator == '-'){
          this.formula = this.putPercentPreValue + this.operator + this.input + '=';
          this.preFormula = this.putPercentPreValue + this.operator;
          this.input = this.calculation1(this.input);
          this.operator = '';
        };
        this.mode = 'integer_mode';
      };
      this.input = this.input.replace(/,/g , '')
    };
    this.percent_flg = 'off';
    this.input = this.resultLimit1(this.input)
    this.input = this.maxLength(this.input);
    this.input = this.threeComma(this.input);
    this.errorOut();
  };

  equal_btn(){                //errorMode OK
    this.errorMode();
    if(this.eq_flg == 'off'){
      if(this.formula == ''){
        return;
      };
      if(!(this.operator == '')){
        this.eq_flg = 'on';
        this.preFormula = this.formula;
        this.formula += this.input + '=';                               
        this.input = this.calculation1(this.input);
        this.operator = '';
      }else if(this.operator == ''){
        let preValue = String(this.input).slice(-1);
        if(preValue == '.'){
          return;
        }else{
          this.eq_flg = 'on';
          this.preFormula = this.formula;
          this.formula += this.input + '=';
          this.input = this.calculation1(this.input);
        };
      };
    }else if(this.eq_flg == 'on'){
      return;
    };
    this.mode = 'integer_mode';
    this.percent_flg = 'off';
    this.input = this.resultLimit1(this.input)
    this.input = this.maxLength(this.input);
    this.input = this.threeComma(this.input);
    this.errorOut();
  };

  allClear(){
    this.input = '0';
    this.formula = '';
    this.result = '';
    this.operator = '';
    this.mode = 'integer_mode';
    this.eq_flg = 'off';
    this.flg_SRM = 'off';
    this.percent_flg = 'off';
  }

  clear(){                    //errorMode OK
    this.errorMode();
    if(this.eq_flg == 'off'){
      this.input = '0';
      this.mode = 'integer_mode';
      this.percent_flg = 'off';
    }else if(this.eq_flg == 'on'){
      this.allClear();
    };
  };

  bs(){                      //errorMode OK
    this.errorMode();
    if(this.eq_flg == 'off'){
      this.input = this.input.replace(/,/g , '');
      let preValue = String(this.input).slice(-1);
      let secPreValue = String(this.input).slice(-2,-1);
      this.mode = this.input.includes('.') ? 'decimal_mode' : 'integer_mode';
      if(this.input == '0'){
        return;
      }else if(preValue == '.'){
        this.mode = 'integer_mode';
        this.input = String(this.input).slice(0,-1);
      }else if(secPreValue == '-' ){
        this.input = '0';
      }else{
        this.input = String(this.input).slice(0,-1);
      };
      if(this.input == '' || this.input == '-0.'){
        this.input = '0'
        this.mode = 'integer_mode';
      };
      this.operator = '';
    }else if(this.eq_flg == 'on'){
      return;
    };
    this.flg_SRM = 'off';
    this.percent_flg = 'off';
    this.input = this.threeComma(this.input);
  };

  inverted(){                //errorMode OK
    this.errorMode();       
    if(this.eq_flg == 'off'){
      if(this.input == '0'){
        return;
      }else{
        this.changePlusMin();
      };
    }else if(this.eq_flg == 'on'){
      if(this.input == '0'){
        return;
      }else{
        this.changePlusMin();
        this.formula = this.input;
      };
    };
    this.percent_flg = 'off';
  };

  changePlusMin(){
    if(String(this.input).includes('-')){
      this.input = String(this.input).replace('-','');
    }else{
      this.input = '-' + this.input;
      this.operator = '';
    };
  }

  percent(){                       //errorMode OK
    if(this.input == 'エラー' || this.input == '桁数オーバーです'){
      this.allClear();
    }else{
      if(this.formula == ''){
        return;
      }else if(!(this.formula == '')){
        this.percent_flg = 'off';
        let lastWord = this.formula.slice(-1);
        let lastformula = this.formula;
        let lastInput = this.input;
        this.putPercentPreValue = this.formula.slice(0,-1);
        if(lastWord == '='){
          return;
        }else{
          if(lastWord == '+' || lastWord == '-'){
            this.formula = this.formula + this.putPercentPreValue + '×' + lastInput + '÷' + '100' + '=';
            this.preFormula = this.input + '÷';
            this.input = '100';
            this.input = this.calculation1(this.input);        // ①%部分を小数にする
            this.preFormula = this.putPercentPreValue + '×';   
            this.input = this.calculation1(this.input);        // ②元の数字×％（①）
            this.preFormula = lastformula;
            this.input = this.calculation1(this.input);        //  元の数字＋②
          }else if(lastWord == '×' || lastWord == '÷'){
            this.formula = this.formula + lastInput + '÷' + '100' + '=';
            this.preFormula = this.input + '÷';
            this.input = '100';
            this.input = this.calculation1(this.input);            // ①%部分を小数にする
            this.preFormula = lastformula;
            this.input = this.calculation1(this.input);        //  元の数字×①
            this.percent_flg = lastWord=='×' ? 'on':'off';
          }
          this.eq_flg = 'on';
          this.input = this.resultLimit1(this.input);
          this.input = this.maxLength(this.input);
          this.input = this.threeComma(this.input);
          this.errorOut();
        };
      };
    };
  };
  
  memory(target:string){            //errorMode 
    this.input = this.input.replace(/,/g , '')
    if(this.input == 'エラー'|| this.input == '桁数オーバーです'){
      this.allClear();
    }else{
      let target_value = target;
      this.memoryState = 'M';              // メモリーに数字が入っているときはMを表示、入っていないときは表示なし
      if(this.eq_flg == 'off'){
        this.memoryFunction(target_value);
      }else if(this.eq_flg == 'on'){
        this.memoryFunction(target_value);
        this.formula = '';
      };
      this.flg_SRM = 'on';
      this.percent_flg = 'off';
    };
    this.input = this.threeComma(this.input);
    this.errorOut();
  };

  memoryFunction(num:string){
    let preValue = String(this.input).slice(-1);
    if(preValue == '.'){
      this.input = this.input.slice(0,-1);
    };
    if(num == 'M+'){
      this.preFormula = this.putMemory + '+';
      this.putMemory = this.calculation1(this.input);
    }else if(num == 'M-'){
      this.preFormula = this.putMemory + '-';
      this.putMemory = this.calculation1(this.input);
    }else if(num == 'MC'){
      this.putMemory = '0';
      this.memoryState = '';
    }else if(num == 'MR'){
      this.memoryState = (this.putMemory=='0') ? '' : 'M'; 
      this.input = this.putMemory;
      this.input = this.resultLimit1(this.input);
      this.input = this.maxLength(this.input);
      if(this.input == 'エラー' || this.input == '桁数オーバーです'){
        this.putMemory = '0';
        this.memoryState = '';
      };
    };
  };

  errorOut(){
    if(this.input == 'Infinity' || this.input == 'NaN'){
      this.input = 'エラー'
    };
    if(this.formula.includes('Infinity') || this.formula.includes('NaN')){
      this.formula = 'エラー'
    }else if(this.formula.includes('桁数オーバーです')){
      this.formula = '桁数オーバーです';
    };
  };

  errorMode(){
    if(this.input == 'エラー' || this.input == '桁数オーバーです'){
      this.allClear();
    };
  };

  resultLimit1(num:string):string{
    let num1 = num.includes('-') ? num.replace('-','') : num;

    let splitnum = num1.split('.');
    let integerPart = splitnum[0]
    let decimalPart = splitnum[1] ? splitnum[1] : '0';

    if(integerPart.length > 10){
      return num = '桁数オーバーです';
    };

    if(decimalPart.length > 8){
      decimalPart = decimalPart.slice(0,8);
      if(decimalPart == '00000000' && integerPart == '0'){
        return num = '桁数オーバーです';
      }else if(decimalPart == '00000000'){
        decimalPart = '';
        return num = num.includes('-') ? '-' + integerPart : integerPart;
      }else{
        decimalPart = decimalPart.replace(/0+$/, "");
        return num = num.includes('-') ?  '-' + integerPart + '.' + decimalPart : integerPart + '.' + decimalPart;
      };
    };
    return num;
  };

  decimalLimit(num:string):string{
    num = num.replace(/,/g , '')
    let getDecimalPointLength = num.split('.');
    let len = getDecimalPointLength[1] ? getDecimalPointLength[1].length : 0;
    if(len > 8){
      return num = num.slice(0,-1); 
    }else{
      return num;
    }
  };

  decimalLimit_zeroZero(num:string):string{
    num = num.replace(/,/g , '')
    let getDecimalPointLength = num.split('.');
    let len = getDecimalPointLength[1] ? getDecimalPointLength[1].length : 0;
    if(len > 9){
      return num = num.slice(0,-2); 
    }else if(len > 8){
      return num = num.slice(0,-1); 
    }else{
      return num;
    };
  };
  
  integerLimit1(num:string):string{
    num = num.replace(/,/g , '')
    let num1 = num.includes('-') ? num.replace('-','') : num;

    let getIntegerPointLength = num1.split('.');
    let len = getIntegerPointLength[0] ? getIntegerPointLength[0].length : 0;
    if(len > 10){
      return num = num.slice(0,-1); 
    }else{
      return num;
    }
  };
  
  integerLimit_zeroZero1(num:string){
    num = num.replace(/,/g , '')
    let num1 = num.includes('-') ? num.replace('-','') : num;
    let getIntegerPointLength = num1.split('.');
    let len = getIntegerPointLength[0] ? getIntegerPointLength[0].length : 0;
    if(len > 11){
      return num = num.slice(0,-2);
    }else if(len > 10){
      return num = num.slice(0,-1);
    }else{
      return num;
    };
  };

  maxLength(num:string){
    num = String(num.replace(/,/g , ''));
    let maxLength = 20; 
    if(num.length > maxLength){
        num = num.slice(0,maxLength);
    };
    return num;
  };

  threeComma(num:string):string{
    if(num == '桁数オーバーです'){
      return num;
    };

    let num1 = num;
    num = num.replace(/-/g , '')
    num = num.replace(/,/g , '')
    let integerPart = num.split('.');
    integerPart[0] = Number(integerPart[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    num = integerPart.join('.');
    if(num1.includes('-')){
      num = '-' + num; 
    };
    return num; 
  };

  calculation1(num:string){
    this.preFormula = this.preFormula.replace(/,/g , '')
    num = num.replace(/,/g , '')
    let num1 = this.preFormula.slice(0,-1);
    let ope  = this.preFormula.slice(-1);
    let num2 = num;

      // 整数部と小数部を分割
      function splitNumber(num: string): { sign: string; intPart: string; fracPart: string } {
        const sign = num.startsWith("-") ? "-" : "";        //　マイナス始まりであれば、マイナスを取得
        const absoluteNum = num.startsWith("-") ? num.slice(1) : num;  // マイナス始まりであれば、マイナスを除去
        const [intPart, fracPart = ""] = absoluteNum.split(".");  // 小数点で分ける
        return { sign, intPart, fracPart };  
      };
      
      // 小数部の桁数をそろえる
      function alignDecimals(
        n1: { sign: string; intPart: string; fracPart: string },
        n2: { sign: string; intPart: string; fracPart: string }
        ): { n1Int: bigint; n2Int: bigint; scale: bigint } {
        const maxFracLength = Math.max(n1.fracPart.length, n2.fracPart.length); // 大きいほうの数を取得
        const frac1 = n1.fracPart.padEnd(maxFracLength, "0");   // 文字列の末尾に指定した文字列を繰り返し追加（桁をそろえる）
        const frac2 = n2.fracPart.padEnd(maxFracLength, "0");

        const n1Int = BigInt((n1.sign + n1.intPart + frac1) || "0"); //整数＋小数部分の文字列をたす。その際、17桁以上になる可能性があるため、BigInt型を使う
        const n2Int = BigInt((n2.sign + n2.intPart + frac2) || "0");

        return { n1Int, n2Int, scale: BigInt(10 ** maxFracLength) };   //戻すときに割る大きさを決める
      };
      
      // 入力を分割
      const n1 = splitNumber(num1);
      const n2 = splitNumber(num2);

      let result: bigint;
      let resultScale: bigint;

      if (ope === "×" || ope === "÷") {
        const n1Scale = BigInt(10 ** n1.fracPart.length);
        const n2Scale = BigInt(10 ** n2.fracPart.length);
        const n1Int = BigInt(n1.sign + n1.intPart + n1.fracPart);
        const n2Int = BigInt(n2.sign + n2.intPart + n2.fracPart);
        if (ope === "×") {
          result = n1Int * n2Int;
          resultScale = n1Scale * n2Scale;
        }else{
          if (n2Int === BigInt(0)){
            return num = 'エラー'; 
          }else{
            const precision = 18n; // 必要な桁数を指定
            result = (n1Int * n2Scale * BigInt(10) ** precision) / n2Int;
            resultScale = n1Scale * BigInt(10) ** precision;
          };
        };
      }else{
        const aligned = alignDecimals(n1, n2);
        result = ope === "+" ? aligned.n1Int + aligned.n2Int : aligned.n1Int - aligned.n2Int;
        resultScale = aligned.scale;
      };

      const isNegative = result < BigInt(0);
      const absResultStr = result.toString().replace("-", "");
      const scaleStr = resultScale.toString();
      const scaleLen = scaleStr.length - 1;
      let intPart = '';
      let fracPart = '';

      if(scaleLen == 0 && ope === '×'||scaleLen == 0 && ope === '+'||scaleLen == 0 && ope === '-'){    // 整数同士の計算の場合(割り算除く)
        intPart = absResultStr || "0";
        fracPart = '';
      }else{                                        // それ以外の場合
        intPart = absResultStr.length > scaleLen
        ? absResultStr.slice(0, -scaleLen) : "0";
        fracPart = absResultStr.padStart(scaleLen, "0").slice(-scaleLen).replace(/0+$/, "");
      };
      num = (isNegative ? "-" : "") + intPart + (fracPart ? "." + fracPart : "");
      return num = this.resultLimit1(num);
  }; 
};