console.log("加载完成");
require.config({
    paths:{
        jquery: 'jquery-1.11.3',
        cookie: 'jquery.cookie',
        magic: 'magic'
       
    },
    shim:{
        cookie: 'jquery'
    }
})
require(['magic'], function(magic){
    magic.magic();
    
})
