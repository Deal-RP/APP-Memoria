import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'divisor'
})
export class DivisorPipe implements PipeTransform {

  transform(cards : any[]) {
    const dividido = cards.reduce( (result, value, index, array) => {
      if ( index % 4 === 0) {
        result.push(array.slice(index, index + 4));
      }
      return result;
    }, []);
    return dividido;
  }

}
