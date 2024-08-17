<template>
  <div>
    <ul>
      <li v-for="(tab, index) in tabs" :key="index" @click="selectTab(index)">
        {{ tab.title }}
      </li>
    </ul>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedIndex: 0,
    };
  },
  methods: {
    selectTab(index) {
      this.selectedIndex = index;
    },
  },
};
</script>
