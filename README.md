# pool
threads pool for time-consuming operation
用于高内存消耗和耗时操作的线程调度池
适用于同时进行多个高内存消耗操作或互相之间会有冲突的异步操作
对传入的异步操作进行封顶截流操作，防止同时开启太多异步任务
*需要es7，或使用babel*

## import

    npm install --save @hudk/pool

## usage

    const Pool = require('@hudk/pool');
    const p = new Pool(3);

## funcions
### Pool(poolNumber)
构造函数，初始化一个线程调度池
> poolNumber | 能同时进行的最大线程数

### add(async function)
向线程池中加入一个异步函数
*该函数应当是执行真实耗时操作的函数的封装，千万不要传入一个Promise对象！*
*函数执行结果不会返回，若要返回，使用addSync*

    p.add(_ => { await f(); }); 
### async addSync(functionList)
向线程中加入异步操作函数数组，数组内的函数全部完成后会将返回值放在数组中返回（类似Promise.all）
*同add，数组中每个函数也是真实耗时操作的封装*

    const a = _ => {
      return new Promise(resolve) {
        // time-consuming operation or callback
        resolve();
      };
    };

    p.add([a, a, a]);
    