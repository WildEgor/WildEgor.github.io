export function power(value, exp) {
  if( exp === 1 ){
    return value;
  } else{
    return value * power(value, exp - 1);
  }
}