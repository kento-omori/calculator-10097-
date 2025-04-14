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
  putMemory:number = 0;
  mode:string = 'integer_mode';
  eq_flg:string = 'off';
  memoryState:string = '';
  flg_SRM:string = 'off';     // メモリー、2乗、ルートの状態管理フラグ（memory,squared,route）
  percent_flg:string = 'off';
  putPercentPreValue:string = '';

  value_btn(target:string){
    let target_value = target;
    if(this.input == 'error'){
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
    this.input = this.decimalLimit(this.input);
    this.input = this.integerLimit(this.input);
    this.input = this.maxLength(this.input);
  };

  zero(target:string){  
    let target_value = target;
    if(this.input == 'error'){
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
    this.input = this.decimalLimit(this.input);
    this.input = this.integerLimit(this.input);
    this.input = this.maxLength(this.input);
  };

  zeroZero(target:string){
    let target_value = target;
    if(this.input == 'error'){
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
    this.input = this.decimalLimit_zeroZero(this.input);
    this.input = this.integerLimit_zeroZero(this.input);
    this.input = this.maxLength(this.input);
  };

  point(){
    if(this.input == 'error'){
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
      }
      this.mode = 'decimal_mode';
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
        if(this.input == '0' || preValue == '.'){
          this.operator = '';
        }else{
          if(this.formula == ''){
            this.formula = this.input + this.operator;
          }else{
            this.input = this.formula + this.input;
            this.input = this.conversion(this.input);
            this.input = eval(this.input);
            this.input = this.resultLimit(this.input);  // 文字数が10億位を超えていないか、小数点以下が8桁を超えていないか確認
            this.input = this.decimal_seven2eight(this.input); // 指数表記を元に戻す
            this.formula = this.input + this.operator;
            this.mode = 'integer_mode';
          };
        };
      };
    }else if(this.eq_flg == 'on'){
      this.operator = target;
      if(this.percent_flg == 'off'){
        this.formula = this.input + this.operator;
        this.eq_flg = 'off';
      }else if(this.percent_flg == 'on'){             // + -の場合のみ、％後の処理を行う
        if(this.operator == '×'||this.operator == '÷'){
          this.formula = this.input + this.operator;
          this.eq_flg = 'off';
        }else if(this.operator == '+'||this.operator == '-'){
          let lastInput = this.input;
          this.input = this.putPercentPreValue + this.operator + this.input;
          this.input = eval(this.input);
          this.input = this.resultLimit(this.input); 
          this.input = this.decimal_seven2eight(this.input);
          this.formula = this.putPercentPreValue + this.operator + lastInput + '=';
          this.operator = '';
        };
        this.percent_flg = 'off';
      };
    };
    this.mode = 'integer_mode';
    this.input = this.maxLength(this.input);
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
        this.result = this.formula + this.input;
        this.result = this.conversion(this.result);
        this.formula += this.input + '=';                               
        this.input = eval(this.result);
        this.input = this.resultLimit(this.input); 
        this.input = this.decimal_seven2eight(this.input);
        this.operator = '';
      }else if(this.operator == ''){
        let preValue = String(this.input).slice(-1);
        if(preValue == '.'){
          return;
        }else{
          this.eq_flg = 'on';
          this.result = this.formula + this.input;
          this.result = this.conversion(this.result);
          this.formula += this.input + '=';                
          this.input = eval(this.result);
          this.input = this.resultLimit(this.input); 
          this.input = this.decimal_seven2eight(this.input);  
        };
      };
    }else if(this.eq_flg == 'on'){
      return;
    };
    this.mode = 'integer_mode';
    this.input = this.maxLength(this.input);
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
    }else if(this.eq_flg == 'on'){
      this.allClear();
    };
  };

  bs(){                      //errorMode OK
    this.errorMode();
    if(this.eq_flg == 'off'){
      let preValue = String(this.input).slice(-1);
      let secPreValue = String(this.input).slice(-2,-1);
      if(this.operator == ''){
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
      }else{
        return;
      };
    }else if(this.eq_flg == 'on'){
      return;
    };
  };

  inverted(){                //errorMode OK
    this.errorMode();       
    if(this.eq_flg == 'off'){
      if(this.input == '0' ){
        return;
      }else if(this.input == '0.'){
        this.mode = 'integer_mode';
        this.input = '0';
        return;
      }else{
        this.changePlusMin();
      };
    }else if(this.eq_flg == 'on'){
      this.changePlusMin();
      this.formula = this.input;
    };
  };

  changePlusMin(){
    if(String(this.input).includes('-')){
      this.input = String(this.input).replace('-','');
    }else{
      this.input = '-' + this.input;
      this.operator = '';
    };
  }

  squared(){                  //errorMode OK
    if(this.input == 'error'){
      this.allClear();
    }else{
      if(this.eq_flg == 'off'){
        this.input = String(Math.pow(Number(this.input),2));
        this.input = this.decimal_seven2eight(this.input);  
      }else if(this.eq_flg == 'on'){
        this.input = String(Math.pow(Number(this.input),2));
        this.input = this.decimal_seven2eight(this.input);  
        this.formula = '';
      };
      this.flg_SRM = 'on';
      this.input = this.resultLimit(this.input);
      this.input = this.decimal_seven2eight(this.input); 
      this.input = this.maxLength(this.input);
      this.errorOut();
    };
  };

  route(){                      //errorMode
    if(Number(this.input) >= 9999999999.999){
      this.input = '99999.99999999';
    }else if(this.input == 'error'){
      this.allClear();
    }else{
      if(this.eq_flg == 'off'){
        this.input = String(Math.sqrt(Number(this.input)));
        this.input = this.decimal_seven2eight(this.input);  
      }else if(this.eq_flg == 'on'){
        this.input = String(Math.sqrt(Number(this.input)));
        this.input = this.decimal_seven2eight(this.input);  
        this.formula = '';
      };
      this.flg_SRM = 'on';
      this.input = this.resultLimit(this.input);
      this.input = this.decimal_seven2eight(this.input); 
      this.input = this.maxLength(this.input);
      this.errorOut();
    };
  };

  percent(){                       //errorMode OK
    if(this.input == 'error'){
      this.allClear();
    }else{
      if(this.formula == ''){
        return;
      }else if(!(this.formula == '')){
        let lastWord = this.formula.slice(-1);
        let lastInput = this.input;
        this.putPercentPreValue = this.formula.slice(0,-1);
        if(lastWord == '='){
          return;
        }else{
          if(lastWord == '+' || lastWord == '-'){
            this.input = this.formula + this.putPercentPreValue + '*' + lastInput + '/' + '100';
            this.formula = this.formula + this.putPercentPreValue + '×' + lastInput + '÷' + '100' + '=';
            this.input = eval(this.input);
            this.input = this.resultLimit(this.input);
            this.input = this.decimal_seven2eight(this.input);  
            this.percent_flg = 'off';
          }else if(lastWord == '×'){
            this.input = this.formula + lastInput + '÷' + '100';
            this.formula = this.formula + lastInput + '÷' + '100' + '=';
            this.input = this.conversion(this.input);
            this.input = eval(this.input);
            this.input = this.resultLimit(this.input);
            this.input = this.decimal_seven2eight(this.input);  
            this.percent_flg = 'on';
          }else if(lastWord == '÷'){
            this.input = this.formula + lastInput + '×' + '100';
            this.formula = this.formula + lastInput + '×' + '100' + '=';
            this.input = this.conversion(this.input);
            this.input = eval(this.input);
            this.input = this.resultLimit(this.input);
            this.input = this.decimal_seven2eight(this.input);  
            this.percent_flg = 'on';
          };
          this.input = this.maxLength(this.input);
          this.errorOut();
          this.eq_flg = 'on';
        };
      };
    };
  };

  memory(target:string){            //errorMode 
    if(this.input == 'error'){
      this.allClear();
    }else{
      let target_value = target;
      this.memoryState = 'M';              // メモリーに数字が入っているときはMを表示、入っていないときは表示なし
      if(this.eq_flg == 'off'){
        this.memoryFunction(target_value);
      }else if(this.eq_flg == 'on'){
        this.formula = '';
        this.memoryFunction(target_value);
      };
      this.flg_SRM = 'on';
    };
  };

  memoryFunction(num:string){
    let preValue = String(this.input).slice(-1);
    if(preValue == '.'){
      let removePoint = Number(this.input.slice(0,-1));
      if(num == 'M+'){
        if(String(this.input).charAt(0) == '-'){
          this.putMemory = this.putMemory + removePoint;
        }else{
          this.putMemory = this.putMemory + removePoint;
        };
      }else if(num == 'M-'){
        if(String(this.input).charAt(0) == '-'){
          this.putMemory = this.putMemory + removePoint;
        }else{
          this.putMemory = this.putMemory - removePoint;
        };
      };
    }else{
      if(num == 'M+'){
        if(String(this.input).charAt(0) == '-'){
          this.putMemory = this.putMemory + Number(this.input);
        }else{
          this.putMemory = this.putMemory + Number(this.input);
        };
      }else if(num == 'M-'){
        if(String(this.input).charAt(0) == '-'){
          this.putMemory = this.putMemory + Number(this.input);
        }else{
          this.putMemory = this.putMemory - Number(this.input);
        };
      };
    };
    if(num == 'MC'){
      this.putMemory = 0;
      this.memoryState = '';
    };
    if(num == 'MR'){
      this.input = String(this.putMemory);
      this.input = this.resultLimit(this.input);
      this.input = this.decimal_seven2eight(this.input)
      this.input = this.maxLength(this.input);
      this.errorOut();
      if(this.input == 'error'){
        this.putMemory = 0;
        this.memoryState = '';
      };
    };
  };

  errorOut(){
    if(this.input == 'Infinity' || this.input == 'NaN'){
      this.input = 'error'
    };
    if(this.formula.includes('Infinity') || this.formula.includes('NaN')){
      this.formula = 'error'
    };
  };

  errorMode(){
    if(this.input == 'error'){
      this.allClear();
    };
  };

  conversion(num:string){
      num = num.replace(/×/g ,'*');
      num = num.replace(/÷/g,'/');
      if(num.includes('--')){
        num = num.replace('--','+');
      };
      return num;
  };

  resultLimit(num:string):string{
    if (Number(num) >= 10000000000 || Number(num) <= -10000000000) {
     return num = 'error';
    }else if(Number(num) == 0){
      return num = '0';
    }else if(Number(num) >= 0.00000001 || Number(num) <= -0.00000001){
      return num;
    }else{
      return num = 'error';
    };
  };

  decimalLimit(num:string):string{
    let getDecimalPointLength = num.split('.');
    let len = getDecimalPointLength[1] ? getDecimalPointLength[1].length : 0;
    if(len > 8){
      return num = num.slice(0,-1); 
    }else{
      return num;
    }
  };

  decimalLimit_zeroZero(num:string):string{
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
  
  integerLimit(num:string){
    let getInteger = Number(num);
    if(getInteger > 9999999999.99999999 || getInteger < -9999999999.99999999){
      return num = num.slice(0,-1);
    }else{
      return num;
    };
  };

  integerLimit_zeroZero(num:string){
    let getInteger = Math.floor(Number(num));
    if(getInteger > 99999999999 || getInteger < -99999999999){
      return num = num.slice(0,-2);
    }else if(getInteger > 9999999999 || getInteger < -9999999999){
      return num = num.slice(0,-1);
    }else{
      return num;
    };
  };

  decimal_seven2eight(num:string):string{
    let digit = Math.pow(10,8);
    num = String((Math.round(Number(num)*digit)/digit));

    if(num.includes('e')){
      num = parseFloat(num).toFixed(8);
    }else{
      num;
    };

    if(Number(num) > 0){
      if(Number(num) <= 0.000000009){
        num = 'error';
      };
    }else if(Number(num) < 0){
      if(Number(num) >= -0.000000009){
        num = 'error';
      };
    };

    if(Number(num) > 0){
      if(Number(num) <= 0.00000009){
        num = String(parseFloat(num).toFixed(8));
      }else if(Number(num) <= 0.0000009){
        num = this.decimal_seven(num);
      }else{
        num = String(parseFloat(num));
      };
    }else if(Number(num) < 0){
      if(Number(num) >= -0.00000009){
        num = parseFloat(num).toFixed(8);
      }else if(Number(num) >= -0.0000009){
        num = this.decimal_seven(num);
      }else{
        num = String(parseFloat(num));
      };
    }else if(Number(num) == 0){
      num = '0';
    };
    return num; 
  };

   decimal_seven(num:string):string{
    let decimalPoint = Number(String(num).indexOf('.'));
    let integer = String(num.substring(0,decimalPoint));
    let decimal = String(num.substring(decimalPoint+1,decimalPoint+1+8));
    if(decimal.slice(-1) == '0'){
      return num = String(parseFloat(num).toFixed(7));
    }else{
      return num = integer + '.' + decimal;
    };
   };

  maxLength(num:string){
    let maxLength = 16; 
    if(num.length > maxLength){
        num = num.slice(0,maxLength);
    };
    return num;
  };
};
