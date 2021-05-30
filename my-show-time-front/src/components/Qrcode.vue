<template>
  <qrcode-vue :value="value" :size="size" level="H" />
</template>
<script>
import QrcodeVue from "qrcode.vue";

export default {
  data() {
    return {
      value: `https://localhost:8080/wishlist?_id=${_id}.com`,
      size: 200,
    };
  },
  components: {
    QrcodeVue,
  },
};
</script>