const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

const ref = admin.database().ref("/data/pacientes");
const refLogs = admin.database().ref("/data/logs");

// Función para almacenar logs despues de una operación sobre un endpoint.
const logsFunction = (action) => {
  const childRef = refLogs.push();
  childRef.set({
    createdAt: Date.now(),
    message: action,
  });
};

exports.pacientesData = functions.https.onRequest((request, response) => {
  const refById = admin.database().ref(`/data/pacientes/${request.query.id}`);
  logsFunction("Acceso a endpoint GET data/pacientes");

  if (request.method === "GET") {
    if (request.query.id && request.query.id !== "") {
      refById.on("value", (snap) => {
        if (snap.val().accesible) {
          return response.status(200).send(JSON.stringify(snap.val()));
        } else {
          return response.status(403).send("No es posible acceder al paciente");
        }
      });
    } else {
      ref.on("value", (snap) =>
        response.status(200).send(JSON.stringify(snap.val()))
      );
    }
  }

  if (request.method === "POST" && request.body) {
    const childRef = ref.push();
    childRef.set({
      name: request.body.name,
      momLastName: request.body.momLastName,
      dadLastName: request.body.dadLastName,
      socialSecurity: request.body.socialSecurity,
      accesible: request.body.accesible,
    });

    return response.status(200).send("Usuario guardado correctamente.");
  }
});
