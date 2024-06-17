document.addEventListener("alpine:init", () => {
  Alpine.data("certificate", (data) => ({
    data,
    visible: true,
    mandatory: false,
    enabled: true,
    showValidation: false,
    get disabledSub() {
      return () => false;
    },
    exists: (val) => val != null,
    q(id, field) {
      return this.data[id] && this.data[id][field];
    },
  }));
});
