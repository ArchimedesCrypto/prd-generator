(function() {
  var path = window.location.pathname;
  if (!path.includes('index.html') && path !== '/prd-generator/') {
    window.location.replace('/prd-generator/');
  }
})();
