export function calculateTax(amount:number):number { 
    if(amount<=10000)return 0
     if(amount<=20000)return (amount-10000)*0.1
     if(amount<=50000)return 1000+(amount-20000)*0.2
     return 7000+(amount-50000)*0.3
}