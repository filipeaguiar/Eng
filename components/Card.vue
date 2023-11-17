<template>
    <div class="card block max-w p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
      <h5 class="card-header mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
        <slot name="title"></slot>
      </h5>
      <div class="card-body font-normal text-gray-700 ">
        <slot name="content"></slot>
      </div>
      <div class="card-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Card",
  };
  </script>