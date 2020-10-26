 //防抖
 function debounce(func, wait) {
   let timer = null,
     result = null;
   return function anonymous(...args) {
     let context = this;
     clearTimeout(timer);
     timer = setTimeout(() => {
       result = func.call(context, ...args);
       timer = null;
     }, wait);
     return result;
   };
 };

 export {
   debounce
 }
