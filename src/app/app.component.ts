import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'newcalc0408';

  input:string = ''; //入力された値（文字列）
  formula :string = ''; //inputとoperatorの文字列
  result :string = '0'; // 初期値０
  total :string = ''; //イコール入力後の合計値を保持
  mode : string = 'integer_mode';  //　integer：小数点入力可能　decimal：小数点入力不可
  equal_flag : string = 'off'; // イコール後の状態を管理　off：何でも入力可　on：＝入力後
  plusmin_flag :string = 'off'; // +/-後の状態を管理　off:すべて入力可　on：[. 0-9]は入力不可
  
  value_btn(target:string){
    if(this.plusmin_flag == 'off'){
      let target_value = target;
      if(this.equal_flag == 'off'){
        if(this.result == '0'){
          this.input = target_value;
        }else{
          this.input += target_value;
        };
      }else if(this.equal_flag == 'on'){
        this.input = target_value;
        this.total = '';
        this.equal_flag = 'off';
      };
    }else if(this.plusmin_flag == 'on'){
      return;
    };

    this.input = this.eigthDigit(this.input);
    this.input = this.tenDigit(this.input);
    this.result = this.formula + this.input;
    this.result = String(this.maxLength(this.result));
    this.fontSize()
    return this.result;
  }

  zero(target:string){
    let target_value = target;

    if(this.plusmin_flag == 'off'){
      if(this.equal_flag == 'off'){
       let preValue = this.result.slice(-1);
       if(preValue=='+'||preValue=='-'||preValue=='×'||preValue=='÷'||null){
         target_value = '0.';
         this.input += target_value; 
         this.mode = 'decimal_mode';
       }else if(this.result == '0'){
         this.input = target_value;
       }else{
         this.input += target_value;
       };
      }else if(this.equal_flag == 'on'){
        this.input = target_value;
        this.total = '';
        this.equal_flag = 'off';
      };
    }else if(this.plusmin_flag == 'on'){
      return;
    };
    this.input = this.eigthDigit(this.input);
    this.input = this.tenDigit(this.input);
    this.result = this.formula + this.input;
    this.result = String(this.maxLength(this.result));
    this.fontSize()

    return this.result;
  }

  point(){
    if(this.plusmin_flag == 'off'){
      if(this.equal_flag == 'off'){
        let preValue = this.result.slice(-1);
        if(this.mode == 'integer_mode'){
          if(this.result =='0'||preValue=='+'||preValue=='-'||preValue=='×'||preValue=='÷'){
            this.input = '0.'; // += ??
          }else{
            this.input += '.';
          };
        }else if(this.mode == 'decimal_mode'){
          return;
        };
      }else if(this.equal_flag == 'on'){
        this.input = '0.';
        this.total = '';
        this.equal_flag = 'off';
      };
      this.mode = 'decimal_mode';
    }else if(this.plusmin_flag == 'on'){
      return;
    };  
    this.result = this.formula + this.input;
    this.result = String(this.maxLength(this.result));
    this.fontSize()

    return this.result;
  };

  operator_btn(target:string){
    let target_value = target;
    this.mode = 'integer_mode';
    this.plusmin_flag = 'off';

    if(this.equal_flag == 'off'){
      let preValue = this.result.slice(-1);
      if(this.result =='0'||preValue=='+'||preValue=='-'||preValue=='×'||preValue=='÷'||preValue=='.'){
        return;
      }else{
        this.formula += this.input + target_value;
        this.input = '';
      };
    }else if(this.equal_flag == 'on'){
      this.formula += this.total + target_value; 
      this.total = '';
      this.equal_flag = 'off';
    };
    this.result = this.formula;
    this.result = String(this.maxLength(this.result));
    this.fontSize()
    return this.result;
  }

  equal_btn(){
    if(this.equal_flag == 'off'){
      let preValue = this.result.slice(-1);
      if(preValue=='+'||preValue=='-'||preValue=='×'||preValue=='÷'||preValue=='.'){
        return;
      };
      if(this.result.includes('×') || this.result.includes('÷') ){
          this.result = this.result.replace(/×/g ,'*');
          this.result = this.result.replace(/÷/g,'/');
      };
      this.result = eval(this.result);
      this.total = this.result; 
      this.mode = 'integer_mode'
      this.input = '';
      this.formula = '';
      this.equal_flag = 'on';
    }else if(this.equal_flag == 'on'){
      return;
    };
    this.plusmin_flag = 'off';
    this.maxNum(this.result);
    this.result = String(this.digiNum(this.result));
    return this.result;
  };

  allClear(){
    this.input = ''
    this.result = '0'
    this.formula = ''
    this.total = '';
    this.mode = 'integer_mode'
    this.equal_flag = 'off';
    this.plusmin_flag = 'off';
  }

  inverted(){
    if(this.equal_flag == 'off'){
      let preValue = this.result.slice(-1);
      if(this.result =='0' || preValue=='+'||preValue=='-'||preValue=='×'||preValue=='÷'||preValue=='.'){
        return;
      }else{
        const firstText = this.input.charAt(0);
        if(firstText == '('){
          this.input = this.input.replace('-', '');
          this.input = this.input.replace('(', '');
          this.input = this.input.replace(')', '');
          this.plusmin_flag = 'off';
        }else{
          this.input = '(-' + this.input + ')';
          this.plusmin_flag = 'on';
        };
      };
    }else if(this.equal_flag == 'on'){
      this.input = this.total;
      this.total= '';
      if(Number(this.input) < 0 ){
        this.input = String(this.input).replace('-','');
      }else{
        this.input = '(-' + this.input + ')';
      };
      this.result = this.input;
      this.plusmin_flag = 'on'
    };
    this.equal_flag = 'off';
    this.result = this.formula + this.input;
    this.result = String(this.maxLength(this.result));
    return this.result;
  };

  maxNum(num:string){
    if (Number(num) > 9999999999 || Number(num) < -9999999999) {
      this.allClear();
    }
  };

  digiNum(num:string){
    return Math.round(Number(num)*100000000)/100000000;
  };

  maxLength(num:string){
    let maxLength = 27;    //(-10桁)÷(-10桁)の27桁の計算に対応
    if(num.length > maxLength){
    num = num.slice(0,maxLength);
    }
    return num;
  };

  eigthDigit(num:string):any{
    let getDecimalPointLength = num.split('.');
    let len = getDecimalPointLength[1] ? getDecimalPointLength[1].length : 0;
    if(len > 8){
      return num = num.slice(0,-1); 
    }else{
      return num;
    }
  };

  tenDigit(num:string):any{
    let getInteger = Math.floor(Number(num));

    if(getInteger > 9999999999 || getInteger < -9999999999){
      return num = num.slice(0,-1);
    }else{
      return num;
    }
  }

  fontSize(){
    let font = document.getElementById("result")!;
    let numlength = font.innerHTML.length;
    if(numlength <9){
      font.style.fontSize = '50px'
    }else if(numlength < 11){
      font.style.fontSize = '40px';
    }else if(numlength < 14){
      font.style.fontSize = '30px';
    }else if(numlength < 18){
      font.style.fontSize = '25px';
    }else{
      font.style.fontSize = '20px';
    }
  };
}

