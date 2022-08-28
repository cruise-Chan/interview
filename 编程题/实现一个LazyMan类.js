class LazyManClass {
    constructor(name){
        this.name = name;
        this.queue = [];
        console.log(`Hi I am ${this.name}`)
        setTimeout(()=>{
            this.next()
        });
    }
    sleepFirst(time) {
        const fn = ()=>{
            setTimeout(()=>{
                console.log(`等待了${time}秒...`)
                this.next()
            },time * 1000)
        }
        this.queue.unshift(fn)
        return this
    }
    eat(food){
        this.queue.push(()=>{
            console.log(`I am eating ${food}`)
            this.next()
        })
        return this
    }
    sleep(time){
        const fn = ()=>{
            setTimeout(()=>{
                console.log(`等待了${time}秒...`)
                this.next()
            },time * 1000)
        }
        this.queue.push(fn)
        return this
    }
    next(){
        if(this.queue.length){
            this.queue.shift()()
        }
    }
}   

function LazyMan(name){
    return new LazyManClass(name)
}

// LazyMan('Tony');

// LazyMan('Tony').sleep(10).eat('lunch');

// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');

