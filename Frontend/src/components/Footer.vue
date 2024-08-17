<template>
  <footer class="bg-gray-800 text-white p-4 w-full">
    <div class="container mx-auto text-center">
      <p class="text-lg font-semibold">Need Help? Contact Us!</p>
      <p class="text-sm">
        Email: support@fooddonationsystem.com | Phone: 123-456-7890
      </p>
      <div class="flex justify-center mt-4">
        <a href="/faq" class="text-blue-300 hover:text-blue-500 mx-2">FAQs</a>
        <a href="/terms" class="text-blue-300 hover:text-blue-500 mx-2"
          >Terms of Service</a
        >
        <a href="/privacy" class="text-blue-300 hover:text-blue-500 mx-2"
          >Privacy Policy</a
        >
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped></style>
