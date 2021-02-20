<template>
  <p class="contact-line">{{ string }}</p>
</template>

<script>
export default {
  name: "ContactCardLine",
  props: {
    string: {
      type: [String, Number]
    }
  }
};
</script>

<style></style>
