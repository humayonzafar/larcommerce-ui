export default {
  methods:{
    successToast(msg){
      this.$toast.success(msg);
    },
    errorToast(msg){
      this.$toast.error(msg);
    },
    resetAll(){
      this.$toast.clear();
    }
  }
}
