(() => {
  const API_URL = ".";

  async function fetchPatients() {
    setIdentity($("#identity-selection").val());
    const fields = $("#inputs input:checkbox:checked")
      .map(function() {
        return $(this).val();
      })
      .get();

    let patientId = $("#patient-id").val();
    const res = await axios.get(`${API_URL}/api/patients/${patientId ? patientId : ""}?fields=${fields.join(",")}`, {
      headers: { identity: $.cookie("identity") }
    });
    const container = $("<div>");
    let patientDataList = _.isArray(res.data.data) ? res.data.data : [res.data.data];
    _.each(patientDataList, patientData => {
      container.append($("<div class='patient'>").append(JSON2HTMLList(patientData)));
      container.append();
    });

    $("#data")
      .empty()
      .append(container);
  }

  async function fetchPatientDetails() {}

  /**
   *
   * @param user { "admin" | "doctor" | "accountant" | "patient1" | "patient2" }
   */
  function setIdentity(user) {
    console.log(`setIdentity(${user})`);
    switch (user) {
      case "admin":
        return $.cookie("identity", JSON.stringify({ id: 999, priviledgeLevel: 999 }));
        break;
      case "doctor":
        return $.cookie("identity", JSON.stringify({ id: 1 }));
        break;
      case "accountant":
        return $.cookie("identity", JSON.stringify({ id: 2 }));
        break;
      case "patient1":
        return $.cookie("identity", JSON.stringify({ id: 3 }));
        break;
      case "patient2":
        return $.cookie("identity", JSON.stringify({ id: 4 }));
        break;
      default:
        console.log(`invalid user: ${user}`);
    }
  }

  window.fetchPatients = fetchPatients;
  window.setIdentity = setIdentity;
})();