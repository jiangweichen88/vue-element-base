import Message from './main.js';
export default {
    install(Vue,options={}){
        Vue.prototype.$message_jc = Message;
    }
};
